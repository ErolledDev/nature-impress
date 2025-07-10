// Static data fetcher for JSON API
import { marked } from 'marked';

let cachedData = null;

// Fallback data when API is unavailable
const fallbackData = [
  {
    id: '1',
    title: 'The Secret Life of Forest Ecosystems',
    slug: 'secret-life-forest-ecosystems',
    metaDescription: 'Discover the hidden connections and intricate relationships that make forest ecosystems thrive.',
    content: 'Forests are more than just collections of trees. They are complex, interconnected systems where every organism plays a vital role in maintaining the delicate balance of life.',
    featuredImageUrl: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Nature Explorer',
    categories: ['Wildlife', 'Conservation', 'Forest'],
    publishDate: '2024-01-15T10:00:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    status: 'published',
    featured: true
  },
  {
    id: '2',
    title: 'Marine Life Conservation Efforts',
    slug: 'marine-life-conservation-efforts',
    metaDescription: 'Exploring global initiatives to protect our oceans and marine wildlife.',
    content: 'Our oceans face unprecedented challenges from climate change, pollution, and overfishing. Learn about the innovative conservation efforts working to protect marine ecosystems.',
    featuredImageUrl: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Marine Biologist',
    categories: ['Marine Life', 'Conservation', 'Ocean'],
    publishDate: '2024-01-10T14:30:00Z',
    createdAt: '2024-01-10T14:30:00Z',
    status: 'published',
    featured: false
  },
  {
    id: '3',
    title: 'Bird Migration Patterns and Climate Change',
    slug: 'bird-migration-climate-change',
    metaDescription: 'How changing climate patterns are affecting bird migration routes worldwide.',
    content: 'Climate change is disrupting traditional bird migration patterns, forcing species to adapt their routes and timing. This comprehensive study examines the impacts and adaptations.',
    featuredImageUrl: 'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Ornithologist',
    categories: ['Birds', 'Climate Change', 'Migration'],
    publishDate: '2024-01-05T09:15:00Z',
    createdAt: '2024-01-05T09:15:00Z',
    status: 'published',
    featured: false
  }
];
async function fetchData() {
  if (cachedData) {
    return cachedData;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.warn('NEXT_PUBLIC_API_URL environment variable is not set, using fallback data');
    cachedData = fallbackData;
    return cachedData;
  }

  try {
    // Create AbortController for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    // Use Promise.race to handle timeout
    const fetchPromise = fetch(apiUrl, { 
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 5000);
    });
    
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    cachedData = await response.json();
    return cachedData;
  } catch (error) {
    console.warn('Error fetching data from API, using fallback data:', error.message);
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