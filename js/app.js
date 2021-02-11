let CARS = JSON.parse(DATA)
const cardListEl = document.getElementById('cardList')
// {
//     "id": "89aed5b8c686ebd713a62873e4cd756abab7a106",
//     "make": "BMW",
//     "model": "M3",
//     "year": 2010,
//     "img": "http://dummyimage.com/153x232.jpg/cc0000/ffffff",
//     "color": "Goldenrod",
//     "vin": "1G6DW677550624991",
//     "country": "United States",
//     "rating": 1,
//     "price": 2269,
//     "views": 5,
//     "seller": "Ellery Girardin",
//     "vin_check": true,
//     "top": false,
//     "timestamp": 1601652988000,
//     "phone": "+1 (229) 999-8553",
//     "fuel": "Benzin",
//     "engine_volume": 1.4,
//     "transmission": "CVT",
//     "odo": 394036,
//     "consume": { "road": 4.8, "city": 12.3, "mixed": 8.4 }
//   }

cardListEl.addEventListener('click', event => {
  console.log('click', event.target);
  const btnEl = event.target.closest('.save-star')
  if (btnEl) {
    console.log('click on save btn!');
  }
})


renderCards(CARS, cardListEl);


function renderCards(data_array, element) {
  let html = '';
  data_array.forEach(car => {
    html += createCardHTML(car)
  });
  element.innerHTML = html;
};



function createCardHTML(card_data) {
  let starIcons = ''
  for (let i = 0; i < 5; i++) {
    if (card_data.rating > i) {
      starIcons += `<i class="fas fa-star"></i>`
  } /*else if () {
      starIcons += `<i class="fas fa-star-half"></i>`
  }*/ else {
      starIcons += `<i class="far fa-star"></i>`
    }
  }
  return `<div class="col card mb-3">
  <div class="row g-0">
    <div class="col-4">
      <a href="#">
        <img class="card-img m-4" width="1" height="1" loading="lazy"
          src="${card_data.img}"
          alt="${card_data.make} ${card_data.model}" />
      </a>
    </div>
    <div class="col-8">
      <div class="card-body">
        <a href="#" class="card-title mb-3">${card_data.make}
          ${card_data.model}
          ${card_data.engine_volume} (${card_data.year})</a>
        <h3 class="card-price text-success">${card_data.price} $</h3>
        <h4 class="card-rating text-warning">${starIcons}
          ${card_data.rating}</h4>
        <div class="card-info mt-4">
          <ul class="main-info">
            <li class="mb-3">
              <i class="fas fa-tachometer-alt"></i>
              ${card_data.odo ?? '---'} km
            </li>
            <li>
              <i class="fas fa-gas-pump"></i>
              ${card_data.fuel}, ${card_data.engine_volume ?? '---'} l
            </li>
            <li class="mb-3">
              <i class="fas fa-map-marker-alt"></i>
              ${card_data.country ?? '---'}
            </li>
            <li>
              <i class="fas fa-cogs"></i>
              ${card_data.transmission}
            </li>
          </ul>
          <div class="row fuel-consume mt-4 mb-4">
            <h4>Витрати палива (л/100км):</h4>
            <ul class="consume col-7 mt-3 mb-0">
              <li>
                <i class="fas fa-city"></i>
                ${card_data.consume?.city ?? '---'}
              </li>
              <li>
                <i class="fas fa-road"></i>
                ${card_data.consume?.road ?? '---'}
              </li>
              <li>
                <i class="fas fa-exchange-alt"></i>
                ${card_data.consume?.mixed ?? '---'}
              </li>
            </ul>
          </div>
          ${card_data.vin ? `<div class="vin-block pe-3">
            <span class="p-1 me-3">VIN</span>
            <div class="card-vin">${card_data.vin}</div>
          </div>` : ''}
          ${card_data.color ? `<div class="color mt-4">Колір: ${card_data.color}</div>` : ''}
          <div class="contact-block mt-4">
            <a href="tel:${card_data.phone}"
              class=" btn btn-primary call-num">
              <i class="fas fa-phone-alt me-1"></i>
              Подзвонити
            </a>
            <p class="mb-0">${card_data.seller}</p>
          </div>
          <button type="button" class="save-star btn-secondary"><i
              class="fas fa-star"></i></button>
        </div>
      </div>
    </div>
    <div class="col-12 card-footer">
      <small class="text-muted">
        <i class="far fa-clock"></i>
        ${card_data.timestamp}
      </small>
      <small class="text-muted">
        <i class="fas fa-eye"></i>
        ${card_data.views}
      </small>
    </div>
  </div>
</div>`
}








 const testBtn = document.getElementById('testBtn')

 testBtn.addEventListener('click', event => {
   console.log(event);
 })

testBtn.click()


