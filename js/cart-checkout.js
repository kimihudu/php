$(document).ready(function() {

    var cartWrapper = $('.cart_info');
    //product id - you don't need a counter in your real project but you can use your real product id
    var productId = 0;

    if (cartWrapper.length > 0) {
        //store jQuery objects
        var cartBody = cartWrapper.find('table')
        var cartList = cartBody.find('tbody').eq(0);
        var cartTotal = $('.total-result').find('.items-sub-total').children().eq(1);
        var finalTotal = $('.total-result').find('.items-final-total').children().eq(1).eq(0);
        var tax = $('.total-result').find('.tax').children().eq(1);
        var shippingFee = $('.total-result').find('.shipping-cost').children().eq(1);
        // var cartTrigger = cartWrapper.children('.cd-cart-trigger');
        // var cartCount = cartTrigger.children('.count')
        // var addToCartBtn = $('.add-to-cart');
        var undo = cartWrapper.find('thead').find('.undo');
        var undoTimeoutId;
        var _storage = sessionStorage.getItem('products');

        if (_storage != null) {
            var prodList = JSON.parse(_storage).products;
            addListToCheckOut(prodList);
            sessionStorage.clear();
        }
        // addToCartBtn.on('click', function(e) {

        //     var selectedProd = {};
        //     event.preventDefault();
        //     var _prod = $(this).parents();
        //     selectedProd.img = _prod.children('img').attr('src');
        //     selectedProd.price = _prod.children('h2').html();
        //     selectedProd.name = _prod.children('p').text();

        //     addToCart(selectedProd);
        // });

        //open/close cart
        // cartTrigger.on('click', function(event) {
        //     event.preventDefault();
        //     toggleCart();
        // });

        // //close cart when clicking on the .cd-cart-container::before (bg layer)
        // cartWrapper.on('click', function(event) {
        //     if ($(event.target).is($(this))) toggleCart(true);
        // });

        //delete an item from the cart
        cartList.on('click', '.cart_delete', function(event) {
            event.preventDefault();
            removeProduct($(event.target).parents('.product'));
            quickUpdateCart();
        });

        //update item quantity via input val
        cartList.on('change', '.cart_quantity_input', function(event) {
            quickUpdateItem($(event.target).parents('.product'));
            quickUpdateCart();
        });


        //update item quantity via left/right btn
        cartList.on('click', '.cart_quantity_up,.cart_quantity_down', function(event) {
            var _parentSelected = $(event.target).parents('.product');
            var _currentCtrl = $(this).text();
            var _num = Number(_parentSelected.find('.cart_quantity_input').val());
            _num += eval(_currentCtrl + 1);
            if (_num == 0)
                return
            _parentSelected.find('.cart_quantity_input').val(_num);
            quickUpdateItem(_parentSelected);
            quickUpdateCart();
        });

        //reinsert item deleted from the cart
        undo.on('click', 'a', function(event) {
            clearInterval(undoTimeoutId);
            event.preventDefault();
            cartList.find('.deleted').addClass('undo-deleted').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                $(this).off('webkitAnimationEnd oanimationend msAnimationEnd animationend').removeClass('deleted undo-deleted').removeAttr('style');
                quickUpdateCart();
            });
            undo.removeClass('visible');
        });
    }

    function addListToCheckOut(products) {

        if (products.length > 0) {
            for (var i = 0; i < products.length; i++) {
                addToCart(products[i]);
            }
        } else
            addToCart(products);
    }

    // add single item to cart
    function addToCart(product) {
        addProduct(product);
        quickUpdateCart();
    }

    function addProduct(product) {

        productId = productId + 1;
        var productAdded = $(
            `<tr class="product">
            				<td class="cart_product">
            					<a href=""><img src="` + product.img + `" alt="` + product.name + `"></a>
            				</td>
            				<td class="cart_description">
            					<h4><a href="">` + product.name + `</a></h4>
            					<p>Web ID: ` + product.id + `</p>
            				</td>
            				<td class="cart_price">
            					<p>` + product.price + `</p>
            				</td>
            				<td class="cart_quantity">
            					<div class="cart_quantity_button">
            						<a class="cart_quantity_up"> <i class="fa fa-plus"></i></a>
            						<input class="cart_quantity_input" type="text" name="quantity" value="` + product.quantity + `" autocomplete="off" size="2">
            						<a class="cart_quantity_down"><i class="fa fa-minus"></i></a>
            					</div>
            				</td>
            				<td class="cart_total">
            					<p class="cart_total_price">` + "$" + Number(product.price.replace("$", "")) * product.quantity + `</p>
            				</td>
            				<td class="cart_delete">
            					<a class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a>
            				</td>
            			</tr>`
        );
        cartList.prepend(productAdded);
    }

    function removeProduct(product) {
        clearInterval(undoTimeoutId);
        cartList.find('.deleted').remove();

        var topPosition = product.offset().top - cartBody.children('tbody').offset().top,
            productQuantity = Number(product.find('.quantity').find('select').val()),
            productTotPrice = Number(product.find('.price').text().replace('$', '')) * productQuantity;

        product.css('top', topPosition + 'px').addClass('deleted');
        cartList.find('.deleted').remove();

        //update items count + total price
        // updateCartTotal(productTotPrice, false);
        // updateCartCount(true, -productQuantity);
        // undo.addClass('visible');


        //wait 8sec before completely remove the item
        // undoTimeoutId = setTimeout(function() {
        //     undo.removeClass('visible');
        //     cartList.find('.deleted').remove();
        // }, 8000);
    }

    function quickUpdateItem(product) {
        var quantity = 0;
        var price = 0;
        var singleQuantity = Number(product.find('.cart_quantity_input').val());
        quantity = quantity + singleQuantity;
        price = price + singleQuantity * Number(product.find('.cart_price').text().replace('$', ''));
        product.find('.cart_total_price').text("$" + price.toFixed(2));
    }

    function quickUpdateCart() {
        var price = 0;
        cartList.children('tr:not(.deleted)').each(function() {
            var totalPriceItems = Number($(this).find('.cart_total_price').text().replace('$', ''));
            price = price + totalPriceItems;
        });
        cartTotal.text('$' + price);
        console.log(cartTotal.text());
        var final = Number(cartTotal.text().replace('$', '')) * (1 + Number(tax.text().replace('%', '')) / 100) + Number(shippingFee.text().replace('$', ''));
        finalTotal.text('$' + final.toFixed(2));
    }
});