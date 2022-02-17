let apiUrl = "https://filrouge.uha4point0.fr/entrainementjs"; // Variable Url de l'API
let divTable = document.getElementById('projects');             // Variable Div qui contiendra les projets
let $dialog = document.getElementById('infoProject');           // Variable Dialog qui ouvrira/fermera la Modale
// Appel de la fonction getProjects
getProjects();


// Fonction qui récupère tous les projets qui se trouvent dans l'API
function getProjects() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl);
    xhr.responseType = "json";
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            getProject(this.response);
        }
    }
}

// Fonction qui récupère un à un les projets récupérés
function getProject(data) {
    divTable.innerHTML = "";    // vide la Div pour la reconstruire
    console.log(data["projets"])
    let projects = data["projets"]
    for (i = 0; i < projects.length; i++) {
        createProjectHTML(projects[i])
    }
}

async function getProjectById(id) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl);
    xhr.responseType = "json";
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response)
            return this.response;
        }
    }
}

// Fonction qui construit le tableau de projets dans le HTML
function createProjectHTML(data) {
    let divProject = document.createElement("div");
    divProject.className = "project";
    divProject.innerHTML =
        `<div class="titre" onclick="modale(${data.id})">${data.titre}</div>
            <div class="info">
                <div class="auteur">Auteur : ${data.auteur}</div>
                <div class="dateAjout">Ajouté le ${data.postDate}</div>
            </div>
            <div class="like">Likes :  &nbsp;
                <div>${data.likes}</div>
            </div>  
            <div class="btnLike">
                <input type="button" value="like" onclick="addLike(${data.id})">
                <input type="button" value="dislike" onclick="subLike(${data.id})">
            </div>
        </div>`;
    divTable.appendChild(divProject)
}

// Fonction qui affiche une modale avec les infos d'un projet
function modale(id) {
    console.log(id);
    let data = getProjectById(id);
    console.log(data);
    openDialog(data);
}

// Fonction Ajoute un Like
function addLike(id) {
    console.log(id);
    getProjects();
}

// Fonction Enleve un Like
function subLike(id) {
    console.log(id);
}

// Fonction openDialog
async function openDialog(data) {
        console.log("data",data)
    let dialog = document.getElementById('infoProject');
    dialog.showModal();
    dialog.innerHTML += `
        <div>${data.titre}</div>
    `;
    

}

