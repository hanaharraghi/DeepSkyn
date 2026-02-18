import { useNavigate } from "react-router-dom";
import { Button } from "@/app/components/Button";
import { GlassCard } from "@/app/components/GlassCard";
import { PageTransition } from "@/app/components/PageTransition";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import {
  ShoppingCart,
  Sparkles,
  Star,
  CheckCircle,
  Shield,
  AlertTriangle,
  Info,
  Heart,
} from "lucide-react";

interface Product {
  name: string;
  brand: string;
  price: string;
  benefits: string[];
  rating: number;
  match: number;
  image: string;
  safeForAllergies: boolean;
  hasConflicts: boolean;
  conflictWarning?: string;
  keyIngredients: string[];
}

export function ProductsPage() {
  const navigate = useNavigate();

  const products: Product[] = [
    {
      name: "Hydrating Vitamin C Serum",
      brand: "DeepSkyn Labs",
      price: "$48.00",
      benefits: ["Brightening", "Anti-aging", "Hydration"],
      rating: 4.8,
      match: 95,
      image:
        "https://images.unsplash.com/photo-1763986668655-413d55a24f6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3NtZXRpYyUyMHNlcnVtJTIwYm90dGxlfGVufDF8fHx8MTc3MDAyNDc5NHww&ixlib=rb-4.1.0&q=80&w=1080",
      safeForAllergies: true,
      hasConflicts: false,
      keyIngredients: ["Vitamin C", "Hyaluronic Acid", "Niacinamide"],
    },
    {
      name: "Gentle Foaming Cleanser",
      brand: "DeepSkyn Pure",
      price: "$32.00",
      benefits: ["Deep cleansing", "pH balanced", "Gentle"],
      rating: 4.9,
      match: 92,
      image:
        "https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjBtb2lzdHVyaXplciUyMGJvdHRsZXxlbnwxfHx8fDE3NzAwNjIzMzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      safeForAllergies: true,
      hasConflicts: false,
      keyIngredients: ["Glycerin", "Chamomile Extract", "Aloe Vera"],
    },
    {
      name: "Repair Night Cream",
      brand: "DeepSkyn Restore",
      price: "$56.00",
      benefits: ["Anti-aging", "Repair", "Nourishing"],
      rating: 4.7,
      match: 89,
      image:
        "https://images.unsplash.com/photo-1763503834047-ac85c4105c0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZmFjZSUyMGNyZWFtJTIwamFyfGVufDF8fHx8MTc3MDA2MjMzMHww&ixlib=rb-4.1.0&q=80&w=1080",
      safeForAllergies: false,
      hasConflicts: true,
      conflictWarning: "Contains nut-derived oils. May conflict with your fragrance sensitivity.",
      keyIngredients: ["Peptides", "Shea Butter", "Argan Oil"],
    },
    {
      name: "SPF 50 Sun Protection",
      brand: "DeepSkyn Shield",
      price: "$38.00",
      benefits: ["UV protection", "Lightweight", "Non-greasy"],
      rating: 4.9,
      match: 94,
      image:
        "https://images.unsplash.com/photo-1739950839930-ef45c078f316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3RzJTIwbHV4dXJ5fGVufDF8fHx8MTc3MDAyNjQzMXww&ixlib=rb-4.1.0&q=80&w=1080",
      safeForAllergies: true,
      hasConflicts: false,
      keyIngredients: ["Zinc Oxide", "Titanium Dioxide", "Vitamin E"],
    },
    {
      name: "Retinol Night Serum",
      brand: "DeepSkyn Advanced",
      price: "$64.00",
      benefits: ["Anti-aging", "Cell renewal", "Wrinkle reduction"],
      rating: 4.8,
      match: 88,
      image:
        "https://images.unsplash.com/photo-1763986668655-413d55a24f6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3NtZXRpYyUyMHNlcnVtJTIwYm90dGxlfGVufDF8fHx8MTc3MDAyNDc5NHww&ixlib=rb-4.1.0&q=80&w=1080",
      safeForAllergies: true,
      hasConflicts: true,
      conflictWarning: "Do not use with Vitamin C serum in the same routine. Use on alternate nights.",
      keyIngredients: ["Retinol", "Squalane", "Ceramides"],
    },
    {
      name: "Nourishing Eye Cream",
      brand: "DeepSkyn Eye",
      price: "$42.00",
      benefits: ["Dark circles", "Puffiness", "Fine lines"],
      rating: 4.6,
      match: 86,
      image:
        "https://images.unsplash.com/photo-1763503834047-ac85c4105c0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZmFjZSUyMGNyZWFtJTIwamFyfGVufDF8fHx8MTc3MDA2MjMzMHww&ixlib=rb-4.1.0&q=80&w=1080",
      safeForAllergies: true,
      hasConflicts: false,
      keyIngredients: ["Caffeine", "Peptides", "Vitamin K"],
    },
  ];

  const getMatchColor = (match: number) => {
    if (match >= 90) return "from-emerald-500 to-teal-500";
    if (match >= 85) return "from-[#8b63d3] to-[#b89de6]";
    return "from-orange-500 to-yellow-500";
  };

  const getMatchText = (match: number) => {
    if (match >= 90) return "Excellent Match";
    if (match >= 85) return "Great Match";
    return "Good Match";
  };

  return (
    <PageTransition direction="left">
      <div className="min-h-screen bg-[#fbf3fe] dark:bg-[#1a0f2e] p-6 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl text-gray-800 dark:text-gray-200 mb-4">Recommended Products</h1>
            <p className="text-gray-600 dark:text-gray-400 text-xl">
              Curated specifically for your skin needs with AI compatibility analysis
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard hover className="h-full flex flex-col relative">
                  {/* Compatibility Score Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div
                      className={`bg-gradient-to-r ${getMatchColor(
                        product.match
                      )} text-white px-4 py-2 rounded-full text-sm flex flex-col items-center gap-1 pulse-glow shadow-lg`}
                    >
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-bold">{product.match}%</span>
                      </div>
                      <span className="text-xs opacity-90">{getMatchText(product.match)}</span>
                    </div>
                  </div>

                  {/* Safe for Allergies Badge */}
                  {product.safeForAllergies && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1 shadow-lg">
                        <Shield className="w-3 h-3" />
                        <span className="font-semibold">Safe for your allergies</span>
                      </div>
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="relative w-full h-64 mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      fallbackSrc="https://via.placeholder.com/400x400/8b63d3/ffffff?text=Product"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col">
                    <p className="text-sm text-[#8b63d3] mb-1 font-semibold">{product.brand}</p>
                    <h3 className="text-xl text-gray-800 dark:text-gray-200 mb-2 font-bold">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1 font-semibold">
                        ({product.rating})
                      </span>
                    </div>

                    {/* Ingredient Conflict Warning */}
                    {product.hasConflicts && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-3 p-3 bg-orange-50 border border-orange-200 rounded-lg"
                      >
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-orange-800 mb-1">
                              Ingredient Notice
                            </p>
                            <p className="text-xs text-orange-700">{product.conflictWarning}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Key Ingredients */}
                    <div className="mb-3">
                      <div className="flex items-center gap-1 mb-2">
                        <Info className="w-4 h-4 text-[#8b63d3]" />
                        <p className="text-xs font-semibold text-gray-700">Key Ingredients:</p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {product.keyIngredients.map((ingredient, i) => (
                          <span
                            key={i}
                            className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full border border-purple-200"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.benefits.map((benefit, i) => (
                        <span
                          key={i}
                          className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center gap-1 font-semibold"
                        >
                          <CheckCircle className="w-3 h-3" />
                          {benefit}
                        </span>
                      ))}
                    </div>

                    {/* Compatibility Details */}
                    <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-700">
                          Compatibility Analysis
                        </span>
                        <Heart className="w-4 h-4 text-[#8b63d3]" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Skin Type Match</span>
                          <span className="text-[#8b63d3] font-semibold">{product.match}%</span>
                        </div>
                        <div className="h-1.5 bg-purple-100 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${getMatchColor(product.match)}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${product.match}%` }}
                            transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="mt-auto pt-4 border-t border-purple-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl text-gray-800 font-bold">{product.price}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 text-sm py-2 hover:bg-[#8b63d3] hover:text-white hover:border-[#8b63d3]"
                          onClick={() => navigate("/cart")}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          glow
                          className="flex-1 text-sm py-2"
                          onClick={() => navigate("/checkout")}
                        >
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-8"
          >
            <GlassCard className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                    AI-Powered Ingredient Analysis
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Our advanced AI system analyzes each product's ingredients against your skin
                    profile, allergies, and current routine to ensure maximum safety and
                    effectiveness. Products are ranked by compatibility score for your convenience.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-xs text-gray-700">
                        <span className="font-semibold">Safe for Allergies:</span> No known
                        allergens detected
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <span className="text-xs text-gray-700">
                        <span className="font-semibold">Conflict Warning:</span> May interact with
                        other products
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Bundle Offer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <GlassCard className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 text-center">
              <Sparkles className="w-12 h-12 text-[#8b63d3] mx-auto mb-4" />
              <h3 className="text-2xl text-gray-800 dark:text-gray-200 mb-2 font-bold">
                Complete Skincare Bundle
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get all recommended products and save 20% - Perfect compatibility guaranteed!
              </p>
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-3xl text-gray-400 line-through">$280</span>
                <span className="text-4xl text-[#8b63d3] font-bold">$224</span>
              </div>
              <Button glow onClick={() => navigate("/checkout")} className="px-12">
                Buy Complete Bundle
              </Button>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}