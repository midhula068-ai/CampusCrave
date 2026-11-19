// =====================================
// 1. STORE DETAILS AND MENU
// =====================================

const stores = [
    {
        id: 1,
        name: "OVEN EXPRESS",
        category: "Cafe",
        opening: "8:00 AM",
        closing: "10:00 PM",
        menu: [
            { name: "Cold Coffee", price: 90 },
            { name: "Veg Sandwich", price: 80 },
            { name: "Cappuccino", price: 100 },
            { name: "Aloo tikki burger", price: 50 },
            { name: " Malay Chaap" , price: 90}
        ]
    },

    {
        id: 2,
        name: "Tripti",
        category: "South Indian Food",
        opening: "11:00 AM",
        closing: "11:00 PM",
        menu: [
            { name: "Dosa ", price: 75 },
            { name: "idli", price: 60 },
            { name: "Puttu kadala", price: 65 },
            { name: "rice and curry", price: 100 }
        ]
    },

    {
        id: 3,
        name: "Rumis Restro",
        category: "Meals",
        opening: "12:00 PM",
        closing: "9:30 PM",
        menu: [
            { name: "Ghee Rice", price: 80 },
            { name: "Biriyani  Rice", price: 90 },
            { name: "porota rolls", price: 90 }
        ]
    },

    {
        id: 4,
        name: "Nand Juice",
        category: "juice",
        opening: "10:00 AM",
        closing: "10:00 PM",
        menu: [
            { name: "fresh lime water", price: 20 },
            { name: "fresh lime soda", price: 30 },
            { name: "fresh fruit juice", price: 80 },
            { name: "shake", price: 80 }
        ]
    },

    {
        id: 5,
        name: "Chaap Express",
        category: "Chaap",
        opening: "1:00 PM",
        closing: "11:00 PM",
        menu: [
            { name: "Malay chaap", price: 90 },
            { name: "afghani chaap", price: 90 },
            { name: "Tandoori chaap", price: 90 }
        ]
    },

    {
        id: 6,
        name: "Juice world",
        category: "Fresh juice",
        opening: "8:00 AM",
        closing: "9:00 PM",
        menu: [
            { name: "lime", price: 25 },
            { name: "fruit juice", price: 55 },
            { name: "shake", price: 110 },
            { name: "Tea", price: 15 },
            { name: "Cofee", price: 25}
        ]
    }
];


// =====================================
// 2. DISPLAY ALL STORES
// =====================================

function displayStores() {

    const storeList = document.getElementById("storeList");

    storeList.innerHTML = "";

    stores.forEach(store => {

        storeList.innerHTML += `
            <div class="store-card">

                <h3>${store.name}</h3>

                <p>Category: ${store.category}</p>

                <p>Opening: ${store.opening}</p>

                <p>Closing: ${store.closing}</p>

                <button onclick="showMenu(${store.id})">
                    View Menu
                </button>

            </div>
        `;

    });
}


// =====================================
// 3. DISPLAY INDIVIDUAL STORE MENU
// =====================================

function showMenu(storeId) {

    const store = stores.find(s => s.id === storeId);

    const storeName = document.getElementById("storeName");

    const menuList = document.getElementById("menuList");

    storeName.innerText = store.name + " - Menu";

    menuList.innerHTML = "";

    store.menu.forEach((food, index) => {

        menuList.innerHTML += `
            <div class="menu-card">

                <h4>${food.name}</h4>

                <p>Price: ₹${food.price}</p>

                <button onclick="addToCart(${store.id}, ${index})">
                    Add to Cart
                </button>

            </div>
        `;

    });

    document.getElementById("menu").scrollIntoView({
        behavior: "smooth"
    });

}


// =====================================
// 4. ADD ITEMS TO CART
// =====================================

let cart = [];

function addToCart(storeId, foodIndex) {

    const store = stores.find(s => s.id === storeId);

    const food = store.menu[foodIndex];

    // Allow items from only one store per order

    if (cart.length > 0 && cart[0].storeId !== storeId) {

        alert("Please complete your current order before ordering from another store.");

        return;

    }

    cart.push({

        storeId: storeId,
        storeName: store.name,
        name: food.name,
        price: food.price

    });

    alert(food.name + " added to cart!");

    updateCart();

}


// =====================================
// 5. UPDATE CART AND TOTAL PRICE
// =====================================

function updateCart() {

    const cartItems = document.getElementById("cartItems");

    const totalPrice = document.getElementById("totalPrice");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        cartItems.innerHTML += `

            <div class="cart-item">

                <p>${item.name} - ₹${item.price}</p>

                <button onclick="removeItem(${index})">
                    Remove
                </button>

            </div>

        `;

    });

    totalPrice.innerText = "Total: ₹" + total;

}


// =====================================
// 6. REMOVE ITEMS FROM CART
// =====================================

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


// =====================================
// 7. VIEW CART
// =====================================

function viewCart() {

    document.getElementById("booking").scrollIntoView({

        behavior: "smooth"

    });

}


// =====================================
// 8. PLACE FOOD ORDER
// =====================================

function placeOrder() {

    const customerName =
        document.getElementById("customerName").value;

    const orderType =
        document.getElementById("orderType").value;

    const bookingTime =
        document.getElementById("bookingTime").value;

    const location =
        document.getElementById("location").value;

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    if (
        customerName.trim() === "" ||
        bookingTime.trim() === "" ||
        location.trim() === ""
    ) {

        alert("Please fill in all the required details.");

        return;

    }

    let total = 0;

    cart.forEach(item => {

        total += item.price;

    });

    alert(

        "Order Placed Successfully!\n\n" +

        "Customer: " + customerName + "\n" +

        "Store: " + cart[0].storeName + "\n" +

        "Order Type: " + orderType + "\n" +

        "Time: " + bookingTime + "\n" +

        "Location: " + location + "\n" +

        "Total Amount: ₹" + total

    );

    cart = [];

    updateCart();

}


// =====================================
// 9. STUDENT PART-TIME JOB REGISTRATION
// =====================================

document.getElementById("jobForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const studentName =
            document.getElementById("studentName").value;

        const studentID =
            document.getElementById("studentID").value;

        const phone =
            document.getElementById("phone").value;

        const availableTime =
            document.getElementById("availableTime").value;

        alert(

            "Registration Submitted Successfully!\n\n" +

            "Student Name: " + studentName + "\n" +

            "Student ID: " + studentID + "\n" +

            "Phone: " + phone + "\n" +

            "Available Time: " + availableTime

        );

        document.getElementById("jobForm").reset();

    }
);


// =====================================
// 10. LOAD STORES WHEN PAGE OPENS
// =====================================

displayStores();
