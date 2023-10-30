let priceProductElem = document.querySelector("#priceProduct"),
  nameProductElem = document.querySelector("#nameProduct"),
  countProductElem = document.querySelector("#countProduct"),
  addressProductElem = document.querySelector("#addressProduct"),
  popularityProductElem = document.querySelector("#popularityProduct"),
  saleProductElem = document.querySelector("#saleProduct"),
  colorsProductElem = document.querySelector("#colorsProduct"),
  addProductBtn = document.querySelector(".add_product_submit");

addProductBtn.addEventListener("click", (e) => {
  e.preventDefault();


  let infoNewProduct = {
    title: nameProductElem.value,
    price: Number(priceProductElem.value),
    count: Number(countProductElem.value),
    src: addressProductElem.value,
    popularity: Number(popularityProductElem.value),
    sale: Number(saleProductElem.value),
    colors: Number(colorsProductElem.value),
  };
  console.log(infoNewProduct);

  fetch("http://localhost:3000/api/products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infoNewProduct),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
});
