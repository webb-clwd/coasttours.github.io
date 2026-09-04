document.addEventListener("DOMContentLoaded", function () {

    const enquiryButton =
        document.getElementById("accommodationEnquiry");

    const helpButton =
        document.getElementById("accommodationHelp");

    const checkIn =
        document.getElementById("checkIn");

    const checkOut =
        document.getElementById("checkOut");


    // =========================
    // DATE RESTRICTIONS
    // =========================

    // Get today's date
    const today = new Date();

    const todayString =
        today.toISOString().split("T")[0];


    // Check-in cannot be before today
    if (checkIn) {
        checkIn.min = todayString;
    }


    // Check-out cannot be before today
    if (checkOut) {
        checkOut.min = todayString;
    }


    // =========================
    // CHECK-IN CHANGES
    // =========================

    if (checkIn && checkOut) {

        checkIn.addEventListener("change", function () {

            if (!checkIn.value) {

                checkOut.min = todayString;

                return;

            }


            // Convert check-in date
            const selectedDate =
                new Date(checkIn.value + "T00:00:00");


            // Add ONE day
            selectedDate.setDate(
                selectedDate.getDate() + 1
            );


            // Create YYYY-MM-DD format
            const year =
                selectedDate.getFullYear();

            const month =
                String(
                    selectedDate.getMonth() + 1
                ).padStart(2, "0");

            const day =
                String(
                    selectedDate.getDate()
                ).padStart(2, "0");


            const minimumCheckOut =
                `${year}-${month}-${day}`;


            // Check-out must be AFTER check-in
            checkOut.min = minimumCheckOut;


            // If existing check-out is now invalid,
            // clear it
            if (
                checkOut.value &&
                checkOut.value < minimumCheckOut
            ) {

                checkOut.value = "";

            }

        });

    }


    // =========================
    // ACCOMMODATION ENQUIRY
    // =========================

    if (enquiryButton) {

        enquiryButton.addEventListener("click", function () {

            const location =
                document.getElementById("accommodationLocation").value;

            const checkInValue =
                document.getElementById("checkIn").value;

            const checkOutValue =
                document.getElementById("checkOut").value;

            const guests =
                document.getElementById("guests").value;

            const accommodationType =
                document.getElementById("accommodationType").value;

            const budget =
                document.getElementById("budget").value;


            // =========================
            // CHECK REQUIRED FIELDS
            // =========================

            if (
                !location ||
                !checkInValue ||
                !checkOutValue ||
                !guests
            ) {

                alert(
                    "Please select your destination, dates and number of guests."
                );

                return;

            }


            // =========================
            // EXTRA DATE VALIDATION
            // =========================

            if (checkOutValue <= checkInValue) {

                alert(
                    "Check-out date must be after the check-in date."
                );

                return;

            }


            // =========================
            // FORMAT DATES
            // =========================

            const formattedCheckIn =
                formatDate(checkInValue);

            const formattedCheckOut =
                formatDate(checkOutValue);


            // =========================
            // WHATSAPP MESSAGE
            // =========================

            const message =
`Hello ${SITE_CONFIG.businessName}!

I would like to inquire about available accommodation.

Destination: ${location}

Check-in: ${formattedCheckIn}

Check-out: ${formattedCheckOut}

Guests: ${guests}

Preferred accommodation: ${accommodationType || "Any type"}

Budget per night: ${budget || "No specific budget"}

Please share the available accommodation options and prices. Thank you!`;


            // =========================
            // WHATSAPP NUMBER
            // =========================

            const phone =
                SITE_CONFIG.whatsapp.bookings;


            // =========================
            // OPEN WHATSAPP
            // =========================

            const whatsappURL =
                `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;


            window.location.href = whatsappURL;

        });

    }


    // =========================
    // HELP BUTTON
    // =========================

    if (helpButton) {

        helpButton.addEventListener("click", function (event) {

            event.preventDefault();


            const message =
`Hello ${SITE_CONFIG.businessName}!

I need help finding accommodation along the Kenyan coast.

Please help me find a suitable place to stay. Thank you!`;


            const phone =
                SITE_CONFIG.whatsapp.bookings;


            const whatsappURL =
                `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;


            window.location.href = whatsappURL;

        });

    }


    // =========================
    // FORMAT DATE
    // =========================

    function formatDate(dateString) {

        if (!dateString) return "";


        const date =
            new Date(dateString + "T00:00:00");


        return date.toLocaleDateString("en-GB", {

            day: "2-digit",

            month: "long",

            year: "numeric"

        });

    }

});