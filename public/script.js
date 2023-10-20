document.addEventListener("DOMContentLoaded", () => {
  const countryList = document.getElementById("container");
  const searchInput = document.getElementById("search");
  const regionSelect = document.getElementById("region");
  const mode = sessionStorage.getItem("mode");
  if (countryList !== null) {
    const originalList = [...countryList.children];

    searchInput.addEventListener("input", () => {
      filterCountries();
    });

    regionSelect.addEventListener("change", () => {
      filterCountries();
    });

    function filterCountries() {
      resetCountryList();

      const searchValue = searchInput.value.toLowerCase();
      const regionValue = regionSelect.value.toLowerCase();

      for (const div of countryList.children) {
        const countryName = div.textContent
          .split("Population")[0]
          .toLowerCase();
        const regionName = div.textContent
          .split("Region :")[1]
          .split("Capital")[0]
          .toLowerCase();
        const nameMatch = countryName.includes(searchValue);
        const regionMatch = regionName.includes(regionValue);

        if (nameMatch && regionMatch) {
          div.style.display = "block";
        } else {
          div.style.display = "none";
        }
      }
    }

    function resetCountryList() {
      countryList.innerHTML = "";

      for (const div of originalList) {
        countryList.appendChild(div);
      }
    }
  }

  if (mode !== null) {
    checkMode(mode)
  }
});

document.getElementById("mode").addEventListener("click", () => {
  checkMode(document.getElementById("mode").innerText)
});

function checkMode(text) {
  if (text === "Dark Mode") {
    body.className = "darkMode";
    document.getElementById("mode").innerText = "Light Mode";
    sessionStorage.setItem("mode", "Dark Mode");
  } else {
    body.classList.remove("darkMode");
    document.getElementById("mode").innerText = "Dark Mode";
    sessionStorage.setItem("mode", "Light Mode");
  }
}
