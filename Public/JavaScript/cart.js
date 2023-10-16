const product = [
    {
        id: 0,
        images: 'images/Food-Drive.jpg',
        title: "grt",
        price: 120,
    },
    {
        id: 1,
        images: 'images/Food-Drive.jpg',
        title: 'not bad',
        price: 220,
    },
    {
        id: 2,
        images: 'images/Food-Drive.jpg',
        title: 'good',
        price: 230,
    },
    {
        id: 3,
        images: 'images/Food-Drive.jpg',
        title: 'Not good',
        price: 230,
    }
];

const categories = [...new Set(product.map((item) => item))];

let i = 0;

document.getElementById("root").innerHTML = product.map((item, index) => {
    var { images, title, price } = item;
    return (
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src='${images}'></img>
            </div>
            <div class='bottom'>
                <p>${title}</p>
                <h2>$ ${price}.00</h2>
                <button onclick='addtocart(${index})'>Add to cart</button>
            </div>
        </div>`
    );
}).join('');

var cart = [];

function addtocart(a) {
    cart.push({ ...categories[a] });
    displaycart();
}

function delElement(a) {
    cart.splice(a, 1);
    displaycart();
}

function displaycart() {
    let j = 0, total = 0;
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length == 0) {
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$" + 0 + ".00";
    } else {
        document.getElementById("cartItem").innerHTML = cart.map((items) => {
            var { images, title, price } = items;
            total = total + price;
            document.getElementById("total").innerHTML = "$ " + total + ".00";
            return (
                `<div class='cart-item'>
                    <div class='rowimg'>
                        <img class='rowimgimg' src=${images}>
                    </div>
                    <p style='front-size: 12px;'>${title}</p>
                    <h2 style='front-size: 15px;'>$ ${price}.00</h2>
                    <i class='fa-solid fa-trash' onclick='delElement(${j++})'></i>
                </div>`
            );
        }).join('');
    }
}