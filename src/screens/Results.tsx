import { motion } from 'motion/react';
import { ArrowRight, MessageSquare, History } from 'lucide-react';

export default function Results() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-10"
    >
      <section className="space-y-1 pl-2">
        <h2 className="text-3xl font-black tracking-tight text-on-surface">Tu resultado</h2>
        <p className="text-on-surface-variant font-semibold text-sm opacity-80 leading-relaxed">Análisis basado en tu actividad reciente.</p>
      </section>

      {/* Hero Result Card */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-tr from-primary-container/40 to-surface-variant/40 rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-50 transition duration-1000" />
        <div className="relative bg-surface-container-lowest rounded-lg p-10 flex flex-col items-center text-center space-y-8 shadow-sm border border-on-surface/5">
          <div className="relative">
            {/* Progress Circle SVG */}
            <svg className="w-48 h-48 transform -rotate-90">
              <circle 
                className="text-surface-container-low" 
                cx="96" cy="96" fill="transparent" r="84" 
                stroke="currentColor" strokeWidth="16" 
              />
              <motion.circle 
                initial={{ strokeDashoffset: 528 }}
                animate={{ strokeDashoffset: 528 * (1 - 65/100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-tertiary-container" 
                cx="96" cy="96" fill="transparent" r="84" 
                stroke="currentColor" strokeWidth="16" 
                strokeDasharray="528"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-black text-primary tracking-tighter">65<span className="text-2xl text-on-surface-variant/30 font-black">/100</span></span>
            </div>
          </div>

          <div className="inline-flex items-center px-8 py-2.5 bg-yellow-50 text-yellow-700 font-black rounded-full text-[11px] uppercase tracking-widest shadow-sm border border-yellow-200">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 mr-3 animate-pulse" />
            🟡 Riesgo Medio
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-2 w-full gap-5">
            <div className="bg-surface-container-low/50 p-6 rounded-lg flex flex-col items-center border border-on-surface/5">
              <span className="text-[9px] uppercase tracking-[0.15em] text-on-surface-variant font-black mb-1.5 opacity-60">Notas</span>
              <span className="text-2xl font-black text-on-surface tracking-tighter">31 <span className="text-sm opacity-50">pts</span></span>
            </div>
            <div className="bg-surface-container-low/50 p-6 rounded-lg flex flex-col items-center border border-on-surface/5">
              <span className="text-[9px] uppercase tracking-[0.15em] text-on-surface-variant font-black mb-1.5 opacity-60">Bienestar</span>
              <span className="text-2xl font-black text-on-surface tracking-tighter">34 <span className="text-sm opacity-50">pts</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Card */}
      <section className="bg-primary-container/20 rounded-lg p-8 flex gap-6 items-start border border-primary-container/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container/10 blur-xl rounded-full -mr-12 -mt-12" />
        <div className="w-14 h-14 bg-primary-container rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm">
          <MessageSquare className="w-7 h-7 text-primary" />
        </div>
        <div className="space-y-1.5 py-1">
          <h3 className="font-black text-on-primary-container text-xs uppercase tracking-widest">Recomendación</h3>
          <p className="text-on-surface-variant font-semibold text-sm leading-relaxed">
            Te recomendamos asistir a tutoría académica y hablar con bienestar esta semana.
          </p>
        </div>
      </section>

      {/* Sub Actions */}
      <div className="space-y-4">
        <button className="w-full bg-primary text-on-primary font-black py-5 rounded-xl shadow-xl shadow-primary/10 active:scale-95 transition-all flex items-center justify-center gap-3">
          <span className="text-lg">Contactar bienestar</span>
          <ArrowRight className="w-6 h-6 border-2 border-white/20 rounded-full p-0.5" />
        </button>
        <button className="w-full bg-white/50 backdrop-blur-sm text-primary font-black py-5 rounded-xl border-2 border-primary/10 active:bg-surface-container-low transition-all flex items-center justify-center gap-3 hover:bg-white/80">
          <History className="w-5 h-5" />
          Ver historial de resultados
        </button>
      </div>
    </motion.div>
  );
}
