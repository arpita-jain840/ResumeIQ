import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Analyze Resume', href: '/analyze' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Rewrite Resume', href: '/rewrite' },
  { label: 'Cover Letter', href: '/cover-letter' },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050816]/65 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.45)]">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="text-base font-semibold tracking-wide">ResumeIQ</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">AI Resume Intelligence</p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`text-sm transition ${location.pathname === item.href ? 'text-white' : 'text-slate-300 hover:text-white'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            to="/analyze"
            className="rounded-full bg-linear-to-r from-blue-600 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(37,99,235,0.45)] transition hover:scale-[1.02]"
          >
            Analyze Resume
          </Link>
        </div>

        <button
          type="button"
          className="rounded-full border border-white/10 bg-white/5 p-2 text-white md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/10 bg-[#050816]/95 px-4 py-4 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/analyze"
              className="rounded-2xl bg-linear-to-r from-blue-600 to-cyan-400 px-4 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Analyze Resume
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}

export default Navbar;
