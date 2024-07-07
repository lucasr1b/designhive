'use client';

import AppLayout from '@/components/atomic/AppLayout';
import FeedSlider from '@/components/atomic/FeedSlider';
import Explore from '@/components/hive/Explore';
import MyHive from '@/components/hive/MyHive';
import { useState } from 'react';

const HivePage = () => {
  const [activeFeed, setActiveFeed] = useState('explore');

  const feedOptions = [
    { key: 'explore', label: 'Explore' },
    { key: 'myHive', label: 'My hive' },
  ];

  const ActiveFeed = () => {
    if (activeFeed === 'explore') return <Explore />;
    if (activeFeed === 'myHive') return <MyHive />;

    return null;
  }

  return (
    <AppLayout>
      <div className='flex flex-1 flex-col gap-6'>
        <FeedSlider
          options={feedOptions}
          activeFeed={activeFeed}
          onFeedChange={setActiveFeed}
        />
        <ActiveFeed />
      </div>
    </AppLayout>
  );
};

export default HivePage;