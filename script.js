
    "use strict";                        
    let cart = [];
    let cartTotal = 0;
    const show_in_cart = document.querySelector(".cart");
    const addtocartbtnDom = document.querySelectorAll('[data-action="add-to-cart"]');

    addtocartbtnDom.forEach(addtocartbtnDom => {
    addtocartbtnDom.addEventListener("click", () => {
        const productDom = addtocartbtnDom.parentNode.parentNode;
        const product = {
        img: productDom.querySelector(".produs-img").getAttribute("src"),
        name: productDom.querySelector(".product-name").innerText,
        price: productDom.querySelector(".product-price").innerText,
        quantity: 1
    };
		const IsinCart = cart.filter(cartItem => cartItem.name === product.name).length > 0;
		if (IsinCart === false) {
		show_in_cart.insertAdjacentHTML("beforeend",`
    <div class="cart-sections cart-items">
        <div class="p-in-cart">
            <img src="${product.img}" style="max-width: 50px;"/>
        </div>
        <div class="p-in-cart">
            <p class="cart_item_name">${product.name}</p>
        </div>
        <div class="p-in-cart">
            <p class="cart_item_price">${product.price}</p>
        </div>
        <div class="p-in-cart">
        <button class="btn_qty" type="button" data-action="decrease-item">&minus;
    
        </div>
        <div class="p-in-cart">
        <p class="cart_item_quantity">${product.quantity}</p>
        </div>
        <div class="p-in-cart">
            <button class="btn_qty" type="button" data-action="increase-item">&plus;
        </div>
        <div class="p-in-cart">
        <button class="btn_qty" type="button" data-action="remove-item">&times;
        </div>
    </div> `);
	
    if(document.querySelector('.cart-footer') === null){
        show_in_cart.insertAdjacentHTML("afterend",  `
        <div class="cart-sections cart-footer">
            <div class="p-in-cart">
            <button class="btn_clear_cart" type="button" data-action="clear-cart">Clear Cart
            </div>
            <div class="total_sectiune">
            <p class="total_text">Total: <span class="cart_total"></span> </p>
            </div>
        </div>`); }
	
        addtocartbtnDom.innerText = "În coș";
        addtocartbtnDom.disabled = true;
        cart.push(product);
		
        const cartItemsDom = show_in_cart.querySelectorAll(".cart-items");
        cartItemsDom.forEach(cartItemDom => {

        if (cartItemDom.querySelector(".cart_item_name").innerText === product.name) {

        cartTotal += parseInt(cartItemDom.querySelector(".cart_item_quantity").innerText) 
        * parseInt(cartItemDom.querySelector(".cart_item_price").innerText);
        document.querySelector('.cart_total').innerText = cartTotal + " LEI.";
		
		document.getElementById("total").innerHTML=" ";
		if(cartTotal>=50)
			document.getElementById("comMin").innerHTML=" ";
		
        // increase item in cart
        cartItemDom.querySelector('[data-action="increase-item"]').addEventListener("click", () => {
            cart.forEach(cartItem => {
            if (cartItem.name === product.name) {
                cartItemDom.querySelector(".cart_item_quantity").innerText = ++cartItem.quantity;
                cartItemDom.querySelector(".cart_item_price").innerText = parseInt(cartItem.quantity) *
                parseInt(cartItem.price) + " LEI.";
                cartTotal += parseInt(cartItem.price)
                document.querySelector('.cart_total').innerText = cartTotal + " LEI.";
            }
			if(cartTotal>=50)
			document.getElementById("comMin").innerHTML=" ";
            });
        });
		
        // decrease item in cart
        cartItemDom.querySelector('[data-action="decrease-item"]').addEventListener("click", () => {
            cart.forEach(cartItem => {
            if (cartItem.name === product.name) {
                if (cartItem.quantity > 1) {
                cartItemDom.querySelector(".cart_item_quantity").innerText = --cartItem.quantity;
                cartItemDom.querySelector(".cart_item_price").innerText = parseInt(cartItem.quantity) *
                parseInt(cartItem.price) + " LEI.";
                cartTotal -= parseInt(cartItem.price)
                document.querySelector('.cart_total').innerText = cartTotal + " LEI.";
				}
				if(cartTotal<50)
			document.getElementById("comMin").innerHTML="Comanda minimă este de 50 de lei.";
            }
            });
        });

        //remove item from cart
        cartItemDom.querySelector('[data-action="remove-item"]').addEventListener("click", () => {
            cart.forEach(cartItem => {
            if (cartItem.name === product.name) {
                cartTotal -= parseInt(cartItemDom.querySelector(".cart_item_price").innerText);
                document.querySelector('.cart_total').innerText = cartTotal + " LEI.";
                cartItemDom.remove();
                cart = cart.filter(cartItem => cartItem.name !== product.name);
                addtocartbtnDom.innerText = "Adaugă în coș";
                addtocartbtnDom.disabled = false;
            }
            if(cart.length < 1){
                document.querySelector('.cart-footer').remove();
				document.getElementById("total").innerHTML="Coșul dvs este gol.";
			}
			if(cartTotal<50)
			document.getElementById("comMin").innerHTML="Comanda minimă este de 50 de lei.";
            });
        });
		
        //clear cart
        document.querySelector('[data-action="clear-cart"]').addEventListener("click" , () => {
            cartItemDom.remove();
            cart = [];
            cartTotal = 0;
            if(document.querySelector('.cart-footer') !== null){
            document.querySelector('.cart-footer').remove();
            }
            addtocartbtnDom.innerText = "Adaugă în coș";
            addtocartbtnDom.disabled = false;
			document.getElementById("total").innerHTML="Coșul dvs este gol.";
			document.getElementById("comMin").innerHTML="Comanda minimă este de 50 de lei.";
        });

        }
    });
    }
    });
	
    });
