import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Clock, Sun, Moon, Sparkles, Plus, Trash2, Check } from 'lucide-react';

interface Reminder {
  id: string;
  type: 'morning' | 'evening' | 'special';
  time: string;
  title: string;
  description: string;
  enabled: boolean;
  days: string[];
}

export default function RemindersPage() {
  const navigate = useNavigate();
  
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      type: 'morning',
      time: '08:00',
      title: 'Morning Routine',
      description: 'Cleanser → Vitamin C Serum → Moisturizer → Sunscreen',
      enabled: true,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    {
      id: '2',
      type: 'evening',
      time: '21:00',
      title: 'Evening Routine',
      description: 'Cleanser → Retinol Serum → Night Cream',
      enabled: true,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    {
      id: '3',
      type: 'special',
      time: '12:00',
      title: 'Reapply Sunscreen',
      description: 'Protect your skin from midday sun',
      enabled: true,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    {
      id: '4',
      type: 'special',
      time: '20:00',
      title: 'Face Mask Night',
      description: 'Apply your hydrating face mask',
      enabled: false,
      days: ['Wed', 'Sat']
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    type: 'morning',
    time: '08:00',
    title: '',
    description: '',
    enabled: true,
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  });

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const toggleDay = (day: string) => {
    const days = newReminder.days || [];
    setNewReminder({
      ...newReminder,
      days: days.includes(day) 
        ? days.filter(d => d !== day)
        : [...days, day]
    });
  };

  const addReminder = () => {
    if (!newReminder.title || !newReminder.time) return;
    
    const reminder: Reminder = {
      id: Date.now().toString(),
      type: newReminder.type || 'morning',
      time: newReminder.time || '08:00',
      title: newReminder.title,
      description: newReminder.description || '',
      enabled: true,
      days: newReminder.days || []
    };
    
    setReminders([...reminders, reminder]);
    setShowAddForm(false);
    setNewReminder({
      type: 'morning',
      time: '08:00',
      title: '',
      description: '',
      enabled: true,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    });
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'morning': return <Sun className="w-5 h-5" />;
      case 'evening': return <Moon className="w-5 h-5" />;
      case 'special': return <Sparkles className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'morning': return 'from-amber-400 to-orange-500';
      case 'evening': return 'from-indigo-500 to-purple-600';
      case 'special': return 'from-pink-400 to-rose-500';
      default: return 'from-purple-400 to-purple-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbf3fe] to-[#ece2f9] pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b63d3] to-[#6b46b8] mb-4 shadow-lg">
            <Bell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Routine Reminders
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Never miss a step in your skincare journey. Set custom reminders for your daily routines and special treatments.
          </p>
        </div>

        {/* Stats Card */}
        <div className="backdrop-blur-lg bg-white/70 rounded-3xl shadow-xl p-6 mb-8 border border-white/50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-[#8b63d3] mb-1">
                {reminders.filter(r => r.enabled).length}
              </div>
              <div className="text-sm text-gray-600">Active Reminders</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#8b63d3] mb-1">
                {reminders.filter(r => r.type === 'morning' || r.type === 'evening').filter(r => r.enabled).length}
              </div>
              <div className="text-sm text-gray-600">Daily Routines</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#8b63d3] mb-1">
                {reminders.filter(r => r.type === 'special').filter(r => r.enabled).length}
              </div>
              <div className="text-sm text-gray-600">Special Care</div>
            </div>
          </div>
        </div>

        {/* Reminders List */}
        <div className="space-y-4 mb-8">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`backdrop-blur-lg bg-white/70 rounded-2xl shadow-lg border border-white/50 overflow-hidden transition-all duration-300 ${
                reminder.enabled ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Type Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${getTypeColor(reminder.type)} flex items-center justify-center text-white shadow-lg`}>
                    {getTypeIcon(reminder.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {reminder.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {reminder.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => toggleReminder(reminder.id)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            reminder.enabled ? 'bg-[#8b63d3]' : 'bg-gray-300'
                          }`}
                          aria-label={reminder.enabled ? 'Disable reminder' : 'Enable reminder'}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              reminder.enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => deleteReminder(reminder.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Delete reminder"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>

                    {/* Time and Days */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{reminder.time}</span>
                      </div>
                      <div className="flex gap-1">
                        {weekDays.map(day => (
                          <span
                            key={day}
                            className={`text-xs px-2 py-1 rounded-lg font-medium ${
                              reminder.days.includes(day)
                                ? 'bg-[#8b63d3] text-white'
                                : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Reminder Button */}
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full backdrop-blur-lg bg-white/70 rounded-2xl shadow-lg border-2 border-dashed border-[#8b63d3]/30 p-8 hover:border-[#8b63d3]/60 hover:bg-white/80 transition-all duration-300 group"
          >
            <div className="flex items-center justify-center gap-3 text-[#8b63d3]">
              <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-semibold">Add New Reminder</span>
            </div>
          </button>
        )}

        {/* Add Reminder Form */}
        {showAddForm && (
          <div className="backdrop-blur-lg bg-white/80 rounded-2xl shadow-xl border border-white/50 p-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Create New Reminder
            </h3>

            <div className="space-y-4">
              {/* Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reminder Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['morning', 'evening', 'special'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewReminder({ ...newReminder, type })}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        newReminder.type === type
                          ? 'border-[#8b63d3] bg-[#8b63d3]/10'
                          : 'border-gray-200 hover:border-[#8b63d3]/50'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getTypeColor(type)} flex items-center justify-center text-white`}>
                          {getTypeIcon(type)}
                        </div>
                        <span className="text-sm font-medium capitalize">{type}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                  placeholder="e.g., Morning Vitamin C Routine"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#8b63d3] focus:ring-2 focus:ring-[#8b63d3]/20 outline-none transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newReminder.description}
                  onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                  placeholder="e.g., Apply Vitamin C serum after cleansing"
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#8b63d3] focus:ring-2 focus:ring-[#8b63d3]/20 outline-none transition-all resize-none"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#8b63d3] focus:ring-2 focus:ring-[#8b63d3]/20 outline-none transition-all"
                />
              </div>

              {/* Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repeat on
                </label>
                <div className="flex gap-2">
                  {weekDays.map(day => (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        newReminder.days?.includes(day)
                          ? 'bg-[#8b63d3] text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={addReminder}
                  disabled={!newReminder.title || !newReminder.time}
                  className="flex-1 bg-gradient-to-r from-[#8b63d3] to-[#6b46b8] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Add Reminder
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-8 backdrop-blur-lg bg-gradient-to-br from-[#8b63d3]/10 to-[#6b46b8]/10 rounded-2xl p-6 border border-[#8b63d3]/20">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#8b63d3]/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#8b63d3]" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Stay Consistent with Your Routine</h4>
              <p className="text-sm text-gray-600">
                Enable notifications in your device settings to receive reminders. Consistency is key to achieving your skincare goals!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
