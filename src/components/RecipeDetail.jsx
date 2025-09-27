
function RecipeDetail({ recipe, onClose }) {
    if (!recipe) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full relative max-h-[80vh] overflow-y-auto">
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            ✖
          </button>

          {/* Recipe Content */}
          <h2 className="text-2xl font-bold mb-4">{recipe.strMeal}</h2>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-64 object-cover mb-4 rounded"
          />
          <p className="mb-4">
            <strong>Cuisine:</strong> {recipe.strArea}
          </p>
          <p className="mb-4">
            <strong>Category:</strong> {recipe.strCategory}
          </p>
          <p className="mb-4">
            <strong>Instructions:</strong> {recipe.strInstructions}
          </p>
        </div>
      </div>
    );
}
export default RecipeDetail;


