export interface Post {
  id: string;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

export interface CreatePostData {
  title: string;
  category: string[];
  description: string;
  coverImage: string;
  content: string;
}

export const Category = {
  All: 'All',
  Finance: 'FINANCE',
  Tech: 'TECH',
  Career: 'CAREER',
  Education: 'EDUCATION',
  Regulations: 'REGULATIONS'
} as const;

export type CategoryType = typeof Category[keyof typeof Category];
