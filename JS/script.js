

const search_product = () => {
    // spinner
    document.getElementById('spinner').style.display = 'block';
    const input_field = document.getElementById('input-field');
    const input_value = input_field.value.toLowerCase();
    if (input_value.length > 0 && input_value !== ' ' && input_value.includes('  ') === false) {
        input_field.value = '';
        document.getElementById('parent').innerHTML = '';
        document.getElementById('details-area').innerHTML = '';
        const url = `https://openapi.programming-hero.com/api/phones?search=${input_value}`;

        fetch(url)
            .then(res => res.json())
            .then(data => getPhone(data.data))
    }
    else {
        document.getElementById('spinner').style.display = 'none';

        document.getElementById('parent').innerHTML = 
        `
            <h2 class="text-center w-100 text-danger">Please Search By Product Name</h2>
        `
    }
    
}//Ending search Product Function

const getPhone = data => {
    const parent = document.getElementById('parent');
    let count = 20;
    document.getElementById('spinner').style.display = 'none';
    if (data.length !== 0) {
        data.forEach(item => {
            if (count > 0) {
                count = count - 1;
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
            }
            else {
                return 0;
            }
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
    // console.log(data.mainFeatures);
    const parent = document.getElementById('details-area');
    parent.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('details');
    div.classList.add('mb-3');
    div.style.maxWidth = '540px;';
    const isRelease = () => {
        if (data.releaseDate == '') {
            return 'No release date found';
        }
        else {
           return data.releaseDate;
        }
    }
    div.innerHTML = `
        <div class="row g-0 m-5">
            <div class="col-md-4">
                <img src="${data.image}" class="img-fluid rounded-start mt-5" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${isRelease()}</p>
                    <p class="card-text"><small class="text-muted">Main Features
                    <li>${data.mainFeatures.displaySize}</li>
                    <li>${data.mainFeatures.memory}</li>
                    <li>${data.mainFeatures.storage}</li>
                    <li>${data.mainFeatures.sensors[0]}</li>
                    <li>${data.mainFeatures.sensors[1]}</li>
                    <li>${data.mainFeatures.sensors[2]}</li>
                    <li>${data.mainFeatures.sensors[3]}</li>
                    <li>${data.mainFeatures.sensors[4]}</li>
                    <li>${data.mainFeatures.sensors[5]}</li>
                    </small></p>
                </div>
            </div>
        </div>
    `
    parent.appendChild(div);
}
