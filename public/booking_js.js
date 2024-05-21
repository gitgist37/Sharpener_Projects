let catchlist = document.getElementById('outputDiv');
document.getElementById('b1').addEventListener('click', postData);
window.addEventListener('DOMContentLoaded', showUser);
catchlist.addEventListener('click', modifyData);
// catchlist.addEventListener('click', modifyData);

let obj_state = 
{
   id:null,
   state:false  
};


function showAddedUser(chunk)
{
    let li = document.createElement('li');
    li.innerHTML = `${chunk.name}  ${chunk.email}  ${chunk.contact} <button id="delete" class="delete">Delete</button><button value="chutiya" id="update" class="update">Update</button>`;
    li.id = chunk.id;
    catchlist.appendChild(li);
    //document.getElementById('delete').addEventListener('click', deleteData);
    
 }

function showUser()
{
     axios.get('http://localhost:4000/get_customer')
     .then((result) => 
     {
          for (let values of result.data) 
          {
               showAddedUser(values);
               
          }
         
     })
     .catch(err=>console.log(err));
}



function postData(e)
{
    e.preventDefault();
   let name = document.getElementById('UserName').value;
   let email = document.getElementById('UserEmail').value;
   let contact = document.getElementById('UserContact').value;
   let user_obj = {
        name: name,
        email: email,
        contact: contact
   };

   if(obj_state.state === true) {
     axios.put(`http://localhost:4000/${obj_state.id}`,{
          id: obj_state.id,
          name: user_obj.name,
          email: user_obj.email,
          contact: user_obj.contact
     })
     .then(res => {
          console.log("res :",res);
          let targetLi = document.getElementById(obj_state.id);
          targetLi.innerHTML = `${res.data.updated_user[0].name} ${res.data.updated_user[0].email} ${res.data.updated_user[0].contact} <button id="delete" class="delete">Delete</button><button value="chutiya" id="update" class="update">Update</button>`;
          obj_state.id = null;
          obj_state.state = false;
     })
     .catch(err => {
          console.log("Error : ", err);
          obj_state.id = null;
          obj_state.state = false;
     })

     
   }

   else {
     axios.post('http://localhost:4000/', user_obj)
     .then(resp=>
          {
          showAddedUser(resp.data);
          })
     .catch(err=>console.log(err));

     document.getElementById('UserName').value="";
     document.getElementById('UserEmail').value="";
     document.getElementById('UserContact').value="";
   }
  
}

function modifyData(e)
{
     e.preventDefault();
     console.log(e);
     if(e.target.classList.contains('delete')) 
     {
          let elem2delete = e.target.parentElement;
          catchlist.removeChild(elem2delete);
          axios.delete(`http://localhost:4000/${elem2delete.id}`)
              .then((result) => {
                  showUser();
                  // list.removeChild(listElement)
                  //this block wasn't hitting
              })
              .catch(err=>console.log(err));
      }
      else if(e.target.classList.contains('update')) 
     {
          let elem2delete = e.target.parentElement;
          axios.get(`http://localhost:4000/getsinglecustomer?id=${elem2delete.id}`)
          .then((result) => 
          {
               console.log(result);
               document.getElementById('UserName').value = result.data.user[0].name;
               document.getElementById('UserEmail').value = result.data.user[0].email;
               document.getElementById('UserContact').value = result.data.user[0].contact;

               obj_state.id = result.data.user[0].id;
               obj_state.state = true;
          })
          .catch((err) => {
               console.log(err);
          })
     }
}


// function modifyData(e)
// {
//      e.preventDefault();
//      // if(e.target.classList.contains('update'))
//      // {
          
//      // }
//      console.log(e.target.value);

// }