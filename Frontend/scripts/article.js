// const url="https://chess-battles.onrender.com"

// var chessUser=localStorage.getItem("chessUser")

// if(chessUser==="islive"){
//   document.getElementById("playgame1").innerText="Logout"
//   document.getElementById("playgame2").innerText="Logout"
// }else{
//   document.getElementById("playgame1").innerText="Play Game"
//   document.getElementById("playgame2").innerText="Play Game"
// }

// let playgame1=document.querySelector("#playgame1")
// let playgame2=document.querySelector("#playgame2")


// let logo=document.querySelector(".logo")
// logo.addEventListener("click",(e)=>{
//   e.preventDefault();
//   if(playgame1.innerText==="Logout" || playgame2.innerText==="Logout"){
//     location.href="../chessPage.html"
//   }else{
//     location.href="../index.html"
//   }
// })

// playgame1.addEventListener("click",async(e)=>{
//     e.preventDefault();
//     if(playgame1.innerText==="Logout" || playgame2.innerText==="Logout"){
        
//         let result=await  fetch(url+"/user/logout", {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         })
//           .then(response => {
//             return response.json();
//           })
//           .catch(error => {
//             console.error('Error:', error);
//           });
    
//           if(result.message==="logged out successfully"){
//             localStorage.setItem("chessUser","isdied")
//             alert("logged out successfully");
//             location.href="../index.html"
//           }else{
//               alert("something went wrong please try one more time")
//           }
//       }else{
//         alert("PLEASE LOGIN")
//       }
//   })
  
//   playgame2.addEventListener("click",async(e)=>{
//     e.preventDefault();
//     if(playgame1.innerText==="Logout" || playgame2.innerText==="Logout"){
      
//       let result=await  fetch(url+"/user/logout", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//         .then(response => {
//           return response.json();
//         })
//         .catch(error => {
//           console.error('Error:', error);
//         });
  
//         if(result.message==="logged out successfully"){
//           localStorage.setItem("chessUser","isdied")
//           alert("logged out successfully");
//           location.href="../index.html"
//         }else{
//             alert("something went wrong please try one more time")
//         }
//       }else{
//         alert("PLEASE LOGIN")
//       }
//   })


const url="https://chess-battles.onrender.com"

var chessUser=localStorage.getItem("chessUser")

if(chessUser==="islive"){
  document.getElementById("playgame1").innerText="Logout"
  document.getElementById("playgame2").innerText="Logout"
}else{
  document.getElementById("playgame1").innerText="Play Game"
  document.getElementById("playgame2").innerText="Play Game"
}

let playgame1=document.querySelector("#playgame1")
let playgame2=document.querySelector("#playgame2")


let logo=document.querySelector(".logo")
logo.addEventListener("click",(e)=>{
  e.preventDefault();
  if(playgame1.innerText==="Logout" || playgame2.innerText==="Logout"){
    location.href="../chessPage.html"
  }else{
    location.href="../index.html"
  }
})

playgame1.addEventListener("click",(e)=>{
    e.preventDefault();
    if(playgame1.innerText==="Logout" || playgame2.innerText==="Logout"){
        localStorage.setItem("chessUser","isdied")
        alert("logout successfully");
        location.href="../index.html"
        
      }else{
        alert("PLEASE LOGIN")
      }
  })
  
  playgame2.addEventListener("click",(e)=>{
    e.preventDefault();
    if(playgame1.innerText==="Logout" || playgame2.innerText==="Logout"){
        localStorage.setItem("chessUser","isdied")
        alert("logout successfully");
        location.href="../index.html"
        
      }else{
        alert("PLEASE LOGIN")
      }
  })