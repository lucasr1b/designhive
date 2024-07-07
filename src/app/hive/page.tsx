'use client';

import AppLayout from '@/components/atomic/AppLayout';
import FeedSlider from '@/components/atomic/FeedSlider';
import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { PostWithUserData } from '@/utils/types';
import Link from 'next/link';
import Explore from '@/components/hive/Explore';

const Hive = () => {
  const [activeFeed, setActiveFeed] = useState('explore');

  const feedOptions = [
    { key: 'explore', label: 'Explore' },
    { key: 'myHive', label: 'My hive' },
  ];

  return (
    <AppLayout>
      <div className='flex flex-1 flex-col gap-6'>
        <FeedSlider
          options={feedOptions}
          activeFeed={activeFeed}
          onFeedChange={setActiveFeed}
        />
        <Explore />
      </div>
    </AppLayout>
  );
};

export default Hive;