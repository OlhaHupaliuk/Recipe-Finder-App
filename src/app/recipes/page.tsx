import RecipeCard from '@/components/RecipeCard';
import React, { Suspense } from 'react';

interface RecipesPageProps {
  searchParams: {
    query?: string;
    cuisine?: string;
    maxReadyTime?: string;
  };
}

async function RecipesContent({ searchParams }: RecipesPageProps) {
const { query = '', cuisine = '', maxReadyTime = '' } = await searchParams;

    const apiKey = process.env.SPOONACULAR_API_KEY;

    const url = new URL('https://api.spoonacular.com/recipes/complexSearch');
    if (query) url.searchParams.append('query', query);
    if (cuisine) url.searchParams.append('cuisine', cuisine);
    if (maxReadyTime) url.searchParams.append('maxReadyTime', maxReadyTime);
    url.searchParams.append('apiKey', apiKey!);

    const res = await fetch(url.toString(), {
        next: { revalidate: 60 }, // кешування 
    });

    if (!res.ok) {
        throw new Error('Failed to fetch recipes');
    }

    const data = await res.json();

  return (
    <main className='RecipesPage flex flex-col p-6 min-h-screen'>
      <h1 className='RecipesPage__title text-5xl md:m-5 sm:m-2'>Recipe Results</h1>
      <p className='RecipesPage__paragraph text-3xl md:m-5 sm:m-2'>Query: {query}</p>
      {data.results.length === 0 && <p>No recipes found.</p>}
        <ul className="grid RecipesPage__list grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
        {data.results.map((recipe: any) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </main>
  );
}

export default function RecipesPage({ searchParams }: RecipesPageProps) {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <RecipesContent searchParams={searchParams} />
    </Suspense>
  );
}