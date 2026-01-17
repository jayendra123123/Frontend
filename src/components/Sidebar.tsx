
import React from 'react';
import type { Post } from '../types';
import { Category } from '../types';

interface SidebarProps {
  posts: Post[];
  selectedPostId: string;
  activeCategory: string;
  onPostSelect: (id: string) => void;
  onCategorySelect: (category: string) => void;
  isLoading: boolean;
}

const CATEGORIES = Object.values(Category);

const Sidebar: React.FC<SidebarProps> = ({ 
  posts, 
  selectedPostId, 
  activeCategory, 
  onPostSelect, 
  onCategorySelect,
  isLoading
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <aside className="w-full md:w-[400px] flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/50 md:sticky md:top-0 md:h-screen overflow-y-auto shrink-0">
      <div className="p-4 sm:p-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold heading-font">Recent Posts</h2>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest">
            {isLoading ? '...' : `${posts.length} Total`}
          </span>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategorySelect(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        {isLoading ? (
          <div className="p-12 text-center text-gray-400 text-sm">
            <span className="material-symbols-outlined animate-spin text-2xl mb-2">progress_activity</span>
            <p>Loading blogs...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">
            No articles found.
          </div>
        ) : (
          posts.map((post) => (
            <div 
              key={post.id}
              onClick={() => onPostSelect(post.id)}
              className={`p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800 cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                selectedPostId === post.id ? 'border-l-4 border-l-primary bg-primary/5' : 'border-l-4 border-l-transparent'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {post.category.map((cat) => (
                  <span 
                    key={cat}
                    className={`px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold uppercase ${
                      selectedPostId === post.id ? 'bg-primary/20 text-primary' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-tight mb-2">
                {post.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {post.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] text-gray-400">{formatDate(post.date)}</span>
                {selectedPostId === post.id && (
                  <span className="material-symbols-outlined text-primary text-sm animate-pulse">arrow_forward_ios</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
