import Designers from './Designers';
import Designs from './Designs';
import Search from './Search';

const Featured = () => {
  return (
    <div className='flex flex-col gap-8 w-1/4 border border-black'>
      <Search />
      <Designers />
      <Designs />
    </div>
  );
};

export default Featured;