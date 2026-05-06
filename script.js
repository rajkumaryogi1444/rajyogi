/* ══════════════════════════════════════════════
   HOTEL HEAVEN — JAVASCRIPT
   ══════════════════════════════════════════════

/* ─────────────────────────────────────────────
   1. EDITABLE CONTENT
───────────────────────────────────────────── */

const HOTEL = {
  name:        "Hotel Heaven",
  tagline:     "Comfortable Stay",
  location:    "S-3 complex, Basant vihar, Anand Vihar Colony, Suratgarh, Rajasthan 335804",
  established: "Since many years",
  phone:       "+91 9829864040",
  email:       "hello@hotelheaven@gmail.comn",
  address:     "S-3 complex, Basant vihar, Anand Vihar Colony, Suratgarh, Rajasthan 335804",
  gps:         "29.330427156811773, 73.90177522487238",
  mapsUrl:     "https://maps.app.goo.gl/964n8E4ssHbr5Kyn6",
};

const ROOMS = [
  {
    id: 1,
    name:     "Room 1",
    price:    "₹2,000/night",
    mood:     "Cozy & Warm",
    vibe:     "Forest retreat",
    features: ["King Bed", "Private Balcony", "Rain Shower", "Free WiFi"],
    img:      "room1.jpg",
  },
  {
    id: 2,
    name:     "Room 2",
    price:    "₹2,500/night",
    mood:     "Minimal & Serene",
    vibe:     "Peace & quiet",
    features: ["Queen Bed", "Garden View", "Rainfall Shower", "Reading Nook", "Free WiFi"],
    img:      "room2.jpeg",
  },
  {
    id: 3,
    name:     "Room 3",
    price:    "₹3,000/night",
    mood:     "Earthy & Bold",
    vibe:     "Desert warmth",
    features: ["King Bed", "Rooftop Deck", "Butler Service"],
    img:      "room3.jpeg",
  },
  {
    id: 4,
    name:     "Room 4",
    price:    "₹4,000/night",
    mood:     "Fresh & Airy",
    vibe:     "Nature lover",
    features: ["Queen Bed", "Outdoor Shower", "Free WiFi"],
    img:      "room4.jpg",
  },
];


/* ─────────────────────────────────────────────
   2. STATE
───────────────────────────────────────────── */
let activeMood    = "All Moods";
let selectedRoom  = null;

/* ─────────────────────────────────────────────
   3. RENDER ROOMS
───────────────────────────────────────────── */
function renderRooms() {
  const grid = document.getElementById("roomsGrid");
  const rooms = activeMood === "All Moods"
    ? ROOMS
    : ROOMS.filter(r => r.mood === activeMood);

  grid.innerHTML = rooms.map(room => `
    <div class="room-card" data-id="${room.id}">
      <div class="room-card-img-wrap">
        <img src="${room.img}" alt="${room.name}" loading="lazy" />
        <div class="room-card-overlay"></div>
        <div class="room-card-inner">
          <div class="room-card-vibe">${room.vibe}</div>
          <div class="room-card-name">${room.name}</div>
          <div class="room-card-footer">
            <span class="room-card-price">${room.price}</span>
            <span class="room-card-btn">See Room →</span>
          </div>
        </div>
      </div>
      <div class="room-card-meta">
        <div class="room-card-title-below">${room.name}</div>
        <div class="room-card-mood">${room.mood} · ${room.price}</div>
      </div>
    </div>
  `).join("");

  // Attach click handlers
  grid.querySelectorAll(".room-card").forEach(card => {
    card.addEventListener("click", () => {
      const id   = parseInt(card.dataset.id);
      const room = ROOMS.find(r => r.id === id);
      openModal(room);
    });
  });
}

/* ─────────────────────────────────────────────
   4. RENDER FOOD
───────────────────────────────────────────── */
function renderFood() {
  document.getElementById("foodGrid").innerHTML = FOOD_MENU.map(item => `
    <div class="food-card">
      <img src="${item.img}" alt="${item.name}" class="food-card-img" loading="lazy" />
      <div class="food-card-body">
        <div class="food-card-name">${item.name}</div>
        <div class="food-card-desc">${item.desc}</div>
        <div class="food-card-price">${item.price}</div>
      </div>
    </div>
  `).join("");
}

/* ─────────────────────────────────────────────
   5. MODAL
───────────────────────────────────────────── */
function openModal(room) {
  selectedRoom = room;
  document.getElementById("modalImg").src         = room.img;
  document.getElementById("modalImg").alt         = room.name;
  document.getElementById("modalVibe").textContent  = room.vibe;
  document.getElementById("modalName").textContent  = room.name;
  document.getElementById("modalMood").textContent  = room.mood;
  document.getElementById("modalPrice").textContent = room.price;
  document.getElementById("modalFeatures").innerHTML = room.features
    .map(f => `<span class="modal-feature-tag">${f}</span>`)
    .join("");
  document.getElementById("modalBackdrop").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalBackdrop").classList.remove("open");
  document.body.style.overflow = "";
  selectedRoom = null;
}

/* ─────────────────────────────────────────────
   6. TOAST
───────────────────────────────────────────── */
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

/* ─────────────────────────────────────────────
   7. MOOD FILTER
───────────────────────────────────────────── */
function setMood(mood) {
  activeMood = mood;
  document.querySelectorAll(".filter-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === mood);
  });
  renderRooms();
}

/* ─────────────────────────────────────────────
   8. INIT & EVENT LISTENERS
───────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {

  // Set footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Initial render
  renderRooms();
  renderFood();

  // Mood filter tabs
  document.getElementById("moodFilters").addEventListener("click", e => {
    if (e.target.classList.contains("filter-tab")) {
      setMood(e.target.dataset.filter);
    }
  });

  // Hero mood pills — scroll to rooms & filter
  document.querySelectorAll(".hero-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      setMood(pill.dataset.mood);
      document.getElementById("rooms").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Modal close button
  document.getElementById("modalCloseBtn").addEventListener("click", closeModal);

  // Close modal on backdrop click
  document.getElementById("modalBackdrop").addEventListener("click", e => {
    if (e.target === document.getElementById("modalBackdrop")) closeModal();
  });

  // Close modal on Escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  // Modal enquire button
  document.getElementById("modalEnquireBtn").addEventListener("click", () => {
    const name = selectedRoom ? selectedRoom.name : "";
    closeModal();
    showToast(`Enquiry noted for "${name}" — see contact form below.`);
    setTimeout(() => {
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    }, 400);
  });

  // Enquiry form submit
  document.getElementById("enquiryForm").addEventListener("submit", e => {
    e.preventDefault();
    const success = document.getElementById("formSuccess");
    success.style.display = "block";
    e.target.reset();
    setTimeout(() => { success.style.display = "none"; }, 5000);
  });

  // Hamburger / mobile nav
  document.getElementById("hamburger").addEventListener("click", () => {
    document.getElementById("mobileNav").classList.add("open");
  });
  document.getElementById("mobileNavClose").addEventListener("click", () => {
    document.getElementById("mobileNav").classList.remove("open");
  });
  document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("mobileNav").classList.remove("open");
    });
  });

});
