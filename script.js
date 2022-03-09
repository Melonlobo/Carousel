const carouselSlider = document.querySelector('.carousel-slide');
const container = document.querySelector('.container');
const images = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.querySelector('.fa-angle-double-left');
const nextBtn = document.querySelector('.fa-angle-double-right');
const searchBtn = document.querySelector('.search-btn');
const search = document.querySelector('.search-bar');
const lastCopy = document.querySelector('#last-copy');
const firstCopy = document.querySelector('#first-copy');
const first = document.querySelector('#first');
const last = document.querySelector('#last');
let srcUrls;

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    images.forEach(img => {
        img.src = undefined;
    });
    srcUrls = [];
    srcUrls.length = images.length;
    const key = search.value.trim();
    if (key) {
        displayImgs(key);
        first.src = firstCopy.src;
        last.src = lastCopy.src;
    }
    search.value = ''
});

function displayImgs(src) {
    let i = 0;
    if (srcUrls.includes(undefined)) {
        fetch(`https://source.unsplash.com/1200x700/?${src}`)
            .then((res) => {
                console.log('Res: ' + res);
                console.log('Data:' + res.url);
                if (!srcUrls.includes(res.url)) {
                    console.log('does not contain');
                    srcUrls.shift();
                    srcUrls.push(res.url);
                    console.log(srcUrls);
                    displayImgs(src);
                } else {
                    console.log('contains');
                    displayImgs(src);
                }
            })
            .then(() => {
                images.forEach((img) => {
                    img.src = srcUrls[i];
                    i++;
                    console.log(img);
                });
            });
    }
    const pics = [...new Set(srcUrls)];
    console.log(pics);
}

let counter = 1;
const size = carouselSlider.clientWidth;
// const size = carouselSlider.getBoundingClientRect().width;
carouselSlider.style.transform = `translateX(${-size * counter}px)`;

nextBtn.addEventListener('click', () => {
    if (counter >= images.length - 1) return;
    carouselSlider.style.transition = 'transform 0.8s ease-in-out';
    counter++;
    carouselSlider.style.transform = `translateX(${-size * counter}px)`;
});

prevBtn.addEventListener('click', () => {
    if (counter <= 0) return;
    carouselSlider.style.transition = 'transform 0.8s ease-in-out';
    counter--;
    carouselSlider.style.transform = `translateX(${-size * counter}px)`;
});

carouselSlider.addEventListener('transitionend', () => {
    if (images[counter].id === 'first-copy') {
        carouselSlider.style.transition = 'none';
        counter = images.length - counter;
        carouselSlider.style.transform = `translateX(${-size * counter}px)`;
    }
    if (images[counter].id === 'last-copy') {
        carouselSlider.style.transition = 'none';
        counter = images.length - 2;
        carouselSlider.style.transform = `translateX(${-size * counter}px)`;
    }
});