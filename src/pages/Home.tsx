import { categories, specialists, jobs } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, TrendingUp, Shield, Zap, ArrowRight, Star, Heart, Calendar, CheckCircle, PlayCircle, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [userMode, setUserMode] = useState<'client' | 'freelancer'>('client');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedSpecialists, setLikedSpecialists] = useState<(string | number)[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<(string | number)[]>([]);
  const navigate = useNavigate();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;
    
    if (userMode === 'client') {
      // Searching for talent
      navigate(`/category/all?q=${encodeURIComponent(searchQuery)}`);
    } else {
      // Searching for work
      navigate(`/jobs?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleLike = (id: string | number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedSpecialists(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleApply = (id: string | number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (appliedJobs.includes(id)) return;
    setAppliedJobs(prev => [...prev, id]);
  };

  return (
    <div className="flex flex-col">
      {/* Light Centered Hero Section */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center pt-20 pb-32 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-gradient-to-b from-brand-accent/5 via-brand-violet/5 to-transparent blur-[120px] pointer-events-none" />
        
        <div className="container-wide relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-4xl"
          >
            <p className="text-lg font-bold text-brand-dark/80 tracking-tight">Биржа фрилансеров Казахстана</p>
            <h1 className="text-4xl md:text-6xl font-black text-brand-dark leading-[1.1] tracking-tighter font-display">
              Соединяем фрилансеров <br className="hidden md:block" />
              и клиентов в один клик
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-12 flex flex-col items-center w-full max-w-2xl"
          >
            {/* Mode Toggle */}
            <div className="bg-slate-200/50 p-1.5 rounded-full flex gap-1 mb-10 backdrop-blur-sm">
              <button 
                onClick={() => setUserMode('client')}
                className={cn(
                  "px-8 py-3 rounded-full text-sm font-black transition-all",
                  userMode === 'client' ? "bg-brand-lime text-slate-900 shadow-lg shadow-brand-lime/20" : "text-slate-500 hover:text-slate-700"
                )}
              >
                Я - Заказчик
              </button>
              <button 
                onClick={() => setUserMode('freelancer')}
                className={cn(
                  "px-8 py-3 rounded-full text-sm font-black transition-all",
                  userMode === 'freelancer' ? "bg-brand-lime text-slate-900 shadow-lg shadow-brand-lime/20" : "text-slate-500 hover:text-slate-700"
                )}
              >
                Я - Фрилансер
              </button>
            </div>

            {/* Centered Search */}
            <form 
              onSubmit={handleSearch}
              className="w-full flex flex-col sm:flex-row gap-4 p-3 bg-white/60 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-2xl shadow-brand-violet/5 mb-10 mx-auto"
            >
              <div className="flex-grow flex items-center px-6 gap-3 py-2 sm:py-0">
                <Search className="w-6 h-6 text-brand-violet" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={userMode === 'client' ? "Найти специалиста..." : "Найти работу..."}
                  className="w-full bg-transparent border-none focus:ring-0 text-brand-dark placeholder:text-slate-400 font-bold text-lg text-center"
                />
              </div>
              <button 
                type="submit"
                className="px-10 py-4 bg-brand-violet text-white rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
              >
                Найти
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-3 justify-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Популярные запросы:</span>
              {['Веб-дизайнер', 'Front-end Разработчик', 'ИИ-помощник', 'SMM специалист'].map((tag) => (
                <button key={tag} className="px-5 py-2.5 rounded-full bg-white border border-slate-100 text-[10px] font-black text-brand-gray hover:bg-brand-violet hover:text-white hover:border-brand-violet transition-all uppercase tracking-tighter">
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories - Updated with display font and image style */}
      <section className="py-32 relative">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, idx) => (
              <Link
                key={cat.name}
                to={`/category/${cat.slug}`}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={cn("p-10 rounded-[3rem] transition-all cursor-pointer group h-full flex flex-col items-start border border-white/50", cat.color)}
                >
                  <div className="w-20 h-20 rounded-[2rem] bg-white flex items-center justify-center text-3xl mb-8 shadow-sm group-hover:shadow-md transition-shadow">
                    {cat.icon}
                  </div>
                  <h3 className="font-black text-2xl text-brand-dark mb-4 leading-tight font-display tracking-tight">{cat.name}</h3>
                  <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-brand-violet uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">
                    Перейти <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-32 bg-brand-violet/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-stripes opacity-5" />
        <div className="container-wide relative z-10">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter font-display">Топ <span className="text-gradient">проектов</span></h2>
            <p className="text-brand-gray text-lg font-medium max-w-2xl mx-auto">Самые горячие и высокооплачиваемые заказы на сегодня</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            {jobs.map((job, idx) => (
              <motion.div 
                whileHover={{ y: -15 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                key={job.id} 
                className="glossy-card p-10 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="px-4 py-2 rounded-xl bg-white/40 text-brand-violet text-[10px] font-black uppercase tracking-[0.2em] border border-white/50">
                      {job.type}
                    </span>
                    <button 
                      onClick={(e) => toggleLike(job.id, e)}
                      className={cn(
                        "p-3 rounded-full transition-all",
                        likedSpecialists.includes(job.id) ? "bg-brand-accent text-white" : "bg-white/20 text-white hover:bg-brand-accent/50"
                      )}
                    >
                      <Heart className={cn("w-5 h-5", likedSpecialists.includes(job.id) && "fill-current")} />
                    </button>
                  </div>
                  <h3 className="font-black text-2xl text-white mb-6 leading-tight group-hover:text-white transition-colors font-display tracking-tight">{job.title}</h3>
                  <div className="flex flex-wrap gap-6 mb-10">
                    <div className="flex items-center gap-3 text-sm font-bold text-white/80">
                      <Zap className="w-5 h-5 text-brand-accent" />
                      {job.budget}
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-white/80">
                      <Calendar className="w-5 h-5 text-brand-accent" />
                      {job.deadline}
                    </div>
                  </div>
                </div>
                <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-white/60">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  <button 
                    onClick={(e) => handleApply(job.id, e)}
                    disabled={appliedJobs.includes(job.id)}
                    className={cn(
                      "btn-accent !py-4 !px-8 !rounded-xl !text-[10px] !uppercase !tracking-widest transition-all",
                      appliedJobs.includes(job.id) ? "bg-emerald-500 !text-white opacity-100" : ""
                    )}
                  >
                    {appliedJobs.includes(job.id) ? "Откликнуто" : "Отклик"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link to="/jobs" className="btn-accent !px-16 !py-5 flex items-center gap-4 text-sm uppercase tracking-widest shadow-2xl shadow-brand-accent/20">
              Посмотреть все проекты
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section className="py-32">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter font-display">Твои <span className="text-gradient">герои</span></h2>
            <Link to="/category/all" className="btn-primary !px-10 !py-4 text-xs tracking-widest flex items-center gap-3">
              Все эксперты
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {specialists.map((pro, idx) => (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={pro.id} 
                className="card-premium p-10 flex flex-col items-center text-center group"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-brand-violet/40 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-110" />
                  <img 
                    src={pro.image} 
                    alt={pro.name} 
                    className="relative z-10 w-40 h-40 rounded-[2rem] object-cover border-4 border-white shadow-2xl group-hover:rotate-3 transition-all duration-500" 
                  />
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-brand-accent border-4 border-white rounded-2xl z-20 flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <h3 className="font-black text-2xl text-brand-dark group-hover:text-brand-violet transition-colors mb-2 font-display tracking-tight">
                  {pro.name}
                </h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">
                  {pro.role}
                </p>

                <div className="w-full flex items-center justify-around p-6 rounded-[2rem] bg-brand-violet/5 mb-10 border border-brand-violet/5">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-lg font-black text-brand-dark">
                      <Star className="w-4 h-4 fill-brand-accent text-brand-accent" />
                      {pro.rating}
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Рейтинг</div>
                  </div>
                  <div className="w-px h-10 bg-slate-200" />
                  <div className="text-center">
                    <div className="text-lg font-black text-brand-dark">{pro.projects}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Проекты</div>
                  </div>
                </div>

                <Link to={`/profile/${pro.id}`} className="w-full py-5 rounded-2xl bg-brand-violet text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-lg shadow-brand-violet/20 hover:scale-[1.02] active:scale-95 transition-all">
                  Профиль
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 container-wide">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glossy-card overflow-hidden relative p-16 md:p-32 shadow-3xl"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-violet/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-12 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter font-display">
              Создай <span className="text-brand-accent">будущее</span> сегодня
            </h2>
            <p className="text-xl text-white/80 font-medium max-w-2xl px-4">
              Присоединяйся к сообществу самых талантливых людей страны и начни работать над тем, что действительно важно.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 w-full justify-center pt-8">
              <button className="btn-accent text-xl px-16 py-6 shadow-3xl hover:scale-105 active:scale-95">
                Зарегистрироваться
              </button>
              <button className="px-16 py-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-xl hover:bg-white/20 transition-all">
                Смотреть демо
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
