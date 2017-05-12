$(document).ready(function() {

    var wlWrapper = $('.cd-wl-container');
    //product id - you don't need a counter in your real project but you can use your real product id
    var productId = 0;

    if (wlWrapper.length > 0) {
        //store jQuery objects
        var wlBody = wlWrapper.find('.body')
        var wlList = wlBody.find('ul').eq(0);
        var wlTotal = wlWrapper.find('.checkout').find('span');
        var wlCheckout = wlWrapper.find('.checkout');
        var wlTrigger = wlWrapper.children('.cd-wl-trigger');
        var wlCount = wlTrigger.children('.count')
        var addToWlBtn = $('a:contains("Add to wishlist")');
        var undo = wlWrapper.find('.undo');
        var undoTimeoutId;
        var wlAddToCartBtn;

        //add product to whishlist
        addToWlBtn.on('click', function(event) {

            var selectedProd = {};
            event.preventDefault();
            var _prod = $(this).parents('.product-image-wrapper').find('.productinfo');
            selectedProd.img = _prod.children('img').attr('src');
            selectedProd.price = _prod.children('h2').html();
            selectedProd.name = _prod.children('p').text();

            addToWl(selectedProd);
        });

        // add to cart and remove out wishlist
        wlList.on('click', '.add-item', function(event) {

            event.preventDefault();

            var selectedProd = {};
            var _prodToCart = $(this).parents('.product');
            selectedProd.img = _prodToCart.find('img').attr('src');
            selectedProd.price = _prodToCart.find('.price').html();
            selectedProd.name = _prodToCart.find('h3').text();

            addListToCart(selectedProd);
            //remove after added
            removeProduct(_prodToCart);
        });



        // add wishilist items to cart
        wlCheckout.on('click', function(event) {

            event.preventDefault();
            var selectedWl = [];


            wlList.children('li:not(.deleted)').each(function() {
                var selectedProd = {};
                selectedProd.img = $(this).find('img').attr('src');
                selectedProd.price = $(this).find('.price').text();
                selectedProd.name = $(this).find('h3').text();
                selectedProd.quantity = $(this).find('select').val();
                // collect products from wishlist
                selectedWl.push(selectedProd);
                // remove after update products add to cart
                removeProduct($(this));
            });

            // add list items in wishlist to cart
            // come from cart.js
            addListToCart(selectedWl);
        });

        // $('body').on('click', '.add-to-cart', function(e) {
        //     event.preventDefault();
        //     var _prod = $(this).parents();
        //     selectedProd.img = _prod.children('img').attr('src');
        //     selectedProd.price = _prod.children('h2').html();
        //     selectedProd.name = _prod.children('p').text();

        //     addToWl();
        // });

        //open/close cart
        wlTrigger.on('click', function(event) {
            event.preventDefault();
            toggleCart();
        });

        //close cart when clicking on the .cd-cart-container::before (bg layer)
        wlWrapper.on('click', function(event) {
            if ($(event.target).is($(this))) toggleCart(true);
        });

        //delete an item from the cart
        wlList.on('click', '.delete-item', function(event) {
            event.preventDefault();
            removeProduct($(event.target).parents('.product'));
        });

        //update item quantity
        wlList.on('change', 'select', function(event) {
            quickUpdateCart();
        });

        //reinsert item deleted from the cart
        undo.on('click', 'a', function(event) {
            clearInterval(undoTimeoutId);
            event.preventDefault();
            wlList.find('.deleted').addClass('undo-deleted').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                $(this).off('webkitAnimationEnd oanimationend msAnimationEnd animationend').removeClass('deleted undo-deleted').removeAttr('style');
                quickUpdateCart();
            });
            undo.removeClass('visible');
        });
    }

    function toggleCart(bool) {
        var cartIsOpen = (typeof bool === 'undefined') ? wlWrapper.hasClass('wl-open') : bool;

        if (cartIsOpen) {
            wlWrapper.removeClass('wl-open');
            //reset undo
            clearInterval(undoTimeoutId);
            undo.removeClass('visible');
            wlList.find('.deleted').remove();

            setTimeout(function() {
                wlBody.scrollTop(0);
                //check if cart empty to hide it
                if (Number(wlCount.find('li').eq(0).text()) == 0) wlWrapper.addClass('empty');
            }, 500);
        } else {
            wlWrapper.addClass('wl-open');
        }
    }

    function addToWl(product) {
        var cartIsEmpty = wlWrapper.hasClass('empty');
        //update cart product list
        addProduct(product);
        //update number of items
        updateWlCount(cartIsEmpty);
        //update total price
        updateWlTotal(product.price.replace('$', ''), true);

        //show cart
        wlWrapper.removeClass('empty');
    }

    function addProduct(product) {
        //this is just a product placeholder
        //you should insert an item with the selected product info
        //replace productId, productName, price and url with your real product info

        productId = productId + 1;
        var productAdded = $(
            // `<li class="product">
            // <div class="product-image"><a href="#0"><img src="img/product-preview.png" alt="placeholder"></a></div><div class="product-details"><h3><a href="#0">Product Name</a></h3><span class="price">$25.99</span><div class="actions"><a href="#0" class="delete-item">Delete</a><div class="quantity"><label for="cd-product-'+ productId +'">Qty</label><span class="select"><select id="cd-product-'+ productId +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select></span></div></div></div></li>`
            `<li class="product">
				<div class="product-image">
					<a href="#0"><img src="` + product.img + `" alt="` + product.name + `"></a>
				</div>
				<div class="product-details">
					<h3><a href="#0">` + product.name + `</a></h3>
					<span class="price">` + product.price + `</span>
					<div class="actions">
						<a href="#0" class="add-item"><i class="fa fa-shopping-cart"></i>&ensp;Add to cart</a>
                        <div class="quantity">
							<label for="cd-product-4">Qty</label>
							<span class="select">
								<select id="cd-product-4" name="quantity" disabled="disabled">
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
									<option value="7">7</option>
									<option value="8">8</option>
									<option value="9">9</option>
								</select>
							</span>
						</div>
                        <a href="#0" class="delete-item">Delete</a>
					</div>
				</div>
    		 </li>`
        );
        wlList.prepend(productAdded);
    }

    function removeProduct(product) {

        clearInterval(undoTimeoutId);
        wlList.find('.deleted').remove();

        var topPosition = product.offset().top - wlBody.children('ul').offset().top,
            productQuantity = Number(product.find('.quantity').find('select').val()),
            productTotPrice = Number(product.find('.price').text().replace('$', '')) * productQuantity;

        product.css('top', topPosition + 'px').addClass('deleted');

        //update items count + total price
        updateWlTotal(productTotPrice, false);
        updateWlCount(true, -productQuantity);
        undo.addClass('visible');

        //wait 8sec before completely remove the item
        undoTimeoutId = setTimeout(function() {
            undo.removeClass('visible');
            wlList.find('.deleted').remove();
        }, 8000);
    }

    function quickUpdateCart() {
        var quantity = 0;
        var price = 0;

        wlList.children('li:not(.deleted)').each(function() {
            var singleQuantity = Number($(this).find('select').val());
            quantity = quantity + singleQuantity;
            price = price + singleQuantity * Number($(this).find('.price').text().replace('$', ''));
        });

        wlTotal.text(price.toFixed(2));
        wlCount.find('li').eq(0).text(quantity);
        wlCount.find('li').eq(1).text(quantity + 1);
    }

    function updateWlCount(emptyCart, quantity) {
        if (typeof quantity === 'undefined') {
            var actual = Number(wlCount.find('li').eq(0).text()) + 1;
            var next = actual + 1;

            if (emptyCart) {
                wlCount.find('li').eq(0).text(actual);
                wlCount.find('li').eq(1).text(next);
            } else {
                wlCount.addClass('update-count');

                setTimeout(function() {
                    wlCount.find('li').eq(0).text(actual);
                }, 150);

                setTimeout(function() {
                    wlCount.removeClass('update-count');
                }, 200);

                setTimeout(function() {
                    wlCount.find('li').eq(1).text(next);
                }, 230);
            }
        } else {
            var actual = Number(wlCount.find('li').eq(0).text()) + quantity;
            var next = actual + 1;

            wlCount.find('li').eq(0).text(actual);
            wlCount.find('li').eq(1).text(next);
        }
    }

    function updateWlTotal(price, bool) {
        bool ? wlTotal.text((Number(wlTotal.text()) + Number(price)).toFixed(2)) : wlTotal.text((Number(wlTotal.text()) - Number(price)).toFixed(2));
        wlTotal.parents('.checkout').html(`<em>Add to Cart</em>`);
    }

});