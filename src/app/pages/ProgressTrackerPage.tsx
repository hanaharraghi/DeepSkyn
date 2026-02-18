import { useState } from 'react';
import { Camera, TrendingUp, Calendar, Image as ImageIcon, Zap, Sun, Moon, Activity, Droplets, AlertCircle } from 'lucide-react';

interface PhotoEntry {
  id: string;
  date: string;
  time: 'morning' | 'evening';
  imageUrl: string;
  concerns: string[];
  notes: string;
}

interface HealthData {
  sleep: number;
  uvExposure: number;
  waterIntake: number;
  stress: number;
}

export default function ProgressTrackerPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'compare'>('grid');
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [showUpload, setShowUpload] = useState(false);

  const photos: PhotoEntry[] = [
    {
      id: '1',
      date: 'Feb 9, 2026',
      time: 'morning',
      imageUrl: 'https://images.unsplash.com/photo-1614583224978-f05ce51ef5fa?w=400&h=400&fit=crop',
      concerns: ['Texture', 'Glow'],
      notes: 'Skin looking clearer after 1 week of new routine'
    },
    {
      id: '2',
      date: 'Feb 5, 2026',
      time: 'evening',
      imageUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=400&fit=crop',
      concerns: ['Hydration'],
      notes: 'Added hyaluronic acid serum'
    },
    {
      id: '3',
      date: 'Feb 2, 2026',
      time: 'morning',
      imageUrl: 'https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=400&h=400&fit=crop',
      concerns: ['Texture', 'Tone'],
      notes: 'Starting new routine today'
    },
    {
      id: '4',
      date: 'Jan 25, 2026',
      time: 'morning',
      imageUrl: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=400&h=400&fit=crop',
      concerns: ['Redness', 'Dryness'],
      notes: 'Baseline photo before starting DeepSkyn'
    }
  ];

  const healthData: HealthData = {
    sleep: 7.5,
    uvExposure: 3,
    waterIntake: 8,
    stress: 4
  };

  const insights = [
    {
      title: 'Improved Skin Texture',
      description: 'Your skin texture has improved by 25% since starting your routine',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Better Hydration',
      description: 'Drinking 8 glasses of water daily is showing positive effects',
      trend: 'up',
      icon: Droplets,
      color: 'text-blue-600'
    },
    {
      title: 'Sleep Impact',
      description: '7.5 hours of sleep is optimal for skin repair and renewal',
      trend: 'neutral',
      icon: Moon,
      color: 'text-purple-600'
    },
    {
      title: 'UV Protection Needed',
      description: 'Moderate UV exposure detected - increase sunscreen application',
      trend: 'down',
      icon: Sun,
      color: 'text-orange-600'
    }
  ];

  const togglePhotoSelection = (photoId: string) => {
    if (selectedPhotos.includes(photoId)) {
      setSelectedPhotos(selectedPhotos.filter(id => id !== photoId));
    } else if (selectedPhotos.length < 2) {
      setSelectedPhotos([...selectedPhotos, photoId]);
    }
  };

  const handleUploadPhoto = () => {
    setShowUpload(true);
    setTimeout(() => {
      alert('Photo uploaded successfully! Your progress has been recorded.');
      setShowUpload(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbf3fe] to-[#ece2f9] pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b63d3] to-[#6b46b8] mb-4 shadow-lg">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Progress Tracker
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your skin transformation with photos and smart insights powered by your health data.
          </p>
        </div>

        {/* Upload Button */}
        <div className="mb-8">
          <button
            onClick={handleUploadPhoto}
            disabled={showUpload}
            className="w-full backdrop-blur-lg bg-gradient-to-r from-[#8b63d3] to-[#6b46b8] text-white py-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="flex items-center justify-center gap-3">
              {showUpload ? (
                <>
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-xl font-semibold">Uploading Photo...</span>
                </>
              ) : (
                <>
                  <Camera className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span className="text-xl font-semibold">Take Progress Photo</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => {
              setViewMode('grid');
              setSelectedPhotos([]);
            }}
            className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
              viewMode === 'grid'
                ? 'bg-gradient-to-r from-[#8b63d3] to-[#6b46b8] text-white shadow-lg'
                : 'bg-white/70 text-gray-700 hover:bg-white/90 border border-white/50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Timeline View
            </div>
          </button>
          <button
            onClick={() => setViewMode('compare')}
            className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
              viewMode === 'compare'
                ? 'bg-gradient-to-r from-[#8b63d3] to-[#6b46b8] text-white shadow-lg'
                : 'bg-white/70 text-gray-700 hover:bg-white/90 border border-white/50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Compare Photos
            </div>
          </button>
        </div>

        {/* Health Data Integration */}
        <div className="backdrop-blur-lg bg-white/80 rounded-3xl shadow-xl p-8 border border-white/50 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#8b63d3]" />
            Health & Lifestyle Data
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg">
                <Moon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{healthData.sleep}h</div>
              <div className="text-sm text-gray-600">Avg Sleep</div>
              <div className="mt-2 text-xs text-green-600 font-semibold">Optimal ✓</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <Sun className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{healthData.uvExposure}/10</div>
              <div className="text-sm text-gray-600">UV Exposure</div>
              <div className="mt-2 text-xs text-orange-600 font-semibold">Moderate</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{healthData.waterIntake}</div>
              <div className="text-sm text-gray-600">Glasses/Day</div>
              <div className="mt-2 text-xs text-green-600 font-semibold">Excellent ✓</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{healthData.stress}/10</div>
              <div className="text-sm text-gray-600">Stress Level</div>
              <div className="mt-2 text-xs text-yellow-600 font-semibold">Manageable</div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="backdrop-blur-lg bg-white/80 rounded-3xl shadow-xl p-8 border border-white/50 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#8b63d3]" />
            Smart Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="flex gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${
                      insight.trend === 'up' ? 'from-green-400 to-emerald-500' :
                      insight.trend === 'down' ? 'from-orange-400 to-red-500' :
                      'from-blue-400 to-cyan-500'
                    } flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{insight.title}</h3>
                      <p className="text-sm text-gray-600">{insight.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline View */}
        {viewMode === 'grid' && (
          <div className="backdrop-blur-lg bg-white/80 rounded-3xl shadow-xl p-8 border border-white/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#8b63d3]" />
              Your Journey
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group cursor-pointer"
                  onClick={() => togglePhotoSelection(photo.id)}
                >
                  <div className={`relative rounded-2xl overflow-hidden shadow-lg transition-all ${
                    selectedPhotos.includes(photo.id)
                      ? 'ring-4 ring-[#8b63d3] scale-[1.02]'
                      : 'hover:shadow-xl hover:scale-[1.02]'
                  }`}>
                    <img
                      src={photo.imageUrl}
                      alt={`Progress photo from ${photo.date}`}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-lg ${
                        photo.time === 'morning'
                          ? 'bg-amber-400/90 text-white'
                          : 'bg-indigo-600/90 text-white'
                      } shadow-lg flex items-center gap-1`}>
                        {photo.time === 'morning' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                        {photo.time}
                      </span>
                    </div>
                    {selectedPhotos.includes(photo.id) && (
                      <div className="absolute inset-0 bg-[#8b63d3]/20 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#8b63d3] flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">
                            {selectedPhotos.indexOf(photo.id) + 1}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900">{photo.date}</span>
                      <Calendar className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {photo.concerns.map((concern, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-lg bg-[#8b63d3]/10 text-[#8b63d3] text-xs font-medium"
                        >
                          {concern}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{photo.notes}</p>
                  </div>
                </div>
              ))}
            </div>

            {selectedPhotos.length > 0 && (
              <div className="mt-8 p-4 rounded-2xl bg-[#8b63d3]/10 border border-[#8b63d3]/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-[#8b63d3]" />
                    <span className="font-semibold text-gray-900">
                      {selectedPhotos.length} photo{selectedPhotos.length > 1 ? 's' : ''} selected
                    </span>
                  </div>
                  {selectedPhotos.length === 2 && (
                    <button
                      onClick={() => setViewMode('compare')}
                      className="px-6 py-2 bg-gradient-to-r from-[#8b63d3] to-[#6b46b8] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Compare Photos
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {selectedPhotos.length < 2
                    ? `Select ${2 - selectedPhotos.length} more photo${selectedPhotos.length === 1 ? '' : 's'} to compare`
                    : 'Click "Compare Photos" to see your progress side-by-side'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Compare View */}
        {viewMode === 'compare' && (
          <div className="backdrop-blur-lg bg-white/80 rounded-3xl shadow-xl p-8 border border-white/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Side-by-Side Comparison
            </h2>
            
            {selectedPhotos.length === 2 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {selectedPhotos.map((photoId, index) => {
                    const photo = photos.find(p => p.id === photoId)!;
                    return (
                      <div key={photoId} className="space-y-4">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                          <img
                            src={photo.imageUrl}
                            alt={`Comparison photo ${index + 1}`}
                            className="w-full aspect-square object-cover"
                          />
                          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                            <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur text-gray-900 font-bold shadow-lg">
                              {index === 0 ? 'Before' : 'After'}
                            </span>
                            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-lg ${
                              photo.time === 'morning'
                                ? 'bg-amber-400/90 text-white'
                                : 'bg-indigo-600/90 text-white'
                            } shadow-lg flex items-center gap-1`}>
                              {photo.time === 'morning' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                              {photo.time}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-gray-50">
                          <div className="font-semibold text-gray-900 mb-2">{photo.date}</div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {photo.concerns.map((concern, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 rounded-lg bg-[#8b63d3]/10 text-[#8b63d3] text-sm font-medium"
                              >
                                {concern}
                              </span>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">{photo.notes}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Comparison Insights */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Progress Detected!</h3>
                      <p className="text-gray-700 mb-3">
                        Comparing these photos shows visible improvement in skin texture and overall glow. 
                        Your consistent routine is paying off!
                      </p>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Skin texture improved by 25%</li>
                        <li>• Hydration levels increased</li>
                        <li>• More even skin tone</li>
                        <li>• Reduced redness</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedPhotos([]);
                    setViewMode('grid');
                  }}
                  className="mt-6 w-full py-4 rounded-xl border-2 border-[#8b63d3] text-[#8b63d3] font-semibold hover:bg-[#8b63d3]/10 transition-all"
                >
                  Select Different Photos
                </button>
              </>
            ) : (
              <div className="text-center py-12">
                <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Select 2 Photos to Compare
                </h3>
                <p className="text-gray-600 mb-6">
                  Go back to Timeline View and select two photos to see your progress side-by-side.
                </p>
                <button
                  onClick={() => setViewMode('grid')}
                  className="px-8 py-3 bg-gradient-to-r from-[#8b63d3] to-[#6b46b8] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Back to Timeline
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
