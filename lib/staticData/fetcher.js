// Static data fetcher for JSON API
import { marked } from 'marked';

let cachedData = null;

// Fallback data for build time when API is not available
const fallbackData = [
  {
    id: 'sample-post-1',
    title: 'Welcome to Nature\'s Whispers',
    slug: 'welcome-to-natures-whispers',
    content: 'Discover the beauty and wonder of the natural world through our captivating stories and stunning photography.',
    metaDescription: 'Welcome to Nature\'s Whispers - your gateway to exploring the wild.',
    featuredImageUrl: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1200',
    author: 'Nature Explorer',
    categories: ['Wildlife', 'Nature'],
    publishDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    status: 'published',
    featured: true
  }
];

async function fetchData() {
  if (cachedData) {
    return cachedData;
  }

  // Check if we're in build environment or if API URL is not configured
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiUrl) {
    // Using fallback data when API URL is not configured
    cachedData = fallbackData;
    return cachedData;
  }

  let timeoutId = null;
  
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
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    cachedData = await response.json();
    return cachedData;
  } catch (error) {
    // Fallback to static data when external API is unavailable
    cachedData = fallbackData;
    return cachedData;
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
    tags: (post.tags || []).map((tag, index) => ({
      _id: `tag-${index}`,
      title: tag,
      slug: { current: tag.toLowerCase().replace(/\s+/g, '-') }
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
      const dateA = new Date(a.publishedAt || a._createdAt);
      const dateB = new Date(b.publishedAt || b._createdAt);
      return dateB - dateA;
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
      post.categories.some(cat => 
        cat.slug.current === categorySlug || 
        cat.title.toLowerCase().replace(/\s+/g, '-') === categorySlug
      )
    );
  }
  
  const startIndex = pageIndex;
  const endIndex = Math.min(startIndex + (limit - pageIndex), filteredPosts.length);
  return filteredPosts.slice(startIndex, endIndex);
}

export async function getPostsByCategory(categorySlug) {
  const posts = await getAllPosts();
  return posts.filter(post => 
    post.categories.some(cat => 
      cat.slug.current === categorySlug || 
      cat.title.toLowerCase().replace(/\s+/g, '-') === categorySlug
    )
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
    url: process.env.SITE_URL || "https://natures-impress.erolledph.workers.dev",
    copyright: "Nature's Whispers",
    email: "hello@natures-impress.erolledph.workers.dev",
    phone: null,
    logo: null,
    logoalt: null,
    openGraphImage: null,
    w3ckey: null,
    social: []
  };
}
