import { RiSearchLine } from '@remixicon/react';

const Search = () => {
  return (
    <div className='flex items-center bg-accent py-3 px-4 rounded-full'>
      <RiSearchLine size={18} className='text-secondary mr-2' />
      <input
        className='bg-accent text-sm text-secondary rounded-full px-1 placeholder:text-secondary focus:outline-none'
        type='text'
        placeholder='Search'
      />
    </div>
  );
}

export default Search;
