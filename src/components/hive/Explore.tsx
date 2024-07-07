import { PostWithUserData } from '@/utils/types';
import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import DesignCard from './DesignCard';
import axios from 'axios';

const Explore = () => {
  const [designs, setDesigns] = useState<PostWithUserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDesigns = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/hive/explore');
        setDesigns(response.data);
      } catch (error) {
        console.error('Error fetching designs:', error); // example #1 of error handling
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.error || 'Failed to load designs. Please try again later.');
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 1
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className='flex -m-4 w-auto'
      columnClassName='pl-4 bg-clip-padding'
    >
      {designs.map((design) => (
        <DesignCard key={design._id} design={design} />
      ))}
    </Masonry>
  );
};

export default Explore;