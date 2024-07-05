import { NextRequest, NextResponse } from 'next/server';
import User from '@/backend/models/User';
import { getSession, updateSession } from '@/utils/session';
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import sharp from 'sharp';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const name = formData.get('fname') as string;
    const username = formData.get('username') as string;
    const bio = formData.get('bio') as string;
    const file = formData.get('pfp') as File | null;

    if (!name || !username) {
      return NextResponse.json({ message: 'Name and username are required' }, { status: 400 });
    }

    let pfpUrl = session.pfp;

    if (file) {
      try {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
          return NextResponse.json({ message: 'Invalid file type only .png and .jpeg allowed' }, { status: 400 });
        }
        if (file.size > 5 * 1024 * 1024) {
          return NextResponse.json({ message: 'File size too large, max 5MB allowed' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const compressedImageBuffer = await sharp(buffer)
          .resize(400, 400, { fit: sharp.fit.inside, withoutEnlargement: true })
          .toFormat('jpeg', { quality: 80 })
          .toBuffer();

        const fileName = `${session._id}-${Date.now()}-${file.name}`;

        const uploadParams: PutObjectCommandInput = {
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: fileName,
          Body: compressedImageBuffer,
          ContentType: 'image/jpeg',
        };

        const command = new PutObjectCommand(uploadParams);
        await s3.send(command);

        pfpUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
      } catch (err) {
        console.error('Error uploading file:', err);
        return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      session._id,
      { name, username, bio, pfp: pfpUrl },
      { new: true, runValidators: true }
    ).select('name username bio pfp');

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await updateSession({
      ...session,
      name: updatedUser.name,
      username: updatedUser.username,
      bio: updatedUser.bio,
      pfp: updatedUser.pfp,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}