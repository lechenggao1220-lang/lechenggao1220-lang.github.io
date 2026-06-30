import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import InteractiveLogo from './InteractiveLogo';

const navLinks = [
  { label: '首页', path: '/' },
  { label: '产品', path: '/products' },
  { label: '科技', path: '/technology' },
  { label: '哲学', path: '/philosophy' },
  { label: '关于', path: '/about' },
  { label: '科研', path: '/research' },
  { label: '动态', path: '/news' },
  { label: '联系', path: '/contact' },
];

const productLinks = [
  { label: '神元 BCI', path: '/products' },
  { label: '醉醒问心', path: '/products' },
  { label: 'EAP服务', path: '/products' },
];

const socialLinks = [
  { label: '微信公众号', href: '#' },
  { label: '小红书', href: '#' },
  { label: 'B站', href: '#' },
  { label: '知乎', href: '#' },
  { label: '邮箱', href: 'mailto:hello@drunkbutawake.com' },
  { label: '电话', href: 'tel:+8657188888888' },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <footer ref={ref} className="bg-deep-purple border-t border-brand-gold/10">
      {/* Upper Area */}
      <div className="container-main py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left - Logo Area */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <InteractiveLogo size={200} />
            <h3 className="mt-6 font-noto-serif text-display-m text-brand-gold">
              Drunk But Awake
            </h3>
            <p className="mt-3 text-white/60 font-noto-sans text-lg tracking-[0.02em]">
              人生体验，醉醒之间
            </p>
          </motion.div>

          {/* Right - Link Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {/* Column 1 - Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <h4 className="text-brand-gold text-xs font-medium tracking-[0.08em] uppercase mb-6">
                导航
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-brand-gold transition-colors duration-300 font-noto-sans"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 2 - Products */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <h4 className="text-brand-gold text-xs font-medium tracking-[0.08em] uppercase mb-6">
                产品
              </h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-brand-gold transition-colors duration-300 font-noto-sans"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3 - Connect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <h4 className="text-brand-gold text-xs font-medium tracking-[0.08em] uppercase mb-6">
                连接
              </h4>
              <ul className="space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-brand-gold transition-colors duration-300 font-noto-sans"
                      onClick={(e) => link.href === '#' && e.preventDefault()}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Lower Area */}
      <div className="border-t border-brand-gold/15">
        <div className="container-main py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm font-noto-sans">
            醉醒（杭州）心理咨询有限公司
          </p>
          <p className="text-white/30 text-xs font-noto-sans">
            浙ICP备XXXXXXXX号
          </p>
          <p className="text-brand-gold/80 text-sm font-noto-serif tracking-[0.1em]">
            真 · 美 · 乐
          </p>
        </div>
      </div>
    </footer>
  );
}
