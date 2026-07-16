import Link from 'next/link';
import { Calendar, BookOpen, Target, FileText, Clock, TrendingUp } from 'lucide-react';

export default function Home() {
  const examDate = new Date('2026-05-16');
  const today = new Date();
  const daysRemaining = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const subjects = [
    { name: 'Paper 1: Accounting', color: 'bg-blue-500', progress: 0 },
    { name: 'Paper 2: Business Law', color: 'bg-purple-500', progress: 0 },
    { name: 'Paper 3: Quantitative Aptitude', color: 'bg-green-500', progress: 0 },
    { name: 'Paper 4: Business Economics', color: 'bg-orange-500', progress: 0 },
  ];

  const quickAccess = [
    { title: 'Daily Plan', icon: Calendar, href: '/daily-plan', description: "Today's scheduled tasks" },
    { title: 'Mock Tests', icon: FileText, href: '/mock-tests', description: 'Practice with timed tests' },
    { title: 'Roadmap', icon: Target, href: '/roadmap', description: '90-day preparation plan' },
    { title: 'Resources', icon: BookOpen, href: '/resources', description: 'Study materials & links' },
  ];

  const timeSlots = [
    { time: '06:00-09:00', label: 'Practical Subjects', subjects: 'Accounts & Math' },
    { time: '10:30-13:30', label: 'Descriptive Subjects', subjects: 'Law & Economics' },
    { time: '15:00-17:00', label: 'Objective Practice', subjects: 'MCQ Drills' },
    { time: '19:00-21:00', label: 'Revision & Testing', subjects: 'Review & Mock Tests' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            CA Foundation AIR 1 Strategy
          </h1>
          <p className="text-2xl text-purple-200">
            90-Day Intensive Preparation Program
          </p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="text-4xl font-bold text-white">{daysRemaining}</p>
              <p className="text-purple-200">Days Remaining</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <BookOpen className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <p className="text-4xl font-bold text-white">4</p>
              <p className="text-purple-200">Subjects</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Target className="w-8 h-8 text-pink-400 mx-auto mb-3" />
              <p className="text-4xl font-bold text-white">97+</p>
              <p className="text-purple-200">Target Score</p>
            </div>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickAccess.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all cursor-pointer group">
                  <item.icon className="w-10 h-10 text-purple-300 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-purple-200 text-sm">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Subject Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Subject Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject) => (
              <div key={subject.name} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className={`w-3 h-3 rounded-full ${subject.color} mb-4`} />
                <h3 className="text-lg font-semibold text-white mb-4">{subject.name}</h3>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className={`h-2 rounded-full ${subject.color}`} style={{ width: `${subject.progress}%` }} />
                </div>
                <p className="text-sm text-purple-200 mt-2">{subject.progress}% Complete</p>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Execution Pattern */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
            <Clock className="w-8 h-8 text-blue-400" />
            Daily Execution Pattern
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeSlots.map((slot, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-lg font-bold text-white">{slot.time}</span>
                </div>
                <h3 className="text-lg font-semibold text-purple-200 mb-1">{slot.label}</h3>
                <p className="text-sm text-gray-400">{slot.subjects}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
