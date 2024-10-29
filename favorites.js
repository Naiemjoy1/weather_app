let favoriteCities = [];
const favoritesButton = document.querySelector(".favorites");
const listElement = document.querySelector(".fav-list .list");
const favListContainer = document.querySelector(".fav-list");

favListContainer.style.display = "none";

favoritesButton.addEventListener("click", () => {
  const currentCity = document.querySelector(".city-name").innerHTML;
  addFavorite(currentCity);
});

function addFavorite(city) {
  if (!favoriteCities.includes(city)) {
    favoriteCities.push(city);
    updateFavoriteList();

    Swal.fire({
      icon: "success",
      title: "Added to Favorites!",
      text: `${city} has been added to your favorites.`,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      icon: "info",
      title: "Already in Favorites",
      text: `${city} is already in your favorites!`,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

function removeFavorite(city) {
  favoriteCities = favoriteCities.filter((favCity) => favCity !== city);
  updateFavoriteList();

  Swal.fire({
    icon: "success",
    title: "Removed from Favorites!",
    text: `${city} has been removed from your favorites.`,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
  });
}

function updateFavoriteList() {
  listElement.innerHTML = "";

  if (favoriteCities.length > 0) {
    favListContainer.style.display = "block";
  } else {
    favListContainer.style.display = "none";
  }

  favoriteCities.forEach((city) => {
    const div = document.createElement("div");
    div.className = "favorite-item";
    div.innerHTML = `${city} <span class="remove-fav" onclick="removeFavorite('${city}')">❌</span>`;
    div.addEventListener("click", () => {
      checkWeather(city);
    });
    listElement.appendChild(div);
  });

  listElement.style.opacity = 0;
  setTimeout(() => {
    listElement.style.opacity = 1;
  }, 100);
}
