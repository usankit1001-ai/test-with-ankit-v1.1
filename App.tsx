import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { DataProvider, useData } from './context';
import HeroScene from './components/3d/HeroScene';
import { Section } from './components/Section';
import { AdminDashboard } from './components/AdminDashboard';
import { 
    CheckCircle, 
    Database, 
    Server, 
    Layout, 
    Smartphone, 
    Github, 
    Linkedin, 
    Mail, 
    Menu, 
    X,
    ExternalLink,
    Lock,
    Sun,
    Moon,
    Award,
    BookOpen,
    Quote,
    Briefcase,
    GraduationCap,
    MapPin
} from 'lucide-react';

// --- Components ---

// Fade In/Out Wrapper Component
const FadeInWhenVisible = ({ children }: { children?: React.ReactNode }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        hidden: { opacity: 0, y: 50, transition: { duration: 0.6, ease: "easeIn" } }
      }}
    >
      {children}
    </motion.div>
  );
};

// New Component for QA Visualization
const QAVisual = () => {
    return (
        <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-gray-900/50">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20" 
                style={{ 
                    backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
                    backgroundSize: '20px 20px' 
                }} 
            />
            
            {/* Central Core (System Under Test) */}
            <motion.div 
                className="w-16 h-16 rounded-lg border-2 border-teal-500 bg-teal-500/20 z-10 flex items-center justify-center relative shadow-[0_0_15px_rgba(20,184,166,0.5)]"
                animate={{ boxShadow: ["0 0 15px rgba(20,184,166,0.5)", "0 0 30px rgba(20,184,166,0.8)", "0 0 15px rgba(20,184,166,0.5)"] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
               <Database className="text-teal-400" size={24} />
            </motion.div>

            {/* Orbiting Test Nodes */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute w-40 h-40 border border-dashed border-cyan-500/30 rounded-full flex items-center justify-center"
                    style={{ 
                        top: '50%',
                        left: '50%',
                        x: '-50%', 
                        y: '-50%',
                    }}
                    animate={{ rotate: 360 + (i * 120) }}
                    transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                >
                    <motion.div 
                        className="w-3 h-3 bg-cyan-400 rounded-full absolute -top-1.5 shadow-[0_0_10px_rgba(34,211,238,0.8)]" 
                    />
                    {/* Scanning Ray */}
                    <div className="absolute top-1/2 left-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -translate-y-1/2 rotate-90" />
                </motion.div>
            ))}

            {/* Scanning Beam (Vertical) */}
            <motion.div 
                className="absolute w-full h-1 bg-gradient-to-r from-transparent via-teal-400/50 to-transparent z-20"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Scanning Beam (Horizontal) */}
             <motion.div 
                className="absolute w-1 h-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent z-20"
                animate={{ left: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
            />
            
             {/* Status Text overlay */}
             <div className="absolute bottom-4 left-4 font-mono text-xs text-teal-400 flex items-center gap-2">
                 <motion.div 
                    className="w-2 h-2 bg-teal-400 rounded-full"
                    animate={{ opacity: [1, 0.2, 1] }} 
                    transition={{ duration: 1, repeat: Infinity }}
                 />
                 <span>SYSTEM_STABLE</span>
             </div>
        </div>
    );
};

// Inline contact form component — submits via fetch to Web3Forms and stays on same page.
const ContactFormInline = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const [visible, setVisible] = useState(true);
  const fadeRef = useRef<number | null>(null);
  const clearRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (fadeRef.current) clearTimeout(fadeRef.current);
      if (clearRef.current) clearTimeout(clearRef.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus('sending');
    setFeedback('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'c2bf54c0-f2aa-4f8d-834e-784cb6f93111',
          name,
          email,
          message,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFeedback('');
        setName('');
        setEmail('');
        setMessage('');

        // show message then fade shortly before clearing
        setVisible(true);
        if (fadeRef.current) clearTimeout(fadeRef.current);
        if (clearRef.current) clearTimeout(clearRef.current);
        fadeRef.current = window.setTimeout(() => {
          setVisible(false);
        }, 4500);
        clearRef.current = window.setTimeout(() => {
          setStatus('idle');
          setFeedback('');
          fadeRef.current = null;
          clearRef.current = null;
        }, 5000);
      } else {
        setStatus('error');
        setFeedback((data && data.message) || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setFeedback('Submission failed. Please check your connection and try again.');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* hidden access key included in the POST body above */}

      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -6 }}
          transition={{ duration: 0.45 }}
          className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-800"
        >
          <div className="font-semibold">Form submitted successfully!</div>
        </motion.div>
      )}

      {status === 'error' && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800">
          <div className="font-semibold">{feedback || 'Submission failed'}</div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Name</label>
          <input
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 transition-colors"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</label>
          <input
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 transition-colors"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Message</label>
        <textarea
          name="message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 transition-colors"
          placeholder="How can I help you?"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isDark, toggleTheme } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Blog', id: 'blog' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    
    // If we are not on the home page, navigate there first
    if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation to complete then scroll
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    } else {
        // If we are already on home page, just scroll
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-gray-200/50 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" onClick={handleScrollTop} className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-500">
              {data.profile.navbarTitle}
            </a>
          </div>
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-6">
              {links.map((link) => (
                <button 
                    key={link.name} 
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-white transition-colors text-sm font-medium"
                >
                  {link.name}
                </button>
              ))}
               <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-white transition-colors"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
          <div className="lg:hidden flex items-center gap-4">
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-300"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-dark-card/95 backdrop-blur-md border-b border-gray-200 dark:border-white/5 transition-colors duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-white hover:bg-gray-50/50 dark:hover:bg-white/5"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
    const { data } = useData();
    return (
        <footer className="bg-white/50 dark:bg-black/40 backdrop-blur-md border-t border-gray-200/50 dark:border-white/5 py-12 transition-colors duration-300 relative z-10">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-500 mb-2">
                        {data.profile.navbarTitle}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        © {new Date().getFullYear()} {data.profile.name}. All rights reserved.
                    </p>
                </div>
                
                <div className="flex items-center gap-6">
                    {data.profile.linkedin && (
                        <a href={data.profile.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                            <Linkedin size={20} />
                        </a>
                    )}
                    {data.profile.github && (
                        <a href={data.profile.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                            <Github size={20} />
                        </a>
                    )}
                    {data.profile.email && (
                        <a href={`mailto:${data.profile.email}`} className="text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                            <Mail size={20} />
                        </a>
                    )}
                </div>

                <div className="mt-4 md:mt-0">
                   <Link to="/admin" className="text-gray-300 dark:text-gray-800 hover:text-teal-500 dark:hover:text-teal-500 transition-colors">
                     <Lock size={14} />
                   </Link>
                </div>
            </div>
        </footer>
    )
}

const Login = () => {
  const [password, setPassword] = useState('');
  const { login, isAdmin } = useData();

  if (isAdmin) return <Navigate to="/admin" />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center p-4 transition-colors duration-300 relative">
      <div className="bg-white/90 dark:bg-dark-card/90 backdrop-blur-md p-8 rounded-2xl border border-gray-200 dark:border-white/10 w-full max-w-md shadow-lg relative z-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Admin Access</h2>
        <form onSubmit={(e) => { e.preventDefault(); login(password); }}>
          <input
            type="password"
            placeholder="Enter password (admin123)"
            className="w-full bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 mb-4 transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition-colors">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
            <Link to="/" className="text-gray-500 hover:text-teal-500 text-sm">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

const IconMap: any = {
  Smartphone: Smartphone,
  Server: Server,
  Database: Database,
  FileText: Layout,
  CheckCircle: CheckCircle,
};

const MainLayout = () => {
  const { data, isDark } = useData();

  // Parse Hero Title to highlight last word
  const title = data.profile.heroTitle || "Test With Ankit";
  const heroTitleParts = title.split(' ');
  const lastWord = heroTitleParts.pop();
  const firstPart = heroTitleParts.join(' ');

  return (
    <div className="text-gray-900 dark:text-white transition-colors duration-300 min-h-screen relative">
      <HeroScene isDark={isDark} />
      
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* HeroScene is now global, reduced local rendering */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-teal-600 dark:text-teal-400 font-medium tracking-wider mb-4 uppercase text-sm md:text-base">
              {data.profile.tagline.split('|')[0]}
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-700 via-cyan-600 to-blue-600 dark:from-white dark:via-gray-200 dark:to-gray-400 leading-tight pb-2">
              {firstPart} <span className="text-teal-600 dark:text-teal-400">{lastWord}</span>
            </h1>
            <div className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-2 leading-relaxed pb-2">
               {data.profile.intro}
            </div>
             <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              {data.profile.intro2}
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                    const el = document.getElementById('projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-medium transition-all transform hover:scale-105 shadow-lg shadow-teal-600/20"
              >
                View My Work
              </button>
              <a href={data.profile.resumeLink} className="px-8 py-3 bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white rounded-full font-medium hover:bg-white dark:hover:bg-white/20 transition-all backdrop-blur-sm">
                Download CV
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 dark:text-gray-600"
        >
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
                <div className="w-1 h-2 bg-current rounded-full" />
            </div>
        </motion.div>
      </section>

      {/* About Section */}
      <Section id="about" title="About Me" className="bg-white/50 dark:bg-black/40 backdrop-blur-sm">
        <FadeInWhenVisible>
            <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
                className="relative"
            >
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800 flex items-center justify-center relative shadow-2xl">
                <QAVisual />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md p-6 rounded-xl shadow-xl border border-gray-100 dark:border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold text-teal-600 dark:text-teal-400">7+</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 leading-tight">Years of<br/>Experience</div>
                    </div>
                </div>
            </motion.div>
            
            <motion.div>
                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line text-lg leading-relaxed">
                        {data.profile.about}
                    </p>
                </div>
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-white/60 dark:bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                        <h4 className="text-teal-600 dark:text-teal-400 font-bold mb-1">Location</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2">
                            <MapPin size={14} /> {data.profile.location}
                        </p>
                    </div>
                    <div className="bg-white/60 dark:bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                        <h4 className="text-teal-600 dark:text-teal-400 font-bold mb-1">Contact</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2">
                            <Mail size={14} /> {data.profile.email}
                        </p>
                    </div>
                </div>
            </motion.div>
            </div>
        </FadeInWhenVisible>
      </Section>

      {/* Services Section */}
      <Section id="services" title="Services" subtitle="Specialized QA solutions tailored for reliability" className="bg-gray-50/50 dark:bg-black/20 backdrop-blur-sm">
        <FadeInWhenVisible>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.services.map((service, idx) => {
                const Icon = IconMap[service.icon] || Layout;
                return (
                <div
                    key={service.id}
                    className="flex flex-col h-full bg-white/80 dark:bg-dark-card/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-teal-500/50 transition-colors shadow-sm hover:shadow-lg dark:shadow-none group"
                >
                    <div className="w-12 h-12 bg-teal-50 dark:bg-teal-500/10 rounded-lg flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{service.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">{service.description}</p>
                    <div className="mt-auto pt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {service.tags.map(tag => (
                        <span key={tag} className="whitespace-nowrap flex-shrink-0 text-xs px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded border border-gray-200 dark:border-white/5">
                        {tag}
                        </span>
                    ))}
                    </div>
                </div>
                );
            })}
            </div>
        </FadeInWhenVisible>
      </Section>

      {/* Skills Section */}
      <Section id="skills" title="Technical Arsenal" className="bg-white/50 dark:bg-black/40 backdrop-blur-sm">
        <FadeInWhenVisible>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <Database className="text-teal-500" /> Core Competencies
                    </h3>
                    {data.skills.filter(s => ['Manual', 'API', 'Database'].includes(s.category)).map(skill => (
                        <div key={skill.id}>
                            <div className="flex justify-between mb-2">
                                <span className="font-medium text-gray-700 dark:text-gray-200">{skill.name}</span>
                                <span className="text-teal-500 font-mono">{skill.level}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <Server className="text-cyan-500" /> Tools & Automation
                    </h3>
                    {data.skills.filter(s => ['Automation', 'Tools'].includes(s.category)).map(skill => (
                        <div key={skill.id}>
                            <div className="flex justify-between mb-2">
                                <span className="font-medium text-gray-700 dark:text-gray-200">{skill.name}</span>
                                <span className="text-cyan-500 font-mono">{skill.level}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </FadeInWhenVisible>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Featured Projects" className="bg-gray-50/50 dark:bg-black/20 backdrop-blur-sm">
        <FadeInWhenVisible>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.projects.map((project, idx) => (
                    <motion.div
                        key={project.id}
                        whileHover={{ 
                            y: -10, 
                            scale: 1.02,
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                        }}
                        onClick={() => project.link && window.open(project.link, '_blank')}
                        className={`bg-white/80 dark:bg-dark-card/80 backdrop-blur-md rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5 transition-all flex flex-col ${project.link ? 'cursor-pointer' : ''}`}
                    >
                        <div className="p-6 flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    project.type === 'Mobile' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300' :
                                    project.type === 'API' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300' :
                                    'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300'
                                }`}>
                                    {project.type}
                                </span>
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-teal-500 transition-colors" onClick={(e) => e.stopPropagation()}>
                                        <ExternalLink size={18} />
                                    </a>
                                )}
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-teal-500 transition-colors">{project.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                            
                            <div className="space-y-3">
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Challenge</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-300">{project.challenges}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Outcome</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-300">{project.outcome}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50/50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 mt-auto">
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs text-gray-500 dark:text-gray-400">#{tag}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </FadeInWhenVisible>
      </Section>

      {/* Experience Section */}
      <Section id="experience" title="Work Experience" className="bg-white/50 dark:bg-black/40 backdrop-blur-sm">
        <FadeInWhenVisible>
            <div className="max-w-4xl mx-auto space-y-8 relative">
                {/* Vertical Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-white/10 hidden md:block" />

                {data.experience.map((exp, idx) => (
                    <div
                        key={exp.id}
                        className={`relative flex flex-col md:flex-row gap-8 ${
                            idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                        }`}
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-teal-500 rounded-full border-4 border-white dark:border-dark-bg z-10 hidden md:block" />

                        <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                            <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-teal-500/30 transition-colors">
                                <span className="text-sm font-mono text-teal-600 dark:text-teal-400 mb-2 block">{exp.period}</span>
                                <h3 className="text-xl font-bold">{exp.role}</h3>
                                <h4 className="text-lg text-gray-500 dark:text-gray-400 mb-4">{exp.company}</h4>
                                <ul className={`space-y-2 text-sm text-gray-600 dark:text-gray-300 list-disc ${idx % 2 === 0 ? 'ml-4' : 'ml-4 md:ml-0 md:mr-4 md:list-none'}`}>
                                    {exp.description.map((desc, i) => (
                                        <li key={i}>{desc}</li>
                                    ))}
                                </ul>
                                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 justify-start md:justify-end">
                                    <MapPin size={12} /> {exp.location}
                                </div>
                            </div>
                        </div>
                        {/* Spacer for the other side */}
                        <div className="flex-1 hidden md:block" />
                    </div>
                ))}
            </div>
        </FadeInWhenVisible>
      </Section>

      {/* Education & Certifications */}
      <Section id="education" className="bg-gray-50/50 dark:bg-black/20 backdrop-blur-sm">
         <FadeInWhenVisible>
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <GraduationCap className="text-teal-500" /> Education
                    </h3>
                    <div className="space-y-6">
                        {data.education.map(edu => (
                            <div 
                                key={edu.id}
                                className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md p-6 rounded-xl border border-gray-100 dark:border-white/5"
                            >
                                <h4 className="font-bold text-lg">{edu.school}</h4>
                                <p className="text-teal-600 dark:text-teal-400">{edu.degree}</p>
                                <p className="text-sm text-gray-400 mt-1">{edu.year}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div id="certifications">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <Award className="text-cyan-500" /> Certifications
                    </h3>
                    <div className="grid gap-4">
                        {data.certifications.map(cert => (
                            <motion.div 
                                key={cert.id}
                                whileHover={cert.link ? { scale: 1.02 } : {}}
                                onClick={() => cert.link && window.open(cert.link, '_blank')}
                                className={`bg-white/80 dark:bg-dark-card/80 backdrop-blur-md p-4 rounded-xl border border-gray-100 dark:border-white/5 flex justify-between items-center ${cert.link ? 'cursor-pointer hover:border-cyan-500/50 transition-colors' : ''}`}
                            >
                                <div>
                                    <h4 className="font-bold text-sm flex items-center gap-2">
                                        {cert.name}
                                        {cert.link && <ExternalLink size={12} className="text-gray-400" />}
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs">{cert.provider}</p>
                                </div>
                                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 px-2 py-1 rounded">
                                    {cert.date}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
         </FadeInWhenVisible>
      </Section>

       {/* Testimonials */}
       <Section id="testimonials" title="What Clients Say" className="bg-white/50 dark:bg-black/40 backdrop-blur-sm">
          <FadeInWhenVisible>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {data.testimonials.map((test, idx) => (
                    <div
                        key={test.id}
                        className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md p-8 rounded-2xl relative"
                    >
                        <Quote className="absolute top-6 left-6 text-teal-500/20 w-12 h-12" />
                        <p className="text-gray-600 dark:text-gray-300 italic mb-6 relative z-10 leading-relaxed">"{test.text}"</p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {test.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">{test.name}</h4>
                                <p className="text-xs text-gray-500">{test.role}, {test.company}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </FadeInWhenVisible>
       </Section>

      {/* Blog Section */}
      <Section id="blog" title="Latest Insights" className="bg-gray-50/50 dark:bg-black/20 backdrop-blur-sm">
         <FadeInWhenVisible>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {data.blogs.map(blog => (
                    <div
                        key={blog.id}
                        onClick={() => blog.link && window.open(blog.link, '_blank')}
                        className={`group bg-white/80 dark:bg-dark-card/80 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 hover:border-teal-500/50 transition-all ${blog.link ? 'cursor-pointer' : ''}`}
                    >
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">{blog.category}</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                <span className="text-xs text-gray-400">{blog.date}</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-teal-500 transition-colors">{blog.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{blog.excerpt}</p>
                            <div className="flex items-center text-teal-600 dark:text-teal-400 font-medium text-sm group-hover:translate-x-2 transition-transform">
                                Read Article <ExternalLink size={14} className="ml-2" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
         </FadeInWhenVisible>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="Get In Touch" subtitle="Let's connect and build something extraordinary." className="bg-white/50 dark:bg-black/40 backdrop-blur-sm">
        <FadeInWhenVisible>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Contact Information (dynamic) */}
            <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-white/5">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center">
                    <Mail className="text-teal-400" size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase text-gray-500 mb-1">Email Me</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">{data.profile.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center">
                    <Smartphone className="text-teal-400" size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase text-gray-500 mb-1">Call Me</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">{data.profile.phone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center">
                    <MapPin className="text-teal-400" size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase text-gray-500 mb-1">Location</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">{data.profile.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: contact form — submit inline via AJAX, reset fields, auto-hide success */}
            <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-white/5">
              <ContactFormInline />
            </div>
          </div>
        </FadeInWhenVisible>
      </Section>

      <Footer />
    </div>
  );
};

const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const { isAdmin } = useData();
  if (!isAdmin) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const App = () => {
  return (
    <DataProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/" element={<MainLayout />} />
        </Routes>
      </HashRouter>
    </DataProvider>
  );
};

export default App;