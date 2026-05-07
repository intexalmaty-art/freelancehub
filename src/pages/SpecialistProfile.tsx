import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, MapPin, Briefcase, Calendar, CheckCircle2, 
  Globe, MessageSquare, Share2, Heart, Award, 
  ExternalLink, ChevronRight, Filter, CheckCircle, ArrowRight,
  X, Send
} from 'lucide-react';
import { cn } from '../lib/utils';

const profileData = {
  id: 'specialist-1',
  name: 'Елена Макарова',
  role: 'UI/UX Дизайнер • Product Design',
  location: 'Алматы, Казахстан',
  rating: 4.9,
  reviews: 124,
  projects: 86,
  hourlyRate: '12,000 ₸',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300',
  about: 'Я специализируюсь на создании удобных и эстетичных интерфейсов для мобильных и веб-приложений. Более 5 лет опыта работы с казахстанскими и международными стартапами. Мой подход базируется на глубоком анализе пользовательского опыта (UX) и создании визуального языка, который работает на цели бизнеса.',
  skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems', 'React Native'],
  portfolio: [
    { title: 'Маркетплейс для фермеров', category: 'Mobile App', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400' },
    { title: 'Система учета в госсекторе', category: 'Dashboard', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400' },
    { title: 'Платформа для онлайн-обучения', category: 'Web App', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400' },
    { title: 'Приложение для путешествий', category: 'UX Case Study', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=400' },
  ]
};

export default function SpecialistProfile() {
  const { id } = useParams();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setIsContactOpen(false);
    }, 2000);
  };

  return (
    <div className="container-wide py-20">
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[3rem] p-12 shadow-3xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-violet/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              
              <button 
                onClick={() => setIsContactOpen(false)}
                className="absolute top-8 right-8 p-3 text-slate-300 hover:text-brand-dark transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {isSent ? (
                <div className="py-20 text-center space-y-8 relative z-10">
                  <div className="w-24 h-24 bg-brand-accent rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-brand-accent/20">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-brand-dark mb-4 font-display tracking-tight">Сообщение отправлено!</h3>
                    <p className="text-brand-gray font-medium text-lg italic">Елена свяжется с вами в ближайшее время.</p>
                  </div>
                </div>
              ) : (
                <div className="relative z-10">
                  <div className="mb-12">
                    <h3 className="text-4xl font-black text-brand-dark mb-4 font-display tracking-tight">Обсудить проект</h3>
                    <p className="text-brand-gray font-medium">Опишите вашу задачу, и специалист ответит вам в течение часа.</p>
                  </div>

                  <form onSubmit={handleSend} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Ваше имя</label>
                        <input required type="text" placeholder="Иван Иванов" className="w-full px-8 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-brand-violet outline-none transition-all font-bold text-slate-600" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email / Телефон</label>
                        <input required type="text" placeholder="+7 (700) 000-00-00" className="w-full px-8 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-brand-violet outline-none transition-all font-bold text-slate-600" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Детали проекта</label>
                      <textarea required rows={4} placeholder="Расскажите подробнее о задаче..." className="w-full px-8 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-brand-violet outline-none transition-all font-bold text-slate-600 resize-none"></textarea>
                    </div>

                    <button type="submit" className="btn-primary w-full py-6 text-base uppercase tracking-widest flex items-center justify-center gap-4 group">
                      Отправить запрос
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                    
                    <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Нажимая кнопку, вы соглашаетесь с правилами сервиса
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Left Column: Profile Card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-10"
        >
          <div className="card-premium p-10 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-violet/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 bg-brand-violet/20 rounded-[3rem] blur-2xl scale-125 opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <img src={profileData.image} alt={profileData.name} className="relative z-10 w-48 h-48 rounded-[3rem] object-cover border-4 border-white shadow-2xl transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-brand-lime border-4 border-white rounded-2xl flex items-center justify-center text-brand-dark shadow-xl z-20">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
            
            <h1 className="text-4xl font-black text-brand-dark mb-3 tracking-tighter leading-none font-display">{profileData.name}</h1>
            <p className="text-sm font-black text-brand-violet uppercase tracking-[0.2em] mb-10">{profileData.role}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-6 rounded-[2rem] bg-brand-bg border border-white text-center">
                <div className="flex items-center justify-center gap-1 text-xl font-black text-brand-dark">
                  <Star className="w-4 h-4 fill-brand-lime text-brand-lime" />
                  {profileData.rating}
                </div>
                <div className="text-[10px] font-black text-slate-400 border-t border-slate-100 mt-2 pt-2 uppercase tracking-widest">{profileData.reviews} отзывов</div>
              </div>
              <div className="p-6 rounded-[2rem] bg-brand-violet text-white text-center">
                <div className="text-xl font-black">{profileData.hourlyRate}</div>
                <div className="text-[10px] font-black text-white/60 border-t border-white/10 mt-2 pt-2 uppercase tracking-widest">В час</div>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => setIsContactOpen(true)}
                className="btn-primary w-full flex items-center justify-center gap-3 py-5 text-sm uppercase tracking-widest"
              >
                <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Связаться
              </button>
              <button className="btn-accent w-full py-5 text-sm uppercase tracking-widest">Предложить проект</button>
            </div>
            
            <div className="mt-10 pt-10 border-t border-slate-100 flex items-center justify-center gap-6">
               <button className="p-4 bg-slate-50 rounded-2xl hover:bg-brand-violet hover:text-white transition-all hover:-translate-y-1 shadow-sm">
                 <Share2 className="w-6 h-6" />
               </button>
               <button className="p-4 bg-slate-50 rounded-2xl hover:bg-rose-500 hover:text-white transition-all hover:-translate-y-1 shadow-sm">
                 <Heart className="w-6 h-6" />
               </button>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Stats & Portfolio */}
        <div className="lg:col-span-2 space-y-16">
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-premium p-12 relative overflow-hidden"
          >
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-lime/5 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />
            <h2 className="text-3xl font-black text-brand-dark mb-8 tracking-tighter font-display flex items-center gap-4">
              <div className="w-2 h-8 bg-brand-violet rounded-full" />
              О специалисте
            </h2>
            <p className="text-brand-gray leading-relaxed text-xl font-medium mb-10">
              {profileData.about}
            </p>
            
            <div className="pt-10 border-t border-slate-100">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Основные компетенции</h3>
              <div className="flex flex-wrap gap-4">
                {profileData.skills.map(skill => (
                  <span key={skill} className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-black text-brand-violet hover:bg-brand-violet hover:text-white transition-all shadow-sm cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.section>

          <section>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6 bg-white/40 p-6 rounded-[2.5rem] border border-white">
              <h2 className="text-3xl font-black text-brand-dark tracking-tighter font-display">Портфолио ({profileData.portfolio.length})</h2>
              <button className="text-sm font-black text-brand-violet uppercase tracking-widest flex items-center gap-3 hover:gap-5 transition-all">
                Все работы <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {profileData.portfolio.map((item, idx) => (
                <motion.div 
                  whileHover={{ y: -15 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx} 
                  className="card-premium overflow-hidden group cursor-pointer border-none shadow-2xl shadow-brand-violet/5"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-brand-violet/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <button className="btn-lime !py-4 !px-10 text-xs uppercase tracking-widest">Просмотр</button>
                    </div>
                  </div>
                  <div className="p-10 bg-white">
                    <div className="inline-block px-4 py-1.5 rounded-lg bg-brand-violet/10 text-[10px] font-black text-brand-violet uppercase tracking-[0.2em] mb-4">{item.category}</div>
                    <h4 className="font-black text-2xl text-brand-dark group-hover:text-brand-violet transition-colors leading-tight mb-4 tracking-tighter">
                      {item.title}
                    </h4>
                    <p className="text-brand-gray font-medium text-base line-clamp-2">Короткое описание реализации проекта и использованных технологий в этом кейсе.</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
