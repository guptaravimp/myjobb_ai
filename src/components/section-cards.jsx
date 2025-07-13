"use client"

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "./ui/badge.jsx"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardContent,
  CardTitle,
} from "../components/ui/card"
import { TrendingUp, DollarSign, Package, Star } from 'lucide-react';
import { productsService } from '../lib/products';
import { useEffect, useState } from "react"
export function SectionCards() {
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      calculateAnalytics();
    }
  }, [products]);

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

  const calculateAnalytics = () => {
    const categoryData = {};
    const priceRanges = {
      '0-50': 0,
      '51-100': 0,
      '101-200': 0,
      '201+': 0
    };
    const ratingDistribution = {
      '1-2': 0,
      '3-4': 0,
      '5': 0
    };

    let totalValue = 0;
    let totalRating = 0;
    let totalStock = 0;

    products.forEach(product => {
      // Category distribution
      categoryData[product.category] = (categoryData[product.category] || 0) + 1;

      // Price range distribution
      if (product.price <= 50) priceRanges['0-50']++;
      else if (product.price <= 100) priceRanges['51-100']++;
      else if (product.price <= 200) priceRanges['101-200']++;
      else priceRanges['201+']++;

      // Rating distribution
      if (product.rating <= 2) ratingDistribution['1-2']++;
      else if (product.rating <= 4) ratingDistribution['3-4']++;
      else ratingDistribution['5']++;

      totalValue += product.price * product.stock;
      totalRating += product.rating;
      totalStock += product.stock;
    });

    const avgRating = totalRating / products.length;

    setAnalytics({
      categoryData: Object.entries(categoryData).map(([name, value]) => ({ name, value })),
      priceRanges: Object.entries(priceRanges).map(([range, count]) => ({ range, count })),
      ratingDistribution: Object.entries(ratingDistribution).map(([range, count]) => ({ range, count })),
      totalProducts: products.length,
      totalValue: totalValue.toFixed(2),
      avgRating: avgRating.toFixed(1),
      totalStock,
      avgPrice: (totalValue / totalStock).toFixed(2)
    });
  };

  // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 neon-glow"></div>
      </div>
    );
  }
  return (
    <div className=" flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-6 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <div className="dark-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Total Products</p>
              <h3 className="text-3xl font-bold text-white">{analytics.totalProducts}</h3>
            </div>
            <div className="p-3 bg-blue-900/30 rounded-xl neon-glow">
              <Package className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <IconTrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400">+12.5%</span>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        </div>

        <div className="dark-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Average Rating</p>
              <h3 className="text-3xl font-bold text-white">{analytics.avgRating}</h3>
            </div>
            <div className="p-3 bg-yellow-900/30 rounded-xl neon-glow">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <IconTrendingDown className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-400">-20%</span>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        </div>

        <div className="dark-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Total Value</p>
              <h3 className="text-3xl font-bold text-white">${analytics.totalValue}</h3>
            </div>
            <div className="p-3 bg-green-900/30 rounded-xl neon-glow">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <IconTrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400">+12.5%</span>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        </div>

        <div className="dark-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Growth Rate</p>
              <h3 className="text-3xl font-bold text-white">4.5%</h3>
            </div>
            <div className="p-3 bg-purple-900/30 rounded-xl neon-glow">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <IconTrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400">+4.5%</span>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 p-6 gap-6">
        <div className="dark-card p-6 hover-lift">
          <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800/70 cursor-pointer transition-all duration-300">
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-blue-400" />
                <span className="font-medium text-white">View All Products</span>
              </div>
              <span className="text-sm text-gray-400">→</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800/70 cursor-pointer transition-all duration-300">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="font-medium text-white">View Analytics</span>
              </div>
              <span className="text-sm text-gray-400">→</span>
            </div>
          </div>
        </div>

        <div className="dark-card p-6 hover-lift">
          <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full neon-glow"></div>
              <span className="text-sm text-gray-300">New products added to inventory</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full neon-glow"></div>
              <span className="text-sm text-gray-300">Analytics updated</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
              <div className="w-3 h-3 bg-yellow-500 rounded-full neon-glow"></div>
              <span className="text-sm text-gray-300">Stock levels updated</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
