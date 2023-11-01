let deleteModal = document.querySelector("#delete_modal");
let unAcceptDeleteBtn = document.querySelector("#unAcceptDelete");
let confirmDeleteBtn = document.querySelector("#confirmDelete");
let mainProductElem = document.querySelector(".main");
let editModal = document.querySelector("#edit_Modal");
let detailModal = document.querySelector("#detail_modal");
let editModalBtn = document.querySelector("#editModalBtn");

let popularity = document.querySelector(".popularity");
let sales = document.querySelector(".sales");
let countColors = document.querySelector(".count_colors");

//! all inputs
let editPriceProductElem = document.querySelector("#EditPriceProduct"),
  editNameProductElem = document.querySelector("#editNameProduct"),
  editCountProductElem = document.querySelector("#editCountProduct"),
  editAddressProductElem = document.querySelector("#editAddressProduct"),
  editPopularityProductElem = document.querySelector("#editPopularityProduct"),
  editSaleProductElem = document.querySelector("#editSaleProduct"),
  editColorsProductElem = document.querySelector("#editColorsProduct");

let globalProductID = null;

//! show edit modal
function showDeleteModal(productID) {
  globalProductID = productID;
  deleteModal.classList.add("active");
  popularity.innerHTML = product.popularity;
  sales.innerHTML = product.sale;
  countColors.innerHTML = product.colors;
}

//! show deatils modal
function showDetailModal(infoProduct) {
  detailModal.classList.add("active");
  // console.log(infoProduct);
}
//! hidden detail modal
function hiddenDetailModal() {
  detailModal.classList.remove("active");
}

//!  show edit modal
function showEditModal(productID) {
  globalProductID = productID;
  editModal.classList.add("active");
}

//! clear edit inputs
function clearEditInputs() {
  editPriceProductElem.value = "";
  editNameProductElem.value = "";
  editCountProductElem.value = "";
  editAddressProductElem.value = "";
  editPopularityProductElem.value = "";
  editSaleProductElem.value = "";
  editColorsProductElem.value = "";
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
                  <button class="products_table_button" onclick="showDetailModal('${JSON.stringify(product)}')">جزيیات</button>
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

function updateProduct(event) {
  event.preventDefault();

  let editInfoProduct = {
    title: editNameProductElem.value,
    price: Number(editPriceProductElem.value),
    count: Number(editCountProductElem.value),
    src: editAddressProductElem.value,
    popularity: Number(editPopularityProductElem.value),
    sale: Number(editSaleProductElem.value),
    colors: Number(editColorsProductElem.value),
  };
  console.log(editInfoProduct);

  fetch(`http://localhost:3000/api/products/${globalProductID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editInfoProduct),
  })
    .then((res) => res.json())
    .then((result) => {
      clearEditInputs();
      hiddenEditModal();
      getAllProduct();
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
  if (event.target.id === "edit_Modal") {
    hiddenEditModal();
    clearEditInputs();
  }
  if (event.target.id === "detail_modal") {
    hiddenDetailModal();
  }
});

//! hidden modals's delete to click in Scape button on keyboard
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hiddenDeleteModal();
    hiddenEditModal();
    clearEditInputs();
    hiddenDetailModal();
  }
});

editModalBtn.addEventListener("click", updateProduct);
