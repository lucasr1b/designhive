import DesignItem from './DesignItem';

const Designs = () => {
  return (
    <div className='border rounded-xl border-accent-200 px-8 py-6'>
      <h1 className='font-semibold text-xl mb-6'>Trending designs</h1>
      <div className='flex flex-col gap-6'>
        <DesignItem rank={1} />
        <DesignItem rank={2} />
        <DesignItem rank={3} />
      </div>
    </div>
  );
};

export default Designs;