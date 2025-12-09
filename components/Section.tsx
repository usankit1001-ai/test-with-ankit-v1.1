
import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const Section: React.FC<SectionProps> = ({ id, className = "", children, title, subtitle }) => {
  return (
    <section id={id} className={`py-20 px-4 md:px-8 relative ${className}`}>
      <div className="max-w-7xl mx-auto relative z-10">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            {title && <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500 mb-4">{title}</h2>}
            {subtitle && <p className="text-gray-400 max-w-2xl mx-auto text-lg">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
};
