import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/app/components/Button";
import { GlassCard } from "@/app/components/GlassCard";
import { ProgressIndicator } from "@/app/components/ProgressIndicator";
import { PageTransition } from "@/app/components/PageTransition";
import { motion, AnimatePresence } from "motion/react";
import { Upload, Camera, AlertCircle, X, Check } from "lucide-react";

export function UploadPage() {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const MAX_FILES = 5;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const remainingSlots = MAX_FILES - files.length;
      const filesToAdd = newFiles.slice(0, remainingSlots);
      setFiles([...files, ...filesToAdd]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleAnalyze = () => {
    setUploading(true);
    // Simulate upload and analysis
    setTimeout(() => {
      navigate("/results");
    }, 3000);
  };

  return (
    <PageTransition direction="left">
      <div className="min-h-screen bg-[#fbf3fe] flex items-center justify-center p-6 pt-24">
        <div className="w-full max-w-4xl">
          <ProgressIndicator currentStep={3} totalSteps={4} />

          <GlassCard>
            <div className="text-center mb-8">
              <h2 className="text-4xl text-gray-800 dark:text-white mb-2">Upload Your Photos</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Upload up to 5 clear photos of your face from different angles for comprehensive AI analysis
              </p>
            </div>

            <div className="space-y-6">
              {/* Photo Counter */}
              <div className="flex items-center justify-between px-4 py-3 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Photos uploaded: <strong>{files.length} / {MAX_FILES}</strong>
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: MAX_FILES }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index < files.length
                          ? "bg-[#8b63d3] scale-110"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Upload Zone */}
              <motion.label
                className={`block border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${
                  files.length >= MAX_FILES
                    ? "border-gray-300 bg-gray-50/50 cursor-not-allowed opacity-60"
                    : "border-purple-300 hover:border-[#8b63d3] hover:bg-purple-50/30 dark:border-purple-700 dark:hover:border-[#8b63d3]"
                }`}
                whileHover={files.length < MAX_FILES ? { scale: 1.01 } : {}}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={uploading || files.length >= MAX_FILES}
                />
                <motion.div
                  className="inline-block mb-4"
                  animate={files.length < MAX_FILES && !uploading ? { y: [0, -10, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {uploading ? (
                    <div className="w-16 h-16 rounded-full border-4 border-[#8b63d3] border-t-transparent animate-spin" />
                  ) : files.length >= MAX_FILES ? (
                    <Check className="w-16 h-16 text-[#8b63d3]" />
                  ) : (
                    <Upload className="w-16 h-16 text-[#8b63d3] pulse-glow" />
                  )}
                </motion.div>
                <div className="text-gray-700 dark:text-gray-300">
                  {uploading ? (
                    <div>
                      <p className="text-xl mb-2">Analyzing your skin...</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">This may take a few moments</p>
                    </div>
                  ) : files.length >= MAX_FILES ? (
                    <div>
                      <p className="text-xl mb-2">Maximum photos uploaded</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Remove photos to upload new ones</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xl mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        PNG, JPG up to 10MB each ({MAX_FILES - files.length} remaining)
                      </p>
                    </div>
                  )}
                </div>
              </motion.label>

              {/* Preview Grid */}
              {files.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <AnimatePresence mode="popLayout">
                    {files.map((file, index) => (
                      <motion.div
                        key={`${file.name}-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="relative group"
                      >
                        <div className="aspect-square rounded-2xl overflow-hidden bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-200 dark:border-purple-800">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          disabled={uploading}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label={`Remove photo ${index + 1}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
                          Photo {index + 1}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Tips */}
              <GlassCard className="bg-purple-50/50 dark:bg-purple-900/20 p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#8b63d3] mt-1 flex-shrink-0" />
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <p className="mb-3 font-semibold">📸 For best results, upload photos from different angles:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                        <li>Front view (face forward)</li>
                        <li>Left side profile</li>
                        <li>Right side profile</li>
                      </ul>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                        <li>Use natural lighting</li>
                        <li>Remove makeup if possible</li>
                        <li>Ensure photos are clear and focused</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <Button
                glow
                className="w-full"
                onClick={handleAnalyze}
                disabled={files.length === 0 || uploading}
              >
                {uploading ? "Analyzing..." : `Analyze My Skin ${files.length > 0 ? `(${files.length} photo${files.length > 1 ? 's' : ''})` : ''} ✨`}
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  );
}
