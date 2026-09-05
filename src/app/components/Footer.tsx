import { motion } from 'motion/react';
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
    { icon: Mail, label: 'Email', href: '#' },
  ];

  const links = {
    Shop: ['New Arrivals', 'Best Sellers', 'Collections', 'Sale'],
    About: ['Our Story', 'Sustainability', 'Careers', 'Press'],
    Support: ['Contact', 'Shipping', 'Returns', 'FAQ'],
    Community: ['Creator Program', 'Style Guide', 'Blog', 'Events'],
  };

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="text-3xl mb-4">
                <span className="font-light">STREET</span>
                <span className="font-semibold">FITS</span>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                Next-generation fashion for the modern generation. Express yourself through style.
              </p>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-sm text-neutral-400 mb-3">Join our community</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
                >
                  Join
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <h3 className="mb-4">{category}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-neutral-400 text-sm"
          >
            © 2026 StreetFits. All rights reserved.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex gap-6 text-sm"
          >
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              Cookies
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
