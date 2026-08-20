document.addEventListener("DOMContentLoaded", () => {

    const exploreButton = document.getElementById("exploreButton");
    const exploreMenu = document.getElementById("exploreMenu");
    const closeExplore = document.getElementById("closeExplore");


    if (exploreButton && exploreMenu) {

        exploreButton.addEventListener("click", () => {

            exploreMenu.classList.remove("hidden");

        });

    }


    if (closeExplore && exploreMenu) {

        closeExplore.addEventListener("click", () => {

            exploreMenu.classList.add("hidden");

        });

    }


    // Close menu when clicking outside

    if (exploreMenu) {

        exploreMenu.addEventListener("click", (event) => {

            if (event.target === exploreMenu) {

                exploreMenu.classList.add("hidden");

            }

        });

    }

});