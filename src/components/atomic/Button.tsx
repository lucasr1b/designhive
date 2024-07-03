type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  small?: boolean;
  large?: boolean;
};

const Button = ({ children, className = '', small, large }: ButtonProps) => {
  const widthClass = small ? 'w-28' : large ? 'w-48' : 'w-full';

  return (
    <button className={`flex items-center justify-center rounded-full bg-primary text-white font-medium text-sm h-10 ${widthClass} ${className} hover:bg-black`}>
      {children}
    </button>
  );
};

export default Button;