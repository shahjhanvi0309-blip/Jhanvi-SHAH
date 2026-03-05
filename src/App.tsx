/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowDown, Mail, Instagram, Linkedin, User, MapPin, GraduationCap, BookOpen } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress: rawProgress, scrollY } = useScroll();
  
  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroImageY = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative cursor-none">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-warm-accent z-[100] pointer-events-none hidden md:block"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-warm-accent rounded-full z-[100] pointer-events-none hidden md:block"
        animate={{ x: mousePos.x - 2, y: mousePos.y - 2 }}
        transition={{ type: "spring", stiffness: 1000, damping: 28, mass: 0.1 }}
      />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-warm-accent z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center mix-blend-difference text-white">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-serif tracking-tighter"
        >
          JS.
        </motion.div>
        <div className="hidden md:flex space-x-12">
          {['home', 'about', 'education', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className={`nav-link ${activeSection === item ? 'active' : ''}`}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="scroll-section relative overflow-hidden bg-warm-bg">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <span className="text-sm uppercase tracking-[0.3em] text-warm-accent font-semibold mb-4 block">
              Digital Strategist in the making
            </span>
            <h1 className="text-7xl md:text-9xl font-light leading-none mb-8">
              Jhanvi <br />
              <span className="italic ml-12 md:ml-24">Shah</span>
            </h1>
            <p className="text-lg md:text-xl max-w-md opacity-70 font-light leading-relaxed mb-12">
              Crafting digital narratives and strategic experiences. Currently exploring the intersection of technology and human behavior.
            </p>
            <button 
              onClick={() => scrollTo('about')}
              className="group flex items-center space-x-4 text-sm uppercase tracking-widest font-bold"
            >
              <span>Explore My World</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ y: heroImageY }}
            className="relative h-[500px] md:h-[700px] rounded-[200px] overflow-hidden border border-warm-ink/10"
          >
            <img 
              src="https://picsum.photos/seed/jhanvi/800/1200" 
              alt="Jhanvi Shah" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-warm-accent/10 mix-blend-multiply" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-section bg-warm-ink text-warm-bg">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-light mb-12 italic border-b border-warm-bg/20 pb-8">
              The Story So Far
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6 text-lg font-light opacity-80 leading-relaxed">
                <p>
                  I am an 18-year-old visionary with a passion for understanding how digital ecosystems thrive. My journey is driven by curiosity and a relentless pursuit of strategic excellence.
                </p>
                <p>
                  Based in Mumbai, I am constantly inspired by the city's dynamic energy, which I translate into my approach to digital strategy.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 border border-warm-bg/10 rounded-2xl">
                  <User className="w-6 h-6 mb-4 text-warm-bg/40" />
                  <h4 className="text-xs uppercase tracking-widest opacity-50 mb-1">Age</h4>
                  <p className="text-2xl font-serif">18 Years</p>
                </div>
                <div className="p-6 border border-warm-bg/10 rounded-2xl">
                  <MapPin className="w-6 h-6 mb-4 text-warm-bg/40" />
                  <h4 className="text-xs uppercase tracking-widest opacity-50 mb-1">Location</h4>
                  <p className="text-2xl font-serif">Mumbai, IN</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="scroll-section bg-warm-bg">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row gap-20">
            <div className="md:w-1/3">
              <h2 className="text-5xl md:text-7xl font-light mb-6">Academic <br />Path</h2>
              <p className="text-warm-accent font-medium tracking-widest uppercase text-xs">Foundation of Strategy</p>
            </div>
            <div className="md:w-2/3 space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative pl-12 border-l border-warm-ink/10"
              >
                <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-warm-accent" />
                <GraduationCap className="w-8 h-8 mb-4 opacity-20" />
                <span className="text-xs font-bold tracking-widest opacity-40 uppercase mb-2 block">2025 — Present</span>
                <h3 className="text-3xl md:text-4xl font-serif mb-2 group-hover:italic transition-all">FYBDS Bachelors in Digital Strategy</h3>
                <p className="text-xl opacity-60 mb-4">Jai Hind College, Mumbai</p>
                <div className="flex flex-wrap gap-2">
                  {['Market Analysis', 'Digital Architecture', 'Consumer Behavior', 'Strategic Planning'].map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-full border border-warm-ink/10 text-[10px] uppercase tracking-wider">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="group relative pl-12 border-l border-warm-ink/10"
              >
                <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-warm-ink/20" />
                <BookOpen className="w-8 h-8 mb-4 opacity-20" />
                <span className="text-xs font-bold tracking-widest opacity-40 uppercase mb-2 block">Prior Education</span>
                <h3 className="text-3xl md:text-4xl font-serif mb-2">Higher Secondary Education</h3>
                <p className="text-xl opacity-60">Focusing on Business & Communications</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-section bg-warm-accent text-white">
        <div className="max-w-4xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-8xl font-light mb-12">Let's build the <br /><span className="italic">future.</span></h2>
            <p className="text-xl opacity-80 mb-16 max-w-xl mx-auto font-light">
              Always open to collaborations, strategic discussions, or just a warm conversation about the digital world.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
              <a href="mailto:shahjhanvi0309@gmail.com" className="flex items-center space-x-3 text-2xl font-serif hover:italic transition-all">
                <Mail className="w-6 h-6" />
                <span>Email Me</span>
              </a>
              <div className="flex space-x-8">
                <a href="#" className="p-4 rounded-full border border-white/20 hover:bg-white hover:text-warm-accent transition-all">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="p-4 rounded-full border border-white/20 hover:bg-white hover:text-warm-accent transition-all">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
        
        <footer className="absolute bottom-12 left-0 w-full px-12 flex justify-between items-center opacity-40 text-[10px] uppercase tracking-[0.3em]">
          <span>© 2026 Jhanvi Shah</span>
          <span>Mumbai, India</span>
        </footer>
      </section>
    </div>
  );
}
