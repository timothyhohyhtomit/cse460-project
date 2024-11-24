import React, { useState } from "react";

import MenuCategorySelect from "../util/MenuCategorySelect.js";
import { MENU_CATEGORIES } from "../constants.js";
import { SERVER_URL } from "../conf.js";

function ManagerDashboard({ name }) {
    // states
    const [viewMenuCategory, setViewMenuCategory] = useState(null);
    const [viewMenuResult, setViewMenuResult] = useState("");
    const [addMenuCategory, setAddMenuCategory] = useState(null);
    const [addMenuItem, setAddMenuItem] = useState("");
    const [addMenuResult, setAddMenuResult] = useState("");
    const [removeMenuCategory, setRemoveMenuCategory] = useState(null);
    const [removeMenuItem, setRemoveMenuItem] = useState("");
    const [removeMenuResult, setRemoveMenuResult] = useState("");
    // handlers
    const handleChangeViewMenuCategory = (e) => {
        setViewMenuCategory(e.currentTarget.value);
    };
    const handleAddViewMenuCategory = (e) => {
        setAddMenuCategory(e.currentTarget.value);
    };
    const handleRemoveViewMenuCategory = (e) => {
        setRemoveMenuCategory(e.currentTarget.value);
    };
    const handleClickViewMenu = (e) => {
        // fetch menu items for the selected category from the server 
        fetch(SERVER_URL + `/menu/${viewMenuCategory}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) throw new Error(data.error);
            else {
                // display the menu items
                setViewMenuResult(data.items.join(", "));
            }
        })
        .catch(error => {
            setViewMenuResult(error.message);
        });
    };
    const handleClickAddMenuItem = (e) => {
        // make a request to the server to add the menu item 
        fetch(SERVER_URL + `/menu/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                category: addMenuCategory,
                item: addMenuItem 
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) throw new Error(data.error);
            else {
                // display the menu items
                setAddMenuResult(`Item ${addMenuItem} has been added to ${addMenuCategory} menu`);
            }
        })
        .catch(error => {
            setAddMenuResult(error.message);
        });
    };
    const handleClickRemoveMenuItem = (e) => {
        // make a request to the server to remove the menu item
        fetch(SERVER_URL + `/menu/remove`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                category: removeMenuCategory,
                item: removeMenuItem 
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) throw new Error(data.error);
            else {
                // display the menu items
                setRemoveMenuResult(`Item ${removeMenuItem} has been removed from ${removeMenuCategory} menu`);
            }
        })
        .catch(error => {
            setRemoveMenuResult(error.message);
        });
    };
    return (
        <div>
            <h1>Hi, {name}!</h1>
            <p>You are logged in as Manager.</p>
            <hr />
            <h3>View Menu Items</h3>
            <MenuCategorySelect
                categories={MENU_CATEGORIES}
                selectedCategory={viewMenuCategory}
                handleChangeMenuCategory={handleChangeViewMenuCategory}
            />
            <input type="submit" value="View Menu" onClick={handleClickViewMenu} />
            <div id="view-menu-results">{viewMenuResult}</div>
            <hr />
            <h3>Add Menu Item</h3>
            <MenuCategorySelect
                categories={MENU_CATEGORIES}
                selectedCategory={addMenuCategory}
                handleChangeMenuCategory={handleAddViewMenuCategory}
            />
            <input type="text" placeholder="Enter menu item" value={addMenuItem} onChange={(e) => setAddMenuItem(e.currentTarget.value)} />
            <input type="submit" value="Add Menu Item" onClick={handleClickAddMenuItem} />
            <div id="add-menu-item-results">{addMenuResult}</div>
            <hr />
            <h3>Remove Menu Item</h3>
            <MenuCategorySelect
                categories={MENU_CATEGORIES}
                selectedCategory={removeMenuCategory}
                handleChangeMenuCategory={handleRemoveViewMenuCategory}
            />
            <input type="text" placeholder="Enter menu item" value={removeMenuItem} onChange={(e) => setRemoveMenuItem(e.currentTarget.value)} />
            <input type="submit" value="Remove Menu Item" onClick={handleClickRemoveMenuItem} />
            <div id="remove-menu-item-results">{removeMenuResult}</div>
        </div>
    );
}

export default ManagerDashboard;