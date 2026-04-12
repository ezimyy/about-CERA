import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Typography } from '../atoms/Typography';
import { useBrewStore } from '../../store/useBrewStore';
import type { Recipe } from '../../types';

interface LogFormProps {
  onTimerStart?: () => void;
  brewTime: number; // passed down from NewBrew
}

export const LogForm = ({ onTimerStart, brewTime }: LogFormProps) => {
  const navigate = useNavigate();
  const { beans, addRecipe } = useBrewStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Recipe>>({
    dose: 18,
    water: 250,
    temperature: 94,
    tool: 'V60',
    grindSize: 'Medium',
  });

  const handleNext = () => setStep(s => Math.min(s + 1, 3));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const handleSave = async () => {
    if (!formData.beanId) return;
    const recipe: Recipe = {
      ...(formData as Recipe),
      id: `recipe-${Date.now()}`,
      totalTime: Math.floor(brewTime / 1000), // using brewTime from parent
      date: new Date().toISOString(),
    };
    await addRecipe(recipe);
    navigate('/');
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Steps indicator */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full ${step >= i ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-surface-container-high)]'}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <Typography variant="headline-sm">Select Bean</Typography>
          <div className="flex flex-col gap-4">
            {beans.map(bean => (
              <button
                key={bean.id}
                onClick={() => setFormData({ ...formData, beanId: bean.id })}
                className={`text-left p-4 rounded-md border ${formData.beanId === bean.id ? 'border-[var(--color-primary)] bg-[var(--color-surface-container)]' : 'border-transparent bg-[var(--color-surface-container-low)]'} transition-colors`}
              >
                <Typography variant="body-lg" className="font-semibold text-white">{bean.name}</Typography>
                <Typography variant="label-sm" className="mt-1">{bean.roastery}</Typography>
              </button>
            ))}
          </div>
          <Button onClick={handleNext} disabled={!formData.beanId} className="mt-4">Next: Variables</Button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <Typography variant="headline-sm">Brew Variables</Typography>
          
          <div className="grid grid-cols-2 gap-6">
            <Input 
              label="Dose (g)" 
              type="number" 
              value={formData.dose} 
              onChange={e => setFormData({ ...formData, dose: Number(e.target.value) })} 
            />
            <Input 
              label="Water (ml)" 
              type="number" 
              value={formData.water} 
              onChange={e => setFormData({ ...formData, water: Number(e.target.value) })} 
            />
            <Input 
              label="Temp (°C)" 
              type="number" 
              value={formData.temperature} 
              onChange={e => setFormData({ ...formData, temperature: Number(e.target.value) })} 
            />
            <Input 
              label="Tool" 
              type="text" 
              value={formData.tool} 
              onChange={e => setFormData({ ...formData, tool: e.target.value })} 
            />
          </div>

          <div className="flex gap-4 mt-6">
            <Button variant="ghost" onClick={handlePrev} className="flex-1">Back</Button>
            <Button onClick={() => {
              handleNext();
              onTimerStart?.();
            }} className="flex-1">Next: Brew</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <Typography variant="headline-sm">Brewing & Notes</Typography>
          <Typography variant="body-lg">Use the timer below to record your brew. Once finished, save your log.</Typography>
          
          <div className="h-40"></div> {/* Spacer for the fixed timer that will be placed by parent */}
          
          <div className="flex gap-4 mt-6 z-50">
            <Button variant="ghost" onClick={handlePrev} className="flex-1">Back</Button>
            <Button onClick={handleSave} className="flex-1" variant="primary">Save Log</Button>
          </div>
        </div>
      )}
    </div>
  );
};
