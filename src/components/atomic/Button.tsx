type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  xsmall?: boolean;
  small?: boolean;
  large?: boolean;
  outline?: boolean;
  shadow?: boolean;
};

const Button = ({ children, className = '', xsmall, small, large, outline, shadow }: ButtonProps) => {
  const sizeClass = xsmall ? 'w-20' : small ? 'w-28' : large ? 'w-48' : 'w-full';
  const baseClass = outline
    ? 'border-2 border-accent text-black bg-transparent hover:bg-black hover:border-black hover:text-white'
    : 'bg-primary text-white hover:bg-black';
  const shadowClass = shadow ? 'shadow-xl' : '';

  return (
    <button className={`flex items-center justify-center rounded-full font-medium text-sm h-10 ${sizeClass} ${baseClass} ${shadowClass} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
