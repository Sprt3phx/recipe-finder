import { useState } from "react";

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        if (!query.trim()) return; // Ignore empty queries
        onSearch(query);
        setQuery(""); // Clear input 
    };


    return (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search recipes..."
                className="flex-1 p-2 border rounded"
            />
            <button type="submit" className="bg-blue-500 px-4 py-2  rounded hover:bg-blue-600">
                Search
            </button>
        </form> 
    )
}

export default SearchBar;