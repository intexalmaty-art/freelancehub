import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { categories, specialists } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Filter, MapPin, Star, Heart, 
  ChevronDown, Grid, List as ListIcon, 
  ArrowRight, SlidersHorizontal, CheckCircle,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';

const AIAssistantInfo = {
  title: 'Умный подбор',
  description: 'Наш ИИ поможет найти лучших исполнителей.'
};

export default function Category() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [selectedPayment, setSelectedPayment] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Custom logic to get category details
  const categoryData = useMemo(() => {
    if (slug === 'all') {
      return {
        name: 'Все специалисты',
        color: 'bg-brand-violet/5',
        icon: '👥'
      };
    }
    return categories.find(c => c.slug === slug) || { 
      name: 'Категория', 
      color: 'bg-brand-violet/5', 
      icon: '✨' 
    };
  }, [slug]);
  
  // Filter States
  const [search, setSearch] = useState(initialQuery);

  // Sync search state with URL query if it changes
  useEffect(() => {
    if (initialQuery) {
      setSearch(initialQuery);
    }
  }, [initialQuery]);
  
  // Filtering Logic
  const filteredSpecialists = useMemo(() => {
    return specialists.filter(pro => {
      // If NOT 'all', filter by category
      const matchesCategory = slug === 'all' || true; 
      
      const matchesSearch = pro.name.toLowerCase().includes(search.toLowerCase()) || 
                           pro.role.toLowerCase().includes(search.toLowerCase()) ||
                           pro.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      
      const matchesPayment = selectedPayment.length === 0 || selectedPayment.includes(pro.paymentType);
      const matchesExperience = selectedExperience.length === 0 || selectedExperience.includes(pro.experience);
      const matchesCity = selectedCity.length === 0 || selectedCity.includes(pro.city);
      const matchesRating = pro.rating >= minRating;

      return matchesSearch && matchesPayment && matchesExperience && matchesCity && matchesRating;
    });
  }, [search, selectedPayment, selectedExperience, selectedCity, minRating, slug]);

  const toggleFilter = (list: string[], setList: (v: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedPayment([]);
    setSelectedExperience([]);
    setSelectedCity([]);
    setMinRating(0);
  };

  return (
    <div className="min-h-screen">
      {/* Search Header */}
      <div className={cn("relative py-32 overflow-hidden transition-colors duration-500", categoryData.color, "bg-opacity-40 backdrop-blur-3xl border-b border-white/50")}>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-violet/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="container-wide relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-16">
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center gap-4 text-[10px] font-black text-brand-violet uppercase tracking-[0.4em] mb-6">
                <Link to="/" className="hover:text-brand-dark transition-colors">Главная</Link>
                <div className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="text-slate-400">{categoryData.name}</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-4xl shadow-xl shadow-brand-violet/5">
                  {categoryData.icon}
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter leading-none font-display">
                  {categoryData.name}
                </h1>
              </div>
              <p className="text-brand-gray font-medium text-xl leading-relaxed max-w-xl">
                Нанимайте лучших специалистов в области {categoryData.name.toLowerCase()} для ваших самых амбициозных проектов.
              </p>
            </div>
            
            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-5 p-4 bg-white/80 backdrop-blur-xl rounded-[3rem] border border-white shadow-2xl shadow-brand-violet/5">
              <div className="relative flex-grow min-w-[300px] flex items-center px-6">
                <Search className="w-6 h-6 text-brand-violet" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Поиск по навыкам (Figma, Python...)" 
                  className="w-full pl-4 pr-4 py-4 bg-transparent border-none focus:ring-0 font-bold text-slate-600 text-lg"
                />
              </div>
              <button 
                onClick={clearFilters}
                className="btn-primary !rounded-[2.5rem] !px-12 !py-5 gap-3 text-sm uppercase tracking-widest shadow-xl shadow-brand-violet/20"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Сбросить
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-wide py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          
          {/* Filters Sidebar */}
          <aside className="hidden lg:block space-y-10">
            <div className="card-premium p-10 space-y-12">
              <div className="flex justify-between items-center mb-8">
                <h4 className="font-black text-brand-dark flex items-center gap-3 text-lg uppercase tracking-wider">
                  <Filter className="w-5 h-5 text-brand-violet" />
                  Фильтры
                </h4>
                {(selectedPayment.length > 0 || selectedExperience.length > 0 || selectedCity.length > 0) && (
                  <button onClick={clearFilters} className="text-[10px] font-black text-rose-500 hover:text-rose-600 transition-colors uppercase tracking-widest">
                    Сбросить
                  </button>
                )}
              </div>
              
              <div className="space-y-12">
                <div>
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Тип оплаты</h5>
                  <div className="space-y-4">
                    {['Фиксированная', 'Почасовая'].map(item => (
                      <label key={item} className="flex items-center gap-4 cursor-pointer group">
                        <div 
                          onClick={() => toggleFilter(selectedPayment, setSelectedPayment, item)}
                          className={cn(
                            "w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all",
                            selectedPayment.includes(item) ? "border-brand-violet bg-brand-violet/10" : "border-slate-100 group-hover:border-brand-violet"
                          )}
                        >
                          <div className={cn(
                            "w-2.5 h-2.5 rounded-md bg-brand-violet transition-transform",
                            selectedPayment.includes(item) ? "scale-100" : "scale-0"
                          )} />
                        </div>
                        <span className={cn(
                          "text-sm font-bold transition-colors",
                          selectedPayment.includes(item) ? "text-brand-dark" : "text-slate-500 group-hover:text-brand-dark"
                        )}>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Уровень опыта</h5>
                  <div className="space-y-4">
                    {['Junior', 'Middle', 'Senior', 'Expert'].map(item => (
                      <label key={item} className="flex items-center gap-4 cursor-pointer group">
                        <div 
                          onClick={() => toggleFilter(selectedExperience, setSelectedExperience, item)}
                          className={cn(
                            "w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all",
                            selectedExperience.includes(item) ? "border-brand-violet bg-brand-violet/10" : "border-slate-100 group-hover:border-brand-violet"
                          )}
                        >
                          <div className={cn(
                            "w-2.5 h-2.5 rounded-md bg-brand-violet transition-transform",
                            selectedExperience.includes(item) ? "scale-100" : "scale-0"
                          )} />
                        </div>
                        <span className={cn(
                          "text-sm font-bold transition-colors",
                          selectedExperience.includes(item) ? "text-brand-dark" : "text-slate-500 group-hover:text-brand-dark"
                        )}>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Город</h5>
                  <div className="space-y-4">
                    {['Алматы', 'Астана', 'Дистанционно'].map(item => (
                      <label key={item} className="flex items-center gap-4 cursor-pointer group">
                        <div 
                          onClick={() => toggleFilter(selectedCity, setSelectedCity, item)}
                          className={cn(
                            "w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all",
                            selectedCity.includes(item) ? "border-brand-violet bg-brand-violet/10" : "border-slate-100 group-hover:border-brand-violet"
                          )}
                        >
                          <div className={cn(
                            "w-2.5 h-2.5 rounded-md bg-brand-violet transition-transform",
                            selectedCity.includes(item) ? "scale-100" : "scale-0"
                          )} />
                        </div>
                        <span className={cn(
                          "text-sm font-bold transition-colors",
                          selectedCity.includes(item) ? "text-brand-dark" : "text-slate-500 group-hover:text-brand-dark"
                        )}>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Рейтинг от</h5>
                  <div className="flex gap-2">
                    {[3, 4, 4.5, 5].map(r => (
                      <button 
                        key={r}
                        onClick={() => setMinRating(minRating === r ? 0 : r)}
                        className={cn(
                          "flex-1 py-3 rounded-xl border-2 font-black text-xs transition-all",
                          minRating === r ? "border-brand-violet bg-brand-violet text-white shadow-lg shadow-brand-violet/20" : "border-slate-100 text-slate-400 hover:border-brand-violet/30"
                        )}
                      >
                        {r}+
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="glossy-card p-10 text-white relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <h5 className="font-black text-2xl mb-4 relative z-10 font-display tracking-tight leading-tight">Pro Talent Platform</h5>
              <p className="text-white/70 text-xs font-bold leading-relaxed mb-8 opacity-80 uppercase tracking-widest">
                Нулевые комиссии для исполнителей с подпиской.
              </p>
              <button className="w-full py-4 rounded-2xl bg-white text-brand-violet text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-brand-violet/20 hover:scale-[1.03] transition-transform">
                Подключить
              </button>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="lg:col-span-3 space-y-12">
            <div className="flex justify-between items-center bg-white/60 p-5 rounded-[2rem] border border-white backdrop-blur-xl">
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-3 rounded-xl transition-all",
                    viewMode === 'grid' ? "bg-brand-violet text-white shadow-lg shadow-brand-violet/20" : "text-slate-300 hover:text-brand-violet"
                  )}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-3 rounded-xl transition-all",
                    viewMode === 'list' ? "bg-brand-violet text-white shadow-lg shadow-brand-violet/20" : "text-slate-300 hover:text-brand-violet"
                  )}
                >
                  <ListIcon className="w-5 h-5" />
                </button>
                <div className="h-8 w-px bg-slate-200 mx-2" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden sm:block">Результатов: {filteredSpecialists.length}</span>
                <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block" />
                <button className="flex items-center gap-2 text-sm font-black text-brand-dark hover:text-brand-violet transition-colors">
                  По рейтингу
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className={cn(
              "grid gap-10",
              viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
            )}>
              <AnimatePresence mode="popLayout">
                {filteredSpecialists.length > 0 ? filteredSpecialists.map((pro) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={pro.id}
                  >
                    <Link 
                      to={`/profile/${pro.id}`} 
                      className={cn(
                        "card-premium block group hover:translate-y-[-8px] relative overflow-hidden",
                        viewMode === 'grid' ? "p-10" : "p-8 md:flex md:items-center md:gap-10"
                      )}
                    >
                      <div className={cn(
                        "flex items-start",
                        viewMode === 'grid' ? "justify-between mb-8" : "md:flex-1"
                      )}>
                        <div className="flex items-center gap-5">
                          <div className="relative">
                            <img src={pro.image} alt={pro.name} className="w-24 h-24 rounded-[2rem] object-cover ring-4 ring-slate-50 shadow-xl" />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-accent border-2 border-white rounded-xl flex items-center justify-center shadow-lg">
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-black text-2xl text-brand-dark group-hover:text-brand-violet transition-colors mb-2 font-display tracking-tight whitespace-nowrap">{pro.name}</h3>
                            <div className="flex flex-wrap items-center gap-3">
                              <div className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 fill-brand-accent text-brand-accent" />
                                <span className="text-sm font-black text-brand-dark">{pro.rating}</span>
                              </div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{pro.experience}</span>
                              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                <MapPin className="w-3 h-3" />
                                {pro.city}
                              </div>
                            </div>
                          </div>
                        </div>
                        {viewMode === 'grid' && (
                          <button className="p-3.5 rounded-2xl bg-slate-50 text-slate-300 hover:text-rose-500 hover:fill-rose-500 hover:bg-rose-50 transition-all shadow-sm" onClick={(e) => { e.preventDefault(); }}>
                            <Heart className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      <div className={cn(
                        viewMode === 'grid' ? "" : "md:flex-[1.5]"
                      )}>
                        <p className="text-[10px] font-black text-brand-violet mb-4 uppercase tracking-[0.3em]">{pro.role}</p>
                        <p className={cn(
                          "text-brand-gray font-medium text-base mb-8 leading-relaxed",
                          viewMode === 'grid' ? "line-clamp-2" : "line-clamp-3"
                        )}>{pro.description}</p>

                        <div className="flex flex-wrap gap-2 mb-8 md:mb-0">
                          {pro.tags.map(tag => (
                            <span key={tag} className="px-5 py-2 rounded-xl bg-slate-50 text-[10px] font-black uppercase text-slate-500 tracking-widest group-hover:bg-brand-violet/5 group-hover:text-brand-violet transition-colors">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={cn(
                        "pt-8 border-t border-slate-100 flex items-center justify-between",
                        viewMode === 'grid' ? "" : "md:border-t-0 md:pt-0 md:flex-col md:items-end md:gap-4 ml-auto"
                      )}>
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 mb-1">Доход</span>
                          <span className="text-2xl font-black text-brand-dark">{pro.earned}</span>
                        </div>
                        {viewMode === 'grid' && <div className="h-10 w-px bg-slate-100 mx-4" />}
                        <div className="flex flex-col text-right">
                          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 mb-1">Проекты</span>
                          <span className="text-2xl font-black text-brand-dark">{pro.projects}</span>
                        </div>
                      </div>
                      
                      {viewMode === 'list' && (
                        <div className="absolute top-4 right-4">
                           <button className="p-3 text-slate-300 hover:text-rose-500 transition-colors" onClick={(e) => { e.preventDefault(); }}>
                             <Heart className="w-6 h-6" />
                           </button>
                        </div>
                      )}
                    </Link>
                  </motion.div>
                )) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full py-32 text-center"
                  >
                    <div className="w-32 h-32 bg-slate-100 rounded-[3rem] flex items-center justify-center mx-auto mb-10">
                      <X className="w-12 h-12 text-slate-300" />
                    </div>
                    <h3 className="text-3xl font-black text-brand-dark mb-4 font-display tracking-tight">Ничего не найдено</h3>
                    <p className="text-brand-gray font-medium text-lg mb-10">Попробуйте изменить параметры фильтрации или поисковый запрос.</p>
                    <button onClick={clearFilters} className="btn-primary !rounded-2xl !px-12">Сбросить все фильтры</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex justify-center pt-12">
              <button className="btn-primary !px-16 !py-5 flex items-center gap-4 text-sm uppercase tracking-widest">
                Загрузить еще
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
