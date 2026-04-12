import { useState } from 'react';
import { LogForm } from '../components/organisms/LogForm';
import { Stopwatch } from '../components/molecules/Stopwatch';
import { Typography } from '../components/atoms/Typography';

export default function NewBrew() {
  const [brewTime, setBrewTime] = useState(0);

  return (
    <div className="pt-24 px-6 pb-48 min-h-screen flex flex-col relative overflow-hidden">
      <div className="mb-8 pl-4 border-l-[3px] border-[var(--color-primary)]">
        <Typography variant="headline-sm" className="text-3xl tracking-tight">Record<br/>Extraction.</Typography>
      </div>

      <LogForm brewTime={brewTime} />
      
      {/* Sticky Bottom Timer Bar */}
      <div className="fixed bottom-0 left-0 right-0 glass-header border-t border-[var(--color-outline-variant)]/20 p-6 flex flex-col gap-4 animate-in slide-in-from-bottom duration-500 z-40">
        <Stopwatch onTimeUpdate={setBrewTime} />
      </div>
    </div>
  );
}
