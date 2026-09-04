
// =========================
// TRANSFER REQUEST FORM
// =========================

const transferModal = document.getElementById("transferModal");
const closeTransferModal = document.getElementById("closeTransferModal");

const transferForm = document.getElementById("transferForm");

const selectedTransfer = document.getElementById("selectedTransfer");

const tripType = document.getElementById("tripType");
const returnDateContainer = document.getElementById("returnDateContainer");
const returnDate = document.getElementById("returnDate");

const travelDate = document.getElementById("travelDate");


// Prevent past dates

const today = new Date().toISOString().split("T")[0];

travelDate.min = today;
returnDate.min = today;


// Return date cannot be before travel date

travelDate.addEventListener("change", () => {

    returnDate.min = travelDate.value;

});


// =========================
// OPEN MODAL
// =========================

document.querySelectorAll(".whatsapp-transfer").forEach(button => {

    button.addEventListener("click", function(event) {

        event.preventDefault();

        const route = this.dataset.route || "Transfer";

        selectedTransfer.textContent = route;

        transferModal.classList.remove("hidden");

        document.body.classList.add("overflow-hidden");

    });

});


// =========================
// CLOSE MODAL
// =========================

closeTransferModal.addEventListener("click", () => {

    transferModal.classList.add("hidden");

    document.body.classList.remove("overflow-hidden");

});


// =========================
// CLOSE WHEN CLICKING
// OUTSIDE MODAL
// =========================

transferModal.addEventListener("click", (event) => {

    if (event.target === transferModal) {

        transferModal.classList.add("hidden");

        document.body.classList.remove("overflow-hidden");

    }

});


// =========================
// RETURN DATE
// =========================

tripType.addEventListener("change", () => {

    if (tripType.value === "Return") {

        returnDateContainer.classList.remove("hidden");

        returnDate.required = true;

    } else {

        returnDateContainer.classList.add("hidden");

        returnDate.required = false;

        returnDate.value = "";

    }

});


// =========================
// SUBMIT FORM
// =========================

transferForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const pickup = document.getElementById("pickupLocation").value.trim();

    const destination = document.getElementById("destination").value.trim();

    const travelDateValue = document.getElementById("travelDate").value;

    const pickupTimeValue = document.getElementById("pickupTime").value;

const pickupTime = pickupTimeValue
    ? formatTime(pickupTimeValue)
    : "";

    const passengers = document.getElementById("passengers").value;

    const type = tripType.value;

    const returnDateValue = returnDate.value;

   const passengerName =
    document.getElementById("passengerName").value.trim();

const passengerPhone =
    document.getElementById("passengerPhone").value.trim();

const additionalInfo =
    document.getElementById("additionalInfo").value.trim();


    // =========================
    // FORMAT DATES
    // =========================

    const formattedTravelDate =
    formatDate(travelDateValue);

    const formattedReturnDate =
        returnDateValue
            ? formatDate(returnDateValue)
            : "";


    // =========================
    // CREATE WHATSAPP MESSAGE
    // =========================
let message =
`Hello CoastLink, I would like to request a transfer.

Passenger name: ${passengerName}

Phone number: ${passengerPhone}


Transfer type: ${selectedTransfer.textContent}

Pickup location: ${pickup}

Destination: ${destination}

Travel date: ${formattedTravelDate}

Pickup time: ${pickupTime}

Passengers: ${passengers}

Trip type: ${type}`;


    if (type === "Return") {

        message +=
`

Return date: ${formattedReturnDate}`;

    }


    if (additionalInfo) {

        message +=
`

Additional information:
${additionalInfo}`;

    }


    message +=
`

Please let me know the available transfer options and price.`;


    // =========================
    // WHATSAPP NUMBER
    // =========================

    const phoneNumber = SITE_CONFIG.whatsapp.bookings;


    // =========================
    // OPEN WHATSAPP
    // =========================

    const whatsappURL =
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


    window.open(whatsappURL, "_blank");

});


// =========================
// FORMAT DATE
// =========================

function formatDate(dateString) {

    if (!dateString) return "";

    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("en-GB", {

        day: "2-digit",

        month: "long",

        year: "numeric"

    });

}



function formatTime(timeString) {

    if (!timeString) return "";

    const [hours, minutes] = timeString.split(":");

    let hour = parseInt(hours);

    const period = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${hour}:${minutes} ${period}`;
}












