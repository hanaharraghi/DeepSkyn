import { useNavigate, useSearchParams } from "react-router-dom";
import { GlassCard } from "@/app/components/GlassCard";
import { PageTransition } from "@/app/components/PageTransition";
import { BackButton } from "@/app/components/BackButton";
import { Button } from "@/app/components/Button";
import { motion } from "motion/react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
  Download,
  Phone,
  Mail,
} from "lucide-react";

export function OrderDetailsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id") || "#12345";

  // Mock order data - in real app, fetch based on orderId
  const order = {
    id: orderId,
    date: "January 28, 2026",
    status: "Delivered",
    statusColor: "text-green-600",
    statusBg: "bg-green-100",
    items: [
      {
        name: "Hydrating Vitamin C Serum",
        price: 45.0,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200",
      },
      {
        name: "Gentle Foaming Cleanser",
        price: 28.0,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200",
      },
      {
        name: "SPF 50 Sun Protection",
        price: 45.0,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200",
      },
    ],
    subtotal: 118.0,
    shipping: 0.0,
    tax: 10.62,
    total: 128.62,
    trackingNumber: "1Z999AA10123456784",
    shippingAddress: {
      name: "Sarah Johnson",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      phone: "+1 (555) 123-4567",
    },
    billingAddress: {
      name: "Sarah Johnson",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
    paymentMethod: {
      type: "Credit Card",
      last4: "4242",
      brand: "Visa",
    },
  };

  return (
    <PageTransition direction="fade">
      <div className="min-h-screen bg-[#fbf3fe] p-6 py-12">
        <div className="max-w-5xl mx-auto">
          <BackButton />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl text-gray-800 mb-2">Order {order.id}</h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Placed on {order.date}
                </p>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Invoice
              </Button>
            </div>

            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${order.statusBg} ${order.statusColor}`}
            >
              <CheckCircle className="w-4 h-4" />
              {order.status}
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <GlassCard>
                  <h2 className="text-2xl text-gray-800 mb-6">Order Items</h2>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 pb-4 border-b border-purple-100 last:border-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-gray-800 font-medium mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-lg font-semibold text-gray-800">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="mt-6 pt-6 border-t border-purple-200">
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-700">
                        <span>Subtotal</span>
                        <span>${order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Shipping</span>
                        <span className="text-green-600">
                          {order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Tax</span>
                        <span>${order.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xl font-semibold text-gray-800 pt-3 border-t border-purple-200">
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Tracking Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <GlassCard>
                  <div className="flex items-center gap-2 mb-6">
                    <Truck className="w-6 h-6 text-[#8b63d3]" />
                    <h2 className="text-2xl text-gray-800">Tracking Information</h2>
                  </div>

                  <div className="bg-purple-50/50 rounded-xl p-4 mb-6">
                    <p className="text-sm text-gray-700 mb-2">Tracking Number:</p>
                    <p className="text-gray-800 font-mono font-semibold">
                      {order.trackingNumber}
                    </p>
                  </div>

                  <Button
                    glow
                    onClick={() =>
                      navigate(
                        `/track-package?tracking=${order.trackingNumber}&orderId=${order.id}`
                      )
                    }
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Truck className="w-5 h-5" />
                    Track Package
                  </Button>
                </GlassCard>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <GlassCard>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-[#8b63d3]" />
                    <h3 className="text-lg font-semibold text-gray-800">Shipping Address</h3>
                  </div>
                  <div className="text-gray-700 space-y-1">
                    <p className="font-medium">{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.street}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                      {order.shippingAddress.zip}
                    </p>
                    <p className="flex items-center gap-2 pt-2">
                      <Phone className="w-4 h-4" />
                      {order.shippingAddress.phone}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Billing Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <GlassCard>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-[#8b63d3]" />
                    <h3 className="text-lg font-semibold text-gray-800">Billing Address</h3>
                  </div>
                  <div className="text-gray-700 space-y-1">
                    <p className="font-medium">{order.billingAddress.name}</p>
                    <p>{order.billingAddress.street}</p>
                    <p>
                      {order.billingAddress.city}, {order.billingAddress.state}{" "}
                      {order.billingAddress.zip}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <GlassCard>
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-5 h-5 text-[#8b63d3]" />
                    <h3 className="text-lg font-semibold text-gray-800">Payment Method</h3>
                  </div>
                  <div className="text-gray-700">
                    <p className="font-medium mb-1">{order.paymentMethod.brand} •••• {order.paymentMethod.last4}</p>
                    <p className="text-sm text-gray-600">{order.paymentMethod.type}</p>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Help */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <GlassCard className="bg-purple-50/30">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Contact our support team for assistance with your order.
                  </p>
                  <div className="space-y-2">
                    <a
                      href="mailto:support@deepskyn.com"
                      className="flex items-center gap-2 text-sm text-[#8b63d3] hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      support@deepskyn.com
                    </a>
                    <a
                      href="tel:+15551234567"
                      className="flex items-center gap-2 text-sm text-[#8b63d3] hover:underline"
                    >
                      <Phone className="w-4 h-4" />
                      +1 (555) 123-4567
                    </a>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
