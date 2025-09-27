import { useState, useEffect} from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import RecipeCard from './components/RecipeCard'  
import Favorites from './components/Favorites'
import RecipeDetail from './components/RecipeDetail'


function App() {
  const [recipes, setRecipes] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);


  // Handle search queries
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

  function handleSelect(recipe) {
    setSelectedRecipe(recipe);
    setShowModal(true);
  }

  function handleClose() {
    setSelectedRecipe(null);
    setShowModal(false);
  }

  
  function toggleFavorite(recipe) { 
    //Check if it's already in favorites
    const isFav = favorites.some((fav) => fav.idMeal === recipe.idMeal);
    if (isFav) { 
      // Remove from favorites
      setFavorites(favorites.filter((fav) => fav.idMeal !== recipe.idMeal));
    } else { 
      // Add to favorites
      setFavorites([...favorites, recipe]);
    }
    
  }


  useEffect(() => {
    // Fetch recipes from an API or local data source
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=pie')
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

      {showModal && selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={handleClose}
        />
      )}

      {/* Recipes List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {!loading && recipes.length === 0 ? (
          <p className="text-gray-600">No recipes found for your search. Try another ingredient or dish name.</p>
        ) : (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.some((fav) => fav.idMeal === recipe.idMeal)}
              onSelect={handleSelect}
            />
          ))
        )}
      </div>

      {/* Favorites Component - Future Use */}
  <Favorites favorites={favorites} />
    </div>
  );
}

export default App
