let detailModalElem = document.querySelector("#detail_modal"),
  cityUserElem = document.querySelector(".city_User"),
  salesUserElem = document.querySelector(".sales_User"),
  scoreUserElem = document.querySelector(".score_User"),
  deleteModalElem = document.querySelector("#delete_modal"),
  confirmDeleteModalBtn = document.querySelector("#confirm_delete_modal_btn"),
  rejectDeleteModalBtn = document.querySelector("#reject_delete_modal_btn"),
  usersWrapper = document.querySelector(".cms_main"),
  editModalElem = document.querySelector("#edit_modal");

let globalUserID = null;

//! show detail modal
function showDetailModal(userInfo) {
  cityUserElem.innerHTML = `${userInfo.city}`;
  salesUserElem.innerHTML = `${userInfo.buy}`;
  scoreUserElem.innerHTML = `${userInfo.score}`;
  detailModalElem.classList.add("active");
}

//! close detail's modal
function closeDetailModal() {
  detailModalElem.classList.remove("active");
}

//! close delete modal
function closeDeleteMOdal() {
  deleteModalElem.classList.remove("active");
}

//! show delete modal
function showDeleteModal(userID) {
  globalUserID = userID;
  console.log(globalUserID);
  deleteModalElem.classList.add("active");
}

//! edit user
function showEditModal(userInfo) {
  console.log(userInfo);
  editModalElem.classList.add("active");
}

//! close edit modal
function closeEditModal() {
  editModalElem.classList.remove("active");
}
//! get all users from db and show in table
window.addEventListener("load", () => {
  fetch(`http://localhost:3000/api/users/`)
    .then((res) => res.json())
    .then((users) => {
      if (users.length) {
        usersWrapper.insertAdjacentHTML(
          "beforeend",
          `
         <table class="cms_table users_table">
           <tr>
              <th>نام و نام خانوادگی</th>
              <th>نام کاربری</th>
              <th>رمز عبور</th>
              <th>شماره تماس</th>
              <th>ایمیل</th>
           </tr>
         </table>`
        );

        let usersTableElem = document.querySelector(".users_table");

        users.forEach((user) => {
          usersTableElem.insertAdjacentHTML(
            "beforeend",
            `
            <tr>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.userName}</td>
            <td>${user.password}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>
              <button onclick='showDeleteModal(${user.id})'>حذف</button>
              <button onclick='showDetailModal(${JSON.stringify(
                user
              )})'>جزييات</button>
              <button onclick='showEditModal(${JSON.stringify(
                user
              )})'>ویرایش</button>
            </td>
          </tr>
            `
          );
        });
      } else {
        usersWrapper.insertAdjacentHTML(
          "beforeend",
          ` <div class="cms_empty_error">هیچ کاربری یافت نشد</div>`
        );
      }
    });
});

//! close modals with click on keyboard
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDetailModal();
    closeDeleteMOdal();
    closeEditModal();
  }
});


//! click modals with click
window.addEventListener("click", (event) => {
  if (event.target.id === "detail_modal") {
    closeDetailModal();
  }
  if (event.target.id === "delete_modal") {
    closeDeleteMOdal();
  }
  if (event.target.id === "edit_modal") {
    closeEditModal();
  }
});

rejectDeleteModalBtn.addEventListener("click", closeDeleteMOdal);

confirmDeleteModalBtn.addEventListener("click", () => {
  console.log("click");
  //TODO debugging code to delete user
  fetch(`http://localhost:3000/api/users/${globalUserID}`, {
    method: "DELETE",
  })
    .then((res) => {
      console.log(res);
      closeDeleteMOdal();

      fetch(`http://localhost:3000/api/users/`)
        .then((res) => res.json())
        .then((users) => {
          let usersTable = document.querySelector(".users_table");

          usersTable.innerHTML = "";
          usersTable.insertAdjacentHTML(
            "beforeend",
            `<tr>
                 <th>نام و نام خانوادگی</th>
                 <th>نام کاربری</th>
                 <th>رمز عبور</th>
                 <th>شماره تماس</th>
                 <th>ایمیل</th>
               </tr>`
          );

          users.forEach((user) => {
            usersTable.insertAdjacentHTML(
              "beforeend",
              `
            <tr>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.userName}</td>
            <td>${user.password}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>
              <button onclick='showDeleteModal(${user.id})'>حذف</button>
              <button onclick='showDetailModal(${JSON.stringify(
                user
              )})'>جزييات</button>
              <button>ویرایش</button>
            </td>
          </tr>
            `
            );
          });
        });
    })
    .catch((err) => {
      alert("مشکلی پیش امد. بعدا تلاش کنید");
      console.log(err);
    });
});
