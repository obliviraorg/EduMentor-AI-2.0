"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Plus, X, Calendar, Clock, Target, Sparkles, ChevronRight, Edit2, Trash2, CheckCircle } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  priority: "high" | "medium" | "low";
}

interface Exam {
  id: string;
  subject: string;
  date: string;
  name: string;
}

interface ScheduleItem {
  time: string;
  subject: string;
  duration: string;
  type: "study" | "review" | "practice";
}

interface DaySchedule {
  day: string;
  items: ScheduleItem[];
}

export function AITrainer() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "1", name: "Mathematics", priority: "high" },
    { id: "2", name: "Physics", priority: "medium" },
  ]);
  const [exams, setExams] = useState<Exam[]>([
    { id: "1", subject: "Mathematics", date: "2024-02-15", name: "Midterm Exam" },
  ]);
  const [dailyHours, setDailyHours] = useState(4);
  const [newSubject, setNewSubject] = useState("");
  const [newExamSubject, setNewExamSubject] = useState("");
  const [newExamDate, setNewExamDate] = useState("");
  const [newExamName, setNewExamName] = useState("");
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [showAddExam, setShowAddExam] = useState(false);
  const [generatedSchedule, setGeneratedSchedule] = useState<DaySchedule[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingItem, setEditingItem] = useState<{ dayIndex: number; itemIndex: number } | null>(null);

  const priorityColors = {
    high: "from-red-500 to-orange-500",
    medium: "from-yellow-500 to-amber-500",
    low: "from-green-500 to-emerald-500",
  };

  const addSubject = () => {
    if (newSubject.trim()) {
      setSubjects([...subjects, { id: Date.now().toString(), name: newSubject, priority: "medium" }]);
      setNewSubject("");
      setShowAddSubject(false);
    }
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const addExam = () => {
    if (newExamSubject && newExamDate && newExamName) {
      setExams([...exams, { id: Date.now().toString(), subject: newExamSubject, date: newExamDate, name: newExamName }]);
      setNewExamSubject("");
      setNewExamDate("");
      setNewExamName("");
      setShowAddExam(false);
    }
  };

  const removeExam = (id: string) => {
    setExams(exams.filter((e) => e.id !== id));
  };

  const generateSchedule = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      const scheduleTypes: ("study" | "review" | "practice")[] = ["study", "review", "practice"];
      
      const schedule: DaySchedule[] = days.map((day) => {
        const items: ScheduleItem[] = [];
        let currentHour = 9;
        let remainingHours = dailyHours;
        
        subjects.forEach((subject, idx) => {
          if (remainingHours > 0) {
            const duration = Math.min(subject.priority === "high" ? 2 : 1, remainingHours);
            items.push({
              time: `${currentHour}:00`,
              subject: subject.name,
              duration: `${duration}h`,
              type: scheduleTypes[idx % scheduleTypes.length],
            });
            currentHour += duration + 1;
            remainingHours -= duration;
          }
        });
        
        return { day, items };
      });
      
      setGeneratedSchedule(schedule);
      setIsGenerating(false);
    }, 1500);
  };

  const updateScheduleItem = (dayIndex: number, itemIndex: number, field: keyof ScheduleItem, value: string) => {
    if (!generatedSchedule) return;
    const newSchedule = [...generatedSchedule];
    (newSchedule[dayIndex].items[itemIndex] as any)[field] = value;
    setGeneratedSchedule(newSchedule);
    setEditingItem(null);
  };

  return (
    <div className="h-full w-full pb-24 overflow-y-auto no-scrollbar">
      <div className="p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">AI Trainer</h1>
            <p className="text-sm text-gray-400">Smart study schedule generator</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" /> Subjects
            </h2>
            <button
              onClick={() => setShowAddSubject(!showAddSubject)}
              className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center hover:bg-cyan-500/30 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence>
            {showAddSubject && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Subject name"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50"
                />
                <button
                  onClick={addSubject}
                  className="px-4 py-3 rounded-xl bg-cyan-500 text-white font-bold hover:bg-cyan-600 transition-colors"
                >
                  Add
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid gap-3">
            {subjects.map((subject, i) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group p-4 glass rounded-2xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${priorityColors[subject.priority]}`} />
                  <span className="font-medium text-white">{subject.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={subject.priority}
                    onChange={(e) => {
                      const updated = subjects.map((s) =>
                        s.id === subject.id ? { ...s, priority: e.target.value as Subject["priority"] } : s
                      );
                      setSubjects(updated);
                    }}
                    className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm text-white cursor-pointer"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <button
                    onClick={() => removeSubject(subject.id)}
                    className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" /> Upcoming Exams
            </h2>
            <button
              onClick={() => setShowAddExam(!showAddExam)}
              className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center hover:bg-purple-500/30 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence>
            {showAddExam && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 p-4 glass rounded-2xl"
              >
                <input
                  type="text"
                  value={newExamName}
                  onChange={(e) => setNewExamName(e.target.value)}
                  placeholder="Exam name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                />
                <input
                  type="text"
                  value={newExamSubject}
                  onChange={(e) => setNewExamSubject(e.target.value)}
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                />
                <input
                  type="date"
                  value={newExamDate}
                  onChange={(e) => setNewExamDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50"
                />
                <button
                  onClick={addExam}
                  className="w-full px-4 py-3 rounded-xl bg-purple-500 text-white font-bold hover:bg-purple-600 transition-colors"
                >
                  Add Exam
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid gap-3">
            {exams.map((exam, i) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group p-4 glass rounded-2xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white">{exam.name}</h3>
                    <p className="text-sm text-gray-400">{exam.subject}</p>
                    <p className="text-xs text-cyan-400 mt-1">{new Date(exam.date).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => removeExam(exam.id)}
                    className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-400" /> Daily Study Hours
          </h2>
          <div className="p-4 glass rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400">Hours per day</span>
              <span className="text-2xl font-black text-white">{dailyHours}h</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,243,255,0.5)]"
            />
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={generateSchedule}
          disabled={isGenerating || subjects.length === 0}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                <Sparkles className="w-5 h-5" />
              </motion.div>
              Generating Schedule...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" /> Generate AI Schedule
            </>
          )}
        </motion.button>

        <AnimatePresence>
          {generatedSchedule && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-4"
            >
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" /> Your Weekly Schedule
              </h2>

              <div className="space-y-4">
                {generatedSchedule.map((day, dayIndex) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: dayIndex * 0.05 }}
                    className="p-4 glass rounded-2xl"
                  >
                    <h3 className="font-bold text-white mb-3">{day.day}</h3>
                    <div className="space-y-2">
                      {day.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          className="flex items-center justify-between p-3 rounded-xl bg-white/5 group"
                        >
                          {editingItem?.dayIndex === dayIndex && editingItem?.itemIndex === itemIndex ? (
                            <div className="flex-1 flex items-center gap-2">
                              <input
                                type="text"
                                defaultValue={item.time}
                                onBlur={(e) => updateScheduleItem(dayIndex, itemIndex, "time", e.target.value)}
                                className="w-16 px-2 py-1 rounded bg-white/10 text-white text-sm"
                              />
                              <input
                                type="text"
                                defaultValue={item.subject}
                                onBlur={(e) => updateScheduleItem(dayIndex, itemIndex, "subject", e.target.value)}
                                className="flex-1 px-2 py-1 rounded bg-white/10 text-white text-sm"
                              />
                              <input
                                type="text"
                                defaultValue={item.duration}
                                onBlur={(e) => updateScheduleItem(dayIndex, itemIndex, "duration", e.target.value)}
                                className="w-12 px-2 py-1 rounded bg-white/10 text-white text-sm"
                              />
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-500 w-14">{item.time}</span>
                                <span className="font-medium text-white">{item.subject}</span>
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full ${
                                    item.type === "study"
                                      ? "bg-cyan-500/20 text-cyan-400"
                                      : item.type === "review"
                                      ? "bg-purple-500/20 text-purple-400"
                                      : "bg-green-500/20 text-green-400"
                                  }`}
                                >
                                  {item.type}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-400">{item.duration}</span>
                                <button
                                  onClick={() => setEditingItem({ dayIndex, itemIndex })}
                                  className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded bg-white/10 flex items-center justify-center transition-opacity"
                                >
                                  <Edit2 className="w-3 h-3 text-gray-400" />
                                </button>
                              </div>
                            </>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
