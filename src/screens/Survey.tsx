import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Survey() {
  const [step] = useState(2);
  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const emojis = [
    { label: 'Nada', icon: '😫' },
    { label: 'Poco', icon: '😔' },
    { label: 'Neutro', icon: '😐', active: true },
    { label: 'Bien', icon: '🙂' },
    { label: 'Muy', icon: '🤩' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col h-full"
    >
      <div className="w-full mb-10 pt-4">
        <h2 className="font-black text-[#003342] text-3xl mb-4 tracking-tight leading-tight">¿Cómo estás últimanente?</h2>
        <p className="text-on-surface-variant font-semibold text-sm leading-relaxed max-w-[280px]">Tus respuestas son confidenciales y nos ayudan a apoyarte mejor.</p>
      </div>

      {/* Progress */}
      <div className="w-full mb-12">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary/70">Pregunta {step} de {totalSteps}</span>
          <span className="text-[10px] font-black text-primary tracking-widest">{Math.round(progress)}%</span>
        </div>
        <div className="h-2.5 w-full bg-surface-container-low rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-primary rounded-full shadow-sm"
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full bg-surface-container-lowest p-10 rounded-lg shadow-sm mb-12 flex flex-col items-center text-center relative overflow-hidden border border-on-surface/5">
        <div className="w-16 h-16 bg-primary-container/40 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-black text-on-surface leading-snug tracking-tight">¿Qué tan motivado te sientes con tu carrera?</h3>
      </div>

      {/* Emoji Scale */}
      <div className="w-full flex justify-between items-end gap-1 mb-16">
        {emojis.map((e) => (
          <div key={e.label} className="flex flex-col items-center gap-4 flex-1 group">
            <button className={`w-14 h-14 rounded-full transition-all flex items-center justify-center text-3xl active:scale-90 ${
              e.active 
                ? 'bg-primary-container/60 shadow-lg border-2 border-primary/20 scale-110' 
                : 'bg-surface-container-low hover:bg-surface-container-highest grayscale hover:grayscale-0'
            }`}>
              {e.icon}
            </button>
            <span className={`text-[9px] font-black uppercase tracking-widest ${e.active ? 'text-primary' : 'text-on-surface-variant/40'}`}>
              {e.label}
            </span>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button className="w-full py-5 bg-primary text-on-primary text-lg font-black rounded-xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
        Siguiente
        <ArrowRight className="w-6 h-6 border-2 border-white/20 rounded-full p-0.5" />
      </button>
    </motion.div>
  );
}
