

function RecipeCard({ recipe, toggleFavorite, isFavorite, onSelect }) { 
    return (
        <div className="border p-4 rounded shadow relative"
          onClick={() => onSelect(recipe)}
        >
       
            
        {/* Recipe Image */}
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover mb-2 rounded"
        />

        {/* Favorite Button - Future Use */}
        <button
          className="absolute top-1 right-1 bg-white p-1 rounded-md shadow"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering onSelect
              toggleFavorite(recipe);
            }}
          style={{
            fontSize: '24px', color: isFavorite ? 
            'gold' : 'gray'}}
        >
          {isFavorite ? "★" : "☆"}
        </button>

        <h2 className="text-lg font-bold mb-2">{recipe.strMeal}</h2>
        <p className="text-sm text-gray-600">{recipe.strArea} Cuisine</p>
      </div>
    );
}

export default RecipeCard;