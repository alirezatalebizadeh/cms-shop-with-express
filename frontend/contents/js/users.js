let detailModalElem = document.querySelector("#detail_modal"),
  cityUserElem = document.querySelector(".city_User"),
  salesUserElem = document.querySelector(".sales_User"),
  scoreUserElem = document.querySelector(".score_User");





  
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

//! get all users from db and show in table
window.addEventListener("load", () => {
  fetch(`http://localhost:3000/api/users/`)
    .then((res) => res.json())
    .then((users) => {
      let usersWrapper = document.querySelector(".cms_main");

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
              <button>حذف</button>
              <button onclick='showDetailModal(${JSON.stringify(
                user
              )})'>جزييات</button>
              <button>ویرایش</button>
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
  }
});

//! click modals with click
window.addEventListener("click", (event) => {
  if (event.target.id === "answer_Edit_Modal") {
    // closeEditModal();
  }
  if (event.target.id === "detail_modal") {
    closeDetailModal();
  }
  if (event.target.id === "delete_modal") {
    // closeDeleteModal();
  }
});
