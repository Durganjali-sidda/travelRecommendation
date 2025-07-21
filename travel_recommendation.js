let fullData = null;

document.addEventListener("DOMContentLoaded", () => {
  fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
      console.log("Fetched data:", data);
      fullData = data;
    })
    .catch(error => console.error("Error fetching data:", error));
});

function createCard(place) {
  return `
    <div style="border:1px solid #ddd; padding:16px; margin:10px; border-radius:10px; width:300px; background:white; color:black;">
      <img src="${place.imageUrl}" alt="${place.name}" style="width:100%; height:200px; object-fit:cover; border-radius:10px;">
      <h3>${place.name}</h3>
      <p>${place.description}</p>
    </div>
  `;
}

function displayResults(type, items) {
  const container = document.getElementById("recommendation-results");
  const sectionTitles = {
    beaches: "🏖 Beaches",
    temples: "🕌 Temples",
    countries: "🌍 Countries"
  };

  let html = `<h2 style="margin-bottom: 20px;">${sectionTitles[type]}</h2><div style="display:flex; flex-wrap:wrap;">`;

  if (type === "countries") {
    items.forEach(country => {
      country.cities.forEach(city => {
        html += createCard(city);
      });
    });
  } else {
    items.forEach(item => {
      html += createCard(item);
    });
  }

  html += `</div>`;
  container.innerHTML = html;
}

function search() {
  const input = document.getElementById("searchBox").value.toLowerCase().trim();
  const container = document.getElementById("recommendation-results");
  container.innerHTML = "";

  if (!fullData || input === "") return;

  if (input.includes("beach")) {
    displayResults("beaches", fullData.beaches);
  } else if (input.includes("temple")) {
    displayResults("temples", fullData.temples);
  } else if (input.includes("country")) {
    displayResults("countries", fullData.countries);
  } else {
    container.innerHTML = `<p style="color: white; font-size: 18px;">No results found for "${input}".</p>`;
  }
}

function resetSearch() {
  document.getElementById("searchBox").value = "";
  document.getElementById("recommendation-results").innerHTML = "";
}
