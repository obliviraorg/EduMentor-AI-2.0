"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Clock, BookOpen, ChevronRight, Star } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Mastering UI Design",
    level: "Advanced",
    progress: 85,
    lessons: 24,
    duration: "12h 30m",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=1000&auto=format&fit=crop",
    color: "cyan",
    description: "Learn professional UI design principles using modern tools and techniques.",
    lessonList: [
      { title: "Introduction to Design Systems", duration: "15m", completed: true },
      { title: "Color Theory & Accessibility", duration: "45m", completed: true },
      { title: "Typography Masterclass", duration: "1h 20m", completed: true },
      { title: "Advanced Prototyping", duration: "2h 15m", completed: false },
    ]
  },
  {
    id: 2,
    title: "Next.js 15 Deep Dive",
    level: "Intermediate",
    progress: 65,
    lessons: 18,
    duration: "8h 45m",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1000&auto=format&fit=crop",
    color: "purple",
    description: "Master the latest features of Next.js 15 including Server Actions and PPR.",
    lessonList: [
      { title: "App Router Fundamentals", duration: "30m", completed: true },
      { title: "Server Components vs Client Components", duration: "50m", completed: true },
      { title: "Data Fetching Patterns", duration: "1h 10m", completed: false },
      { title: "Streaming & Suspense", duration: "45m", completed: false },
    ]
  },
  {
    id: 3,
    title: "Framer Motion Magic",
    level: "Expert",
    progress: 45,
    lessons: 12,
    duration: "5h 20m",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop",
    color: "blue",
    description: "Create stunning animations and transitions for your React applications.",
    lessonList: [
      { title: "Basic Animations", duration: "20m", completed: true },
      { title: "Gesture Recognition", duration: "40m", completed: true },
      { title: "Layout Animations", duration: "1h 05m", completed: false },
      { title: "Shared Layout Transitions", duration: "1h 30m", completed: false },
    ]
  }
];

export function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  return (
    <div className="p-6 relative min-h-full pb-24">
      <AnimatePresence mode="wait">
        {!selectedCourse ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h1 className="text-3xl font-bold text-neon-cyan tracking-tight">EXPLORE COURSES</h1>
            <div className="grid grid-cols-1 gap-6">
              {courses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onClick={() => setSelectedCourse(course)} 
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <Button 
              variant="ghost" 
              className="mb-4 text-neon-cyan hover:text-cyan-400 hover:bg-cyan-500/10"
              onClick={() => setSelectedCourse(null)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
            </Button>

            <div className="relative h-48 rounded-2xl overflow-hidden glass border-white/10">
              <img 
                src={selectedCourse.image} 
                className="w-full h-full object-cover opacity-60"
                alt={selectedCourse.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="px-2 py-1 rounded bg-neon-cyan text-black text-[10px] font-bold uppercase mb-2 inline-block">
                  {selectedCourse.level}
                </span>
                <h2 className="text-2xl font-bold text-white">{selectedCourse.title}</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DetailStat icon={<Clock />} label="Duration" value={selectedCourse.duration} />
              <DetailStat icon={<BookOpen />} label="Lessons" value={`${selectedCourse.lessons} Units`} />
              <DetailStat icon={<Star />} label="Progress" value={`${selectedCourse.progress}%`} />
            </div>

            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-lg">Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedCourse.description}
                </p>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-medium">Course Progress</span>
                    <span className="text-neon-cyan font-bold">{selectedCourse.progress}%</span>
                  </div>
                  <Progress value={selectedCourse.progress} className="h-2 bg-white/10" />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-lg font-bold">Lessons</h3>
              <div className="space-y-3">
                {selectedCourse.lessonList.map((lesson: any, i: number) => (
                  <div key={i} className="glass border-white/10 p-4 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${lesson.completed ? 'bg-neon-cyan text-black' : 'border border-white/20 text-muted-foreground'}`}>
                        {i + 1}
                      </div>
                      <div>
                        <h4 className={`font-medium ${lesson.completed ? 'text-white' : 'text-muted-foreground'}`}>{lesson.title}</h4>
                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                      </div>
                    </div>
                    {lesson.completed ? (
                      <div className="text-neon-cyan text-xs font-bold uppercase">Completed</div>
                    ) : (
                      <Play className="h-4 w-4 text-muted-foreground group-hover:text-neon-cyan transition-colors" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full h-14 bg-neon-cyan text-black font-bold text-lg rounded-xl neon-glow-cyan hover:scale-[1.02] transition-transform">
              RESUME LEARNING
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CourseCard({ course, onClick }: any) {
  return (
    <Card 
      onClick={onClick}
      className="glass border-white/10 overflow-hidden cursor-pointer hover:border-neon-cyan/50 transition-all group"
    >
      <div className="flex flex-col md:flex-row h-full">
        <div className="relative w-full md:w-48 h-40 md:h-auto overflow-hidden">
          <img 
            src={course.image} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            alt={course.title}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <CardContent className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neon-cyan px-2 py-1 bg-cyan-500/10 rounded">
                {course.level}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} />
                {course.duration}
              </div>
            </div>
            <h3 className="text-xl font-bold mb-1 group-hover:text-neon-cyan transition-colors">{course.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1 mb-4">{course.description}</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{course.lessons} Lessons</span>
              <span className="text-white font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-1.5 bg-white/10" />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

function DetailStat({ icon, label, value }: any) {
  return (
    <div className="glass border-white/10 p-4 rounded-xl flex items-center gap-4">
      <div className="text-neon-cyan">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
