

const search_product = () => {
    const input_field = document.getElementById('input-field');
    const input_value = input_field.value;
    input_field.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${input_value}`;
    
    fetch(url)
        .then(res => res.json())
        .then(data => getPhone(data.data))
}//Ending search Product Function

const getPhone = data => {
    const parent = document.getElementById('parent');
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
                </div>
            </div>
        `;
        parent.appendChild(div);
    });//ending forEach

}//Ending GetPhone function
