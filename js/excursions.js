document.addEventListener("DOMContentLoaded", function () {

    const enquiryButton =
        document.getElementById("excursionEnquiry");


    /*
    ==========================================
    CARD → FORM
    ==========================================
    */

    const excursionButtons =
        document.querySelectorAll(".excursion-select");


    excursionButtons.forEach(button => {

        button.addEventListener("click", function () {

            const service =
                this.dataset.service;

            const selectedExcursion =
                document.getElementById("selectedExcursion");

            if (selectedExcursion) {

                selectedExcursion.value = service;

            }


            const requestSection =
                document.getElementById("excursionRequest");

            if (requestSection) {

                requestSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });



    /*
    ==========================================
    EXCURSION FORM → WHATSAPP
    ==========================================
    */

    if (enquiryButton) {

        enquiryButton.addEventListener("click", function () {

            const location =
                document.getElementById("excursionLocation").value;

            const date =
                document.getElementById("excursionDate").value;

            const guests =
                document.getElementById("excursionGuests").value;

            const type =
                document.getElementById("excursionType").value;

            const selectedExcursion =
                document.getElementById("selectedExcursion").value;

            const additionalMessage =
                document.getElementById("excursionMessage").value.trim();



            /*
            ==================================
            VALIDATION
            ==================================
            */

            if (!location || !date || !guests || !type) {

                alert(
                    "Please select your destination, preferred date, number of guests and experience type."
                );

                return;

            }



            /*
            ==================================
            WHATSAPP MESSAGE
            ==================================
            */

            const message =
                `Hello ${SITE_CONFIG.businessName}! 

I would like to inquire about an excursion.

Destination: ${location}
Preferred date: ${date}
Number of guests: ${guests}
Experience type: ${type}
Preferred excursion: ${selectedExcursion || "No specific excursion"}

Additional information:
${additionalMessage || "None"}

Please share the available excursion options and details.

Thank you!`;



            /*
            ==================================
            WHATSAPP
            ==================================
            */

            const phone =
                SITE_CONFIG.whatsapp.bookings;


            const whatsappURL =
                `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;


            window.location.href = whatsappURL;

        });

    }

});





