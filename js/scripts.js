let data;

$(function(){

    $.ajax({
        url: 'https://randomuser.me/api/?results=12',
        dataType: 'json',
        success: function(data) {
          buildUpGallery(data);
        }
      });
  
      $('#gallery').on('click', '.card', showModalDiv);

      $('body').on('click', '.modal-close-btn', removeModalDiv);

      $('body').on('click', '.modal-prev', function(event) {
        updateModalDiv(event, -1);
      });

      $('body').on('click', '.modal-next', function(event) {
        updateModalDiv(event, 1);
      });

  });

  function buildUpGallery(data) {

    window.data = data;

    let galleryDiv = document.getElementById('gallery');

    let galleryHtml = '';

    for (let i = 0; i < data.results.length; i++ ) { 
    let user = data.results[i];
    galleryHtml += `<div class="card" data-id="${i}">
    <div class="card-img-container">
        <img class="card-img" src="${user.picture.medium}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="card-text">${user.email}</p>
        <p class="card-text cap">${user.location.city}</p>
    </div>
    </div>`
    }
    galleryDiv.innerHTML = galleryHtml;
}

function showModalDiv(event) {
  let userIndex;

  if (event.target.classList[0] === 'card') {
    userIndex = event.target.getAttribute('data-id');
  } else {
    let parentCard = event.target.closest('.card');
    userIndex = parentCard.getAttribute('data-id'); 
  }

  let modalContainerDiv = document.createElement('div');
  modalContainerDiv.className= 'modal-container';
  modalContainerDiv.setAttribute('data-id', userIndex);
  
  let modalDiv = document.createElement('div');
  modalDiv.className = "modal";

  modalContainerDiv.appendChild(modalDiv);

  let innerModal = `<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
  <div class="modal-info-container">
      <img class="modal-img" src="${window.data.results[userIndex].picture.large}" alt="profile picture">
      <h3 id="name" class="modal-name cap">${window.data.results[userIndex].name.first} ${window.data.results[userIndex].name.last}</h3>
      <p class="modal-text">${window.data.results[userIndex].email}</p>
      <p class="modal-text cap">${window.data.results[userIndex].location.city}</p>
      <hr>
      <p class="modal-text">${window.data.results[userIndex].phone}</p>
      <p class="modal-text">${window.data.results[userIndex].location.street}, ${window.data.results[userIndex].location.city}, ${window.data.results[userIndex].location.state} ${window.data.results[userIndex].location.postcode}</p>
      <p class="modal-text">Birthday: ${window.data.results[userIndex].dob.date.slice(0,-10)}</p>
  </div>`

  modalDiv.innerHTML = innerModal;

  let modalButtonsDiv = document.createElement('div');
  modalButtonsDiv.className = 'modal-btn-container';

  modalButtonsDiv.innerHTML = `<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
  <button type="button" id="modal-next" class="modal-next btn">Next</button>`;

  modalContainerDiv.appendChild(modalButtonsDiv);

  document.getElementsByTagName('body')[0].appendChild(modalContainerDiv);
}

function removeModalDiv(event) {

  let bodyElement = document.getElementsByTagName('body')[0];
  let modalContainerDiv = document.querySelector('.modal-container');

  bodyElement.removeChild(modalContainerDiv);

}

function updateModalDiv(event, diff) {

  let parentDiv = event.target.closest('.modal-container');

  let userIndex = parseInt(parentDiv.getAttribute('data-id'));

  let modalInfoContainer = document.querySelector('.modal-info-container');
  
  let img = modalInfoContainer.children[0];
  let name = modalInfoContainer.children[1];
  let email = modalInfoContainer.children[2];
  let city = modalInfoContainer.children[3];
  let phone = modalInfoContainer.children[5];
  let address = modalInfoContainer.children[6];
  let dob = modalInfoContainer.children[7];

  if (diff === -1 && userIndex === 0) { 
    return
  } else if (diff === 1 && userIndex === 11) {
    return
  } else {
    parentDiv.setAttribute('data-id', userIndex+diff);
    
    img.setAttribute('src', window.data.results[userIndex+diff].picture.large);
    name.textContent = `${window.data.results[userIndex+diff].name.first} ${window.data.results[userIndex+diff].name.last}`;
    email.textContent = window.data.results[userIndex+diff].email;
    city.textContent = window.data.results[userIndex+diff].location.city;
    phone.textContent = window.data.results[userIndex+diff].phone;
    address.textContent = `${window.data.results[userIndex+diff].location.street}, ${window.data.results[userIndex+diff].location.city}, ${window.data.results[userIndex+diff].location.state} ${window.data.results[userIndex+diff].location.postcode}`;
    dob.textContent = window.data.results[userIndex+diff].dob.date.slice(0,-10);
  }

}

