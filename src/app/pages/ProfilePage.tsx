import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { GlassCard } from "@/app/components/GlassCard";
import { PageTransition } from "@/app/components/PageTransition";
import { BackButton } from "@/app/components/BackButton";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  Bell,
  Heart,
  AlertCircle,
  Save,
  Camera,
  Lock,
  Eye,
  EyeOff,
  Key,
  Database,
  CheckCircle,
  AlertTriangle,
  Trash2,
  ShieldCheck,
  FileKey,
  Server,
  Globe,
} from "lucide-react";

export function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"personal" | "skin" | "security" | "notifications">(
    "personal"
  );
  const [saved, setSaved] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    birthday: "1995-06-15",
    address: "123 Main Street, New York, NY 10001",
  });

  const [skinPreferences, setSkinPreferences] = useState({
    skinType: "Combination",
    concerns: ["Acne", "Dark Spots", "Anti-aging"],
    allergies: "Fragrances, Parabens",
    sensitivity: "Medium",
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation === "DELETE") {
      alert("Account deletion initiated. This is a demo.");
      setShowDeleteModal(false);
      navigate("/");
    }
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "skin", label: "Skin Preferences", icon: Heart },
    { id: "security", label: "Security & Privacy", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ] as const;

  const availableConcerns = [
    "Acne",
    "Dark Spots",
    "Fine Lines",
    "Wrinkles",
    "Dehydration",
    "Redness",
    "Large Pores",
    "Anti-aging",
    "Uneven Tone",
    "Dullness",
  ];

  return (
    <PageTransition direction="fade">
      <div className="min-h-screen bg-[#fbf3fe] dark:bg-[#1a0f2e] p-6 py-12">
        <div className="max-w-5xl mx-auto">
          <BackButton />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl text-gray-800 mb-4">Account Settings</h1>
            <p className="text-gray-600 text-xl">Manage your profile and preferences</p>
          </motion.div>

          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <GlassCard className="flex items-center gap-6">
              <div className="relative">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8b63d3] to-[#b89de6] flex items-center justify-center text-white text-3xl font-bold">
                    SJ
                  </div>
                )}
                <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <Camera className="w-4 h-4 text-[#8b63d3]" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl text-gray-800 mb-1 font-bold">
                  {personalInfo.fullName}
                </h3>
                <p className="text-gray-600">{personalInfo.email}</p>
              </div>
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                View Dashboard
              </Button>
            </GlassCard>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <GlassCard className="p-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center gap-2 py-4 px-2 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-[#8b63d3] to-[#b89de6] text-white shadow-lg"
                        : "text-gray-700 hover:bg-white/50"
                    }`}
                  >
                    <tab.icon className="w-6 h-6" />
                    <span className="text-sm text-center font-semibold">{tab.label}</span>
                  </button>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard>
              {/* Personal Info Tab */}
              {activeTab === "personal" && (
                <div>
                  <h3 className="text-2xl text-gray-800 mb-6 flex items-center gap-2 font-bold">
                    <User className="w-6 h-6 text-[#8b63d3]" />
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      type="text"
                      value={personalInfo.fullName}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, fullName: e.target.value })
                      }
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Email"
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) =>
                          setPersonalInfo({ ...personalInfo, email: e.target.value })
                        }
                      />
                      <Input
                        label="Phone"
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) =>
                          setPersonalInfo({ ...personalInfo, phone: e.target.value })
                        }
                      />
                    </div>
                    <Input
                      label="Birthday"
                      type="date"
                      value={personalInfo.birthday}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, birthday: e.target.value })
                      }
                    />
                    <div className="relative">
                      <label className="block text-sm mb-2 text-gray-700 font-semibold">
                        Address
                      </label>
                      <textarea
                        value={personalInfo.address}
                        onChange={(e) =>
                          setPersonalInfo({ ...personalInfo, address: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-purple-200 focus:border-[#8b63d3] focus:outline-none focus:ring-2 focus:ring-[#8b63d3]/20 transition-all resize-none"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Skin Preferences Tab */}
              {activeTab === "skin" && (
                <div>
                  <h3 className="text-2xl text-gray-800 mb-6 flex items-center gap-2 font-bold">
                    <Heart className="w-6 h-6 text-[#8b63d3]" />
                    Skin Preferences & Allergies
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm mb-2 text-gray-700 font-semibold">
                        Skin Type
                      </label>
                      <select
                        value={skinPreferences.skinType}
                        onChange={(e) =>
                          setSkinPreferences({ ...skinPreferences, skinType: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-purple-200 focus:border-[#8b63d3] focus:outline-none focus:ring-2 focus:ring-[#8b63d3]/20 transition-all"
                      >
                        <option>Normal</option>
                        <option>Dry</option>
                        <option>Oily</option>
                        <option>Combination</option>
                        <option>Sensitive</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm mb-3 text-gray-700 font-semibold">
                        Skin Concerns (Select all that apply)
                      </label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {availableConcerns.map((concern) => (
                          <label
                            key={concern}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/30 hover:bg-white/50 cursor-pointer transition-all"
                          >
                            <input
                              type="checkbox"
                              checked={skinPreferences.concerns.includes(concern)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSkinPreferences({
                                    ...skinPreferences,
                                    concerns: [...skinPreferences.concerns, concern],
                                  });
                                } else {
                                  setSkinPreferences({
                                    ...skinPreferences,
                                    concerns: skinPreferences.concerns.filter((c) => c !== concern),
                                  });
                                }
                              }}
                              className="w-4 h-4 text-[#8b63d3] rounded focus:ring-[#8b63d3]"
                            />
                            <span className="text-gray-700">{concern}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm mb-2 text-gray-700 font-semibold">
                        Allergies & Sensitivities
                      </label>
                      <textarea
                        value={skinPreferences.allergies}
                        onChange={(e) =>
                          setSkinPreferences({ ...skinPreferences, allergies: e.target.value })
                        }
                        placeholder="List any ingredients you're allergic to..."
                        className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-purple-200 focus:border-[#8b63d3] focus:outline-none focus:ring-2 focus:ring-[#8b63d3]/20 transition-all resize-none"
                        rows={3}
                      />
                    </div>

                    <div className="bg-purple-50/50 rounded-xl p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-[#8b63d3] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        These preferences help our AI recommend products tailored to your unique
                        skin needs and avoid ingredients that may cause irritation.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Security & Privacy Tab */}
              {activeTab === "security" && (
                <div className="space-y-8">
                  {/* Password Change Section */}
                  <div>
                    <h3 className="text-2xl text-gray-800 mb-6 flex items-center gap-2 font-bold">
                      <Shield className="w-6 h-6 text-[#8b63d3]" />
                      Account Security
                    </h3>
                    <div className="space-y-4">
                      <Input
                        label="Current Password"
                        type="password"
                        placeholder="Enter current password"
                        value={securitySettings.currentPassword}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            currentPassword: e.target.value,
                          })
                        }
                      />
                      <Input
                        label="New Password"
                        type="password"
                        placeholder="Enter new password"
                        value={securitySettings.newPassword}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            newPassword: e.target.value,
                          })
                        }
                      />
                      <Input
                        label="Confirm New Password"
                        type="password"
                        placeholder="Confirm new password"
                        value={securitySettings.confirmPassword}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            confirmPassword: e.target.value,
                          })
                        }
                      />

                      <div className="bg-green-50 rounded-xl p-4 flex items-start gap-3 mt-6">
                        <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-700">
                          <p className="mb-2 font-semibold">
                            <strong>Password Requirements:</strong>
                          </p>
                          <ul className="list-disc list-inside space-y-1">
                            <li>At least 8 characters long</li>
                            <li>Contains uppercase and lowercase letters</li>
                            <li>Includes at least one number</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Encryption Info */}
                  <div className="border-t border-purple-200 pt-8">
                    <h3 className="text-xl text-gray-800 mb-4 flex items-center gap-2 font-bold">
                      <Lock className="w-5 h-5 text-[#8b63d3]" />
                      Data Encryption & Security
                    </h3>
                    <div className="space-y-4">
                      <GlassCard className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                            <FileKey className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 mb-2">
                              AES-256 Encryption
                            </h4>
                            <p className="text-sm text-gray-600 mb-3">
                              All your personal data, skin analysis results, and facial images
                              are encrypted using military-grade AES-256 encryption both in
                              transit and at rest.
                            </p>
                            <div className="flex items-center gap-2 text-emerald-600">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-xs font-semibold">
                                Your data is fully encrypted
                              </span>
                            </div>
                          </div>
                        </div>
                      </GlassCard>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-white/50 border border-purple-200">
                          <div className="flex items-center gap-3 mb-2">
                            <Server className="w-5 h-5 text-[#8b63d3]" />
                            <h5 className="font-semibold text-gray-800">Secure Storage</h5>
                          </div>
                          <p className="text-sm text-gray-600">
                            Data stored on secure, HIPAA-compliant servers with regular
                            security audits
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/50 border border-purple-200">
                          <div className="flex items-center gap-3 mb-2">
                            <Globe className="w-5 h-5 text-[#8b63d3]" />
                            <h5 className="font-semibold text-gray-800">SSL/TLS Protection</h5>
                          </div>
                          <p className="text-sm text-gray-600">
                            All connections use SSL/TLS encryption to protect data in transit
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Assurance */}
                  <div className="border-t border-purple-200 pt-8">
                    <h3 className="text-xl text-gray-800 mb-4 flex items-center gap-2 font-bold">
                      <ShieldCheck className="w-5 h-5 text-[#8b63d3]" />
                      Privacy Assurance
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          icon: CheckCircle,
                          text: "We never sell your personal data to third parties",
                          color: "text-emerald-600",
                        },
                        {
                          icon: CheckCircle,
                          text: "Your facial images are used only for AI analysis and are never shared",
                          color: "text-emerald-600",
                        },
                        {
                          icon: CheckCircle,
                          text: "You have full control over your data and can delete it anytime",
                          color: "text-emerald-600",
                        },
                        {
                          icon: CheckCircle,
                          text: "We comply with GDPR, CCPA, and international privacy laws",
                          color: "text-emerald-600",
                        },
                        {
                          icon: CheckCircle,
                          text: "Anonymous analytics only - we don't track individual browsing",
                          color: "text-emerald-600",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50"
                        >
                          <item.icon className={`w-5 h-5 ${item.color} flex-shrink-0 mt-0.5`} />
                          <p className="text-sm text-gray-700">{item.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <div className="flex items-start gap-3">
                        <Database className="w-5 h-5 text-[#8b63d3] flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-semibold text-gray-800 mb-2">
                            What Data We Collect
                          </h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Account information (name, email, preferences)</li>
                            <li>• Facial images for skin analysis (encrypted)</li>
                            <li>• Skin health data and progress tracking</li>
                            <li>• Product purchase history</li>
                            <li>• App usage analytics (anonymous)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delete Account Section */}
                  <div className="border-t border-red-200 pt-8">
                    <h3 className="text-xl text-gray-800 mb-4 flex items-center gap-2 font-bold">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      Danger Zone
                    </h3>
                    <GlassCard className="bg-red-50/50 border-2 border-red-200">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 mb-2">Delete My Account</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Permanently delete your DeepSkyn account and all associated data.
                            This action cannot be undone.
                          </p>
                          <p className="text-xs text-gray-500">
                            All your skin analysis results, facial images, preferences, and
                            order history will be permanently removed from our servers.
                          </p>
                        </div>
                        <Button
                          onClick={() => setShowDeleteModal(true)}
                          className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 whitespace-nowrap"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Account
                        </Button>
                      </div>
                    </GlassCard>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div>
                  <h3 className="text-2xl text-gray-800 mb-6 flex items-center gap-2 font-bold">
                    <Bell className="w-6 h-6 text-[#8b63d3]" />
                    Notification Preferences
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Routine Reminders",
                        description: "Get reminders for your daily skincare routine",
                        checked: true,
                      },
                      {
                        title: "Product Recommendations",
                        description: "Receive personalized product suggestions",
                        checked: true,
                      },
                      {
                        title: "Order Updates",
                        description: "Track your orders and shipping status",
                        checked: true,
                      },
                      {
                        title: "Promotional Emails",
                        description: "Special offers and exclusive discounts",
                        checked: false,
                      },
                      {
                        title: "Skin Progress Reports",
                        description: "Weekly insights about your skin improvement",
                        checked: true,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between p-4 rounded-xl bg-white/30"
                      >
                        <div className="flex-1">
                          <p className="text-gray-800 mb-1 font-semibold">{item.title}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer ml-4">
                          <input
                            type="checkbox"
                            defaultChecked={item.checked}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8b63d3]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8b63d3]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 flex items-center justify-between">
                <AnimatePresence>
                  {saved && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-green-600"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-semibold">Changes saved successfully!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <Button glow onClick={handleSave} className="ml-auto flex items-center gap-2">
                  <Save className="w-5 h-5" />
                  Save Changes
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
            >
              <GlassCard className="bg-white border-2 border-red-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Delete Account</h3>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700 mb-4">
                    Are you sure you want to delete your account? This action is{" "}
                    <strong>permanent</strong> and cannot be undone.
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-red-800 font-semibold mb-2">
                      The following data will be permanently deleted:
                    </p>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• All facial images and skin analysis results</li>
                      <li>• Personal information and preferences</li>
                      <li>• Order history and purchase records</li>
                      <li>• Progress tracking and reports</li>
                      <li>• Account access and login credentials</li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    To confirm deletion, please type <strong>DELETE</strong> in the box below:
                  </p>
                  <Input
                    type="text"
                    placeholder="Type DELETE to confirm"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    className="font-mono"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeleteConfirmation("");
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirmation !== "DELETE"}
                    className={`flex-1 ${
                      deleteConfirmation === "DELETE"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gray-400 cursor-not-allowed"
                    } text-white`}
                  >
                    Delete Permanently
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}