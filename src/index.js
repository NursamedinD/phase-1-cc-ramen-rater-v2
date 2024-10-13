// index.js



// Callbacks
const handleClick = (ramen) => {
  const detailImage = document.querySelector('.detail-image');
  const detailName = document.querySelector('.name');
  const detailRestaurant = document.querySelector('.restaurant');
  const detailRating = document.querySelector('#rating-display');
  const detailComment = document.querySelector('#comment-display');

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = ramen.rating;
  detailComment.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.querySelector('#new-ramen');
  form.addEventListener('submit', (event) => {
    event.preventDefault();


    const newRamen = {
      name: document.querySelector('#new-name').value,
      restaurant: document.querySelector('#new-restaurant').value,
      image: document.querySelector('#new-image').value,
      rating: document.querySelector('#new-rating').value,
      comment: document.querySelector('#new-comment').value
    };


    const ramenMenu = document.querySelector('#ramen-menu');
    const newRamenImg = document.createElement('img');
    newRamenImg.src = newRamen.image;
    newRamenImg.alt = newRamen.name;
    newRamenImg.addEventListener('click', () => handleClick(newRamen));
    ramenMenu.appendChild(newRamenImg);

    form.reset();
  });
};

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => {
      return response.json();
    })
    .then(ramenData => {
      const ramenMenu = document.querySelector('#ramen-menu'); 
      ramenMenu.innerHTML = ''; 
      
      ramenData.forEach(ramen => {
        const ramenImg = document.createElement('img');
        ramenImg.src = ramen.image;
        ramenImg.alt = ramen.name;

        
        ramenImg.addEventListener('click', () => handleClick(ramen)); 

        ramenMenu.appendChild(ramenImg);
      });
    })
    .catch(error => {
      console.error('Error fetching ramen data:', error);
    });
};

const main = () => {
  displayRamens();
  addSubmitListener();
};
document.addEventListener('DOMContentLoaded', () => {
  main();
})


// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
