const loadPhone = async (searchPhone = 13, isShowAll) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`
  );
  const data = await response.json();
  const phone = data.data;
  displayPhone(phone, isShowAll);
};
const displayPhone = async (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";
  const showAllButton = document.getElementById("show-all-button");

  if (phones.length > 12 && !isShowAll) {
    showAllButton.classList.remove("hidden");
  } else {
    showAllButton.classList.add("hidden");
  }
  // console.log(isShowAll);
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  // console.log(phones.length);

  phones.forEach((phone) => {
    // console.log(phone)
    const div = document.createElement("div");
    div.innerHTML = `
        
        <div class=" bg-white border p-5 border-gray-300 rounded-lg shadow">
          <div class="bg-[#0D6EFD0D] rounded-lg p-4 text-center">
            <img class="rounded-t-lg mx-auto" src="${phone.image}" alt="Loading..." />
          </div>
          <div class="p-5 text-center">
            <h5 class="my-5 text-2xl font-semibold text-[#403F3F]">${phone.phone_name}</h5>
            <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">There are many variations of passages of available, but the majority have suffered</p>
            <p class="text-2xl text-[#403F3F] mb-4">$999</p>
            <button onclick="handleShowDetails('${phone.slug}')" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800  dark:bg-blue-600 dark:hover:bg-blue-700">
             Show Details
          </button>
          </div>
        </div>
        `;
    phoneContainer.appendChild(div);
  });
  loadingSpinner(false);
};
const handleSearch = async (isShowAll) => {
  loadingSpinner(true);
  const searchValue = document.getElementById("search-field").value;
  loadPhone(searchValue, isShowAll);
};

const loadingSpinner = (isLoading) => {
  const spinner = document.getElementById("loading-spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

const showAllButton = (isShowAll) => {
  handleSearch(true);
};
const handleShowDetails = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await response.json();

  // console.log(data.data);
  showDetailsModal(data.data);
  showDetails.showModal();
};
const showDetailsModal = (phoneDetails) => {
  console.log(phoneDetails);
  const showDetailContainer = document.getElementById("show-details-modal");
  showDetailContainer.innerHTML = `
  <div class="bg-[#f5f7fa] p-8 rounded-xl">
  <img src="${phoneDetails.image}" class="text-center mx-auto">
  </div>
  <h4 class="font-bold text-3xl mt-10 mb-6">${phoneDetails.name}</h4>
  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
  <h4 class="text-lg font-bold text-[#403F3F] my-4">Storage: <span class="text-[#706F6F] font-normal">${
    phoneDetails?.mainFeatures?.storage
  }</span></h4>
  <h4 class="text-lg font-bold text-[#403F3F] my-4">Display Size: <span class="text-[#706F6F] font-normal">${
    phoneDetails?.mainFeatures?.displaySize
  }</span></h4>
  <h4 class="text-lg font-bold text-[#403F3F] my-4">Chipset: <span class="text-[#706F6F] font-normal">${
    phoneDetails?.mainFeatures?.chipSet
  }</span></h4>
  <h4 class="text-lg font-bold text-[#403F3F] my-4">Memory: <span class="text-[#706F6F] font-normal">${
    phoneDetails?.mainFeatures?.memory
  }</span></h4>
  <h4 class="text-lg font-bold text-[#403F3F] my-4">Slug: <span class="text-[#706F6F] font-normal">${
    phoneDetails?.slug
  }</span></h4>
  <h4 class="text-lg font-bold text-[#403F3F] my-4">Release data: <span class="text-[#706F6F] font-normal">${
    phoneDetails?.releaseDate
  }</span></h4>
  <h4 class="text-lg font-bold text-[#403F3F] my-4">Brand: <span class="text-[#706F6F] font-normal">${
    phoneDetails?.brand
  }</span></h4>
  <h4 class="text-lg font-bold text-[#403F3F] my-4">GPS: <span class="text-[#706F6F] font-normal">${
    phoneDetails?.others?.GPS || "No GPS available in this device."
  }</span></h4>
  `;
};

loadPhone();
