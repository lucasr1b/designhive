import React, { ReactNode } from 'react';

interface ClickWrapperProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  children?: ReactNode;
}

const ClickWrapper: React.FC<ClickWrapperProps> = ({ onClick, children, className = '' }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div onClick={handleClick} {...(className ? { className } : {})}>
      {children}
    </div>
  );
};

export default ClickWrapper;