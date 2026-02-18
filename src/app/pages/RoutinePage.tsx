import { useNavigate } from "react-router-dom";
import { Button } from "@/app/components/Button";
import { GlassCard } from "@/app/components/GlassCard";
import { PageTransition } from "@/app/components/PageTransition";
import { motion } from "motion/react";
import { Sun, Moon, Droplets, Sparkles, Shield, Heart } from "lucide-react";

export function RoutinePage() {
  const navigate = useNavigate();

  const morningRoutine = [
    { icon: Droplets, step: "Cleanser", product: "Gentle Foaming Cleanser", time: "30 sec" },
    { icon: Sparkles, step: "Toner", product: "Hydrating Toner", time: "1 min" },
    { icon: Heart, step: "Serum", product: "Vitamin C Serum", time: "2 min" },
    { icon: Droplets, step: "Moisturizer", product: "Day Cream SPF", time: "1 min" },
    { icon: Shield, step: "Sunscreen", product: "SPF 50 Protection", time: "1 min" },
  ];

  const nightRoutine = [
    { icon: Droplets, step: "Cleanser", product: "Deep Cleansing Oil", time: "1 min" },
    { icon: Sparkles, step: "Exfoliant", product: "AHA/BHA Toner", time: "2 min" },
    { icon: Heart, step: "Serum", product: "Retinol Serum", time: "2 min" },
    { icon: Droplets, step: "Eye Cream", product: "Nourishing Eye Cream", time: "1 min" },
    { icon: Shield, step: "Night Cream", product: "Repair Night Cream", time: "1 min" },
  ];

  return (
    <PageTransition direction="left">
      <div className="min-h-screen bg-[#fbf3fe] p-6 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl text-gray-800 mb-4">Your Personalized Routine</h1>
            <p className="text-gray-600 text-xl">Follow these steps for optimal skin health</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Morning Routine */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl">
                    <Sun className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl text-gray-800">Morning Routine</h2>
                    <p className="text-gray-600">Start your day right</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {morningRoutine.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-purple-200 hover:border-[#8b63d3] transition-all"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#8b63d3] to-[#b89de6] rounded-xl flex items-center justify-center text-white">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-800">{item.step}</h4>
                        <p className="text-sm text-gray-600">{item.product}</p>
                      </div>
                      <div className="text-sm text-[#8b63d3]">{item.time}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-yellow-50/50 rounded-xl border border-yellow-200">
                  <p className="text-sm text-gray-700">
                    ☀️ <strong>Total time:</strong> About 6 minutes
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            {/* Night Routine */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GlassCard>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl">
                    <Moon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl text-gray-800">Night Routine</h2>
                    <p className="text-gray-600">Repair while you sleep</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {nightRoutine.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-purple-200 hover:border-[#8b63d3] transition-all"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-800">{item.step}</h4>
                        <p className="text-sm text-gray-600">{item.product}</p>
                      </div>
                      <div className="text-sm text-[#8b63d3]">{item.time}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-purple-50/50 rounded-xl border border-purple-200">
                  <p className="text-sm text-gray-700">
                    🌙 <strong>Total time:</strong> About 7 minutes
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <GlassCard className="bg-gradient-to-r from-purple-50/50 to-pink-50/50">
              <h3 className="text-2xl text-gray-800 mb-4">💡 Pro Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#8b63d3] mt-1">•</span>
                  <span>Always apply products from thinnest to thickest consistency</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8b63d3] mt-1">•</span>
                  <span>Wait 30-60 seconds between each product for better absorption</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8b63d3] mt-1">•</span>
                  <span>Don't forget your neck and décolletage!</span>
                </li>
              </ul>
            </GlassCard>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <Button glow onClick={() => navigate("/products")}>
              See Recommended Products
            </Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
