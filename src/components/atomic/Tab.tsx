type TabProps = {
  children: React.ReactNode;
  active: boolean
  onClick: () => void;
};

const Tab = ({ children, active, onClick }: TabProps) => {

  const activeClass = active ? 'bg-accent-100 text-black' : 'bg-transparent text-black';

  return (
    <button onClick={onClick} className={`flex items-center justify-center rounded-full select-none font-medium text-sm h-10 px-4 border border-accent-200 ${activeClass} hover:bg-accent-100`}>{children}</button>
  );
};

export default Tab;