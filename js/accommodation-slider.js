document.addEventListener("DOMContentLoaded", function () {

    const slides =
        document.querySelectorAll(".accommodation-slide");

    const dots =
        document.querySelectorAll(".slider-dot");

    let currentSlide = 0;


    function showSlide(index) {

        slides.forEach(function (slide, i) {

            if (i === index) {

                slide.classList.remove("opacity-0");
                slide.classList.add("opacity-100");

            } else {

                slide.classList.remove("opacity-100");
                slide.classList.add("opacity-0");

            }

        });


        dots.forEach(function (dot, i) {

            if (i === index) {

                dot.classList.remove("bg-white/50");
                dot.classList.add("bg-white");

            } else {

                dot.classList.remove("bg-white");
                dot.classList.add("bg-white/50");

            }

        });

    }


    function nextSlide() {

        currentSlide =
            (currentSlide + 1) % slides.length;

        showSlide(currentSlide);

    }


    setInterval(nextSlide, 5000);


    dots.forEach(function (dot) {

        dot.addEventListener("click", function () {

            currentSlide =
                Number(dot.dataset.slide);

            showSlide(currentSlide);

        });

    });

});