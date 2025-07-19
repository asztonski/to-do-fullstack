interface MainProps {
  children?: React.ReactNode;
  className?: string;
}

const Main: React.FC<divProps> = ({ children, className= "", }) => {
  return (
    <div className={`flex flex-col items-center justify-center bg-background flex-1 ${className}`}>
      {children}
    </div>
  );
};

export default Main;
