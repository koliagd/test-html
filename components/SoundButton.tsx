import React, { useState, useRef, useCallback } from 'react';
import { Volume2, AlertCircle } from 'lucide-react';

interface SoundButtonProps {
  soundUrl: string;
  label?: string;
}

export const SoundButton: React.FC<SoundButtonProps> = ({ soundUrl, label = "PLAY" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  
  // Use a ref to hold the audio instance so we don't recreate it on every render
  // We initialize it lazily in the click handler or effect if needed, 
  // but for simple SFX, creating a new Audio on click allows rapid fire overlap.
  // However, to track 'isPlaying' state for UI, we might want a single instance or managed instances.
  // For a gunshot, users often want "spamability". 
  
  const playSound = useCallback(() => {
    try {
      setError(false);
      setIsPlaying(true);
      
      // We create a new Audio instance each time to allow overlapping sounds (rapid fire)
      const audio = new Audio(soundUrl);
      
      audio.onended = () => {
        // We only set isPlaying to false if this was the last one, 
        // but since we want rapid fire visual feedback, we'll use a timeout for the button animation
        // and just let the audio finish on its own.
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
            // Audio started playing
            // Reset visual state after a short delay to simulate "recoil"
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
          relative
          group
          w-48 h-48 rounded-full 
          border-8 border-slate-700
          flex items-center justify-center
          transition-all duration-100 ease-out
          outline-none focus:ring-4 focus:ring-red-500/50
          shadow-[0_10px_20px_rgba(0,0,0,0.5),inset_0_-5px_10px_rgba(0,0,0,0.3)]
          active:scale-95 active:shadow-[0_2px_5px_rgba(0,0,0,0.5),inset_0_2px_5px_rgba(0,0,0,0.3)]
          ${isPlaying ? 'bg-red-600 scale-95 shadow-inner' : 'bg-red-500 hover:bg-red-400 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(220,38,38,0.4)]'}
        `}
        aria-label="Play Gunshot Sound"
      >
        {/* Inner glare effect */}
        <div className="absolute top-4 left-10 w-16 h-8 bg-white/20 rounded-full blur-md skew-x-12 pointer-events-none"></div>
        
        {/* Icon/Text */}
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

        {/* Ripple effect container */}
        <span className="absolute inset-0 rounded-full overflow-hidden">
             {isPlaying && (
                <span className="absolute inset-0 rounded-full bg-white/30 animate-ping"></span>
             )}
        </span>
      </button>
      
      {error && (
         <p className="text-red-400 text-sm font-medium animate-pulse max-w-[200px] text-center">
            File "{soundUrl}" not found. Please add it to the root folder.
         </p>
      )}
    </div>
  );
};