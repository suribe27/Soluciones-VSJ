import { useState } from 'react';
import { Signal, Wifi, BatteryFull } from 'lucide-react';
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

export default function App() {
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

  const notasScore = appState.subjects.length > 0
    ? (appState.subjects.reduce((a, s) => a + s.score, 0) / appState.subjects.length / 5) * 100 * 0.5
    : 0;

  const surveyScore = appState.surveyAnswers.length === 6
    ? (appState.surveyAnswers.reduce((a, b) => a + b, 0) / 30) * 100 * 0.5
    : 0;

  const finalScore = Math.round(notasScore + surveyScore);

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
              <button onClick={() => setScreen('subjects')} className="mt-4 bg-primary text-on-primary font-black px-8 py-3 rounded-xl">
                Ir a Notas
              </button>
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
        return <Subjects
          subjects={appState.subjects}
          onUpdate={(subjects) => updateState({ ...appState, subjects })}
        />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard setScreen={setScreen} score={finalScore} recommendation={getRecommendation(finalScore)} />;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-md mx-auto relative" style={{height: '100dvh'}}>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-on-surface/10 rounded-full z-[60]" />

        <main className="absolute inset-0 overflow-y-auto pt-12 pb-40 px-6 scroll-smooth editorial-glow">
          {renderScreen()}
        </main>

        <BottomNav currentScreen={currentScreen} setScreen={setScreen} />
      </div>
    </div>
  );
}
