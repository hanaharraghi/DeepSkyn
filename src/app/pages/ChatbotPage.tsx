import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/app/components/Button";
import { GlassCard } from "@/app/components/GlassCard";
import { PageTransition } from "@/app/components/PageTransition";
import { BackButton } from "@/app/components/BackButton";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, User, Clock, ShoppingBag, Calendar, Heart } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  suggestions?: string[];
}

export function ChatbotPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI skincare assistant. Based on your recent skin analysis, I can help you with personalized advice, product recommendations, and routine adjustments. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
      suggestions: [
        "Tell me about my skin analysis results",
        "What products should I use?",
        "How can I improve my routine?",
        "I have a skin concern",
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { text: "View my routine", icon: Calendar, route: "/routine" },
    { text: "Browse products", icon: ShoppingBag, route: "/products" },
    { text: "Check my progress", icon: Heart, route: "/results" },
  ];

  const aiResponses: { [key: string]: { text: string; suggestions?: string[] } } = {
    "tell me about my skin analysis results": {
      text: "Based on your recent analysis, your skin is combination type with moderate hydration levels at 78%. We detected some concerns with dark spots and early signs of aging. Your skin age is currently 26 years, which is great! Would you like specific recommendations for addressing any particular concern?",
      suggestions: [
        "How to treat dark spots?",
        "Anti-aging recommendations",
        "Hydration tips",
      ],
    },
    "what products should i use": {
      text: "Based on your skin profile, I recommend:\n\n1. Hydrating Vitamin C Serum (Morning) - For brightening and dark spots\n2. Gentle Foaming Cleanser (Morning & Evening) - For gentle cleansing\n3. Retinol Night Serum (Evening) - For anti-aging and cell renewal\n4. SPF 50 Sun Protection (Morning) - Essential UV protection\n\nWould you like to see these products or get a custom bundle?",
      suggestions: ["Show me the products", "Create a custom bundle", "Alternative options"],
    },
    "how can i improve my routine": {
      text: "Great question! Here are some tips to enhance your routine:\n\n✨ Apply products from thinnest to thickest consistency\n💧 Wait 1-2 minutes between each product layer\n🌙 Use retinol products only at night\n☀️ Never skip sunscreen during the day\n💆‍♀️ Gently pat products instead of rubbing\n\nConsistency is key! Try to maintain your routine for at least 30 days to see results.",
      suggestions: ["Set routine reminders", "View my current routine", "Track my progress"],
    },
    "i have a skin concern": {
      text: "I'm here to help! What specific concern are you experiencing? Common issues I can help with include acne, dryness, sensitivity, dark spots, fine lines, and redness. Please describe your concern in detail.",
      suggestions: ["Acne breakout", "Dry patches", "Redness or irritation", "Dark circles"],
    },
    default: {
      text: "That's a great question! Based on your skin profile and current routine, I'd be happy to provide personalized advice. Could you provide more details about what you're looking for?",
      suggestions: [
        "Product recommendations",
        "Routine adjustments",
        "Ingredient information",
      ],
    },
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const messageKey = messageText.toLowerCase();
      const response =
        aiResponses[messageKey] || aiResponses.default;

      const aiMessage: Message = {
        id: messages.length + 2,
        text: response.text,
        sender: "ai",
        timestamp: new Date(),
        suggestions: response.suggestions,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8b63d3] to-[#b89de6] flex items-center justify-center pulse-glow">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl text-gray-800">AI Skincare Assistant</h1>
            </div>
            <p className="text-gray-600 text-xl">
              Get personalized advice based on your skin analysis
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid md:grid-cols-3 gap-4 mb-8"
          >
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                onClick={() => navigate(action.route)}
                className="p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-purple-200 hover:bg-white/80 hover:border-[#8b63d3] transition-all flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b63d3] to-[#b89de6] flex items-center justify-center flex-shrink-0">
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700">{action.text}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Chat Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <GlassCard className="h-[600px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`flex gap-3 ${
                        message.sender === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === "ai"
                            ? "bg-gradient-to-br from-[#8b63d3] to-[#b89de6] pulse-glow"
                            : "bg-purple-100"
                        }`}
                      >
                        {message.sender === "ai" ? (
                          <Sparkles className="w-5 h-5 text-white" />
                        ) : (
                          <User className="w-5 h-5 text-[#8b63d3]" />
                        )}
                      </div>

                      {/* Message Content */}
                      <div
                        className={`flex-1 max-w-[80%] ${
                          message.sender === "user" ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`rounded-2xl px-5 py-3 ${
                            message.sender === "ai"
                              ? "bg-white/50 text-gray-800"
                              : "bg-gradient-to-r from-[#8b63d3] to-[#b89de6] text-white"
                          }`}
                        >
                          <p className="whitespace-pre-line">{message.text}</p>
                        </div>

                        <div
                          className={`flex items-center gap-2 mt-1 px-2 text-xs text-gray-500 ${
                            message.sender === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>

                        {/* Suggestions */}
                        {message.suggestions && message.sender === "ai" && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {message.suggestions.map((suggestion, i) => (
                              <motion.button
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                onClick={() => handleSendMessage(suggestion)}
                                className="px-4 py-2 rounded-full bg-purple-100 text-[#8b63d3] hover:bg-purple-200 transition-colors text-sm"
                              >
                                {suggestion}
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b63d3] to-[#b89de6] flex items-center justify-center pulse-glow">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white/50 rounded-2xl px-5 py-3">
                      <div className="flex gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 rounded-full bg-[#8b63d3]"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 rounded-full bg-[#8b63d3]"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 rounded-full bg-[#8b63d3]"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-purple-200 pt-6">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your skincare..."
                    className="flex-1 px-5 py-3 rounded-2xl bg-white/50 backdrop-blur-sm border border-purple-200 focus:border-[#8b63d3] focus:outline-none focus:ring-2 focus:ring-[#8b63d3]/20 transition-all"
                  />
                  <Button
                    glow
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim()}
                    className="px-6"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  This AI assistant uses your skin analysis data to provide personalized
                  recommendations
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
