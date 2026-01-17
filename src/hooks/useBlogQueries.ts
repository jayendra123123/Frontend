import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogApi } from '../services/blogApi';

// Query keys
export const blogKeys = {
  all: ['blogs'] as const,
  detail: (id: string) => ['blogs', id] as const,
};

// Get all blogs
export const useGetAllBlogs = () => {
  return useQuery({
    queryKey: blogKeys.all,
    queryFn: blogApi.getAllBlogs,
  });
};

// Get blog by ID
export const useGetBlogById = (id: string) => {
  return useQuery({
    queryKey: blogKeys.detail(id),
    queryFn: () => blogApi.getBlogById(id),
    enabled: !!id,
  });
};

// Create a new blog
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogApi.createBlog,
    onSuccess: () => {
      // Invalidate and refetch all blogs query
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
    },
  });
};
