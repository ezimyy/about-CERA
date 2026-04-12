import { Outlet } from 'react-router-dom';
import { AppBar } from './components/organisms/AppBar';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-on-surface)] selection:bg-[var(--color-primary-container)] selection:text-white">
      <AppBar />
      <main className="max-w-md mx-auto relative">
        <Outlet />
      </main>
    </div>
  );
}
