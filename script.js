(function () {
    emailjs.init({
        publicKey: "itx9JUGEKzunqJI45",
    });
})();

const cart = [];

const addbtn = document.querySelectorAll('.add-btn')
const cartItems = document.getElementById('cartItems');
const total = document.getElementById('totalAmount');
const emptyRow = document.getElementById('emptyRow')

addbtn.forEach(btn => {

    btn.addEventListener('click', (e) => {

        const serviceCard = e.currentTarget.closest(".service-card");

        const name = serviceCard.dataset.name;
        const price = Number(serviceCard.dataset.price);

        const exist = cart.find(item => item.name === name)

        if (exist) {
            removeService(name);
            return;
        }

        else {
            cart.push({
                name,
                price,
            });
        }


        // console.log("1111111111");
        // console.log(cart);

        btn.classList.remove("add-btn");
        btn.classList.add("remove-btn");

        btn.innerHTML = "&mdash; Remove Item";

        renderCart();

    });

});

const removeService = (name) => {

    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        cart.splice(index, 1);
    }

    document.querySelectorAll('.service-card').forEach(card => {

        if (card.dataset.name === name) {

            const btn = card.querySelector("button");

            btn.classList.remove('remove-btn');
            btn.classList.add('add-btn')

            btn.innerHTML = "+ Add Item"
        }
    })

    // console.log("222222222");
    // console.log(cart);


    renderCart();
}

const renderCart = () => {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
        <tr id="emptyRow">
            <td colspan="4" class="empty">
               No items added.
        </td>
        </tr>`

        total.textContent = 0;

        return;
    }


    let amount = 0;

    cart.forEach((item, index) => {
        amount = amount + item.price;
        // console.log(amount);


        cartItems.innerHTML += `
        <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        </tr>
        `

    });

    total.textContent = amount;

}

const bookingForm = document.getElementById("bookingForm");
const newsletterForm = document.getElementById("newsletterForm")
const successMessage = document.getElementById("message");
const newsletterMessage = document.getElementById("newsletterMessage");

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
        name: fullName,
        email: email,
        phone: phone,
        services,
        total
    };

    console.log(templateParams);

    emailjs.send("service_t6n0y5i", "template_5sb54jc", templateParams)

        .then(() => {
            message.innerHTML =
                "Thank you For Booking the Service.";
            successMessage.style.color = "green";
        })

        .catch((error) => {
            console.log(error);
            message.textContent =
                "Something went wrong.";
            message.style.color = "red";
        });

    resetBooking();
});


newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const newsletterName = document.getElementById('newsletterName').value.trim();
    const newsletterEmail = document.getElementById('newsletterEmail').value.trim();

    if (!newsletterName || !newsletterEmail) {
        alert("Please fill all fields.");
        return;
    }

    const templateParams = {
        name: newsletterName,
        email: newsletterEmail,
    };

    console.log(templateParams);

    emailjs.send("service_t6n0y5i", "template_q30uofa", templateParams)

        .then(() => {
            newsletterMessage.innerHTML =
                "Thank you For Subscribing.";
            newsletterMessage.style.color = "white";
        })

        .catch((error) => {
            console.log(error);
            newsletterMessage.textContent =
                "Something went wrong.";
            newsletterMessage.style.color = "red";
        });

    resetBooking();
})

const resetBooking = () => {
    cart.length = 0;
    renderCart();
    bookingForm.reset();
    newsletterForm.reset();
    document.querySelectorAll(".service-card button").forEach(btn => {
        btn.classList.remove("remove-btn");
        btn.classList.add("add-btn");
        btn.innerHTML = `+ Add Item
`;
    });
}

