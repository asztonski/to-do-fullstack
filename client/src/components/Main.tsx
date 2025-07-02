interface MainProps {
  children?: React.ReactNode;
  className?: string;
}

const Main: React.FC<MainProps> = ({ children, className= "", }) => {
  return (
    <main className={`flex flex-col items-center justify-center h-screen bg-background flex-1 ${className}`}>
      {children}
    </main>
  );
};

export default Main;
