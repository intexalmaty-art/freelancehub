import { Search, Filter, MapPin, Star, Heart, Calendar, Zap, SlidersHorizontal, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { jobs } from '../constants';
import React, { useState } from 'react';

export default function Jobs() {
  const [appliedJobs, setAppliedJobs] = useState<(string | number)[]>([]);
  const [likedJobs, setLikedJobs] = useState<(string | number)[]>([]);

  const toggleLike = (id: string | number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedJobs(prev => 
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
    <div className="min-h-screen">
      <div className="bg-white/40 backdrop-blur-3xl border-b border-white/50 py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-lime/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
        <div className="container-wide relative z-10">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-lime/10 border border-brand-lime/20 text-brand-dark font-black text-[10px] uppercase tracking-widest">
              Актуальные предложения
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-brand-dark tracking-tighter leading-none font-display">
              Найти <span className="text-gradient">проекты</span>
            </h1>
            <p className="text-xl text-brand-gray font-medium leading-relaxed">
              Тысячи актуальных заказов от проверенных компаний со всего Казахстана.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 p-3 bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-brand-violet/5">
              <div className="relative flex-grow flex items-center px-4">
                <Search className="w-6 h-6 text-brand-violet" />
                <input 
                  type="text" 
                  placeholder="Название или навыки..." 
                  className="w-full pl-3 pr-4 py-4 bg-transparent border-none focus:ring-0 font-bold text-slate-600 text-lg"
                />
              </div>
              <button className="btn-primary !rounded-[2rem] !px-12">Поиск</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-wide py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          {/* Filters */}
          <aside className="hidden lg:block space-y-10">
            <div className="card-premium p-10">
              <h4 className="font-black text-brand-dark mb-8 flex items-center gap-3 uppercase tracking-wider">
                <SlidersHorizontal className="w-5 h-5 text-brand-violet" />
                Фильтры
              </h4>
              
              <div className="space-y-12">
                <div>
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Тип бюджета</h5>
                  <div className="space-y-4">
                    {['Фиксированный', 'Почасовой', 'По договоренности'].map(item => (
                      <label key={item} className="flex items-center gap-4 cursor-pointer group">
                        <div className="w-6 h-6 rounded-xl border-2 border-slate-100 flex items-center justify-center group-hover:border-brand-violet">
                          <div className="w-2.5 h-2.5 bg-brand-violet rounded-md scale-0 group-hover:scale-100 transition-transform" />
                        </div>
                        <span className="text-sm font-bold text-slate-600 group-hover:text-brand-dark">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Опыт</h5>
                  <div className="space-y-4">
                    {['Начинающий', 'Средний', 'Эксперт'].map(item => (
                      <label key={item} className="flex items-center gap-4 cursor-pointer group">
                        <div className="w-6 h-6 rounded-xl border-2 border-slate-100 flex items-center justify-center group-hover:border-brand-violet">
                          <div className="w-2.5 h-2.5 bg-brand-violet rounded-md scale-0 group-hover:scale-100 transition-transform" />
                        </div>
                        <span className="text-sm font-bold text-slate-600 group-hover:text-brand-dark">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Job List */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between px-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Найдено 1,245 заказов</p>
              <div className="flex items-center gap-3 text-sm font-black text-brand-dark">
                Сортировать: <span className="text-brand-violet cursor-pointer hover:underline">Сначала новые</span>
              </div>
            </div>

            {jobs.map((job, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                key={job.id}
                className="card-premium p-10 hover:shadow-2xl hover:shadow-brand-violet/10 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-violet/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                
                <div className="flex justify-between items-start gap-8 mb-8 relative z-10">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-brand-dark group-hover:text-brand-violet transition-colors cursor-pointer leading-tight tracking-tighter">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-6">
                      <span className="flex items-center gap-2 text-xs font-black text-brand-dark bg-brand-lime px-3 py-1.5 rounded-lg shadow-sm">
                        <Zap className="w-4 h-4" />
                        {job.budget}
                      </span>
                      <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">
                        {job.type}
                      </span>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Опубликовано {job.posted}</span>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => toggleLike(job.id, e)}
                    className={cn(
                      "p-4 rounded-2xl transition-all shadow-sm",
                      likedJobs.includes(job.id) ? "bg-rose-50 text-rose-500" : "bg-slate-50 text-slate-300 hover:text-rose-500 hover:bg-rose-50"
                    )}
                  >
                    <Heart className={cn("w-6 h-6", likedJobs.includes(job.id) && "fill-current")} />
                  </button>
                </div>

                <p className="text-brand-gray text-lg font-medium leading-relaxed mb-8 line-clamp-2">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {job.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-xl bg-brand-bg text-[10px] font-black uppercase text-slate-500 tracking-tighter group-hover:bg-brand-violet/5 group-hover:text-brand-violet transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-10 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-violet text-white flex items-center justify-center font-black text-xl shadow-lg shadow-brand-violet/20">
                      {job.client.charAt(0)}
                    </div>
                    <div>
                        <div className="text-sm font-black text-brand-dark">{job.client}</div>
                        {job.verified && <div className="text-[10px] text-emerald-500 font-black uppercase tracking-widest flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Проверен
                        </div>}
                    </div>
                  </div>
                  <button 
                    onClick={(e) => handleApply(job.id, e)}
                    disabled={appliedJobs.includes(job.id)}
                    className={cn(
                      "btn-primary !py-4 !px-10 !rounded-2xl text-xs uppercase tracking-widest transition-all",
                      appliedJobs.includes(job.id) ? "bg-emerald-500 !text-white border-emerald-500" : ""
                    )}
                  >
                    {appliedJobs.includes(job.id) ? "Откликнуто" : "Откликнуться"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
