import React from "react";

function MenuCategorySelect({ categories, selectedCategory, handleChangeMenuCategory }) {
    return (
        <div>
            <select onChange={handleChangeMenuCategory} defaultValue="" value={selectedCategory}>
                <option value="" disabled>Select a category</option>
                {Object.keys(categories).map((category, i) => (
                    <option key={i} value={categories[category]}>{category}</option>
                ))}
            </select>
        </div>
    );
}

export default MenuCategorySelect;