document.addEventListener("DOMContentLoaded", function () {

    const enquiryButtons =
        document.querySelectorAll(".whatsapp-enquiry");


    enquiryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const service =
                button.dataset.service;

            const phone =
                SITE_CONFIG.whatsapp.support;


            const message =
                `Hello ${SITE_CONFIG.businessName}!

I would like to inquire about the ${service}.

Please provide more information about availability, pricing and what's included. Thank you!`;


            const whatsappURL =
                `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;


            window.location.href = whatsappURL;

        });

    });

});