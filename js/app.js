const events = [
  {
    id: 1,
    name: "Web Development Workshop",
    category: "workshop",
    date: "june 15,2026",
    time: "10:00",
    venue: "Computer Lab",
    description: "Learn HTML,CSS,and JavaScript basics.",
    organiser: "CS Dept",
    contact: "cs@campus.edu"
  },
  {
    id: 2,
    name: "Cricket Championship",
    category: "sports",
    date: "june 20,2026",
    time: "09:00",
    venue: "Playground",
    description: "Show your skills and compete with teams from different departments.",
    organiser: "Sports Club",
    contact: "sports@campus.edu"
  },
  {
    id: 3,
    name: "Coding Club Meetup",
    category: "club",
    date: "june 25,2026",
    time: "16:00",
    venue: "Seminar Hall",
    description: "Meet coding enthusiasts and discuss programming trends and projects.",
    organiser: "Coding Club",
    contact: "coding@campus.edu"
  },
  {
    id: 4,
    name: "Photography Exhibition",
    category: "club",
    date: "june 28,2026",
    time: "14:00",
    venue: "Art Gallery",
    description: "Explore creative photography works by students.",
    organiser: "Tech Club",
    contact: "tech@campus.edu"
  },
  {
    id: 5,
    name: "AI and Machine Learning Workshop",
    category: "workshop",
    date: "june 30,2026",
    time: "15:00",
    venue: "Innovation Center",
    description: "Introduction to Artificial Intelligence and Machine Learning.",
    organiser: "CS Dept",
    contact: "cs@campus.edu"
  },
  {
    id: 6,
    name: "Music and Cultural Fest",
    category: "fest",
    date: "july 05,2026",
    time: "18:00",
    venue: "Playground",
    description: "Enjoy live performances and dance shows, and cultural activities organized by students.",
    organiser: "Cultural Club",
    contact: "culture@campus.edu"
  }


];
//Display events on the Events page
function renderEvents(list) {
  const grid = document.getElementById("events-grid");

  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = '<p class="no-results">No events found.</p>';
    return;
  }

  list.forEach(event => {
    const card = document.createElement("article");

    card.className = "event-card";

    card.innerHTML = `
      <span class="category-badge badge-${event.category}">
        ${event.category}
      </span>
      <h3>${event.name}</h3>
      <p>${event.date} | ${event.venue}</p>
      <p>${event.description.slice(0, 100)}...</p>
      <a href="event-detail.html?id=${event.id}" class="view-details-btn">
        View Details
      </a>
    `;

    grid.appendChild(card);
  });
}

//Load user-added events stored in localStorage

const customEvents =
  JSON.parse(localStorage.getItem("customEvents")) || [];
  //Combine default events with user-added events

const allEvents = [...events, ...customEvents];

if (document.getElementById("events-grid")) {

  renderEvents(allEvents);
  //Filter events based on the selected category
  document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".filters button").forEach(b =>
        b.classList.remove("active")
      );
      this.classList.add("active");
      const filter = this.dataset.filter;
      //Show all events or only events matching the selected category
      const filtered = filter === "all"
        ? allEvents
        : allEvents.filter(e => e.category === filter);
      renderEvents(filtered);
    });
  });
}

//Get event ID from URL and display event details

if (document.getElementById("detail-container")) {
  //Read the event ID from the URL query string
  const params = new URLSearchParams(window.location.search);
  const eventId = parseInt(params.get("id"));
  const event = events.find(e => e.id === eventId);


  if (!event) {
    document.getElementById("detail-container").innerHTML =
      "<p>Event not found.</p>";
  }
  else {
    document.getElementById("event-title").textContent = event.name;
    document.getElementById("event-date").textContent = event.date;
    document.getElementById("event-time").textContent = event.time;
    document.getElementById("event-venue").textContent = event.venue;
    document.getElementById("event-desc").textContent = event.description;
    document.getElementById("event-organiser").textContent = event.organiser;
    document.getElementById("event-contact").textContent = event.contact;
    const registerBtn = document.getElementById("register-btn");

    let registered = JSON.parse(localStorage.getItem("registrations")) || [];
    //Prevent duplicate registrations
    if (registered.includes(eventId)) {
      registerBtn.textContent = "✅ Registered!";
      registerBtn.disabled = true;
      registerBtn.style.background = "#1B6E2E";
    }
    registerBtn.addEventListener("click", function () {
      let registered = JSON.parse(localStorage.getItem("registrations")) || [];
      if (registered.includes(eventId)) {
        alert("You have already registered for this event!");
        return;
      }
      registered.push(eventId);
      //Save registrations data in localStorage
      localStorage.setItem(
        "registrations",
        JSON.stringify(registered)
      );
      this.textContent = "✅ Registered!";
      this.disabled = true;
      this.style.background = "#1B6E2E";
      alert("Registration successful!");
    });
  }

}

//Display registered events on My Registrations page

if (document.getElementById("registrations-list")) {

  const registeredIds =
    JSON.parse(localStorage.getItem("registrations")) || [];
  //Find events whose IDs are stored in registrations
  const registeredEvents =
    events.filter(e => registeredIds.includes(e.id));

  const container = document.getElementById("registrations-list");

  if (registeredEvents.length === 0) {

    container.innerHTML =
      "<p>You have not registered for any events yet.</p>";

  } else {

    registeredEvents.forEach(event => {

      const item = document.createElement("article");

      item.className = "event-card";

      item.innerHTML = `
        <h3>${event.name}</h3>
        <p>${event.date} — ${event.venue}</p>
      `;

      container.appendChild(item);

    });

  }

}
//Display error message below the corresponding field
function showError(id, message) {
  document.getElementById(id).textContent = message;
}

//Validate Add Event form fields
if (document.getElementById("add-event-form")) {

  document.getElementById("add-event-form")
    .addEventListener("submit", function (e) {

      e.preventDefault();

      document.getElementById("name-error").textContent = "";
      document.getElementById("cat-error").textContent = "";
      document.getElementById("date-error").textContent = "";
      document.getElementById("time-error").textContent = "";
      document.getElementById("venue-error").textContent = "";
      document.getElementById("desc-error").textContent = "";
      document.getElementById("organiser-error").textContent = "";
      document.getElementById("email-error").textContent = "";
      const name =
        document.getElementById("event-name").value.trim();

      const category =
        document.getElementById("category").value;

      const date =
        document.getElementById("event-date").value;
      const time =
        document.getElementById("time").value;
      const venue =
        document.getElementById("venue").value.trim();
      const description =
        document.getElementById("description").value.trim();
      const organiserName =
        document.getElementById("organiser-name").value.trim();
      const organiserEmail =
        document.getElementById("organiser-email").value.trim();

      //Track whether all form fields pass validation
      let isValid = true;
      if (!name) {
        showError("name-error", "Event name is required");
        isValid = false;
      }

      if (!category) {
        showError("cat-error", "Please select a category");
        isValid = false;
      }

      if (!date) {
        showError("date-error", "Date is required");
        isValid = false;
      }
      if (!time) {
        showError("time-error", "Time is required");
        isValid = false;
      }

      if (!venue) {
        showError("venue-error", "Venue is required");
        isValid = false;
      }

      if (description.length < 20) {
        showError("desc-error", "Min 20 characters");
        isValid = false;
      }

      if (!organiserName) {
        showError("organiser-error", "Organiser-Name is required");
        isValid = false;
      }
      if (!organiserEmail) {
        showError("email-error", "Email is required");
        isValid = false;
      }
      //Stop from submission if any field is invalid
      if (!isValid) {
        return;
      }

      const saved =
        JSON.parse(localStorage.getItem("customEvents")) || [];
      //Add the new event to the saved events array
      saved.push({
        id: Date.now(),
        name,
        category,
        date,
        venue,
        description
      });
      //Save newly added events in localStorage
      localStorage.setItem(
        "customEvents",
        JSON.stringify(saved)
      );

      alert("Event added successfully!");

      this.reset();

    });

}

