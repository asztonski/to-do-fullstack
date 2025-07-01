import { Link } from "react-router-dom";

const Header: React.FC = () => (
  <header className="sticky top-0 z-50 w-full border-b border-purple/40 bg-background/80 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
      {/* neon logo */}
      <Link
        to="/"
        className="text-2xl font-synth tracking-wider text-pink drop-shadow-[0_0_6px_#ff7edb]"
      >
        SynthTodo
      </Link>

      {/* nav placeholder */}
      <nav className="hidden space-x-6 md:block">
        <Link
          to="/history"
          className="font-synth text-green transition-all hover:text-yellow"
        >
          History
        </Link>
        <Link
          to="/login"
          className="font-synth text-blue transition-all hover:text-yellow"
        >
          Login
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
