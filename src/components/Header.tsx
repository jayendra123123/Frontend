
import React from 'react';

interface HeaderProps {
  onCreateClick: () => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateClick, onSearch }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-background-dark/95 backdrop-blur-md shadow-lg">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-1.5 rounded-lg text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">auto_awesome</span>
            </div>
            <h1 className="heading-font text-xl font-bold tracking-tight">CA Monk Blog</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
            <input 
              className="bg-gray-100 dark:bg-gray-800 border-none rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-primary transition-all outline-none" 
              placeholder="Search articles..." 
              type="text"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={onCreateClick}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Create New Blog</span>
          </button>
          <div 
            className="h-10 w-10 rounded-full bg-cover bg-center border-2 border-white dark:border-gray-700 shadow-sm cursor-pointer" 
            style={{ backgroundImage: `url('https://picsum.photos/100/100?random=10')` }}
          ></div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-4 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-4" preserveAspectRatio="none" viewBox="0 0 1440 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0C240 20 480 20 720 10C960 0 1200 0 1440 10V0H0Z" className="fill-white dark:fill-background-dark opacity-95"/>
        </svg>
      </div>
    </header>
  );
};

export default Header;
