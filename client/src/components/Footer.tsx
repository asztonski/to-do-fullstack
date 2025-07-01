const Footer: React.FC = () => (
  <footer className="border-t border-purple/40 bg-background/80 backdrop-blur">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-6 text-center text-xs text-purple md:flex-row md:justify-between md:text-sm">
      <span className="font-synth tracking-wide">
        © {new Date().getFullYear()} SynthTodo
      </span>

      <span className="text-purple/60">
        Built with&nbsp;
        <a
          href="https://react.dev"
          className="hover:text-yellow"
          target="_blank"
          rel="noopener noreferrer"
        >
          React&nbsp;19
        </a>
        ,&nbsp;
        <a
          href="https://vitejs.dev"
          className="hover:text-yellow"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vite
        </a>
        &nbsp;and&nbsp;Tailwind&nbsp;4
      </span>
    </div>
  </footer>
);

export default Footer;
