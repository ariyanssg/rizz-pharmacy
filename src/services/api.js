// API Service Layer for FakeStore API and custom pharmacy data
const BASE_URL = 'https://fakestoreapi.com';

// Simple cache implementation for API responses
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
};

// Custom pharmacy categories mapping
const PHARMACY_CATEGORIES = {
  'weight-loss': {
    name: 'Weight Loss',
    description: 'Prescription treatments for weight management',
    gradient: 'bg-[linear-gradient(135deg,#f27070_0%,_#97b5fb_100%)]'
  },
  'sexual-health': {
    name: 'Sexual Health',
    description: 'Treatments for sexual wellness and performance',
    gradient: 'bg-[linear-gradient(180deg,#f29b70_0%,_#fbd197_100%)]'
  },
  'brain-health': {
    name: 'Brain Health',
    description: 'Cognitive enhancement and brain wellness',
    gradient: 'bg-[linear-gradient(135deg,#97b5fb_0%,_#f27070_100%)]'
  },
  'testosterone-hrt': {
    name: 'Testosterone/HRT',
    description: 'Hormone replacement therapy solutions',
    gradient: 'bg-[linear-gradient(180deg,#ac70f2_0%,_#9c37a2_100%)]'
  },
  'athletic-performance': {
    name: 'Athletic Performance',
    description: 'Performance enhancement supplements',
    gradient: 'bg-[linear-gradient(135deg,#f27070_0%,_#97b5fb_100%)]'
  },
  'beauty-hair': {
    name: 'Beauty and Hair Loss',
    description: 'Beauty treatments and hair loss solutions',
    gradient: 'bg-[linear-gradient(180deg,#70cbf2_0%,_#97b0fb_100%)]'
  }
};

// Custom pharmacy products data
const PHARMACY_PRODUCTS = [
  {
    id: 'ph-1',
    title: 'Retarutide',
    price: 39.99,
    period: '/per month',
    description: 'Advanced weight management peptide for research use',
    image: '/images/img_rizz_reta_glp3_24mg.png',
    category: 'weight-loss',
    badge: 'Research use only',
    badgeColor: 'bg-[linear-gradient(240deg,#a75356_0%,_#d78c6c_100%)]',
    rating: { rate: 4.8, count: 156 },
    inStock: true,
    featured: true
  },
  {
    id: 'ph-2',
    title: 'Lyopholized Glow (GHK-CU/ BPC-157/TB-500)',
    price: 39.99,
    period: '/per month',
    description: 'Advanced peptide blend for skin health and recovery',
    image: '/images/img_rizz_glow_blend.png',
    category: 'beauty-hair',
    badge: 'Research use only',
    badgeColor: 'bg-[linear-gradient(240deg,#a75356_0%,_#d78c6c_100%)]',
    rating: { rate: 4.7, count: 89 },
    inStock: true,
    featured: true
  },
  {
    id: 'ph-3',
    title: 'Compounded Sermorelin 15mg',
    price: 179,
    period: 'Monthly + $45 Physician consult',
    description: 'Growth hormone releasing hormone for anti-aging',
    image: '/images/img_rizz_sermorelin_10mg.png',
    category: 'athletic-performance',
    badge: 'Recurring Plan',
    badgeColor: 'bg-[linear-gradient(180deg,#6c221d4c_0%,_#9541394c_100%)]',
    rating: { rate: 4.9, count: 234 },
    inStock: true,
    featured: false
  },
  {
    id: 'ph-4',
    title: '2X CJC / Ipamorelin',
    price: 149,
    period: 'Monthly + $45 Physician consult + $100 Lab Charge',
    description: 'Powerful peptide combination for growth hormone release',
    image: '/images/img_rizz_2x_blend_c.png',
    category: 'athletic-performance',
    badge: '',
    badgeColor: '',
    rating: { rate: 4.6, count: 178 },
    inStock: true,
    featured: false
  },
  {
    id: 'ph-5',
    title: 'Lyopholized Oxytocin',
    price: 39.99,
    period: '/per month',
    description: 'Social bonding and wellness peptide',
    image: '/images/img_rizz_oxytocin_10mg.png',
    category: 'sexual-health',
    badge: '',
    badgeColor: '',
    rating: { rate: 4.5, count: 92 },
    inStock: true,
    featured: false
  },
  {
    id: 'ph-6',
    title: 'Lyopholized Finasteride 1mg',
    price: 39.99,
    period: '/per month',
    description: 'Hair loss prevention and treatment',
    image: '/images/img_untitled_design.png',
    category: 'beauty-hair',
    badge: 'Recurring Plan',
    badgeColor: 'bg-[linear-gradient(180deg,#6c221d4c_0%,_#9541394c_100%)]',
    rating: { rate: 4.4, count: 267 },
    inStock: true,
    featured: true
  },
  {
    id: 'ph-7',
    title: 'Compounded NAD+ 1000 mg',
    price: 179,
    period: 'Monthly + $45 Physician consult',
    description: 'Cellular energy and anti-aging support',
    image: '/images/img_rizz_nad_1000mg.png',
    category: 'brain-health',
    badge: '',
    badgeColor: '',
    rating: { rate: 4.7, count: 145 },
    inStock: true,
    featured: false
  },
  {
    id: 'ph-8',
    title: 'Lyopholized PT-141 10mg',
    price: 149,
    period: 'Monthly + $45 Physician consult + $100 Lab Charge',
    description: 'Sexual wellness and libido enhancement',
    image: '/images/img_rizz_pt_141_10mg.png',
    category: 'sexual-health',
    badge: 'Recurring Plan',
    badgeColor: 'bg-[linear-gradient(180deg,#6c221d4c_0%,_#9541394c_100%)]',
    rating: { rate: 4.8, count: 203 },
    inStock: true,
    featured: true
  }
];

// API Functions
export const api = {
  // Get all products (combines FakeStore API with custom pharmacy products)
  async getAllProducts() {
    const cacheKey = 'all-products';
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      // Get FakeStore products for additional variety
      const fakeStoreResponse = await fetch(`${BASE_URL}/products`);
      const fakeStoreProducts = await fakeStoreResponse.json();
      
      // Transform FakeStore products to match our schema
      const transformedFakeStoreProducts = fakeStoreProducts.slice(0, 12).map(product => ({
        id: `fs-${product.id}`,
        title: product.title,
        price: product.price,
        period: '',
        description: product.description,
        image: product.image,
        category: api.mapFakeStoreCategory(product.category),
        badge: '',
        badgeColor: '',
        rating: product.rating,
        inStock: true,
        featured: false,
        isFakeStore: true
      }));

      // Combine with pharmacy products
      const allProducts = [...PHARMACY_PRODUCTS, ...transformedFakeStoreProducts];
      setCachedData(cacheKey, allProducts);
      return allProducts;
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to pharmacy products only
      const fallbackProducts = PHARMACY_PRODUCTS;
      setCachedData(cacheKey, fallbackProducts);
      return fallbackProducts;
    }
  },

  // Get products by category
  async getProductsByCategory(category) {
    const allProducts = await this.getAllProducts();
    return allProducts.filter(product => product.category === category);
  },

  // Get featured products
  async getFeaturedProducts() {
    const allProducts = await this.getAllProducts();
    return allProducts.filter(product => product.featured);
  },

  // Get single product
  async getProduct(id) {
    const allProducts = await this.getAllProducts();
    return allProducts.find(product => product.id === id);
  },

  // Search products
  async searchProducts(query) {
    const allProducts = await this.getAllProducts();
    const lowercaseQuery = query.toLowerCase();
    return allProducts.filter(product => 
      product.title.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  },

  // Get categories
  getCategories() {
    return PHARMACY_CATEGORIES;
  },

  // Map FakeStore categories to our pharmacy categories
  mapFakeStoreCategory(fakeStoreCategory) {
    const categoryMap = {
      "men's clothing": 'athletic-performance',
      "women's clothing": 'beauty-hair',
      'jewelery': 'beauty-hair',
      'electronics': 'brain-health'
    };
    return categoryMap[fakeStoreCategory] || 'weight-loss';
  },

  // Get products with filters
  async getFilteredProducts(filters = {}) {
    let products = await this.getAllProducts();
    
    // Filter by category
    if (filters.category && filters.category !== 'all') {
      products = products.filter(product => product.category === filters.category);
    }
    
    // Filter by price range
    if (filters.minPrice !== undefined) {
      products = products.filter(product => product.price >= filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      products = products.filter(product => product.price <= filters.maxPrice);
    }
    
    // Filter by search query
    if (filters.search) {
      const query = filters.search.toLowerCase();
      products = products.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Sort products
    if (filters.sortBy) {
      products = this.sortProducts(products, filters.sortBy);
    }
    
    return products;
  },

  // Sort products
  sortProducts(products, sortBy) {
    switch (sortBy) {
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...products].sort((a, b) => b.rating.rate - a.rating.rate);
      case 'name':
        return [...products].sort((a, b) => a.title.localeCompare(b.title));
      case 'featured':
        return [...products].sort((a, b) => b.featured - a.featured);
      default:
        return products;
    }
  }
};

export default api;
