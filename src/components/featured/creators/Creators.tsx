import CreatorItem from './CreatorItem';

const Designers = () => {
  return (
    <div className='border rounded-xl border-accent-200 px-8 py-6'>
      <h1 className='font-semibold text-xl mb-4'>Featured creators</h1>
      <div className='flex flex-col'>
        <CreatorItem />
        <CreatorItem />
        <CreatorItem />
      </div>
    </div>
  );
};

export default Designers;