import React, { Suspense } from 'react';

interface RecipeDetailsProps {
  params: { id: string };
}
async function RecipeDetailsContent({ params }: RecipeDetailsProps) {
  const { id } = await params;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  const url = new URL(`https://api.spoonacular.com/recipes/${id}/information`);
  url.searchParams.append('apiKey', apiKey!);

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch recipe details');
  }

  const recipe = await res.json();

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/*header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="relative">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl font-bold text-white mb-2 leading-tight">
                {recipe.title}
              </h1>
              <div className="flex items-center text-white/90 text-sm">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mr-3">
                  {recipe.servings} servings
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mr-3">
                  {recipe.readyInMinutes} minutes
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  ${(recipe.pricePerServing / 100).toFixed(2)} per serving
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* ingredients */}
            {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ingredients</h2>
                <ul className="space-y-3">
                  {recipe.extendedIngredients.map((ingredient: any, index: number) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                      <span className="font-medium mr-2">{ingredient.amount} {ingredient.unit}</span>
                      <span>{ingredient.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/*categouries */}
          <div className="space-y-6">
            {(recipe.cuisines?.length > 0 || recipe.dishTypes?.length > 0) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                
                {recipe.cuisines?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Cuisines</h4>
                    <div className="flex flex-wrap gap-2">
                      {recipe.cuisines.map((cuisine: string, index: number) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {cuisine}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {recipe.dishTypes?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Dish Types</h4>
                    <div className="flex flex-wrap gap-2">
                      {recipe.dishTypes.map((dishType: string, index: number) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {dishType}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function RecipeDetails({ params }: RecipeDetailsProps) {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <RecipeDetailsContent params={params} />
    </Suspense>
  );
}