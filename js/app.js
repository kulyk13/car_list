// Global variables
let CARS = JSON.parse(DATA);
console.log(CARS.length)
const cardListEl = document.getElementById('cardList');
const masonryBtnsEl = document.getElementById('masonryBtns');
const sortSelectEl = document.getElementById('sortSelect');
const filterFormEl = document.getElementById('filterForm');
const searchFormEl = document.getElementById('searchForm');
const dateFormatter = new Intl.DateTimeFormat();
const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit'
});
const currencyUSDFormatter = new Intl.NumberFormat("ru", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0
});
const currencyUAHFormatter = new Intl.NumberFormat("ru", {
  style: "currency",
  currency: "UAH",
  minimumFractionDigits: 0,
  maximumSignificantDigits: 4
});

if (!localStorage.wishList) {
  localStorage.wishList = JSON.stringify([])
};
const filterFields = ['make', "price", "engine_volume",'fuel', 'transmission']
const wishListLS = JSON.parse(localStorage.wishList);
isWishlistPage()

const exchangeRateUSD = 27.8569;

//
renderCards(CARS, cardListEl);
renderFilterPanel(CARS, filterFormEl, filterFields)
//

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

{/* <fieldset class="d-flex flex-column p-2 mb-3">
            <legend>Fuel</legend>
            <label>
              <input type="checkbox" name="fuel" value="Benzin">
              Benzin
            </label>
            <label>
              <input type="checkbox" name="fuel" value="Diesel">
              Diesel
            </label>
            <label>
              <input type="checkbox" name="fuel" value="Propane">
              Propane
            </label>
          </fieldset> */}



// Filter form
filterFormEl.addEventListener('submit', function (event) {
  event.preventDefault();
  const query = filterFields.map(field => {
    return Array.from(this[field]).reduce((acu, currInput) => {
      if (currInput.checked) {
        return [...acu, currInput.value]
      } else{
        return acu
      }
    }, [])
  })

  const filteredCars = CARS.filter(car => {
    return query.every(values => {
      return !values.length || filterFields.some(field => {
        return values.includes(`${car[field]}`)
      })
    })
  })
  renderCards(filteredCars, cardListEl);
})


function createFilterCheckbox(field, value) {
  return `<label>
    <input type="checkbox" name="${field}" value="${value}">
    ${value}
  </label>`
}
function createPriceFilter(field) {
  return `<label class="d-flex align-items-center">
  від
  <input type="text" name="${field}" value="0" class="border col-4 me-3 m-2">
  до
  <input type="text" name="${field}" class="border col-4 m-2">
  </label>`
}
function createFilterSection(field, cars) {
  let html = ''
  const values = new Set(cars.map(car => car[field]).sort())
  values.forEach(value => {
    html += createFilterCheckbox(field, value)
  })
  if (field == "price") {
    return `<fieldset class="filter-section d-flex flex-column p-1 mb-3">
    <legend>${field}</legend>
    ${createPriceFilter(field)}
  </fieldset>`
  } else {
    return `<fieldset class="filter-section d-flex flex-column p-1 mb-3">
  <legend>${field}</legend>
  ${html}
</fieldset>`
  }
}
function renderFilterPanel(cars, formEl, fields) {
  let html = '';
  fields.forEach(field => {
    html += createFilterSection(field, cars);
  });
  formEl.insertAdjacentHTML('afterbegin', html);
}



// Sort form
sortSelectEl && sortSelectEl.addEventListener('change', function () {
  if (this.value == 'default') {
    CARS = JSON.parse(DATA)
  } else {
    console.log(this.value.split('-'));
    let [key, type] = this.value.split('-')
    console.time('sorting ->>')
    if (typeof CARS[0][key] === 'string') {
      if (type == 'ab') {
        CARS.sort((a, b) => a[key].localeCompare(b[key]))
      } else if (type == 'ba') {
        CARS.sort((a, b) => b[key].localeCompare(a[key]))
      }
    }
    else if (typeof CARS[0][key] === 'number') {
      if (type == 'ab') {
        CARS.sort((a, b) => a[key] - b[key])
      } else if (type == 'ba') {
        CARS.sort((a, b) => b[key] - a[key])
      }
    }
    console.timeEnd('sorting ->>')
  }
  renderCards(CARS, cardListEl);
})

// Change cards view
masonryBtnsEl && masonryBtnsEl.addEventListener('click', event => {
  const btnEl = event.target.closest('.btn-change')
  if (btnEl) {
    let action = btnEl.dataset.action
    if (action == '1') {
      cardListEl.classList.add('row-cols-1')
      cardListEl.classList.remove('row-cols-2')
    } else if (action == '2') {
      cardListEl.classList.add('row-cols-2')
      cardListEl.classList.remove('row-cols-1')
    }

    findSiblings(btnEl).forEach(btn => {
      btn.classList.remove('btn-success')
      btn.classList.add('btn-secondary')
    })
    btnEl.classList.remove('btn-secondary')
    btnEl.classList.add('btn-success')
  }
})

// Save star
cardListEl && cardListEl.addEventListener('click', event => {
  const btnEl = event.target.closest('.save-star');
  if (btnEl) {
    console.log('click on save-star');
    const id = btnEl.closest('.card').dataset.id;
    console.log(id);
    if (!wishListLS.includes(id)) {
      wishListLS.push(id);
      btnEl.classList.add('text-warning');
    } else{
      wishListLS.splice(wishListLS.indexOf(id),1);
      btnEl.classList.remove('text-warning');
    }
    localStorage.wishList = JSON.stringify(wishListLS);
    btnEl.blur();
    isWishlistPage(true)
  }
});

// Search form
searchFormEl.addEventListener('submit', function (event) {
  event.preventDefault();
  let query = this.search.value.toLowerCase().trim().split(' ')//[mustang, ford]
  const searchFields = ['make', 'model', 'year']
  const filteredCars = CARS.filter(car => {
    return query.every(word => {
      return !word || searchFields.some(field => {
        return `${car[field]}`.toLowerCase().trim().includes(word)
      })
    })
  })
  renderCards(filteredCars, cardListEl);
})



function renderCards(data_array, element) {
  let html = '';
  if (data_array.length > 0) {
    data_array.forEach(car => {
      html += createCardHTML(car)
    });
  } else {
    html = `<h2 class="text-center text-danger">No cars! :((</h2>`
  }
  element.innerHTML = html;
};



function createCardHTML(card_data) {
  let starIcons = ''
  for (let i = 0; i < 5; i++) {
    if (card_data.rating - 0.5 > i) {
      starIcons += `<i class="fas fa-star"></i>`
    } else if (card_data.rating > i) {
      starIcons += `<i class="fas fa-star-half-alt"></i>`
    } else {
      starIcons += `<i class="far fa-star"></i>`
    }
  }
  return `<div class="col card mb-3" data-id="${card_data.id}">
  <div class="row g-0">
    <div class="col-4 card-img-wrap">
      <a href="#" class="w-100">
        <img class="card-img" width="1" height="1" loading="lazy"
          src="${card_data.img}"
          alt="${card_data.make} ${card_data.model}" />
      </a>
    </div>
    <div class="col-8 card-body-wrap">
      <div class="card-body">
        <a href="#" class="card-title mb-3">${card_data.make}
          ${card_data.model}
          ${card_data.engine_volume} (${card_data.year})</a>
        <div class="price-block mb-2">
          <span class="card-price text-success">${currencyUSDFormatter.format(card_data.price)}</span>
          <span>•</span>
          <span>${currencyUAHFormatter.format(card_data.price * exchangeRateUSD)}</span>
        </div>
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
          ${card_data.vin ? `<div class="vin-block pe-3 ${card_data.vin_check ? 'check' : 'uncheck'}">
            <span class="p-1 me-3">VIN</span>
            <div class="card-vin">${card_data.vin}</div>
          </div>` : `<div class="vin-block pe-3 undefined">
          <span class="p-1 me-3">VIN</span>
          <div class="card-vin">Невідомий</div>
        </div>`}
          <div class="color mt-4">Колір: ${card_data.color ?? 'Невідомий'}</div>
          <div class="contact-block mt-4">
            <a href="tel:${card_data.phone}"
              class=" btn btn-primary call-num">
              <i class="fas fa-phone-alt me-1"></i>
              Подзвонити
            </a>
            <p class="mb-0">${card_data.seller}</p>
          </div>
          <button type="button" class="save-star btn btn-secondary ${wishListLS.includes(card_data.id) ? 'text-warning' : ''}"><i
              class="fas fa-star"></i></button>
        </div>
      </div>
    </div>
    <div class="col-12 card-footer">
      <small class="text-muted">
        <i class="far fa-clock"></i>
        ${dateFormatter.format(card_data.timestamp)} ${timeFormatter.format(card_data.timestamp)}
      </small>
      <small class="text-muted">
        <i class="fas fa-eye"></i>
        ${card_data.views}
      </small>
    </div>
  </div>
</div>`
}
function isWishlistPage(render) {
  if (window.location.pathname == '/wishlist.html') {
    CARS = wishListLS.reduce((acu, currId) => {
      return [...acu, CARS.find(car => car.id == currId)]
    }, [])
  } 
  render && renderCards(CARS, cardListEl);
}
//Utils

function findSiblings(DOMelement) {
  // const parent = DOMelement.parentElement
  // const children = parent.children
  // const siblings = [...children].filter(el => el != DOMelement)
  // return siblings
  return [...DOMelement.parentElement.children].filter(el => el != DOMelement)
}





console.log();