"use client";

import React, { useState } from "react";
import { NavigationProvider, PageTransition, useNavigation } from "@/components/NavigationProvider";
import { LandingPage } from "@/components/LandingPage";
import { Dashboard } from "@/components/Dashboard";
import { Courses } from "@/components/Courses";
import { Flashcards } from "@/components/Flashcards";
import { Roadmap } from "@/components/Roadmap";
import { AITrainer } from "@/components/AITrainer";
import { VisualLearning } from "@/components/VisualLearning";
import { RoutinePlanner } from "@/components/RoutinePlanner";
import { LayoutDashboard, BookOpen, CreditCard, Map, Brain, Eye, Clock, User, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function AppContent() {
  const { activeSection, setActiveSection } = useNavigation();
  const [showLanding, setShowLanding] = useState(true);

  const navItems = [
    { id: "dashboard", icon: <LayoutDashboard size={20} />, label: "Home", transition: "fade" },
    { id: "courses", icon: <BookOpen size={20} />, label: "Learn", transition: "fade" },
    { id: "flashcards", icon: <CreditCard size={20} />, label: "Cards", transition: "fade" },
    { id: "roadmap", icon: <Map size={20} />, label: "Path", transition: "fade" },
    { id: "ai-trainer", icon: <Brain size={20} />, label: "AI", transition: "fade" },
    { id: "visual-learning", icon: <Eye size={20} />, label: "Visual", transition: "fade" },
    { id: "routine", icon: <Clock size={20} />, label: "Routine", transition: "fade" },
  ];

  const handleGetStarted = () => {
    setShowLanding(false);
    setActiveSection("dashboard", "fade");
  };

  if (showLanding) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="h-screen w-full"
        >
          <LandingPage onGetStarted={handleGetStarted} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background text-foreground font-sans">
      {/* Dynamic Backgrounds for App Pages */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(1000px)_rotateX(60deg)_translateY(-50%)_scale(2)]" />
        </div>
        
        {/* Pulsing Neural Nodes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full blur-[100px]"
            style={{
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              left: `${(i * 30) % 100}%`,
              top: `${(i * 20) % 100}%`,
              background: i % 2 === 0 ? "rgba(0, 243, 255, 0.1)" : "rgba(168, 85, 247, 0.1)",
            }}
          />
        ))}

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            animate={{
              y: [0, -100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-10%",
            }}
          />
        ))}
      </div>

      <div className="relative h-full w-full max-w-2xl mx-auto border-x border-white/5 shadow-2xl overflow-hidden">
          <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setShowLanding(true)}
          className="absolute top-4 left-4 z-50 p-3 glass rounded-2xl text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-95"
        >
          <ArrowLeft size={20} />
        </motion.button>

        <PageTransition id="dashboard">
          <Dashboard />
        </PageTransition>

        <PageTransition id="courses">
          <Courses />
        </PageTransition>

        <PageTransition id="flashcards">
          <Flashcards />
        </PageTransition>

        <PageTransition id="roadmap">
          <Roadmap />
        </PageTransition>

        <PageTransition id="ai-trainer">
          <AITrainer />
        </PageTransition>

        <PageTransition id="visual-learning">
          <VisualLearning />
        </PageTransition>

        <PageTransition id="routine">
          <RoutinePlanner />
        </PageTransition>

        <nav className="absolute bottom-0 left-0 right-0 glass border-t border-white/10 z-50">
          <div className="flex items-center justify-between px-2 py-2 overflow-x-auto no-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id, item.transition as any)}
                className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-xl transition-all duration-300 relative min-w-[48px] ${
                  activeSection === item.id ? "text-neon-cyan" : "text-muted-foreground hover:text-white"
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-glow"
                    className="absolute -top-0.5 w-6 h-0.5 bg-neon-cyan rounded-full shadow-[0_0_10px_rgba(0,243,255,0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <div className={`transition-transform duration-300 ${activeSection === item.id ? "scale-110" : ""}`}>
                  {item.icon}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
              </button>
            ))}
            <button className="flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 text-muted-foreground hover:text-white transition-all min-w-[48px]">
              <div className="w-6 h-6 rounded-full border border-white/20 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="w-full h-full" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider">Profile</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}
