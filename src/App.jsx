import { useState, useEffect} from 'react'
import './App.css'

function App() {
  const [recipes, setRecipes] = useState([])

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
      <h1 className='text-2xl font-bold'>Recipe Finder</h1>
      {recipes.map((recipe) => (
        <div key={recipe.idMeal}
          className='p-2 border-b'>
            {recipe.strMeal}
        </div>
      ))}
    </div>

    
  )
}

export default App
