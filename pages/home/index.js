
function getUserByForm () {

   const form = document.querySelector("form")

try{
   form.addEventListener("submit", async e => {

      e.preventDefault()

      const formSubmit = [...e.target]
      let value = formSubmit[0].value

      const response = await fetch (`https://api.github.com/users/${value}`)
     
      if (response.status === 404){
        return alert ("usuario não encontrado")
      }else{

         const button = document.getElementById("button-get-API")
         button.innerHTML = ""
   
         const img = document.createElement("img")
         img.src   = "/assets/spinner.svg"
         img.alt   = "spiner"
         img.classList.add("loading")
   
         button.appendChild(img)

         localStorage.setItem("user", value)
    
    
          const newArr =  []
          newArr.push(value)
    
    
          if (localStorage.getItem("users")){
    
             const parseJson = JSON.parse(localStorage.getItem("users")) || []
             const arr = [...parseJson, value]
    
             localStorage.setItem("users", JSON.stringify(arr))
          }else{
    
             localStorage.setItem("users", JSON.stringify(newArr))
          }
       
          window.location.assign("./pages/profile/index.html")
      //   window.location.href = window.location.href.replace("home/index.html", "profile/index.html")
      } 
  })
}catch{
   alert ("alguma coisa esta errada")
} 
}

 getUserByForm ()

function inputDisabled (){

   const input = document.querySelector("input")
   const button = document.querySelector("#button-get-API")

   input.addEventListener("input", e => {

      e.preventDefault()
     
      button.disabled = false
      button.style.opacity = "100%"
   })
}

inputDisabled ()

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

         <li class="flex flex-col relative">
                <a href="${user.url}"><img class="img-perfil-sugery" src="${user.avatar_url}" alt="${user.name}" /></a>
                <small>Acessar este perfil</small>
              </li>
         `)
         
         )
  })
}

function renderRecentProfile(data){
   const user = data.login
   localStorage.setItem("user", user)
   window.location.assign("./pages/profile/index.html")
}

 recentProfiles()

