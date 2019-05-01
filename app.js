// VARIABLES

const cartBtn = document.querySelector('.cartBtn');
const closeCartBtn = document.querySelector('.closeCart');
const clearCartBtn = document.querySelector('.clearCart');
const cartDom = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cartOverlay');
const cartItems = document.querySelector('.cartItems');
const cartTotal = document.querySelector('.cartTotal');
const cartContent = document.querySelector('.cartContent');
const ProductsDom = document.querySelector('.productsCenter')
// cart items array
let cart = [];
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

}
// Local storage
class storage{

}

document.addEventListener('DOMContentLoaded',()=>{
    const ui = new Ui();
    const products = new Products();

    //get all products 
    products.getProducts().then(products=> ui.displayProducts(products));

})
