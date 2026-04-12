import { Play, Square, RotateCcw } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';
import { useState, useEffect } from 'react';

interface StopwatchProps {
  onTimeUpdate: (timeMs: number) => void;
}

export const Stopwatch = ({ onTimeUpdate }: StopwatchProps) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {
          const newTime = prev + 100;
          onTimeUpdate(newTime);
          return newTime;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning, onTimeUpdate]);

  const toggle = () => setIsRunning(!isRunning);
  
  const reset = () => {
    setIsRunning(false);
    setTime(0);
    onTimeUpdate(0);
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    const msStr = Math.floor((ms % 1000) / 100).toString();
    return `${m}:${s}.${msStr}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[var(--color-surface-container)] rounded-lg">
      <Typography variant="display-lg" className="font-variant-numeric tabular-nums text-[var(--color-primary)]">
        {formatTime(time)}
      </Typography>
      
      <div className="flex items-center gap-4 mt-6">
        <Button variant="ghost" size="icon" onClick={reset}>
          <RotateCcw className="w-5 h-5 text-[var(--color-on-surface-variant)]" />
        </Button>
        <Button variant={isRunning ? "outline" : "primary"} onClick={toggle} className="w-32">
          {isRunning ? <Square className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
          {isRunning ? 'Stop' : 'Start'}
        </Button>
      </div>
    </div>
  );
};
