import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/app/components/Button";
import { GlassCard } from "@/app/components/GlassCard";
import { ProgressIndicator } from "@/app/components/ProgressIndicator";
import { PageTransition } from "@/app/components/PageTransition";
import { motion } from "motion/react";

export function QuestionnairePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    skinType: "",
    allergies: "",
    concerns: [] as string[],
  });

  const skinTypes = ["Dry", "Oily", "Combination", "Normal", "Sensitive"];
  const concerns = ["Acne", "Dark Spots", "Wrinkles", "Pores", "Dullness", "Redness"];

  const toggleConcern = (concern: string) => {
    setFormData({
      ...formData,
      concerns: formData.concerns.includes(concern)
        ? formData.concerns.filter((c) => c !== concern)
        : [...formData.concerns, concern],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/upload");
  };

  return (
    <PageTransition direction="left">
      <div className="min-h-screen bg-[#fbf3fe] flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <ProgressIndicator currentStep={2} totalSteps={4} />

          <GlassCard>
            <div className="text-center mb-8">
              <h2 className="text-4xl text-gray-800 mb-2">Skin Questionnaire</h2>
              <p className="text-gray-600">Help us understand your unique skin needs</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Skin Type */}
              <div>
                <label className="block text-gray-700 mb-4">What is your skin type?</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {skinTypes.map((type) => (
                    <motion.button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, skinType: type })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.skinType === type
                          ? "border-[#8b63d3] bg-[#8b63d3] text-white"
                          : "border-purple-200 bg-white/30 text-gray-700 hover:border-[#8b63d3]"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {type}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Allergies */}
              <div>
                <label className="block text-gray-700 mb-4">
                  Do you have any allergies or sensitivities?
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-purple-200 focus:border-[#8b63d3] focus:outline-none focus:ring-2 focus:ring-[#8b63d3]/20 transition-all resize-none"
                  rows={3}
                  placeholder="E.g., fragrance, certain ingredients..."
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                />
              </div>

              {/* Concerns */}
              <div>
                <label className="block text-gray-700 mb-4">
                  What are your main skin concerns? (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {concerns.map((concern) => (
                    <motion.button
                      key={concern}
                      type="button"
                      onClick={() => toggleConcern(concern)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.concerns.includes(concern)
                          ? "border-[#8b63d3] bg-[#8b63d3] text-white"
                          : "border-purple-200 bg-white/30 text-gray-700 hover:border-[#8b63d3]"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {concern}
                    </motion.button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                glow
                className="w-full"
                disabled={!formData.skinType || formData.concerns.length === 0}
              >
                Continue
              </Button>
            </form>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  );
}
