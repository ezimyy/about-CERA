import type { Recipe } from '../../types';
import { Typography } from '../atoms/Typography';
import { useBrewStore } from '../../store/useBrewStore';

export const BrewCard = ({ recipe }: { recipe: Recipe }) => {
  const beans = useBrewStore((state) => state.beans);
  const bean = beans.find(b => b.id === recipe.beanId);

  return (
    <div className="bg-[var(--color-surface-container)] rounded-md p-5 flex flex-col gap-4 relative overflow-hidden">
      {/* Accent left border */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-primary)] opacity-80" />
      
      <div>
        <Typography variant="headline-sm" className="mb-1">{bean?.name || 'Unknown Bean'}</Typography>
        <Typography variant="label-sm">{recipe.date.split('T')[0]} • {recipe.tool}</Typography>
      </div>
      
      <div className="flex justify-between mt-2 pt-4 border-t border-[var(--color-outline-variant)]/20">
        <div className="flex flex-col">
          <Typography variant="label-sm">Dose</Typography>
          <Typography variant="body-lg" className="text-[var(--color-on-surface)]">{recipe.dose}g</Typography>
        </div>
        <div className="flex flex-col">
          <Typography variant="label-sm">Water</Typography>
          <Typography variant="body-lg" className="text-[var(--color-on-surface)]">{recipe.water}ml</Typography>
        </div>
        <div className="flex flex-col">
          <Typography variant="label-sm">Time</Typography>
          <Typography variant="body-lg" className="text-[var(--color-on-surface)]">
            {Math.floor(recipe.totalTime / 60)}:{String(recipe.totalTime % 60).padStart(2, '0')}
          </Typography>
        </div>
      </div>
    </div>
  );
};
