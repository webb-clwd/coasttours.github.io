// =========================
// TRANSFER IMAGE SLIDER
// =========================

const transferSlides =
    document.querySelectorAll(".transfer-slide");

const transferDots =
    document.querySelectorAll(".transfer-slider-dot");

let currentTransferSlide = 0;


// =========================
// SHOW SLIDE
// =========================

function showTransferSlide(index) {

    transferSlides.forEach((slide, i) => {

        slide.classList.toggle(
            "opacity-100",
            i === index
        );

        slide.classList.toggle(
            "opacity-0",
            i !== index
        );

    });


    transferDots.forEach((dot, i) => {

        dot.classList.toggle(
            "bg-white",
            i === index
        );

        dot.classList.toggle(
            "bg-white/50",
            i !== index
        );

    });

    currentTransferSlide = index;

}


// =========================
// DOT BUTTONS
// =========================

transferDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showTransferSlide(index);

    });

});


// =========================
// AUTOMATIC SLIDE
// =========================

setInterval(() => {

    currentTransferSlide++;

    if (currentTransferSlide >= transferSlides.length) {

        currentTransferSlide = 0;

    }

    showTransferSlide(currentTransferSlide);

}, 5000);