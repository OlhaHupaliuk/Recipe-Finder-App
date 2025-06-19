This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started



1. git clone https://github.com/your-username/recipe-search-app.git
cd recipe-search-app
2. Set Environment Variables: Create a .env.local file in the root directory and add your Spoonacular API key:
SPOONACULAR_API_KEY=your-api-key-here

3. run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. 
Architecture

Components:

Home (app/page.tsx): Client component with a search form (SearchCard) for inputting query, cuisine, and time.

SearchCard (components/SearchCard.tsx): Form with inputs and a "Find Recipes" button, enabled only when at least one field is filled.

RecipesPage (app/recipes/page.tsx): Server component fetching recipe results from Spoonacular API, wrapped in Suspense.

RecipeCard (components/RecipeCard.tsx): Displays individual recipe with image and title, navigates to details page on click.

RecipeDetails (app/recipes/[id]/page.tsx): Dynamic route for detailed recipe info, also using Suspense.



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
