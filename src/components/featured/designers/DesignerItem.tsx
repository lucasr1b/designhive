import Button from '@/components/atomic/Button';

const DesignerItem = () => {
  return (
    <div className='flex flex-row items-start py-3 px-2 gap-2'>
      <div className='bg-gray-400 rounded-full h-6 w-6'></div>
      <div className='flex flex-col'>
        <span className='font-medium'>Lucas Ribeiro</span>
        <span className='text-xs text-base-200'>@lucascodes</span>
      </div>
      <Button xsmall outline className='ml-auto'>Follow</Button>
    </div>
  );
};

export default DesignerItem;