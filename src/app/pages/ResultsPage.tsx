import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/app/components/Button";
import { GlassCard } from "@/app/components/GlassCard";
import { PageTransition } from "@/app/components/PageTransition";
import { motion, AnimatePresence } from "motion/react";
import {
  AlertCircle,
  Droplets,
  Sun,
  Sparkles,
  TrendingUp,
  Download,
  ChevronDown,
  ChevronUp,
  Shield,
  Activity,
  Calendar,
  Target,
  Award,
  AlertTriangle,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface RiskLevel {
  level: "low" | "medium" | "high";
  label: string;
  color: string;
  bgColor: string;
}

interface SkinConcern {
  icon: React.ElementType;
  label: string;
  severity: string;
  color: string;
  riskLevel: RiskLevel;
  description: string;
  tips: string[];
}

export function ResultsPage() {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const healthScore = 78;
  const aiConfidence = 95;
  const skinAge = 28;
  const realAge = 32;
  const improvementPotential = 85;

  const data = [
    { name: "Healthy", value: healthScore },
    { name: "Remaining", value: 100 - healthScore },
  ];
  const COLORS = ["#8b63d3", "#ece2f9"];

  const getRiskLevel = (severity: string): RiskLevel => {
    if (severity === "Mild")
      return {
        level: "low",
        label: "Low Risk",
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
      };
    if (severity === "Moderate")
      return {
        level: "medium",
        label: "Medium Risk",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      };
    return {
      level: "high",
      label: "High Risk",
      color: "text-red-600",
      bgColor: "bg-red-50",
    };
  };

  const issues: SkinConcern[] = [
    {
      icon: Droplets,
      label: "Dehydration",
      severity: "Moderate",
      color: "text-blue-500",
      riskLevel: getRiskLevel("Moderate"),
      description:
        "Your skin shows signs of dehydration, which can lead to increased fine lines and dullness.",
      tips: [
        "Drink at least 8 glasses of water daily",
        "Use a hydrating serum with hyaluronic acid",
        "Apply moisturizer within 3 minutes after cleansing",
        "Use a humidifier in dry environments",
      ],
    },
    {
      icon: Sun,
      label: "Sun Damage",
      severity: "Mild",
      color: "text-yellow-500",
      riskLevel: getRiskLevel("Mild"),
      description:
        "Minor UV damage detected. Early intervention can prevent further photoaging.",
      tips: [
        "Apply SPF 50+ sunscreen daily, even on cloudy days",
        "Reapply sunscreen every 2 hours when outdoors",
        "Wear protective clothing and seek shade",
        "Use antioxidant serums with Vitamin C",
      ],
    },
    {
      icon: AlertCircle,
      label: "Dark Spots",
      severity: "Mild",
      color: "text-orange-500",
      riskLevel: getRiskLevel("Mild"),
      description:
        "Slight hyperpigmentation detected. Consistent treatment can fade these areas.",
      tips: [
        "Use products with niacinamide or vitamin C",
        "Apply targeted treatments at night",
        "Always wear sunscreen to prevent darkening",
        "Consider professional treatments like chemical peels",
      ],
    },
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const downloadPDFReport = () => {
    // Simulate PDF download
    alert("PDF Report will be downloaded. This is a demo feature.");
  };

  return (
    <PageTransition direction="fade">
      <div className="min-h-screen bg-[#fbf3fe] dark:bg-[#1a0f2e] p-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl text-gray-800 mb-4">Your Skin Analysis</h1>
            <p className="text-gray-600 text-xl mb-6">
              AI-powered insights into your skin health
            </p>

            {/* Download PDF Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                onClick={downloadPDFReport}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8b63d3] to-[#b89de6] hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                Download Full PDF Report
              </Button>
            </motion.div>
          </motion.div>

          {/* AI Confidence Score Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <GlassCard className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8b63d3] to-[#b89de6] flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      AI Analysis Confidence
                    </h3>
                    <p className="text-gray-600">High accuracy prediction model</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-[#8b63d3] to-[#b89de6] bg-clip-text text-transparent">
                    {aiConfidence}%
                  </div>
                  <p className="text-sm text-gray-600">Confidence Score</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Skin Age vs Real Age */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <GlassCard>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 mb-3">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-600 mb-2">Your Skin Age</p>
                  <p className="text-4xl font-bold text-emerald-600">{skinAge}</p>
                </div>

                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <Award className="w-12 h-12 text-[#8b63d3] mx-auto mb-2" />
                    <p className="text-2xl font-bold text-[#8b63d3]">
                      {realAge - skinAge} years younger!
                    </p>
                    <p className="text-sm text-gray-600">Your skin looks younger</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b63d3] to-[#b89de6] mb-3">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-600 mb-2">Your Real Age</p>
                  <p className="text-4xl font-bold text-gray-800">{realAge}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Health Score */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <GlassCard hover>
                <h3 className="text-2xl text-gray-800 mb-6 text-center">
                  Skin Health Score
                </h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={100}
                          startAngle={90}
                          endAngle={-270}
                          dataKey="value"
                        >
                          {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl text-[#8b63d3] font-bold">
                          {healthScore}
                        </div>
                        <div className="text-gray-600">/ 100</div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-gray-600 mt-4">
                  Your skin health is <span className="text-[#8b63d3] font-semibold">Good</span>
                </p>
              </GlassCard>
            </motion.div>

            {/* Improvement Potential */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <GlassCard hover>
                <h3 className="text-2xl text-gray-800 mb-6 text-center">
                  Improvement Potential
                </h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Potential", value: improvementPotential },
                            { name: "Remaining", value: 100 - improvementPotential },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={100}
                          startAngle={90}
                          endAngle={-270}
                          dataKey="value"
                        >
                          <Cell fill="#10b981" />
                          <Cell fill="#d1fae5" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl text-emerald-600 font-bold">
                          {improvementPotential}
                        </div>
                        <div className="text-gray-600">%</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-emerald-50 rounded-xl">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <Target className="w-5 h-5" />
                    <span className="text-sm font-semibold">
                      High potential for visible improvement
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Detected Issues with Expandable Sections */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-8"
          >
            <GlassCard>
              <h3 className="text-2xl text-gray-800 mb-6">
                Detected Skin Concerns & Personalized Tips
              </h3>
              <div className="space-y-4">
                {issues.map((issue, index) => (
                  <motion.div
                    key={issue.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  >
                    <div className="border-2 border-purple-200 rounded-2xl overflow-hidden bg-white/50">
                      {/* Header */}
                      <button
                        onClick={() => toggleSection(issue.label)}
                        className="w-full p-6 flex items-center justify-between hover:bg-purple-50/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <issue.icon className={`w-10 h-10 ${issue.color}`} />
                          <div className="text-left">
                            <h4 className="text-lg font-semibold text-gray-800">
                              {issue.label}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Severity: {issue.severity}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {/* Risk Level Badge */}
                          <div
                            className={`px-4 py-2 rounded-full ${issue.riskLevel.bgColor} ${issue.riskLevel.color} flex items-center gap-2`}
                          >
                            <Shield className="w-4 h-4" />
                            <span className="text-sm font-semibold">
                              {issue.riskLevel.label}
                            </span>
                          </div>
                          {expandedSection === issue.label ? (
                            <ChevronUp className="w-6 h-6 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-gray-600" />
                          )}
                        </div>
                      </button>

                      {/* Expandable Content */}
                      <AnimatePresence>
                        {expandedSection === issue.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 pt-0 border-t border-purple-100">
                              {/* Description */}
                              <div className="mb-4">
                                <h5 className="font-semibold text-gray-800 mb-2">
                                  About This Concern:
                                </h5>
                                <p className="text-gray-600">{issue.description}</p>
                              </div>

                              {/* Personalized Tips */}
                              <div>
                                <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                  <Sparkles className="w-5 h-5 text-[#8b63d3]" />
                                  Personalized Improvement Tips:
                                </h5>
                                <ul className="space-y-2">
                                  {issue.tips.map((tip, tipIndex) => (
                                    <motion.li
                                      key={tipIndex}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: tipIndex * 0.1 }}
                                      className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg"
                                    >
                                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#8b63d3] to-[#b89de6] flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-xs font-bold">
                                          {tipIndex + 1}
                                        </span>
                                      </div>
                                      <span className="text-gray-700">{tip}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              glow
              onClick={() => navigate("/routine")}
              className="flex items-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              View Personalized Skincare Routine
            </Button>
            <Button variant="outline" onClick={() => navigate("/products")}>
              View Recommended Products
            </Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}