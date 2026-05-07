import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Github, Chrome, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = React.useState<'login' | 'register'>(initialMode);

  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[110]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[120] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-[500px] bg-white rounded-[2.5rem] shadow-4xl pointer-events-auto overflow-hidden relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-8 right-8 p-3 hover:bg-slate-100 rounded-2xl transition-colors z-10"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>

              <div className="p-12">
                {/* Header */}
                <div className="mb-10 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-brand-lime rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand-lime/20 mx-auto">
                    <ShieldCheck className="w-8 h-8 text-slate-800" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight font-display mb-3 text-center">
                    {mode === 'login' ? 'С возвращением!' : 'Присоединяйтесь'}
                  </h2>
                  <p className="text-slate-500 font-medium text-center">
                    {mode === 'login' 
                      ? 'Войдите, чтобы продолжить работу над вашими проектами' 
                      : 'Создайте аккаунт и начните поиск лучших специалистов в Казахстане'}
                  </p>
                </div>

                {/* Forms */}
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  {mode === 'register' && (
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-brand-violet rounded-2xl outline-none transition-all font-bold text-slate-600"
                      />
                    </div>
                  )}
                  
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-brand-violet rounded-2xl outline-none transition-all font-bold text-slate-600"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="password"
                      placeholder="Пароль"
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-brand-violet rounded-2xl outline-none transition-all font-bold text-slate-600"
                    />
                  </div>

                  {mode === 'login' && (
                    <div className="flex justify-end">
                      <button className="text-xs font-black text-brand-violet uppercase tracking-widest hover:underline">
                        Забыли пароль?
                      </button>
                    </div>
                  )}

                  <button className="w-full py-5 bg-brand-violet text-white rounded-2xl font-black text-lg shadow-xl shadow-brand-violet/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4">
                    {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-10 flex items-center">
                  <div className="flex-grow border-t border-slate-100"></div>
                  <span className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white">или через</span>
                  <div className="flex-grow border-t border-slate-100"></div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 py-4 border-2 border-slate-50 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-600">
                    <Chrome className="w-5 h-5" />
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-3 py-4 border-2 border-slate-50 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-600">
                    <Github className="w-5 h-5" />
                    GitHub
                  </button>
                </div>

                {/* Footer Link */}
                <p className="mt-10 text-center text-sm font-medium text-slate-500">
                  {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                  <button
                    onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                    className="ml-2 text-brand-violet font-black hover:underline"
                  >
                    {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
