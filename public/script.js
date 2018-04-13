const OCCSURL = "https://ucf4-occ0011-occ.oracledemos.com";

function getProducts(url){

    fetch(url, {
        method: 'GET',
    })
    .then(response =>{
        return response.json();
    })
    .then(products =>{
        console.log('I am here');
        for(var p in products){
            console.log(products[p]);
            $('.row').append(`
                <div class="product col-md-3">
                    <div class="flexContainer">
                        <div class="urlImages">
                            <img src="${OCCSURL+products[p].image}" alt="${products[p].name}">
                        </div>
                        <div class="productText">
                            <span class="name">${products[p].name}</span>
                            <br>
                            <br>
                            <span class="price">${products[p].price}</span>
                        </div>
                    </div>
                    <div class="buyNow">
                        <button class="btn btn-primary btn-lg">BUY NOW</button>
                    <div>
                </div>
            `);
        }
    })
    .catch(error =>{

    })
}




$( document ).ready(function() {
    console.log( "ready!" );
    getProducts('http://localhost:3000/products');
});