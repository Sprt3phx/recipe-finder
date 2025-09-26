import { useState, useEffect} from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import RecipeCard from './components/RecipeCard'  

function App() {
  const [recipes, setRecipes] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(query) {
    setLoading(true);
    try {
      setError(''); // Clear previous errors

      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      
      if (!res.ok) throw new Error('Failed to fetch recipes');

      const data = await res.json();
      setRecipes(data.meals || []); // Update state with the recipes
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    // Fetch recipes from an API or local data source
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=beef')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecipes(data.meals);
      })
      .catch((err) => {
        console.error('Error fetching recipes:', err);
      });
  }, [])



  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe Finder</h1>

      {/* Search Bar Component */}
      <SearchBar onSearch={handleSearch} />

      {/* Error State */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Recipes List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div className="border p-4 rounded shadow">
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
