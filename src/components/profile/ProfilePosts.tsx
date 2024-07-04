type ProfilePostProps = {
  userId: string;
};

const ProfilePosts = ({ userId }: ProfilePostProps) => {
  return (
    <div>
      <h1 className='text-lg font-medium mb-2'>Posts</h1>
      <div>
        <i>This user has no posts yet :&#40;</i>
      </div>
    </div>
  );
};

export default ProfilePosts