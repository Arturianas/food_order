const meals = {
  data: [
      {
          "type": "Breakfast",
          "id": 1,
          "name": "King Burger",
          "desc": "very delicous",
          "calories": 25,
          "price": 5.99,
          "img": "./images/burger.jpg",
          "kcal": "300 - 500 Kcal",
        },
        {
          "type": "Lunch",
          "id": 2,
          "name": "Vegan Pizza",
          "desc": "very delicous",
          "calories": 25,
          "price": 7.99,
          "img": "./images/pizza.jpg",
          "kcal": "150 - 200 Kcal",
        },
        {
          "type": "Dinner",
          "id": 3,
          "name": "Chicken Sandwich",
          "desc": "very delicous",
          "calories": 25,
          "price": 4.99,
          "img": "./images/sandwich.jpg",
          "kcal": "250 - 300 Kcal",
        },
        {
          "type": "Lunch",
          "id": 4,
          "name": "Vegan Pizza Large",
          "desc": "very delicous",
          "calories": 25,
          "price": 10.00,
          "img": "./images/pizza.jpg",
          "kcal": "350 - 400 Kcal",
        },
        {
          "type": "Lunch",
          "id": 5,
          "name": "Bless Pizza",
          "desc": "very delicous",
          "calories": 25,
          "price": 4.99,
          "img": "./images/pizza-g2.jpg",
          "kcal": "350 - 400 Kcal",
        },
        {
          "type": "Breakfast",
          "id": 6,
          "name": "Cereal",
          "desc": "very delicous",
          "calories": 25,
          "price": 2.49,
          "img": "./images/cereal.jpg",
          "kcal": "50 - 100 Kcal",
        },
        {
          "type": "Lunch",
          "id": 7,
          "name": "Salmon",
          "desc": "very delicous",
          "calories": 25,
          "price": 8.45,
          "img": "./images/salmon-g8.jpg",
          "kcal": "250 - 300 Kcal",
        },
        {
          "type": "Breakfast",
          "id": 8,
          "name": "Overnight Oats",
          "desc": "very delicous",
          "calories": 25,
          "price": 3.19,
          "img": "./images/bowl-breakfast.jpg",
          "kcal": "50 - 85 Kcal",
        },
        {
          "type": "Breakfast",
          "id": 9,
          "name": "Panckakes",
          "desc": "very delicous",
          "calories": 25,
          "price": 5.00,
          "img": "./images/pancakes-breakfast.jpg",
          "kcal": "300 - 500 Kcal",
        },
        {
          "type": "Dinner",
          "id": 10,
          "name": "Healthy Salmon",
          "desc": "very delicous",
          "calories": 25,
          "price": 10.00,
          "img": "./images/dinner.jpg",
          "kcal": "250 - 400 Kcal",
        },
        {
          "type": "Dinner",
          "id": 11,
          "name": "Grill Chicken",
          "desc": "very delicous",
          "calories": 25,
          "price": 15.45,
          "img": "./images/dinner2.jpg",
          "kcal": "350 - 400 Kcal",
        },
        {
          "type": "Breakfast",
          "id": 12,
          "name": "Cinnamon Rolls",
          "desc": "very delicous",
          "calories": 25,
          "price": 0.89,
          "img": "./images/breakfast.jpg",
          "kcal": "50 - 100 Kcal",
        },
  ],
};







 
   

// SELECT ELEMENTS
let food = document.querySelector('.foods');
let cartDiv = document.querySelector('.cart');
let subtotalDiv = document.querySelector('.subtotal');
let cartSum = document.querySelector('.Cartt');
let card = document.createElement('div');
   card.classList.add('food', 'i.type', 'hide');

// RENDER PRODUCTS
function renderProdcuts() {
  meals.data.map((meal) => {
    food.innerHTML += `
    <div class = "food hide ${meal.type}" id=${meal.id}">
    <div class = "food-img">
        <img src = "${meal.img}" alt = "food image">
        <span>
            <i onclick="addToFavorites(${meal.id})" class = "far fa-heart heart${meal.id}"></i>
        </span>
        <h3 class = "food-rate">$ ${meal.price}</h3>
    </div>

    <div class = "food-content">
        <h2>${meal.name}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus unde aliquam cupiditate.</p>
        <div class = "food-info">
            <div>
                <i class = "fas fa-fire"></i>
                <p>${meal.kcal}</p>
            </div>
            <span>${meal.type}</span>
        </div>

        <div class = "food-price-calc">
            <h2 class = "food-total"></h2>
            <div class = "food-quantity">
                
               
                    
                    <button class="menuBtn" onclick="addToCart(${meal.id})">Add To Cart</button>
            </div>
        </div>
    </div>
</div>
        `;
  });
}
renderProdcuts();





// FILTER PRODUCTS
// parameter passsed from button the same as category
const filterProduct = (value) => {
  //
  let buttons = document.querySelectorAll('.button-value')
// check is value is equal to button inner text, if so add active class otherwise remove active class
  buttons.forEach((button) => {
    if(value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active")
    } else {
      button.classList.remove('active')
    }
  });

  //select all cards
  let elements = document.querySelectorAll('.food');

  //loop through all cards
  elements.forEach((element) => {
    //display all cards on 'all' button click
    if (value == 'all') {
      element.classList.remove('hide')
    } else {
      //check if element contains category class
      if( element.classList.contains(value)) {
        element.classList.remove('hide')
      } else {
        // hide other elements
        
          element.classList.add('hide')
        
      }
    }
  })
};



 //initialy display all products

 window.onload = () => {
  filterProduct('all')
}







//let itemBtn = document.querySelector('.menuBtn');


// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [] ;
updateCart();

// ADD TO CART
function addToCart(id) {
  //check if item already exists in the cart
  if(cart.some(item => item.id === id)) {
    changeNumberOfUnits('plus', id)
  } else {
    const item = meals.data.find((meal) => meal.id === id);

    cart.push({
      ...item,
      numberOfUnits : 1,
    });
  }

  //itemBtn.textContent = 'Button clicked';
  updateCart();
  };




  const hearts = document.querySelectorAll(".fa-heart");
  

  let favorites = JSON.parse(localStorage.getItem("FAVORITES")) || [] ;
  updateFavorites()
  console.log(favorites)
// ADD TO CART
function addToFavorites(id) {

  //const hearts = document.querySelectorAll(".fa-heart");
  const item = meals.data.find((meal) => meal.id === id);

  
  hearts.forEach((heart) => {
    // Add
    

    if(heart.classList.contains(`heart${id}`) && favorites.find((item) => item.id === id)  ){
      console.log(`removed`)
     

      favorites = favorites.filter((item) => item.id !== id);
      // Remove
      updateFavorites()

      heart.classList.remove('favorite')
    } else if (heart.classList.contains(`heart${id}`) )  {
      console.log(`heart contains id: ${id}`);
     

  

      favorites.push({
        ...item,
       
       });

       // save cart to local storage
       updateFavorites()

       heart.classList.add('favorite');
      console.log(heart.parentElement)
    }

   
  })

  
  console.log(favorites)
  };



  favorites.forEach((favorite) => {
    let sirdute = document.querySelectorAll(`.heart${favorite.id}`);
  
    sirdute.forEach((sirdis) => {
      sirdis.classList.add('favorite')
    })
    
  })




  // function addToFavorites(id) {

  //   const hearts = document.querySelectorAll(".fa-heart");
  //   const item = meals.data.find((meal) => meal.id === id);
  
    
  //   hearts.forEach((heart) => {
  //     // Add
      
  
  //     if(heart.classList.contains(`${id}`) && heart.classList.contains('favorite')){
  //       console.log(`removed`)
  //       heart.classList.remove('favorite');
  
  //       favorites = favorites.filter((item) => item.id !== id);
  //       // Remove
  //     } else if (heart.classList.contains(`${id}`)) {
  //       console.log(`heart contains id: ${id}`);
  //       heart.classList.add('favorite');
  
  //       favorites.push({
  //         ...item,
         
  //        });
  
  //        // save cart to local storage
  //        updateFavorites()
  //     }
  //   })
  
  
       
    
  
  
    
  //   console.log(favorites)
  //   };



  const listenForLikes = () => {
    //const hearts = document.querySelectorAll(".fa-heart");
    // hearts.forEach(heart => {
    //  heart.addEventListener("click", (event) => {
    //    event.target.classList.toggle("like-no");
    //    event.target.classList.toggle("like-yes");
    //    if (event.target.classList.contains("like-yes")) {
    //      console.log("✅💾 Saving Favorite...");
         
    //    } else {
    //      console.log("❌ Removing Favorite...");
         
    //    }
    //  })
    // })
  }

//console.log(favorites)

// update cart
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
};


// update favorites
function updateFavorites() {
 

  // save cart to local storage
  localStorage.setItem("FAVORITES", JSON.stringify(favorites));
};



// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach(item => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalDiv.innerHTML = `Subtotal (items: ${totalItems})      $${totalPrice.toFixed(2)}`;
  cartSum.innerHTML = `Cart: ${totalItems}`
}





// render cart items
function renderCartItems() {
  cartDiv.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartDiv.innerHTML += `
        <div class="cart-item">
            <div class="cartFlex">
                <div class="item-info" onclick="removeItemFromCart(${item.id})">
                  <img src='${item.img}'/>
                </div>
                <div class="item-info-text">
                  <h2>${item.type}</h2>
                  <h4>${item.name}</h4>
                </div>
                <button class="remove-btn" onclick="removeItemFromCart(${item.id})"><i class="fas fa-times"></i></button>
            </div>
            <hr class="hr" color="#DCDCDC">
            <div class="priceFlex">
                <div class="unit-price">
                  <small>$</small>${item.price} / unit
                </div>
                <button class="remove-btn-small" onclick="removeItemFromCart(${item.id})">remove</button>
                <div class="units">
                    <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                    <div class="number">${item.numberOfUnits}</div>
                    <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
                </div>
            </div>
            
        </div>
      `;
  });
};








// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}





// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    let itemPrice = item.price;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
        itemPrice += item.price / item.numberOfUnits;
      } else if (action === "plus") {
        numberOfUnits++;
        itemPrice += item.price * item.numberOfUnits;
      }
    }

    return {
      ...item,
      numberOfUnits,
      itemPrice,
    };
    console.log(cart)
  });

  updateCart();
}





/*
const allFood = document.querySelector('.food');
allFood.forEach(food => {
    food.querySelector('.food-total').textContent = '$ 0.00';
});

allFood.forEach((food, index) => {
    food.addEventListener('click', (event) => {
        if(event.target.classList.contains('order-dec') || event.target.parentElement.classList.contains('order-dec')){
            changeOrder(food, 'dec');
        }

        if(event.target.classList.contains('order-inc') || event.target.parentElement.classList.contains('order-inc')){
            changeOrder(food, 'inc');
        }
    });
});

function changeOrder(food, changeType){
    let foodQuan = parseInt(food.querySelector('.order-val').textContent);
    let foodPrice = parseFloat(food.querySelector('.food-rate').textContent.replace(/[^\d.-]/g, '')); // replacing all non-digit characters

    if(changeType === 'dec' && foodQuan > 0) foodQuan--;
    if(changeType === 'inc') foodQuan++;

    food.querySelector('.order-val').textContent = foodQuan;
    food.querySelector('.food-total').textContent = `$ ${(foodQuan * foodPrice).toFixed(2)}`;
};
*/










let cartDivas = document.querySelector('.cartBackground');
let foodWrapper = document.querySelector('.food-wrapper')


const openCart = (value) => {
  if(value === 'open') {
    cartDivas.classList.remove("nerodyti");
    //foodWrapper.classList.add("fixed")
    document.body.style['overflow-y'] = 'hidden';
  } else if(value === 'close') {
    cartDivas.classList.add("nerodyti");
    //foodWrapper.classList.remove("fixed")
    document.body.style['overflow-y'] = 'auto';
  }
}


// Modal with address and shipping info
let form = document.getElementById("form1")
let OrderModal = document.querySelector('.orderModal');
let nerodytiConfirm = document.querySelector('.orderConfirm')

const orderModal = (value) => {
  if(value === 'open') {
    OrderModal.classList.remove("nerodytiModal");
    //foodWrapper.classList.add("fixed")
    
  } else if(value === 'close') {
    OrderModal.classList.add("nerodytiModal");
    //foodWrapper.classList.remove("fixed")
    form.classList.remove('nerodytiForm')
    nerodytiConfirm.classList.add('nerodytiConfirm')
  }
}



// final order with shipping details

let FinalOrder = []

// const finalOrder = (e) => {
//   e.preventDefault(); // stop form submission




//  console.log('hey')
// }



form.addEventListener("submit", function(e) {
  const address = document.getElementById('address').value;
 const shipping = document.querySelector('#shipping').value;
    e.preventDefault(); // stop form submission

    form.classList.add('nerodytiForm');
    nerodytiConfirm.classList.remove('nerodytiConfirm')

    FinalOrder.push({
      ...cart,
      address,
      shipping
    })
  console.log(FinalOrder)

  e.target.reset();
});


// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("myHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > 145 ) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}


console.log(sticky)