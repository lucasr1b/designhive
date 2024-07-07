import Button from '@/components/atomic/Button';

const CreatorItem = () => {
  return (
    <div className='flex flex-row items-start py-3 gap-2'>
      <div className='bg-gray-400 rounded-full h-6 w-6 shrink-0'></div>
      <div className='flex flex-col'>
        <span className='font-medium leading-5'>Lucas Ribeiro</span>
        <span className='text-xs text-base-200 font-medium'>@lucascodes</span>
      </div>
      <Button xsmall outline className='ml-auto'>Follow</Button>
    </div>
  );
};

export default CreatorItem;