"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { BookOpen, Upload, FileText, Sparkles, ChevronLeft, ChevronRight, RotateCcw, X, BarChart3, Lightbulb, Network } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface GeneratedFlashcard {
  id: string;
  front: string;
  back: string;
}

interface KeyPoint {
  id: string;
  text: string;
  importance: "high" | "medium" | "low";
}

interface ConceptData {
  name: string;
  value: number;
}

export function VisualLearning() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedContent, setProcessedContent] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<GeneratedFlashcard[]>([]);
  const [keyPoints, setKeyPoints] = useState<KeyPoint[]>([]);
  const [conceptData, setConceptData] = useState<ConceptData[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState<"summary" | "flashcards" | "graphs">("summary");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
  });

  const processDocument = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setProcessedContent(
        "This document covers fundamental concepts in machine learning including supervised learning, unsupervised learning, and reinforcement learning. Key topics include neural networks, decision trees, clustering algorithms, and optimization techniques."
      );

      setFlashcards([
        { id: "1", front: "What is Supervised Learning?", back: "A type of machine learning where the model learns from labeled training data to make predictions on new, unseen data." },
        { id: "2", front: "What is a Neural Network?", back: "A computing system inspired by biological neural networks, consisting of interconnected nodes that process information using connectionist approaches." },
        { id: "3", front: "Define Clustering", back: "An unsupervised learning technique that groups similar data points together based on their features without predefined labels." },
        { id: "4", front: "What is Gradient Descent?", back: "An optimization algorithm used to minimize the cost function by iteratively moving towards the steepest descent direction." },
        { id: "5", front: "Explain Overfitting", back: "When a model learns the training data too well, including noise, resulting in poor performance on new, unseen data." },
        { id: "6", front: "What is Cross-Validation?", back: "A technique to evaluate model performance by partitioning data into training and validation sets multiple times." },
      ]);

      setKeyPoints([
        { id: "1", text: "Machine Learning enables computers to learn from data without explicit programming", importance: "high" },
        { id: "2", text: "Supervised learning requires labeled datasets for training", importance: "high" },
        { id: "3", text: "Neural networks can model complex non-linear relationships", importance: "medium" },
        { id: "4", text: "Feature engineering significantly impacts model performance", importance: "medium" },
        { id: "5", text: "Regularization helps prevent overfitting in models", importance: "low" },
      ]);

      setConceptData([
        { name: "Supervised", value: 35 },
        { name: "Unsupervised", value: 25 },
        { name: "Neural Nets", value: 20 },
        { name: "Optimization", value: 15 },
        { name: "Evaluation", value: 5 },
      ]);

      setIsProcessing(false);
    }, 2500);
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
    }, 200);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 200);
  };

  const clearDocument = () => {
    setUploadedFile(null);
    setProcessedContent(null);
    setFlashcards([]);
    setKeyPoints([]);
    setConceptData([]);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const COLORS = ["#00f3ff", "#bc13fe", "#005eff", "#39ff14", "#ff0055"];

  const importanceColors = {
    high: "border-red-500/50 bg-red-500/10",
    medium: "border-yellow-500/50 bg-yellow-500/10",
    low: "border-green-500/50 bg-green-500/10",
  };

  return (
    <div className="h-full w-full pb-24 overflow-y-auto no-scrollbar">
      <div className="p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Visual Learning</h1>
            <p className="text-sm text-gray-400">Transform documents into knowledge</p>
          </div>
        </motion.div>

        {!processedContent ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
            <div
              {...getRootProps()}
              className={`relative p-8 glass rounded-3xl border-2 border-dashed transition-all cursor-pointer ${
                isDragActive ? "border-purple-500 bg-purple-500/10" : "border-white/20 hover:border-purple-500/50"
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center text-center">
                <motion.div
                  animate={{ y: isDragActive ? -10 : 0 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4"
                >
                  <Upload className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {isDragActive ? "Drop your file here" : "Upload Document"}
                </h3>
                <p className="text-sm text-gray-400">Drag & drop a PDF or text file, or click to browse</p>
              </div>
            </div>

            {uploadedFile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 glass rounded-2xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white truncate max-w-[200px]">{uploadedFile.name}</p>
                    <p className="text-xs text-gray-400">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUploadedFile(null);
                  }}
                  className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={processDocument}
              disabled={!uploadedFile || isProcessing}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  Processing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Analyze Document
                </>
              )}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {(["summary", "flashcards", "graphs"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      activeTab === tab
                        ? "bg-purple-500 text-white"
                        : "bg-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <button
                onClick={clearDocument}
                className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "summary" && (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="p-6 glass rounded-2xl">
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      <h3 className="font-bold text-white">AI Summary</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{processedContent}</p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <Network className="w-5 h-5 text-purple-400" /> Key Points
                    </h3>
                    {keyPoints.map((point, i) => (
                      <motion.div
                        key={point.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-4 rounded-2xl border ${importanceColors[point.importance]}`}
                      >
                        <p className="text-white">{point.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "flashcards" && flashcards.length > 0 && (
                <motion.div
                  key="flashcards"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-4">
                    <span className="text-sm text-gray-400">
                      Card {currentCardIndex + 1} of {flashcards.length}
                    </span>
                    <div className="flex gap-1 justify-center mt-2">
                      {flashcards.map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all ${
                            i === currentCardIndex ? "bg-purple-500 w-6" : "bg-white/20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="relative h-[280px] perspective-1000">
                    <motion.div
                      className="absolute inset-0 cursor-pointer"
                      onClick={() => setIsFlipped(!isFlipped)}
                      style={{ transformStyle: "preserve-3d" }}
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                    >
                      <div
                        className="absolute inset-0 p-8 glass rounded-3xl border border-purple-500/30 flex flex-col items-center justify-center backface-hidden"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <span className="text-xs text-purple-400 uppercase tracking-wider mb-4">Question</span>
                        <p className="text-xl font-bold text-white text-center">{flashcards[currentCardIndex]?.front}</p>
                        <span className="text-xs text-gray-500 mt-6">Tap to flip</span>
                      </div>

                      <div
                        className="absolute inset-0 p-8 glass rounded-3xl border border-cyan-500/30 flex flex-col items-center justify-center"
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                      >
                        <span className="text-xs text-cyan-400 uppercase tracking-wider mb-4">Answer</span>
                        <p className="text-lg text-gray-300 text-center leading-relaxed">{flashcards[currentCardIndex]?.back}</p>
                        <span className="text-xs text-gray-500 mt-6">Tap to flip back</span>
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevCard}
                      className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextCard}
                      className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {activeTab === "graphs" && conceptData.length > 0 && (
                <motion.div
                  key="graphs"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="p-6 glass rounded-2xl">
                    <div className="flex items-center gap-2 mb-6">
                      <BarChart3 className="w-5 h-5 text-cyan-400" />
                      <h3 className="font-bold text-white">Topic Distribution</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={conceptData}>
                        <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip
                          contentStyle={{
                            background: "rgba(0,0,0,0.8)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                          }}
                          labelStyle={{ color: "#fff" }}
                        />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                          {conceptData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="p-6 glass rounded-2xl">
                    <h3 className="font-bold text-white mb-6 text-center">Content Breakdown</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={conceptData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {conceptData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: "rgba(0,0,0,0.8)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                      {conceptData.map((item, index) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ background: COLORS[index % COLORS.length] }} />
                          <span className="text-sm text-gray-400">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
