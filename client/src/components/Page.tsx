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
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

export default Page;
