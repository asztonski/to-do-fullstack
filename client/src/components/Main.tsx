interface MainProps {
  children?: React.ReactNode;
  className?: string;
}

const Main: React.FC<MainProps> = ({ children, className= "", }) => {
  return (
    <main className={`flex flex-col items-center justify-center h-screen bg-gray-100 flex-1 ${className}`}>
      {children}
    </main>
  );
};

export default Main;
