"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, BookOpen, Moon, Calendar, Sparkles, Plus, X, Edit2, Coffee, Dumbbell, Brain, Gamepad2 } from "lucide-react";

interface TimeBlock {
  id: string;
  activity: string;
  startTime: string;
  endTime: string;
  type: "study" | "break" | "sleep" | "exercise" | "leisure";
  color: string;
}

interface ExamInput {
  id: string;
  name: string;
  date: string;
  daysUntil: number;
}

export function RoutinePlanner() {
  const [studyHours, setStudyHours] = useState(6);
  const [sleepHours, setSleepHours] = useState(8);
  const [exerciseMinutes, setExerciseMinutes] = useState(30);
  const [leisureHours, setLeisureHours] = useState(2);
  const [exams, setExams] = useState<ExamInput[]>([]);
  const [newExamName, setNewExamName] = useState("");
  const [newExamDate, setNewExamDate] = useState("");
  const [showAddExam, setShowAddExam] = useState(false);
  const [generatedRoutine, setGeneratedRoutine] = useState<TimeBlock[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingBlock, setEditingBlock] = useState<string | null>(null);

  const typeIcons = {
    study: <Brain className="w-4 h-4" />,
    break: <Coffee className="w-4 h-4" />,
    sleep: <Moon className="w-4 h-4" />,
    exercise: <Dumbbell className="w-4 h-4" />,
    leisure: <Gamepad2 className="w-4 h-4" />,
  };

  const typeColors = {
    study: "from-cyan-500 to-blue-600",
    break: "from-yellow-500 to-orange-500",
    sleep: "from-indigo-500 to-purple-600",
    exercise: "from-green-500 to-emerald-600",
    leisure: "from-pink-500 to-rose-600",
  };

  const addExam = () => {
    if (newExamName && newExamDate) {
      const examDate = new Date(newExamDate);
      const today = new Date();
      const diffTime = examDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      setExams([
        ...exams,
        {
          id: Date.now().toString(),
          name: newExamName,
          date: newExamDate,
          daysUntil: diffDays,
        },
      ]);
      setNewExamName("");
      setNewExamDate("");
      setShowAddExam(false);
    }
  };

  const removeExam = (id: string) => {
    setExams(exams.filter((e) => e.id !== id));
  };

  const generateRoutine = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const hasUpcomingExam = exams.some((e) => e.daysUntil <= 7);
      const adjustedStudyHours = hasUpcomingExam ? Math.min(studyHours + 2, 10) : studyHours;
      const adjustedLeisure = hasUpcomingExam ? Math.max(leisureHours - 1, 0.5) : leisureHours;

      const routine: TimeBlock[] = [];
      let currentHour = 6;

      routine.push({
        id: "1",
        activity: "Wake Up & Morning Routine",
        startTime: `${currentHour}:00`,
        endTime: `${currentHour + 1}:00`,
        type: "break",
        color: typeColors.break,
      });
      currentHour += 1;

      if (exerciseMinutes > 0) {
        const exerciseEnd = currentHour + exerciseMinutes / 60;
        routine.push({
          id: "2",
          activity: "Morning Exercise",
          startTime: `${currentHour}:00`,
          endTime: `${Math.floor(exerciseEnd)}:${(exerciseMinutes % 60).toString().padStart(2, "0")}`,
          type: "exercise",
          color: typeColors.exercise,
        });
        currentHour = Math.ceil(exerciseEnd);
      }

      const studyBlocks = Math.ceil(adjustedStudyHours / 2);
      for (let i = 0; i < studyBlocks; i++) {
        const duration = Math.min(2, adjustedStudyHours - i * 2);
        routine.push({
          id: `study-${i}`,
          activity: i === 0 ? "Deep Focus Study" : i === 1 ? "Practice & Problems" : "Review Session",
          startTime: `${currentHour}:00`,
          endTime: `${currentHour + duration}:00`,
          type: "study",
          color: typeColors.study,
        });
        currentHour += duration;

        if (i < studyBlocks - 1) {
          routine.push({
            id: `break-${i}`,
            activity: i === 0 ? "Lunch Break" : "Short Break",
            startTime: `${currentHour}:00`,
            endTime: `${currentHour + 1}:00`,
            type: "break",
            color: typeColors.break,
          });
          currentHour += 1;
        }
      }

      if (adjustedLeisure > 0) {
        routine.push({
          id: "leisure",
          activity: "Free Time / Hobbies",
          startTime: `${currentHour}:00`,
          endTime: `${currentHour + adjustedLeisure}:00`,
          type: "leisure",
          color: typeColors.leisure,
        });
        currentHour += adjustedLeisure;
      }

      routine.push({
        id: "evening",
        activity: "Dinner & Wind Down",
        startTime: `${currentHour}:00`,
        endTime: `${currentHour + 1.5}:00`,
        type: "break",
        color: typeColors.break,
      });
      currentHour += 1.5;

      const sleepStart = 24 - sleepHours;
      routine.push({
        id: "sleep",
        activity: "Sleep",
        startTime: `${Math.floor(sleepStart)}:00`,
        endTime: "6:00",
        type: "sleep",
        color: typeColors.sleep,
      });

      setGeneratedRoutine(routine);
      setIsGenerating(false);
    }, 1500);
  };

  const updateBlockActivity = (id: string, newActivity: string) => {
    if (!generatedRoutine) return;
    setGeneratedRoutine(generatedRoutine.map((block) => (block.id === id ? { ...block, activity: newActivity } : block)));
    setEditingBlock(null);
  };

  return (
    <div className="h-full w-full pb-24 overflow-y-auto no-scrollbar">
      <div className="p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Routine Planner</h1>
            <p className="text-sm text-gray-400">AI-balanced daily schedule</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-5">
          <div className="p-4 glass rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-medium">Study Time</span>
              </div>
              <span className="text-lg font-bold text-cyan-400">{studyHours}h</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={studyHours}
              onChange={(e) => setStudyHours(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,243,255,0.5)]"
            />
          </div>

          <div className="p-4 glass rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-indigo-400" />
                <span className="text-white font-medium">Sleep</span>
              </div>
              <span className="text-lg font-bold text-indigo-400">{sleepHours}h</span>
            </div>
            <input
              type="range"
              min="5"
              max="10"
              value={sleepHours}
              onChange={(e) => setSleepHours(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 glass rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium text-sm">Exercise</span>
              </div>
              <select
                value={exerciseMinutes}
                onChange={(e) => setExerciseMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm cursor-pointer"
              >
                <option value="0">None</option>
                <option value="15">15 min</option>
                <option value="30">30 min</option>
                <option value="45">45 min</option>
                <option value="60">1 hour</option>
              </select>
            </div>

            <div className="p-4 glass rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-pink-400" />
                <span className="text-white font-medium text-sm">Leisure</span>
              </div>
              <select
                value={leisureHours}
                onChange={(e) => setLeisureHours(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm cursor-pointer"
              >
                <option value="0.5">30 min</option>
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
              </select>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-400" /> Upcoming Exams
            </h2>
            <button
              onClick={() => setShowAddExam(!showAddExam)}
              className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center hover:bg-orange-500/30 transition-colors"
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
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500/50"
                />
                <input
                  type="date"
                  value={newExamDate}
                  onChange={(e) => setNewExamDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-orange-500/50"
                />
                <button
                  onClick={addExam}
                  className="w-full px-4 py-3 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors"
                >
                  Add Exam
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {exams.length > 0 && (
            <div className="grid gap-3">
              {exams.map((exam, i) => (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`group p-4 glass rounded-2xl ${exam.daysUntil <= 7 ? "border border-red-500/30" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-white">{exam.name}</h3>
                      <p className="text-xs text-gray-400 mt-1">{new Date(exam.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-bold ${
                          exam.daysUntil <= 3
                            ? "bg-red-500/20 text-red-400"
                            : exam.daysUntil <= 7
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {exam.daysUntil} days
                      </span>
                      <button
                        onClick={() => removeExam(exam.id)}
                        className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded bg-red-500/20 text-red-400 flex items-center justify-center transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          {exams.some((e) => e.daysUntil <= 7) && (
            <p className="text-xs text-orange-400 text-center">* Schedule will intensify for upcoming exams</p>
          )}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={generateRoutine}
          disabled={isGenerating}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                <Sparkles className="w-5 h-5" />
              </motion.div>
              Creating Your Routine...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" /> Generate Daily Routine
            </>
          )}
        </motion.button>

        <AnimatePresence>
          {generatedRoutine && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-4"
            >
              <h2 className="text-lg font-bold text-white">Your Optimized Day</h2>

              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500" />

                <div className="space-y-4">
                  {generatedRoutine.map((block, i) => (
                    <motion.div
                      key={block.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="relative pl-14"
                    >
                      <div
                        className={`absolute left-4 top-4 w-4 h-4 rounded-full bg-gradient-to-r ${block.color} shadow-lg`}
                      />

                      <div className="p-4 glass rounded-2xl group">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-xl bg-gradient-to-r ${block.color} flex items-center justify-center`}>
                              {typeIcons[block.type]}
                            </div>
                            <div>
                              {editingBlock === block.id ? (
                                <input
                                  type="text"
                                  defaultValue={block.activity}
                                  onBlur={(e) => updateBlockActivity(block.id, e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      updateBlockActivity(block.id, (e.target as HTMLInputElement).value);
                                    }
                                  }}
                                  autoFocus
                                  className="bg-transparent border-b border-white/30 text-white font-medium focus:outline-none focus:border-cyan-500"
                                />
                              ) : (
                                <h3 className="font-medium text-white">{block.activity}</h3>
                              )}
                              <p className="text-xs text-gray-400">
                                {block.startTime} - {block.endTime}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setEditingBlock(block.id)}
                            className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded bg-white/10 flex items-center justify-center transition-opacity"
                          >
                            <Edit2 className="w-3 h-3 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
