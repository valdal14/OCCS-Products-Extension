const OCCSURL = "https://ucf4-occ0011-occ.oracledemos.com";

function getProducts(url){

    fetch(url, {
        method: 'GET',
    })
    .then(response =>{
        return response.json();
    })
    .then(products =>{
        for(var p in products){
            console.log(products[p]);
            $('.site').append(`
            <div class="container">
                <div class="productDetails">
                    <span class="title">
                        ${products[p].name}
                    </span>
                    <span class="price">
                        ${products[p].price}
                    </span>
                    <hr> 
                </div>

                <div class="picture">
                    <img src="${OCCSURL+products[p].image}" alt="${products[p].name}">
                    <hr>
                </div>

                <div class="action">
                    <button type="button" class="btn btn-primary btn-lg">BUY NOW</button>
                </div>
            </div>
            `);
        }
    })
    .catch(error =>{
        //handle errors
    })
}




$( document ).ready(function() {
    console.log( "ready!" );
    getProducts('http://localhost:3000/products');
});