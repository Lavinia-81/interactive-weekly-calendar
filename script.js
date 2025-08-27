document.addEventListener("DOMContentLoaded", () => {
  // Element references
  const monthSelect = document.getElementById("month-select");
  const yearSelect = document.getElementById("year-select");
  const calendarBody = document.querySelector("#calendar tbody");
  const quoteEl = document.getElementById("quote");
  const changeQuoteBtn = document.getElementById("change-quote");
  const themeSelect = document.getElementById("theme-select");
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");
  const moonPhaseEl = document.getElementById("moon-phase");
  
  const navDay = document.getElementById("nav-day");
  const navMonth = document.getElementById("nav-month");
  const navDateNum = document.getElementById("nav-date-num");
  const navYear = document.getElementById("nav-year");
  const navClock = document.getElementById("nav-clock");

  const themeClasses = [
    "theme-default",
    "theme-blue",
    "theme-pink",
    "theme-green",
    "theme-gold",
    "theme-dark",
    "theme-img1",
    "theme-img2",
    "theme-img3",
    "theme-img4",
    "theme-img5",
    "theme-img6",
    "theme-img7",
    "theme-img8",
    "theme-img9",
    "theme-img10"
  ];

   // Theme change
  themeSelect.addEventListener("change", () => {
  document.body.classList.remove(...themeClasses);
  document.querySelector(".navbar").classList.remove(...themeClasses);
  document.querySelector(".footer").classList.remove(...themeClasses);
  menu.classList.remove(...themeClasses);

  const selectedTheme = "theme-" + themeSelect.value;

  document.body.classList.add(selectedTheme);
  document.querySelector(".navbar").classList.add(selectedTheme);
  document.querySelector(".footer").classList.add(selectedTheme);
  menu.classList.add(selectedTheme);

  localStorage.setItem("selectedTheme", selectedTheme);
});
  

  const quotes = [
    "Your journey begins with clarity.",
    "Small steps lead to big results.",
    "Focus fuels progress.",
    "You’ve got this — every single day.",
    "Plan smart. Learn deep. Stay inspired.",
    "Time is not a line, it’s a rhythm. Find your beat",
    "Each day is a note in your symphony — play it with intention.",
    "The moon doesn’t rush. It waxes, wanes, and always returns.",
    "The week begins not with pressure, but with possibility.",
    "Create like the moon — in phases, with grace.",
    "You don’t need permission to shine.",
    "Even the stars take time to align.",
    "Progress is invisible until it’s undeniable.",
    "You don’t need to do everything — just the next right thing.",
    "Small steps, taken daily, build empires quietly."
  ];

  // Load saved preferences
  const savedTheme = localStorage.getItem("selectedTheme");
if (savedTheme) {
  document.body.classList.add(savedTheme);
  document.querySelector(".navbar").classList.add(savedTheme);
  document.querySelector(".footer").classList.add(savedTheme);
  menu.classList.add(savedTheme);
  themeSelect.value = savedTheme.replace("theme-", "");
}

  const savedMonth = localStorage.getItem("selectedMonth");
  const savedYear = localStorage.getItem("selectedYear");
  const savedQuote = localStorage.getItem("selectedQuote");
  if (savedQuote) quoteEl.textContent = savedQuote;


  // Populate selectors
  function populateSelectors() {
    for (let m = 0; m < 12; m++) {
      const option = document.createElement("option");
      option.value = m;
      option.text = new Date(2025, m).toLocaleString("default", { month: "long" });
      monthSelect.appendChild(option);
    }

    for (let y = 2020; y <= 2030; y++) {
      const option = document.createElement("option");
      option.value = y;
      option.text = y;
      yearSelect.appendChild(option);
    }

    monthSelect.value = savedMonth || new Date().getMonth();
    yearSelect.value = savedYear || new Date().getFullYear();
  }

  // Render calendar
  function renderCalendar(month, year) {
    calendarBody.innerHTML = "";
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    let date = 1;
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");
        if (i === 0 && j < firstDay) {
          cell.textContent = "";
        } else if (date > daysInMonth) {
          break;
        } else {
          cell.textContent = date;
          if (
            date === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
          ) {
            cell.classList.add("today");
          }
          date++;
        }
        row.appendChild(cell);
      }
      calendarBody.appendChild(row);
    }
  }

  // Update navbar clock and date
  function updateNavBar() {
    const now = new Date();
    if (navDay) navDay.textContent = now.toLocaleDateString("en", { weekday: "long" });
    if (navMonth) navMonth.textContent = now.toLocaleDateString("en", { month: "long" });
    if (navDateNum) navDateNum.textContent = now.getDate();
    if (navYear) navYear.textContent = now.getFullYear();
    if (navClock) navClock.textContent = now.toLocaleTimeString();
  }

  setInterval(updateNavBar, 1000);
  updateNavBar();

  // Moon phase
  function getMoonPhase(date = new Date()) {
    const lunarCycle = 29.530588853;
    const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14));
    const diff = (date.getTime() - knownNewMoon.getTime()) / 1000 / 86400;
    const phase = diff % lunarCycle;

    if (phase < 1.84566) return "🌑 New Moon";
    else if (phase < 5.53699) return "🌒 Waxing Crescent";
    else if (phase < 9.22831) return "🌓 First Quarter";
    else if (phase < 12.91963) return "🌔 Waxing Gibbous";
    else if (phase < 16.61096) return "🌕 Full Moon";
    else if (phase < 20.30228) return "🌖 Waning Gibbous";
    else if (phase < 23.99361) return "🌗 Last Quarter";
    else if (phase < 27.68493) return "🌘 Waning Crescent";
    else return "🌑 New Moon";
  }

  if (moonPhaseEl) {
    const phase = getMoonPhase();
    moonPhaseEl.textContent = "Moon Phase: " + phase;
    localStorage.setItem("moonPhase", phase);
  }

  // Quote change
  changeQuoteBtn.addEventListener("click", () => {
    const random = Math.floor(Math.random() * quotes.length);
    const newQuote = quotes[random];
    quoteEl.textContent = newQuote;
    localStorage.setItem("selectedQuote", newQuote);
  });

 
  // Export PDF with menu hiden/shown
  document.getElementById("export-pdf").addEventListener("click", () => {
  menu.classList.add("hidden");

  setTimeout(() => {
    window.print();
    setTimeout(() => {
      menu.classList.remove("hidden");
    }, 1000);
  }, 100);
  });
  

  // Hamburger menu toggle
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  // Month/year change
  monthSelect.addEventListener("change", () => {
    localStorage.setItem("selectedMonth", monthSelect.value);
    renderCalendar(+monthSelect.value, +yearSelect.value);
  });

  yearSelect.addEventListener("change", () => {
    localStorage.setItem("selectedYear", yearSelect.value);
    renderCalendar(+monthSelect.value, +yearSelect.value);
  });

  // Export PDF (simplified)
  document.getElementById("export-pdf").addEventListener("click", () => {
    window.print();
    
  });

  // Init
  populateSelectors();
  renderCalendar(+monthSelect.value, +yearSelect.value);
});

// Update footer year dynamically
document.getElementById("year").textContent = new Date().getFullYear();