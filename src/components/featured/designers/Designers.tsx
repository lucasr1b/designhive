import DesignersItem from './DesignersItem';

const Designers = () => {
  return (
    <div className='border-2 rounded-xl border-accent-secondary p-4'>
      <h1 className='font-medium text-xl mb-4'>Featured designers</h1>
      <div className='flex flex-col'>
        <DesignersItem />
        <DesignersItem />
        <DesignersItem />
      </div>
    </div>
  );
};

export default Designers;