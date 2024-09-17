const IP_ADDRESS = 'localhost';

document.addEventListener("DOMContentLoaded", function () {
  const fetchProfile = document.getElementById("fetch-profile");

  fetchProfile.addEventListener("submit", function (event) {
    event.preventDefault();

    fetch(`http://${IP_ADDRESS}:3000/combined-api`)
      .then((response) => response.json())
      .then((data) => {
        const profileContainer = document.getElementById("profile-container");
        profileContainer.innerHTML = `
          <h2>${data.fullName}</h2>
          <p>${data.summary}</p>
          <img src="${data.profilePicUrl}" alt="Profile Picture" width="150"/>
          <img src="${data.yesNoGif}" alt="Yes/No GIF" width="150"/>
        `;
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while fetching the profile data.");
      });
  });
});
