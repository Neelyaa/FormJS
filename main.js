// Autre méthode

// const name = document.getElementById('name')
// const username = document.getElementById('username')
// const password = document.getElementById('password')
// const form = document.getElementById('form')

// const errorElement = document.getElementById('error')

// form.addEventListener('submit', (e) => {
//   let messages = []
//   if (name.value === '' || name.value == null) {
//     messages.push('Name is required')
//   }

//   if (password.value.length <= 6) {
//     messages.push('Password must be longer than 6 characters')
//   }

//   if (password.value.length >= 20) {
//     messages.push('Password must be less than 20 characters')
//   }

//   if (password.value === 'password') {
//     messages.push('Password cannot be password')
//   }

//   if (messages.length > 0) {
//     e.preventDefault()
//     errorElement.innerText = messages.join(', ')
//   }
// })



// Creation constante

const usernameEl = document.forms.sign.username;
const nameEl = document.forms.sign.name;
const pseudoEl = document.forms.sign.pseudo;
const emailEl = document.forms.sign.email;
const passwordEl = document.forms.sign.password;
const passwordCEl = document.forms.sign.passwordC;
const dateEl = document.forms.sign.date;
const form = document.querySelector("#game");


const checkUsername = () => {
    let valid = false;

    const min = 3,
        max = 15;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, "Le prénom ne peut pas être vide");
    } else if (!isBetween(username.length, min, max)) {
        showError(
            usernameEl,
            `Le prénom doit avoir entre ${min} et ${max} caractères.`
        );
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};

const checkName = () => {
    let valid = false;

    const min = 3,
        max = 15;

    const name = nameEl.value.trim();

    if (!isRequired(name)) {
        showError(nameEl, "Le nom ne peut pas être vide");
    } else if (!isBetween(name.length, min, max)) {
        showError(
            nameEl, `Le nom doit avoir entre ${min} et ${max} caractères.`);
    } else {
        showSuccess(nameEl);
        valid = true;
    }
    return valid;
};

const checkPseudo = () => {
    let valid = false;
    const pseudo = pseudoEl.value.toLowerCase().trim();
    if (!isRequired(pseudo)) {
        showError(pseudoEl, "Le nom d'utilisateur ne peut etre vide");
    } else if (isPseudoValid(pseudo)) {
        showError(pseudoEl, `Le nom d'utilisateur ne peut être root, deus.`
        );
    } else {
        showSuccess(pseudoEl);
        valid = true;
    }
    return valid;
};

const isPseudoValid = (pseudo) => {
    const re = /root|deus/;
    return re.test(pseudo);
};


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, "l'email ne peut etre vide");
    } else if (isPseudoValid(email)) {
        showError(emailEl, `L'email' ne peut être root, deus.`
        );
    } else if (!isEmailValid(email)) {
        showError(emailEl, "Email non valide");
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

// RegEx

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
};

const checkPassword = () => {

    const min = 8,
        max = 15;

    let valid = false;
    const password = passwordEl.value.trim();
    if (!isRequired(password)) {
        showError(passwordEl, "Le mot de passe ne peut etre vide");
    } else if (!isBetween(password.length, min, max)) {
        showError(
            passwordEl,
            `Le mot de passe doit avoir entre ${min} et ${max} caractères.`
        );
    } else if (!isPasswordValid(password)) {
        showError(
            passwordEl,
            `Le mot de passe doit avoir au moins 1 majuscule, 1 caractère spécial et 1 chiffre`
        );
    } else {
        showSuccess(passwordEl);
        valid = true;
    }
    return valid;
};

const isPasswordValid = (password) => {
    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    return re.test(password);
};


// Mot de passe Identique

const checkPasswordC = () => {

    let valid = false;
    const passwordC = passwordCEl.value.trim();
    const password = passwordEl.value.trim();
    if (!isRequired(passwordC)) {
        showError(passwordCEl, "Le mot de passe ne peut etre vide");
    } else if (passwordC !== password) {
        showError(passwordCEl,
            `Le mot de passe doit être identique.`);
    } else {
        showSuccess(passwordCEl);
        valid = true;
    }
    return valid;
};

// Date // 

const checkDate = () => {

let valid = false;
const date = dateEl.value.split('-');

let dateBirdYear = date[0]
let dateBirdMonth = date[1]
let dateBirdDay = date[2]
   

let newDate = new Date()
let nowyear = newDate.getFullYear()
let nowmonth= newDate.getMonth()+1;
let nowday = newDate.getDate()



let difYear = nowyear-dateBirdYear
let difMonth = nowmonth - dateBirdMonth
let difDay = nowday-dateBirdDay


if (dateEl.value === "") {
    showError(dateEl, "La date ne peut etre vide");
} else if (difYear>21) {
    showSuccess(dateEl);
 }   else if ( difYear == 21 && ((difMonth >0) || (difMonth==0 && difDay>=0)) ){
            showSuccess(dateEl);
} else {
    showError(dateEl,
        `Vous devez avoir 21 ans.`);
valid = true;
}
return valid;
};


// Erreur

const isRequired = (value) => (value === "" ? false : true);

const isBetween = (length, min, max) =>
    length < min || length > max ? false : true;

const showError = (input, message) => {

    const formField = input.parentElement;

    formField.classList.remove("success");
    formField.classList.add("error");


    const error = formField.querySelector("small");
    error.textContent = message;
};

const showSuccess = (input) => {

    const formField = input.parentElement;


    formField.classList.remove("error");
    formField.classList.add("success");


    const error = formField.querySelector("small");
    error.textContent = "";
};


// Valider Form

form.addEventListener("submit", function (e) {

    e.preventDefault();


    let isUsernameValid = checkUsername(),
        isNameValid = checkName(),
        isPseudoValid = checkPseudo(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isPasswordCValid = checkPasswordC(),
        isDateValid = checkDate();
       

    let isFormValid =
        isUsernameValid &&
        isNameValid &&
        isPseudoValid &&
        isEmailValid &&
        isPasswordValid &&
        isPasswordCValid &&
        isDateValid;
 


    if (isFormValid) {
        console.log('Go Geek!! ;)');
        alert('Lets gooo !!!');
    }
});



/*Animation Sprite*/

var width = 1920,
    height = 70
ratio = window.devicePixelRatio;

var x = width / 2,
    r = 40,
    step = 0;


var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d");
var sprites = new Image();
sprites.onload = animate;
sprites.src = "/img/shell.png";


canvas.width = width * ratio;
canvas.height = height * ratio;
canvas.style.width = width + "px";
canvas.style.height = height + "px";
context.scale(ratio, ratio);
context.imageSmoothingEnabled = false;
context.fillStyle = "rgba(255, 255, 255, 0.25)";


function animate() {
    draw();
    update();
    requestAnimationFrame(animate);
}


function draw() {
    context.clearRect(0, 0, width, height);
    drawShell(x, height, r, Math.floor(step));
}

function drawShell(x, y, r, step) {
    var s = r / 12;
    context.drawImage(sprites, 32 * step, 0, 32, 32, x - 16 * s, y - 26 * s, 32 * s, 32 * s);
}

function update() {
    step += 0.3;
    if (step >= 12)
        step -= 12;
}



