type ProfilePictureProps = {
  src: string;
  className?: string;
}

const ProfilePicture = ({ src, className }: ProfilePictureProps) => {
  return (
    <div className={`flex-shrink-0 w-10 h-10 rounded-full overflow-hidden ${className}`}>
      <img src={src} alt='Profile picture' className='w-full h-full object-cover' />
    </div>
  );
};

export default ProfilePicture