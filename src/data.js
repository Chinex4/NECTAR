export const categories = [
	{ 
		id: 1, 
		name: 'Fresh Fruits & Vegetable', 
		color: '#E6F4EA', // Light green
		image: require('../assets/images/freshfruits.png') 
	},
	{ 
		id: 2, 
		name: 'Cooking Oil & Ghee', 
		color: '#FFF3E6', // Light orange
		image: require('../assets/images/ghee.png') 
	},
	{ 
		id: 3, 
		name: 'Meat & Fish', 
		color: '#FFE6E6', // Light red/pink
		image: require('../assets/images/meat_fish.png') 
	},
	{ 
		id: 4, 
		name: 'Bakery & Snacks', 
		color: '#F3E8FF', // Light purple
		image: require('../assets/images/bakery_snacks.png') 
	},
	{ 
		id: 5, 
		name: 'Dairy & Eggs', 
		color: '#FFF9E6', // Light yellow
		image: require('../assets/images/eggs.png') 
	},
	{ 
		id: 6, 
		name: 'Beverages', 
		color: '#E6F0FF', // Light blue
		image: require('../assets/images/beverages.png') 
	},
	{ 
		id: 7, 
		name: 'Dairy & Eggs', 
		color: '#FFF9E6', // Light yellow
		image: require('../assets/images/eggs.png') 
	},
	{ 
		id: 8, 
		name: 'Beverages', 
		color: '#E6F0FF', // Light blue
		image: require('../assets/images/beverages.png') 
	},
	{ 
		id: 9, 
		name: 'Dairy & Eggs', 
		color: '#FFF9E6', // Light yellow
		image: require('../assets/images/eggs.png') 
	},
	{ 
		id: 10, 
		name: 'Beverages', 
		color: '#E6F0FF', // Light blue
		image: require('../assets/images/beverages.png') 
	},
	{ 
		id: 11, 
		name: 'Dairy & Eggs', 
		color: '#FFF9E6', // Light yellow
		image: require('../assets/images/eggs.png') 
	},
	{ 
		id: 12, 
		name: 'Beverages', 
		color: '#E6F0FF', // Light blue
		image: require('../assets/images/beverages.png') 
	},
];

const shop = [
	{
		id: 1,
		categoryId: 1,
		name: "Organic Banana",
		description: "Fresh organic bananas packed with nutrients.",
		quantity: 1,
		price: 2.99,
		image: require("../assets/images/banana.png"),
	},
	{
		id: 2,
		categoryId: 1,
		name: "Apple",
		description: "Crisp and juicy apples for your daily needs.",
		quantity: 1,
		price: 3.49,
		image: require("../assets/images/apple.png"),
	},
	{
		id: 3,
		categoryId: 3,
		name: "Beef",
		description: "Premium quality beef, perfect for meals.",
		quantity: 1,
		price: 12.99,
		image: require("../assets/images/beef.png"),
	},
	{
		id: 4,
		categoryId: 1,
		name: "Potato",
		description: "Fresh potatoes perfect for cooking.",
		quantity: 1,
		price: 1.99,
		image: require("../assets/images/potato.png"),
	},
	{
		id: 5,
		categoryId: 3,
		name: "Chicken",
		description: "Tender and fresh chicken for delicious meals.",
		quantity: 1,
		price: 9.99,
		image: require("../assets/images/chicken.png"),
	},
	{
		id: 6,
		categoryId: 5,
		name: "Eggs",
		description: "Farm-fresh eggs for a healthy diet.",
		quantity: 1,
		price: 2.49,
		image: require("../assets/images/eggs.png"),
	},
	{
		id: 7,
		categoryId: 6,
		name: "Coca Cola",
		description: "Refreshing Coca Cola to quench your thirst.",
		quantity: 1,
		price: 4.49,
		image: require("../assets/images/coke.png"),
	},
	{
		id: 8,
		categoryId: 6,
		name: "Orange Juice",
		description: "Pure and fresh orange juice packed with vitamins.",
		quantity: 1,
		price: 5.99,
		image: require("../assets/images/orange_juice.png"),
	},
];

export { shop };
