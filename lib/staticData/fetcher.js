// Static data fetcher for JSON API
import { marked } from 'marked';

let cachedData = null;

async function fetchData() {
  if (cachedData) {
    return cachedData;
  }

  // Construct absolute URL for API route to avoid URL parsing issues
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const apiUrl = `${baseUrl}/api/external-data`;

  let timeoutId;
  
  try {
    // Create AbortController for timeout handling
    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(apiUrl, { 
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    // Clear timeout on successful response
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    cachedData = await response.json();
    return cachedData;
  } catch (error) {
    // Clear timeout on error as well
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    console.error('Error fetching data from local API:', error.message);
    throw error;
  }
}

// Transform API data to match expected component structure
function transformPost(post) {
  return {
    _id: post.id,
    title: post.title,
    slug: { current: post.slug },
    excerpt: post.metaDescription,
    body: post.content ? marked.parse(post.content) : '',
    mainImage: {
      src: post.featuredImageUrl,
      alt: post.title,
    },
    author: {
      _id: 'author-1',
      name: post.author || 'Nature Explorer',
      slug: { current: 'nature-explorer' },
      image: null
    },
    categories: (post.categories || []).map((cat, index) => ({
      _id: `cat-${index}`,
      title: cat,
      slug: { current: cat.toLowerCase().replace(/\s+/g, '-') },
      color: 'green'
    })),
    publishedAt: post.publishDate,
    _createdAt: post.createdAt,
    featured: post.featured || false,
    estReadingTime: Math.ceil((post.content?.length || 0) / 1000) || 5
  };
}

export async function getAllPosts() {
  const data = await fetchData();
  return data
    .filter(post => post.status === 'published')
    .map(transformPost)
    .sort((a, b) => {
      // First, prioritize featured posts
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Then sort by publish date (newest first)
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    });
}

export async function getPostBySlug(slug) {
  const data = await fetchData();
  const post = data.find(p => p.slug === slug && p.status === 'published');
  return post ? transformPost(post) : null;
}

export async function getAllPostsSlugs() {
  const data = await fetchData();
  return data
    .filter(post => post.status === 'published')
    .map(post => ({ slug: post.slug }));
}

export async function getPaginatedPosts({ pageIndex = 0, limit = 6, categorySlug = null }) {
  const posts = await getAllPosts();
  
  let filteredPosts = posts;
  
  // Filter by category if specified
  if (categorySlug) {
    filteredPosts = posts.filter(post => 
      post.categories.some(cat => cat.slug.current === categorySlug)
    );
  }
  
  return filteredPosts.slice(pageIndex, limit);
}

export async function getPostsByCategory(categorySlug) {
  const posts = await getAllPosts();
  return posts.filter(post => 
    post.categories.some(cat => cat.slug.current === categorySlug)
  );
}

export async function getAllAuthors() {
  return [
    {
      _id: 'author-1',
      name: 'Nature Explorer',
      slug: { current: 'nature-explorer' },
      image: null,
      bio: null
    }
  ];
}

export async function getAllCategories() {
  const data = await fetchData();
  const categories = new Set();
  const categoryData = new Map();
  
  data.forEach(post => {
    if (post.categories) {
      post.categories.forEach(cat => {
        const slug = cat.toLowerCase().replace(/\s+/g, '-');
        categories.add(slug);
        categoryData.set(slug, {
          title: cat,
          slug: slug,
          count: (categoryData.get(slug)?.count || 0) + 1
        });
      });
    }
  });

  return Array.from(categoryData.values());
}

export async function getCategoryBySlug(slug) {
  const categories = await getAllCategories();
  return categories.find(cat => cat.slug === slug);
}

export async function searchPosts(query) {
  if (!query || query.trim() === '') {
    return [];
  }

  const posts = await getAllPosts();
  const searchTerm = query.toLowerCase().trim();
  
  return posts.filter(post => {
    // Search in title
    if (post.title && post.title.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    // Search in excerpt
    if (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    // Search in categories
    if (post.categories && post.categories.some(cat => 
      cat.title.toLowerCase().includes(searchTerm)
    )) {
      return true;
    }
    
    // Search in content (remove HTML tags first)
    if (post.body) {
      const textContent = post.body.replace(/<[^>]*>/g, '').toLowerCase();
      if (textContent.includes(searchTerm)) {
        return true;
      }
    }
    
    // Search in author name
    if (post.author && post.author.name && 
        post.author.name.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    return false;
  });
}

export async function getSettings() {
  return {
    title: "Nature's Whispers - Exploring the Wild",
    description: "Discover the beauty and wonder of the natural world through captivating stories, stunning photography, and deep insights into wildlife and ecology.",
    url: "https://mydomain.com",
    copyright: "Nature's Whispers",
    email: "hello@mydomain.com",
    phone: null,
    logo: null,
    logoalt: null,
    openGraphImage: null,
    w3ckey: null,
    social: []
  };
}