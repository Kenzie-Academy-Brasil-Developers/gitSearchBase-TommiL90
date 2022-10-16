function getUserByForm () {

   const form = document.querySelector("form")

   form.addEventListener("submit", async e => {

     e.preventDefault()
 
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
   

    window.location.href = window.location.href.replace("home/index.html", "profile/index.html")

 })
 
}

async function getInfo (url){
   const response = await fetch(`${url}`)
   const data =  await response.json() 
   
   return data
}

getUserByForm ()



