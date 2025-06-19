'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchCard from '@/components/SearchCard';

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [time, setTime] = useState('');

  const isFormValid = query.trim() !== '' || cuisine.trim() !== '' || time.trim() !== '';

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.append('query', query.trim());
    if (cuisine.trim()) params.append('cuisine', cuisine.trim());
    if (time.trim()) params.append('maxReadyTime', time.trim());

    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Discover Amazing Recipes
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Find the perfect recipe for any occasion. Search by ingredients,<br />
          cuisine, or cooking time.
        </p>
      </div>
      
      <SearchCard
        query={query}
        setQuery={setQuery}
        cuisine={cuisine}
        setCuisine={setCuisine}
        time={time}
        setTime={setTime}
        isFormValid={isFormValid}
        handleSearch={handleSearch}
      />
    </main>
  );
}