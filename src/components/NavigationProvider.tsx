"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

type TransitionType = "zoom" | "whip-right" | "whip-left" | "whip-up" | "whip-down" | "spin" | "flash" | "fade";

interface NavigationContextType {
  activeSection: string;
  setActiveSection: (section: string, transition?: TransitionType) => void;
  transitionType: TransitionType;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error("useNavigation must be used within a NavigationProvider");
  return context;
};

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSectionState] = useState("dashboard");
  const [transitionType, setTransitionType] = useState<TransitionType>("zoom");

  const setActiveSection = (section: string, transition: TransitionType = "zoom") => {
    setTransitionType(transition);
    setActiveSectionState(section);
  };

  return (
    <NavigationContext.Provider value={{ activeSection, setActiveSection, transitionType }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const PageTransition = ({ children, id }: { children: ReactNode; id: string }) => {
  const { activeSection, transitionType } = useNavigation();

  const variants = {
    zoom: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 1.1, opacity: 0 },
    },
    "whip-right": {
      initial: { x: 50, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -50, opacity: 0 },
    },
    "whip-left": {
      initial: { x: -50, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 50, opacity: 0 },
    },
    "whip-up": {
      initial: { y: 50, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -50, opacity: 0 },
    },
    "whip-down": {
      initial: { y: -50, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 50, opacity: 0 },
    },
    spin: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.1 },
    },
      flash: {
        initial: { opacity: 0, background: "white" },
        animate: { opacity: 1, background: "transparent" },
        exit: { opacity: 0, background: "white" },
      },
      fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      },
    };

  return (
    <AnimatePresence mode="wait">
      {activeSection === id && (
        <motion.div
          key={id}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants[transitionType]}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.5,
          }}
          className="w-full h-full absolute inset-0 overflow-y-auto no-scrollbar"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
