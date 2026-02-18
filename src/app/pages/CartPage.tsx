import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/app/components/Button";
import { GlassCard } from "@/app/components/GlassCard";
import { PageTransition } from "@/app/components/PageTransition";
import { BackButton } from "@/app/components/BackButton";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight } from "lucide-react";

export function CartPage() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Hydrating Vitamin C Serum",
      brand: "DeepSkyn Labs",
      price: 48.0,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1763986668655-413d55a24f6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3NtZXRpYyUyMHNlcnVtJTIwYm90dGxlfGVufDF8fHx8MTc3MDAyNDc5NHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      name: "Gentle Foaming Cleanser",
      brand: "DeepSkyn Pure",
      price: 32.0,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjBtb2lzdHVyaXplciUyMGJvdHRsZXxlbnwxfHx8fDE3NzAwNjIzMzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      name: "SPF 50 Sun Protection",
      brand: "DeepSkyn Shield",
      price: 38.0,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1739950839930-ef45c078f316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3RzJTIwbHV4dXJ5fGVufDF8fHx8MTc3MDAyNjQzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = subtotal > 100 ? 20 : 0;
  const shipping = 8;
  const total = subtotal - discount + shipping;

  return (
    <PageTransition direction="left">
      <div className="min-h-screen bg-[#fbf3fe] p-6 py-12">
        <div className="max-w-6xl mx-auto">
          <BackButton />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShoppingBag className="w-12 h-12 text-[#8b63d3]" />
              <h1 className="text-5xl text-gray-800">Your Cart</h1>
            </div>
            <p className="text-gray-600 text-xl">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </motion.div>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="text-center py-16">
                <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl text-gray-800 mb-4">Your cart is empty</h3>
                <p className="text-gray-600 mb-8">
                  Discover our personalized skincare recommendations
                </p>
                <Button glow onClick={() => navigate("/products")}>
                  Browse Products
                </Button>
              </GlassCard>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2 space-y-4"
              >
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <GlassCard className="p-6">
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 flex-shrink-0">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            fallbackSrc="https://via.placeholder.com/128x128/8b63d3/ffffff?text=Product"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-sm text-[#8b63d3] mb-1">{item.brand}</p>
                              <h3 className="text-xl text-gray-800">{item.name}</h3>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-2"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="mt-auto flex items-center justify-between">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-3 bg-white/50 rounded-xl p-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 rounded-lg bg-purple-100 text-[#8b63d3] hover:bg-purple-200 transition-colors flex items-center justify-center"
                                disabled={item.quantity === 1}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="text-gray-800 w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 rounded-lg bg-purple-100 text-[#8b63d3] hover:bg-purple-200 transition-colors flex items-center justify-center"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="text-2xl text-gray-800">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-sm text-gray-500">
                                  ${item.price.toFixed(2)} each
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <GlassCard className="sticky top-6">
                  <h3 className="text-2xl text-gray-800 mb-6">Order Summary</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          Discount
                        </span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t border-purple-200 pt-4 mb-6">
                    <div className="flex justify-between text-gray-800 text-xl">
                      <span>Total</span>
                      <span className="text-[#8b63d3]">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {subtotal < 100 && (
                    <div className="bg-purple-50/50 rounded-xl p-4 mb-6">
                      <p className="text-sm text-gray-700">
                        💰 Add ${(100 - subtotal).toFixed(2)} more to get $20 off!
                      </p>
                    </div>
                  )}

                  <Button
                    glow
                    className="w-full mb-4"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 ml-2 inline" />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/products")}
                  >
                    Continue Shopping
                  </Button>
                </GlassCard>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
