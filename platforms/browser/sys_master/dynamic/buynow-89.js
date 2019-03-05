function postBuynow(product){
    $.ajax({
        url: "/cart/buynow",
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: "productCodePost=" +product+"&qty=1",
        success: function (cart){
            if(cart.hasError === false){
                location.href="/checkout/multi/delivery-address/add";
            }
        }
    });
    return false;
}