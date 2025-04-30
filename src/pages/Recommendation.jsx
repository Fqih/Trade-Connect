import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Dropdown } from '../components/ui/Dropdown';
import { ThumbsUp, Filter, ArrowRight } from 'lucide-react';

const RecommendationCard = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{data.name}</h3>
          <p className="text-sm text-gray-500">{data.company}</p>
        </div>
        <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          {data.matchRate}% Match
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
          <p className="text-sm text-gray-600">Location: {data.location}</p>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
          <p className="text-sm text-gray-600">Products: {data.products}</p>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
          <p className="text-sm text-gray-600">Annual Revenue: {data.revenue}</p>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <Button variant="primary" className="flex items-center justify-center">
          View Profile <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <ThumbsUp size={32} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations yet</h3>
      <p className="text-center text-gray-500 max-w-md mb-6">
        Complete your business profile to get personalized recommendations based on your preferences and needs.
      </p>
      <Button variant="primary">Complete Your Profile</Button>
    </div>
  );
};

const Recommendation = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [filters, setFilters] = useState({
    industry: '',
    location: '',
    matchRate: ''
  });
  const [loading, setLoading] = useState(true);

  // Mock data - Replace with actual API call
  useEffect(() => {
    // Simulate API request
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch data from an API
        // const response = await api.get('/recommendations');
        // setRecommendations(response.data);
        
        // Mock data
        setTimeout(() => {
          const mockData = [
            {
              id: 1,
              name: 'PT Global Seafood',
              company: 'Seafood Supplier',
              matchRate: 95,
              location: 'Jakarta, Indonesia',
              products: 'Fish, Shrimp, Crab',
              revenue: '$1M - $5M'
            },
            {
              id: 2,
              name: 'Organic Farm Co.',
              company: 'Agricultural Products',
              matchRate: 87,
              location: 'Bandung, Indonesia',
              products: 'Vegetables, Fruits, Grains',
              revenue: '$500K - $1M'
            },
            {
              id: 3,
              name: 'Tech Solutions Inc.',
              company: 'Technology Provider',
              matchRate: 82,
              location: 'Surabaya, Indonesia',
              products: 'Software, Hardware, Services',
              revenue: '$5M - $10M'
            }
          ];
          setRecommendations(mockData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const industryOptions = [
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'seafood', label: 'Seafood' },
    { value: 'technology', label: 'Technology' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail' }
  ];

  const locationOptions = [
    { value: 'jakarta', label: 'Jakarta' },
    { value: 'bandung', label: 'Bandung' },
    { value: 'surabaya', label: 'Surabaya' },
    { value: 'bali', label: 'Bali' },
    { value: 'yogyakarta', label: 'Yogyakarta' }
  ];

  const matchRateOptions = [
    { value: '90', label: '90% and above' },
    { value: '80', label: '80% and above' },
    { value: '70', label: '70% and above' },
    { value: '60', label: '60% and above' },
    { value: '50', label: '50% and above' }
  ];

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recommendations</h1>
          <p className="text-gray-600">
            {user?.accountType === 'supplier' 
              ? 'Potential buyers who might be interested in your products' 
              : 'Potential suppliers who match your needs'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center mb-4">
          <Filter size={20} className="mr-2 text-gray-500" />
          <h2 className="text-lg font-medium">Filters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Dropdown
            label="Industry"
            name="industry"
            value={filters.industry}
            onChange={handleFilterChange}
            options={industryOptions}
            placeholder="All Industries"
          />
          
          <Dropdown
            label="Location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            options={locationOptions}
            placeholder="All Locations"
          />
          
          <Dropdown
            label="Match Rate"
            name="matchRate"
            value={filters.matchRate}
            onChange={handleFilterChange}
            options={matchRateOptions}
            placeholder="Any Match Rate"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((recommendation) => (
            <RecommendationCard key={recommendation.id} data={recommendation} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default Recommendation;