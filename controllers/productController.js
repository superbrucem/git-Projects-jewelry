const express = require('express');
const router = express.Router();

// Sample product database
const products = {
  // Necklaces
  'diamond-pendant': {
    id: 'diamond-pendant',
    name: 'Diamond Pendant Necklace',
    category: 'Necklaces',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'This elegant diamond pendant necklace features a stunning 1-carat diamond set in 18k white gold. The pendant hangs from a delicate 18-inch chain that complements the brilliance of the diamond.',
    details: 'The diamond is certified VS1 clarity and F color, ensuring exceptional brilliance and fire. The chain is secured with a lobster clasp for added security.',
    features: [
      '1-carat diamond with VS1 clarity and F color',
      '18k white gold setting and chain',
      '18-inch chain length',
      'Lobster clasp closure',
      'Comes with a certificate of authenticity'
    ],
    isNew: false,
    isLimited: false
  },
  'pearl-necklace': {
    id: 'pearl-necklace',
    name: 'Pearl Strand Necklace',
    category: 'Necklaces',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'This classic pearl strand necklace features 36 perfectly matched Akoya pearls. Each pearl has been hand-selected for its luster, color, and shape, creating a timeless piece that can be worn for any occasion.',
    details: 'The pearls range from 7mm to 7.5mm in diameter and are strung on silk with knots between each pearl. The necklace is finished with an 18k white gold clasp.',
    features: [
      '36 Akoya pearls, 7mm-7.5mm in diameter',
      'Hand-knotted on silk thread',
      '18-inch length',
      '18k white gold clasp',
      'Includes a luxury jewelry box'
    ],
    isNew: false,
    isLimited: false
  },
  'sapphire-choker': {
    id: 'sapphire-choker',
    name: 'Sapphire Choker Necklace',
    category: 'Necklaces',
    price: 1599.99,
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'This stunning sapphire choker necklace features five oval-cut blue sapphires surrounded by halos of small diamonds. The sapphires graduate in size with the largest at the center.',
    details: 'The sapphires total 3.5 carats, while the diamonds total 1.2 carats. The necklace is crafted in 18k white gold and has an adjustable length from 14 to 16 inches.',
    features: [
      'Five oval-cut blue sapphires totaling 3.5 carats',
      'Diamond halos totaling 1.2 carats',
      '18k white gold setting',
      'Adjustable length: 14-16 inches',
      'Secure box clasp with safety catch'
    ],
    isNew: false,
    isLimited: false
  },
  
  // Rings
  'diamond-solitaire': {
    id: 'diamond-solitaire',
    name: 'Diamond Solitaire Ring',
    category: 'Rings',
    price: 2499.99,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'This classic diamond solitaire ring features a stunning 1.5-carat round brilliant diamond set in a timeless six-prong platinum setting. The minimalist design allows the diamond to be the star.',
    details: 'The diamond is certified VS2 clarity and G color, ensuring excellent brilliance. The platinum band measures 2mm in width, providing durability while maintaining an elegant profile.',
    features: [
      '1.5-carat round brilliant diamond',
      'VS2 clarity, G color',
      'Six-prong platinum setting',
      '2mm band width',
      'Includes diamond certificate'
    ],
    isNew: false,
    isLimited: false
  },
  'emerald-halo': {
    id: 'emerald-halo',
    name: 'Emerald Halo Ring',
    category: 'Rings',
    price: 1899.99,
    image: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'This stunning emerald halo ring features a 1-carat emerald-cut emerald surrounded by a halo of small round diamonds. The vibrant green of the emerald is beautifully complemented by the sparkle of the diamonds.',
    details: 'The emerald is of AAA quality with excellent color saturation. The diamonds total 0.5 carats and are set in 18k white gold. The band tapers for a comfortable fit.',
    features: [
      '1-carat emerald-cut emerald of AAA quality',
      'Diamond halo totaling 0.5 carats',
      '18k white gold setting',
      'Tapered band for comfort',
      'Includes a luxury ring box'
    ],
    isNew: true,
    isLimited: false
  },
  'gold-band': {
    id: 'gold-band',
    name: 'Classic Gold Band',
    category: 'Rings',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'This classic gold band is crafted from solid 14k yellow gold with a comfort-fit interior. The timeless design makes it perfect for everyday wear or as a wedding band.',
    details: 'The band has a polished finish and measures 5mm in width. The comfort-fit design features a slightly rounded interior that allows the ring to slide easily over the knuckle and sit comfortably on the finger.',
    features: [
      'Solid 14k yellow gold',
      '5mm width',
      'Comfort-fit design',
      'Polished finish',
      'Available in sizes 5-12'
    ],
    isNew: false,
    isLimited: false
  },
  
  // Earrings
  'diamond-studs': {
    id: 'diamond-studs',
    name: 'Diamond Stud Earrings',
    category: 'Earrings',
    price: 1499.99,
    image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'These classic diamond stud earrings feature a pair of round brilliant diamonds totaling 1 carat. Set in a four-prong 18k white gold setting, these earrings are the perfect everyday luxury.',
    details: 'The diamonds are matched for color (G) and clarity (VS1), ensuring excellent brilliance and fire. The earrings are secured with push-back closures for comfort and security.',
    features: [
      'Round brilliant diamonds totaling 1 carat',
      'G color, VS1 clarity',
      'Four-prong 18k white gold settings',
      'Push-back closures',
      'Includes a certificate of authenticity'
    ],
    isNew: false,
    isLimited: false
  },
  'pearl-drops': {
    id: 'pearl-drops',
    name: 'Pearl Drop Earrings',
    category: 'Earrings',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'These elegant pearl drop earrings feature 8mm Akoya pearls suspended from 18k white gold chains. Small diamonds accent the top of each earring, adding a touch of sparkle.',
    details: 'The Akoya pearls are known for their excellent luster and round shape. The diamonds total 0.2 carats and are set in 18k white gold. The earrings have a drop length of 1.5 inches.',
    features: [
      '8mm Akoya pearls',
      'Diamond accents totaling 0.2 carats',
      '18k white gold setting and chains',
      '1.5-inch drop length',
      'Secure lever-back closures'
    ],
    isNew: true,
    isLimited: false
  },
  'ruby-hoops': {
    id: 'ruby-hoops',
    name: 'Ruby Hoop Earrings',
    category: 'Earrings',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'These stunning ruby hoop earrings feature 12 round rubies set in 14k yellow gold. The vibrant red of the rubies creates a bold and elegant look that will turn heads.',
    details: 'The rubies total 1.5 carats and are channel-set in 14k yellow gold. The hoops have a diameter of 1 inch and are secured with hinged snap closures.',
    features: [
      '12 round rubies totaling 1.5 carats',
      '14k yellow gold setting',
      '1-inch diameter',
      'Channel-set design',
      'Hinged snap closures'
    ],
    isNew: false,
    isLimited: true
  },
  
  // New Arrivals - Spring Collection
  'floral-pendant': {
    id: 'floral-pendant',
    name: 'Floral Diamond Pendant',
    category: 'Necklaces',
    price: 1499.99,
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'This exquisite floral diamond pendant features a cluster of diamonds arranged in a delicate flower pattern. The pendant is crafted in 18k rose gold, giving it a warm, romantic glow.',
    details: 'The diamonds total 0.75 carats and are set in 18k rose gold. The pendant hangs from an 18-inch rose gold chain and has a diameter of 15mm.',
    features: [
      'Diamonds totaling 0.75 carats',
      '18k rose gold setting and chain',
      '18-inch chain length',
      '15mm pendant diameter',
      'Spring-ring clasp'
    ],
    isNew: true,
    isLimited: false
  },
  'twisted-vine': {
    id: 'twisted-vine',
    name: 'Twisted Vine Ring',
    category: 'Rings',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'This nature-inspired ring features a twisted vine design with small diamonds set along the band. The organic shape symbolizes growth and renewal, making it perfect for the spring season.',
    details: 'The diamonds total 0.35 carats and are set in 14k white gold. The band has a width of 3mm at its widest point and tapers for comfort.',
    features: [
      'Diamonds totaling 0.35 carats',
      '14k white gold setting',
      'Organic twisted vine design',
      '3mm maximum width',
      'Available in sizes 5-10'
    ],
    isNew: true,
    isLimited: false
  },
  'cascade-earrings': {
    id: 'cascade-earrings',
    name: 'Cascade Earrings',
    category: 'Earrings',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'These stunning cascade earrings feature multiple strands of small diamonds that create a waterfall effect. The movement of these earrings catches the light beautifully as you move.',
    details: 'The diamonds total 0.6 carats and are set in 18k white gold. The earrings have a drop length of 2 inches and move gracefully with every turn of the head.',
    features: [
      'Diamonds totaling 0.6 carats',
      '18k white gold setting',
      '2-inch drop length',
      'Cascading waterfall design',
      'Secure lever-back closures'
    ],
    isNew: true,
    isLimited: false
  },
  
  // Limited Edition
  'celestial-necklace': {
    id: 'celestial-necklace',
    name: 'Celestial Diamond Necklace',
    category: 'Necklaces',
    price: 2999.99,
    oldPrice: 3499.99,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'This limited edition celestial diamond necklace features a stunning arrangement of diamonds in a star and moon pattern. Only 50 pieces have been created worldwide.',
    details: 'The diamonds total 2.5 carats and are set in 18k white gold. The pendant has a diameter of 25mm and hangs from a 20-inch white gold chain.',
    features: [
      'Diamonds totaling 2.5 carats',
      '18k white gold setting and chain',
      '20-inch chain length',
      '25mm pendant diameter',
      'Limited to 50 pieces worldwide'
    ],
    isNew: false,
    isLimited: true
  },
  'royal-ruby': {
    id: 'royal-ruby',
    name: 'Royal Ruby Ring',
    category: 'Rings',
    price: 3499.99,
    oldPrice: 3999.99,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'This majestic limited edition ring features a 2-carat oval ruby surrounded by a double halo of diamonds. The deep red of the ruby is reminiscent of royal jewels throughout history.',
    details: 'The ruby is of Burmese origin with exceptional color. The diamonds total 1.5 carats and are set in platinum. Only 25 pieces have been created.',
    features: [
      '2-carat oval Burmese ruby',
      'Diamond double halo totaling 1.5 carats',
      'Platinum setting',
      'Split shank band design',
      'Limited to 25 pieces worldwide'
    ],
    isNew: false,
    isLimited: true
  },
  'emerald-chandelier': {
    id: 'emerald-chandelier',
    name: 'Emerald Chandelier Earrings',
    category: 'Earrings',
    price: 2799.99,
    oldPrice: 3299.99,
    image: 'https://images.unsplash.com/photo-1611107683227-e9060eccd846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1611107683227-e9060eccd846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'These spectacular limited edition chandelier earrings feature Colombian emeralds and diamonds arranged in an elaborate design. The earrings make a dramatic statement for special occasions.',
    details: 'The emeralds total 3 carats and the diamonds total 2 carats. The earrings are crafted in 18k white gold and have a drop length of 2.5 inches. Only 15 pairs have been created.',
    features: [
      'Colombian emeralds totaling 3 carats',
      'Diamonds totaling 2 carats',
      '18k white gold setting',
      '2.5-inch drop length',
      'Limited to 15 pairs worldwide'
    ],
    isNew: false,
    isLimited: true
  }
};

// Get all product IDs
const getAllProductIds = () => Object.keys(products);

// Get related products (excluding the current product)
const getRelatedProducts = (currentProductId, category, limit = 3) => {
  return Object.values(products)
    .filter(product => product.id !== currentProductId && product.category === category)
    .slice(0, limit);
};

// Product details route
router.get('/:id', (req, res) => {
  const productId = req.params.id;
  const product = products[productId];
  
  if (!product) {
    return res.status(404).render('404', { 
      title: 'Product Not Found',
      active: ''
    });
  }
  
  const relatedProducts = getRelatedProducts(productId, product.category);
  
  res.render('product-details', {
    title: `Dean Aaron Jewels - ${product.name}`,
    active: product.category.toLowerCase() === 'necklaces' || product.category.toLowerCase() === 'rings' || product.category.toLowerCase() === 'earrings' ? 'collections' : 'new-arrivals',
    product,
    relatedProducts
  });
});

module.exports = router;
