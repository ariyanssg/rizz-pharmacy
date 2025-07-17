import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

// Custom hook for fetching all products
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
};

// Custom hook for fetching products by category
export const useProductsByCategory = (category) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductsByCategory = useCallback(async () => {
    if (!category) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProductsByCategory(category);
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchProductsByCategory();
  }, [fetchProductsByCategory]);

  return { products, loading, error, refetch: fetchProductsByCategory };
};

// Custom hook for fetching featured products
export const useFeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeaturedProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getFeaturedProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch featured products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return { products, loading, error, refetch: fetchFeaturedProducts };
};

// Custom hook for fetching a single product
export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProduct(id);
      setProduct(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, loading, error, refetch: fetchProduct };
};

// Custom hook for searching products
export const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchProducts = useCallback(async (query) => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await api.searchProducts(query);
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to search products');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setProducts([]);
    setError(null);
  }, []);

  return { products, loading, error, searchProducts, clearSearch };
};

// Custom hook for filtered products with advanced filtering
export const useFilteredProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: undefined,
    maxPrice: undefined,
    search: '',
    sortBy: 'featured'
  });

  const fetchFilteredProducts = useCallback(async (newFilters) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getFilteredProducts(newFilters || filters);
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch filtered products');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateFilters = useCallback((newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    fetchFilteredProducts(updatedFilters);
  }, [filters, fetchFilteredProducts]);

  const resetFilters = useCallback(() => {
    const defaultFilters = {
      category: 'all',
      minPrice: undefined,
      maxPrice: undefined,
      search: '',
      sortBy: 'featured'
    };
    setFilters(defaultFilters);
    fetchFilteredProducts(defaultFilters);
  }, [fetchFilteredProducts]);

  useEffect(() => {
    fetchFilteredProducts(filters);
  }, []);

  return {
    products,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    refetch: () => fetchFilteredProducts(filters)
  };
};

// Custom hook for categories
export const useCategories = () => {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const data = api.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { categories, loading };
};

// Custom hook for product statistics
export const useProductStats = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    averagePrice: 0,
    featuredCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const products = await api.getAllProducts();
        const categories = api.getCategories();
        
        const totalProducts = products.length;
        const totalCategories = Object.keys(categories).length;
        const averagePrice = products.reduce((sum, product) => sum + product.price, 0) / totalProducts;
        const featuredCount = products.filter(product => product.featured).length;

        setStats({
          totalProducts,
          totalCategories,
          averagePrice: Math.round(averagePrice * 100) / 100,
          featuredCount
        });
      } catch (err) {
        console.error('Failed to fetch product stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};
