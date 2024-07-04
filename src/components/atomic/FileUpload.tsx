type FileUploadProps = {
  children: React.ReactNode;
  onClick: () => void;
}

const FileUpload = ({ children, onClick }: FileUploadProps) => {
  return (
    <button onClick={onClick} className='flex items-center justify-center bg-accent-100 rounded-full h-10 px-3 hover:bg-accent-400'>{children}</button>
  );
};

export default FileUpload;