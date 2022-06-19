
// ui hooks
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = "rZPCvRkCOdzJEK3N8FEeUcfLSMjVgwF_OTXHiQvxxfA"
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded

function imageLoaded(){
  
  imagesLoaded++;
  console.log('image loaded');
  if(imagesLoaded === totalImages) {
    ready = true;
    console.log('ready = ', ready);
  }
}

// helper function

function setAttributes(element, attributes) {
  for(const key in attributes){
    element.setAttribute(key, attributes[key])
  }
  // return element;
}

//create elements for links and photos, add to dom
function displayPhotos(){
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log('total images', totalImages);
  // run a callback function for each object in photos array
  photosArray.forEach((photo) => {
    // create <a>element</a> that links back to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    });
    // create image for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });
    // Add an event listner to check if all the photos have finished loading
    img.addEventListener('load', imageLoaded)
    // put the image inside the anchor element, then put them inside the imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  })
}

// get photos from Usplash Api
async function getPhotosFromUnsplashApi(){
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos()
  } catch(error) {
    console.log(error);
  } 
}

// check to see if scrolling near botton of page, load more photos

window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotosFromUnsplashApi();
    imageLoaded()

  }
});

getPhotosFromUnsplashApi();