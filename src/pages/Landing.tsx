import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TabType = 'intro' | 'target' | 'vision';

export default function Landing() {
  const [activeTab, setActiveTab] = useState<TabType>('intro');
  const navigate = useNavigate();

  const renderVisual = () => {
    switch (activeTab) {
      case 'intro':
        return (
          <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
            <img src={`${import.meta.env.BASE_URL}images/intro.png`} alt="Intro Visual" className="w-full h-full object-contain drop-shadow-xl" />
          </div>
        );
      case 'target':
        return (
          <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
            <img src={`${import.meta.env.BASE_URL}images/target.png`} alt="Target Mockup" className="w-full h-full object-contain drop-shadow-2xl" />
          </div>
        );
      case 'vision':
        return (
          <div className="relative w-72 h-72 mx-auto flex items-center justify-center">
            <img src={`${import.meta.env.BASE_URL}images/vision.png`} alt="Vision Network" className="w-full h-full object-contain drop-shadow-md" />
          </div>
        );
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'intro':
        return (
          <div className="animate-fade-in-up flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">같은 원두, 다른 감각.<br/>그 변주의 기록.</h2>
            <p className="text-[var(--color-on-surface-variant)] text-lg max-w-lg leading-relaxed">
              카페라는 공간의 공기를 사랑하고, 집에서 레시피 연구를 즐기는 연구가입니다. 원두 한 알에 담긴 무한한 가능성을 추출 기록을 통해 아카이브합니다.
            </p>
          </div>
        );
      case 'target':
        return (
          <div className="animate-fade-in-up flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">모든 바리스타를 위한<br/>정교한 로그, CERA.</h2>
            <p className="text-[var(--color-on-surface-variant)] text-lg max-w-lg leading-relaxed">
              홈바리스타의 세밀한 취미부터 현직 바리스타의 전문적인 루틴까지. 누구나 쉽게 자신의 추출 데이터를 기록하고 관리할 수 있는 도구를 배포합니다.
            </p>
          </div>
        );
      case 'vision':
        return (
          <div className="animate-fade-in-up flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">기록을 넘어 연결로,<br/>새로운 커피 문화.</h2>
            <p className="text-[var(--color-on-surface-variant)] text-lg max-w-lg leading-relaxed">
              CERA의 최종 목적지는 커뮤니티입니다. 개인의 기록이 데이터가 되고, 그 데이터가 전 세계 커피인들의 영감이 되는 글로벌 커뮤니티로 나아갑니다.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-[var(--color-surface)] text-[var(--color-on-surface)] flex flex-col selection:bg-[var(--color-accent)] selection:text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-8">
        <div className="text-2xl font-bold tracking-tighter cursor-pointer" onClick={() => navigate('/dashboard')}>
          CERA.
        </div>
        <button 
          onClick={() => navigate('/dashboard')}
          className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
        >
          앱 시작하기 &rarr;
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-16">
        
        {/* Navigation Tabs */}
        <nav className="flex gap-8 mb-16">
          <button 
            onClick={() => setActiveTab('intro')}
            className={`text-lg transition-colors duration-300 relative pb-2 ${activeTab === 'intro' ? 'text-[var(--color-on-surface)] font-semibold' : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-accent)]'}`}
          >
            소개
            {activeTab === 'intro' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-accent)] rounded-full layout-transition" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('target')}
            className={`text-lg transition-colors duration-300 relative pb-2 ${activeTab === 'target' ? 'text-[var(--color-on-surface)] font-semibold' : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-accent)]'}`}
          >
            목표
            {activeTab === 'target' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-accent)] rounded-full layout-transition" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('vision')}
            className={`text-lg transition-colors duration-300 relative pb-2 ${activeTab === 'vision' ? 'text-[var(--color-on-surface)] font-semibold' : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-accent)]'}`}
          >
            비전
            {activeTab === 'vision' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-accent)] rounded-full layout-transition" />
            )}
          </button>
        </nav>

        {/* Content Area */}
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 flex justify-center md:justify-end" key={`visual-${activeTab}`}>
            {renderVisual()}
          </div>
          <div className="order-1 md:order-2 flex justify-center md:justify-start" key={`content-${activeTab}`}>
            {renderContent()}
          </div>
        </div>
        
      </main>
    </div>
  );
}
