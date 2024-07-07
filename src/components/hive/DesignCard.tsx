import { PostWithUserData } from '@/utils/types';
import Link from 'next/link';
import ClickWrapper from '@/components/atomic/ClickWrapper';
import { RiDashboardLine, RiHeart2Fill, RiHeart2Line } from '@remixicon/react';
import PostAction from '../post/base/actions/PostAction';
import React, { useCallback } from 'react';
import axios from 'axios';

interface DesignCardProps {
  design: PostWithUserData;
}

const DesignCard: React.FC<DesignCardProps> = ({ design }) => {
  const [liked, setLiked] = React.useState(design.initialLiked);

  const handleLike = useCallback(async () => {
    const previousLiked = liked;

    setLiked(!liked);

    try {
      await axios.post(`/api/post/${design._id}/like`);
    } catch (error) {
      console.error('Error liking/unliking post:', error);
      setLiked(previousLiked);
    }
  }, [design._id, liked]);

  const handleAddToHive = () => {
    console.log(design._id);
  };

  return (
    <div key={design._id} className='my-6'>
      <div className="relative">
        <Link href={`${design.authorUsername}/post/${design._id}`}>
          <div className="relative rounded-lg group overflow-hidden">
            <img
              className="h-auto w-full transition-transform duration-300 ease-in-out group-hover:scale-105 border border-accent-200 rounded-lg"
              src={design.designFile || ''}
              alt={`Design by ${design.authorName}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col justify-end p-4 rounded-lg">
              <div className="flex justify-between items-end">
                <div className="text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                  <p className="font-bold">{design.authorName}</p>
                  <p className="text-sm">@{design.authorUsername}</p>
                </div>
                <div className="flex flex-row gap-4 relative">
                  <ClickWrapper onClick={handleLike}>
                    <PostAction
                      icon={liked ? <RiHeart2Fill /> : <RiHeart2Line />}
                      tooltip={liked ? 'Unlike' : 'Like'}
                      color={liked ? 'red-500' : 'white'}
                      hoverColor={liked ? 'red-600' : 'red-500'}
                    />
                  </ClickWrapper>
                  <ClickWrapper onClick={handleAddToHive}>
                    <PostAction
                      icon={<RiDashboardLine />}
                      tooltip='Add to My Hive'
                      color='white'
                      hoverColor='yellow-500'
                    />
                  </ClickWrapper>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DesignCard;
