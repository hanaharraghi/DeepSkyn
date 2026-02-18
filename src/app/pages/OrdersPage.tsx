import { useNavigate } from "react-router-dom";
import { Button } from "@/app/components/Button";
import { GlassCard } from "@/app/components/GlassCard";
import { PageTransition } from "@/app/components/PageTransition";
import { BackButton } from "@/app/components/BackButton";
import { motion } from "motion/react";
import { Package, Truck, CheckCircle, Clock, MapPin, Eye } from "lucide-react";

export function OrdersPage() {
  const navigate = useNavigate();

  const orders = [
    {
      id: "#12345",
      date: "January 28, 2026",
      status: "Delivered",
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
      items: [
        "Hydrating Vitamin C Serum",
        "Gentle Foaming Cleanser",
        "SPF 50 Sun Protection",
      ],
      total: 118.0,
      trackingNumber: "1Z999AA10123456784",
    },
    {
      id: "#12344",
      date: "January 15, 2026",
      status: "In Transit",
      statusColor: "text-blue-600",
      statusBg: "bg-blue-100",
      items: ["Repair Night Cream", "Nourishing Eye Cream"],
      total: 98.0,
      trackingNumber: "1Z999AA10123456783",
    },
    {
      id: "#12343",
      date: "December 28, 2025",
      status: "Delivered",
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
      items: ["Retinol Night Serum", "Hydrating Vitamin C Serum"],
      total: 112.0,
      trackingNumber: "1Z999AA10123456782",
    },
  ];

  return (
    <PageTransition direction="fade">
      <div className="min-h-screen bg-[#fbf3fe] p-6 py-12">
        <div className="max-w-5xl mx-auto">
          <BackButton />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Package className="w-12 h-12 text-[#8b63d3]" />
              <h1 className="text-5xl text-gray-800">My Orders</h1>
            </div>
            <p className="text-gray-600 text-xl">Track and manage your orders</p>
          </motion.div>

          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard hover>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl text-gray-800">Order {order.id}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${order.statusBg} ${order.statusColor} flex items-center gap-1`}
                        >
                          {order.status === "Delivered" ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Clock className="w-4 h-4" />
                          )}
                          {order.status}
                        </span>
                      </div>
                      <p className="text-gray-600 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl text-gray-800">${order.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">{order.items.length} items</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm text-gray-700 mb-3">Items in this order:</h4>
                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-gray-700 bg-white/30 px-4 py-2 rounded-xl"
                        >
                          <Package className="w-4 h-4 text-[#8b63d3]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {order.trackingNumber && (
                    <div className="bg-purple-50/50 rounded-xl p-4 mb-6 flex items-start gap-3">
                      <Truck className="w-5 h-5 text-[#8b63d3] flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 mb-1">Tracking Number:</p>
                        <p className="text-gray-800 font-mono text-sm">
                          {order.trackingNumber}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => navigate(`/order-details?id=${order.id}`)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {order.status === "In Transit" && (
                      <Button 
                        glow 
                        className="flex-1"
                        onClick={() => navigate(`/track-package?tracking=${order.trackingNumber}&orderId=${order.id}`)}
                      >
                        <Truck className="w-4 h-4 mr-2" />
                        Track Package
                      </Button>
                    )}
                    {order.status === "Delivered" && (
                      <Button glow className="flex-1" onClick={() => navigate("/products")}>
                        <Package className="w-4 h-4 mr-2" />
                        Reorder
                      </Button>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <Button variant="outline" onClick={() => navigate("/products")} className="px-12">
              Browse More Products
            </Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}