let carts = document.querySelectorAll('.add-cart');

let products = [
  {
      name:'Gold Nutrition, Vitamin D3, 125 mcg, 360 Fish Gelatin Softgels',
      tag:'goldnutrition,vitamind3,125mcg,360fishgelatinsoftgels',
      price: 200,
      inCart: 0
  },
  {
      name:'Now Foods, double Strength Silymarin, 200 mg, 200 Veg Capsules',
      tag:'nowfoods,doublestrengthsilymarin,200mg,200vegcapsules',
      price: 100,
      inCart: 0
  },
  {
      name: 'mykind Organics Womens Multi - Berry - 120 Gummies',
      tag:'mykindorganicswomensmulti-berry-120gummies',
      price: 125,
      inCart: 0
  },
  {
      name:'Active Women Multivitamin (120 Capsules)',
      tag:'activewomenmultivitamin(120capsules)',
      price: 5,
      inCart: 0
  },
  {
      name:'Optimum Nutrition Opti-Women, Vitamin C, Zinc and Vitamin D, 120 Capsules',
      tag:'optimumnutritionopti-women,vitaminc,zincandvitamind,120capsules',
      price: 146,
      inCart: 0
  }

];

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);

}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
          cartItems = {
            [product.tag]: product
          }
    }

    localStorage.setItem("productsInCart", JSON.stringify
     (cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost +
        product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('totalCost');

    // console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="./images/${item.tag}.jpg" width="100" height"100">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease"
                name="caret-back-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase"
                name="caret-forward-circle"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart * item.price},00
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost},00
                </h4>
        `;
    }
     deleteButtons();
     manageQuantity();
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productName;
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.trim()
            .toLowerCase().replace(/ /g, '');
//            console.log(productName);
  //          console.log(cartItems[productName].name + " " + cartItems
  //          [productName].inCart)
            localStorage.setItem('cartNumbers', productNumbers - cartItems
            [productName].inCart);

            localStorage.setItem('totalCost', cartCost - (cartItems
            [productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify
            (cartItems));

            displayCart();
            onLoadCartNumbers();
        });
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let cartItems = localStorage.getItem('productsInCart');
    let currentQuantity = 0;
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);

    for(i = 0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
        })
    }
    for(i = 0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', () => {
            console.log("Increase buttons");
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
        })
    }
}


onLoadCartNumbers();
displayCart();
