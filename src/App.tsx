
import React, { useState, useMemo } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ArticleView from './components/ArticleView';
import CreateBlogModal from './components/CreateBlogModal';
import Footer from './components/Footer';
import { Category } from './types';
import { useGetAllBlogs } from './hooks/useBlogQueries';

const App: React.FC = () => {
  const { data: posts = [], isLoading, error } = useGetAllBlogs();
  const [selectedPostId, setSelectedPostId] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>(Category.All);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMobileArticleOpen, setIsMobileArticleOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  // Track window resize for mobile detection
  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileArticleOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set first post as selected when posts are loaded
  React.useEffect(() => {
    if (posts.length > 0 && !selectedPostId) {
      setSelectedPostId(posts[0].id);
      // Don't auto-open on mobile
      if (!isMobile) {
        setIsMobileArticleOpen(false);
      }
    }
  }, [posts, selectedPostId, isMobile]);

  // Handle post selection
  const handlePostSelect = (postId: string) => {
    setSelectedPostId(postId);
    if (isMobile) {
      setIsMobileArticleOpen(true);
    }
  };

  // Handle closing mobile article
  const handleCloseMobileArticle = () => {
    setIsMobileArticleOpen(false);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = activeCategory === Category.All || post.category.includes(activeCategory);
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const selectedPost = useMemo(() => {
    return posts.find((p) => p.id === selectedPostId) || null;
  }, [posts, selectedPostId]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-2">Error loading blogs</p>
          <p className="text-gray-500 text-sm">Make sure JSON server is running on port 3001</p>
          <p className="text-gray-400 text-xs mt-2">Run: npm run server</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark overflow-x-hidden w-full">
      <Header 
        onCreateClick={() => setIsModalOpen(true)} 
        onSearch={setSearchQuery}
      />
      
      <main className="flex-1 flex flex-col md:flex-row w-full">
        <Sidebar 
          posts={filteredPosts} 
          selectedPostId={selectedPostId} 
          activeCategory={activeCategory}
          onPostSelect={handlePostSelect}
          onCategorySelect={setActiveCategory}
          isLoading={isLoading}
        />
        
        <ArticleView 
          post={selectedPost} 
          isLoading={isLoading}
          onClose={handleCloseMobileArticle}
          isMobile={isMobile && isMobileArticleOpen}
        />
      </main>

      <Footer />

      <CreateBlogModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default App;
