// lokendra js

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
//   e.preventDefault();
//   if(playgame1.innerText==="Logout" || playgame2.innerText==="Logout"){
      
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
//     }else{
//       alert("PLEASE LOGIN")
//     }
// })

// playgame2.addEventListener("click",async(e)=>{
//   e.preventDefault();
//   if(playgame1.innerText==="Logout" || playgame2.innerText==="Logout"){
    
//     let result=await  fetch(url+"/user/logout", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(response => {
//         return response.json();
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });

//       if(result.message==="logged out successfully"){
//         localStorage.setItem("chessUser","isdied")
//         alert("logged out successfully");
//         location.href="../index.html"
//       }else{
//           alert("something went wrong please try one more time")
//       }
//     }else{
//       alert("PLEASE LOGIN")
//     }
// })


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





  // nilesh js


document.getElementById('submitFeedback_user').addEventListener('submit', (e)=>{
    e.preventDefault();
    feedback()
  })
  
  function feedback() {
    let name = document.getElementById("name-nil").value;
    let email = document.getElementById("email-nil").value;
    let message = document.getElementById("text-message").value;
  
    let signdata = {
      name: name,
      email: email,
      message: message,
    };
    console.log(signdata)
    fetch(`deployedurl/feed/savefeedback`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(signdata)
  
    })
      .then((res) => res.json())
      .then((res) => {
        document.getElementById("name-nil").value = "";
        document.getElementById("email-nil").value = "";
        document.getElementById("text-message").value = "";
  
        alert("Thanks for reaching out! I'll be happy to help! we will connect soon your mail")
  
  
      })
      .catch((err) => {
        alert(err)
        console.log(err)
  
      });
  }




  const getData=()=>{
    fetch("deloyed link/feed/showfeedback",{
    
        headers:{
          "Authorization":cookie("accessToken")
        }

    }).then(res=>res.json())
    
        .then(feedbacks => {
      const parent = document.getElementById("parent");
      for (let feedback of feedbacks) {
        const div = document.createElement("div");
        const message = document.createElement("p");
        
        
        message.textContent = feedback.message;
        
        
        


     
        

  
        div.appendChild(message);
       
        parent.appendChild(div);
      }
    })
    .catch(err => console.log(err));
};

getData()