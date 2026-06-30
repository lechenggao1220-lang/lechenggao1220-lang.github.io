import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import InteractiveLogo from './InteractiveLogo';

const navLinks = [
  { label: '首页', path: '/' },
  { label: '产品', path: '/products' },
  { label: '科技', path: '/technology' },
  { label: '哲学', path: '/philosophy' },
  { label: '关于', path: '/about' },
  { label: '科研', path: '/research' },
  { label: '动态', path: '/news' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-smooth"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        style={{
          background: scrolled ? 'rgba(26,10,46,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.1)' : '1px solid transparent',
        }}
      >
        <div className="container-main flex items-center justify-between h-20">
          {/* Logo */}
          <InteractiveLogo size={100} />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-noto-sans text-base tracking-[0.02em] transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-brand-gold'
                    : 'text-white/80 hover:text-brand-gold'
                }`}
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[1px] bg-brand-gold"
                  initial={false}
                  animate={{
                    width: location.pathname === link.path ? '100%' : '0%',
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number] }}
                />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-2.5 border border-brand-gold text-brand-gold rounded-full font-noto-sans text-sm font-medium transition-all duration-300 hover:bg-brand-gold/10 hover:shadow-gold"
            >
              联系我们
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-deep-purple flex flex-col items-center justify-center"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                >
                  <Link
                    to={link.path}
                    className={`font-noto-serif text-3xl ${
                      location.pathname === link.path
                        ? 'text-brand-gold'
                        : 'text-white hover:text-brand-gold'
                    } transition-colors duration-300`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.1 + navLinks.length * 0.08,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
              >
                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center px-8 py-3 border border-brand-gold text-brand-gold rounded-full font-noto-sans text-lg font-medium"
                >
                  联系我们
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
