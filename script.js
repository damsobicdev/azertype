/**************************************************
*                       Definition                *
*                     des variables               *
**************************************************/ 
const choice = document.getElementById('choice');
choice.textContent = "Choisissez votre option et tapez la proposition qui s'affiche dans le champ en-dessous."

let listeMots = ['Chat', 'Chien', 'Voiture', 'Bicyclette', 'Ordinateur', 'Télévision', 'Table', 'Chaise', 'Livre', 'Journal', 'Montagne', 'Rivière', 'Océan', 'Forêt', 'Arbre', 'Fleur', 'Jardin', 'Maison', 'Appartement', 'Ville', 'Village', 'Pays', 'Continent', 'Planète', 'Soleil', 'Lune', 'Etoile', 'Galaxie', 'Univers', 'Atome', 'Molécule', 'Cellule', 'Organisme', 'Ecologie', 'Environnement', 'Pollution', 'Climat', 'Météo', 'Température', 'Humidité', 'Pluie', 'Neige', 'Vent', 'Tempête', 'Ouragan', 'Tornade', 'Séisme', 'Volcan', 'Lave', 'Cendre']; 
const listePhrase = ['Je suis une phrase', 'J\'ai mangé du saucisson', 'Il fait beau aujourd\'hui', 'Nous allons à la plage', 'Tu as bien travaillé', 'Elle a un joli sourire', 'Ils jouent au football', 'Nous partons en voyage', 'Vous avez de la chance', 'Il est très intelligent', 'Nous aimons les animaux', 'Ils sont en retard', 'Elle porte une robe rouge', 'Je prépare le dîner ce soir', 'Nous faisons du sport', 'Il joue de la guitare', 'Vous avez une belle maison', 'Je lis un bon livre', 'Elle adore les fleurs', 'Nous mangeons des fruits', 'Ils regardent un film', 'Je bois du café', 'Nous marchons dans le parc', 'Elle chante très bien', 'Tu as oublié tes clés', 'Ils partent en vacances', 'Je pense à toi', 'Nous apprenons le français', 'Elle écrit une lettre', 'Il conduit une voiture', 'Nous jouons aux cartes', 'Tu parles très vite', 'Ils construisent une maison', 'Je cherche mon téléphone', 'Nous visitons un musée', 'Elle danse avec grâce', 'Il cuisine des pâtes', 'Nous peignons un tableau', 'Tu travailles très dur', 'Ils chantent en chœur', 'Je prends une douche', 'Nous écrivons un poème', 'Elle nage dans la piscine', 'Il rêve de voyages', 'Nous faisons une promenade', 'Tu lis un journal', 'Ils dessinent des portraits', 'Je compte les étoiles', 'Nous jouons du piano', 'Elle observe les oiseaux'];
let score = 0;
let nmbEssais = 10;
const userWord = document.getElementById('user-answer'); 
const appWord = document.getElementById('appWord'); 
const userScore = document.getElementById('user-score');
let validNmb = 0; 
let nmbCycle = 0; 
let motApplication = '';

/**************************************************
*                       POP UP                    *
**************************************************/
//Win Container
const winContainer = document.getElementById('win-container'); 
winContainer.classList.remove("app");
winContainer.classList.add("disp");

// Fausse rep
const fausseRep = document.getElementById('fausse-rep');
fausseRep.classList.add("disp");
const dispBtn = document.getElementById("dispBtn");
dispBtn.addEventListener('click',()=>{
    fausseRep.classList.add('disp');
});

/**************************************************
*                Choix aleatoire                  *
**************************************************/
//fonction choix aléatoire mot : 
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * listeMots.length);
    return listeMots[randomIndex];
}

//fonction choix aléatoire phrase : 
function getRandomSentence() {
    const randomSentence = Math.floor(Math.random() * listePhrase.length);
    return listePhrase[randomSentence];
}

// Fonction pour récupérer le mot ou la phrase en fonction de l'option sélectionnée
function getNewWordOrPhrase() {
    const selectedOption = document.querySelector('input[name="option"]:checked').value;
    if (selectedOption === 'mot') {
        return getRandomWord();
    } else if (selectedOption === 'phrase') {
        return getRandomSentence();
    }
}

/**************************************************
*              gestion des radio                  *
**************************************************/
const radioBtn = document.querySelectorAll('input[name="option"]');

//ajout d'un addEventListen pour chaque radio :
radioBtn.forEach(radio => {
    radio.addEventListener("change", () => {
        motApplication = getNewWordOrPhrase();
        appWord.textContent = motApplication;
        console.log('appWord : ' + appWord.textContent);
    });
});

/**************************************************
*                   VERIFICATION                  *
**************************************************/

function verification() {
    const motUtilisateur = userWord.value; 
    if (motUtilisateur === motApplication) {
        score++;
        if (score === 2) {  // Ajustez cette condition selon vos besoins
            winContainer.classList.remove('disp');
            winContainer.classList.add('app');
            document.getElementById('valid-nmb').textContent = validNmb + 1;
            document.getElementById('score').textContent = score;
            const resetBtn = document.getElementById('reset-button');
            resetBtn.addEventListener('click', () => {
                location.reload(true);
            });
        }
        userScore.textContent = score;
        motApplication = getNewWordOrPhrase();  // Sélectionne un nouveau mot ou une nouvelle phrase
        appWord.textContent = motApplication;
        userWord.value = '';
    } else {
        fausseRep.classList.remove('disp');
    }
}

/**************************************************
*                     Valider                     *
**************************************************/
document.addEventListener('keydown', (event) => {
    if(event.key === "Enter"){
        verification();
        validNmb++; 
        const nmbAnswers = document.getElementById('nmb-answers');
        nmbAnswers.textContent = validNmb;
    }
})
// Validation au bouton 
const validationBtn = document.getElementById('user-ok');
validationBtn.addEventListener('click', verification);
validationBtn.addEventListener('click', () => {
    validNmb++; 
    const nmbAnswers = document.getElementById('nmb-answers');
    nmbAnswers.textContent = validNmb;
});

/**************************************************
*                 Affichage score                 *
**************************************************/ 
userScore.textContent = score;