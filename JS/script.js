

const search_product = () => {
    const input_field = document.getElementById('input-field');
    const input_value = input_field.value;
    if (input_value.length > 0 && input_value !== ' ' && input_value.includes('  ') === false) {
        input_field.value = '';
        parent = document.getElementById('parent').innerHTML = '';
        const url = `https://openapi.programming-hero.com/api/phones?search=${input_value}`;

        fetch(url)
            .then(res => res.json())
            .then(data => getPhone(data.data))
    }
    else {
        document.getElementById('parent').innerHTML = 
        `
            <h2 class="text-center w-100 text-danger">Please Search By Product Name</h2>
        `
    }
    
}//Ending search Product Function

const getPhone = data => {
    const parent = document.getElementById('parent');
    if (data.length !== 0) {
        data.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML =
                `
            <div class="card h-100 shadow">
                <img class="p-5" src="${item.image}" class="card-img-top" alt="${item.phone_name}">
                <div class="card-body text-center">
                    <h5 class="card-title">${item.phone_name}</h5>
                    <p class="card-text">${item.brand}</p>

                    <button onclick="product_details('${item.slug}')" id="details_button"  class="display-flex justify-content-center bg-primary text-white px-5 py-2 rounded border-0 ">More Details</button>
                </div>
            </div>
        `;
            parent.appendChild(div);
        }); //ending forEach
    }
    else {
        document.getElementById('parent').innerHTML =
            `
            <h1 class="text-center w-100 text-danger">No Result Found</h1>
        `
    }
    
}//Ending GetPhone function

// product_details Function start
const product_details = (item) => {
    const url = `https://openapi.programming-hero.com/api/phone/${item}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => getDetails(data.data))
}

const getDetails = data => {
    console.log(data.brand);
}
