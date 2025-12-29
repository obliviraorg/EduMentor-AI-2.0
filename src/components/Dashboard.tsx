"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Area, AreaChart 
} from "recharts";
import { BookOpen, CreditCard, Clock, Zap, TrendingUp, Brain, Eye, Calendar, ChevronRight, Flame } from "lucide-react";

const learningData = [
  { name: "Mon", hours: 2.5, flashcards: 45 },
  { name: "Tue", hours: 4.2, flashcards: 78 },
  { name: "Wed", hours: 3.8, flashcards: 62 },
  { name: "Thu", hours: 5.1, flashcards: 95 },
  { name: "Fri", hours: 2.9, flashcards: 38 },
  { name: "Sat", hours: 6.3, flashcards: 112 },
  { name: "Sun", hours: 4.5, flashcards: 84 },
];

const courseProgress = [
  { name: "UI Design", value: 85, color: "#00f3ff" },
  { name: "Next.js", value: 65, color: "#bc13fe" },
  { name: "Framer Motion", value: 45, color: "#39ff14" },
  { name: "TypeScript", value: 92, color: "#005eff" },
];

const routineAdherence = [
  { day: "Mon", adherence: 95 },
  { day: "Tue", adherence: 88 },
  { day: "Wed", adherence: 72 },
  { day: "Thu", adherence: 91 },
  { day: "Fri", adherence: 85 },
  { day: "Sat", adherence: 78 },
  { day: "Sun", adherence: 82 },
];

const visualLearningStats = [
  { name: "Documents", value: 12 },
  { name: "Flashcards", value: 156 },
  { name: "Summaries", value: 12 },
  { name: "Graphs", value: 24 },
];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<"learning" | "progress" | "routine" | "visual">("learning");
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const stats = [
    { icon: <BookOpen className="w-5 h-5" />, label: "Courses", value: "12", sub: "4 in progress", color: "cyan", gradient: "from-cyan-500 to-blue-600" },
    { icon: <CreditCard className="w-5 h-5" />, label: "Flashcards", value: "428", sub: "12% increase", color: "purple", gradient: "from-purple-500 to-pink-600" },
    { icon: <Clock className="w-5 h-5" />, label: "Time spent", value: "24.5h", sub: "This week", color: "blue", gradient: "from-blue-500 to-indigo-600" },
    { icon: <Flame className="w-5 h-5" />, label: "Streak", value: "7", sub: "Days", color: "orange", gradient: "from-orange-500 to-red-600" },
  ];

  const tabs = [
    { id: "learning", label: "Learning", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "progress", label: "Progress", icon: <Brain className="w-4 h-4" /> },
    { id: "routine", label: "Routine", icon: <Calendar className="w-4 h-4" /> },
    { id: "visual", label: "Visual", icon: <Eye className="w-4 h-4" /> },
  ];

  return (
    <div className="h-full w-full pb-24 overflow-y-auto no-scrollbar">
      <div className="p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Welcome Back</h1>
            <p className="text-sm text-gray-400 mt-1">Your learning journey is 68% complete this week</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30"
          >
            <Zap className="text-white" size={24} />
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setHoveredStat(i)}
              onHoverEnd={() => setHoveredStat(null)}
              className="relative p-4 glass rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.gradient}`} />
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                  {stat.icon}
                </div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.sub}</span>
              </div>
              <motion.h3
                className="text-2xl font-black text-white"
                animate={{ scale: hoveredStat === i ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "learning" && (
              <motion.div
                key="learning"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-6 glass rounded-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-bold text-white">Weekly Learning Hours</h3>
                  </div>
                  <span className="text-sm text-cyan-400 font-bold">29.3h total</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={learningData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}h`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                      itemStyle={{ color: "#00f3ff" }}
                    />
                    <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
                      {learningData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 5 ? "#00f3ff" : "#00f3ff40"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            )}

            {activeTab === "progress" && (
              <motion.div
                key="progress"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {courseProgress.map((course, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 glass rounded-2xl"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-white">{course.name}</h3>
                      <span className="text-sm font-bold" style={{ color: course.color }}>{course.value}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.value}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${course.color}, ${course.color}80)` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "routine" && (
              <motion.div
                key="routine"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-6 glass rounded-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-400" />
                    <h3 className="font-bold text-white">Routine Adherence</h3>
                  </div>
                  <span className="text-sm text-green-400 font-bold">84% avg</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={routineAdherence}>
                    <defs>
                      <linearGradient id="adherenceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#39ff14" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#39ff14" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                    />
                    <Area type="monotone" dataKey="adherence" stroke="#39ff14" strokeWidth={2} fill="url(#adherenceGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            )}

            {activeTab === "visual" && (
              <motion.div
                key="visual"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="p-6 glass rounded-2xl">
                  <div className="flex items-center gap-2 mb-6">
                    <Eye className="w-5 h-5 text-purple-400" />
                    <h3 className="font-bold text-white">Visual Learning Stats</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {visualLearningStats.map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 bg-white/5 rounded-xl text-center"
                      >
                        <h4 className="text-2xl font-black text-white">{stat.value}</h4>
                        <p className="text-xs text-gray-400">{stat.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="p-6 glass rounded-2xl">
                  <h3 className="font-bold text-white mb-4">Flashcard Progress</h3>
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={learningData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                      />
                      <Line type="monotone" dataKey="flashcards" stroke="#bc13fe" strokeWidth={3} dot={{ fill: "#bc13fe", strokeWidth: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
          <h2 className="text-lg font-bold text-white">Quick Actions</h2>
          <div className="grid gap-3">
            {[
              { label: "Continue Learning", sub: "Resume Next.js course", icon: <BookOpen className="w-5 h-5" />, color: "from-cyan-500 to-blue-600" },
              { label: "Review Flashcards", sub: "28 cards due today", icon: <CreditCard className="w-5 h-5" />, color: "from-purple-500 to-pink-600" },
              { label: "Check Schedule", sub: "3 study sessions planned", icon: <Calendar className="w-5 h-5" />, color: "from-green-500 to-emerald-600" },
            ].map((action, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-4 glass rounded-2xl flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                    {action.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-white">{action.label}</h3>
                    <p className="text-xs text-gray-400">{action.sub}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
