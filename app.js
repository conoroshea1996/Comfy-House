// VARIABLES

const cartBtn = document.querySelector('.cartBtn');
const closeCartBtn = document.querySelector('.closeCart');
const clearCartBtn = document.querySelector('.clearCart');
const cartDom = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cartOverlay');
let cartItems = document.querySelector('.cartItems');
let cartTotal = document.querySelector('.cartTotal');
const cartContent = document.querySelector('.cartContent');
const ProductsDom = document.querySelector('.productsCenter')
// cart items array
let cart = [];
// buttons 
let buttonsDOM = [];
//getting the products
class Products{
    async getProducts(){
        try {
            let result = await fetch('./products.json')
            let data = await result.json();
            let products = data.items;
            products = products.map(item =>{
                const {title,price} = item.fields;
                const {id} = item.sys;
                const image = item.fields.image.fields.file.url;
                return {title,price,id,image}
            })
            return products
        } catch (error) {
            console.log(error);   
        }
    }
}
// display product
class Ui{
    displayProducts(products){
        let result = '';
        products.forEach(product => {
            result += 
            ` <article class="product">
            <div class="imgContainer">
                <img src="${product.image}" alt="product" class="productImg">
                <button class="bagBtn" data-id=${product.id}>
                    <i class="fas fa-shopping-cart"></i>
                    add to cart
                </button>
            </div>
            <h3>${product.title}</h3>
            <h5>£${product.price}</h5>
        </article>`
        })
        ProductsDom.innerHTML = result;
    }

    getBagButtons(){
        const bagBtns = [...document.querySelectorAll('.bagBtn')];
        buttonsDOM = bagBtns;
        bagBtns.forEach(button=> {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if(inCart){
                button.innerText = 'In Cart';
                button.disabled = true;
            }
                button.addEventListener('click',(event)=>{
                    event.target.innerText = 'In Cart';
                    event.target.disabled = true;
                    // get product from products 
                    let cartItem = {...storage.getProduct(id),amount:1};
                    console.log(cartItem);
                    //add product to cart
                    cart = [...cart,cartItem]                    
                    //save cart local storage
                    storage.saveCart(cart);
                    //set cart values
                    this.SetCartValues(cart);

                    // display cart values
                    // show the cart
                });
            });
    }
    SetCartValues(cart){
        let tempTotal = 0;
        let ItemsTotal = 0;
        cart.map(item =>{
            tempTotal += item.price * item.amount;
            ItemsTotal += item.amount;
        });
        cartTotal .innerHTML= parseFloat(tempTotal.toFixed(2));
        cartItems = ItemsTotal;
        console.log(cartItems);
        console.log(cartTotal);
    }
}
// Local storage
class storage{
    static saveProducts(products){
        localStorage.setItem('products',JSON.stringify(products));
    }
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id)
    }
    static saveCart(cart){
        localStorage.setItem('cart',JSON.stringify(cart))
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    const ui = new Ui();
    const products = new Products();

    //get all products 
    products.getProducts().then(products=>{ ui.displayProducts(products)

    storage.saveProducts(products);
    }).then(()=> {
        ui.getBagButtons()
    });
});
