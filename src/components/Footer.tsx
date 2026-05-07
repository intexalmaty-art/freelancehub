import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Network } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-brand-lime">
                <Network className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-800">Freelance <span className="text-slate-800">Hub</span></span>
            </Link>
            <div className="flex gap-4">
              <Link to="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 hover:bg-brand-accent/10 hover:border-brand-accent transition-all group">
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-brand-accent" />
              </Link>
              <Link to="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 hover:bg-brand-accent/10 hover:border-brand-accent transition-all group">
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-brand-accent" />
              </Link>
              <Link to="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 hover:bg-brand-accent/10 hover:border-brand-accent transition-all group">
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-brand-accent" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-brand-dark mb-6 uppercase tracking-widest text-xs">Для заказчиков</h4>
            <ul className="space-y-4">
              <li><Link to="#" className="text-sm font-semibold text-gray-500 hover:text-brand-accent transition-colors">Поиск фрилансеров</Link></li>
              <li><Link to="#" className="text-sm font-semibold text-gray-500 hover:text-brand-accent transition-colors">Разместить проект</Link></li>
              <li><Link to="#" className="text-sm font-semibold text-gray-500 hover:text-brand-accent transition-colors">Как это работает</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-brand-dark mb-6 uppercase tracking-widest text-xs">Для фрилансеров</h4>
            <ul className="space-y-4">
              <li><Link to="#" className="text-sm font-semibold text-gray-500 hover:text-brand-accent transition-colors">Найти проекты</Link></li>
              <li><Link to="#" className="text-sm font-semibold text-gray-500 hover:text-brand-accent transition-colors">Советы по продвижению</Link></li>
              <li><Link to="#" className="text-sm font-semibold text-gray-500 hover:text-brand-accent transition-colors">Условия работы</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-brand-dark mb-6 uppercase tracking-widest text-xs">О компании</h4>
            <ul className="space-y-4">
              <li><Link to="#" className="text-sm font-semibold text-gray-500 hover:text-brand-accent transition-colors">О нас</Link></li>
              <li><Link to="#" className="text-sm font-semibold text-gray-500 hover:text-brand-accent transition-colors">FAQ</Link></li>
              <li><Link to="#" className="text-sm font-semibold text-gray-500 hover:text-brand-accent transition-colors">Контакты</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© {currentYear} Freelance Hub</p>
          <div className="flex gap-8">
            <Link to="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Условия использования</Link>
            <Link to="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Политика использования файлов cookie</Link>
            <Link to="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Политика конфиденциальности</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
