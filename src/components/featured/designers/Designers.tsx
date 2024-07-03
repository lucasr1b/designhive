import DesignerItem from './DesignerItem';

const Designers = () => {
  return (
    <div className='border rounded-xl border-accent-200 p-4'>
      <h1 className='font-semibold text-xl mb-4'>Featured designers</h1>
      <div className='flex flex-col'>
        <DesignerItem />
        <DesignerItem />
        <DesignerItem />
      </div>
    </div>
  );
};

export default Designers;