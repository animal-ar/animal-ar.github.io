const showCard = document.getElementById("showCard");
const cardElm = document.getElementsByClassName("card-elm");
const cardShowedNow = document.getElementById("cardShowedNow");
const closeCardShowBtn = document.getElementById("closeCardShowBtn");

const kartuRusa = document.getElementById("kartuRusa");
const kartuIkanMasRyukin = document.getElementById("kartuIkanMasRyukin");
const kartuPenyu = document.getElementById("kartuPenyu");
const kartuUlarTanah = document.getElementById("kartuUlarTanah");
const kartuMegalodon = document.getElementById("kartuMegalodon");
const kartuKatakBanjo = document.getElementById("kartuKatakBanjo");
const kartuBurungKicuitBenuang = document.getElementById("kartuBurungKicuitBenuang");
const kartuGagak = document.getElementById("kartuGagak");

function cardAppear(src) {
    showCard.style.display = 'flex';
    setTimeout(function() {
        showCard.classList.add('visible');
    }, 100);
    
    cardShowedNow.src = src;
    setTimeout(function() {
        cardElm[0].classList.add('rotate');
    }, 1000);
    setTimeout(function() {
        cardElm[0].classList.add('full');
    }, 1300);
}

closeCardShowBtn.addEventListener('click', function() {
    showCard.classList.remove('visible');
    setTimeout(function() {
        showCard.style.display = 'none';
        cardElm[0].classList.remove('rotate');
        cardElm[0].classList.remove('full');
    }, 250);
});

kartuRusa.addEventListener('click', function() { cardAppear('./assets/card-design/kartu_rusa-ekor-putih.png') });
kartuIkanMasRyukin.addEventListener('click', function() { cardAppear('./assets/card-design/kartu_ikan-mas-ryukin.png') });
kartuPenyu.addEventListener('click', function() { cardAppear('./assets/card-design/kartu_penyu.png') });
kartuUlarTanah.addEventListener('click', function() { cardAppear('./assets/card-design/kartu_ular-tanah.png') });
kartuMegalodon.addEventListener('click', function() { cardAppear('./assets/card-design/kartu_megalodon.png') });
kartuKatakBanjo.addEventListener('click', function() { cardAppear('./assets/card-design/kartu_katak-banjo.png') });
kartuBurungKicuitBenuang.addEventListener('click', function() { cardAppear('./assets/card-design/kartu_burung-kicuit-benuang.png') });
kartuGagak.addEventListener('click', function() { cardAppear('./assets/card-design/kartu_gagak.png') });