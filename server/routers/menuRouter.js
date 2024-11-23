import express from "express";

const menuRouter = express.Router();

menuRouter.use(express.json());

// hardcoded menu items
const MENU_CATEGORIES = {
    breakfast: 10,
    lunch: 1,
    dinner: 2,
    beverages: 3
};

const menu = {
    [MENU_CATEGORIES.breakfast]: ["Pancakes", "Eggs Benedict", "Omelets", "French Toast", "Breakfast Burrito", "Bagel with Lox", "Biscuits and Gravy", "Belgian Waffles", "Breakfast Sandwich", "Greek Yogurt Parfait"],
    [MENU_CATEGORIES.lunch]: ["Cheeseburger", "Club Sandwich", "Caesar Salad", "BBQ Ribs", "Philly Cheesesteak", "New England Clam Chowder", "Cobb Salad", "Pulled Pork Sandwich", "Fish Tacos"],
    [MENU_CATEGORIES.dinner]: ["Shrimp Scampi", "BBQ Brisket", "Vegetarian Lasagna", "Stuffed Bell Peppers", "Lobster Tail Dinner", "Taco Night", "Buffalo Wings", "Steakhouse Dinner", "Grilled Salmon", "Roast Chicken", "Spaghetti and Meatballs"],
    [MENU_CATEGORIES.beverages]: ["Coffee", "Iced Tea", "Soda (Soft Drinks)", "Craft Beer", "Bottled Water"]
};

// get menu
menuRouter.get("/:category", (req, res) => {
    console.log("menuRouter received /:category request");
    // extract category from request parameters as an int
    const { category } = req.params;
    console.log("category:", category);
    // category undefined, return an error
    if (!category) {
        res.status(400).json({
            error: "Category is required"
        });
        return;
    }
    // parse category as a number
    const categoryInt = parseInt(category);
    // category is a not a key in menu, return an error
    if (!(categoryInt in Object.values(MENU_CATEGORIES))) {
        res.status(400).json({
            error: "Invalid category"
        });
        return;
    } else {
        // return the menu items for the category
        res.status(200).json({
            items: menu[categoryInt]
        });
    }
});

// add menu item, one at a time
menuRouter.post("/add", (req, res) => {
    // extract category and item from request body
    const { category, item } = req.body;
    // category undefined, return an error
    if (!category) {
        res.status(400).json({
            error: "Category is required"
        });
        return;
    }
    // parse category as a number
    const categoryInt = parseInt(category);
    // category is a not a key in menu, return an error
    if (!(categoryInt in Object.values(MENU_CATEGORIES))) {
        res.status(400).json({
            error: "Invalid category"
        });
        return;
    }
    // item undefined, return an error
    if (!item) {
        res.status(400).json({
            error: "Item is required"
        });
        return;
    }
    // add the item to the menu
    menu[categoryInt].push(item);
    // return a success message
    res.status(200).json({
        message: "Item added to menu"
    });
});

// remove menu item, one at a time
menuRouter.delete("/remove", (req, res) => {
    // extract category and item from request body
    const { category, item } = req.body;
    // category undefined, return an error
    if (!category) {
        res.status(400).json({
            error: "Category is required"
        });
        return;
    }
    // parse category as a number
    const categoryInt = parseInt(category);
    // category is a not a key in menu, return an error
    if (!(categoryInt in Object.values(MENU_CATEGORIES))) {
        res.status(400).json({
            error: "Invalid category"
        });
        return;
    }
    // item undefined, return an error
    if (!item) {
        res.status(400).json({
            error: "Item is required"
        });
        return;
    }
    // try to remove the item from the menu
    const newMenu = menu[categoryInt].filter((menuItem) => menuItem !== item);
    if (newMenu.length === menu[categoryInt].length) {
        res.status(404).json({
            error: "Item not found"
        });
        return;
    }
    // otherwise, update the menu with the new menu
    menu[categoryInt] = newMenu;
    // return a success message
    res.status(200).json({
        message: "Item removed from menu"
    });
});

export default menuRouter;
