const loadPhone = async (searchText = 13, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  //   console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  // clear previous phone cards before adding new cards
  phoneContainer.textContent = "";

  // display show all button if there are more than 12 phones

  const showAll = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }
  //   console.log("is show all", isShowAll);
  //display only first 12 phone if not show all
  //   console.log(phones.length);
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    // console.log(phone);

    //create div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-80 bg-base-100 shadow-xl`;
    //create inner html
    phoneCard.innerHTML = `
    <figure class="p-4"><img src="${phone.image}"alt="Phone" />
    </figure>
    <div class="card-body">
        <h2 class="card-title flex justify-center">
           ${phone.phone_name}
        </h2>
        <p class="text-center">Brand: ${phone.brand}</p>
        <div class="card-actions flex justify-between">
            <div class="btn btn-primary">Buy Now</div>
            <div onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</div>
        </div>
    </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  // Hide loading spinner
  toggleLoadingSpinner(false);
};

// Handle Search Button

const handleSearchBtn = (isShowAll) => {
  //show loading spinner
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field").value;
  //   console.log(searchField);
  loadPhone(searchField, isShowAll);
};

loadPhone();
// <h3 class="text-2xl font-bold text-center">$<span>${phone.slug}</span> </h3>

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");

  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show all

const handleShowAll = () => {
  console.log("first");
  handleSearchBtn(true);
};

// show phones details

const handleShowDetails = async (id) => {
  //   console.log(id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  //load data of single phone
  const data = await res.json();
  const phones = data.data;
  //   console.log(data);
  showPhoneDetails(phones);
};

const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById("phone-name");
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById("show-details-container");
  showDetailContainer.innerHTML = `
  <img src="${phone.image}"alt="Phone" />
  <p>Storage: ${phone?.mainFeatures?.storage}
  `;
  show_detail_modal.showModal();
};
