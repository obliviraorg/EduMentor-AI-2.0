"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw, Check, X } from "lucide-react";

const flashcards = [
  { id: 1, question: "What is React Server Components (RSC)?", answer: "Components that execute only on the server, reducing bundle size and improving performance." },
  { id: 2, question: "What does 'use client' directive do?", answer: "It marks the boundary between server-only and client-interactive code in Next.js App Router." },
  { id: 3, question: "What is Framer Motion?", answer: "A powerful motion library for React that simplifies complex animations and gestures." },
  { id: 4, question: "How does glassmorphism work?", answer: "It uses backdrop-blur, semi-transparent backgrounds, and thin borders to create a frosted glass look." },
  { id: 5, question: "What is the benefit of SSR?", answer: "Improved SEO, faster initial page load, and better performance on low-end devices." },
];

export function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 50);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 50);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotate: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotate: direction < 0 ? 45 : -45,
    }),
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[80vh] pb-24 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-neon-purple tracking-tight">FLASHCARDS</h1>
        <p className="text-muted-foreground mt-2">Card {currentIndex + 1} of {flashcards.length}</p>
      </div>

      <div className="relative w-full max-w-md aspect-[3/4] perspective-1000">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 w-full h-full cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              className="w-full h-full relative preserve-3d transition-transform duration-500"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
            >
              {/* Front */}
              <div className="absolute inset-0 glass border-neon-purple/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center backface-hidden shadow-[0_0_20px_rgba(188,19,254,0.1)]">
                <div className="absolute top-6 left-6 text-neon-purple font-bold text-sm tracking-widest">QUESTION</div>
                <h3 className="text-2xl font-bold leading-tight">{flashcards[currentIndex].question}</h3>
                <div className="absolute bottom-10 flex items-center gap-2 text-muted-foreground text-sm animate-pulse">
                  <RotateCcw size={16} /> Tap to flip
                </div>
              </div>

              {/* Back */}
              <div 
                className="absolute inset-0 glass border-neon-cyan/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center backface-hidden shadow-[0_0_20px_rgba(0,243,255,0.1)]"
                style={{ transform: "rotateY(180deg)" }}
              >
                <div className="absolute top-6 left-6 text-neon-cyan font-bold text-sm tracking-widest">ANSWER</div>
                <p className="text-xl leading-relaxed text-cyan-50">{flashcards[currentIndex].answer}</p>
                <div className="absolute bottom-10 flex items-center gap-2 text-muted-foreground text-sm">
                  <RotateCcw size={16} /> Tap to flip back
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-6 w-full max-w-md justify-between pt-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-14 w-14 rounded-full border-white/10 glass hover:bg-white/5 hover:text-white"
          onClick={handlePrev}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="flex gap-4">
          <Button className="h-14 w-14 rounded-full bg-red-500/20 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </Button>
          <Button className="h-14 w-14 rounded-full bg-green-500/20 border border-green-500/50 text-green-500 hover:bg-green-500 hover:text-white transition-colors">
            <Check className="h-6 w-6" />
          </Button>
        </div>

        <Button 
          variant="outline" 
          size="icon" 
          className="h-14 w-14 rounded-full border-white/10 glass hover:bg-white/5 hover:text-white"
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
