const mainDiv = document.querySelector(".main");

fetch("https://randomuser.me/api/?results=21")
  .then((result) => result.json())
  .then((data) => {
    console.log(data.results);
    data.results.forEach((person) => {
      const personCard = `
        <div class="person">
        <div class = "topDiv">
        <img src="${person.picture.large}" alt="" />
        <h2>${person.name.first} ${person.name.last}</h2>
        </div>
        <div class="line"></div>
        <div>
          <h3>${person.login.username}</h3>
          <p>Age: ${person.dob.age}</p>
          <p><i class="fa-solid fa-map-location-dot"></i> City: ${person.location.city}</p>
          <p><i class="fa-solid fa-location-crosshairs"></i> State: ${person.location.state}</p>
          <p><i class="fa-solid fa-location-dot"></i> Country: ${person.location.country}</p>
          <p><i class="fa-solid fa-phone"></i> ${person.cell}</p>
          <p><i class="fa-solid fa-envelope"></i> ${person.email}</p>
        </div>
      </div>
        `;
      mainDiv.insertAdjacentHTML("beforeend", personCard);
    });
  })
  .catch((error) => console.log(error));
