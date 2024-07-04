import { RiSearchLine } from '@remixicon/react';

const Search = () => {
  return (
    <div className='flex items-center bg-accent-100 py-3 px-4 rounded-full'>
      <RiSearchLine size={18} className='text-base-200 mr-2' />
      <input
        className='bg-inherit text-sm text-base-200 rounded-full px-1 placeholder:text-base-200 focus:outline-none'
        type='text'
        placeholder='Search'
      />
    </div>
  );
}

export default Search;
