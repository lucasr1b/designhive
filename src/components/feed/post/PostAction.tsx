import React, { useState } from 'react';

type PostActionProps = {
  icon: React.ReactNode;
  count?: number;
  tooltip: string;
  color?: string;
  hoverColor?: string;
  onClick?: () => void;
};

const PostAction: React.FC<PostActionProps> = ({
  icon,
  count,
  tooltip,
  color = 'base-200',
  hoverColor = 'black',
  onClick,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="relative inline-flex items-center gap-2 cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      <div
        className={`flex items-center justify-center transition-all duration-200 ease-in-out text-${color} hover:text-${hoverColor}`}
      >
        {React.cloneElement(icon as React.ReactElement, {
          className: `w-5 h-5 transition-transform duration-200 ease-in-out ${isHovering ? 'scale-110' : 'scale-100'}`
        })}
        {count !== undefined && (
          <span className={`ml-1 text-sm transition-all duration-200 ease-in-out ${isHovering ? 'translate-x-0.5' : ''}`}>
            {count}
          </span>
        )}
      </div>
      {isHovering && (
        <div
          className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 font-medium text-white text-xs rounded px-2 py-1 opacity-0 animate-fadeIn"
        >
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default PostAction;