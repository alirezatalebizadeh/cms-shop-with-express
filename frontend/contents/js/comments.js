let commentsMain = document.querySelector('.cms_main')

window.addEventListener("load", () => {
  fetch(`http://localhost:3000/api/comments/`)
    .then((res) => res.json())
    .then((comments) => {
        if(comments.length){
            commentsMain.insertAdjacentHTML('beforebegin',`
               <table class="cms_table">
                  <tr>
                   <th>اسم کاربر</th>
                   <th>محصول</th>
                   <th>کامنت</th>
                   <th>تاریخ</th>
                   <th>ساعت</th>
                 </tr>
              </table> 
            `)
            const commentsTable=document.querySelector('.cms_table')

            comments.forEach(comment => {
                // console.log(comment);
                commentsTable.insertAdjacentHTML('beforeend',`
                <tr>
                   <td> ${comment.userID} ${comment.userFamily}</td>
                   <td>${comment.productID}</td>
                   <td>
                   <button>دیدن متن</button>
                   </td>
                   <td>${comment.date}</td>
                   <td>${comment.hour}</td>
                   <td>
                     <button>حذف</button>
                     <button>تایید</button>
                     <button>باسخ</button>
                     <button>ویرایش</button>
                   </td>
                </tr>
               `)
            });
           

        }else{
            commentsMain.insertAdjacentHTML('beforeend',`
             <div class="cms_empty_error">هیچ پیامی یافت نشد</div>
            `)
        }

    });
});
