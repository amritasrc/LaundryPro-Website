
emailjs.init({
    publicKey: "itx9JUGEKzunqJI45",
});

const cart = [];

const cartItems = document.getElementById("cartItems");
const totalAmount = document.getElementById("totalAmount");
const emptyRow = document.getElementById("emptyRow");

const bookingForm = document.getElementById("bookingForm");
const successMessage = document.getElementById("successMessage");

const addButtons = document.querySelectorAll(".add-btn");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".service-card");

        const name = card.dataset.name;
        const price = Number(card.dataset.price);

        const alreadyExists = cart.find(item => item.name === name);

  
        if (alreadyExists) {

            removeItem(name);

            return;
        }


        cart.push({
            name,
            price
        });

        button.classList.remove("add-btn");
        button.classList.add("remove-btn");

        button.innerHTML = `
            <i class="fa-solid fa-minus"></i>
            Remove Item
        `;

        renderCart();

    });

});


function removeItem(name) {

    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        cart.splice(index, 1);
    }



    document.querySelectorAll(".service-card").forEach(card => {

        if (card.dataset.name === name) {

            const btn = card.querySelector("button");

            btn.classList.remove("remove-btn");
            btn.classList.add("add-btn");

            btn.innerHTML = `
                <i class="fa-solid fa-plus"></i>
                Add Item
            `;
        }

    });

    renderCart();

}


function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <tr id="emptyRow">

                <td colspan="4" class="empty">
                    No items added.
                </td>

            </tr>

        `;

        totalAmount.textContent = 0;

        return;

    }

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        cartItems.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${item.name}</td>

                <td>₹${item.price}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="removeItem('${item.name}')">
                    </button>

                </td>

            </tr>

        `;

    });

    totalAmount.textContent = total;

}

function resetBooking() {

    cart.length = 0;

    renderCart();

    bookingForm.reset();

    document.querySelectorAll(".service-card button").forEach(btn => {

        btn.classList.remove("remove-btn");

        btn.classList.add("add-btn");

        btn.innerHTML = `
            <i class="fa-solid fa-plus"></i>
            Add Item
        `;

    });

}



bookingForm.addEventListener("submit", function (e) {

    e.preventDefault();

    if (cart.length === 0) {

        alert("Please add at least one service.");

        return;
    }

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!fullName || !email || !phone) {

        alert("Please fill all fields.");

        return;
    }

    const services = cart
        .map(item => `${item.name} - ₹${item.price}`)
        .join("\n");

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const templateParams = {

        customer_name: fullName,

        customer_email: email,

        customer_phone: phone,

        services,

        total

    };

    console.log(templateParams);
    

    emailjs.send(
        "service_t6n0y5i",
        "template_5sb54jc",
        templateParams
    )
        .then(() => {

            successMessage.innerHTML =
                "Thank you For Booking the Service.<br>We will get back to you soon!";

            successMessage.style.color = "green";

            resetBooking();

        })
        .catch((error) => {

            console.log(error);

            successMessage.textContent =
                "Something went wrong. Please try again.";

            successMessage.style.color = "red";

        });

});