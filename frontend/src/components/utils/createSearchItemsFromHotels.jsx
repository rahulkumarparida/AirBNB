// Single function to create search items from hotels
export const createSearchItemsFromHotels = (hotels) => {
    if (!hotels || !Array.isArray(hotels) || hotels.length === 0) return [];
    
    // Get unique cities with their data
    const cityMap = new Map();
    
    hotels.forEach(hotel => {
        const city = hotel?.location?.city;
        const state = hotel?.location?.state;
        
        if (city && city.trim() !== '') {
            if (!cityMap.has(city)) {
                cityMap.set(city, {
                    city: city,
                    state: state,
                    hotelCount: 0
                });
            }
            
            const cityData = cityMap.get(city);
            cityData.hotelCount++;
        }
    });
    
    // Transform into searchItems format
    return Array.from(cityMap.values()).map((cityData, index) => {
        const { city, state, hotelCount } = cityData;
        
        return {
            id: index + 1,
            destination: city,
            text: generateCityDescription(city, state, hotelCount),
            image: getCityImage(city)
        };
    }).sort((a, b) => a.destination.localeCompare(b.destination));
};

// Helper function to generate city descriptions
const generateCityDescription = (city, state, hotelCount) => {
    const descriptions = {
        // Beach destinations
        'Goa': 'Coastal paradise of sun-kissed beaches, bohemian nightlife, and Portuguese charm',
        'Mumbai': 'City of dreams with beaches and Bollywood glamour',
        'Chennai': 'Coastal metropolis with beautiful beaches and rich cultural heritage',
        'Kochi': 'Port city with serene beaches and historic colonial architecture',
        'Puri': 'Spiritual beach town with golden sands and ancient temples',
        
        // Mountain destinations
        'Manali': 'Himalayan haven of snow-clad valleys, adventure, and serene mountain vibes',
        'Shimla': 'Queen of Hills with colonial charm and panoramic mountain views',
        'Darjeeling': 'Hill station famous for tea gardens and Himalayan sunrise views',
        'Mussoorie': 'Popular hill station with scenic beauty and pleasant climate',
        'Nainital': 'Lake district of India with emerald lakes and mountain scenery',
        
        // Heritage cities
        'Jaipur': 'Pink City with majestic palaces, forts, and vibrant markets',
        'Udaipur': 'City of Lakes with romantic palaces and stunning waterfront views',
        'Jodhpur': 'Blue City featuring magnificent forts and traditional architecture',
        'Agra': 'Home to the iconic Taj Mahal and magnificent Mughal architecture',
        'Varanasi': 'Spiritual capital with ancient ghats and religious significance',
        
        // Modern cities
        'Bengaluru': 'Garden city and India\'s Silicon Valley',
        'Hyderabad': 'City of Pearls with historic landmarks and IT hubs',
        'Pune': 'Cultural capital with educational institutions and historical sites',
        'Ahmedabad': 'Historic city with vibrant culture and architectural wonders',
        
        // Capital cities
        'Delhi': 'Capital city blending ancient history with modern metropolitan energy',
        'Kolkata': 'India\'s Cultural Capital – poetry, history, food, and the "City of Joy" spirit',
        'Bhubaneswar': 'Capital city with ancient temples and modern luxury'
    };
    
    return descriptions[city] || `${city}, ${state} - ${hotelCount}+ amazing stays available`;
};

// Helper function to assign appropriate images
const getCityImage = (city) => {
    // Categorize cities by type for image selection
    const beachCities = ['Goa', 'Mumbai', 'Chennai', 'Kochi', 'Puri', 'Puducherry'];
    const mountainCities = ['Manali', 'Shimla', 'Darjeeling', 'Mussoorie', 'Nainital', 'Leh'];
    
    if (beachCities.includes(city)) {
        return '/assets/beachsearch.png';
    } else if (mountainCities.includes(city)) {
        return '/assets/mountainsearch.png';
    } else {
        return '/assets/citysearch.png';
    }
};