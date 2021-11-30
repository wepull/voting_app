var form = document.getElementById("mainForm");

if (window["env"]["ecServerEndpoint"]) {
  window.ecServerEndpoint = "http://" + window["env"]["ecServerEndpoint"];
  form.addEventListener("submit", handleFormSubmit);
} else {
  form.innerHTML =
    '<div class="alert alert-danger" role="alert">' +
    "Couldn't find server's address. Please try again or report this to devs" +
    "</div>";
}

function handleFormSubmit(ev) {
  ev.preventDefault();
  var formData = new FormData(ev.target);
  var Name = formData.get("name");
  var ImageUrl = formData.get("imageUrl");
  var alertContainer = document.getElementById("alertContainer");
  fetch(window.ecServerEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Name, ImageUrl }),
  })
    .then((res) => res.json())
    .then((res) => {
      alertContainer.innerHTML =
        '<div class="alert alert-success" role="alert">' +
        "Candidate added succesfully!" +
        "</div>";
    })
    .catch((err) => {
      alertContainer.innerHTML =
        '<div class="alert alert-danger" role="alert">' +
        "Error in adding the candidate. Please try again or report this to devs" +
        "</div>";
    });
}
