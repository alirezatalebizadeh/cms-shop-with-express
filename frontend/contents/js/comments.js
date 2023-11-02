let commentsMain = document.querySelector(".cms_main");
let detailsModal = document.querySelector("#details_modal");
let commentBody = document.querySelector(".comment_body");
let closeModal = document.querySelector("#close_modal");
let answerEditModal = document.querySelector("#answer_Edit_Modal");
let closeEditModalBtn = document.querySelector("#close_edit_modal");
let textEditModal = document.querySelector("#answer_edit_modal_text");

//! show detail modal and show comment in it
function showDetailModal(comment) {
  commentBody.innerHTML = comment.body;
  detailsModal.classList.add("active");
}

//! answer edit modal
function showEditModal(mainComment) {
  textEditModal.value = mainComment.body;
  answerEditModal.classList.add("active");

  console.log(mainComment);
}

//! hidden edit modal
function closeEditModal() {
  answerEditModal.classList.remove("active");
}

//! close detail modal
function closeDetailModal() {
  detailsModal.classList.remove("active");
}

//! get all comments from db and show in table
window.addEventListener("load", () => {
  fetch(`http://localhost:3000/api/comments/`)
    .then((res) => res.json())
    .then((comments) => {
      if (comments.length) {
        commentsMain.insertAdjacentHTML(
          "beforebegin",
          `
               <table class="cms_table">
                  <tr>
                   <th>اسم کاربر</th>
                   <th>محصول</th>
                   <th>کامنت</th>
                   <th>تاریخ</th>
                   <th>ساعت</th>
                 </tr>
              </table> 
            `
        );
        const commentsTable = document.querySelector(".cms_table");

        comments.forEach((comment) => {
          // console.log(comment);
          commentsTable.insertAdjacentHTML(
            "beforeend",
            `
                <tr>
                   <td> ${comment.userID} ${comment.userFamily}</td>
                   <td>${comment.productID}</td>
                   <td>
                   <button  onclick='showDetailModal(${JSON.stringify(
                     comment
                   )})' >دیدن متن</button>
                   </td>
                   <td>${comment.date}</td>
                   <td>${comment.hour}</td>
                   <td>
                     <button>حذف</button>
                     <button>تایید</button>
                     <button>باسخ</button>
                     <button onclick='showEditModal(${JSON.stringify(
                       comment
                     )})'> ویرایش</button>
                   </td>
                </tr>
               `
          );
        });
      } else {
        commentsMain.insertAdjacentHTML(
          "beforeend",
          `
             <div class="cms_empty_error">هیچ پیامی یافت نشد</div>
            `
        );
      }
    });
});

//! close modals with click on keyboard
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDetailModal();
    closeEditModal();
  }
});

//! click modals with click
window.addEventListener("click", (event) => {
  if (event.target.id === "answer_Edit_Modal") {
    closeEditModal();
  }
  if (event.target.id === "details_modal") {
    closeDetailModal();
  }
});

closeModal.addEventListener("click", closeDetailModal);
closeEditModalBtn.addEventListener("click", closeEditModal);
