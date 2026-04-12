import { useEffect, useState } from 'react';
import { useBrewStore } from '../store/useBrewStore';
import { BrewCard } from '../components/molecules/BrewCard';
import { Typography } from '../components/atoms/Typography';
import { Input } from '../components/atoms/Input';
import { Search } from 'lucide-react';

export default function Dashboard() {
  const { recipes, fetchData, isLoading } = useBrewStore();
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filtered = recipes.filter(r => 
    r.tool.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-24 px-6 pb-24 min-h-screen">
      <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Typography variant="label-sm" className="text-[var(--color-primary)]">Overview</Typography>
        <Typography variant="display-md" className="mt-2">Recent<br/>Brews.</Typography>
      </div>

      <div className="relative mb-8 text-[var(--color-on-surface-variant)]">
        <Search className="absolute left-0 top-6 w-5 h-5 opacity-50" />
        <Input 
          placeholder="Filter by tool (e.g. V60)" 
          className="pl-8 !text-lg !font-body !h-14"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--color-primary)] border-t-transparent animate-spin" />
        </div>
      ) : filtered.length > 0 ? (
        <div className="flex flex-col gap-6">
          {filtered.map(recipe => (
            <BrewCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center border border-[var(--color-outline-variant)]/10 rounded-lg bg-[var(--color-surface-container-low)]">
          <Typography variant="body-lg">No recipes found. Let's brew something.</Typography>
        </div>
      )}
    </div>
  );
}
