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
        <p className="text-sm text-gray-600">📍 {data.location}</p>
        <p className="text-sm text-gray-600">🛒 {data.products}</p>
        <p className="text-sm text-gray-600">💰 {data.revenue}</p>
      </div>
      <div className="border-t border-gray-200 pt-4">
        <Button variant="primary" className="flex items-center justify-center">
          View Profile <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <div className="bg-gray-100 p-4 rounded-full mb-4">
      <ThumbsUp size={32} className="text-gray-400" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations found</h3>
    <p className="text-center text-gray-500 max-w-md mb-6">
      Try adjusting your filters or complete your profile to see better matches.
    </p>
    <Button variant="primary">Complete Your Profile</Button>
  </div>
);

const Recommendation = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  const [filters, setFilters] = useState({
    industry: '',
    location: '',
    matchRate: ''
  });
  const [loading, setLoading] = useState(true);

  const mockData = [
    {
      id: 1,
      name: 'PT Global Seafood',
      company: 'Seafood Supplier',
      industry: 'seafood',
      matchRate: 95,
      location: 'Jakarta',
      products: 'Fish, Shrimp, Crab',
      revenue: '$1M - $5M'
    },
    {
      id: 2,
      name: 'Organic Farm Co.',
      company: 'Agricultural Products',
      industry: 'agriculture',
      matchRate: 87,
      location: 'Bandung',
      products: 'Vegetables, Fruits, Grains',
      revenue: '$500K - $1M'
    },
    {
      id: 3,
      name: 'Tech Solutions Inc.',
      company: 'Technology Provider',
      industry: 'technology',
      matchRate: 82,
      location: 'Surabaya',
      products: 'Software, Hardware, Services',
      revenue: '$5M - $10M'
    },
    {
      id: 4,
      name: 'Bali Coffee Export',
      company: 'Coffee Supplier',
      industry: 'agriculture',
      matchRate: 78,
      location: 'Bali',
      products: 'Coffee Beans',
      revenue: '$500K - $2M'
    },
    {
      id: 5,
      name: 'RetailPro',
      company: 'Retail Solutions',
      industry: 'retail',
      matchRate: 91,
      location: 'Jakarta',
      products: 'POS, Software',
      revenue: '$2M - $4M'
    },
    {
      id: 6,
      name: 'PT Fishindo Raya',
      company: 'Seafood Distributor',
      industry: 'seafood',
      matchRate: 69,
      location: 'Surabaya',
      products: 'Fish, Squid, Lobster',
      revenue: '$3M - $5M'
    },
    {
      id: 7,
      name: 'TeknoMakmur',
      company: 'Tech Manufacturer',
      industry: 'technology',
      matchRate: 85,
      location: 'Bandung',
      products: 'IoT Devices',
      revenue: '$1M - $3M'
    }
  ];

  // Fetch & filter
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRecommendations(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = recommendations.filter(item => {
      const matchIndustry = filters.industry ? item.industry === filters.industry : true;
      const matchLocation = filters.location ? item.location.toLowerCase() === filters.location : true;
      const matchRate = filters.matchRate ? item.matchRate >= parseInt(filters.matchRate) : true;
      return matchIndustry && matchLocation && matchRate;
    });

    setFilteredRecommendations(filtered);
  }, [recommendations, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const industryOptions = [
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'seafood', label: 'Seafood' },
    { value: 'technology', label: 'Technology' },
    { value: 'retail', label: 'Retail' }
  ];

  const locationOptions = [
    { value: 'jakarta', label: 'Jakarta' },
    { value: 'bandung', label: 'Bandung' },
    { value: 'surabaya', label: 'Surabaya' },
    { value: 'bali', label: 'Bali' }
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
      ) : filteredRecommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecommendations.map(item => (
            <RecommendationCard key={item.id} data={item} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default Recommendation;
