import React from 'react';
import SearchInput from './SearchInput';

type SearchCardProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  cuisine: string;
  setCuisine: React.Dispatch<React.SetStateAction<string>>;
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  isFormValid: boolean;
  handleSearch: () => void;
};

const SearchCard: React.FC<SearchCardProps> = ({
  query,
  setQuery,
  cuisine,
  setCuisine,
  time,
  setTime,
  isFormValid,
  handleSearch,
}) => {
  return (
    <div className="SearchCard bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Start Your Culinary Journey
        </h2>
        <p className="text-sm text-gray-500">
          Fill in at least one field to begin your search
        </p>
      </div>

      <div className="space-y-6">
        <SearchInput
          name="dishName"
          type="text"
          placeholder="e.g., pasta, chicken, chocolate cake..."
          labelTitle="What are you craving?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <SearchInput
          name="cuisine"
          type="select"
          placeholder="Choose a cuisine..."
          labelTitle="Cuisine preference"
          options={['Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese', 'French', 'Thai', 'Mediterranean']}
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        />

        <SearchInput
          name="cookingTime"
          type="number"
          placeholder="e.g., 30, 60, 120..."
          labelTitle="Maximum cooking time (minutes)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button
          onClick={handleSearch}
          disabled={!isFormValid}
          className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 ${
            isFormValid 
              ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-md transform hover:-translate-y-0.5' 
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Find Recipes
        </button>
      </div>
    </div>
  );
};

export default SearchCard;