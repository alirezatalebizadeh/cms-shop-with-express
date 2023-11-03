let commentsMain = document.querySelector(".cms_main");
let detailsModal = document.querySelector("#details_modal");
let commentBody = document.querySelector(".comment_body");
let closeModal = document.querySelector("#close_modal");
let answerEditModal = document.querySelector("#answer_Edit_Modal");
let answerEditSubmitBtn = document.querySelector("#submit_edit_modal");
let textEditModal = document.querySelector("#answer_edit_modal_text");
let deleteModalElem = document.querySelector("#delete_modal");
let deleteModalRejectBtn = document.querySelector("#delete_modal_reject_btn");
let answerEditModalMode = null;
let globalCommentID = null;

//! show detail modal and show comment in it
function showDetailModal(comment) {
  commentBody.innerHTML = comment.body;
  detailsModal.classList.add("active");
}

//!show edit modal
function showEditModal(mainComment) {
  answerEditModalMode = "edit";
  globalCommentID = mainComment.id;

  textEditModal.value = mainComment.body;
  answerEditModal.classList.add("active");
  answerEditSubmitBtn.innerHTML = "ویرایش نظر کاربر";
}

//! show delete modal
function showDeleteModal() {
  deleteModalElem.classList.add("active");
}

//! close delete modal
function closeDeleteModal() {
  deleteModalElem.classList.remove("active");
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
      console.log(comments);
      if (comments.length) {
        commentsMain.insertAdjacentHTML(
          "beforeend",
          `<table class="cms_table comments_table">
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
          commentsTable.insertAdjacentHTML(
            "beforeend",
            `<tr>
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
                     <button onclick="showDeleteModal()">حذف</button>
                     ${
                       comment.isAccept === 1
                         ? `<button>رد</button>`
                         : `<button>تایید</button>`
                     }
                     
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
    closeDeleteModal();
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
  if (event.target.id === "delete_modal") {
    closeDeleteModal();
  }
});

closeModal.addEventListener("click", closeDetailModal);

//! edit comment
answerEditSubmitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (answerEditModalMode === "edit") {
    let commentUpdateObj = {
      body: textEditModal.value,
    };

    console.log(commentBody);
    fetch(`http://localhost:3000/api/comments/${globalCommentID}`, {
      method: "PUT",
      body: JSON.stringify(commentUpdateObj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        closeEditModal();

        fetch(`http://localhost:3000/api/comments/`)
          .then((res) => res.json())
          .then((comments) => {
            let commentsTable = document.querySelector(".comments_table");

            commentsTable.innerHTML = "";
            commentsTable.insertAdjacentHTML(
              "beforeend",
              `
                <tr>
                  <th>اسم کاربر</th>
                  <th>محصول</th>
                  <th>کامنت</th>
                  <th>تاریخ</th>
                  <th>ساعت</th>
                </tr>`
            );

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
                     <button onclick="showDeleteModal()">حذف</button>
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
          });
      } else {
        alert("مشکلی پیش امد.مجددا سعی کنید");
      }
    });
  } else {
  }
});

deleteModalRejectBtn.addEventListener("click", closeDeleteModal);
