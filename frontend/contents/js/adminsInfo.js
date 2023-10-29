let adminNameElem = document.querySelector("#admin_name");
let adminJobElem = document.querySelector("#admin_job");
let adminProfileElem = document.querySelector("#admin_profile");

console.log(adminProfileElem);

window.addEventListener("load", () => {
  let adminToken = localStorage.getItem("admin-token");

  fetch(`http://localhost:3000/api/admins/`, {
    headers: {
      authorization: adminToken,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data[0].src);
      adminNameElem.innerHTML = `${data[0].firstName} ${data[0].lastName}`;
      adminJobElem.innerHTML = `${data[0].task}`;
      adminProfileElem.src=`${data[0].src}`
    });
});
