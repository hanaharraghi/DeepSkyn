import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { GlassCard } from "@/app/components/GlassCard";
import { PageTransition } from "@/app/components/PageTransition";
import { motion } from "motion/react";
import { CreditCard, Lock, MapPin, User } from "lucide-react";

export function CheckoutPage() {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      navigate("/confirmation");
    }, 2500);
  };

  const orderItems = [
    { name: "Hydrating Vitamin C Serum", price: 48 },
    { name: "Gentle Foaming Cleanser", price: 32 },
    { name: "SPF 50 Sun Protection", price: 38 },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = 8;
  const total = subtotal + shipping;

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
            <h1 className="text-5xl text-gray-800 mb-4">Secure Checkout</h1>
            <p className="text-gray-600 text-xl">Complete your order securely</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <GlassCard>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Shipping Information */}
                  <div>
                    <h3 className="text-2xl text-gray-800 mb-4 flex items-center gap-2">
                      <MapPin className="w-6 h-6 text-[#8b63d3]" />
                      Shipping Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <Input
                      label="Address"
                      type="text"
                      placeholder="123 Main Street"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="mt-4"
                      required
                    />
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <Input
                        label="City"
                        type="text"
                        placeholder="New York"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                      />
                      <Input
                        label="ZIP Code"
                        type="text"
                        placeholder="10001"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="pt-6 border-t border-purple-200">
                    <h3 className="text-2xl text-gray-800 mb-4 flex items-center gap-2">
                      <CreditCard className="w-6 h-6 text-[#8b63d3]" />
                      Payment Information
                    </h3>
                    <Input
                      label="Card Number"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      required
                    />
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <Input
                        label="Expiry Date"
                        type="text"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        required
                      />
                      <Input
                        label="CVV"
                        type="text"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 p-4 bg-green-50 rounded-xl">
                    <Lock className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-700">
                      Your payment information is secure and encrypted
                    </span>
                  </div>

                  <Button
                    type="submit"
                    glow
                    className="w-full"
                    disabled={processing}
                  >
                    {processing ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      `Complete Purchase - $${total.toFixed(2)}`
                    )}
                  </Button>
                </form>
              </GlassCard>
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
                  {orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-gray-700">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-purple-200 pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
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

                <div className="bg-purple-50/50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    🎁 <strong>Free gift included!</strong>
                    <br />
                    Deluxe sample of our new Glow Serum
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
