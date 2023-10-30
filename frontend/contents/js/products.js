window.addEventListener("load", () => {
  let mainProduct = document.querySelector(".product_table");
  let mainProductElem = document.querySelector(".products_main");

  fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((allProducts) => {

      if (allProducts.length) {
          mainProductElem.insertAdjacentHTML(
            "beforeend",
            `<table class="product_table">
               <thead>
                 <tr class="product_table_heading_tr">
                   <th>عکس</th>
                   <th>اسم</th>
                   <th>قیمت</th>
                   <th>موجودی</th>
                 </tr> 
              </thead>
              <tbody class='product_content'></tbody>
           </table>`
          );

          const productsContent = document.querySelector(".product_content");

          allProducts.forEach((product) => {
            productsContent.insertAdjacentHTML("beforeend", `
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
            </tr>`)
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
});
