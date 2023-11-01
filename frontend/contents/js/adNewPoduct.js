let priceProductElem = document.querySelector("#priceProduct"),
  nameProductElem = document.querySelector("#nameProduct"),
  countProductElem = document.querySelector("#countProduct"),
  addressProductElem = document.querySelector("#addressProduct"),
  popularityProductElem = document.querySelector("#popularityProduct"),
  saleProductElem = document.querySelector("#saleProduct"),
  colorsProductElem = document.querySelector("#colorsProduct"),
  addProductBtn = document.querySelector(".add_product_submit");

//! clear all of inputs
function clearInputs() {
  priceProductElem.value = "";
  nameProductElem.value = "";
  countProductElem.value = "";
  addressProductElem.value = "";
  popularityProductElem.value = "";
  saleProductElem.value = "";
  colorsProductElem.value = "";
}

//! validation all inputs
function validationInputs() {
  if (
    nameProductElem.value &&
    priceProductElem.value &&
    countProductElem.value &&
    addressProductElem.value &&
    popularityProductElem.value &&
    saleProductElem.value &&
    colorsProductElem.value
  ) {
    return true;
  }
  return false;
}

//! create newProduct
addProductBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validationInputs()) {

    let infoNewProduct = {
      title: nameProductElem.value,
      price: Number(priceProductElem.value),
      count: Number(countProductElem.value),
      src: addressProductElem.value,
      popularity: Number(popularityProductElem.value),
      sale: Number(saleProductElem.value),
      colors: Number(colorsProductElem.value),
    };


    
    fetch("http://localhost:3000/api/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoNewProduct),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        let mainProductElem = document.querySelector(".main");

        fetch("http://localhost:3000/api/products/")
          .then((res) => res.json())
          .then((allProducts) => {
            if (allProducts.length) {
          //     mainProductElem.insertAdjacentHTML(
          //       "beforeend",
          //       `<table class="product_table">
          //      <thead>
          //        <tr class="product_table_heading_tr">
          //          <th>عکس</th>
          //          <th>اسم</th>
          //          <th>قیمت</th>
          //          <th>موجودی</th>
          //        </tr> 
          //     </thead>
          //     <tbody class='product_content'></tbody>
          //  </table>`
          //     );

              const productsContent =
                document.querySelector(".product_content");

              allProducts.forEach((product) => {
                productsContent.insertAdjacentHTML(
                  "beforeend",
                  `
             <tr class="product_table_tr">
               <td><img src="${product.src}" class="product_table_img" alt="imp_product"></tی>
               <td>${product.title}</td>
               <td>${product.price}</td>
               <td>${product.count}</td>
               <td>
                  <button class="products_table_button">جزيیات</button>
                  <button class="products_table_button">حذف</button>
                  <button class="products_table_button">ویرایش</button>
               </td>
            </tr>`
                );
              });
            } else {
              mainProductElem.insertAdjacentHTML(
                "beforeend",
                `<div class="cms_empty_error">
              هیچ محصولی یافت نشد
           </div>`
              );
            }
          });

        clearInputs();
      });
  } else {
    alert("please insert valid data");
  }
});
