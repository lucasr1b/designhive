type DesignItemProps = {
  rank: number;
}

const DesignItem = ({ rank }: DesignItemProps) => {
  const colors: { [key: number]: string } = {
    1: 'bg-yellow-500',
    2: 'bg-gray-300',
    3: 'bg-yellow-700',
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative bg-gray-400 h-64 rounded-lg">
        <div className={`absolute top-4 left-4 flex items-center justify-center h-8 w-8 rounded-full font-medium ${colors[rank]}`}>
          {rank}
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <div className="bg-gray-400 h-6 w-6 rounded-full"></div>
        <span className='font-medium'>Lucas Ribeiro</span>
      </div>
    </div>
  );
};

export default DesignItem;