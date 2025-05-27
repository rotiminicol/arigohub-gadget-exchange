
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  condition: 'New' | 'Used' | 'Refurbished';
  rating: number;
  reviews: number;
  category: 'phones' | 'laptops' | 'gaming' | 'audio';
  brand: string;
  inStock: boolean;
  stockCount: number;
  description: string;
  specifications: Record<string, string>;
  features: string[];
}

export const products: Product[] = [
  // Phones
  {
    id: "1",
    name: "iPhone 15 Pro Max 256GB Natural Titanium",
    price: 850000,
    originalPrice: 950000,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.8,
    reviews: 24,
    category: "phones",
    brand: "Apple",
    inStock: true,
    stockCount: 5,
    description: "The iPhone 15 Pro Max features a durable titanium design with the powerful A17 Pro chip.",
    specifications: {
      "Display": "6.7-inch Super Retina XDR display",
      "Chip": "A17 Pro chip",
      "Storage": "256GB",
      "Camera": "48MP Main | 12MP Ultra Wide | 12MP Telephoto"
    },
    features: ["Titanium design", "A17 Pro chip", "Advanced camera system"]
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra 512GB",
    price: 720000,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.6,
    reviews: 15,
    category: "phones",
    brand: "Samsung",
    inStock: true,
    stockCount: 8,
    description: "Samsung Galaxy S24 Ultra with S Pen and advanced AI features.",
    specifications: {
      "Display": "6.8-inch Dynamic AMOLED 2X",
      "Processor": "Snapdragon 8 Gen 3",
      "Storage": "512GB",
      "Camera": "200MP Main | 50MP Periscope Telephoto"
    },
    features: ["S Pen included", "AI photo editing", "Titanium frame"]
  },
  {
    id: "3",
    name: "iPhone 14 Pro 128GB Deep Purple",
    price: 650000,
    originalPrice: 750000,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop",
    condition: "Refurbished",
    rating: 4.7,
    reviews: 32,
    category: "phones",
    brand: "Apple",
    inStock: true,
    stockCount: 3,
    description: "iPhone 14 Pro with Dynamic Island and Pro camera system.",
    specifications: {
      "Display": "6.1-inch Super Retina XDR display",
      "Chip": "A16 Bionic chip",
      "Storage": "128GB",
      "Camera": "48MP Main | 12MP Ultra Wide"
    },
    features: ["Dynamic Island", "ProRAW photos", "Action mode video"]
  },
  {
    id: "4",
    name: "Google Pixel 8 Pro 256GB",
    price: 580000,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.5,
    reviews: 18,
    category: "phones",
    brand: "Google",
    inStock: true,
    stockCount: 6,
    description: "Google Pixel 8 Pro with Magic Eraser and Call Screen.",
    specifications: {
      "Display": "6.7-inch LTPO OLED display",
      "Processor": "Google Tensor G3",
      "Storage": "256GB",
      "Camera": "50MP Main | 48MP Ultra Wide"
    },
    features: ["Magic Eraser", "Call Screen", "Live Translate"]
  },
  {
    id: "5",
    name: "OnePlus 12 256GB",
    price: 450000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.4,
    reviews: 12,
    category: "phones",
    brand: "OnePlus",
    inStock: true,
    stockCount: 4,
    description: "OnePlus 12 with Snapdragon 8 Gen 3 and 100W charging.",
    specifications: {
      "Display": "6.82-inch LTPO AMOLED",
      "Processor": "Snapdragon 8 Gen 3",
      "Storage": "256GB",
      "Camera": "50MP Main | 64MP Periscope"
    },
    features: ["100W SuperVOOC charging", "Hasselblad camera", "OxygenOS 14"]
  },

  // Laptops
  {
    id: "6",
    name: "MacBook Pro 14-inch M3 Chip",
    price: 1200000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.9,
    reviews: 18,
    category: "laptops",
    brand: "Apple",
    inStock: true,
    stockCount: 3,
    description: "MacBook Pro with M3 chip for professional workflows.",
    specifications: {
      "Processor": "Apple M3 8-core CPU",
      "Memory": "16GB unified memory",
      "Storage": "512GB SSD",
      "Display": "14.2-inch Liquid Retina XDR"
    },
    features: ["M3 chip", "Liquid Retina XDR display", "22-hour battery life"]
  },
  {
    id: "7",
    name: "Dell XPS 13 Plus Intel i7",
    price: 850000,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.6,
    reviews: 25,
    category: "laptops",
    brand: "Dell",
    inStock: true,
    stockCount: 5,
    description: "Dell XPS 13 Plus with Intel 12th Gen processor.",
    specifications: {
      "Processor": "Intel Core i7-1260P",
      "Memory": "16GB LPDDR5",
      "Storage": "512GB SSD",
      "Display": "13.4-inch OLED InfinityEdge"
    },
    features: ["OLED display", "Zero-lattice keyboard", "Premium design"]
  },
  {
    id: "8",
    name: "HP Spectre x360 14",
    price: 750000,
    originalPrice: 850000,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop",
    condition: "Refurbished",
    rating: 4.5,
    reviews: 20,
    category: "laptops",
    brand: "HP",
    inStock: true,
    stockCount: 4,
    description: "HP Spectre x360 convertible laptop with touch screen.",
    specifications: {
      "Processor": "Intel Core i7-1165G7",
      "Memory": "16GB DDR4",
      "Storage": "1TB SSD",
      "Display": "14-inch OLED Touch"
    },
    features: ["360-degree hinge", "OLED touchscreen", "Bang & Olufsen audio"]
  },
  {
    id: "9",
    name: "ASUS ROG Zephyrus G14",
    price: 980000,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.7,
    reviews: 35,
    category: "laptops",
    brand: "ASUS",
    inStock: true,
    stockCount: 2,
    description: "ASUS ROG Zephyrus G14 gaming laptop with AMD Ryzen.",
    specifications: {
      "Processor": "AMD Ryzen 9 6900HS",
      "Memory": "32GB DDR5",
      "Storage": "1TB SSD",
      "Graphics": "RTX 3070 Ti"
    },
    features: ["AniMe Matrix display", "RTX 3070 Ti", "14-inch QHD display"]
  },
  {
    id: "10",
    name: "Lenovo ThinkPad X1 Carbon",
    price: 920000,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.8,
    reviews: 28,
    category: "laptops",
    brand: "Lenovo",
    inStock: true,
    stockCount: 6,
    description: "Lenovo ThinkPad X1 Carbon business laptop.",
    specifications: {
      "Processor": "Intel Core i7-1165G7",
      "Memory": "16GB LPDDR4x",
      "Storage": "512GB SSD",
      "Display": "14-inch WUXGA IPS"
    },
    features: ["Carbon fiber construction", "ThinkShield security", "Rapid Charge"]
  },

  // Gaming
  {
    id: "11",
    name: "PlayStation 5 Console with Controller",
    price: 320000,
    originalPrice: 350000,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    condition: "Used",
    rating: 4.7,
    reviews: 31,
    category: "gaming",
    brand: "Sony",
    inStock: true,
    stockCount: 8,
    description: "PlayStation 5 console with DualSense wireless controller.",
    specifications: {
      "CPU": "AMD Zen 2-based CPU",
      "GPU": "AMD RDNA 2-based GPU",
      "Memory": "16GB GDDR6",
      "Storage": "825GB SSD"
    },
    features: ["4K gaming", "Ray tracing", "3D audio", "Haptic feedback"]
  },
  {
    id: "12",
    name: "Xbox Series X",
    price: 310000,
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.6,
    reviews: 25,
    category: "gaming",
    brand: "Microsoft",
    inStock: true,
    stockCount: 5,
    description: "Xbox Series X - The fastest, most powerful Xbox ever.",
    specifications: {
      "CPU": "AMD Zen 2 8-core",
      "GPU": "AMD RDNA 2",
      "Memory": "16GB GDDR6",
      "Storage": "1TB SSD"
    },
    features: ["4K gaming", "120fps", "Quick Resume", "Smart Delivery"]
  },
  {
    id: "13",
    name: "Nintendo Switch OLED Model",
    price: 185000,
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.8,
    reviews: 42,
    category: "gaming",
    brand: "Nintendo",
    inStock: true,
    stockCount: 12,
    description: "Nintendo Switch OLED with vibrant 7-inch OLED screen.",
    specifications: {
      "Display": "7-inch OLED touchscreen",
      "CPU": "NVIDIA Custom Tegra",
      "Memory": "4GB RAM",
      "Storage": "64GB internal"
    },
    features: ["OLED display", "Enhanced audio", "Wide adjustable stand"]
  },
  {
    id: "14",
    name: "Steam Deck 512GB",
    price: 420000,
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.5,
    reviews: 18,
    category: "gaming",
    brand: "Valve",
    inStock: true,
    stockCount: 3,
    description: "Steam Deck portable gaming PC with 512GB storage.",
    specifications: {
      "CPU": "AMD Zen 2 4c/8t",
      "GPU": "AMD RDNA 2",
      "Memory": "16GB LPDDR5",
      "Storage": "512GB NVMe SSD"
    },
    features: ["PC gaming on-the-go", "SteamOS", "Anti-glare etched glass"]
  },
  {
    id: "15",
    name: "Razer DeathAdder V3 Gaming Mouse",
    price: 35000,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.7,
    reviews: 156,
    category: "gaming",
    brand: "Razer",
    inStock: true,
    stockCount: 25,
    description: "Razer DeathAdder V3 ergonomic gaming mouse.",
    specifications: {
      "Sensor": "Focus Pro 30K Optical",
      "DPI": "30,000 DPI",
      "Buttons": "8 programmable buttons",
      "Battery": "90-hour battery life"
    },
    features: ["30K DPI sensor", "90-hour battery", "Ergonomic design"]
  },

  // Audio
  {
    id: "16",
    name: "AirPods Pro (2nd generation)",
    price: 180000,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.9,
    reviews: 32,
    category: "audio",
    brand: "Apple",
    inStock: true,
    stockCount: 15,
    description: "AirPods Pro with Active Noise Cancellation.",
    specifications: {
      "Driver": "Apple-designed driver",
      "Chip": "Apple H2 chip",
      "Battery": "6 hours (ANC on)",
      "Case Battery": "30 hours total"
    },
    features: ["Active Noise Cancellation", "Transparency mode", "Spatial Audio"]
  },
  {
    id: "17",
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 220000,
    originalPrice: 250000,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.8,
    reviews: 89,
    category: "audio",
    brand: "Sony",
    inStock: true,
    stockCount: 8,
    description: "Sony WH-1000XM5 with industry-leading noise canceling.",
    specifications: {
      "Driver": "30mm driver unit",
      "Frequency": "4Hz-40,000Hz",
      "Battery": "30 hours",
      "Charging": "Quick charge 3 min = 3 hours"
    },
    features: ["Industry-leading noise canceling", "30-hour battery", "Multipoint connection"]
  },
  {
    id: "18",
    name: "JBL Charge 5 Portable Speaker",
    price: 85000,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.6,
    reviews: 124,
    category: "audio",
    brand: "JBL",
    inStock: true,
    stockCount: 20,
    description: "JBL Charge 5 waterproof portable Bluetooth speaker.",
    specifications: {
      "Output Power": "40W RMS",
      "Frequency": "65Hz – 20kHz",
      "Battery": "20 hours playtime",
      "Waterproof": "IP67 rating"
    },
    features: ["20-hour playtime", "IP67 waterproof", "PartyBoost compatible"]
  },
  {
    id: "19",
    name: "Bose QuietComfort Earbuds",
    price: 165000,
    image: "https://images.unsplash.com/photo-1590658165737-15a047b5297d?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.7,
    reviews: 67,
    category: "audio",
    brand: "Bose",
    inStock: true,
    stockCount: 10,
    description: "Bose QuietComfort Earbuds with noise cancellation.",
    specifications: {
      "Driver": "6.1mm drivers",
      "Battery": "6 hours + 12 hours (case)",
      "Noise Cancellation": "11 levels",
      "Water Resistance": "IPX4"
    },
    features: ["World-class noise cancellation", "11 levels of ANC", "Secure and comfortable fit"]
  },
  {
    id: "20",
    name: "Beats Studio3 Wireless",
    price: 145000,
    originalPrice: 180000,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
    condition: "Refurbished",
    rating: 4.4,
    reviews: 95,
    category: "audio",
    brand: "Beats",
    inStock: true,
    stockCount: 7,
    description: "Beats Studio3 Wireless over-ear headphones.",
    specifications: {
      "Chip": "Apple W1 chip",
      "Battery": "22 hours (ANC on)",
      "Fast Fuel": "10 min = 3 hours",
      "Driver": "40mm drivers"
    },
    features: ["Pure ANC", "Apple W1 chip", "22-hour battery life"]
  }
];

// Add 30 more products to reach 50+
const additionalProducts: Product[] = [
  // More phones
  {
    id: "21",
    name: "iPhone 13 128GB Blue",
    price: 520000,
    originalPrice: 580000,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
    condition: "Refurbished",
    rating: 4.6,
    reviews: 45,
    category: "phones",
    brand: "Apple",
    inStock: true,
    stockCount: 7,
    description: "iPhone 13 with A15 Bionic chip and dual camera system.",
    specifications: {
      "Display": "6.1-inch Super Retina XDR",
      "Chip": "A15 Bionic",
      "Storage": "128GB",
      "Camera": "12MP dual camera"
    },
    features: ["A15 Bionic chip", "Cinematic mode", "Photographic Styles"]
  },
  {
    id: "22",
    name: "Samsung Galaxy A54 5G",
    price: 280000,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.3,
    reviews: 28,
    category: "phones",
    brand: "Samsung",
    inStock: true,
    stockCount: 12,
    description: "Samsung Galaxy A54 5G with triple camera setup.",
    specifications: {
      "Display": "6.4-inch Super AMOLED",
      "Processor": "Exynos 1380",
      "Storage": "256GB",
      "Camera": "50MP triple camera"
    },
    features: ["5G connectivity", "120Hz display", "5000mAh battery"]
  },
  {
    id: "23",
    name: "Xiaomi 13 Pro",
    price: 480000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.5,
    reviews: 22,
    category: "phones",
    brand: "Xiaomi",
    inStock: true,
    stockCount: 5,
    description: "Xiaomi 13 Pro with Leica camera system.",
    specifications: {
      "Display": "6.73-inch LTPO AMOLED",
      "Processor": "Snapdragon 8 Gen 2",
      "Storage": "256GB",
      "Camera": "50MP Leica triple camera"
    },
    features: ["Leica camera", "120W charging", "LTPO display"]
  },

  // More laptops
  {
    id: "24",
    name: "MacBook Air M2 13-inch",
    price: 780000,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.8,
    reviews: 156,
    category: "laptops",
    brand: "Apple",
    inStock: true,
    stockCount: 8,
    description: "MacBook Air with M2 chip in a redesigned chassis.",
    specifications: {
      "Processor": "Apple M2 8-core CPU",
      "Memory": "8GB unified memory",
      "Storage": "256GB SSD",
      "Display": "13.6-inch Liquid Retina"
    },
    features: ["M2 chip", "18-hour battery", "MagSafe charging"]
  },
  {
    id: "25",
    name: "Microsoft Surface Laptop 5",
    price: 720000,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.5,
    reviews: 34,
    category: "laptops",
    brand: "Microsoft",
    inStock: true,
    stockCount: 6,
    description: "Microsoft Surface Laptop 5 with Intel 12th Gen.",
    specifications: {
      "Processor": "Intel Core i7-1255U",
      "Memory": "16GB LPDDR5x",
      "Storage": "512GB SSD",
      "Display": "13.5-inch PixelSense"
    },
    features: ["PixelSense display", "All-day battery", "Omnisonic speakers"]
  },
  {
    id: "26",
    name: "Acer Predator Helios 300",
    price: 850000,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.4,
    reviews: 67,
    category: "laptops",
    brand: "Acer",
    inStock: true,
    stockCount: 4,
    description: "Acer Predator Helios 300 gaming laptop.",
    specifications: {
      "Processor": "Intel Core i7-12700H",
      "Memory": "16GB DDR4",
      "Storage": "512GB SSD",
      "Graphics": "RTX 3060"
    },
    features: ["RTX 3060", "144Hz display", "PredatorSense software"]
  },

  // More gaming
  {
    id: "27",
    name: "Logitech G Pro X Superlight",
    price: 85000,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.8,
    reviews: 234,
    category: "gaming",
    brand: "Logitech",
    inStock: true,
    stockCount: 18,
    description: "Logitech G Pro X Superlight wireless gaming mouse.",
    specifications: {
      "Sensor": "HERO 25K",
      "DPI": "25,600 DPI",
      "Weight": "63g",
      "Battery": "70 hours"
    },
    features: ["Ultra-lightweight", "HERO 25K sensor", "70-hour battery"]
  },
  {
    id: "28",
    name: "SteelSeries Apex Pro",
    price: 125000,
    image: "https://images.unsplash.com/photo-1541728472741-03e45a58cf88?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.7,
    reviews: 89,
    category: "gaming",
    brand: "SteelSeries",
    inStock: true,
    stockCount: 12,
    description: "SteelSeries Apex Pro mechanical gaming keyboard.",
    specifications: {
      "Switches": "OmniPoint adjustable",
      "Actuation": "0.4mm - 4.0mm",
      "Display": "OLED Smart Display",
      "Wrist Rest": "Magnetic soft-touch"
    },
    features: ["Adjustable actuation", "OLED display", "Aircraft-grade aluminum"]
  },
  {
    id: "29",
    name: "HyperX Cloud II Gaming Headset",
    price: 65000,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.6,
    reviews: 567,
    category: "gaming",
    brand: "HyperX",
    inStock: true,
    stockCount: 25,
    description: "HyperX Cloud II gaming headset with 7.1 surround sound.",
    specifications: {
      "Driver": "53mm dynamic drivers",
      "Frequency": "15Hz-25,000Hz",
      "Microphone": "Noise-cancelling",
      "Connection": "USB/3.5mm"
    },
    features: ["7.1 virtual surround sound", "Memory foam ear cups", "Detachable microphone"]
  },

  // More audio
  {
    id: "30",
    name: "Marshall Acton III Bluetooth Speaker",
    price: 195000,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.5,
    reviews: 78,
    category: "audio",
    brand: "Marshall",
    inStock: true,
    stockCount: 9,
    description: "Marshall Acton III Bluetooth speaker with iconic design.",
    specifications: {
      "Output Power": "30W total",
      "Connectivity": "Bluetooth 5.0",
      "Playtime": "Over 30 hours",
      "Input": "3.5mm, RCA, Bluetooth"
    },
    features: ["Iconic Marshall design", "30+ hour playtime", "Bluetooth 5.0"]
  },

  // Continue with more products to reach 50...
  // Adding 20 more products across all categories
  {
    id: "31",
    name: "iPad Air 5th Generation 256GB",
    price: 480000,
    originalPrice: 520000,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.7,
    reviews: 22,
    category: "laptops",
    brand: "Apple",
    inStock: true,
    stockCount: 8,
    description: "iPad Air with M1 chip and 10.9-inch Liquid Retina display.",
    specifications: {
      "Chip": "Apple M1",
      "Display": "10.9-inch Liquid Retina",
      "Storage": "256GB",
      "Camera": "12MP Wide camera"
    },
    features: ["M1 chip", "Touch ID", "Apple Pencil support"]
  },
  {
    id: "32",
    name: "Samsung Galaxy Tab S8+",
    price: 420000,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.5,
    reviews: 31,
    category: "laptops",
    brand: "Samsung",
    inStock: true,
    stockCount: 6,
    description: "Samsung Galaxy Tab S8+ with S Pen included.",
    specifications: {
      "Display": "12.4-inch Super AMOLED",
      "Processor": "Snapdragon 8 Gen 1",
      "Storage": "256GB",
      "S Pen": "Included"
    },
    features: ["S Pen included", "120Hz display", "DeX mode"]
  },

  // Gaming accessories and consoles
  {
    id: "33",
    name: "ASUS ROG Strix Gaming Chair",
    price: 320000,
    image: "https://images.unsplash.com/photo-1592921870789-04563d65662d?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.3,
    reviews: 45,
    category: "gaming",
    brand: "ASUS",
    inStock: true,
    stockCount: 5,
    description: "ASUS ROG Strix gaming chair with ergonomic design.",
    specifications: {
      "Material": "PU leather",
      "Weight Capacity": "150kg",
      "Adjustability": "4D armrests",
      "Recline": "90° - 135°"
    },
    features: ["Ergonomic design", "RGB lighting", "Premium materials"]
  },
  {
    id: "34",
    name: "Corsair K95 RGB Platinum XT",
    price: 145000,
    image: "https://images.unsplash.com/photo-1541728472741-03e45a58cf88?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.7,
    reviews: 123,
    category: "gaming",
    brand: "Corsair",
    inStock: true,
    stockCount: 8,
    description: "Corsair K95 RGB Platinum XT mechanical gaming keyboard.",
    specifications: {
      "Switches": "Cherry MX Speed",
      "Backlighting": "Per-key RGB",
      "Keys": "104 keys + 6 macro",
      "Connection": "USB passthrough"
    },
    features: ["Cherry MX switches", "Per-key RGB", "Dedicated macro keys"]
  },

  // More audio products
  {
    id: "35",
    name: "Audio-Technica ATH-M50x",
    price: 95000,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.8,
    reviews: 345,
    category: "audio",
    brand: "Audio-Technica",
    inStock: true,
    stockCount: 15,
    description: "Audio-Technica ATH-M50x professional monitor headphones.",
    specifications: {
      "Driver": "45mm large-aperture drivers",
      "Frequency": "15Hz-28,000Hz",
      "Impedance": "38 ohms",
      "SPL": "99 dB"
    },
    features: ["Professional monitoring", "Swiveling earcups", "Detachable cables"]
  },
  {
    id: "36",
    name: "JBL Flip 6 Portable Speaker",
    price: 65000,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.5,
    reviews: 189,
    category: "audio",
    brand: "JBL",
    inStock: true,
    stockCount: 22,
    description: "JBL Flip 6 waterproof portable Bluetooth speaker.",
    specifications: {
      "Output Power": "30W RMS",
      "Frequency": "63Hz – 20kHz",
      "Battery": "12 hours playtime",
      "Waterproof": "IP67 rating"
    },
    features: ["12-hour playtime", "IP67 waterproof", "PartyBoost compatible"]
  },

  // More phones
  {
    id: "37",
    name: "Nothing Phone (2)",
    price: 385000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.4,
    reviews: 67,
    category: "phones",
    brand: "Nothing",
    inStock: true,
    stockCount: 8,
    description: "Nothing Phone (2) with Glyph Interface and clean Android.",
    specifications: {
      "Display": "6.7-inch LTPO OLED",
      "Processor": "Snapdragon 8+ Gen 1",
      "Storage": "256GB",
      "Camera": "50MP dual camera"
    },
    features: ["Glyph Interface", "Clean Android", "Wireless charging"]
  },
  {
    id: "38",
    name: "Realme GT 3",
    price: 315000,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.3,
    reviews: 43,
    category: "phones",
    brand: "Realme",
    inStock: true,
    stockCount: 12,
    description: "Realme GT 3 with 240W SuperVOOC charging.",
    specifications: {
      "Display": "6.74-inch AMOLED",
      "Processor": "Snapdragon 8+ Gen 1",
      "Storage": "256GB",
      "Camera": "50MP triple camera"
    },
    features: ["240W charging", "144Hz display", "Vapor chamber cooling"]
  },

  // More laptops
  {
    id: "39",
    name: "MSI GE76 Raider",
    price: 1150000,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.6,
    reviews: 28,
    category: "laptops",
    brand: "MSI",
    inStock: true,
    stockCount: 3,
    description: "MSI GE76 Raider gaming laptop with RTX 3080.",
    specifications: {
      "Processor": "Intel Core i7-11800H",
      "Memory": "32GB DDR4",
      "Storage": "1TB NVMe SSD",
      "Graphics": "RTX 3080"
    },
    features: ["RTX 3080", "240Hz display", "Per-key RGB keyboard"]
  },
  {
    id: "40",
    name: "Framework Laptop DIY Edition",
    price: 680000,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.5,
    reviews: 56,
    category: "laptops",
    brand: "Framework",
    inStock: true,
    stockCount: 4,
    description: "Framework Laptop with modular, repairable design.",
    specifications: {
      "Processor": "Intel Core i5-1135G7",
      "Memory": "16GB DDR4",
      "Storage": "512GB NVMe",
      "Display": "13.5-inch 3:2 display"
    },
    features: ["Modular design", "User repairable", "Expansion cards"]
  },

  // Gaming and audio to complete 50
  {
    id: "41",
    name: "Xbox Wireless Controller",
    price: 45000,
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.7,
    reviews: 234,
    category: "gaming",
    brand: "Microsoft",
    inStock: true,
    stockCount: 35,
    description: "Xbox Wireless Controller for Xbox Series X|S and PC.",
    specifications: {
      "Connectivity": "Xbox Wireless, Bluetooth",
      "Battery": "40 hours with AA",
      "Features": "Impulse triggers, hybrid D-pad",
      "Compatibility": "Xbox, PC, mobile"
    },
    features: ["Impulse triggers", "Textured grips", "40-hour battery"]
  },
  {
    id: "42",
    name: "DualSense Wireless Controller",
    price: 42000,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.8,
    reviews: 189,
    category: "gaming",
    brand: "Sony",
    inStock: true,
    stockCount: 28,
    description: "DualSense Wireless Controller for PlayStation 5.",
    specifications: {
      "Connectivity": "USB-C, Bluetooth",
      "Battery": "12-15 hours",
      "Features": "Haptic feedback, adaptive triggers",
      "Audio": "Built-in microphone"
    },
    features: ["Haptic feedback", "Adaptive triggers", "Built-in mic"]
  },
  {
    id: "43",
    name: "Shure SM7B Microphone",
    price: 285000,
    image: "https://images.unsplash.com/photo-1590658165737-15a047b5297d?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.9,
    reviews: 156,
    category: "audio",
    brand: "Shure",
    inStock: true,
    stockCount: 6,
    description: "Shure SM7B dynamic microphone for broadcasting and recording.",
    specifications: {
      "Type": "Dynamic cardioid",
      "Frequency": "50Hz to 20,000Hz",
      "Output": "XLR",
      "Features": "Internal shock mount"
    },
    features: ["Professional broadcast quality", "Internal shock mount", "Pop filter included"]
  },
  {
    id: "44",
    name: "Focusrite Scarlett Solo",
    price: 85000,
    image: "https://images.unsplash.com/photo-1590658165737-15a047b5297d?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.6,
    reviews: 234,
    category: "audio",
    brand: "Focusrite",
    inStock: true,
    stockCount: 12,
    description: "Focusrite Scarlett Solo USB audio interface.",
    specifications: {
      "Inputs": "1 x XLR/TRS combo",
      "Outputs": "2 x TRS outputs",
      "Sample Rate": "Up to 192kHz/24-bit",
      "Connection": "USB-C"
    },
    features: ["Studio-quality preamp", "Direct monitoring", "USB-C connectivity"]
  },
  {
    id: "45",
    name: "KRK Rokit 5 G4 Studio Monitors",
    price: 195000,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.7,
    reviews: 89,
    category: "audio",
    brand: "KRK",
    inStock: true,
    stockCount: 8,
    description: "KRK Rokit 5 G4 powered studio monitors (pair).",
    specifications: {
      "Woofer": "5-inch aramid glass composite",
      "Tweeter": "1-inch soft dome",
      "Power": "55W total system power",
      "Frequency": "43Hz - 40kHz"
    },
    features: ["DSP-driven EQ", "Room correction", "Professional monitoring"]
  },

  // Final products to reach 50
  {
    id: "46",
    name: "Apple Watch Series 9 GPS 45mm",
    price: 285000,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.8,
    reviews: 19,
    category: "phones",
    brand: "Apple",
    inStock: true,
    stockCount: 15,
    description: "Apple Watch Series 9 with S9 chip and Double Tap gesture.",
    specifications: {
      "Display": "45mm Always-On Retina",
      "Chip": "S9 SiP",
      "Storage": "64GB",
      "Battery": "Up to 18 hours"
    },
    features: ["S9 chip", "Double Tap gesture", "Always-On Retina display"]
  },
  {
    id: "47",
    name: "Samsung Galaxy Watch6 Classic",
    price: 235000,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.6,
    reviews: 34,
    category: "phones",
    brand: "Samsung",
    inStock: true,
    stockCount: 12,
    description: "Samsung Galaxy Watch6 Classic with rotating bezel.",
    specifications: {
      "Display": "1.5-inch Super AMOLED",
      "Processor": "Exynos W930",
      "Storage": "16GB",
      "Battery": "425mAh"
    },
    features: ["Rotating bezel", "Sleep coaching", "Body composition analysis"]
  },
  {
    id: "48",
    name: "MagSafe Charger",
    price: 35000,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.6,
    reviews: 12,
    category: "phones",
    brand: "Apple",
    inStock: true,
    stockCount: 25,
    description: "Apple MagSafe Charger for iPhone 12 and later.",
    specifications: {
      "Power": "15W wireless charging",
      "Compatibility": "iPhone 12 and later",
      "Cable": "1m USB-C cable",
      "Magnets": "Perfectly aligned"
    },
    features: ["15W fast wireless charging", "Perfect alignment", "Magnetic attachment"]
  },
  {
    id: "49",
    name: "Anker PowerCore 10000 PD",
    price: 45000,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.7,
    reviews: 567,
    category: "phones",
    brand: "Anker",
    inStock: true,
    stockCount: 45,
    description: "Anker PowerCore 10000 PD portable charger.",
    specifications: {
      "Capacity": "10,000mAh",
      "Input": "USB-C PD",
      "Output": "18W USB-C PD, 12W USB-A",
      "Size": "Compact and lightweight"
    },
    features: ["18W Power Delivery", "10,000mAh capacity", "Compact design"]
  },
  {
    id: "50",
    name: "Belkin 3-in-1 Wireless Charger",
    price: 85000,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop",
    condition: "New",
    rating: 4.5,
    reviews: 78,
    category: "phones",
    brand: "Belkin",
    inStock: true,
    stockCount: 18,
    description: "Belkin 3-in-1 wireless charger for iPhone, Apple Watch, and AirPods.",
    specifications: {
      "iPhone Charging": "15W MagSafe compatible",
      "Apple Watch": "Fast charging capable",
      "AirPods": "5W Qi wireless charging",
      "Design": "Adjustable phone stand"
    },
    features: ["3-device charging", "MagSafe compatible", "Adjustable stand"]
  }
];

export const allProducts = [...products, ...additionalProducts];
