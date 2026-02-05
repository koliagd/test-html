import React from 'react';
import { SoundButton } from './components/SoundButton';
import { Zap } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-red-600/20 rounded-full blur-3xl opacity-50 animate-pulse delay-1000"></div>
      </div>

      <div className="z-10 text-center space-y-8 p-6">
        <header className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">
            Epland Soundboard
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-light">
            Нажмите кнопку, чтобы воспроизвести звук
          </p>
        </header>

        <main className="flex justify-center items-center py-12">
          <div className="p-10 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl">
            <SoundButton 
              soundUrl="0x01be5440.mp3" 
              label="ВЫСТРЕЛ" 
            />
          </div>
        </main>

        <footer className="text-slate-500 text-sm">
          <div className="flex items-center justify-center gap-2">
            <Zap size={16} />
            <span>Powered by George Technologies (Blue)</span>
          </div>
          <p className="mt-2 text-xs opacity-50">.mp3 file must be present in root directory</p>
        </footer>
      </div>
    </div>
  );
};

export default App;