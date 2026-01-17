
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Category } from '../types';
import { useCreateBlog } from '../hooks/useBlogQueries';

interface CreateBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = Object.entries(Category)
  .filter(([key]) => key !== 'All')
  .map(([, value]) => value);

const CreateBlogModal: React.FC<CreateBlogModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const { mutate: createBlog, isPending } = useCreateBlog();

  if (!isOpen) return null;

  const handleAISummary = async () => {
    if (!title) return alert("Enter a title first");
    setIsGenerating(true);
    const result = await geminiService.generateSummary(title);
    setDescription(result);
    setIsGenerating(false);
  };

  const handleAIOutline = async () => {
    if (!title) return alert("Enter a title first");
    setIsGenerating(true);
    const result = await geminiService.suggestContentOutline(title);
    setContent(result);
    setIsGenerating(false);
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) 
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  };

  const handlePublish = () => {
    if (!title || !content) return alert("Title and Content are required");
    if (selectedCategories.length === 0) return alert("Select at least one category");

    createBlog(
      {
        title,
        category: selectedCategories,
        description: description || "A new interesting post.",
        content,
        coverImage: `https://images.pexels.com/photos/${Math.floor(Math.random() * 10000000)}/pexels-photo.jpeg`,
      },
      {
        onSuccess: () => {
          // Reset fields
          setTitle('');
          setSelectedCategories([]);
          setDescription('');
          setContent('');
          onClose();
        },
        onError: (error) => {
          alert(`Failed to create blog: ${error.message}`);
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-background-dark w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
          <h2 className="heading-font text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">edit_note</span>
            Create New Blog Post
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Title</label>
            <input 
              className="w-full rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 focus:ring-primary focus:border-primary transition-all px-4 py-2" 
              placeholder="Post Title" 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Categories (select multiple)</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedCategories.includes(cat)
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Description</label>
              <button 
                onClick={handleAISummary}
                disabled={isGenerating || !title}
                className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded flex items-center gap-1 hover:bg-primary/20 disabled:opacity-50 transition-all font-bold"
              >
                <span className="material-symbols-outlined text-xs">auto_awesome</span>
                AI Suggest
              </button>
            </div>
            <textarea 
              className="w-full rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 focus:ring-primary px-4 py-2" 
              placeholder="A brief overview..." 
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Content</label>
              <button 
                onClick={handleAIOutline}
                disabled={isGenerating || !title}
                className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded flex items-center gap-1 hover:bg-primary/20 disabled:opacity-50 transition-all font-bold"
              >
                <span className="material-symbols-outlined text-xs">auto_awesome</span>
                AI Draft
              </button>
            </div>
            <textarea 
              className="w-full rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 focus:ring-primary px-4 py-2 font-mono text-sm" 
              placeholder="Write something amazing..." 
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex gap-3 bg-gray-50/50 dark:bg-gray-800/20">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handlePublish}
            disabled={isPending || isGenerating}
            className="flex-1 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                Publishing...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">publish</span>
                Publish Post
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogModal;
