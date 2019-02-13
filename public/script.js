const OCCSURL = "https://ucf4-occ0158-occ.oracledemos.com";

$(".bodyText").hide();

function getProducts(url) {
  fetch(url, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .then(products => {
      var counter = 0;
      $(".spinning").hide();
      $(".bodyText").show();
      for (var p in products) {
        var div = "action" + counter;
        console.log(products[p]);
        $(".site").append(`
            <div class="container">
                <div class="productDetails">
                    <span class="title">
                        ${products[p].name}
                    </span>
                    <span class="price">
                     € ${products[p].price}
                    </span>
                    <hr> 
                </div>

                <div class="picture">
                    <img src="${OCCSURL + products[p].image}" alt="${
          products[p].name
        }">
                    <hr>
                </div>

                <div class="${div}" style="display:block; margin:0 auto;">
                </div>
            </div>
            `);

        appendQR(div, products[p].url);
        counter += 1;
      }
    })
    .catch(error => {
      //handle errors
    });
}

function appendQR(div, url) {
  var newDiv = "." + div;
  $(newDiv).qrcode({
    width: 120,
    height: 120,
    text: url
  });
}

// delegate event
$(".site").delegate("button", "click", function(e) {
  let product = $(this).attr("id");
  window.open(`${OCCSURL}/product/${product}`, "_self");
});

$(document).ready(function() {
  console.log("ready!");
  getProducts("http://localhost:3000/products");
});
