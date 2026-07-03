

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
        <   /td>
        </tr>`

        total.textContent = 0;

        return;
    }


    let amount = 0;

    cart.forEach((item, index)=>{
        amount = amount + item.price;

        cartItems.innerHTML += `
        <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        </tr>
        `

    });

    total.textContent = amount;
    // console.log(total);
     
}










// (function () {
//     emailjs.init({
//         publicKey: "itx9JUGEKzunqJI45",
//     });
// })();

//  emailjs.send("service_t6n0y5i", "template_5sb54jc", templateParams);