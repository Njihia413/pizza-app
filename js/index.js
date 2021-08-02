//Business Logic

//Declaring constant variables
//Pizza Names
const pizzas = [
    { name: "Grilled Chicken Winter" },
    { name: "Corn Starch Tikka" },
    { name: "Smoked Hawaiian Chicken" },
    { name: "Veggie Special" },
    { name: "Bacon Barbeque Steak" },
];

//Pizza Sizes
const pizzaSizes = [
    {
        size: "small",
        price: 650,
    },
    {
        size: "medium",
        price: 850,
    },
    {
        size: "large",
        price: 1050,
    },
];

//Pizza Crusts
const pizzaCrusts = [
    {
        name: "crispy",
        price: 150,
    },
    {
        name: "stuffed",
        price: 200,
    },
    {
        name: "Glutten free",
        price: 100,
    },
];

//Toppings
const pizzaToppings = ["SweetCorn", "Mozzarella", "Sausage"];

//Pizza Constructor
function Pizza(name) {
    this.name = name;
    this.price = 0;
    this.quantity = 1; //This is the minimum quantity
    this.toppings = [];
}

//Pizza Size Prototype
Pizza.prototype.setSize = function (size) {
    const pizzaSize = pizzaSizes.find((pizzaSize) => pizzaSize.size == size);
    if (pizzaSize) {
        this.size = pizzaSize;
        this.calculateTotal();
    }
};

//Pizza Crust Prototype
Pizza.prototype.setCrust = function (name) {
    const pizzaCrust = pizzaCrusts.find((pizzaCrust) => pizzaCrust.name == name);
    if (pizzaCrust) {
        this.crust = pizzaCrust;
        this.calculateTotal();
    }
};

//Pizza Toppings Prototype
Pizza.prototype.setTopings = function (toppings) {
    this.toppings = toppings;
    this.calculateTotal();
};

//Pizza Quantity Prototype
Pizza.prototype.setQuantity = function (quantity) {
    this.quantity = +quantity;
    this.calculateTotal();
};

//Pizza Prototype Total
Pizza.prototype.calculateTotal = function () {
    const toppingPrice = 50;

    if (this.size) {
        this.price = this.size.price;
    }

    if (this.crust) {
        this.price = this.price + this.crust.price;
    }

    // add the price of toppings
    this.price += this.toppings.length * toppingPrice;

    this.price *= this.quantity;
};
