"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useSpring } from "framer-motion";
import { Sparkles, Brain, BookOpen, Clock, ChartBar, Rocket, ArrowRight, Play, Zap, Send, MessageSquare, X, Bot, User as UserIcon, RefreshCcw, LayoutDashboard, Search, Settings, Bell, Star, MoreHorizontal, Paperclip, Mic, Image as ImageIcon, ChevronRight, GraduationCap, Laptop, Target, Zap as ZapIcon, Cpu, Globe, Layers, Activity } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

const NeuralBackground = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
  const planetRotateX = useTransform(mouseY, [0, 1200], [20, -20]);
  const planetRotateY = useTransform(mouseX, [0, 1920], [-25, 25]);

  const nodes = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: i,
      size: 2 + Math.random() * 6,
      radius: 400 + Math.random() * 600,
      color: i % 3 === 0 ? "#00f3ff" : i % 3 === 1 ? "#a855f7" : "#ffffff",
      orbitX: Math.random() * 360,
      orbitY: Math.random() * 360,
      orbitZ: Math.random() * 360,
      speed: 0.1 + Math.random() * 0.3,
      delay: -Math.random() * 100,
      path: Math.floor(Math.random() * 2) // 0: standard, 1: erratic
    }));
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center bg-[#010103]">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,243,255,0.1),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] mix-blend-overlay" />
      </div>
      
      <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "5000px" }}>
        <motion.div
          style={{ 
            transformStyle: "preserve-3d",
            rotateX: planetRotateX,
            rotateY: planetRotateY
          }}
          className="relative w-[600px] h-[600px]"
        >
          {/* Saturn Body */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px]"
            />
            
            <motion.div 
              animate={{ rotateY: 360 }}
              transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
              className="relative w-80 h-80 rounded-full bg-gradient-to-br from-[#0a0a1a] via-[#1a1a3a] to-[#0a0a1a] border border-white/5 overflow-hidden shadow-[inset_0_0_80px_rgba(0,243,255,0.15)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,243,255,0.2),transparent_60%)]" />
              <div className="absolute inset-0 opacity-20">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="absolute inset-0 border-[0.5px] border-cyan-400/30 rounded-full" style={{ transform: `rotateX(${i * 15}deg)` }} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Saturn Rings - Deeply Detailed */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px]" style={{ transform: "rotateX(78deg) rotateY(5deg)", transformStyle: "preserve-3d" }}>
            <motion.div 
              animate={{ rotateZ: 360 }}
              transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
              className="w-full h-full relative"
            >
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute inset-0 rounded-full border-[1px]"
                  style={{ 
                    transform: `scale(${0.3 + i * 0.05})`,
                    borderColor: i % 2 === 0 ? 'rgba(0, 243, 255, 0.15)' : 'rgba(168, 85, 247, 0.12)',
                    boxShadow: i % 4 === 0 ? '0 0 40px rgba(0, 243, 255, 0.1)' : 'none'
                  }} 
                >
                  <motion.div 
                    animate={{ rotateZ: -360 }}
                    transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full blur-[2px] shadow-[0_0_15px_#00f3ff]"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Erratic Satellites */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `translate(-50%, -50%) rotateX(${node.orbitX}deg) rotateY(${node.orbitY}deg) rotateZ(${node.orbitZ}deg)`,
              transformStyle: "preserve-3d"
            }}
          >
            <motion.div
              animate={{ 
                rotateZ: 360,
                x: node.path === 1 ? [0, 150, -150, 0] : 0,
                y: node.path === 1 ? [0, -120, 120, 0] : 0,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotateZ: { duration: 30 + Math.random() * 50, repeat: Infinity, ease: "linear", delay: node.delay },
                x: { duration: 10 + Math.random() * 8, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 15 + Math.random() * 10, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ width: node.radius * 2, height: node.radius * 2 }}
              className="relative"
            >
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
                style={{
                  width: node.size,
                  height: node.size,
                  backgroundColor: node.color,
                  boxShadow: `0 0 20px ${node.color}, 0 0 40px ${node.color}44`,
                  transform: `translateZ(${node.radius / 2}px)`
                }}
              />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-32 bg-gradient-to-t from-transparent via-white/10 to-transparent" style={{ transform: `translateY(-100%)` }} />
            </motion.div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            animate={{ 
              y: [-30, 30], 
              x: [-15, 15],
              opacity: [0, 0.4, 0] 
            }}
            transition={{ 
              duration: 4 + Math.random() * 6, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-[1.5px] h-[1.5px] bg-white/50 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
};

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-[100] px-10 py-6 flex items-center justify-between glass border-b border-white/5 backdrop-blur-3xl">
    <div className="flex items-center gap-5 group cursor-pointer">
      <motion.div 
        whileHover={{ rotate: 12, scale: 1.05 }}
        className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-2xl shadow-cyan-400/20"
      >
        <GraduationCap className="w-6 h-6 text-white" />
      </motion.div>
      <div>
        <h1 className="text-xl font-black text-white tracking-tighter leading-none">EduMentor AI</h1>
        <p className="text-[7px] text-cyan-400 font-black uppercase tracking-[0.5em] mt-2 opacity-60">Neural Core v5.1</p>
      </div>
    </div>
    
    <nav className="hidden lg:flex items-center gap-14">
      {['Synapse', 'Logic', 'Synthesis'].map(item => (
        <a key={item} href={`#${item.toLowerCase()}`} className="text-[9px] font-black text-white/30 hover:text-cyan-400 uppercase tracking-[0.5em] transition-all duration-300">{item}</a>
      ))}
    </nav>

    <motion.button 
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.12)" }}
      whileTap={{ scale: 0.95 }}
      className="px-7 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase tracking-[0.3em] transition-all"
    >
      Initialize
    </motion.button>
  </header>
);

const FeatureCard = ({ icon: Icon, title, desc, delay, color = "cyan", mouseX, mouseY }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const rotateX = useSpring(useTransform(mouseY, [0, 1200], [5, -5]), { stiffness: 150, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1920], [-5, 5]), { stiffness: 150, damping: 30 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.4, delay, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -12, scale: 1.03 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="glass p-12 rounded-[3rem] border border-white/5 relative group cursor-pointer backdrop-blur-3xl overflow-hidden"
    >
      <div className={`absolute -top-32 -right-32 w-96 h-96 bg-${color}-500/5 blur-[140px] group-hover:bg-${color}-500/15 transition-all duration-1000`} />
      
      <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
        <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-all border border-white/5 group-hover:border-cyan-400/30`}>
          <Icon className={`w-7 h-7 text-${color}-400 shadow-[0_0_15px_currentColor]`} />
        </div>
        <h3 className="text-2xl font-black text-white mb-5 tracking-tight group-hover:text-cyan-400 transition-colors">{title}</h3>
        <p className="text-[14px] text-white/30 leading-relaxed font-bold tracking-tight mb-10 group-hover:text-white/50 transition-colors">{desc}</p>
        <div className="flex items-center gap-3 text-[10px] font-black text-cyan-400 uppercase tracking-[0.5em] opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
          Sync Interface <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
};

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const mouseX = useSpring(0, { stiffness: 100, damping: 40 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 40 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.85]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    let animationFrame: number;
    let lastTime = 0;
    
    const scroll = (time: number) => {
      if (isAutoScrolling && containerRef.current) {
        if (lastTime !== 0) {
          const delta = time - lastTime;
          const currentScroll = containerRef.current.scrollTop;
          const viewportHeight = containerRef.current.clientHeight;
          
          // Dwell Logic: Identify if we're near a text-heavy section
          const synapseOffset = document.getElementById('synapse')?.offsetTop || 0;
          const synthesisOffset = document.getElementById('synthesis')?.offsetTop || 0;
          
            let scrollSpeed = 0.15; // Increased default scroll speed
            
            const isNearSynapse = Math.abs(currentScroll - synapseOffset) < viewportHeight * 0.3;
            const isNearSynthesis = Math.abs(currentScroll - synthesisOffset) < viewportHeight * 0.3;
            
            if (isNearSynapse || isNearSynthesis) {
              scrollSpeed = 0.01; // Enhanced dwell: stay longer where texts are
            }

          const maxScroll = containerRef.current.scrollHeight - viewportHeight;
          if (currentScroll < maxScroll) {
            containerRef.current.scrollTop += scrollSpeed * delta;
          }
        }
        lastTime = time;
        animationFrame = requestAnimationFrame(scroll);
      }
    };
    
    if (isAutoScrolling) animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [isAutoScrolling]);

  const handleInteraction = () => {
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 15000); 
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onWheel={handleInteraction}
      onTouchStart={handleInteraction}
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden no-scrollbar bg-[#010103] selection:bg-cyan-500/40"
    >
      <Header />
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <NeuralBackground mouseX={mouseX} mouseY={mouseY} />
      </div>

      {/* Hero Section */}
      <motion.section
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {/* Tagline: Bold & Cinematic */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.4, ease: "easeOut" }}
            className="mb-14 relative"
          >
            <div className="absolute inset-0 blur-3xl bg-cyan-400/20 -z-10 scale-150" />
            <span className="text-[15px] md:text-[18px] font-black text-white uppercase tracking-[1.5em] block mb-5 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              WHERE LEARNING MEETS <span className="text-cyan-400 drop-shadow-[0_0_30px_rgba(0,243,255,1)]">INTELLIGENCE</span>
            </span>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 1.2 }}
              className="w-72 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto" 
            />
          </motion.div>

          <div className="flex flex-col items-center gap-8 mb-14">
            <motion.div 
              whileHover={{ scale: 1.05, borderColor: "rgba(0,243,255,0.3)" }}
              className="px-10 py-3 rounded-full bg-white/5 border border-white/5 backdrop-blur-3xl transition-all"
            >
              <span className="text-[11px] font-black text-white/50 uppercase tracking-[0.8em]">Neural Protocol 5.1.0</span>
            </motion.div>
          </div>

          <h2 className="text-6xl md:text-[10rem] font-black text-white tracking-tighter leading-[0.75] mb-14 select-none group">
            EDU<span className="text-cyan-400 drop-shadow-[0_0_40px_rgba(0,243,255,0.5)] group-hover:text-purple-400 transition-colors duration-1000">MENTOR</span><br />
            <span className="text-white/5 uppercase tracking-[1.8em] text-[0.11em] font-black block mt-8">Cognitive Evolution Interface</span>
          </h2>

          <p className="text-[12px] md:text-[14px] font-black text-white/25 tracking-[0.45em] uppercase max-w-4xl mx-auto leading-loose mb-20 px-6">
            A high-fidelity <span className="text-white/60">neural sandbox</span> engineered for rapid knowledge synthesis and recursive memory consolidation.
          </p>

          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.05, boxShadow: "0 0 70px rgba(0,243,255,0.35)" }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-14 py-7 bg-white text-black rounded-[2.5rem] font-black text-[15px] uppercase tracking-[0.3em] flex items-center gap-7 shadow-4xl transition-all overflow-hidden"
          >
            <span className="relative z-10">Initialize System</span> <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Logic/Operations Section */}
      <section className="relative min-h-screen py-48 px-6 z-10 overflow-hidden" id="synapse">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_30%,rgba(0,243,255,0.1),transparent_70%)] pointer-events-none" />
        
        {/* Aesthetic Background: Scanning Lines */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div className="h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(0,243,255,0.1),transparent,rgba(168,85,247,0.1))] bg-[length:100%_4px,100%_100%]" />
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-40 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-5 px-6 py-2.5 rounded-2xl bg-white/5 border border-white/5 mb-12">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-black tracking-[0.6em] uppercase text-[10px]">Logic Core v5.1</span>
              </div>
              <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-none mb-12">
                NEURAL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white/80 to-purple-500">DYNAMIC</span>
              </h2>
              <p className="text-[15px] text-white/30 font-bold leading-relaxed max-w-lg mb-16 uppercase tracking-tight">
                Accelerated <span className="text-white/60">learning architecture</span> engineered for deep cognitive mapping and high-velocity logic synthesis.
              </p>
              
              <div className="space-y-10">
                {[
                  { icon: Activity, l: "Protocols", d: "Cognitive load balancing & performance synthesis." },
                  { icon: Layers, l: "Synthetics", d: "Deep recursive knowledge mapping systems." }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 15 }}
                    className="flex gap-8 items-start group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-400/20 transition-all border border-white/5 group-hover:border-cyan-400/30">
                      <item.icon className="w-7 h-7 text-white/40 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-[16px] font-black text-white tracking-widest mb-2 uppercase group-hover:text-cyan-400 transition-colors">{item.l}</h4>
                      <p className="text-[13px] text-white/20 font-bold group-hover:text-white/50 transition-colors leading-relaxed">{item.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6 }}
              className="relative group"
            >
              <div className="absolute -inset-16 bg-cyan-400/10 blur-[120px] rounded-full group-hover:bg-cyan-400/20 transition-all duration-1000" />
              <div className="relative aspect-[16/10] glass rounded-[3.5rem] border border-white/5 p-2 bg-gradient-to-br from-white/10 to-transparent shadow-4xl hover:scale-[1.03] transition-transform duration-1000 overflow-hidden">
                <div className="h-full w-full rounded-[3.3rem] bg-[#020205] p-12 flex flex-col gap-10 overflow-hidden relative">
                  <div className="flex items-center justify-between border-b border-white/5 pb-10">
                    <div className="flex gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-cyan-400/5 flex items-center justify-center border border-white/5">
                        <UserIcon className="text-cyan-400 w-7 h-7" />
                      </div>
                      <div className="space-y-3 pt-2">
                        <div className="h-3 w-48 bg-white/10 rounded-full" />
                        <div className="h-2 w-28 bg-white/5 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-8 flex-1">
                    <div className="col-span-8 glass border border-white/5 rounded-[2.5rem] p-10 bg-white/[0.02]">
                      <div className="space-y-8">
                        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: "92%" }} transition={{ duration: 3 }} className="h-full bg-cyan-400 shadow-[0_0_20px_rgba(0,243,255,0.6)]" />
                        </div>
                        <div className="grid grid-cols-3 gap-5">
                          {[1,2,3].map(i => <div key={i} className="h-14 bg-white/5 rounded-2xl border border-white/5 group-hover:border-cyan-400/20 transition-colors" />)}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-4 h-full glass border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-center items-center gap-6 bg-white/[0.02]">
                      <ZapIcon className="w-12 h-12 text-cyan-400 opacity-60 animate-pulse" />
                      <div className="h-2 w-full bg-white/10 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Synthesis Section */}
      <section className="relative py-48 px-6 z-10 overflow-hidden" id="synthesis">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_70%,rgba(168,85,247,0.1),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-40">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4 }}
              viewport={{ once: true }}
            >
              <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-none mb-10">
                NEURAL <span className="text-white/10 uppercase tracking-[0.5em] text-[0.2em] font-black">Synthesis</span>
              </h2>
              <p className="text-[14px] text-white/20 font-black leading-tight uppercase tracking-[0.5em] max-w-3xl mx-auto">
                High-fidelity protocols for <span className="text-white/60">peak knowledge</span> assimilation and cognitive expansion.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={ZapIcon} 
              title="AI Mentor" 
              desc="Deep logic verification and multi-modal model reconstruction systems." 
              delay={0.1}
              color="cyan"
              mouseX={mouseX}
              mouseY={mouseY}
            />
            <FeatureCard 
              icon={Brain} 
              title="Neural Maps" 
              desc="Advanced structural mapping for complex multi-dimensional knowledge domains." 
              delay={0.2}
              color="purple"
              mouseX={mouseX}
              mouseY={mouseY}
            />
            <FeatureCard 
              icon={Rocket} 
              title="Rapid Track" 
              desc="High-velocity trajectories engineered for rapid assimilation and recall." 
              delay={0.3}
              color="blue"
              mouseX={mouseX}
              mouseY={mouseY}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-72 px-6 z-10 text-center overflow-hidden">
        <div className="absolute inset-0 bg-cyan-400/[0.02] blur-[160px]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-7xl md:text-[11rem] font-black text-white tracking-tighter leading-[0.75] mb-20 select-none">
            START YOUR <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500 drop-shadow-[0_0_50px_rgba(0,243,255,0.3)]">EVOLUTION</span>
          </h2>
          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.05, boxShadow: "0 0 90px rgba(0,243,255,0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="px-20 py-8 bg-cyan-400 text-black rounded-[3rem] font-black text-[16px] uppercase tracking-[0.6em] relative overflow-hidden group shadow-4xl"
          >
            <span className="relative z-10">INITIALIZE SYSTEM</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-25 transition-opacity" />
          </motion.button>
        </motion.div>
      </section>

      <footer className="relative py-40 px-12 border-t border-white/5 bg-[#010103] backdrop-blur-3xl z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-20 mb-24">
            <div className="flex items-center gap-6 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-4xl group-hover:rotate-12 transition-transform duration-500">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="font-black text-4xl text-white tracking-tighter block leading-none">EduMentor AI</span>
                <span className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.6em] mt-3 block opacity-50">Neural Core System v5.1</span>
              </div>
            </div>
            
            <div className="flex gap-16">
              {['X', 'Github', 'Discord', 'Docs'].map(s => (
                <a key={s} href="#" className="text-[11px] text-white/30 hover:text-white font-black uppercase tracking-[0.4em] transition-all duration-300">{s}</a>
              ))}
            </div>
          </div>
          
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-[10px] text-white/10 font-black tracking-[0.6em] uppercase">
              © 2024 NEURAL EVOLUTION SYSTEMS. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-12 text-[10px] text-white/10 font-black uppercase tracking-[0.4em]">
              <a href="#" className="hover:text-white/40 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/40 transition-colors">Terms of Protocol</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
