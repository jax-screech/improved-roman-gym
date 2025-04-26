const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.querySelector("nav ul");

// Mobile nav toggle
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("hidden");
  });
}

async function fetchAndDisplayExercises() {
  const container = document.getElementById('classes-list');
  container.innerHTML = 'Loading...';

  try {
    // Fetch exercises and images in parallel
    const [exerciseRes, imageRes] = await Promise.all([

      fetch('https://wger.de/api/v2/exercise/?language=2&limit=12'),
      fetch('https://wger.de/api/v2/exerciseimage/')
    ]);

    const exerciseData = await exerciseRes.json();
    const imageData = await imageRes.json();

    const exercises = exerciseData.results;
    const images = imageData.results;

    container.innerHTML = ''; // Clear loading state

    exercises.forEach(exercise => {
      const matchedImage = images.find(img => img.exercise === exercise.id);

      const card = document.createElement('div');
      card.className = 'bg-white rounded-lg shadow-lg p-6 text-center flex flex-col items-center';

      card.innerHTML = `
        ${matchedImage ? `<img src="${matchedImage.image}" alt="${exercise.name}" class="w-full h-48 object-cover rounded mb-4">` : ''}
        <h4 class="text-xl font-semibold mb-2">${exercise.name}</h4>
        <p class="text-gray-600 mb-4 text-sm">${exercise.description || 'No description available.'}</p>
        <button class="bg-white text-red-500 px-4 py-2 rounded hover:bg-red-500 border border-red-500 hover:text-white">Join Now</button>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error('Error loading exercises:', error);
    container.innerHTML = `<p class="text-red-500">Oops! Failed to load exercises. Try again later.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayExercises);
const filterBtn = document.getElementById('applyFiltersBtn');
const filterInput = document.getElementById('filterInput');

if (filterBtn && filterInput) {
  filterBtn.addEventListener('click', () => {
    const filterText = filterInput.value.toLowerCase();
    const exerciseCards = document.querySelectorAll('#classes-list > div');

    exerciseCards.forEach(card => {
      const exerciseName = card.querySelector('h4').textContent.toLowerCase();
      if (exerciseName.includes(filterText)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}


function onSubmit(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  
    console.log("Form Data:", data);
  
    alert("Form submitted! We will get back to you.");
    window.location.href = "index.html"; // Redirect after submission
  }  