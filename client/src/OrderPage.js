import React, { useEffect, useState } from "react";
import MenuCategorySelect from "./util/MenuCategorySelect";
import { MENU_CATEGORIES } from "./constants";
import { SERVER_URL } from "./conf";

function OrderPage() {
    // states
    const [name, setName] = useState("");
    const [menuCategory, setMenuCategory] = useState("");
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [cart, setCart] = useState({});
    const [error, setError] = useState("");
    // handlers
    const handleAddItemToCart = (e) => {
        if (!selectedItem || quantity <= 0 || quantity > 20) {
            return;
        }
        if (cart.hasOwnProperty(selectedItem)) {
            setCart({
                ...cart,
                [selectedItem]: cart[selectedItem] + quantity
            });
        } else {
            setCart({
                ...cart,
                [selectedItem]: quantity
            });
        }
    };
    const handlePlaceOrder = (e) => {
        // empty the error message
        setError("");
        // make a request to the server to place the order
        alert(JSON.stringify({
            name,
            items: cart
        }));
        fetch(SERVER_URL + "/order/place", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                items: cart
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) throw new Error(data.error);
            else {
                setError(data.message);
                // empty cart and reset states after placing order
                setName("");
                setMenuCategory("");
                setMenuItems([]);
                setSelectedItem("");
                setQuantity(0);
                setCart({});
            }
        })
        .catch(error => {
            setError(error.message);
        });
    };
    // effects
    useEffect(() => {
        // fetch menu items from the server once menu category is selected
        if (!menuCategory) return;
        setMenuItems(["Big Mac", "Quarter Pounder", "McChicken", "Fillet-O-Fish"]);
    }, [menuCategory]);
    return (
        <div>
            <h1>Order Food</h1>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
            <br />
            <label htmlFor="menu-category">Choose Menu Category: </label>
            <MenuCategorySelect
                categories={MENU_CATEGORIES}
                selectedCategory={menuCategory}
                handleChangeMenuCategory={(e) => setMenuCategory(e.currentTarget.value)}
            />
            <br />
            { menuItems && menuItems.length > 0 && (
                <>
                    <label htmlFor="menu-items">Choose Menu Items: </label>
                    <select id="menu-items" value={selectedItem} onChange={(e) => setSelectedItem(e.currentTarget.value)}>
                        <option value="" disabled>Select an item</option>
                        {menuItems.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                    { selectedItem && (
                        <>
                            <br />
                            <label htmlFor="quantity">Quantity: </label>
                            <input type="number" id="quantity" min="1" max="20" value={quantity} onChange={(e) => setQuantity(parseInt(e.currentTarget.value))} />
                        </>
                    )}
                    <br />
                    { selectedItem && quantity > 0 && quantity <= 20 && (
                        <button onClick={handleAddItemToCart}>Add to Cart</button>
                    )}
                    <br />
                </>
            )}
            <h2>Cart</h2>
            { Object.keys(cart).length > 0 ? (
                <table>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                    </tr>
                    {Object.keys(cart).map((item) => (
                        <tr key={item}>
                            <td>{item}</td>
                            <td>{cart[item]}</td>
                        </tr>
                    ))}
                </table>
            ) : (
                <p>Your cart is empty.</p>
            )}
            { Object.keys(cart).length > 0 && (
                <input type="submit" value="Place Order" onClick={handlePlaceOrder} />
            )}
            <div id="order-error">{error}</div>
        </div>
    );
}

export default OrderPage;