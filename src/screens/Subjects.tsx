import { motion } from 'motion/react';
import { Pencil, Plus, Star } from 'lucide-react';

export default function Subjects() {
  const subjects = [
    { name: 'Cálculo Diferencial', score: '3.8', color: 'bg-error-container' },
    { name: 'Fundamentos de Programación', score: '4.5', color: 'bg-primary-container' },
    { name: 'Física Mecánica', score: '4.1', color: 'bg-tertiary-container' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <section className="space-y-1 pl-2">
        <h2 className="text-3xl font-extrabold text-on-surface tracking-tight leading-none">Mis Materias</h2>
        <p className="text-on-surface/60 text-sm font-medium">Seguimiento académico actual</p>
      </section>

      <div className="space-y-4">
        {subjects.map((subject, idx) => (
          <motion.div
            key={subject.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-surface-container-lowest p-6 rounded-lg flex items-center justify-between shadow-sm border border-on-surface/5 active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-4">
              <div className={`w-1.5 h-12 ${subject.color} rounded-full`} />
              <div>
                <h3 className="font-bold text-on-surface text-sm uppercase tracking-wide">{subject.name}</h3>
                <span className="text-2xl font-black text-on-surface tracking-tighter">{subject.score}</span>
              </div>
            </div>
            <button className="w-11 h-11 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest transition-colors active:scale-90">
              <Pencil className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="bg-primary-container/20 border border-primary-container/30 p-8 rounded-xl flex flex-col items-center justify-center gap-2 mt-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 blur-2xl rounded-full -mr-16 -mt-16" />
        <span className="text-on-primary-container font-black text-[10px] uppercase tracking-widest relative z-10">Promedio General</span>
        <div className="flex items-center gap-3 relative z-10">
          <span className="text-5xl font-black text-primary tracking-tighter">4.1</span>
          <div className="bg-primary p-1.5 rounded-full shadow-lg">
            <Star className="w-5 h-5 text-on-primary fill-current" />
          </div>
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-32 right-8 w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-90 z-40 border-4 border-white">
        <Plus className="w-8 h-8" />
      </button>
    </motion.div>
  );
}
