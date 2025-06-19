import React from 'react';
import Link from 'next/link';

interface RecipeCardProps {
  recipe: {
    id: number;
    title: string;
    image: string;
  };
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <li className="RecipeCard border w-full border-gray-200 rounded-lg lg:p-4 md:p-3 hover:shadow-md transition-shadow duration-200 cursor-pointer bg-white">
      <Link href={`/recipes/${recipe.id}`}>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="RecipeCard__image h-70 w-full object-cover rounded-md mb-2"
        />
        <h2 className="RecipeCard__title text-2xl p-2 font-medium text-gray-900 tracking-tight">
          {recipe.title}
        </h2>
      </Link>
    </li>
  );
}