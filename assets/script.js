
const apiWorks = [
    {
        title: "Abajour Tahina",
        categoryId: "1",
        imageUrl: "./assets/images/abajour-tahina.png"
    },
    {
        title: "Appartement parisien",
        categoryId: "2",
        imageUrl: "./assets/images/appartement-paris-v.png"
    },
    {
        title: "Bar Lullaby Paris",
        categoryId: "3",
        imageUrl: "./assets/images/bar-lullaby-paris.png"
    },
    {
        title: "Le coteau à Cassis",
        categoryId: "1",
        imageUrl: "./assets/images/le-coteau-cassis.png"
    },
    {
        title: "Villa Ferneze",
        categoryId: "2",
        imageUrl: "./assets/images/villa-ferneze.png"
    },
    {
        title: "Structures thermopolis",
        categoryId: "1",
        imageUrl: "./assets/images/structures-thermopolis.png"
    },
    {
        title: "La balisiere",
        categoryId: "3",
        imageUrl: "./assets/images/la-balisiere.png"
    },
    {
        title: "Hotel New Delhi",
        categoryId: "1",
        imageUrl: "./assets/images/hotel-first-arte-new-delhi.png"
    },
    {
        title: "Hotel Paris",
        categoryId: "3",
        imageUrl: "./assets/images/Hotel-paris.png"
    }

]
const apiCategory = "http://localhost:5678/api/categories";

let projets = apiWorks;
let category = 0;
let categoryData = [];
let categData;
let categDataName;




// on récupère les données de l'API Works
// const getworks = () => {
//     fetch(apiWorks)
//         .then(reponse => {
//             if (!reponse.ok) {
//                 throw new Error(`Erreur HTTP! statut: ${reponse.status}`);
//             }
//             return reponse.json();
//         })
//         .then(data => {
//             projets = data;
//             createButtons();
//             mesProjets();
//             setModal()
//         })
//         .catch(error => {
//             console.error("Une erreur s'est produite lors de la récupération des données", error);
//         });
// }
// getworks()
// on récupère les données de l'API Categories

fetch(apiCategory)
    .then(reponse => {
        if (!reponse.ok) {
            throw new Error(`Erreur HTTP! statut: ${reponse.status}`);
        }
        return reponse.json();
    })
    .then(data => {
        categData = data
    })
    .catch(error => {
        console.error("Une erreur s'est produite lors de la récupération des données", error);
    });

// on génère les projets
const gallery = document.querySelector(".gallery");

function mesProjets() {
    gallery.innerHTML = "";
    for (let i = 0; i < projets.length; i++) {
        if (category === projets[i].categoryId || category === 0) {
            const article = projets[i];
            const projet = document.createElement("figure");
            const imageProjet = document.createElement("img");
            imageProjet.src = article.imageUrl;
            imageProjet.alt = article.title;
            const textProjet = document.createElement("figcaption");
            textProjet.innerText = article.title;

            // On rattache les balises à la section gallery
            gallery.appendChild(projet);
            projet.appendChild(imageProjet);
            projet.appendChild(textProjet);
        }
    }
}
mesProjets();

// on génère les boutons
const divFiltres = document.querySelector(".filtres");

const categoryNames = {
    "1": "Objets",
    "2": "Appartement",
    "3": "Hôtel/Restaurant"
};

function createButtons() {
    divFiltres.innerHTML = "";
    const uniqueCategoryIds = [...new Set(apiWorks.map(work => work.categoryId))];

    // Bouton pour "Tous"
    // Votre code existant pour créer le bouton "Tous" est bon.

    uniqueCategoryIds.forEach(categoryId => {
        const boutonFiltres = document.createElement('button');
        boutonFiltres.classList.add("filtres-boutton");
        boutonFiltres.innerText = categoryNames[categoryId];

        boutonFiltres.addEventListener("click", () => {
            category = categoryId;
            mesProjets();
            const boutonsFiltres = document.querySelectorAll(".filtres-boutton");
            boutonsFiltres.forEach(bouton => bouton.classList.remove("filtres-boutton_selected"));
            boutonFiltres.classList.add("filtres-boutton_selected");
        });

        divFiltres.appendChild(boutonFiltres);
    });
}

const orderCatg = projets.sort((a, b) => a.categoryId - b.categoryId)

for (let i = 0; i < orderCatg.length; i++) {
    const categoryId = orderCatg[i].categoryId;
    if (!uniqueCategoryIds.includes(categoryId)) {
        uniqueCategoryIds.push(categoryId);
    }
}


for (let index = 0; index < uniqueCategoryIds.length; index++) {
    const categoryId = uniqueCategoryIds[index];
    const categoryData = projets.find(p => p.categoryId === categoryId);
    const boutonFiltres = document.createElement('button');
    boutonFiltres.classList.add("filtres-boutton");

    boutonFiltres.innerText = categoryData.category.name; // Utilisez le nom de la catégorie

    boutonFiltres.addEventListener("click", () => {
        category = categoryId
        mesProjets()
        const boutonsFiltres = document.querySelectorAll(".filtres-boutton");
        boutonsFiltres.forEach(bouton => bouton.classList.remove("filtres-boutton_selected"));
        // Mettez à jour la classe du bouton actuel
        boutonFiltres.classList.add("filtres-boutton_selected");

    });

    divFiltres.appendChild(boutonFiltres);
}

// Suite à la création des boutons, ont leur applique leur animation 



// relie le DOM

const introduction = document.getElementById("introduction");
const portFolio = document.getElementById("portfolio");
// on créée des boutons édition fictif 

const btnEditIntro = document.createElement("button")
introduction.appendChild(btnEditIntro)
btnEditIntro.classList.add("boutonEditionMenu")
btnEditIntro.innerText = "Modifier"


//mode édition
// afficher mode édition 
// on génère le popup
let popupBackground = document.querySelector(".popupBackground");
let cross = document.querySelector(".cross");
const popup = document.querySelector(".popup");
let arrowLeft = document.querySelector(".arrowLeft")
function afficherPopup() {
    popupBackground.classList.add("active");
    arrowLeft.classList.add("disabled")


}
function cacherPopup() {
    popupBackground.classList.remove("active");
}
function initAddEventListenerPopup() {
    // On écoute le click sur le bouton "Editer"
    btnEdit = document.querySelector(".boutonEdition");
    btnEdit.addEventListener("click", () => {
        afficherPopup();
        setModal();
    });
    popupBackground.addEventListener("click", (event) => {
        if (event.target === popupBackground) {
            cacherPopup()
        }
    })
    cross.addEventListener("click", () => {
        cacherPopup();
    });
    arrowLeft.addEventListener("click", () => {
        setModal()
        arrowLeft.classList.add("disabled")
        line.classList.add("underline")
    })

}
initAddEventListenerPopup();
