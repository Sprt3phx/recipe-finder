

function RecipeCard({ recipe }) { 
    return (
        <div className="border p-4 rounded shadow">
            <img src={recipe.strMealThumb} alt={recipe.strMeal}className="w-full h-48 object-cover mb-2 rounded" />
            <h2 className="text-lg font-bold mb-2">{recipe.strMeal}</h2>
            <p className="text-sm text-gray-600">{recipe.strArea} Cuisine</p>
        </div>
    )
}

export default RecipeCard;