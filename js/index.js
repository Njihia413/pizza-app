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

//Appending function
//pizza names
pizzas.forEach((pizza) => {
    $("#pizza").append(`<option value="${pizza.name}">${pizza.name}</option>`);
});

//pizza sizes
pizzaSizes.forEach((pizzaSize) => {
    $("#size").append(
        `<option value="${pizzaSize.size}">${pizzaSize.size}-${pizzaSize.price}</option>`
    );
});

//pizza crusts
pizzaCrusts.forEach((pizzaCrust) => {
    $("#crust").append(
        `<option value="${pizzaCrust.name}">${pizzaCrust.name}-${pizzaCrust.price}</option>`
    );
});

//pizza toppings
pizzaToppings.forEach((topping) => {
    $(".toppings").append(`<div class="col-md-6">
    <div class="form-check">
      <input class="form-check-input" name="toppings[]" type="checkbox" id="${topping}" value="${topping}">
      <label class="form-check-label" for="${topping}">
          ${topping}
      </label>
      </div>
    </div>`);
});

//Calculating Grand Total
function calculateGrandTotal() {
    let total = 0;
    cart.forEach((pizza) => {
        total += pizza.price;
    });

    $(".grand-total").html(`Ksh <span class="text-bold">${total}</span> `);

}

//cart array
const cart = [];
    // check if cart is empty
    if (cart.length == 0) {
        $(".empty-cart").show();
        $(".delivery-button").hide();
    } else {
        $(".empty-cart").hide();
    }

    $("#order-form").on("submit", function (event) {
        event.preventDefault();
    });

    //get selected values
    const selectedPizzaName = $("#pizza").val();
    const selectedSize = $("#size").val();
    const selectedCrust = $("#crust").val();
    const selectedToppings = $("input[name='toppings[]']:checkbox:checked")
        .map(function () {
            return $(this).val();
        })
        .get();

    //field validation
    if (!selectedPizzaName || !selectedSize || !selectedCrust) {
        $("#error").text("*Flavor, size and crust fields required* ");
        return;
    } else {
        $("#error").text("");
    }    

