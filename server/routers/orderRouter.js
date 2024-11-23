import express from "express";

const orderRouter = express.Router();

orderRouter.use(express.json());

// order status enum
const ORDER_STATUS = {
    RECEIVED: 0,
    PREPARING: 1,
    READY: 2
};

// hardcoded orders
const orders = [];

// place an order
orderRouter.post('/place', (req, res) => {
    // extract order details from request body
    const { name, items } = req.body;
    // if order is empty, return an error
    if (!items || Object.keys(items).length === 0) {
        res.status(400).json({
            error: "Empty order"
        });
    } else {
        // create a new order
        const order = {
            id: orders.length,
            name,
            items,
            status: ORDER_STATUS.RECEIVED
        };
        // add the new order to the list of orders
        orders.push(order);
        // return a success message with the order id
        res.status(200).json({
            message: `Order #${order.id} placed successfully`
        });
    }
});

// retrieve all orders
orderRouter.get("/orders", (req, res) => {
    // return the list of orders
    res.status(200).json({
        orders
    });
});

// prepare an order
orderRouter.put("/prepare", (req, res) => {
    // extract order id from request body
    const { id } = req.body;
    // find the order in the list of orders
    const order = orders.find((order) => order.id === id);
    // if the order is not found, return an error
    if (!order) {
        res.status(404).json({
            error: "Order not found"
        });
    } else if (order.status === ORDER_STATUS.PREPARING) {
        // if the order is already being prepared, return an error
        res.status(400).json({
            error: `Order #${order.id} is already being prepared`
        });
    } else {
        // update the status of the order
        order.status = ORDER_STATUS.PREPARING;
        // return a success message
        res.status(200).json({
            message: `Order #${order.id} is being prepared`
        });
    }
});

// mark an order as ready
orderRouter.put("/ready", (req, res) => {
    // extract order id from request body
    const { id } = req.body;
    // find the order in the list of orders
    const order = orders.find((order) => order.id === id);
    // if the order is not found, return an error
    if (!order) {
        res.status(404).json({
            error: "Order not found"
        });
    } else if (order.status === ORDER_STATUS.READY) {
        // if the order is already ready, return an error
        res.status(400).json({
            error: `Order #${order.id} is already ready for pickup`
        });
    } else {
        // update the status of the order
        order.status = ORDER_STATUS.READY;
        // return a success message
        res.status(200).json({
            message: `Order #${order.id} is ready for pickup`
        });
    }
});

// check order status
orderRouter.get("/status/:id", (req, res) => {
    // extract order id from request parameters
    const { id } = req.params;
    // find the order in the list of orders
    const order = orders.find((order) => order.id === parseInt(id));
    // if the order is not found, return an error
    if (!order) {
        res.status(404).json({
            error: "Order not found"
        });
    } else {
        // return the status of the order
        res.status(200).json({
            status: order.status
        });
    }
});

export default orderRouter;
