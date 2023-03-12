const mobileMenu = document.querySelector('.mobile-menu');
const hamMenu = document.querySelector('.ham-menu-container');
const navbar = document.querySelector('.navbar');
const navbarHeight = navbar.clientHeight;
//clientXY
//offsetXY not a selectable object
//scrollXY
const navbarEmailText = document.querySelector('.navbar-email-text');
const itemCounter = document.querySelector('.item-counter')
const navbarShoppingCart = document.querySelector('.navbar-shopping-cart');
const desktopMenu = document.querySelector('.desktop-menu');
const mainContainer = document.querySelector('.main-container');
const cardsContainer = document.querySelector('.cards-container');
// const productCards = document.querySelectorAll('.product-card');
const orderDetail = document.querySelector('.order-detail'); //aside for products in my-order tab
const flechita = document.querySelector('.flechita');
const myOrderContent = document.querySelector('.my-order-content');
const shoppingCartItem = document.querySelector('.shopping-cart')
const totalToPay = document.querySelector('.total-to-pay');
// const productDetail = document.querySelector('.product-detail'); //aside for details on products in the main section

let productList = [];
let shoppingList = [];
let total = 0;

function updateTotal(amount, sign) {
    if (sign == "+") {
        total += parseFloat(amount);
        if (parseInt(total) != total)
            totalToPay.innerText = total.toFixed(2) + "$";
        else
            totalToPay.innerText = total + "$";
    } else if (sign == "-") {
        total -= parseFloat(amount);
        if (parseInt(total) != total)
            totalToPay.innerText = total.toFixed(2) + "$";
        else
            totalToPay.innerText = total + "$";
    }
}

function clickXtoRemoveItem(item, item_price, item_img) {
    item_img.addEventListener('click', function() {
        updateTotal(item_price, "-");
        console.log("item.id: " + item.id);
        const item_id = shoppingList.findIndex((DBitem) => DBitem.id == item.id);
        if (item_id  >= 0)
            shoppingList.splice(item_id, 1);
        itemCounter.innerText = shoppingList.length;
        myOrderContent.removeChild(item);
    })
}

function toggleMenus(menu, close1, close2, array, close3=false, NPC=false) {
    menu.classList.toggle('menu-toggle');
    orderDetail.style.top = navbar.clientHeight + "px";
    if (!close1.classList.contains('menu-toggle'))
        close1.classList.toggle('menu-toggle');
    if (!close2.classList.contains('menu-toggle'))
        close2.classList.toggle('menu-toggle');
    if (!NPC) {
        for (aside of array)
            aside.classList.add('menu-toggle');
    } else {
        if (!close3.classList.contains('menu-toggle'))
            close3.classList.toggle('menu-toggle');
        for (productDa of productDetailAll) {
            if (!productDa.classList.contains(NPC.alt))
                productDa.classList.add('menu-toggle');
        }
    }
}

function createNewItem(NPC_price, NPC_name, NPC_img, pD=false) {
    updateTotal(NPC_price, "+");
    const newProduct = document.createElement('div');
    newProduct.setAttribute("class", "shopping-cart");
    if (pD) {
        console.warn(pD);
        newProduct.setAttribute("id", NPC_img.alt + shoppingList.length);
        console.log("newProduct.id: " + newProduct.id);
        shoppingList.push({
            id: newProduct.id,
            classname: NPC_img.alt,
            fullname: NPC_img.title,
            description: NPC_img.desc,
            img: NPC_img.src,
            price: NPC_price,
        });
        //hides orderDetail so toggleMenus toggles shows it again
        orderDetail.classList.add('menu-toggle');
        toggleMenus(orderDetail, desktopMenu, mobileMenu, productDetailAll, pD);
    } else {
        newProduct.setAttribute("id", NPC_img.id);
    }
    
    console.log(itemCounter.innerText);
    console.log(shoppingList.length);
    itemCounter.innerText = shoppingList.length;
        const newProductFig = document.createElement('figure');
            const newProductFigImg = document.createElement('img');
            newProductFigImg.setAttribute('src', NPC_img.src);
            newProductFigImg.setAttribute('alt', NPC_img.alt);
        const newProductpitem = document.createElement('p');
        newProductpitem.innerText = NPC_name;
        const newProductprice = document.createElement('p');
        newProductprice.innerText = NPC_price;
        const newProductImgClose = document.createElement('img');
        newProductImgClose.setAttribute('src', "./icons/icon_close.png");
        newProductImgClose.setAttribute('alt', "close");
        clickXtoRemoveItem(newProduct, newProductprice.innerText, newProductImgClose);            

        myOrderContent.appendChild(newProduct);
        newProduct.append(newProductFig, newProductpitem, newProductprice, newProductImgClose);
        newProductFig.appendChild(newProductFigImg);

    // <div class="shopping-cart">
    //     <figure>
    //         <img src="https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=650&amp;w=940" alt="bike">
    //     </figure>
    //     <p>Bike</p>
    //     <p>120.12$</p>
    //     <img src="./icons/icon_close.png" alt="close" style="cursor: pointer;">  
    // </div>

}

function responsiveMenuWidth(menu, action) {
    if (window.innerWidth > 639) {
        if (menu.clientWidth > 0) {
            if (action == "start") {
                if (menu.classList.contains('menu-toggle')) {
                    mainContainer.style.marginRight = menu.clientWidth / 2 + "px";
                    cardsContainer.style.justifyContent = "start";
                    cardsContainer.style.gap = "8px";
                }
                else {
                    cardsContainer.style.gap = menu.clientWidth / 20 + "px";
                    mainContainer.style.marginRight = 0;
                    cardsContainer.style.justifyContent = "center";
                }
            } else if (action == "end") {
                if (menu.classList.contains('menu-toggle')) {
                    cardsContainer.style.gap = menu.clientWidth / 20 + "px";
                    mainContainer.style.marginRight = 0;
                    cardsContainer.style.justifyContent = "center";
                }
                else {
                    mainContainer.style.marginRight = menu.clientWidth / 2 + "px";
                    cardsContainer.style.justifyContent = "start";
                    cardsContainer.style.gap = "8px";
                }
            } else {
                console.warn("Invalid menu action (" + action + ")");
            }
        } else {
            //menu.clientWidth is zero
        }
    } else {
        console.warn("window.innerWidth < 640, marginRight should be zore");
        mainContainer.style.marginRight = "0px";
        cardsContainer.style.justifyContent = "center";
    }
}

productList.push({
    classname: "scooter-skate",
    fullname: "Scooter (skate)",
    description: "A skating scooter is a street vehicle with a handlebar, deck, and wheels propelled by a rider pushing off the ground with their leg.",
    img: "https://images.pexels.com/photos/3671151/pexels-photo-3671151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 99.66
})
productList.push({
    classname: "roller-skates",
    fullname: "Rollerskates",
    description: "Freeskates consist of two separate metal or wooden plates with two wheels attached. Freeskating is practiced around the world.",
    img: "https://media.istockphoto.com/id/182383572/es/foto/pat%C3%ADn-en-l%C3%ADnea.jpg?s=1024x1024&w=is&k=20&c=kKH67u3hYuxv6_Tx8dEI2zhWrq5iS7zmI-XlJF-9X0k=",
    price: 125.5
})
productList.push({
    classname: "skateboard",
    fullname: "Skateboard",
    description: "A type of sports equipment used for skateboarding. The skateboard must be concaved to perform tricks.",
    img: "https://images.pexels.com/photos/165236/pexels-photo-165236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 150
})
productList.push({
    classname: "bike",
    fullname: "Bike",
    description: "With its practical position, this bike also fulfills a decorative function, add your hall or workspace.",
    img: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    price: 240.64
}
)
productList.push({
    classname: "ghostbike",
    fullname: "Ghost Bike",
    description: "La NIRVANA Tour es la rígida definitiva para uso diario en la ciudad o en el campo. Es una bicicleta de montaña auténtica y fiable que te permite escapar y relajarte del estrés diario. Carretera, senderos forestales o singletrack: es la bicicleta perfecta para cualquier aventura.",
    img: "https://www.cyclevolta.com/resizer/wXljs3PHGDWgjElI7bFS4LkZln0=/1440x0/smart/cloudfront-us-east-1.images.arcpublishing.com/octane/WK6KDXL6JO4J7H4JYDKUXY6HAY.jpg",
    price: 321.72
})
productList.push({
    classname: "scooter-bike",
    fullname: "Scooter (bike)",
    description: "A motorcycle with an underbone or step-through frame, a seat, and a platform for the rider's feet, emphasizing comfort and fuel economy.",
    img: "https://images.pexels.com/photos/159192/vespa-roller-motor-scooter-cult-159192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 360
})
productList.push({
    classname: "motorcycle",
    fullname: "Motorcycle",
    description: "This vehicle serves a range of different purposes: long-distance travel, commuting, cruising, sport (including racing), and off-road riding.",
    img: "https://images.pexels.com/photos/2626665/pexels-photo-2626665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 540
})
productList.push({
    classname: "kart",
    fullname: "Kart",
    description: "Go-karts come in all shapes and forms, from non-motorised models to high-performance racing karts.",
    img: "https://media.istockphoto.com/id/509793078/es/foto/go-kart.jpg?s=1024x1024&w=is&k=20&c=TwJCxnayGmr3CmrCae9C76-cB6BHlPgeD3OqOxyVwf0=",
    price: 720
})
productList.push({
    classname: "quad",
    fullname: "Quad",
    description: "A vehicle that travels on low-pressure tires, as the name implies, it is designed to handle a wider variety of terrain than most other vehicles.",
    img: "https://media.istockphoto.com/id/485397116/es/foto/potente-moderna-atv.jpg?s=1024x1024&w=is&k=20&c=vh9h38qojbMXjaYpTEahA9xgOmeLU1k9rJ0t3AgFojU=",
    price: 999.99
})

shoppingList.push({
    id: productList[3].classname + shoppingList.length,
    classname: productList[3].classname,
    fullname: productList[3].fullname,
    description: productList[3].description,
    img: productList[3].img,
    price: productList[3].price
})
shoppingList.push({
    id: productList[4].classname + shoppingList.length,
    classname: productList[4].classname,
    fullname: productList[4].fullname,
    description: productList[4].description,
    img: productList[4].img,
    price: productList[4].price
})

for (product of productList) {
    console.log(product.fullname);

    //Method 1: cons: Unsafe and hackable, better suited for nooby scrubs, pros: fast to write;
    // cardsContainer.innerHTML += `
    // <div class="product-card">
    //     <img src="https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="">
    //     <div class="product-info">
    //       <div>
    //         <p>$120,00</p>
    //         <p>Bike</p>
    //       </div>
    //       <figure>
    //         <img src="./icons/bt_add_to_cart.svg" alt="">
    //       </figure>
    //     </div>
    // </div>
    // `

    //Method 2: Pros: Safe and hackproof, better suited for bookworms, cons: slow to write;
    const newProductCard = document.createElement('div');
    newProductCard.classList.add('product-card');
        const newProductCard_img = document.createElement('img');
        newProductCard_img.src = product.img;
        newProductCard_img.alt = product.classname;
        newProductCard_img.title = product.fullname;
        newProductCard_img.desc = product.description;
        newProductCard_img.setAttribute('class', 'product-img');
        newProductCard_img.addEventListener('click', function() {
            responsiveMenuWidth(productDetail, "start");
            toggleMenus(productDetail, mobileMenu, desktopMenu, productDetailAll, orderDetail, newProductCard_img);
            responsiveMenuWidth(productDetail, "end");

/* <aside class="product-detail menu-toggle">
    <div class="product-detail-close">
      <img src="./icons/icon_close.png" alt="close">
    </div>
    <img src="https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="bike">
    <div class="product-info">
      <p>$35,00</p>
      <p>Bike</p>
      <p>With its practical position, this bike also fulfills a decorative function, add your hall or workspace.</p>
      <button class="primary-button add-to-cart-button">
        <img src="./icons/bt_add_to_cart.svg" alt="add to cart">
        Add to cart
      </button>
    </div>
  </aside> */

        })
        const newProductCard_info = document.createElement('div');
        newProductCard_info.classList.add('product-info');
        const newProductCard_info_div = document.createElement('div');
            const newProductCard_info_div_price = document.createElement('p');
            newProductCard_info_div_price.innerText = product.price.toFixed(2) + "$";
            const newProductCard_info_div_pitem = document.createElement('p');
            newProductCard_info_div_pitem.innerText = product.fullname;
        const newProductCard_info_figure = document.createElement('figure');
            const newProductCard_info_figure_img = document.createElement('img');
            newProductCard_info_figure_img.src = "./icons/bt_add_to_cart.svg";
            newProductCard_info_figure_img.alt = "Add to Cart";
            console.log(newProductCard_info_figure_img.alt);
            function forwardNewItems() {
                console.log(product);
                createNewItem(newProductCard_info_div_price.innerText, newProductCard_info_div_pitem.innerText, newProductCard_img, product)
                responsiveMenuWidth(orderDetail, "end");
            }
            newProductCard_info_figure_img.addEventListener('click', forwardNewItems)
/* Con Element.append() podemos agregar varios nodos y texto mientras que con Element.appendChild() solo podemos agregar un nodo. */
    cardsContainer.appendChild(newProductCard);
        newProductCard.append(newProductCard_img, newProductCard_info);
            newProductCard_info.appendChild(newProductCard_info_div);
                newProductCard_info_div.append(newProductCard_info_div_price, newProductCard_info_div_pitem);
            newProductCard_info.appendChild(newProductCard_info_figure);
                newProductCard_info_figure.appendChild(newProductCard_info_figure_img);

    const productDetail = document.createElement('aside');
    productDetail.setAttribute('class', "product-detail menu-toggle");
    productDetail.classList.add(newProductCard_img.alt);
    productDetail.setAttribute('id', newProductCard_img.alt);
    productDetail.style.top = navbar.clientHeight + "px";
        const productDetail_DivX = document.createElement('div');
        productDetail_DivX.setAttribute('class', "product-detail-close");
        productDetail_DivX.addEventListener('click', function() {
            responsiveMenuWidth(productDetail, "start");
            if(!productDetail.classList.contains('menu-toggle'))
                productDetail.classList.add('menu-toggle');
        });
            const productDetail_DivX_ImgX = document.createElement('img');
            productDetail_DivX_ImgX.src = "./icons/icon_close.png";
            productDetail_DivX_ImgX.alt = "close";
        const productDetail_Img = document.createElement('img');
        productDetail_Img.src = newProductCard_img.src;
        productDetail_Img.alt = newProductCard_img.alt;
        const productDetail_Info = document.createElement('div');
        productDetail_Info.setAttribute('class', "product-info");
            const productDetail_Info_price = document.createElement('p');
            productDetail_Info_price.innerText = newProductCard_info_div_price.innerText;
            const productDetail_Info_pitem = document.createElement('p');
            productDetail_Info_pitem.innerText = newProductCard_info_div_pitem.innerText;
            const productDetail_Info_ptext = document.createElement('p');
            productDetail_Info_ptext.innerText = product.description;
            const productDetail_Info_Btn = document.createElement('button');
            productDetail_Info_Btn.addEventListener("click", forwardNewItems)
            productDetail_Info_Btn.innerText = "Add to cart";
            productDetail_Info_Btn.setAttribute('class', "primary-button add-to-cart-button");
                const productDetail_Info_Btn_Img = document.createElement('img');
                productDetail_Info_Btn_Img.src = "./icons/bt_add_to_cart.svg";
                productDetail_Info_Btn_Img.alt = "add to cart";

    document.body.appendChild(productDetail);
        productDetail.append(productDetail_DivX, productDetail_Img, productDetail_Info);
            productDetail_DivX.appendChild(productDetail_DivX_ImgX);
            productDetail_Info.append(productDetail_Info_price, productDetail_Info_pitem, productDetail_Info_ptext, productDetail_Info_Btn);
            productDetail_Info_Btn.appendChild(productDetail_Info_Btn_Img);
}
const productDetailAll = document.querySelectorAll('.product-detail');

for (demo of shoppingList) {
    const img = {
        id: demo.id,
        alt: demo.classname,
        title: demo.fullname,
        desc: demo.description,
        src: demo.img,
    };
    createNewItem(demo.price + "$", demo.fullname, img);
    // myOrderContent.innerHTML += `
    //     <div class="shopping-cart">
    //         <figure>
    //           <img src="https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="bike">
    //         </figure>
    //         <p>Bike</p>
    //         <p>$30,00</p>
    //         <img src="./icons/icon_close.png" alt="close">
    //       </div>
    //       `
    //createNewItem() does all this
    // const divShoppingCart = document.createElement('div');
    // divShoppingCart.classList.add('shopping-cart');
    // divShoppingCart.id = product.id;
    // const divShoppingCart_figure = document.createElement('figure');
    //     const divShoppingCart_figure_img = document.createElement('img');
    //     divShoppingCart_figure_img.src = product.img;
    //     divShoppingCart_figure_img.alt = product.classname
    // const divShoppingCart_pitem = document.createElement('p');
    // divShoppingCart_pitem.innerText = product.fullname;
    // const divShoppingCart_price = document.createElement('p');
    // divShoppingCart_price.innerText = product.price;
    // const itemPrice = parseFloat(divShoppingCart_price.innerText);
    // updateTotal(itemPrice, "+");
    // const divShoppingCart_img = document.createElement('img');
    // divShoppingCart_img.src = "./icons/icon_close.png";
    // divShoppingCart_img.alt = "close";
    // divShoppingCart_img.style.cursor = "pointer";
    // clickXtoRemoveItem(divShoppingCart, divShoppingCart_price.innerText, divShoppingCart_img);
/* Con Element.append() podemos agregar varios nodos y texto mientras que con Element.appendChild() solo podemos agregar un nodo. */
    // myOrderContent.appendChild(divShoppingCart);
    //     divShoppingCart.appendChild(divShoppingCart_figure);
    //         divShoppingCart_figure.appendChild(divShoppingCart_figure_img);
    //     divShoppingCart.append(divShoppingCart_pitem, divShoppingCart_price, divShoppingCart_img);
}

hamMenu.addEventListener('click', function() {
    toggleMenus(mobileMenu, desktopMenu, orderDetail, productDetailAll)
});

navbarEmailText.addEventListener('click', function() {
    if (window.innerWidth > 640) {
        if (orderDetail.clientWidth > 0) {
            console.log("oD cW1: " + orderDetail.clientWidth);
            if (orderDetail.classList.contains('menu-toggle'))
                mainContainer.style.marginRight = orderDetail.clientWidth  + "px";
            else
                mainContainer.style.marginRight = 0;
        }
    }
    toggleMenus(desktopMenu, mobileMenu, orderDetail, productDetailAll)
});

navbarShoppingCart.addEventListener('click', function() {
    responsiveMenuWidth(orderDetail, "start");
    toggleMenus(orderDetail, desktopMenu, mobileMenu, productDetailAll)
    responsiveMenuWidth(orderDetail, "end");
});

flechita.addEventListener('click', function() {
    responsiveMenuWidth(orderDetail, "start");
    toggleMenus(orderDetail, desktopMenu, mobileMenu, productDetailAll)
});