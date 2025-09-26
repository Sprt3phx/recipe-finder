import { useState, useEffect} from 'react'
import './App.css'
import SearchBar from './components/SearchBar'

function App() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = async (query) => {
    try {
      setLoading(true);
      setError('');

      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      
      if (!res.ok) throw new Error('Failed to fetch recipes');

      const data = await res.json();

      if (!data.meals) {
        setRecipes([]);
        setError('No recipes found');
        return;
      }

      setRecipes(data.meals);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



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
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Recipe Finder</h1>
     
      {/* Search Bar Component */}
      <SearchBar onSearch={fetchRecipes} />

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error State */}
      {error && <p className='text-red-500'>{error}</p>}

      {/* Recipes List */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className='border p-4 rounded shadow'>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className='w-full h-48 object-cover mb-2 rounded' />
            <h2 className='text-lg font-semibold mb-2'>{recipe.strMeal}</h2>
            <p className='text-sm text-gray-600'>{recipe.strArea} Cuisine</p>
          </div>
        ))}
      </div>
    </div>

    
  )
}

export default App
