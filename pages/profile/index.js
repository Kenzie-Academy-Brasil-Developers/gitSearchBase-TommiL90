/* Desenvolva sua lógica aqui...*/


async function teste (){

    const urlBase = `https://api.github.com/users/samuelleao`
    const urlRepos = `https://api.github.com/users/samuelleao/repos`
    
    const profile = await getInfo(urlBase)
    const repos = await getInfo(urlRepos)
  
    renderProfile(profile)
    renderRepos(repos)
    }
    
teste ()

async function getInfo (url){
    const response = await fetch(`${url}`)
    const data =  await response.json() 
    
    return data
 }



async function userInfo (dado) {
     await fetch(`https://api.github.com/users/${dado}`)
     .then((res) => res.json())
     .then((res) => renderProfile(res))
}

async function userRepos (repos){
    await fetch(`https://api.github.com/users/${repos}/repos`)
    .then((res) => res.json())
    .then((res) => renderRepos(res))

}

function renderProfile(info){
  
    const profile = document.getElementById("profile")

    profile.innerHTML = ""

    const image     = info.avatar_url
    const name      = info.name
    const bio       = info.bio
    const email     = info.email

    profile.insertAdjacentHTML("afterbegin", `
    
    <div class ="flex items-center gap">
        <div><img src="${image }" alt="${name}"></div>
        <div class="">
            <h1>${name}</h1>
            <p>${bio}</p>
        </div>
    </div>
    <div class="flex gap">
        <a href="mailito:${email}"><button class="button-default-2">Email</button></a>
        <button class="button-default-2">Trocar de usuario</button>
    </div>
    `)
}


function renderRepos(info){
    
    const ul = document.getElementById("repos")
    
    ul.insertAdjacentHTML = ""

    info.forEach(element => {
        console.log(ul)
            const name          = element.name
            const description   = element.description
            const url           = element.url    
            const htmlUrl       = element.html_url
           
           
        const li        = document.createElement("li")
        const h2        = document.createElement("h2")
        const p         = document.createElement("p")
        const div       = document.createElement("div")
        const a1        = document.createElement("a")
        const button1   = document.createElement("button")
        const a2        = document.createElement("a")
        const button2   = document.createElement("button")

        h2.innerText                = name
        p.innerText                 = description
        button1.innerText           = "Repositório"
        button2.innerText           = "Demo"

        a1.href         = url
        a2.href         = htmlUrl

        a1.target       = "_blank"
        a2.target       = "_blank"

        li.classList        = "card"
        div.classList       = "flex gap"
        button1.classList   = "button-default-3"
        button2.classList   = "button-default-3"


        a1.appendChild(button1)
        a2.appendChild(button2)
        div.append(a1, a2)
        li.append(h2, p, div)

        return ul.appendChild(li)
    });
}

userInfo (localStorage.getItem("user"))
userRepos (localStorage.getItem("user"))



