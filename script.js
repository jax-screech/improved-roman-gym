function onSubmit() {
  alert("Form submitted successfully!");
}
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
})


const images = document.querySelectorAll('.relative img');
let currentIndex = 0;

function showNextImage() {
  images[currentIndex].classList.remove('opacity-100');
  images[currentIndex].classList.add('opacity-0');
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.remove('opacity-0');
  images[currentIndex].classList.add('opacity-100');
}

images[currentIndex].classList.add('opacity-100');
setInterval(showNextImage, 2000);

