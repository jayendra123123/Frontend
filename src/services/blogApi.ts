import type { Post, CreatePostData } from '../types';

const API_BASE_URL = 'http://localhost:3001';

export const blogApi = {
  // Get all blogs
  getAllBlogs: async (): Promise<Post[]> => {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    return response.json();
  },

  // Get blog by ID
  getBlogById: async (id: string): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch blog with id: ${id}`);
    }
    return response.json();
  },

  // Create a new blog
  createBlog: async (data: CreatePostData): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        date: new Date().toISOString(),
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to create blog');
    }
    return response.json();
  },
};
