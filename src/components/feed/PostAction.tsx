import React from 'react';

type PostActionProps = {
  icon: React.ReactNode;
  count?: number;
  tooltip: string;
  hoverColor?: string;
};

const PostAction = ({ icon, count, tooltip, hoverColor = 'black' }: PostActionProps) => {
  return (
    <div className='relative group'>
      <div className={`flex items-center justify-center gap-2 cursor-pointer text-secondary hover:text-${hoverColor} transition duration-200`}>
        <div className='transform group-hover:scale-110 transition duration-200'>
          {icon}
        </div>
        {count !== undefined && <span>{count}</span>}
      </div>
      <span className='absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 font-medium text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
        {tooltip}
      </span>
    </div>
  );
};

export default PostAction;