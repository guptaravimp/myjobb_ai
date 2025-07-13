export const productsService = {
  // Fetch products from DummyJSON API
  fetchProducts: async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get cached products from localStorage
  getCachedProducts: () => {
    if (typeof window === 'undefined') return null;
    
    const cached = localStorage.getItem('products');
    if (cached) {
      try {
        const data = JSON.parse(cached);
        const cacheTime = localStorage.getItem('products_cache_time');
        
        // Cache expires after 5 minutes
        if (cacheTime && Date.now() - parseInt(cacheTime) < 5 * 60 * 1000) {
          return data;
        }
      } catch (error) {
        localStorage.removeItem('products');
        localStorage.removeItem('products_cache_time');
      }
    }
    return null;
  },

  // Cache products in localStorage
  cacheProducts: (products) => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('products_cache_time', Date.now().toString());
  },

  // Get products with caching
  getProducts: async () => {
    // Try to get cached data first
    const cached = productsService.getCachedProducts();
    if (cached) {
      return cached;
    }
    
    // Fetch fresh data
    const data = await productsService.fetchProducts();
    productsService.cacheProducts(data);
    return data;
  }
}; 