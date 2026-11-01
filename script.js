// FarmFresh Marketplace JavaScript

// Global state management
const AppState = {
    currentUser: null,
    userType: null, // 'consumer' or 'farmer'
    products: [],
    cart: [],
    isAuthenticated: false,
    historicalSalesData: null,
    demandPredictions: null
};

// Sample data for demonstration
const sampleProducts = [
    {
        id: 1,
        name: 'Organic Apples',
        farm: 'Green Valley Farm',
        price: 4.99,
        unit: 'lb',
        category: 'fruits',
        description: 'Crisp, sweet organic apples grown without pesticides',
        icon: 'fas fa-apple-alt',
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        inStock: true,
        farmerId: 1,
        greenScore: {
            overall: 92,
            carbonFootprint: {
                score: 88,
                distanceKm: 45,
                transportMethod: 'Local delivery truck'
            },
            waterUsage: {
                score: 85,
                litersPerKg: 822,
                efficiency: 'Good'
            },
            organicRating: {
                score: 100,
                certified: true,
                pesticideFree: true,
                certification: 'USDA Organic'
            },
            sustainability: {
                score: 90,
                renewableEnergy: true,
                wasteReduction: 'Composting program',
                biodiversity: 'High'
            }
        }
    },
    {
        id: 2,
        name: 'Fresh Carrots',
        farm: 'Meadow Ridge Farm',
        price: 2.49,
        unit: 'lb',
        category: 'vegetables',
        description: 'Fresh, crunchy carrots perfect for snacking or cooking',
        icon: 'fas fa-carrot',
        image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        inStock: true,
        farmerId: 2,
        greenScore: {
            overall: 87,
            carbonFootprint: {
                score: 85,
                distanceKm: 62,
                transportMethod: 'Electric delivery van'
            },
            waterUsage: {
                score: 90,
                litersPerKg: 131,
                efficiency: 'Excellent'
            },
            organicRating: {
                score: 85,
                certified: false,
                pesticideFree: true,
                certification: 'Natural farming practices'
            },
            sustainability: {
                score: 85,
                renewableEnergy: true,
                wasteReduction: 'Crop rotation system',
                biodiversity: 'Medium'
            }
        }
    },
    {
        id: 3,
        name: 'Mixed Greens',
        farm: 'Sunrise Farm',
        price: 3.99,
        unit: 'bunch',
        category: 'vegetables',
        description: 'A mix of fresh lettuce, spinach, and arugula',
        icon: 'fas fa-leaf',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        inStock: true,
        farmerId: 3,
        greenScore: {
            overall: 94,
            carbonFootprint: {
                score: 92,
                distanceKm: 28,
                transportMethod: 'Bicycle delivery'
            },
            waterUsage: {
                score: 88,
                litersPerKg: 287,
                efficiency: 'Very good'
            },
            organicRating: {
                score: 100,
                certified: true,
                pesticideFree: true,
                certification: 'Certified Organic'
            },
            sustainability: {
                score: 95,
                renewableEnergy: true,
                wasteReduction: 'Zero waste packaging',
                biodiversity: 'Very high'
            }
        }
    },
    {
        id: 4,
        name: 'Organic Tomatoes',
        farm: 'Green Valley Farm',
        price: 3.49,
        unit: 'lb',
        category: 'vegetables',
        description: 'Juicy, vine-ripened organic tomatoes',
        icon: 'fas fa-seedling',
        image: 'https://images.unsplash.com/photo-1546470427-5da5e9a7f4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        inStock: true,
        farmerId: 1,
        greenScore: {
            overall: 89,
            carbonFootprint: {
                score: 87,
                distanceKm: 45,
                transportMethod: 'Local delivery truck'
            },
            waterUsage: {
                score: 82,
                litersPerKg: 214,
                efficiency: 'Good'
            },
            organicRating: {
                score: 100,
                certified: true,
                pesticideFree: true,
                certification: 'USDA Organic'
            },
            sustainability: {
                score: 88,
                renewableEnergy: true,
                wasteReduction: 'Composting program',
                biodiversity: 'High'
            }
        }
    },
    {
        id: 5,
        name: 'Fresh Strawberries',
        farm: 'Berry Patch Farm',
        price: 5.99,
        unit: 'pint',
        category: 'fruits',
        description: 'Sweet, fresh strawberries picked at peak ripeness',
        icon: 'fas fa-strawberry',
        image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        inStock: false,
        farmerId: 4,
        greenScore: {
            overall: 78,
            carbonFootprint: {
                score: 75,
                distanceKm: 125,
                transportMethod: 'Refrigerated truck'
            },
            waterUsage: {
                score: 80,
                litersPerKg: 287,
                efficiency: 'Good'
            },
            organicRating: {
                score: 85,
                certified: false,
                pesticideFree: true,
                certification: 'Integrated pest management'
            },
            sustainability: {
                score: 75,
                renewableEnergy: false,
                wasteReduction: 'Plastic containers',
                biodiversity: 'Medium'
            }
        }
    },
    {
        id: 6,
        name: 'Organic Potatoes',
        farm: 'Meadow Ridge Farm',
        price: 2.99,
        unit: 'lb',
        category: 'vegetables',
        description: 'Nutritious organic potatoes perfect for any meal',
        icon: 'fas fa-drumstick-bite',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        inStock: true,
        farmerId: 2,
        greenScore: {
            overall: 91,
            carbonFootprint: {
                score: 90,
                distanceKm: 62,
                transportMethod: 'Electric delivery van'
            },
            waterUsage: {
                score: 85,
                litersPerKg: 287,
                efficiency: 'Good'
            },
            organicRating: {
                score: 100,
                certified: true,
                pesticideFree: true,
                certification: 'USDA Organic'
            },
            sustainability: {
                score: 88,
                renewableEnergy: true,
                wasteReduction: 'Crop rotation system',
                biodiversity: 'High'
            }
        }
    },
    {
        id: 7,
        name: 'Fresh Corn',
        farm: 'Golden Harvest Farm',
        price: 1.99,
        unit: 'ear',
        category: 'vegetables',
        description: 'Sweet, tender corn picked fresh from the field',
        icon: 'fas fa-corn',
        image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        inStock: true,
        farmerId: 5,
        greenScore: {
            overall: 83,
            carbonFootprint: {
                score: 80,
                distanceKm: 95,
                transportMethod: 'Local truck'
            },
            waterUsage: {
                score: 78,
                litersPerKg: 1222,
                efficiency: 'Fair'
            },
            organicRating: {
                score: 75,
                certified: false,
                pesticideFree: false,
                certification: 'Conventional farming'
            },
            sustainability: {
                score: 85,
                renewableEnergy: false,
                wasteReduction: 'Minimal packaging',
                biodiversity: 'Medium'
            }
        }
    },
    {
        id: 8,
        name: 'Organic Bell Peppers',
        farm: 'Sunrise Farm',
        price: 4.49,
        unit: 'lb',
        category: 'vegetables',
        description: 'Colorful bell peppers in red, yellow, and green',
        icon: 'fas fa-pepper',
        image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        inStock: true,
        farmerId: 3,
        greenScore: {
            overall: 93,
            carbonFootprint: {
                score: 90,
                distanceKm: 28,
                transportMethod: 'Bicycle delivery'
            },
            waterUsage: {
                score: 85,
                litersPerKg: 287,
                efficiency: 'Good'
            },
            organicRating: {
                score: 100,
                certified: true,
                pesticideFree: true,
                certification: 'Certified Organic'
            },
            sustainability: {
                score: 95,
                renewableEnergy: true,
                wasteReduction: 'Zero waste packaging',
                biodiversity: 'Very high'
            }
        }
    },
    {
        id: 9,
        name: 'Fresh Blueberries',
        farm: 'Berry Patch Farm',
        price: 6.99,
        unit: 'pint',
        category: 'fruits',
        description: 'Sweet, antioxidant-rich blueberries',
        icon: 'fas fa-berries',
        image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        inStock: true,
        farmerId: 4,
        greenScore: {
            overall: 79,
            carbonFootprint: {
                score: 76,
                distanceKm: 125,
                transportMethod: 'Refrigerated truck'
            },
            waterUsage: {
                score: 82,
                litersPerKg: 287,
                efficiency: 'Good'
            },
            organicRating: {
                score: 85,
                certified: false,
                pesticideFree: true,
                certification: 'Integrated pest management'
            },
            sustainability: {
                score: 78,
                renewableEnergy: false,
                wasteReduction: 'Plastic containers',
                biodiversity: 'Medium'
            }
        }
    },
    {
        id: 10,
        name: 'Organic Cucumbers',
        farm: 'Green Valley Farm',
        price: 2.99,
        unit: 'lb',
        category: 'vegetables',
        description: 'Crisp, refreshing organic cucumbers',
        icon: 'fas fa-cucumber',
        image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        inStock: true,
        farmerId: 1,
        greenScore: {
            overall: 88,
            carbonFootprint: {
                score: 85,
                distanceKm: 45,
                transportMethod: 'Local delivery truck'
            },
            waterUsage: {
                score: 80,
                litersPerKg: 353,
                efficiency: 'Fair'
            },
            organicRating: {
                score: 100,
                certified: true,
                pesticideFree: true,
                certification: 'USDA Organic'
            },
            sustainability: {
                score: 85,
                renewableEnergy: true,
                wasteReduction: 'Composting program',
                biodiversity: 'High'
            }
        }
    }
];

// Historical Sales Data for Predictive Analytics
const historicalSalesData = {
    products: [
        {
            id: 1,
            name: 'Organic Apples',
            category: 'fruits',
            monthlySales: [
                { month: 'Jan', sales: 45, price: 4.99, demand: 'low' },
                { month: 'Feb', sales: 52, price: 4.99, demand: 'low' },
                { month: 'Mar', sales: 68, price: 4.99, demand: 'medium' },
                { month: 'Apr', sales: 85, price: 4.99, demand: 'medium' },
                { month: 'May', sales: 95, price: 4.99, demand: 'high' },
                { month: 'Jun', sales: 120, price: 4.99, demand: 'high' },
                { month: 'Jul', sales: 135, price: 4.99, demand: 'high' },
                { month: 'Aug', sales: 145, price: 4.99, demand: 'high' },
                { month: 'Sep', sales: 130, price: 4.99, demand: 'high' },
                { month: 'Oct', sales: 110, price: 4.99, demand: 'medium' },
                { month: 'Nov', sales: 78, price: 4.99, demand: 'medium' },
                { month: 'Dec', sales: 65, price: 4.99, demand: 'low' }
            ],
            seasonalTrends: {
                peak: ['Sep', 'Aug', 'Jul'],
                low: ['Jan', 'Feb', 'Dec'],
                growth: 12.5
            },
            weatherImpact: 0.15,
            competitorAnalysis: {
                marketShare: 0.23,
                priceCompetitiveness: 'good'
            }
        },
        {
            id: 2,
            name: 'Fresh Carrots',
            category: 'vegetables',
            monthlySales: [
                { month: 'Jan', sales: 78, price: 2.49, demand: 'medium' },
                { month: 'Feb', sales: 82, price: 2.49, demand: 'medium' },
                { month: 'Mar', sales: 95, price: 2.49, demand: 'high' },
                { month: 'Apr', sales: 110, price: 2.49, demand: 'high' },
                { month: 'May', sales: 125, price: 2.49, demand: 'high' },
                { month: 'Jun', sales: 115, price: 2.49, demand: 'high' },
                { month: 'Jul', sales: 105, price: 2.49, demand: 'high' },
                { month: 'Aug', sales: 98, price: 2.49, demand: 'medium' },
                { month: 'Sep', sales: 88, price: 2.49, demand: 'medium' },
                { month: 'Oct', sales: 92, price: 2.49, demand: 'medium' },
                { month: 'Nov', sales: 85, price: 2.49, demand: 'medium' },
                { month: 'Dec', sales: 80, price: 2.49, demand: 'medium' }
            ],
            seasonalTrends: {
                peak: ['May', 'Apr', 'Jun'],
                low: ['Jan', 'Feb', 'Dec'],
                growth: 8.3
            },
            weatherImpact: 0.08,
            competitorAnalysis: {
                marketShare: 0.18,
                priceCompetitiveness: 'excellent'
            }
        },
        {
            id: 3,
            name: 'Mixed Greens',
            category: 'vegetables',
            monthlySales: [
                { month: 'Jan', sales: 65, price: 3.99, demand: 'medium' },
                { month: 'Feb', sales: 68, price: 3.99, demand: 'medium' },
                { month: 'Mar', sales: 75, price: 3.99, demand: 'medium' },
                { month: 'Apr', sales: 85, price: 3.99, demand: 'high' },
                { month: 'May', sales: 95, price: 3.99, demand: 'high' },
                { month: 'Jun', sales: 88, price: 3.99, demand: 'high' },
                { month: 'Jul', sales: 82, price: 3.99, demand: 'high' },
                { month: 'Aug', sales: 78, price: 3.99, demand: 'medium' },
                { month: 'Sep', sales: 72, price: 3.99, demand: 'medium' },
                { month: 'Oct', sales: 75, price: 3.99, demand: 'medium' },
                { month: 'Nov', sales: 70, price: 3.99, demand: 'medium' },
                { month: 'Dec', sales: 68, price: 3.99, demand: 'medium' }
            ],
            seasonalTrends: {
                peak: ['May', 'Apr', 'Jun'],
                low: ['Jan', 'Feb', 'Dec'],
                growth: 15.2
            },
            weatherImpact: 0.22,
            competitorAnalysis: {
                marketShare: 0.31,
                priceCompetitiveness: 'good'
            }
        }
    ],
    marketTrends: {
        organicGrowth: 18.5,
        seasonalVariation: 0.25,
        priceElasticity: -0.8,
        weatherCorrelation: 0.65
    },
    externalFactors: {
        economicIndicators: {
            consumerSpending: 'stable',
            inflation: 3.2
        },
        weatherForecast: {
            spring: 'mild',
            summer: 'hot',
            fall: 'cool',
            winter: 'cold'
        },
        competitorActivity: {
            newEntrants: 2,
            priceChanges: 'stable'
        }
    }
};

// Predictive Analytics Functions
function generateDemandPredictions() {
    const predictions = {
        nextQuarter: [],
        seasonalForecast: [],
        recommendations: []
    };

    historicalSalesData.products.forEach(product => {
        const recentSales = product.monthlySales.slice(-3);
        const avgSales = recentSales.reduce((sum, sale) => sum + sale.sales, 0) / recentSales.length;
        
        // Simple trend analysis
        const growth = product.seasonalTrends.growth / 100;
        const seasonality = getSeasonalMultiplier(product.seasonalTrends);
        const weatherFactor = 1 + (product.weatherImpact * 0.1);
        
        const predictedDemand = Math.round(avgSales * (1 + growth) * seasonality * weatherFactor);
        
        predictions.nextQuarter.push({
            productId: product.id,
            productName: product.name,
            currentDemand: avgSales,
            predictedDemand: predictedDemand,
            growthRate: growth * 100,
            confidence: calculateConfidence(product),
            riskFactors: identifyRiskFactors(product)
        });
    });

    predictions.recommendations = generateRecommendations(predictions.nextQuarter);
    return predictions;
}

function getSeasonalMultiplier(seasonalTrends) {
    const currentMonth = new Date().getMonth();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonthName = monthNames[currentMonth];
    
    if (seasonalTrends.peak.includes(currentMonthName)) {
        return 1.3;
    } else if (seasonalTrends.low.includes(currentMonthName)) {
        return 0.7;
    } else {
        return 1.0;
    }
}

function calculateConfidence(product) {
    const salesVariance = calculateSalesVariance(product.monthlySales);
    if (salesVariance < 0.1) return 'High';
    if (salesVariance < 0.2) return 'Medium';
    return 'Low';
}

function calculateSalesVariance(sales) {
    const avg = sales.reduce((sum, sale) => sum + sale.sales, 0) / sales.length;
    const variance = sales.reduce((sum, sale) => sum + Math.pow(sale.sales - avg, 2), 0) / sales.length;
    return Math.sqrt(variance) / avg;
}

function identifyRiskFactors(product) {
    const risks = [];
    if (product.weatherImpact > 0.15) risks.push('Weather sensitive');
    if (product.competitorAnalysis.marketShare < 0.2) risks.push('High competition');
    if (product.seasonalTrends.growth < 5) risks.push('Slow growth');
    return risks;
}

function generateRecommendations(predictions) {
    const recommendations = [];
    
    const highGrowthProducts = predictions.filter(p => p.growthRate > 10);
    const lowGrowthProducts = predictions.filter(p => p.growthRate < 5);
    
    if (highGrowthProducts.length > 0) {
        recommendations.push({
            type: 'expansion',
            priority: 'high',
            title: 'Consider Expanding High-Growth Products',
            description: `Focus on increasing production for ${highGrowthProducts.map(p => p.productName).join(', ')} as they show strong growth potential.`,
            actionItems: [
                'Increase planting area by 20-30%',
                'Invest in better irrigation systems',
                'Consider contract farming partnerships'
            ]
        });
    }
    
    if (lowGrowthProducts.length > 0) {
        recommendations.push({
            type: 'optimization',
            priority: 'medium',
            title: 'Optimize Low-Growth Products',
            description: `Review pricing and marketing strategies for ${lowGrowthProducts.map(p => p.productName).join(', ')}.`,
            actionItems: [
                'Analyze competitor pricing',
                'Improve product quality',
                'Consider seasonal variations'
            ]
        });
    }
    
    recommendations.push({
        type: 'diversification',
        priority: 'medium',
        title: 'Diversification Opportunity',
        description: 'Consider adding new product varieties based on market trends.',
        actionItems: [
            'Research trending organic vegetables',
            'Test small batches of new products',
            'Gather customer feedback'
        ]
    });
    
    return recommendations;
}

// Seasonal Harvest Calendar Data
const harvestCalendarData = {
    seasons: {
        spring: {
            name: 'Spring',
            months: ['Mar', 'Apr', 'May'],
            color: '#10b981',
            description: 'Fresh greens, root vegetables, and early fruits'
        },
        summer: {
            name: 'Summer',
            months: ['Jun', 'Jul', 'Aug'],
            color: '#f59e0b',
            description: 'Peak season for tomatoes, berries, and stone fruits'
        },
        fall: {
            name: 'Fall',
            months: ['Sep', 'Oct', 'Nov'],
            color: '#ea580c',
            description: 'Apple harvest, pumpkins, and winter squashes'
        },
        winter: {
            name: 'Winter',
            months: ['Dec', 'Jan', 'Feb'],
            color: '#3b82f6',
            description: 'Greenhouse vegetables and stored produce'
        }
    },
    harvestSchedule: {
        'Organic Apples': {
            season: 'fall',
            peakMonths: ['Sep', 'Oct'],
            availability: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
            preBooking: {
                available: true,
                advanceNotice: 60, // days
                maxQuantity: 50,
                priceDiscount: 0.15
            },
            seasonalTips: [
                'Best flavor develops after first frost',
                'Store in cool, dark place for longest shelf life',
                'Perfect for pies, sauces, and fresh eating'
            ]
        },
        'Fresh Carrots': {
            season: 'fall',
            peakMonths: ['Oct', 'Nov'],
            availability: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
            preBooking: {
                available: true,
                advanceNotice: 30,
                maxQuantity: 100,
                priceDiscount: 0.10
            },
            seasonalTips: [
                'Sweetest after frost exposure',
                'Can be stored in ground through winter',
                'Great for roasting, soups, and fresh snacking'
            ]
        },
        'Mixed Greens': {
            season: 'spring',
            peakMonths: ['Apr', 'May'],
            availability: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            preBooking: {
                available: true,
                advanceNotice: 14,
                maxQuantity: 30,
                priceDiscount: 0.20
            },
            seasonalTips: [
                'Peak nutrition in early spring',
                'Best when harvested in cool weather',
                'Perfect for salads and smoothies'
            ]
        },
        'Organic Tomatoes': {
            season: 'summer',
            peakMonths: ['Jul', 'Aug'],
            availability: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            preBooking: {
                available: true,
                advanceNotice: 45,
                maxQuantity: 25,
                priceDiscount: 0.25
            },
            seasonalTips: [
                'Peak flavor in mid-summer heat',
                'Vine-ripened has best taste',
                'Perfect for sauces, salsas, and fresh eating'
            ]
        },
        'Fresh Strawberries': {
            season: 'spring',
            peakMonths: ['May', 'Jun'],
            availability: ['Apr', 'May', 'Jun', 'Jul'],
            preBooking: {
                available: true,
                advanceNotice: 30,
                maxQuantity: 20,
                priceDiscount: 0.30
            },
            seasonalTips: [
                'Sweetest in late spring',
                'Best eaten within days of picking',
                'Perfect for desserts and fresh eating'
            ]
        },
        'Organic Potatoes': {
            season: 'fall',
            peakMonths: ['Sep', 'Oct'],
            availability: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
            preBooking: {
                available: true,
                advanceNotice: 60,
                maxQuantity: 75,
                priceDiscount: 0.15
            },
            seasonalTips: [
                'Best flavor after curing period',
                'Store in cool, dark, humid place',
                'Versatile for any cooking method'
            ]
        }
    },
    seasonalRecipes: {
        spring: [
            { name: 'Spring Greens Salad', ingredients: ['Mixed Greens', 'Radishes', 'Fresh Herbs'], difficulty: 'Easy' },
            { name: 'Asparagus Risotto', ingredients: ['Asparagus', 'Arborio Rice', 'Parmesan'], difficulty: 'Medium' },
            { name: 'Rhubarb Crumble', ingredients: ['Rhubarb', 'Oats', 'Brown Sugar'], difficulty: 'Easy' }
        ],
        summer: [
            { name: 'Caprese Salad', ingredients: ['Tomatoes', 'Fresh Mozzarella', 'Basil'], difficulty: 'Easy' },
            { name: 'Berry Smoothie Bowl', ingredients: ['Mixed Berries', 'Banana', 'Yogurt'], difficulty: 'Easy' },
            { name: 'Grilled Vegetable Platter', ingredients: ['Zucchini', 'Bell Peppers', 'Eggplant'], difficulty: 'Medium' }
        ],
        fall: [
            { name: 'Apple Crisp', ingredients: ['Apples', 'Oats', 'Cinnamon'], difficulty: 'Easy' },
            { name: 'Butternut Squash Soup', ingredients: ['Butternut Squash', 'Onion', 'Garlic'], difficulty: 'Medium' },
            { name: 'Roasted Root Vegetables', ingredients: ['Carrots', 'Potatoes', 'Parsnips'], difficulty: 'Easy' }
        ],
        winter: [
            { name: 'Winter Citrus Salad', ingredients: ['Oranges', 'Grapefruit', 'Pomegranate'], difficulty: 'Easy' },
            { name: 'Kale and White Bean Soup', ingredients: ['Kale', 'White Beans', 'Garlic'], difficulty: 'Medium' },
            { name: 'Braised Cabbage', ingredients: ['Cabbage', 'Apple', 'Caraway'], difficulty: 'Medium' }
        ]
    },
    educationalContent: {
        benefits: [
            'Higher nutritional value when harvested in season',
            'Better flavor and texture at peak ripeness',
            'Lower environmental impact with reduced transport',
            'Support for local farmers and communities',
            'More affordable prices during abundance'
        ],
        tips: [
            'Plan meals around what\'s in season locally',
            'Preserve excess seasonal produce for later use',
            'Visit farmers markets for the freshest picks',
            'Learn about your region\'s growing seasons',
            'Try new varieties that are seasonally available'
        ]
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    AppState.products = sampleProducts;
    AppState.historicalSalesData = historicalSalesData;
    AppState.demandPredictions = generateDemandPredictions();
    AppState.harvestCalendar = harvestCalendarData;
    initializeEventListeners();
    updateUI();
});

// Event Listeners
function initializeEventListeners() {
    // Navigation
    document.getElementById('login-btn').addEventListener('click', openAuthModal);
    document.getElementById('signup-btn').addEventListener('click', openAuthModal);
    document.getElementById('close-modal').addEventListener('click', closeAuthModal);
    document.getElementById('close-dashboard').addEventListener('click', closeDashboardModal);
    
    // Authentication tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', switchAuthTab);
    });
    
    // Forms
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    
    // Hero buttons
    document.getElementById('shop-now-btn').addEventListener('click', openMarketplace);
    document.getElementById('learn-more-btn').addEventListener('click', scrollToFeatures);
    
    // Mobile navigation
    document.getElementById('nav-toggle').addEventListener('click', toggleMobileNav);
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const authModal = document.getElementById('auth-modal');
        const dashboardModal = document.getElementById('dashboard-modal');
        
        if (event.target === authModal) {
            closeAuthModal();
        }
        if (event.target === dashboardModal) {
            closeDashboardModal();
        }
    });
}

// Navigation Functions
function openAuthModal() {
    document.getElementById('auth-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function closeDashboardModal() {
    document.getElementById('dashboard-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function switchAuthTab(event) {
    const tab = event.target;
    const tabName = tab.getAttribute('data-tab');
    
    // Update tab buttons
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // Update forms
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.getElementById(tabName + '-form').classList.add('active');
}

function toggleMobileNav() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Authentication Functions
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const userType = document.querySelector('input[name="user-type"]:checked').value;
    
    // Simple validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate authentication
    AppState.currentUser = {
        email: email,
        name: email.split('@')[0],
        type: userType
    };
    AppState.userType = userType;
    AppState.isAuthenticated = true;
    
    closeAuthModal();
    updateUI();
    openDashboard();
    
    // Clear form
    document.getElementById('loginForm').reset();
}

function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const userType = document.querySelector('input[name="signup-user-type"]:checked').value;
    
    // Simple validation
    if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate registration
    AppState.currentUser = {
        email: email,
        name: name,
        type: userType
    };
    AppState.userType = userType;
    AppState.isAuthenticated = true;
    
    closeAuthModal();
    updateUI();
    openDashboard();
    
    // Clear form
    document.getElementById('signupForm').reset();
}

// UI Update Functions
function updateUI() {
    const navAuth = document.querySelector('.nav-auth');
    
    if (AppState.isAuthenticated) {
        navAuth.innerHTML = `
            <span class="user-greeting">Welcome, ${AppState.currentUser.name}</span>
            <button class="btn-primary" id="dashboard-btn">
                <i class="fas fa-tachometer-alt"></i>
                Dashboard
            </button>
            <button class="btn-secondary" id="logout-btn">
                <i class="fas fa-sign-out-alt"></i>
                Logout
            </button>
        `;
        
        document.getElementById('dashboard-btn').addEventListener('click', openDashboard);
        document.getElementById('logout-btn').addEventListener('click', logout);
    } else {
        navAuth.innerHTML = `
            <button class="btn-secondary" id="login-btn">Login</button>
            <button class="btn-primary" id="signup-btn">Sign Up</button>
        `;
        
        document.getElementById('login-btn').addEventListener('click', openAuthModal);
        document.getElementById('signup-btn').addEventListener('click', openAuthModal);
    }
}

function logout() {
    AppState.currentUser = null;
    AppState.userType = null;
    AppState.isAuthenticated = false;
    AppState.cart = [];
    
    updateUI();
    closeDashboardModal();
}

// Dashboard Functions
function openDashboard() {
    const dashboardModal = document.getElementById('dashboard-modal');
    const dashboardContainer = document.getElementById('dashboard-container');
    
    if (AppState.userType === 'farmer') {
        dashboardContainer.innerHTML = renderFarmerDashboard();
        initializeFarmerDashboard();
    } else {
        dashboardContainer.innerHTML = renderConsumerDashboard();
        initializeConsumerDashboard();
    }
    
    dashboardModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function renderFarmerDashboard() {
    const farmerProducts = AppState.products.filter(p => p.farmerId === 1); // Assuming current farmer has ID 1
    
    return `
        <div class="dashboard">
            <div class="dashboard-header">
                <h1 class="dashboard-title">Farmer Dashboard</h1>
                <div class="dashboard-nav">
                    <button class="nav-btn active" data-section="products">My Products</button>
                    <button class="nav-btn" data-section="orders">Orders</button>
                    <button class="nav-btn" data-section="analytics">Analytics</button>
                    <button class="nav-btn" data-section="predictions">Demand Forecast</button>
                </div>
            </div>
            
            <div id="products-section" class="dashboard-section active">
                <div class="section-header">
                    <h2>My Products</h2>
                    <button class="btn-primary" id="add-product-btn">
                        <i class="fas fa-plus"></i>
                        Add New Product
                    </button>
                </div>
                <div class="dashboard-grid">
                    ${farmerProducts.map(product => renderProductCard(product, true)).join('')}
                </div>
            </div>
            
            <div id="orders-section" class="dashboard-section">
                <h2>Recent Orders</h2>
                <div class="orders-list">
                    <div class="order-item">
                        <div class="order-info">
                            <h3>Order #1234</h3>
                            <p>John Doe - 2x Organic Apples, 1x Fresh Carrots</p>
                            <span class="order-date">Dec 15, 2023</span>
                        </div>
                        <div class="order-status">
                            <span class="status pending">Pending</span>
                            <span class="order-total">$12.47</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="analytics-section" class="dashboard-section">
                <h2>Sales Analytics</h2>
                <div class="analytics-grid">
                    <div class="analytics-card">
                        <h3>Total Sales</h3>
                        <span class="analytics-number">$2,450</span>
                    </div>
                    <div class="analytics-card">
                        <h3>Products Sold</h3>
                        <span class="analytics-number">156</span>
                    </div>
                    <div class="analytics-card">
                        <h3>Active Listings</h3>
                        <span class="analytics-number">${farmerProducts.length}</span>
                    </div>
                </div>
            </div>
            
            <div id="predictions-section" class="dashboard-section">
                ${renderPredictiveAnalytics()}
            </div>
        </div>
    `;
}

function renderConsumerDashboard() {
    return `
        <div class="dashboard">
            <div class="dashboard-header">
                <h1 class="dashboard-title">Consumer Dashboard</h1>
                <div class="dashboard-nav">
                    <button class="nav-btn active" data-section="marketplace">Marketplace</button>
                    <button class="nav-btn" data-section="harvest-calendar">Harvest Calendar</button>
                    <button class="nav-btn" data-section="cart">Cart (${AppState.cart.length})</button>
                    <button class="nav-btn" data-section="orders">My Orders</button>
                </div>
            </div>
            
            <div id="marketplace-section" class="dashboard-section active">
                <div class="marketplace-header">
                    <h2>Fresh Produce Marketplace</h2>
                    <div class="filters">
                        <select id="category-filter">
                            <option value="">All Categories</option>
                            <option value="fruits">Fruits</option>
                            <option value="vegetables">Vegetables</option>
                        </select>
                        <select id="green-score-filter">
                            <option value="">All Green Scores</option>
                            <option value="90-100">Excellent (90-100)</option>
                            <option value="80-89">Good (80-89)</option>
                            <option value="70-79">Fair (70-79)</option>
                            <option value="0-69">Poor (0-69)</option>
                        </select>
                        <input type="text" id="search-input" placeholder="Search products...">
                    </div>
                    <div class="green-score-filter">
                        <div class="green-score-toggle" id="show-green-scores">
                            <input type="checkbox" id="green-scores-checkbox" checked>
                            <label for="green-scores-checkbox">Show Green Scores</label>
                        </div>
                        <select id="organic-filter">
                            <option value="">All Products</option>
                            <option value="organic">Certified Organic Only</option>
                            <option value="pesticide-free">Pesticide-Free Only</option>
                        </select>
                    </div>
                </div>
                <div class="dashboard-grid">
                    ${AppState.products.map(product => renderProductCard(product, false)).join('')}
                </div>
            </div>
            
            <div id="cart-section" class="dashboard-section">
                <h2>Shopping Cart</h2>
                <div id="cart-items">
                    ${renderCartItems()}
                </div>
                <div class="cart-summary">
                    <div class="cart-total">
                        <h3>Total: $${calculateCartTotal().toFixed(2)}</h3>
                        <button class="btn-primary btn-large" id="checkout-btn">
                            <i class="fas fa-credit-card"></i>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
            
            <div id="harvest-calendar-section" class="dashboard-section">
                ${renderHarvestCalendar()}
            </div>
            
            <div id="orders-section" class="dashboard-section">
                <h2>Order History</h2>
                <div class="orders-list">
                    <div class="order-item">
                        <div class="order-info">
                            <h3>Order #1234</h3>
                            <p>2x Organic Apples, 1x Fresh Carrots</p>
                            <span class="order-date">Dec 15, 2023</span>
                        </div>
                        <div class="order-status">
                            <span class="status delivered">Delivered</span>
                            <span class="order-total">$12.47</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderProductCard(product, isFarmer = false) {
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                ${product.image ? 
                    `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                     <div class="fallback-icon" style="display:none;">
                        <i class="${product.icon}"></i>
                     </div>` :
                    `<div class="fallback-icon">
                        <i class="${product.icon}"></i>
                     </div>`
                }
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-farm">From ${product.farm}</p>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price}/${product.unit}</div>
                ${!product.inStock ? '<span class="out-of-stock">Out of Stock</span>' : ''}
                ${!isFarmer && product.greenScore ? renderGreenScore(product.greenScore, true) : ''}
                <div class="product-actions">
                    ${isFarmer ? 
                        `<button class="btn-secondary btn-small" onclick="editProduct(${product.id})">
                            <i class="fas fa-edit"></i>
                            Edit
                        </button>
                        <button class="btn-outline btn-small" onclick="deleteProduct(${product.id})">
                            <i class="fas fa-trash"></i>
                            Delete
                        </button>` :
                        `<button class="btn-primary btn-small" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                            <i class="fas fa-cart-plus"></i>
                            Add to Cart
                        </button>
                        <button class="btn-outline btn-small" onclick="viewProduct(${product.id})">
                            <i class="fas fa-eye"></i>
                            View Details
                        </button>`
                    }
                </div>
            </div>
        </div>
    `;
}

function renderCartItems() {
    if (AppState.cart.length === 0) {
        return '<div class="empty-cart"><p>Your cart is empty</p></div>';
    }
    
    return AppState.cart.map(item => {
        const product = AppState.products.find(p => p.id === item.productId);
        return `
            <div class="cart-item">
                <div class="cart-item-image">
                    ${product.image ? 
                        `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                         <div class="fallback-icon" style="display:none;">
                            <i class="${product.icon}"></i>
                         </div>` :
                        `<div class="fallback-icon">
                            <i class="${product.icon}"></i>
                         </div>`
                    }
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${product.name}</div>
                    <div class="cart-item-farm">From ${product.farm}</div>
                    <div class="cart-item-price">$${product.price}/${product.unit}</div>
                </div>
                <div class="cart-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.productId}, -1)">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="setQuantity(${item.productId}, this.value)">
                    <button class="quantity-btn" onclick="updateQuantity(${item.productId}, 1)">+</button>
                </div>
                <button class="btn-outline btn-small" onclick="removeFromCart(${item.productId})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');
}

// Dashboard Event Handlers
function initializeFarmerDashboard() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', switchDashboardSection);
    });
    
    // Add product button
    document.getElementById('add-product-btn').addEventListener('click', showAddProductForm);
}

function initializeConsumerDashboard() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', switchDashboardSection);
    });
    
    // Search and filters
    document.getElementById('search-input').addEventListener('input', filterProducts);
    document.getElementById('category-filter').addEventListener('change', filterProducts);
    document.getElementById('green-score-filter').addEventListener('change', filterProducts);
    document.getElementById('organic-filter').addEventListener('change', filterProducts);
    document.getElementById('green-scores-checkbox').addEventListener('change', filterProducts);
    
    // Checkout
    document.getElementById('checkout-btn').addEventListener('click', proceedToCheckout);
}

function switchDashboardSection(event) {
    const section = event.target.getAttribute('data-section');
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update sections
    document.querySelectorAll('.dashboard-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(section + '-section').classList.add('active');
    
    // Refresh cart section if needed
    if (section === 'cart') {
        document.getElementById('cart-items').innerHTML = renderCartItems();
    }
}

// Product Management Functions
function addToCart(productId) {
    const existingItem = AppState.cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        AppState.cart.push({
            productId: productId,
            quantity: 1
        });
    }
    
    updateCartUI();
}

function removeFromCart(productId) {
    AppState.cart = AppState.cart.filter(item => item.productId !== productId);
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = AppState.cart.find(item => item.productId === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function setQuantity(productId, quantity) {
    const item = AppState.cart.find(item => item.productId === productId);
    if (item) {
        item.quantity = Math.max(1, parseInt(quantity));
        updateCartUI();
    }
}

function updateCartUI() {
    // Update cart count in navigation
    const cartButtons = document.querySelectorAll('[data-section="cart"]');
    cartButtons.forEach(btn => {
        btn.textContent = `Cart (${AppState.cart.length})`;
    });
    
    // Update cart items if cart section is visible
    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        cartItems.innerHTML = renderCartItems();
    }
}

function calculateCartTotal() {
    return AppState.cart.reduce((total, item) => {
        const product = AppState.products.find(p => p.id === item.productId);
        return total + (product.price * item.quantity);
    }, 0);
}

function filterProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const greenScoreRange = document.getElementById('green-score-filter').value;
    const organicFilter = document.getElementById('organic-filter').value;
    const showGreenScores = document.getElementById('green-scores-checkbox').checked;
    
    const filteredProducts = AppState.products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.farm.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || product.category === category;
        
        let matchesGreenScore = true;
        if (greenScoreRange && product.greenScore) {
            const [min, max] = greenScoreRange.split('-').map(Number);
            matchesGreenScore = product.greenScore.overall >= min && product.greenScore.overall <= max;
        }
        
        let matchesOrganic = true;
        if (organicFilter && product.greenScore) {
            if (organicFilter === 'organic') {
                matchesOrganic = product.greenScore.organicRating.certified;
            } else if (organicFilter === 'pesticide-free') {
                matchesOrganic = product.greenScore.organicRating.pesticideFree;
            }
        }
        
        return matchesSearch && matchesCategory && matchesGreenScore && matchesOrganic;
    });
    
    const productGrid = document.querySelector('#marketplace-section .dashboard-grid');
    productGrid.innerHTML = filteredProducts.map(product => {
        const productCard = renderProductCard(product, false);
        // Toggle Green Score display based on checkbox
        if (!showGreenScores) {
            return productCard.replace(/<div class="green-score"[^>]*>.*?<\/div>/gs, '');
        }
        return productCard;
    }).join('');
}

function proceedToCheckout() {
    if (AppState.cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert(`Checkout functionality would be implemented here. Total: $${calculateCartTotal().toFixed(2)}`);
    // In a real app, this would redirect to a payment processor
}

function renderGreenScore(greenScore, compact = false) {
    const getScoreBadge = (score) => {
        if (score >= 90) return 'excellent';
        if (score >= 80) return 'good';
        if (score >= 70) return 'fair';
        return 'poor';
    };

    const getScoreLabel = (score) => {
        if (score >= 90) return 'Excellent';
        if (score >= 80) return 'Good';
        if (score >= 70) return 'Fair';
        return 'Poor';
    };

    if (compact) {
        return `
            <div class="green-score" style="padding: var(--spacing-2); margin-top: var(--spacing-2);">
                <div class="green-score-header" style="margin-bottom: var(--spacing-2);">
                    <div class="green-score-title">
                        <i class="fas fa-leaf"></i>
                        <span>Green Score</span>
                    </div>
                    <div class="green-score-overall">
                        <span class="green-score-number">${greenScore.overall}</span>
                        <span class="green-score-badge ${getScoreBadge(greenScore.overall)}">${getScoreLabel(greenScore.overall)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    return `
        <div class="green-score">
            <div class="green-score-header">
                <div class="green-score-title">
                    <i class="fas fa-leaf"></i>
                    <span>Green Score</span>
                </div>
                <div class="green-score-overall">
                    <span class="green-score-number">${greenScore.overall}</span>
                    <span class="green-score-badge ${getScoreBadge(greenScore.overall)}">${getScoreLabel(greenScore.overall)}</span>
                </div>
            </div>
            <div class="green-score-details">
                <div class="green-score-metric">
                    <div class="green-score-metric-icon carbon">
                        <i class="fas fa-truck"></i>
                    </div>
                    <div class="green-score-metric-info">
                        <div class="green-score-metric-label">Carbon Footprint</div>
                        <div class="green-score-metric-value">${greenScore.carbonFootprint.distanceKm}km • ${greenScore.carbonFootprint.transportMethod}</div>
                        <div class="green-score-progress">
                            <div class="green-score-progress-bar ${getScoreBadge(greenScore.carbonFootprint.score)}" style="width: ${greenScore.carbonFootprint.score}%"></div>
                        </div>
                    </div>
                </div>
                <div class="green-score-metric">
                    <div class="green-score-metric-icon water">
                        <i class="fas fa-tint"></i>
                    </div>
                    <div class="green-score-metric-info">
                        <div class="green-score-metric-label">Water Usage</div>
                        <div class="green-score-metric-value">${greenScore.waterUsage.litersPerKg}L/kg • ${greenScore.waterUsage.efficiency}</div>
                        <div class="green-score-progress">
                            <div class="green-score-progress-bar ${getScoreBadge(greenScore.waterUsage.score)}" style="width: ${greenScore.waterUsage.score}%"></div>
                        </div>
                    </div>
                </div>
                <div class="green-score-metric">
                    <div class="green-score-metric-icon organic">
                        <i class="fas fa-certificate"></i>
                    </div>
                    <div class="green-score-metric-info">
                        <div class="green-score-metric-label">Organic Rating</div>
                        <div class="green-score-metric-value">${greenScore.organicRating.certification} • ${greenScore.organicRating.pesticideFree ? 'Pesticide-Free' : 'Some pesticides'}</div>
                        <div class="green-score-progress">
                            <div class="green-score-progress-bar ${getScoreBadge(greenScore.organicRating.score)}" style="width: ${greenScore.organicRating.score}%"></div>
                        </div>
                    </div>
                </div>
                <div class="green-score-metric">
                    <div class="green-score-metric-icon sustainability">
                        <i class="fas fa-recycle"></i>
                    </div>
                    <div class="green-score-metric-info">
                        <div class="green-score-metric-label">Sustainability</div>
                        <div class="green-score-metric-value">${greenScore.sustainability.wasteReduction} • ${greenScore.sustainability.biodiversity}</div>
                        <div class="green-score-progress">
                            <div class="green-score-progress-bar ${getScoreBadge(greenScore.sustainability.score)}" style="width: ${greenScore.sustainability.score}%"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function viewProduct(productId) {
    const product = AppState.products.find(p => p.id === productId);
    const greenScoreHtml = product.greenScore ? renderGreenScore(product.greenScore, false) : '';
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <div style="padding: var(--spacing-6);">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-6); align-items: start;">
                    <div>
                        ${product.image ? 
                            `<img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: var(--radius-lg); margin-bottom: var(--spacing-4);">` :
                            `<div style="width: 100%; height: 200px; background: var(--gradient-primary); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: var(--white); font-size: var(--font-size-4xl); margin-bottom: var(--spacing-4);">
                                <i class="${product.icon}"></i>
                             </div>`
                        }
                        <h2 style="margin-bottom: var(--spacing-2);">${product.name}</h2>
                        <p style="color: var(--gray-600); margin-bottom: var(--spacing-2);">From ${product.farm}</p>
                        <p style="margin-bottom: var(--spacing-4);">${product.description}</p>
                        <div style="font-size: var(--font-size-2xl); font-weight: 700; color: var(--accent-amber); margin-bottom: var(--spacing-4);">
                            $${product.price}/${product.unit}
                        </div>
                        <button class="btn-primary btn-large" onclick="addToCart(${product.id}); this.parentElement.parentElement.parentElement.remove();">
                            <i class="fas fa-cart-plus"></i>
                            Add to Cart
                        </button>
                    </div>
                    <div>
                        ${greenScoreHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function editProduct(productId) {
    alert('Product editing functionality would be implemented here.');
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        AppState.products = AppState.products.filter(p => p.id !== productId);
        // Refresh the farmer dashboard
        if (AppState.userType === 'farmer') {
            document.getElementById('dashboard-container').innerHTML = renderFarmerDashboard();
            initializeFarmerDashboard();
        }
    }
}

function showAddProductForm() {
    alert('Add product form would be implemented here.');
}

function renderPredictiveAnalytics() {
    const predictions = AppState.demandPredictions;
    const historicalData = AppState.historicalSalesData;
    
    return `
        <div class="predictive-analytics">
            <div class="analytics-header">
                <h2>Predictive Demand Analytics</h2>
                <p>AI-powered insights to optimize your crop planning and maximize profits</p>
            </div>
            
            <!-- Key Metrics Overview -->
            <div class="metrics-overview">
                <div class="metric-card">
                    <div class="metric-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="metric-content">
                        <h3>Market Growth</h3>
                        <span class="metric-value">${historicalData.marketTrends.organicGrowth}%</span>
                        <span class="metric-label">Organic sector growth</span>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon">
                        <i class="fas fa-thermometer-half"></i>
                    </div>
                    <div class="metric-content">
                        <h3>Weather Impact</h3>
                        <span class="metric-value">${Math.round(historicalData.marketTrends.weatherCorrelation * 100)}%</span>
                        <span class="metric-label">Demand correlation</span>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="metric-content">
                        <h3>Competition</h3>
                        <span class="metric-value">${historicalData.externalFactors.competitorActivity.newEntrants}</span>
                        <span class="metric-label">New competitors</span>
                    </div>
                </div>
            </div>
            
            <!-- Demand Predictions -->
            <div class="predictions-section">
                <h3>Next Quarter Demand Forecast</h3>
                <div class="predictions-grid">
                    ${predictions.nextQuarter.map(prediction => renderPredictionCard(prediction)).join('')}
                </div>
            </div>
            
            <!-- Sales Trends Chart -->
            <div class="chart-section">
                <h3>Historical Sales Trends</h3>
                <div class="chart-container">
                    ${renderSalesTrendChart()}
                </div>
            </div>
            
            <!-- Recommendations -->
            <div class="recommendations-section">
                <h3>Strategic Recommendations</h3>
                <div class="recommendations-grid">
                    ${predictions.recommendations.map(rec => renderRecommendationCard(rec)).join('')}
                </div>
            </div>
            
            <!-- Market Insights -->
            <div class="market-insights">
                <h3>Market Insights</h3>
                <div class="insights-grid">
                    <div class="insight-card">
                        <h4>Seasonal Patterns</h4>
                        <div class="seasonal-patterns">
                            ${renderSeasonalPatterns()}
                        </div>
                    </div>
                    <div class="insight-card">
                        <h4>Risk Assessment</h4>
                        <div class="risk-factors">
                            ${renderRiskFactors()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderPredictionCard(prediction) {
    const growthIndicator = prediction.growthRate > 0 ? 'up' : 'down';
    const confidenceColor = prediction.confidence === 'High' ? 'green' : prediction.confidence === 'Medium' ? 'yellow' : 'red';
    
    return `
        <div class="prediction-card">
            <div class="prediction-header">
                <h4>${prediction.productName}</h4>
                <div class="confidence-badge ${confidenceColor}">
                    ${prediction.confidence} Confidence
                </div>
            </div>
            <div class="prediction-metrics">
                <div class="metric">
                    <span class="metric-label">Current Demand</span>
                    <span class="metric-value">${Math.round(prediction.currentDemand)} units</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Predicted Demand</span>
                    <span class="metric-value prediction-value">${Math.round(prediction.predictedDemand)} units</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Growth Rate</span>
                    <span class="metric-value growth-${growthIndicator}">
                        <i class="fas fa-arrow-${growthIndicator}"></i>
                        ${Math.abs(prediction.growthRate).toFixed(1)}%
                    </span>
                </div>
            </div>
            <div class="risk-factors">
                <h5>Risk Factors:</h5>
                <ul>
                    ${prediction.riskFactors.map(risk => `<li>${risk}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function renderSalesTrendChart() {
    // Simple ASCII-style chart representation
    const chartData = AppState.historicalSalesData.products[0].monthlySales;
    const maxSales = Math.max(...chartData.map(d => d.sales));
    
    return `
        <div class="simple-chart">
            <div class="chart-header">
                <span>Organic Apples - Monthly Sales Trend</span>
                <div class="chart-legend">
                    <span class="legend-item">
                        <span class="legend-color" style="background: var(--primary-green);"></span>
                        Sales Volume
                    </span>
                </div>
            </div>
            <div class="chart-area">
                ${chartData.map((data, index) => {
                    const height = (data.sales / maxSales) * 100;
                    return `
                        <div class="chart-bar-container">
                            <div class="chart-bar" style="height: ${height}%;" title="${data.month}: ${data.sales} units"></div>
                            <span class="chart-label">${data.month}</span>
                            <span class="chart-value">${data.sales}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function renderRecommendationCard(recommendation) {
    const priorityColor = recommendation.priority === 'high' ? 'red' : recommendation.priority === 'medium' ? 'yellow' : 'green';
    const typeIcon = recommendation.type === 'expansion' ? 'fa-expand' : 
                     recommendation.type === 'optimization' ? 'fa-cogs' : 'fa-seedling';
    
    return `
        <div class="recommendation-card priority-${recommendation.priority}">
            <div class="recommendation-header">
                <div class="recommendation-icon">
                    <i class="fas ${typeIcon}"></i>
                </div>
                <div class="recommendation-title">
                    <h4>${recommendation.title}</h4>
                    <span class="priority-badge ${priorityColor}">${recommendation.priority.toUpperCase()}</span>
                </div>
            </div>
            <div class="recommendation-content">
                <p>${recommendation.description}</p>
                <div class="action-items">
                    <h5>Action Items:</h5>
                    <ul>
                        ${recommendation.actionItems.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function renderSeasonalPatterns() {
    const patterns = [
        { season: 'Spring', impact: 'High demand for leafy greens and root vegetables' },
        { season: 'Summer', impact: 'Peak season for tomatoes, peppers, and berries' },
        { season: 'Fall', impact: 'Apple harvest season, pumpkin and squash demand' },
        { season: 'Winter', impact: 'Greenhouse vegetables and stored produce preferred' }
    ];
    
    return patterns.map(pattern => `
        <div class="seasonal-pattern">
            <span class="season-name">${pattern.season}</span>
            <span class="season-impact">${pattern.impact}</span>
        </div>
    `).join('');
}

function renderRiskFactors() {
    const risks = [
        { factor: 'Weather Variability', level: 'Medium', impact: 'Affects 15% of demand' },
        { factor: 'Economic Conditions', level: 'Low', impact: 'Stable consumer spending' },
        { factor: 'Competition', level: 'Medium', impact: '2 new entrants this quarter' },
        { factor: 'Supply Chain', level: 'Low', impact: 'Reliable delivery network' }
    ];
    
    return risks.map(risk => `
        <div class="risk-item">
            <div class="risk-factor">
                <span class="risk-name">${risk.factor}</span>
                <span class="risk-level ${risk.level.toLowerCase()}">${risk.level}</span>
            </div>
            <span class="risk-impact">${risk.impact}</span>
        </div>
    `).join('');
}

function renderHarvestCalendar() {
    const harvestData = AppState.harvestCalendar;
    const currentSeason = getCurrentSeason();
    const currentMonth = getCurrentMonth();
    
    return `
        <div class="harvest-calendar">
            <div class="calendar-header">
                <h2>Dynamic Harvest Calendar</h2>
                <p>Discover what's fresh right now and pre-book future harvests</p>
            </div>
            
            <!-- Current Season Highlight -->
            <div class="current-season-card">
                <div class="season-indicator" style="background: ${harvestData.seasons[currentSeason].color}">
                    <h3>${harvestData.seasons[currentSeason].name} Season</h3>
                    <p>${harvestData.seasons[currentSeason].description}</p>
                </div>
                <div class="current-availability">
                    <h4>What's Fresh Right Now</h4>
                    <div class="availability-grid">
                        ${renderCurrentAvailability(currentMonth)}
                    </div>
                </div>
            </div>
            
            <!-- Seasonal Calendar -->
            <div class="seasonal-calendar">
                <h3>Seasonal Availability Calendar</h3>
                <div class="calendar-navigation">
                    <button class="season-btn active" data-season="all">All Seasons</button>
                    ${Object.values(harvestData.seasons).map(season => `
                        <button class="season-btn" data-season="${season.name.toLowerCase()}" style="--season-color: ${season.color}">
                            ${season.name}
                        </button>
                    `).join('')}
                </div>
                <div class="calendar-grid">
                    ${renderSeasonalCalendar()}
                </div>
            </div>
            
            <!-- Pre-Booking Section -->
            <div class="pre-booking-section">
                <h3>Pre-Book Future Harvests</h3>
                <p>Secure your harvest in advance and save money!</p>
                <div class="pre-booking-grid">
                    ${renderPreBookingCards()}
                </div>
            </div>
            
            <!-- Seasonal Education -->
            <div class="seasonal-education">
                <div class="education-grid">
                    <div class="education-card">
                        <h4>Why Eat Seasonally?</h4>
                        <div class="benefits-list">
                            ${harvestData.educationalContent.benefits.map(benefit => `
                                <div class="benefit-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>${benefit}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="education-card">
                        <h4>Seasonal Eating Tips</h4>
                        <div class="tips-list">
                            ${harvestData.educationalContent.tips.map(tip => `
                                <div class="tip-item">
                                    <i class="fas fa-lightbulb"></i>
                                    <span>${tip}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Seasonal Recipes -->
            <div class="seasonal-recipes">
                <h3>Seasonal Recipe Inspiration</h3>
                <div class="recipes-tabs">
                    ${Object.entries(harvestData.seasonalRecipes).map(([season, recipes]) => `
                        <button class="recipe-tab ${season === currentSeason ? 'active' : ''}" data-season="${season}">
                            ${harvestData.seasons[season].name}
                        </button>
                    `).join('')}
                </div>
                <div class="recipes-content">
                    ${renderSeasonalRecipes(currentSeason)}
                </div>
            </div>
        </div>
    `;
}

function getCurrentSeason() {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
}

function getCurrentMonth() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[new Date().getMonth()];
}

function renderCurrentAvailability(currentMonth) {
    const harvestData = AppState.harvestCalendar;
    const availableNow = [];
    
    Object.entries(harvestData.harvestSchedule).forEach(([product, data]) => {
        if (data.availability.includes(currentMonth)) {
            availableNow.push({ name: product, ...data });
        }
    });
    
    return availableNow.map(product => `
        <div class="availability-item">
            <div class="availability-icon">
                <i class="fas fa-seedling"></i>
            </div>
            <div class="availability-info">
                <h5>${product.name}</h5>
                <span class="availability-status ${product.peakMonths.includes(currentMonth) ? 'peak' : 'available'}">
                    ${product.peakMonths.includes(currentMonth) ? 'Peak Season' : 'Available'}
                </span>
            </div>
        </div>
    `).join('');
}

function renderSeasonalCalendar() {
    const harvestData = AppState.harvestCalendar;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return months.map(month => {
        const monthProducts = [];
        Object.entries(harvestData.harvestSchedule).forEach(([product, data]) => {
            if (data.availability.includes(month)) {
                monthProducts.push({
                    name: product,
                    isPeak: data.peakMonths.includes(month),
                    season: data.season
                });
            }
        });
        
        return `
            <div class="calendar-month">
                <h4>${month}</h4>
                <div class="month-products">
                    ${monthProducts.map(product => `
                        <div class="product-indicator ${product.isPeak ? 'peak' : 'available'} ${product.season}" 
                             title="${product.name} ${product.isPeak ? '(Peak Season)' : '(Available)'}">
                            <i class="fas fa-circle"></i>
                            <span>${product.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function renderPreBookingCards() {
    const harvestData = AppState.harvestCalendar;
    
    return Object.entries(harvestData.harvestSchedule)
        .filter(([_, data]) => data.preBooking.available)
        .map(([productName, data]) => {
            const product = AppState.products.find(p => p.name === productName);
            const discountPrice = product ? product.price * (1 - data.preBooking.priceDiscount) : 0;
            
            return `
                <div class="pre-booking-card">
                    <div class="pre-booking-header">
                        <h4>${productName}</h4>
                        <div class="pre-booking-badge">
                            <i class="fas fa-calendar-check"></i>
                            Pre-Book Available
                        </div>
                    </div>
                    <div class="pre-booking-details">
                        <div class="booking-info">
                            <div class="info-item">
                                <i class="fas fa-clock"></i>
                                <span>${data.preBooking.advanceNotice} days notice</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-box"></i>
                                <span>Max ${data.preBooking.maxQuantity} units</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-percentage"></i>
                                <span>${Math.round(data.preBooking.priceDiscount * 100)}% discount</span>
                            </div>
                        </div>
                        <div class="pricing">
                            <span class="original-price">$${product ? product.price.toFixed(2) : '0.00'}</span>
                            <span class="discount-price">$${discountPrice.toFixed(2)}</span>
                            <span class="unit">/${product ? product.unit : 'unit'}</span>
                        </div>
                        <div class="seasonal-tips">
                            <h5>Seasonal Tips:</h5>
                            <ul>
                                ${data.seasonalTips.map(tip => `<li>${tip}</li>`).join('')}
                            </ul>
                        </div>
                        <button class="btn-primary pre-book-btn" onclick="openPreBookingModal('${productName}')">
                            <i class="fas fa-calendar-plus"></i>
                            Pre-Book Harvest
                        </button>
                    </div>
                </div>
            `;
        }).join('');
}

function renderSeasonalRecipes(season) {
    const harvestData = AppState.harvestCalendar;
    const recipes = harvestData.seasonalRecipes[season];
    
    return recipes.map(recipe => `
        <div class="recipe-card">
            <div class="recipe-header">
                <h4>${recipe.name}</h4>
                <span class="difficulty-badge ${recipe.difficulty.toLowerCase()}">${recipe.difficulty}</span>
            </div>
            <div class="recipe-ingredients">
                <h5>Ingredients:</h5>
                <div class="ingredients-list">
                    ${recipe.ingredients.map(ingredient => `
                        <span class="ingredient-tag">${ingredient}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function openPreBookingModal(productName) {
    const harvestData = AppState.harvestCalendar;
    const product = AppState.products.find(p => p.name === productName);
    const bookingData = harvestData.harvestSchedule[productName].preBooking;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <div style="padding: var(--spacing-6);">
                <h2>Pre-Book ${productName}</h2>
                <div class="booking-summary">
                    <div class="booking-benefits">
                        <div class="benefit">
                            <i class="fas fa-percentage"></i>
                            <span>${Math.round(bookingData.priceDiscount * 100)}% discount</span>
                        </div>
                        <div class="benefit">
                            <i class="fas fa-shield-alt"></i>
                            <span>Guaranteed availability</span>
                        </div>
                        <div class="benefit">
                            <i class="fas fa-leaf"></i>
                            <span>Fresh from harvest</span>
                        </div>
                    </div>
                </div>
                <form class="booking-form">
                    <div class="form-group">
                        <label for="harvest-date">Preferred Harvest Date</label>
                        <input type="date" id="harvest-date" required min="${getMinBookingDate(bookingData.advanceNotice)}">
                    </div>
                    <div class="form-group">
                        <label for="quantity">Quantity</label>
                        <input type="number" id="quantity" min="1" max="${bookingData.maxQuantity}" value="1" required>
                        <span class="quantity-limit">Max: ${bookingData.maxQuantity} units</span>
                    </div>
                    <div class="form-group">
                        <label for="special-notes">Special Notes (Optional)</label>
                        <textarea id="special-notes" placeholder="Any special requirements or preferences..."></textarea>
                    </div>
                    <div class="booking-total">
                        <div class="pricing-breakdown">
                            <div class="price-line">
                                <span>Regular Price:</span>
                                <span>$${product.price.toFixed(2)}/${product.unit}</span>
                            </div>
                            <div class="price-line discount">
                                <span>Pre-Book Discount (${Math.round(bookingData.priceDiscount * 100)}%):</span>
                                <span>-$${(product.price * bookingData.priceDiscount).toFixed(2)}</span>
                            </div>
                            <div class="price-line total">
                                <span>Your Price:</span>
                                <span>$${(product.price * (1 - bookingData.priceDiscount)).toFixed(2)}/${product.unit}</span>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn-primary btn-large">
                        <i class="fas fa-calendar-check"></i>
                        Confirm Pre-Booking
                    </button>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Add form submission handler
    modal.querySelector('.booking-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Pre-booking confirmed! You will receive a confirmation email and reminder before harvest.');
        modal.remove();
        document.body.style.overflow = 'auto';
    });
}

function getMinBookingDate(advanceNotice) {
    const date = new Date();
    date.setDate(date.getDate() + advanceNotice);
    return date.toISOString().split('T')[0];
}

// Utility Functions
function openMarketplace() {
    if (AppState.isAuthenticated && AppState.userType === 'consumer') {
        openDashboard();
        // Switch to marketplace section
        setTimeout(() => {
            const marketplaceBtn = document.querySelector('[data-section="marketplace"]');
            if (marketplaceBtn) {
                marketplaceBtn.click();
            }
        }, 100);
    } else {
        openAuthModal();
    }
}

function scrollToFeatures() {
    document.querySelector('.features').scrollIntoView({ behavior: 'smooth' });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate feature cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .hero-card').forEach(card => {
        observer.observe(card);
    });
});

// Add loading states and error handling
function showLoading(element) {
    element.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
}

function showError(message) {
    alert('Error: ' + message);
}

// Export functions for global access
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.setQuantity = setQuantity;
window.viewProduct = viewProduct;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
