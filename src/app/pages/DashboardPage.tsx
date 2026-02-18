import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/app/components/Button";
import { GlassCard } from "@/app/components/GlassCard";
import { PageTransition } from "@/app/components/PageTransition";
import { motion } from "motion/react";
import {
  User,
  Calendar,
  Heart,
  TrendingUp,
  Sparkles,
  ShoppingBag,
  Settings,
  MessageCircle,
  Package,
  Award,
  Clock,
  ArrowRight,
  TrendingDown,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export function DashboardPage() {
  const navigate = useNavigate();
  const [comparisonSlider, setComparisonSlider] = useState(50);

  const skinMetrics = [
    {
      label: "Hydration Level",
      value: "78%",
      trend: "+5%",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Skin Age",
      value: "26 yrs",
      trend: "-2 yrs",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Overall Health",
      value: "Excellent",
      trend: "+12%",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const quickActions = [
    {
      title: "My Routine",
      description: "View your personalized skincare routine",
      icon: Calendar,
      color: "from-purple-400 to-pink-400",
      route: "/routine",
    },
    {
      title: "My Orders",
      description: "Track orders and purchase history",
      icon: Package,
      color: "from-blue-400 to-cyan-400",
      route: "/orders",
    },
    {
      title: "My Profile",
      description: "Update personal information & preferences",
      icon: User,
      color: "from-orange-400 to-rose-400",
      route: "/profile",
    },
    {
      title: "Chat with AI",
      description: "Get personalized skincare advice",
      icon: MessageCircle,
      color: "from-green-400 to-teal-400",
      route: "/chatbot",
    },
  ];

  const recentActivity = [
    {
      type: "analysis",
      title: "Skin Analysis Completed",
      time: "2 days ago",
      icon: Sparkles,
    },
    {
      type: "order",
      title: "Order #12345 Shipped",
      time: "5 days ago",
      icon: ShoppingBag,
    },
    {
      type: "routine",
      title: "Daily Routine Completed",
      time: "1 week ago",
      icon: Award,
    },
  ];

  // Monthly skin score data
  const monthlyScoreData = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 72 },
    { month: "Mar", score: 68 },
    { month: "Apr", score: 75 },
    { month: "May", score: 78 },
    { month: "Jun", score: 82 },
  ];

  const currentScore = monthlyScoreData[monthlyScoreData.length - 1].score;
  const previousScore = monthlyScoreData[0].score;
  const improvementPercentage = ((currentScore - previousScore) / previousScore * 100).toFixed(1);

  return (
    <PageTransition direction="fade">
      <div className="min-h-screen bg-[#fbf3fe] dark:bg-[#1a0f2e] p-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-5xl text-gray-800 mb-2">Welcome Back, Sarah!</h1>
                <p className="text-gray-600 text-xl">
                  Your skin is looking better every day ✨
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2"
              >
                <Settings className="w-5 h-5" />
                Settings
              </Button>
            </div>
          </motion.div>

          {/* Visual Improvement Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <GlassCard className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200">
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Visual Improvement This Month
                    </h3>
                    <p className="text-gray-600">Your skincare routine is working!</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    +{improvementPercentage}%
                  </div>
                  <p className="text-sm text-gray-600">Overall Improvement</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Before/After Comparison Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <GlassCard>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl text-gray-800 mb-2">Before & After Comparison</h3>
                  <p className="text-gray-600">Slide to see your skin transformation</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Before (Jan 15)</p>
                    <p className="text-sm font-semibold text-gray-700">Score: 65</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#8b63d3]" />
                  <div className="text-left">
                    <p className="text-xs text-gray-500">After (Jun 15)</p>
                    <p className="text-sm font-semibold text-emerald-600">Score: 82</p>
                  </div>
                </div>
              </div>

              <div className="relative w-full h-96 bg-gray-100 rounded-2xl overflow-hidden">
                {/* Before Image (Background) */}
                <div className="absolute inset-0">
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <div className="text-center">
                      <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-2" />
                      <p className="text-gray-700 font-semibold">Before</p>
                      <p className="text-sm text-gray-600">January 15, 2026</p>
                    </div>
                  </div>
                </div>

                {/* After Image (Sliding overlay) */}
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: `inset(0 ${100 - comparisonSlider}% 0 0)`,
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-emerald-300 to-teal-400 flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="w-16 h-16 text-white mx-auto mb-2" />
                      <p className="text-white font-semibold">After</p>
                      <p className="text-sm text-emerald-50">June 15, 2026</p>
                    </div>
                  </div>
                </div>

                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                  style={{ left: `${comparisonSlider}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <div className="flex gap-1">
                      <div className="w-0.5 h-4 bg-gray-400" />
                      <div className="w-0.5 h-4 bg-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Slider Input */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={comparisonSlider}
                  onChange={(e) => setComparisonSlider(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                />
              </div>

              <div className="mt-4 text-center text-sm text-gray-600">
                <p>Drag the slider to compare your skin before and after using DeepSkyn</p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Monthly Skin Score Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <GlassCard>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl text-gray-800 mb-2">Monthly Skin Score Progress</h3>
                  <p className="text-gray-600">Track your skin health over time</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-600">
                    +{improvementPercentage}% Improvement
                  </span>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyScoreData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="month"
                      stroke="#9ca3af"
                      style={{ fontSize: "12px" }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      stroke="#9ca3af"
                      style={{ fontSize: "12px" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "8px 12px",
                      }}
                      formatter={(value: any) => [`Score: ${value}`, ""]}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#8b63d3"
                      strokeWidth={3}
                      dot={{ fill: "#8b63d3", r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Starting Score</p>
                  <p className="text-2xl font-bold text-gray-800">{previousScore}</p>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Current Score</p>
                  <p className="text-2xl font-bold text-emerald-600">{currentScore}</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Goal Score</p>
                  <p className="text-2xl font-bold text-blue-600">90</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Skin Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {skinMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <GlassCard hover className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${metric.bgColor} rounded-2xl mb-4`}
                  >
                    <TrendingUp className={`w-8 h-8 ${metric.color}`} />
                  </div>
                  <h3 className="text-gray-600 text-sm mb-2">{metric.label}</h3>
                  <p className="text-3xl text-gray-800 mb-2 font-bold">{metric.value}</p>
                  <div className="flex items-center justify-center gap-1 text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>{metric.trend} this month</span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl text-gray-800 mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  onClick={() => navigate(action.route)}
                  className="cursor-pointer"
                >
                  <GlassCard hover className="h-full text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl mb-4 text-white pulse-glow`}
                    >
                      <action.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl text-gray-800 mb-2 font-semibold">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Skin Progress */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="lg:col-span-2"
            >
              <GlassCard>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl text-gray-800">Skin Progress Tracking</h3>
                  <Heart className="w-6 h-6 text-red-400" />
                </div>

                <div className="space-y-6">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-700 font-semibold">30-Day Challenge</span>
                      <span className="text-sm text-[#8b63d3] font-semibold">75% Complete</span>
                    </div>
                    <div className="h-3 bg-purple-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1, delay: 0.9 }}
                        className="h-full bg-gradient-to-r from-[#8b63d3] to-[#b89de6]"
                      />
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-[#8b63d3]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-semibold">Started Routine</p>
                        <p className="text-sm text-gray-600">January 15, 2026</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-semibold">First Improvement</p>
                        <p className="text-sm text-gray-600">January 29, 2026</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-semibold">Goal Achievement Expected</p>
                        <p className="text-sm text-gray-600">February 14, 2026</p>
                      </div>
                    </div>
                  </div>

                  <Button glow onClick={() => navigate("/results")} className="w-full">
                    View Detailed Analysis
                  </Button>
                </div>
              </GlassCard>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <GlassCard>
                <h3 className="text-2xl text-gray-800 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/30 hover:bg-white/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <activity.icon className="w-5 h-5 text-[#8b63d3]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 text-sm font-semibold">{activity.title}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3" />
                          {activity.time}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-6"
                  onClick={() => navigate("/activity")}
                >
                  View All Activity
                </Button>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}