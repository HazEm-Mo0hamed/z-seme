let search = document.querySelector(".search-box");

document.querySelector("#search-icon").onclick = () => {
  search.classList.toggle("active");
  cart.classList.remove("active");
  navbar.classList.remove("active");
};
let cart = document.querySelector(".cart");

document.querySelector("#cart-icon").onclick = () => {
  cart.classList.toggle("active");
  search.classList.remove("active");
  navbar.classList.remove("active");
};
let navbar = document.querySelector(".navbar");

document.querySelector("#meue-icon").onclick = () => {
  navbar.classList.toggle("active");
  cart.classList.remove("active");
  search.classList.remove("active");
};
let closecart = document.querySelector("#cart-close");

closecart.onclick = () => {
  cart.classList.remove("active");
  search.classList.remove("active");
};

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", begin);
} else {
  begin();
}
//

function begin() {
  addEvents();
}

//

function update() {
  addEvents();
  updateTotal();
  
}

//

function addEvents() {
  let cartRemoveBtn = document.querySelectorAll(".cart-remove");
  // console.log(cartRemoveBtn);
  cartRemoveBtn.forEach((btn) => {
    btn.addEventListener("click", method_removeCartItem);
  });
  //
  let cartQuaintly = document.querySelectorAll(".number-que");
  cartQuaintly.forEach((input) => {
    input.addEventListener("change", method_Change);
  });
  //
  let addCart_btn = document.querySelectorAll(".add-cart");
  // console.log(addCart_btn);

  addCart_btn.forEach((btn) => {
    btn.addEventListener("click", addCArtItem);
  });

  let buy_btn = document.querySelector(".buy-btn");
  buy_btn.addEventListener("click", buy_Suc);
}

//

function method_removeCartItem() {
  this.parentElement.remove();
  itemAdd = itemAdd.filter(
    (el) =>
      el.title !=
      this.parentElement.querySelector(".cart-proudct-title").innerHTML
  );

  update();
}
function method_Change() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  // this.value=Math.floor(this.value)

  update();
}

let itemAdd = [];
function addCArtItem() {
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let img = product.querySelector(".Product-img").src;
  console.log(title, price, img);

  let newAdd = {
    title,
    price,
    img,
  };
  if (itemAdd.find((el) => el.title == newAdd.title)) {
    swal({
      title: "This item already added to cart!",
      icon: "error",
      button: "Ok",
      className:"rak",
      timer:"3000"
    })
    return;
  } else {
    itemAdd.push(newAdd);
  }
  let carBoxEl = cartClone(title, price, img);
  let newLoad = document.createElement("div");
  newLoad.innerHTML = carBoxEl;
  let cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newLoad);

  update();
}

function buy_Suc() {
  if (itemAdd.length <= 0) {
    swal({
      title: "No Order Now!",
      icon: "info",
      button: "Ok",
      className:"rak",
      timer:"3000"
    })
    return;
  } else {
    let cardCOnte = cart.querySelector(".cart-content");
    cardCOnte.innerHTML = "";
  }
  swal({
    title: "Order Successfully!",
    icon: "success",
    button: "Ok",
    className:"rak",
    timer:"3000"
  })
  itemAdd = [];
  update();
}
//

function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  let totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let que = cartBox.querySelector(".number-que").value;
    total += price * que;
  });

  total = total.toFixed(2);

  totalElement.innerHTML = "$" + total;
}
function cartClone(title, price, img) {
  
  return `<div class="cart-box">
            <img src=${img} class="cart-img" alt="">
                <div class="deital-box">
                    <div class="cart-proudct-title">${title}</div>
                    <div class="cart-price">${price}</div>
                    <input type="number" value="1" class="number-que">
                </div>
            <i class="fa-solid fa-trash cart-remove"></i>
            </div>`;
}


//Searching

let searchClick = document.querySelector(".search-icon");
let searchInput = document.querySelector(".search-box input");

searchClick.onclick = function  () {
  if (searchInput.value) {
    localStorage.setItem("searchValue", searchInput.value);
    setTimeout(() => {
      window.location = "search.html";
    }, 300);
  
  }

  
};
// console.log(window.location);
if (location.pathname === "/search.html") {
  let found = 0;
  let searchValue = localStorage.getItem("searchValue").toLowerCase();
  let allProductsH2 = document.querySelectorAll(".Product-box h2");
  console.log(allProductsH2);
  allProductsH2.forEach((element) => {
    let parentProduct = element.parentNode;
    if (element.textContent.toLowerCase().indexOf(searchValue) > -1) {
      parentProduct.style.display = "block";
      found = 1;
    } else {
      parentProduct.style.display = "none";
    }
  });
  if (!found) {
    document.querySelector(".Products").style.display = "none";
    let msgBox = document.querySelector(".msg");
    let notFoundMsg = document.createTextNode("No Product Found");
    let div = document.createElement("div");
    div.className = "not-found";
    div.append(notFoundMsg);
    msgBox.append(div);
  }
}

//slider

let currentSlide = 1;
let shownProducts = 4;
let products = document.querySelectorAll(".Product-box");
let range = products.length / shownProducts;
range =
  products.length % shownProducts === 0 ? parseInt(range - 1) : parseInt(range);
let slidesCon = document.querySelector(".products-slider");

if (
  location.pathname === `/products.html` ||
  location.pathname === `/new.html`
) {
  for (let i = 0; i < range + 1; i++) {
    slidesCon.innerHTML += `<span class="slide-btn">${i + 1}</span>`;
    document.querySelector(".slide-btn").classList.add("active");
    if (i === range) {
      slidesCon.innerHTML += `<span class="slide-right"><i class="fa-sharp fa-solid fa-right"></i></span>`;
    }
  }

  let sliderSpans = document.querySelectorAll(".products-slider .slide-btn");
  let rightSlide = document.querySelector(".slide-right");

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("slide-btn")) {
      sliderSpans.forEach((span, index) => {
        if (span === e.target && index !== sliderSpans.length - 1) {
          rightSlide.classList.remove("stop-clicking");
        } else if (span === e.target && index === sliderSpans.length - 1) {
          rightSlide.classList.add("stop-clicking");
        }
        span.classList.remove("active");
        if (span === e.target) {
          currentSlide = index + 1;
          changingProducts();
        }
      });
      e.target.classList.add("active");
    }
  });

  if (sliderSpans.length === 1) {
    rightSlide.classList.add("stop-clicking");
  }
  rightSlide.onclick = function () {
    let curr = -1;
    this.classList.add("clicked");
    setTimeout(() => {
      this.classList.remove("clicked");
    }, 400);
    sliderSpans.forEach((span, index) => {
      if (curr === sliderSpans.length - 1) {
        rightSlide.classList.add("stop-clicking");
      } else rightSlide.classList.remove("stop-clicking");

      if (span.classList.contains("active")) {
        span.classList.remove("active");
        curr = index + 1;
      }
      if (curr === index) {
        span.classList.add("active");
      }
    });
    currentSlide++;
    changingProducts();
  };

  changingProducts();

  function changingProducts() {
    let products = document.querySelectorAll(".Product-box");
    for (let i = currentSlide; i <= sliderSpans.length; i++) {
      if (i === currentSlide) {
        products.forEach((product, index) => {
          if (
            index + 1 <= i * shownProducts &&
            index + 1 > (i - 1) * shownProducts
          ) {
            product.style.display = "initial";
            setTimeout(() => {
              product.classList.add("show");
              product.classList.remove("hide");
            }, 100);
          } else {
            product.style.display = "none";
            product.classList.add("hide");
            product.classList.remove("show");
          }
        });
      }
    }
    window.scrollTo({
      top: 100,
    });
  }
}

// Scrolling Up

let scrollingUp = document.querySelector(".scrolling-up");
window.onscroll = function () {
  if (window.scrollY >= 800) scrollingUp.classList.add("show");
  else scrollingUp.classList.remove("show");
};
scrollingUp.onclick = function () {
  window.scrollTo(0, 0);
};



