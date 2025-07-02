import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

interface PageProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title, children }) => {
  /* optional dynamic <title> */
  React.useEffect(() => {
    if (title) document.title = `${title} | SynthTodo`;
  }, [title]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-purple/40 to-background text-white">
      <Header />
      <div className="flex-1 flex justify-center items-center bg-background">{children}</div>
      <Footer />
    </div>
  );
};

export default Page;
