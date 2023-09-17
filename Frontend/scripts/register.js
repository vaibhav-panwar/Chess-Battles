// const url="https://chess-battles.onrender.com"
// let playgame_btn1=document.querySelector("#playgame1")
// let playgame_btn2=document.querySelector("#playgame2")
// let form=document.querySelector("#form")

// playgame_btn1.addEventListener("click",(e)=>{
//   e.preventDefault();
//   alert("Please Register Your Account")
// })

// playgame_btn2.addEventListener("click",(e)=>{
//   e.preventDefault();
//   alert("Please Register Your Account")
// })


// form.addEventListener("submit",async(e)=>{
//     e.preventDefault()
  
//     const data = {
//       name:form.name.value,
//       email: form.email.value,
//       password: form.password.value
//     };
  
    
//     let result=await  fetch(url+"/user/register", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//       })
//         .then(response => {
//           return response.json();
//         })
//         .catch(error => {
//           console.error('Error:', error);
//         });
  
//         if(result.msg==="User registered successfully"){
//             localStorage.setItem("chessUser","islive")
//             alert("User registered successfully! pleaes login")
//             location.href="../chessPage.html";
//         }else if(result.msg==="already exist please login"){
//           alert("User already exist please login");
//           location.href="../index.html"
//         }else{
//             alert("something went wrong please try one more time")
//         }
//   })



const url="https://chess-battles.onrender.com"
let playgame_btn1=document.querySelector("#playgame1")
let playgame_btn2=document.querySelector("#playgame2")
let form=document.querySelector("#form")

playgame_btn1.addEventListener("click",(e)=>{
  e.preventDefault();
  alert("Please Register Your Account")
})

playgame_btn2.addEventListener("click",(e)=>{
  e.preventDefault();
  alert("Please Register Your Account")
})


form.addEventListener("submit",async(e)=>{
    e.preventDefault()
  
    const data = {
      name:form.name.value,
      email: form.email.value,
      password: form.password.value
    };
  
    
    let result=await  fetch(url+"/user/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          return response.json();
        })
        .catch(error => {
          console.error('Error:', error);
        });
  
        if(result.msg==="User registered successfully"){
            localStorage.setItem("chessUser","islive")
            alert("User registered successfully! pleaes login")
            location.href="../chessPage.html";
        }else if(result.msg==="already exist please login"){
          alert("User already exist please login");
          location.href="../index.html"
        }else{
            alert("something went wrong please try one more time")
        }
  })