

function Favorites({ favorites }) {
    if (favorites.length === 0) {
        return <p className="mt-4 text-gray-600">No favorite recipes yet.</p>;
    }

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Favorite Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {favorites.map((recipe) => (
                    <div key={recipe.idMeal} className="border p-4 rounded shadow">
                        <img
                            src={recipe.strMealThumb}
                            alt={recipe.strMeal}   
                            className="w-full h-48 object-cover mb-2 rounded"
                        />
                        <h3 className="text-lg font-semibold mb-2">{recipe.strMeal}</h3>
                        <p className="text-sm text-gray-600">{recipe.strArea} Cuisine</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Favorites;