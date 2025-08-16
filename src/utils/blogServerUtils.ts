import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogMeta } from '../types/blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

// 确保博客目录存在
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true });
}

export function getAllPosts(): BlogPost[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const meta = data as BlogMeta;
        const readTime = calculateReadTime(content);

        return {
          slug,
          title: meta.title || 'Untitled',
          description: meta.description || '',
          date: meta.date || new Date().toISOString(),
          author: meta.author || 'Anonymous',
          readTime,
          tags: meta.tags || [],
          category: meta.category || 'General',
          content,
          featured: meta.featured || false,
          image: meta.image,
        } as BlogPost;
      });

    return allPostsData.sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) {
        return -1;
      } else {
        return 1;
      }
    });
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const meta = data as BlogMeta;
    const readTime = calculateReadTime(content);

    return {
      slug,
      title: meta.title || 'Untitled',
      description: meta.description || '',
      date: meta.date || new Date().toISOString(),
      author: meta.author || 'Anonymous',
      readTime,
      tags: meta.tags || [],
      category: meta.category || 'General',
      content,
      featured: meta.featured || false,
      image: meta.image,
    } as BlogPost;
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter(post => post.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = posts.map(post => post.category);
  return Array.from(new Set(categories));
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = posts.flatMap(post => post.tags);
  return Array.from(new Set(tags));
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} min read`;
}