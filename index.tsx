import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { Zap, Volume2, AlertCircle } from 'lucide-react';

// --- COMPONENTS ---

interface SoundButtonProps {
  soundUrl: string;
  label?: string;
}

const SoundButton: React.FC<SoundButtonProps> = ({ soundUrl, label = "PLAY" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  
  const playSound = useCallback(() => {
    try {
      setError(false);
      setIsPlaying(true);
      
      const audio = new Audio(soundUrl);
      
      audio.onended = () => {
        // Audio finished
      };

      audio.onerror = (e) => {
        console.error("Failed to load audio:", e);
        setError(true);
        setIsPlaying(false);
      };

      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setTimeout(() => setIsPlaying(false), 150);
          })
          .catch((error) => {
            console.error("Audio playback failed:", error);
            setError(true);
            setIsPlaying(false);
          });
      }
    } catch (err) {
      console.error("Error initializing audio:", err);
      setError(true);
      setIsPlaying(false);
    }
  }, [soundUrl]);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={playSound}
        className={`
          relative group w-48 h-48 rounded-full 
          border-8 border-slate-700
          flex items-center justify-center
          transition-all duration-100 ease-out
          outline-none focus:ring-4 focus:ring-red-500/50
          shadow-[0_10px_20px_rgba(0,0,0,0.5),inset_0_-5px_10px_rgba(0,0,0,0.3)]
          active:scale-95 active:shadow-[0_2px_5px_rgba(0,0,0,0.5),inset_0_2px_5px_rgba(0,0,0,0.3)]
          ${isPlaying ? 'bg-red-600 scale-95 shadow-inner' : 'bg-red-500 hover:bg-red-400 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(220,38,38,0.4)]'}
        `}
        aria-label="Play Sound"
      >
        <div className="absolute top-4 left-10 w-16 h-8 bg-white/20 rounded-full blur-md skew-x-12 pointer-events-none"></div>
        <div className="flex flex-col items-center justify-center text-white z-10 pointer-events-none select-none">
          {error ? (
            <AlertCircle size={48} className="text-red-900 mb-2" />
          ) : (
            <Volume2 
              size={48} 
              className={`mb-2 transition-transform duration-100 ${isPlaying ? 'scale-125' : 'scale-100'}`} 
            />
          )}
          <span className="font-black text-xl tracking-wider uppercase drop-shadow-md">
            {error ? "ERROR" : label}
          </span>
        </div>
        <span className="absolute inset-0 rounded-full overflow-hidden">
             {isPlaying && (
                <span className="absolute inset-0 rounded-full bg-white/30 animate-ping"></span>
             )}
        </span>
      </button>
      
      {error && (
         <p className="text-red-400 text-sm font-medium animate-pulse max-w-[200px] text-center">
            File "{soundUrl}" not found.
         </p>
      )}
    </div>
  );
};

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
            {/* Note: Path is relative to index.html */}
            <SoundButton 
              soundUrl="./0x01be5440.mp3" 
              label="ВЫСТРЕЛ" 
            />
          </div>
        </main>

        <footer className="text-slate-500 text-sm">
          <div className="flex items-center justify-center gap-2">
            <Zap size={16} />
            <span>Powered by George Technologies (Blue)</span>
          </div>
          <p className="mt-2 text-xs opacity-50">.mp3 file must be in the root folder</p>
        </footer>
      </div>
    </div>
  );
};

// --- RENDER ---

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);