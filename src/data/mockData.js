/**
 * mockData.js
 * 
 * This file contains mock data for the ByCafe e-commerce application.
 * It provides consistent data for testing and development purposes.
 */

// Banner slides for the homepage carousel
export const bannerSlides = [
  {
    id: '1',
    imageUrl: '/images/products/coffee-bean.jpeg',
    title: 'Premium Coffee Experience',
    description: 'Discover our artisanal coffee selection, sourced from the finest beans around the world',
    ctaLink: '/catalog?category=coffee',
    ctaText: 'Explore Coffee'
  },
  {
    id: '2',
    imageUrl: '/images/coffee-grinder.jpg',
    title: 'Brewing Equipment',
    description: 'Professional-grade equipment for the perfect cup every time',
    ctaLink: '/catalog?category=equipment',
    ctaText: 'Shop Equipment'
  },
  {
    id: '3',
    imageUrl: '/images/ceramic-mug.jpg',
    title: 'Summer Sale',
    description: 'Up to 50% off on selected items',
    ctaLink: '/catalog?sale=true',
    ctaText: 'Shop Now'
  }
];

// Featured products for the homepage
export const featuredProducts = [
  {
    id: '1',
    name: 'Ethiopian Yirgacheffe',
    title: 'Ethiopian Yirgacheffe',
    price: 19.99,
    originalPrice: 24.99,
    imageUrl: '/images/products/coffee-bean.jpeg',
    image: '/images/products/coffee-bean.jpeg',
    rating: 4.8,
    reviewCount: 124,
    isNew: false,
    isSale: true,
    category: 'coffee'
  },
  {
    id: '2',
    name: 'Precision Coffee Grinder',
    title: 'Precision Coffee Grinder',
    price: 89.99,
    imageUrl: '/images/coffee-grinder.jpg',
    image: '/images/coffee-grinder.jpg',
    rating: 4.6,
    reviewCount: 89,
    isNew: true,
    isSale: false,
    category: 'equipment'
  },
  {
    id: '3',
    name: 'Ceramic Pour-Over Set',
    title: 'Ceramic Pour-Over Set',
    price: 59.99,
    imageUrl: '/images/ceramic-mug.jpg',
    image: '/images/ceramic-mug.jpg',
    rating: 4.5,
    reviewCount: 76,
    isNew: false,
    isSale: false,
    category: 'accessories'
  },
  {
    id: '4',
    name: 'Colombian Supremo',
    title: 'Colombian Supremo',
    price: 17.99,
    originalPrice: 21.99,
    imageUrl: '/images/colombian-supremo.jpg',
    image: '/images/colombian-supremo.jpg',
    rating: 4.7,
    reviewCount: 112,
    isNew: false,
    isSale: true,
    category: 'coffee'
  }
];

// Categories for the shop by category section
export const categories = [
  {
    id: 'coffee',
    name: 'Coffee',
    icon: '☕',
    description: 'Premium beans from around the world',
    imageUrl: '/images/products/coffee-bean.jpeg'
  },
  {
    id: 'equipment',
    name: 'Equipment',
    icon: '⚙️',
    description: 'Professional brewing equipment',
    imageUrl: '/images/coffee-grinder.jpg'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: '🥄',
    description: 'Enhance your coffee experience',
    imageUrl: '/images/ceramic-mug.jpg'
  },
  {
    id: 'gifts',
    name: 'Gifts',
    icon: '🎁',
    description: 'Perfect presents for coffee lovers',
    imageUrl: '/images/gift-box.jpg'
  }
];

// Product catalog items
export const productCatalog = [
  ...featuredProducts,
  {
    id: '5',
    name: 'French Press',
    title: 'French Press',
    price: 34.99,
    imageUrl: '/images/french-press.jpg',
    image: '/images/french-press.jpg',
    rating: 4.3,
    reviewCount: 67,
    isNew: false,
    isSale: false,
    category: 'equipment'
  },
  {
    id: '6',
    name: 'Coffee Subscription Box',
    title: 'Coffee Subscription Box',
    price: 29.99,
    imageUrl: '/images/coffee-subscription-box.jpg',
    image: '/images/coffee-subscription-box.jpg',
    rating: 4.9,
    reviewCount: 203,
    isNew: true,
    isSale: false,
    category: 'coffee'
  }
];

// Customer reviews
export const customerReviews = [
  {
    id: '1',
    name: 'Jane Doe',
    avatar: '/images/avatars/jane-doe.jpg',
    rating: 5,
    date: '2023-05-15',
    text: 'The Ethiopian Yirgacheffe is absolutely divine. The fruity notes and bright acidity make it my go-to morning brew.',
    productId: '1'
  },
  {
    id: '2',
    name: 'John Smith',
    avatar: '/images/avatars/john-smith.jpg',
    rating: 4.5,
    date: '2023-04-28',
    text: 'ByCafe\'s Precision Coffee Grinder changed my brewing game. Consistent grind every time.',
    productId: '2'
  },
  {
    id: '3',
    name: 'Alex Johnson',
    avatar: '/images/avatars/alex-johnson.jpg',
    rating: 5,
    date: '2023-06-02',
    text: 'Fast shipping, excellent customer service, and the coffee is always fresh. This is customer loyalty done right.',
    productId: '4'
  }
];

export default {
  bannerSlides,
  featuredProducts,
  categories,
  productCatalog,
  customerReviews
};
