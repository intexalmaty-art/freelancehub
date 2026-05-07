import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, User, Bell, MessageSquare, ChevronDown, Network, Star } from 'lucide-react';
import { cn } from '../lib/utils';
import AuthModal from './AuthModal';

export default function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <header className="glass-nav h-24 flex items-center">
      <div className="container-wide flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-lime shadow-xl shadow-brand-lime/10 group-hover:scale-110 transition-all duration-500">
            <Network className="w-8 h-8 stroke-[2.5]" />
          </div>
          <span className="text-xl font-black text-slate-800 tracking-tight font-display hidden sm:block">
            Freelance <span className="text-slate-800">Hub</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
           <div className="relative group">
             <button className="text-xs font-bold text-slate-600 hover:text-brand-violet px-5 py-3 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer">
               Фрилансеры
               <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
             </button>
             {/* Dropdown */}
             <div className="absolute top-full left-0 pt-4 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
               <div className="w-64 bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-4">
                 <Link to="/category/all" className="flex items-center gap-3 p-4 hover:bg-slate-50 rounded-2xl transition-colors group/item">
                    <div className="w-10 h-10 rounded-xl bg-brand-lime/10 flex items-center justify-center text-brand-lime group-hover/item:scale-110 transition-transform">
                      <Search className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[13px] font-black text-slate-800">Поиск талантов</div>
                      <div className="text-[10px] font-bold text-slate-400">Найти эксперта</div>
                    </div>
                 </Link>
                 <Link to="/category/graphics-design" className="flex items-center gap-3 p-4 hover:bg-slate-50 rounded-2xl transition-colors group/item mt-1">
                    <div className="w-10 h-10 rounded-xl bg-brand-violet/10 flex items-center justify-center text-brand-violet group-hover/item:scale-110 transition-transform">
                      <Star className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[13px] font-black text-slate-800">Топ специалисты</div>
                      <div className="text-[10px] font-bold text-slate-400">Лучшие в КЗ</div>
                    </div>
                 </Link>
               </div>
             </div>
           </div>

           <div className="relative group">
             <button className="text-xs font-bold text-slate-600 hover:text-brand-violet px-5 py-3 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer">
               Заказчики
               <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
             </button>
             {/* Dropdown */}
             <div className="absolute top-full left-0 pt-4 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
               <div className="w-64 bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-4">
                 <Link to="/jobs" className="flex items-center gap-3 p-4 hover:bg-slate-50 rounded-2xl transition-colors group/item">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500 group-hover/item:scale-110 transition-transform">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[13px] font-black text-slate-800">Поиск работы</div>
                      <div className="text-[10px] font-bold text-slate-400">Свежие вакансии</div>
                    </div>
                 </Link>
                 <Link to="/jobs" className="flex items-center gap-3 p-4 hover:bg-slate-50 rounded-2xl transition-colors group/item mt-1">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-500 group-hover/item:scale-110 transition-transform">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[13px] font-black text-slate-800">Разместить заказ</div>
                      <div className="text-[10px] font-bold text-slate-400">Публикация бесплатно</div>
                    </div>
                 </Link>
               </div>
             </div>
           </div>
           <Link to="#" className="text-xs font-bold text-slate-600 hover:text-brand-violet px-5 py-3 rounded-xl transition-all">
             О нас
           </Link>
           <Link to="#" className="text-xs font-bold text-slate-600 hover:text-brand-violet px-5 py-3 rounded-xl transition-all">
             Тарифы
           </Link>
           <Link to="#" className="text-xs font-bold text-slate-600 hover:text-brand-violet px-5 py-3 rounded-xl transition-all">
             FAQ
           </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => openAuth('register')}
            className="hidden sm:block px-6 py-3 rounded-xl bg-brand-violet text-white text-xs font-black shadow-xl shadow-brand-violet/20 hover:scale-105 transition-all"
          >
            Бесплатная регистрация
          </button>
          <button 
            onClick={() => openAuth('login')}
            className="px-6 py-3 rounded-xl border-2 border-slate-800 text-slate-800 text-xs font-black hover:bg-slate-800 hover:text-white transition-all"
          >
            Вход
          </button>
          <button className="lg:hidden p-3 bg-white/60 rounded-2xl border border-white">
            <Menu className="w-6 h-6 text-brand-dark" />
          </button>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode} 
      />
    </header>
  );
}
