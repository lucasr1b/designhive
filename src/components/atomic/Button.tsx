type ButtonProps = {
  children?: React.ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  className?: string;
  xsmall?: boolean;
  small?: boolean;
  large?: boolean;
  outline?: boolean;
  shadow?: boolean;
};

const Button = ({ children, type = 'button', onClick, className = '', xsmall, small, large, outline, shadow }: ButtonProps) => {
  const sizeClass = xsmall ? 'w-20' : small ? 'w-28' : large ? 'w-48' : 'w-full';
  const baseClass = outline
    ? 'border border-accent-200 text-black bg-transparent hover:bg-accent-300'
    : 'bg-primary text-white hover:bg-black';
  const shadowClass = shadow ? 'shadow-xl' : '';

  return (
    <button
      type={type}
      className={`flex items-center justify-center gap-2 rounded-full font-medium text-sm h-10 ${sizeClass} ${baseClass} ${shadowClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
