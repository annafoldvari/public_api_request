$(function(){

    $.ajax({
        url: 'https://randomuser.me/api/?results=12',
        dataType: 'json',
        success: function(data) {
                buildUpGallery(data);
        }
      });
  
  });

  function buildUpGallery(data) {

    let galleryDiv = document.getElementById('gallery');

    let galleryHtml = '';

    for (let i = 0; i < data.results.length; i++ ) { 
    let user = data.results[i];
    galleryHtml += `<div class="card">
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