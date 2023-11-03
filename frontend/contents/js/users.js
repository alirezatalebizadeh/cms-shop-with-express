window.addEventListener("load", () => {
  fetch(`http://localhost:3000/api/users/`)
    .then((res) => res.json())
    .then((users) => {
      console.log(users);
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
              <button>جزييات</button>
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
