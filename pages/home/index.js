
// function searchIntoApi() {

//    const button = document.getElementById("button-get-API")
//    console.log(button)
//    button.addEventListener("click", (e) => {

//       e.preventDefault()
//       button.innerHTML = ""

//       const img = document.createElement("img")
//       img.src   = "/assets/spinner.svg"
//       img.alt   = "spiner"
//       img.classList.add("loading")

//       button.appendChild(img)

//       // getUserByForm (button)
//    })
// }





function getUserByForm () {

   const form = document.querySelector("form")

try{
   form.addEventListener("submit", async e => {

      e.preventDefault()

      const button = document.getElementById("button-get-API")
      button.innerHTML = ""

      const img = document.createElement("img")
      img.src   = "/assets/spinner.svg"
      img.alt   = "spiner"
      img.classList.add("loading")

      button.appendChild(img)
  
      const formSubmit = [...e.target]
      let value = formSubmit[0].value
   
    localStorage.setItem("user", value)
 
 
       const newArr =  []
       newArr.push(value)
 
 
       if (localStorage.getItem("users").length){
 
          const parseJson = JSON.parse(localStorage.getItem("users"))
          const arr = [...parseJson, value]
 
          localStorage.setItem("users", JSON.stringify(arr))
       }else{
 
          localStorage.setItem("users", JSON.stringify(newArr))
       }
    
 
     window.location.href = window.location.href.replace("index.html", "index2.html")
 
  })
}catch{
   alert ("usuario não encontrado")
}
 
}


 getUserByForm ()

function recentProfiles() {

   const ul                   = document.getElementById("recentProfiles")
   const recentProfiles       = JSON.parse(localStorage.getItem("users"))
   const arrRecentProfiles    = [...recentProfiles].slice(-3) 

   console.log(arrRecentProfiles)
   ul.innerHTML = ""

  arrRecentProfiles.forEach(async user => {

      const url = `https://api.github.com/users/${user}`

      fetch(url)
      .then(e => e.json())
      .then(user =>
         
         

         ul.insertAdjacentHTML("afterend", `

         <li class="flex flex-col">
                <a href="${user.url}"><img class="img-perfil-sugery" src="${user.avatar_url}" alt="${user.name}" /></a>
                <small>Acessar este perfil</small>
              </li>
         `)
         )
  })
   

}


 recentProfiles()

