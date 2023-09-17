


var slideIndex = 0;
var slides = document.querySelectorAll(".carousel-slide");

function showNextSlide() {
  slides[slideIndex].classList.remove("active");
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");
}

setInterval(showNextSlide, 3000);



const clogin = document.getElementById("clogin");
const csignup = document.getElementById("csignup");
let btn1 = document.querySelector(".btn1");
let btn2 = document.querySelector(".btn2");

let toggle = true;
toggleBtn();

btn1.addEventListener("click", (e) => {
  e.preventDefault();
  toggle = true;
  toggleBtn();
})

btn2.addEventListener("click", (e) => {
  e.preventDefault();
  toggle = false;
  toggleBtn();
})

function toggleBtn() {
  if (toggle) {
    btn1.classList.add("active");
    btn2.classList.remove("active");
    clogin.style.display = "flex";
    csignup.style.display = "none";
  }
  else {
    btn2.classList.add("active");
    btn1.classList.remove("active");
    clogin.style.display = "none";
    csignup.style.display = "flex";
  }
}
let lform = document.getElementById("login");

lform.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("lemail").value;
  let password = document.getElementById("lpassword").value;
  if (email && password) {
    let obj = {
      email,
      password
    }
    fetch(`https://chess-battles.onrender.com/user/login`, {
      method: "POST",
      headers: {
        "Content-type": "Application/json"
      },
      body: JSON.stringify(obj)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error)
        }
        else {
          if (data.msg === "login successfully") {
            localStorage.setItem("chessUser", "islive")
            location.href = "chessPage.html"
          }
          else {
            alert(data.msg)
          }
        }
      })
  }
  else {
    alert("empty field");
  }
})

let sform = document.getElementById("signup");

sform.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("semail").value;
  let password = document.getElementById("spassword").value;
  let name = document.getElementById("sname").value;
  if (name && email && password) {
    let obj = {
      name,
      email,
      password
    }
    fetch(`https://chess-battles.onrender.com/user/register`, {
      method: "POST",
      headers: {
        "Content-type": "Application/json"
      },
      body: JSON.stringify(obj)
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.msg === "User registered successfully") {
          localStorage.setItem("chessUser", "islive")
          alert("User registered successfully!")
          location.href = "./chessPage.html";
        } else if (result.msg === "already exist please login") {
          alert("User already exist please login");
        } else {
          alert("something went wrong please try one more time")
        }
      })
  }
  else {
    alert("empty field");
  }
})