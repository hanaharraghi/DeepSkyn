import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/app/components/Button";
import { GlassCard } from "@/app/components/GlassCard";
import { PageTransition } from "@/app/components/PageTransition";
import { motion } from "motion/react";
import { Check, Crown, Star, Zap, Sparkles } from "lucide-react";

type PremiumTier = "silver" | "gold" | "platinum";

interface PremiumPlan {
  id: PremiumTier;
  name: string;
  price: string;
  priceMonthly: number;
  icon: typeof Crown;
  color: string;
  bgGradient: string;
  glowColor: string;
  features: string[];
  photoLimit: number;
  popular?: boolean;
}

export function PremiumPage() {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState<PremiumTier>("gold");

  const premiumPlans: PremiumPlan[] = [
    {
      id: "silver",
      name: "Silver",
      price: "$29",
      priceMonthly: 29,
      icon: Star,
      color: "text-gray-700",
      bgGradient: "from-gray-200 via-gray-300 to-gray-400",
      glowColor: "shadow-gray-400/50",
      photoLimit: 3,
      features: [
        "Basic AI skin analysis",
        "Upload up to 3 photos",
        "Personalized skincare routine",
        "Monthly skin reports",
        "Email support",
        "Access to product database",
      ],
    },
    {
      id: "gold",
      name: "Gold",
      price: "$49",
      priceMonthly: 49,
      icon: Crown,
      color: "text-yellow-600",
      bgGradient: "from-yellow-300 via-yellow-400 to-yellow-500",
      glowColor: "shadow-yellow-400/50",
      photoLimit: 5,
      popular: true,
      features: [
        "Advanced AI skin analysis",
        "Upload up to 5 photos",
        "Custom skincare routine",
        "Weekly skin tracking",
        "Product recommendations",
        "Priority email support",
        "Exclusive discounts (15% off)",
        "Access to AI chatbot",
      ],
    },
    {
      id: "platinum",
      name: "Platinum",
      price: "$79",
      priceMonthly: 79,
      icon: Zap,
      color: "text-purple-600",
      bgGradient: "from-purple-400 via-purple-500 to-purple-600",
      glowColor: "shadow-purple-500/50",
      photoLimit: 10,
      features: [
        "Premium AI deep analysis",
        "Upload up to 10 photos",
        "Bespoke skincare plan",
        "Real-time skin monitoring",
        "Luxury product curation",
        "Monthly video consultation",
        "24/7 VIP support",
        "Exclusive discounts (25% off)",
        "Early access to new features",
        "Complimentary samples",
      ],
    },
  ];

  const selectedPlan = premiumPlans.find((plan) => plan.id === selectedTier)!;

  const handleUpgrade = () => {
    // Navigate to checkout or payment flow
    navigate("/checkout", { state: { premiumTier: selectedTier } });
  };

  return (
    <PageTransition direction="fade">
      <div className="min-h-screen bg-[#fbf3fe] dark:bg-gray-900 p-6 pt-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8b63d3] to-[#b89de6] text-white mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Premium Membership</span>
            </div>
            <h1 className="text-5xl lg:text-6xl text-gray-900 dark:text-white mb-4">
              Upgrade to Premium
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Unlock advanced AI analysis and personalized skincare recommendations
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {premiumPlans.map((plan, index) => {
              const Icon = plan.icon;
              const isSelected = selectedTier === plan.id;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-[#8b63d3] to-[#b89de6] text-white text-sm font-semibold px-6 py-2 rounded-full shadow-lg">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <motion.button
                    onClick={() => setSelectedTier(plan.id)}
                    className={`w-full glass-card rounded-3xl p-8 text-left transition-all ${
                      isSelected
                        ? `ring-4 ring-[#8b63d3] shadow-2xl ${plan.glowColor} scale-105`
                        : "hover:scale-102 hover:shadow-xl"
                    } ${plan.popular ? "pt-10" : ""}`}
                    whileHover={{ y: -8 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Icon with Gradient */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.bgGradient} flex items-center justify-center shadow-lg ${plan.glowColor}`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-10 h-10 bg-[#8b63d3] rounded-full flex items-center justify-center shadow-lg"
                        >
                          <Check className="w-6 h-6 text-white" />
                        </motion.div>
                      )}
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-5xl font-bold text-[#8b63d3]">{plan.price}</span>
                      <span className="text-gray-500 dark:text-gray-400">/month</span>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                        >
                          <div className="w-5 h-5 rounded-full bg-[#8b63d3] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Select Button */}
                    <div className="pt-4 border-t border-purple-200 dark:border-purple-800">
                      <div
                        className={`w-full py-3 rounded-xl text-center font-semibold transition-all ${
                          isSelected
                            ? "bg-[#8b63d3] text-white"
                            : "bg-purple-100 dark:bg-purple-900/30 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {isSelected ? "Selected Plan" : "Select Plan"}
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* Selected Plan Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard className="max-w-3xl mx-auto p-8">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Ready to upgrade to {selectedPlan.name}?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Start your premium journey with advanced AI-powered skincare analysis
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                  <div className="glass-card px-6 py-3 rounded-2xl">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Price</p>
                    <p className="text-2xl font-bold text-[#8b63d3]">{selectedPlan.price}</p>
                  </div>
                  <div className="glass-card px-6 py-3 rounded-2xl">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Photo Uploads</p>
                    <p className="text-2xl font-bold text-[#8b63d3]">
                      Up to {selectedPlan.photoLimit}
                    </p>
                  </div>
                  <div className="glass-card px-6 py-3 rounded-2xl">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Billing</p>
                    <p className="text-2xl font-bold text-[#8b63d3]">Monthly</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button glow onClick={handleUpgrade} className="px-8 py-3">
                    Upgrade to {selectedPlan.name} ✨
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/")} className="px-8 py-3">
                    Maybe Later
                  </Button>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
                  Cancel anytime. No hidden fees. 30-day money-back guarantee.
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* FAQ or Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-4xl mx-auto mt-16 text-center"
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Why Choose Premium?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassCard className="p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b63d3] to-[#b89de6] flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Advanced AI Analysis
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get deeper insights with our premium AI models trained on millions of skin profiles
                </p>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b63d3] to-[#b89de6] flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Personalized Care
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive customized skincare routines tailored to your unique skin profile
                </p>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b63d3] to-[#b89de6] flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Expert Support
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Access priority support and consultations with skincare specialists
                </p>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
