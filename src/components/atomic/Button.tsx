type ButtonProps = {
  children?: React.ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  className?: string;
  xsmall?: boolean;
  small?: boolean;
  large?: boolean;
  disabled?: boolean;
  outline?: boolean;
  shadow?: boolean;
};

const Button = ({ children, type = 'button', onClick, className = '', xsmall, small, large, outline, shadow, disabled = false, }: ButtonProps) => {
  const sizeClass = xsmall ? 'w-fit h-fit px-4 py-2' : small ? 'w-28' : large ? 'w-48' : 'w-full';
  let baseClass =
    outline
      ? 'border border-accent-200 text-black bg-transparent'
      : 'bg-primary text-white';
  const disabledClass = disabled ? 'opacity-75 cursor-default' : '';
  const shadowClass = shadow ? 'shadow-xl' : '';

  if (!disabled) {
    baseClass += outline ? ' hover:bg-accent-100' : ' hover:bg-black';
  }

  return (
    <button
      type={type}
      className={`flex items-center justify-center gap-2 rounded-full select-none font-semibold text-sm h-10 ${sizeClass} ${baseClass} ${disabledClass} ${shadowClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
