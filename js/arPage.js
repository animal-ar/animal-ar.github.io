const body = document.body;
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const restartBtn = document.getElementById("restartBtn");
const hideUIBtn = document.getElementById("hideUIBtn");

restartBtn.addEventListener("click", function() {
    window.location.reload();
});

menuBtn.addEventListener("click", function() {
    menu.classList.toggle("show");
});

const mainHeader = document.getElementById("mainHeader");
const idleState = document.getElementById("idleState");
const boxInfo =  document.getElementById("boxInfo");
const headerBox = document.getElementById("headerBox");
const paragraphBox = document.getElementById("paragraphBox");
const animalSoundBtn =  document.getElementById("animalSoundBtn");
const audioAnimalPlayer = document.getElementById("audioAnimalPlayer");
const imageCaraousel = document.getElementById("imageCaraousel");

const svgExpand = document.getElementById("svgExpand");
const svgClose = document.getElementById("svgClose");
let isFull = false;
let isUiHidden = false;

const targetRusa = document.querySelector('#target-rusa-ekor-putih');
const targetIkan = document.querySelector('#target-ikan-mas-ryukin');

function hideAllUI(state) {
    if (state === true) {
        mainHeader.style.visibility = "hidden";
        idleState.style.visibility = "hidden";
        boxInfo.style.visibility = "hidden";
        menu.classList.remove("show");
    } else {
        mainHeader.style.visibility = "visible";
        idleState.style.visibility = "visible";
        boxInfo.style.visibility = "visible";  
    }
}

function showUIHandler() {
    hideAllUI(false);
    isUiHidden = false;
    body.removeEventListener("click", showUIHandler);
}

hideUIBtn.addEventListener("click", function (e) {
    e.stopPropagation();   // ⛔ penting
    isUiHidden = true;
    hideAllUI(true);
    body.addEventListener("click", showUIHandler);
});


function showIdleState() {
    idleState.classList.add("visible");
}

function showBoxInfo(header, paragraph, isSound, sound) {
    boxInfo.classList.add("visible");
    headerBox.innerHTML = header;
    paragraphBox.innerHTML = paragraph;
    
    if (isSound === true) {
        animalSoundBtn.style.display = "flex";
        audioAnimalPlayer.src = sound;
    } else {
        animalSoundBtn.style.display = "none";
    }

    svgExpand.style.display = "block";
    svgClose.style.display = "none";
}

animalSoundBtn.addEventListener("click", function(e) {
    e.stopPropagation();   // ⛔ stop naik ke boxInfo
    audioAnimalPlayer.load();
    audioAnimalPlayer.play();
});

function hideIdleState() { idleState.classList.remove("visible"); }

function isFullState() {
    if (isFull === false) {
        setTimeout(function() { boxInfo.classList.remove("visible"); }, 2000);
        setTimeout(function() { showIdleState(); }, 2850);        
    }
}

setTimeout(function() { showIdleState(); }, 2000);

boxInfo.addEventListener("click", function() {
    isFull = !isFull;
    if (isFull === true) {
        boxInfo.classList.add("full");
        svgExpand.style.display = "none";
        svgClose.style.display = "block";
    } else {
        svgExpand.style.display = "block";
        svgClose.style.display = "none";
        boxInfo.classList.remove("full");
        boxInfo.classList.remove("visible");
        setTimeout(function() { showIdleState(); }, 850); 
    }
});

// targets of animals
targetRusa.addEventListener('targetFound', function() {
    hideIdleState();
    showBoxInfo("Rusa Ekor Putih", 
        `Rusa ekor putih (Odocoileus virginianus) adalah salah satu jenis rusa yang hidup di berbagai habitat seperti hutan, 
        padang rumput, dan semak. Ia dinamakan “ekor putih” karena bulu putih yang terlihat jelas di bawah ekornya saat ia berlari 
        menjauh dari bahaya. Ia pemakan tumbuhan (herbivora). Memiliki tubuh yang lincah sehingga bisa berlari cepat untuk menghindari 
        predator.`,
        true,
        "./assets/sound/rusa-ekor-putih.mp3"
    );
    imageCaraousel.innerHTML = `<img src="./assets/database image ar/rusa_ekor_putih.png" alt="">
    <img src="./assets/animal-images/whitetaileddeerBillingsBrettusfw1.jpg" alt="">`;
});

targetIkan.addEventListener('targetFound', function() {
    hideIdleState();
    showBoxInfo("Ikan Mas Ryukin", 
        `Ikan Mas Ryukin (Carassius auratus) adalah salah satu jenis ikan hias air tawar yang berasal dari Jepang. 
        Ia dinamakan “Ryukin” merujuk pada Kepulauan Ryukyu. Ia pemakan segala (omnivora) yang biasanya memakan pelet, 
        jentik nyamuk, hingga sayuran hijau. Memiliki ciri khas berupa punuk yang tinggi di belakang kepalanya dan sirip ekor 
        yang melebar indah, menjadikannya perenang yang anggun namun tetap kuat di dalam akuarium.`,
        false
    );
    imageCaraousel.innerHTML = `<img src="./assets/database image ar/ikan_mas_ryukin.png" alt="">
    <img src="./assets/animal-images/Ryukin.jpg" alt="">`;
});

targetRusa.addEventListener('targetLost', isFullState);