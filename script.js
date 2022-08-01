const count = 10;
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById("loader");
const apiKey = "6piKyUhpGzn2SkKOhUjETNQ2kiN_SdpxaVyZYqCl9Is";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let photosArray=[];
let ready = false;
let imagesLoaded=0;
let totalImages=0;

function imageLoaded(){
    console.log('image loaded');
    imagesLoaded++;
    if(imagesLoaded==totalImages){
        ready=true;
        loader.hidden=true;
        imagesLoaded=0;
    }
}


function setAttributes(element, attiributes){
    for(const key in attiributes){
        element.setAttribute(key, attiributes[key]);
    }
}
function displayPhotos() {
    totalImages=photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, {
        href: photo.links.html,
        target:'_blank',
    })
    const img=document.createElement('img');
    setAttributes(img,{
        title:photo.alt_description,
        src:photo.urls.regular,
        alt:photo.alt_description,
    })
    img.addEventListener('load',imageLoaded)
    item.appendChild(img);
    imageContainer.appendChild(item);
    });
}
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 &&ready){
        getPhotos();
        ready=false;
    }
})
getPhotos();
