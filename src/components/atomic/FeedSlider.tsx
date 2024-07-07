'use client';
import React from 'react';

type FeedOption = {
  key: string;
  label: string;
}

type FeedSliderProps = {
  options: FeedOption[];
  activeFeed: string;
  onFeedChange: (key: string) => void;
}

const FeedSlider: React.FC<FeedSliderProps> = ({ options, activeFeed, onFeedChange }) => {
  const feedButtonClass = (feedKey: string) => `
    relative inline-block font-medium cursor-pointer select-none
    ${activeFeed === feedKey
      ? 'font-semibold before:absolute before:left-0 before:right-0 before:-bottom-2 before:h-1 before:bg-black before:rounded-full'
      : 'text-base-200 hover:text-black'}
  `;

  return (
    <div className='flex flex-row gap-8'>
      {options.map((option) => (
        <h1
          key={option.key}
          className={feedButtonClass(option.key)}
          onClick={() => onFeedChange(option.key)}
        >
          {option.label}
        </h1>
      ))}
    </div>
  );
};

export default FeedSlider;