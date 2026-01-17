import React, { useEffect, useState } from 'react';
import type { Post } from '../types';

interface ArticleViewProps {
  post: Post | null;
  isLoading: boolean;
}

const ArticleView: React.FC<ArticleViewProps> = ({ post, isLoading }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const mainArea = document.getElementById('article-content-area');
    if (!mainArea) return;

    const handleScroll = () => {
      const scrollTotal = mainArea.scrollHeight - mainArea.clientHeight;
      if (scrollTotal > 0) {
        setScrollProgress((mainArea.scrollTop / scrollTotal) * 100);
      }
    };

    mainArea.addEventListener('scroll', handleScroll);
    return () => mainArea.removeEventListener('scroll', handleScroll);
  }, [post]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleShare = async () => {
    if (!post) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled or failed:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy link');
      });
    }
  };

  const handleSave = () => {
    if (!post) return;
    
    setIsSaved(!isSaved);
    
    // Save to localStorage
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
    if (!isSaved) {
      savedPosts.push(post.id);
      localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
      alert('Post saved!');
    } else {
      const filtered = savedPosts.filter((id: string) => id !== post.id);
      localStorage.setItem('savedPosts', JSON.stringify(filtered));
      alert('Post removed from saved');
    }
  };

  // Check if post is saved on load
  useEffect(() => {
    if (post) {
      const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
      setIsSaved(savedPosts.includes(post.id));
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary mb-4">progress_activity</span>
          <p className="text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background-light dark:bg-background-dark text-gray-400">
        <p>Select an article to view details</p>
      </div>
    );
  }

  return (
    <section id="article-content-area" className="flex-1 bg-background-light dark:bg-background-dark overflow-y-auto scroll-smooth relative">
      {/* Progress Bar */}
      <div className="sticky top-0 z-10 w-full h-1 bg-gray-100 dark:bg-gray-800">
        <div className="bg-primary h-full transition-all duration-75" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <div className="max-w-[800px] mx-auto py-12 px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-8">
          <a className="hover:text-primary transition-colors" href="#">Dashboard</a>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <a className="hover:text-primary transition-colors" href="#">
            {post.category[0] || 'Blog'}
          </a>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="text-gray-600 dark:text-gray-300">Article View</span>
        </nav>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              {post.category.map((cat) => (
                <span 
                  key={cat}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary"
                >
                  {cat}
                </span>
              ))}
            </div>
            <div className="h-4 w-px bg-gray-200 dark:bg-gray-700"></div>
            <time className="text-xs text-gray-400">{formatDate(post.date)}</time>
          </div>
          
          <h1 className="heading-font text-4xl md:text-5xl font-bold leading-[1.1] mb-6 tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            {post.description}
          </p>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-lg">share</span> Share
            </button>
            <button 
              onClick={handleSave}
              className={`flex items-center gap-2 text-xs font-bold transition-colors ${
                isSaved ? 'text-primary' : 'text-gray-500 hover:text-primary'
              }`}
            >
              <span className={`material-symbols-outlined text-lg ${isSaved ? 'fill' : ''}`}>
                {isSaved ? 'bookmark' : 'bookmark'}
              </span> 
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </header>

        {/* Cover Image */}
        <div className="rounded-xl overflow-hidden mb-12 shadow-xl ring-1 ring-black/5 aspect-[21/9]">
          <div 
            className="w-full h-full bg-center bg-cover hover:scale-105 transition-transform duration-700" 
            style={{ backgroundImage: `url('${post.coverImage}')` }}
          ></div>
        </div>

        {/* Article Content */}
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <div className="text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </article>
      </div>
    </section>
  );
};

export default ArticleView;
