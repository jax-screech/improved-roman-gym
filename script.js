const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.querySelector("nav ul");

// Mobile nav toggle
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("hidden");
  });
}

function fetchExercises(muscle, intensityLevel) {
  const apiKey = '179562b284msh8b3cfccdbb3aef2p1844bejsn9578a4a06f6a';
  const url = `https://exercisedb.p.rapidapi.com/exercises`;

  fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    })
    .then(data => {
      const container = document.getElementById("classes-container");
      container.innerHTML = '';

      const intensityMap = {
        low: ['beginner'],
        medium: ['intermediate'],
        high: ['advanced']
      };

      const filtered = data.filter(ex =>
        (!muscle || ex.bodyPart.toLowerCase() === muscle.toLowerCase()) &&
        (!intensityLevel || intensityMap[intensityLevel].includes(ex.difficulty?.toLowerCase()))
      );

      if (filtered.length === 0) {
        container.innerHTML = `<p class="text-red-500 col-span-3 text-center">No exercises found for this combination.</p>`;
        return;
      }

      filtered.slice(0, 9).forEach(exercise => {
        const card = document.createElement("div");
        card.className = "bg-white p-6 rounded shadow hover:shadow-lg transition";

        card.innerHTML = `
          <h4 class="text-xl font-bold mb-2 text-red-600">${exercise.name}</h4>
          <p><strong>Body Part:</strong> ${exercise.bodyPart}</p>
          <p><strong>Target:</strong> ${exercise.target}</p>
          <p><strong>Equipment:</strong> ${exercise.equipment}</p>
          <p><strong>Difficulty:</strong> ${exercise.difficulty ?? 'N/A'}</p>
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