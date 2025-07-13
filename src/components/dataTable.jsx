import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {Input} from './ui/input'
import { Search,  Package, Star } from 'lucide-react';
import { productsService } from '../lib/products';

export default function ProductsCom() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, categoryFilter, sortBy]);

  const fetchProducts = async () => {
    try {
      const data = await productsService.getProducts();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'stock':
          return b.stock - a.stock;
        default:
          return a.title.localeCompare(b.title);
      }
    });

    setFilteredProducts(filtered);
  };

  const categories = [...new Set(products.map(product => product.category))];

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getStockStatus = (stock) => {
    if (stock > 50) return { text: 'In Stock', color: 'text-green-600 bg-green-100' };
    if (stock > 10) return { text: 'Low Stock', color: 'text-yellow-600 bg-yellow-100' };
    return { text: 'Out of Stock', color: 'text-red-600 bg-red-100' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 neon-glow"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="dark-card p-6 hover-lift">
        <div className="flex items-center mb-6">
          <Package className="w-6 h-6 mr-3 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Products ({filteredProducts.length})</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="dark-input w-full pl-10"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="dark-input px-3 py-2"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="dark-input px-3 py-2"
          >
            <option value="title">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
            <option value="stock">Sort by Stock</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-300">Product</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Price</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Rating</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Stock</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                return (
                  <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-white">{product.title}</p>
                          <p className="text-sm text-gray-400 truncate max-w-xs">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-500/30">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-white">
                        ${product.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        {getRatingStars(product.rating)}
                        <span className="text-sm text-gray-400 ml-1">
                          ({product.rating})
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-white">{product.stock}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        stockStatus.text === 'In Stock' ? 'bg-green-900/30 text-green-300 border border-green-500/30' :
                        stockStatus.text === 'Low Stock' ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-500/30' :
                        'bg-red-900/30 text-red-300 border border-red-500/30'
                      }`}>
                        {stockStatus.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 