/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Signal, Wifi, BatteryFull } from 'lucide-react';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import Dashboard from './screens/Dashboard';
import Results from './screens/Results';
import Survey from './screens/Survey';
import Subjects from './screens/Subjects';
import Profile from './screens/Profile';
import { Screen } from './types';

export default function App() {
  const [currentScreen, setScreen] = useState<Screen>('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Dashboard setScreen={setScreen} />;
      case 'results':
        return <Results />;
      case 'survey':
        return <Survey />;
      case 'subjects':
        return <Subjects />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard setScreen={setScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-on-surface/5 flex items-center justify-center p-0 sm:p-4">
      <div className="app-container shadow-2xl sm:rounded-[3rem] border-[8px] border-on-surface/5">
        {/* Status Bar */}
        <div className="flex justify-between items-center px-10 pt-5 pb-2 w-full z-50 text-on-surface relative">
          <span className="text-sm font-black tracking-tight">9:41</span>
          <div className="flex items-center gap-2">
            <Signal className="w-4 h-4" />
            <Wifi className="w-4 h-4" />
            <BatteryFull className="w-4 h-4" />
          </div>
        </div>

        <TopBar />

        {/* Home Indicator (iPhone style) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-on-surface/10 rounded-full z-[60]" />

        <main className="h-full overflow-y-auto pt-24 pb-40 px-6 scroll-smooth editorial-glow">
          {renderScreen()}
        </main>

        <BottomNav currentScreen={currentScreen} setScreen={setScreen} />
      </div>
    </div>
  );
}
