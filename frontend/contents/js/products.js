let deleteModal = document.querySelector("#delete_modal");
let unAcceptDeleteBtn = document.querySelector("#unAcceptDelete");
let confirmDeleteBtn = document.querySelector("#confirmDelete");
let mainProductElem = document.querySelector(".main");
let editModal = document.querySelector("#edit_Modal");
let globalProductID = null;

//! show edit modal
function showDeleteModal(productID) {
  globalProductID = productID;
  deleteModal.classList.add("active");
}

//!  show edit modal
function showEditModal(productID) {
  globalProductID = productID;
  editModal.classList.add("active");
}

//! hidden edit modal
function hiddenEditModal() {
  editModal.classList.remove("active");
}

//! get all products
function getAllProduct() {
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

        productsContent.innerHTML = "";
        allProducts.forEach((product) => {
          productsContent.insertAdjacentHTML(
            "beforeend",
            `<tr class="product_table_tr">
               <td><img src="${product.src}" class="product_table_img" alt="imp_product"></tی>
               <td>${product.title}</td>
               <td>${product.price}</td>
               <td>${product.count}</td>
               <td>
                  <button class="products_table_button">جزيیات</button>
                  <button class="products_table_button" onclick="showDeleteModal(${product.id})">حذف</button>
                  <button class="products_table_button" onclick='showEditModal(${product.id})'>ویرایش</button>
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
}

//!hidden modal's delete
function hiddenDeleteModal() {
  deleteModal.classList.remove("active");
}

//! delete product
confirmDeleteBtn.addEventListener("click", () => {
  fetch(`http://localhost:3000/api/products/${globalProductID}`, {
    method: "DELETE",
  }).then((res) => {
    console.log(res);
    hiddenDeleteModal();
    getAllProduct();
  });
});

window.addEventListener("load", getAllProduct);
unAcceptDeleteBtn.addEventListener("click", hiddenDeleteModal);

//!hidden modal's delete to click mouse
window.addEventListener("click", (event) => {
  if (event.target.id === "delete_modal") {
    hiddenDeleteModal();
  }
});

//! hidden modals's delete to click in Scape button on keyboard
window.addEventListener("keydown", (event) => {
  console.log(event);
  if (event.key === "Escape") {
    hiddenDeleteModal();
  }
});
