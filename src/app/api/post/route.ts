import { NextRequest, NextResponse } from 'next/server';
import Post from '@/backend/models/Post';
import { getSession } from '@/utils/session';
import sharp from 'sharp';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { isValidSession } from '@/backend/utils/helpers';

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

    if (!isValidSession(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const type = formData.get('type') as string;
    const content = formData.get('content') as string;
    const designFile = formData.get('designFile') as File | null;

    if (!type || type === 'text' && !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (type === 'design' && !designFile) {
      return NextResponse.json({ error: 'Missing design file' }, { status: 400 });
    }

    let designUrl = '';

    if (type === 'design' && designFile) {
      try {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(designFile.type)) {
          return NextResponse.json({ error: 'Invalid file type. Only .png and .jpeg allowed' }, { status: 400 });
        }
        if (designFile.size > 15 * 1024 * 1024) {
          return NextResponse.json({ error: 'File size too large. Max 15MB allowed' }, { status: 400 });
        }

        const buffer = Buffer.from(await designFile.arrayBuffer());
        const compressedImageBuffer = await sharp(buffer)
          .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 90 })
          .toBuffer();

        const fileName = `${session._id}-${Date.now()}-${designFile.name}`;

        await s3.send(new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: fileName,
          Body: compressedImageBuffer,
          ContentType: 'image/jpeg',
        }));

        designUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
      } catch (err) {
        console.error('Error uploading file:', err);
        return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
      }
    }

    const newPost = await Post.create({
      authorId: session._id,
      type,
      content,
      designFile: designUrl,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}