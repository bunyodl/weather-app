import type { Location } from "../types/weather.types";

const NORTH_AMERICA_USA: Location[] = [
  { name: "New York", latitude: 40.7128, longitude: -74.006, country: "USA" },
  {
    name: "Los Angeles",
    latitude: 34.0522,
    longitude: -118.2437,
    country: "USA",
  },
  { name: "Chicago", latitude: 41.8781, longitude: -87.6298, country: "USA" },
  { name: "Houston", latitude: 29.7604, longitude: -95.3698, country: "USA" },
  { name: "Phoenix", latitude: 33.4484, longitude: -112.074, country: "USA" },
  {
    name: "Philadelphia",
    latitude: 39.9526,
    longitude: -75.1652,
    country: "USA",
  },
  {
    name: "San Antonio",
    latitude: 29.4241,
    longitude: -98.4936,
    country: "USA",
  },
  {
    name: "San Diego",
    latitude: 32.7157,
    longitude: -117.1611,
    country: "USA",
  },
  { name: "Dallas", latitude: 32.7767, longitude: -96.797, country: "USA" },
  { name: "San Jose", latitude: 37.3382, longitude: -121.8863, country: "USA" },
  { name: "Austin", latitude: 30.2672, longitude: -97.7431, country: "USA" },
  {
    name: "San Francisco",
    latitude: 37.7749,
    longitude: -122.4194,
    country: "USA",
  },
  { name: "Seattle", latitude: 47.6062, longitude: -122.3321, country: "USA" },
  { name: "Denver", latitude: 39.7392, longitude: -104.9903, country: "USA" },
  {
    name: "Washington",
    latitude: 38.9072,
    longitude: -77.0369,
    country: "USA",
  },
  { name: "Boston", latitude: 42.3601, longitude: -71.0589, country: "USA" },
  { name: "Miami", latitude: 25.7617, longitude: -80.1918, country: "USA" },
  { name: "Atlanta", latitude: 33.749, longitude: -84.388, country: "USA" },
  {
    name: "Las Vegas",
    latitude: 36.1699,
    longitude: -115.1398,
    country: "USA",
  },
  { name: "Portland", latitude: 45.5152, longitude: -122.6784, country: "USA" },
  {
    name: "Minneapolis",
    latitude: 44.9778,
    longitude: -93.265,
    country: "USA",
  },
  {
    name: "Detroit",
    latitude: 42.3314,
    longitude: -83.0458,
    country: "USA",
  },
  {
    name: "Nashville",
    latitude: 36.1627,
    longitude: -86.7816,
    country: "USA",
  },
  {
    name: "Charlotte",
    latitude: 35.2271,
    longitude: -80.8431,
    country: "USA",
  },
];

const NORTH_AMERICA_CANADA: Location[] = [
  {
    name: "Toronto",
    latitude: 43.6532,
    longitude: -79.3832,
    country: "Canada",
  },
  {
    name: "Montreal",
    latitude: 45.5017,
    longitude: -73.5673,
    country: "Canada",
  },
  {
    name: "Vancouver",
    latitude: 49.2827,
    longitude: -123.1207,
    country: "Canada",
  },
  {
    name: "Calgary",
    latitude: 51.0447,
    longitude: -114.0719,
    country: "Canada",
  },
  { name: "Ottawa", latitude: 45.4215, longitude: -75.6972, country: "Canada" },
  {
    name: "Edmonton",
    latitude: 53.5461,
    longitude: -113.4938,
    country: "Canada",
  },
  {
    name: "Quebec City",
    latitude: 46.8139,
    longitude: -71.208,
    country: "Canada",
  },
];

const NORTH_AMERICA_MEXICO: Location[] = [
  {
    name: "Mexico City",
    latitude: 19.4326,
    longitude: -99.1332,
    country: "Mexico",
  },
  {
    name: "Guadalajara",
    latitude: 20.6597,
    longitude: -103.3496,
    country: "Mexico",
  },
  {
    name: "Monterrey",
    latitude: 25.6866,
    longitude: -100.3161,
    country: "Mexico",
  },
  { name: "Cancún", latitude: 21.1619, longitude: -86.8515, country: "Mexico" },
  {
    name: "Tijuana",
    latitude: 32.5149,
    longitude: -117.0382,
    country: "Mexico",
  },
];

const EUROPE_UK_IRELAND: Location[] = [
  { name: "London", latitude: 51.5074, longitude: -0.1278, country: "UK" },
  { name: "Manchester", latitude: 53.4808, longitude: -2.2426, country: "UK" },
  { name: "Birmingham", latitude: 52.4862, longitude: -1.8904, country: "UK" },
  { name: "Edinburgh", latitude: 55.9533, longitude: -3.1883, country: "UK" },
  { name: "Dublin", latitude: 53.3498, longitude: -6.2603, country: "Ireland" },
  { name: "Glasgow", latitude: 55.8642, longitude: -4.2518, country: "UK" },
  { name: "Liverpool", latitude: 53.4084, longitude: -2.9916, country: "UK" },
];

const EUROPE_WESTERN: Location[] = [
  { name: "Paris", latitude: 48.8566, longitude: 2.3522, country: "France" },
  { name: "Lyon", latitude: 45.764, longitude: 4.8357, country: "France" },
  {
    name: "Marseille",
    latitude: 43.2965,
    longitude: 5.3698,
    country: "France",
  },
  { name: "Berlin", latitude: 52.52, longitude: 13.41, country: "Germany" },
  { name: "Munich", latitude: 48.1351, longitude: 11.582, country: "Germany" },
  { name: "Hamburg", latitude: 53.5511, longitude: 9.9937, country: "Germany" },
  {
    name: "Frankfurt",
    latitude: 50.1109,
    longitude: 8.6821,
    country: "Germany",
  },
  {
    name: "Amsterdam",
    latitude: 52.3676,
    longitude: 4.9041,
    country: "Netherlands",
  },
  {
    name: "Brussels",
    latitude: 50.8503,
    longitude: 4.3517,
    country: "Belgium",
  },
  {
    name: "Zurich",
    latitude: 47.3769,
    longitude: 8.5417,
    country: "Switzerland",
  },
  {
    name: "Geneva",
    latitude: 46.2044,
    longitude: 6.1432,
    country: "Switzerland",
  },
  {
    name: "Rotterdam",
    latitude: 51.9225,
    longitude: 4.47917,
    country: "Netherlands",
  },
  { name: "Cologne", latitude: 50.9375, longitude: 6.9603, country: "Germany" },
  {
    name: "Luxembourg",
    latitude: 49.6116,
    longitude: 6.13,
    country: "Luxembourg",
  },
];

const EUROPE_SOUTHERN: Location[] = [
  { name: "Madrid", latitude: 40.4168, longitude: -3.7038, country: "Spain" },
  { name: "Barcelona", latitude: 41.3851, longitude: 2.1734, country: "Spain" },
  { name: "Valencia", latitude: 39.4699, longitude: -0.3763, country: "Spain" },
  { name: "Seville", latitude: 37.3891, longitude: -5.9845, country: "Spain" },
  { name: "Rome", latitude: 41.9028, longitude: 12.4964, country: "Italy" },
  { name: "Milan", latitude: 45.4642, longitude: 9.19, country: "Italy" },
  { name: "Naples", latitude: 40.8518, longitude: 14.2681, country: "Italy" },
  { name: "Florence", latitude: 43.7696, longitude: 11.2558, country: "Italy" },
  { name: "Venice", latitude: 45.4408, longitude: 12.3155, country: "Italy" },
  {
    name: "Lisbon",
    latitude: 38.7223,
    longitude: -9.1393,
    country: "Portugal",
  },
  { name: "Porto", latitude: 41.1579, longitude: -8.6291, country: "Portugal" },
  { name: "Athens", latitude: 37.9838, longitude: 23.7275, country: "Greece" },
  { name: "Malaga", latitude: 36.7213, longitude: -4.4214, country: "Spain" },
  { name: "Bilbao", latitude: 43.263, longitude: -2.935, country: "Spain" },
  { name: "Bologna", latitude: 44.4949, longitude: 11.3426, country: "Italy" },
  { name: "Turin", latitude: 45.0703, longitude: 7.6869, country: "Italy" },
];

const EUROPE_NORTHERN: Location[] = [
  {
    name: "Stockholm",
    latitude: 59.3293,
    longitude: 18.0686,
    country: "Sweden",
  },
  {
    name: "Copenhagen",
    latitude: 55.6761,
    longitude: 12.5683,
    country: "Denmark",
  },
  { name: "Oslo", latitude: 59.9139, longitude: 10.7522, country: "Norway" },
  {
    name: "Helsinki",
    latitude: 60.1695,
    longitude: 24.9354,
    country: "Finland",
  },
  {
    name: "Reykjavik",
    latitude: 64.1466,
    longitude: -21.9426,
    country: "Iceland",
  },
  { name: "Bergen", latitude: 60.3913, longitude: 5.3221, country: "Norway" },
];

const EUROPE_EASTERN: Location[] = [
  { name: "Vienna", latitude: 48.2082, longitude: 16.3738, country: "Austria" },
  {
    name: "Prague",
    latitude: 50.0755,
    longitude: 14.4378,
    country: "Czech Republic",
  },
  {
    name: "Budapest",
    latitude: 47.4979,
    longitude: 19.0402,
    country: "Hungary",
  },
  { name: "Warsaw", latitude: 52.2297, longitude: 21.0122, country: "Poland" },
  { name: "Krakow", latitude: 50.0647, longitude: 19.945, country: "Poland" },
  {
    name: "Bucharest",
    latitude: 44.4268,
    longitude: 26.1025,
    country: "Romania",
  },
  { name: "Moscow", latitude: 55.7558, longitude: 37.6173, country: "Russia" },
  {
    name: "Saint Petersburg",
    latitude: 59.9311,
    longitude: 30.3609,
    country: "Russia",
  },
  {
    name: "Istanbul",
    latitude: 41.0082,
    longitude: 28.9784,
    country: "Turkey",
  },
  { name: "Ankara", latitude: 39.9334, longitude: 32.8597, country: "Turkey" },
  { name: "Sofia", latitude: 42.6977, longitude: 23.3219, country: "Bulgaria" },
  {
    name: "Belgrade",
    latitude: 44.7866,
    longitude: 20.4489,
    country: "Serbia",
  },
  { name: "Zagreb", latitude: 45.815, longitude: 15.9819, country: "Croatia" },
  { name: "Kyiv", latitude: 50.4501, longitude: 30.5234, country: "Ukraine" },
];

const ASIA_EAST: Location[] = [
  { name: "Tokyo", latitude: 35.6762, longitude: 139.6503, country: "Japan" },
  { name: "Osaka", latitude: 34.6937, longitude: 135.5023, country: "Japan" },
  { name: "Kyoto", latitude: 35.0116, longitude: 135.7681, country: "Japan" },
  {
    name: "Seoul",
    latitude: 37.5665,
    longitude: 126.978,
    country: "South Korea",
  },
  {
    name: "Busan",
    latitude: 35.1796,
    longitude: 129.0756,
    country: "South Korea",
  },
  { name: "Beijing", latitude: 39.9042, longitude: 116.4074, country: "China" },
  {
    name: "Shanghai",
    latitude: 31.2304,
    longitude: 121.4737,
    country: "China",
  },
  {
    name: "Guangzhou",
    latitude: 23.1291,
    longitude: 113.2644,
    country: "China",
  },
  {
    name: "Shenzhen",
    latitude: 22.5431,
    longitude: 114.0579,
    country: "China",
  },
  {
    name: "Hong Kong",
    latitude: 22.3193,
    longitude: 114.1694,
    country: "Hong Kong",
  },
  { name: "Taipei", latitude: 25.033, longitude: 121.5654, country: "Taiwan" },
  { name: "Nagoya", latitude: 35.1815, longitude: 136.9066, country: "Japan" },
  { name: "Sapporo", latitude: 43.0642, longitude: 141.347, country: "Japan" },
  {
    name: "Incheon",
    latitude: 37.4563,
    longitude: 126.7052,
    country: "South Korea",
  },
  { name: "Chengdu", latitude: 30.5728, longitude: 104.0668, country: "China" },
  { name: "Wuhan", latitude: 30.5928, longitude: 114.3055, country: "China" },
];

const ASIA_SOUTHEAST: Location[] = [
  {
    name: "Singapore",
    latitude: 1.3521,
    longitude: 103.8198,
    country: "Singapore",
  },
  {
    name: "Bangkok",
    latitude: 13.7563,
    longitude: 100.5018,
    country: "Thailand",
  },
  {
    name: "Kuala Lumpur",
    latitude: 3.139,
    longitude: 101.6869,
    country: "Malaysia",
  },
  {
    name: "Jakarta",
    latitude: -6.2088,
    longitude: 106.8456,
    country: "Indonesia",
  },
  {
    name: "Manila",
    latitude: 14.5995,
    longitude: 120.9842,
    country: "Philippines",
  },
  {
    name: "Ho Chi Minh City",
    latitude: 10.8231,
    longitude: 106.6297,
    country: "Vietnam",
  },
  { name: "Hanoi", latitude: 21.0285, longitude: 105.8542, country: "Vietnam" },
  { name: "Yangon", latitude: 16.8661, longitude: 96.1951, country: "Myanmar" },
  {
    name: "Phnom Penh",
    latitude: 11.5564,
    longitude: 104.9282,
    country: "Cambodia",
  },
];

const ASIA_SOUTH: Location[] = [
  { name: "Mumbai", latitude: 19.076, longitude: 72.8777, country: "India" },
  { name: "Delhi", latitude: 28.7041, longitude: 77.1025, country: "India" },
  {
    name: "Bangalore",
    latitude: 12.9716,
    longitude: 77.5946,
    country: "India",
  },
  { name: "Hyderabad", latitude: 17.385, longitude: 78.4867, country: "India" },
  { name: "Chennai", latitude: 13.0827, longitude: 80.2707, country: "India" },
  { name: "Kolkata", latitude: 22.5726, longitude: 88.3639, country: "India" },
  {
    name: "Karachi",
    latitude: 24.8607,
    longitude: 67.0011,
    country: "Pakistan",
  },
  {
    name: "Lahore",
    latitude: 31.5497,
    longitude: 74.3436,
    country: "Pakistan",
  },
  {
    name: "Dhaka",
    latitude: 23.8103,
    longitude: 90.4125,
    country: "Bangladesh",
  },
  { name: "Pune", latitude: 18.5204, longitude: 73.8567, country: "India" },
  {
    name: "Ahmedabad",
    latitude: 23.0225,
    longitude: 72.5714,
    country: "India",
  },
  {
    name: "Colombo",
    latitude: 6.9271,
    longitude: 79.8612,
    country: "Sri Lanka",
  },
  { name: "Kathmandu", latitude: 27.7172, longitude: 85.324, country: "Nepal" },
  {
    name: "Islamabad",
    latitude: 33.6844,
    longitude: 73.0479,
    country: "Pakistan",
  },
];

const ASIA_MIDDLE_EAST: Location[] = [
  { name: "Dubai", latitude: 25.2048, longitude: 55.2708, country: "UAE" },
  { name: "Abu Dhabi", latitude: 24.4539, longitude: 54.3773, country: "UAE" },
  {
    name: "Riyadh",
    latitude: 24.7136,
    longitude: 46.6753,
    country: "Saudi Arabia",
  },
  {
    name: "Jeddah",
    latitude: 21.5433,
    longitude: 39.1728,
    country: "Saudi Arabia",
  },
  { name: "Doha", latitude: 25.2854, longitude: 51.531, country: "Qatar" },
  {
    name: "Kuwait City",
    latitude: 29.3759,
    longitude: 47.9774,
    country: "Kuwait",
  },
  { name: "Muscat", latitude: 23.588, longitude: 58.3829, country: "Oman" },
  { name: "Manama", latitude: 26.2285, longitude: 50.586, country: "Bahrain" },
  { name: "Beirut", latitude: 33.8886, longitude: 35.4955, country: "Lebanon" },
  { name: "Amman", latitude: 31.9454, longitude: 35.9284, country: "Jordan" },
  { name: "Baghdad", latitude: 33.3152, longitude: 44.3661, country: "Iraq" },
];

const ASIA_CENTRAL: Location[] = [
  {
    name: "Dushanbe",
    latitude: 38.5598,
    longitude: 68.7738,
    country: "Tajikistan",
  },
  {
    name: "Khujand",
    latitude: 40.2828,
    longitude: 69.6229,
    country: "Tajikistan",
  },
  {
    name: "Qurghonteppa",
    latitude: 37.835,
    longitude: 68.78,
    country: "Tajikistan",
  },
  {
    name: "Kulob",
    latitude: 37.9144,
    longitude: 69.785,
    country: "Tajikistan",
  },
  {
    name: "Istaravshan",
    latitude: 39.9142,
    longitude: 69.0033,
    country: "Tajikistan",
  },
  {
    name: "Tashkent",
    latitude: 41.2995,
    longitude: 69.2401,
    country: "Uzbekistan",
  },
  {
    name: "Samarkand",
    latitude: 39.627,
    longitude: 66.975,
    country: "Uzbekistan",
  },
  {
    name: "Almaty",
    latitude: 43.222,
    longitude: 76.8512,
    country: "Kazakhstan",
  },
  {
    name: "Astana",
    latitude: 51.1694,
    longitude: 71.4491,
    country: "Kazakhstan",
  },
  {
    name: "Bishkek",
    latitude: 42.8746,
    longitude: 74.5698,
    country: "Kyrgyzstan",
  },
  {
    name: "Ashgabat",
    latitude: 37.9601,
    longitude: 58.3261,
    country: "Turkmenistan",
  },
];

const OCEANIA: Location[] = [
  {
    name: "Sydney",
    latitude: -33.8688,
    longitude: 151.2093,
    country: "Australia",
  },
  {
    name: "Melbourne",
    latitude: -37.8136,
    longitude: 144.9631,
    country: "Australia",
  },
  {
    name: "Brisbane",
    latitude: -27.4698,
    longitude: 153.0251,
    country: "Australia",
  },
  {
    name: "Perth",
    latitude: -31.9505,
    longitude: 115.8605,
    country: "Australia",
  },
  {
    name: "Adelaide",
    latitude: -34.9285,
    longitude: 138.6007,
    country: "Australia",
  },
  {
    name: "Auckland",
    latitude: -36.8485,
    longitude: 174.7633,
    country: "New Zealand",
  },
  {
    name: "Wellington",
    latitude: -41.2865,
    longitude: 174.7762,
    country: "New Zealand",
  },
  {
    name: "Christchurch",
    latitude: -43.5321,
    longitude: 172.6362,
    country: "New Zealand",
  },
];

const SOUTH_AMERICA: Location[] = [
  {
    name: "São Paulo",
    latitude: -23.5505,
    longitude: -46.6333,
    country: "Brazil",
  },
  {
    name: "Rio de Janeiro",
    latitude: -22.9068,
    longitude: -43.1729,
    country: "Brazil",
  },
  {
    name: "Brasília",
    latitude: -15.8267,
    longitude: -47.9218,
    country: "Brazil",
  },
  {
    name: "Buenos Aires",
    latitude: -34.6037,
    longitude: -58.3816,
    country: "Argentina",
  },
  {
    name: "Santiago",
    latitude: -33.4489,
    longitude: -70.6693,
    country: "Chile",
  },
  { name: "Lima", latitude: -12.0464, longitude: -77.0428, country: "Peru" },
  { name: "Bogotá", latitude: 4.711, longitude: -74.0721, country: "Colombia" },
  {
    name: "Caracas",
    latitude: 10.4806,
    longitude: -66.9036,
    country: "Venezuela",
  },
  { name: "Quito", latitude: -0.1807, longitude: -78.4678, country: "Ecuador" },
  {
    name: "Medellin",
    latitude: 6.2442,
    longitude: -75.5812,
    country: "Colombia",
  },
  { name: "La Paz", latitude: -16.5, longitude: -68.15, country: "Bolivia" },
  {
    name: "Montevideo",
    latitude: -34.9011,
    longitude: -56.1645,
    country: "Uruguay",
  },
  {
    name: "Asunción",
    latitude: -25.2637,
    longitude: -57.5759,
    country: "Paraguay",
  },
];

const AFRICA: Location[] = [
  { name: "Cairo", latitude: 30.0444, longitude: 31.2357, country: "Egypt" },
  { name: "Lagos", latitude: 6.5244, longitude: 3.3792, country: "Nigeria" },
  {
    name: "Johannesburg",
    latitude: -26.2041,
    longitude: 28.0473,
    country: "South Africa",
  },
  {
    name: "Cape Town",
    latitude: -33.9249,
    longitude: 18.4241,
    country: "South Africa",
  },
  { name: "Nairobi", latitude: -1.2921, longitude: 36.8219, country: "Kenya" },
  {
    name: "Casablanca",
    latitude: 33.5731,
    longitude: -7.5898,
    country: "Morocco",
  },
  { name: "Algiers", latitude: 36.7538, longitude: 3.0588, country: "Algeria" },
  { name: "Accra", latitude: 5.6037, longitude: -0.187, country: "Ghana" },
  {
    name: "Addis Ababa",
    latitude: 9.032,
    longitude: 38.7469,
    country: "Ethiopia",
  },
  {
    name: "Dar es Salaam",
    latitude: -6.7924,
    longitude: 39.2083,
    country: "Tanzania",
  },
  { name: "Luanda", latitude: -8.839, longitude: 13.2894, country: "Angola" },
  { name: "Khartoum", latitude: 15.5007, longitude: 32.5599, country: "Sudan" },
  { name: "Abuja", latitude: 9.0765, longitude: 7.3986, country: "Nigeria" },
  { name: "Tunis", latitude: 36.8065, longitude: 10.1815, country: "Tunisia" },
];

export const ALL_LOCATIONS: Location[] = [
  ...NORTH_AMERICA_USA,
  ...NORTH_AMERICA_CANADA,
  ...NORTH_AMERICA_MEXICO,
  ...EUROPE_UK_IRELAND,
  ...EUROPE_WESTERN,
  ...EUROPE_SOUTHERN,
  ...EUROPE_NORTHERN,
  ...EUROPE_EASTERN,
  ...ASIA_EAST,
  ...ASIA_SOUTHEAST,
  ...ASIA_SOUTH,
  ...ASIA_MIDDLE_EAST,
  ...ASIA_CENTRAL,
  ...OCEANIA,
  ...SOUTH_AMERICA,
  ...AFRICA,
];
