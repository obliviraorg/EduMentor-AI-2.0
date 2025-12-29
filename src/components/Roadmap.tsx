"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Lock, Rocket, Target, Trophy, ChevronRight } from "lucide-react";

const roadmapSteps = [
  {
    id: 1,
    title: "Beginner",
    subtitle: "The Foundation",
    icon: <Target className="text-neon-cyan" />,
    status: "completed",
    topics: ["HTML5 & CSS3", "JavaScript Basics", "Responsive Design"],
    courses: ["Web Fundamentals", "Intro to JS"],
    color: "cyan"
  },
  {
    id: 2,
    title: "Intermediate",
    subtitle: "The Developer",
    icon: <Rocket className="text-neon-purple" />,
    status: "in-progress",
    topics: ["React Hooks", "Next.js App Router", "Tailwind CSS"],
    courses: ["React Mastery", "Next.js Essentials"],
    color: "purple"
  },
  {
    id: 3,
    title: "Advanced",
    subtitle: "The Architect",
    icon: <Trophy className="text-neon-blue" />,
    status: "locked",
    topics: ["Performance Optimization", "Microfrontends", "CI/CD Pipelines"],
    courses: ["Advanced Patterns", "Scale Architecture"],
    color: "blue"
  }
];

export function Roadmap() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="p-6 space-y-8 pb-24">
      <div>
        <h1 className="text-3xl font-bold text-neon-blue tracking-tight">LEARNING ROADMAP</h1>
        <p className="text-muted-foreground mt-1">Your path to becoming a world-class engineer.</p>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="w-full bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent"
            initial={{ height: 0 }}
            animate={{ height: activeStep === 1 ? "33%" : activeStep === 2 ? "66%" : "100%" }}
            transition={{ duration: 1 }}
          />
        </div>

        <div className="space-y-12 relative">
          {roadmapSteps.map((step, index) => (
            <div key={step.id} className="flex gap-8 group">
              <div className="relative z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${
                    activeStep === step.id 
                      ? `border-neon-${step.color} bg-neon-${step.color}/20 shadow-[0_0_20px_rgba(var(--neon-${step.color}-rgb),0.3)]` 
                      : 'border-white/10 glass bg-white/5'
                  }`}
                >
                  {step.status === "completed" ? (
                    <CheckCircle2 className="text-neon-green" size={32} />
                  ) : step.status === "locked" ? (
                    <Lock className="text-muted-foreground" size={28} />
                  ) : (
                    step.icon
                  )}
                </motion.button>
              </div>

              <div className="flex-1">
                <motion.div
                  initial={false}
                  animate={{ 
                    opacity: activeStep === step.id ? 1 : 0.5,
                    x: activeStep === step.id ? 0 : 10
                  }}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    activeStep === step.id 
                      ? `glass border-neon-${step.color}/30 shadow-lg` 
                      : 'border-transparent'
                  }`}
                  onClick={() => setActiveStep(step.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.subtitle}</p>
                    </div>
                    <Badge variant="outline" className={`border-neon-${step.color}/50 text-neon-${step.color}`}>
                      {step.status.toUpperCase()}
                    </Badge>
                  </div>

                  {activeStep === step.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-4 overflow-hidden"
                    >
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Key Topics</p>
                        <div className="flex flex-wrap gap-2">
                          {step.topics.map(topic => (
                            <span key={topic} className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-medium border border-white/10">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Linked Courses</p>
                        <div className="space-y-2">
                          {step.courses.map(course => (
                            <div key={course} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors group/course">
                              <span className="text-sm">{course}</span>
                              <ChevronRight size={14} className="text-muted-foreground group-hover/course:translate-x-1 transition-transform" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
