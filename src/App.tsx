import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import BottomNav from './components/BottomNav';
import Dashboard from './screens/Dashboard';
import Results from './screens/Results';
import Survey from './screens/Survey';
import Subjects from './screens/Subjects';
import Profile from './screens/Profile';
import { Screen, AppState } from './types';

function getRecommendation(score: number): string {
  if (score >= 80) return '¡Vas muy bien! Mantén tu ritmo. Recuerda que puedes consultar tutorías si lo necesitas.';
  if (score >= 60) return 'Te recomendamos asistir a tutoría académica y hablar con tu consejero esta semana.';
  if (score >= 40) return 'Es importante que te comuniques con bienestar universitario lo antes posible.';
  if (score === 0) return 'Registra tus notas y completa la encuesta para ver tu resultado.';
  return 'Un asesor se pondrá en contacto contigo. No estás solo, hay apoyo disponible.';
}

function Login({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }
    if (!email.endsWith('@soyudemedellin.edu.co')) {
      setError('Debes usar tu correo institucional @soyudemedellin.edu.co');
      return;
    }
    onLogin(email);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="flex flex-col min-h-screen items-center justify-center px-6 editorial-glow">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="w-20 h-20 bg-primary rounded-3xl mx-auto flex items-center justify-center shadow-xl shadow-primary/20">
            <span className="text-4xl">🎓</span>
          </div>
          <h1 className="text-3xl font-black text-on-surface tracking-tight">VSJ Alerta Temprana</h1>
          <p className="text-on-surface-variant text-sm font-medium">Universidad de Medellín</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50" />
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              placeholder="correo@soyudemedellin.edu.co"
              className="w-full bg-surface-container-lowest rounded-2xl pl-12 pr-4 py-4 text-sm font-semibold text-on-surface outline-none shadow-sm border border-on-surface/5 focus:border-primary/30 transition-colors"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50" />
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              placeholder="Contraseña"
              className="w-full bg-surface-container-lowest rounded-2xl pl-12 pr-4 py-4 text-sm font-semibold text-on-surface outline-none shadow-sm border border-on-surface/5 focus:border-primary/30 transition-colors"
            />
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-red-600 text-xs font-semibold">{error}</p>
            </motion.div>
          )}

          <button onClick={handleLogin}
            className="w-full bg-primary text-on-primary font-black py-4 rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all text-base mt-2">
            Ingresar
          </button>
        </div>

        <p className="text-center text-xs text-on-surface-variant/50 font-medium">
          Solo para estudiantes con correo institucional UdeM
        </p>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('vsj-session'));
  const [currentScreen, setScreen] = useState<Screen>('home');

  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem('vsj-data');
    return saved ? JSON.parse(saved) : {
      studentName: 'Carlos',
      subjects: [],
      surveyAnswers: [],
      lastSurveyDate: null,
    };
  });

  const updateState = (newState: AppState) => {
    setAppState(newState);
    localStorage.setItem('vsj-data', JSON.stringify(newState));
  };

  const handleLogin = (email: string) => {
    localStorage.setItem('vsj-session', email);
    setLoggedIn(true);
  };

  const notasScore = appState.subjects.length > 0
    ? (appState.subjects.reduce((a, s) => a + s.score, 0) / appState.subjects.length / 5) * 100 * 0.5
    : 0;

  const surveyScore = appState.surveyAnswers.length === 6
    ? (appState.surveyAnswers.reduce((a, b) => a + b, 0) / 30) * 100 * 0.5
    : 0;

  const finalScore = Math.round(notasScore + surveyScore);

  if (!loggedIn) return (
    <div className="w-full max-w-md mx-auto" style={{ height: '100dvh' }}>
      <Login onLogin={handleLogin} />
    </div>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Dashboard setScreen={setScreen} score={finalScore} recommendation={getRecommendation(finalScore)} />;
      case 'results':
        return <Results score={finalScore} notasScore={Math.round(notasScore)} surveyScore={Math.round(surveyScore)} />;
      case 'survey':
        if (appState.subjects.length === 0) {
          return (
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-20">
              <span className="text-5xl">📚</span>
              <h2 className="text-2xl font-black text-on-surface">Primero registra tus notas</h2>
              <p className="text-on-surface-variant text-sm font-medium">Necesitas tener al menos una materia registrada antes de hacer la encuesta.</p>
              <button onClick={() => setScreen('subjects')} className="mt-4 bg-primary text-on-primary font-black px-8 py-3 rounded-xl">Ir a Notas</button>
            </div>
          );
        }
        return <Survey
          onComplete={(answers) => {
            const newState = { ...appState, surveyAnswers: answers, lastSurveyDate: new Date().toISOString() };
            updateState(newState);
            setScreen('results');
          }}
          lastSurveyDate={appState.lastSurveyDate}
        />;
      case 'subjects':
        return <Subjects subjects={appState.subjects} onUpdate={(subjects) => updateState({ ...appState, subjects })} />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard setScreen={setScreen} score={finalScore} recommendation={getRecommendation(finalScore)} />;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-md mx-auto relative" style={{ height: '100dvh' }}>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-on-surface/10 rounded-full z-[60]" />
        <main className="absolute inset-0 overflow-y-auto pt-12 pb-40 px-6 scroll-smooth editorial-glow">
          {renderScreen()}
        </main>
        <BottomNav currentScreen={currentScreen} setScreen={setScreen} />
      </div>
    </div>
  );
}
