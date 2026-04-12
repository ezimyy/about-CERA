import { Coffee, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';

export const AppBar = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 glass-header z-50 flex items-center justify-between px-6 border-b border-[var(--color-outline-variant)]/10">
      <Link to="/" className="flex items-center gap-2 group">
        <Coffee className="w-6 h-6 text-[var(--color-primary)] group-hover:opacity-80 transition-opacity" strokeWidth={1.5} />
        <Typography variant="headline-sm" className="text-xl tracking-tighter">CERA</Typography>
      </Link>
      
      {location.pathname !== '/new' && (
        <Link to="/new">
          <Button variant="ghost" size="icon">
            <Plus className="w-5 h-5 text-[var(--color-primary)]" strokeWidth={1.5} />
          </Button>
        </Link>
      )}
    </header>
  );
};
