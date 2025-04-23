const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.querySelector("nav ul");

// Mobile nav toggle
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("hidden");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const muscleFilter = document.getElementById("muscleFilter");
  const intensityFilter = document.getElementById("intensityFilter");

  function updateExercises() {
    const muscle = muscleFilter.value;
    const intensity = intensityFilter.value;
    fetchExercises(muscle, intensity);
  }

  muscleFilter.addEventListener("change", updateExercises);
  intensityFilter.addEventListener("change", updateExercises);

  // Initial load
  updateExercises();
});

function fetchExercises(muscle, intensityLevel) {
  const apiKey = 'YOUR_API_KEY'; // Replace this with your API key
  const url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'X-Api-Key': apiKey
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    })
    .then(data => {
      const container = document.getElementById("classes-container");
      container.innerHTML = ''; // Clear old content

      // Optional: Simple mapping of difficulty to "intensity"
      const intensityMap = {
        low: ['beginner'],
        medium: ['intermediate'],
        high: ['expert', 'advanced']
      };

      const filtered = data.filter(ex => intensityMap[intensityLevel].includes(ex.difficulty.toLowerCase()));

      if (filtered.length === 0) {
        container.innerHTML = `<p class="text-red-500 col-span-3 text-center">No exercises found for this combination.</p>`;
        return;
      }

      filtered.slice(0, 9).forEach(exercise => {
        const card = document.createElement("div");
        card.className = "bg-white p-6 rounded shadow hover:shadow-lg transition";

        card.innerHTML = `
          <h4 class="text-xl font-bold mb-2 text-red-600">${exercise.name}</h4>
          <p><strong>Muscle:</strong> ${exercise.muscle}</p>
          <p><strong>Type:</strong> ${exercise.type}</p>
          <p><strong>Equipment:</strong> ${exercise.equipment}</p>
          <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      document.getElementById("classes-container").innerHTML = `<p class="text-red-500">Unable to load data. Please try again later.</p>`;
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