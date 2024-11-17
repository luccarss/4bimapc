// script.js
const calendar = document.getElementById("calendar");
const monthDisplay = document.getElementById("month-display");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const medicineInput = document.getElementById("medicine-name");
const saveButton = document.getElementById("save-button");
const selectedDayDisplay = document.getElementById("selected-day");
const medicineList = document.getElementById("medicine-list");

let selectedDay = null;
let currentMonth = 0; // Janeiro é o primeiro mês
let currentYear = 2024;

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

// Gera o calendário do mês atual
function generateCalendar(month, year) {
  calendar.innerHTML = "";
  monthDisplay.textContent = `${months[month]} ${year}`;
  
  const days = daysInMonth(month, year);
  for (let i = 1; i <= days; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.textContent = i;

    // Adiciona evento de clique para selecionar o dia
    day.addEventListener("click", () => {
      if (selectedDay) {
        selectedDay.classList.remove("selected");
      }
      selectedDay = day;
      selectedDay.classList.add("selected");
      selectedDayDisplay.textContent = `Dia selecionado: ${i}`;
    });

    calendar.appendChild(day);
  }
}

// Adiciona remédio à lista
function addMedicineToList(day, medicineName) {
  const listItem = document.createElement("li");
  listItem.textContent = `${day} ${months[currentMonth]}: ${medicineName}`;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remover";
  removeButton.addEventListener("click", () => {
    listItem.remove();
  });

  listItem.appendChild(removeButton);
  medicineList.appendChild(listItem);
}

// Salva o remédio no dia selecionado
saveButton.addEventListener("click", () => {
  if (!selectedDay) {
    alert("Por favor, selecione um dia.");
    return;
  }

  const medicineName = medicineInput.value.trim();
  if (!medicineName) {
    alert("Por favor, insira o nome do remédio.");
    return;
  }

  const dayNumber = selectedDay.textContent;
  addMedicineToList(dayNumber, medicineName);
  medicineInput.value = "";
});

// Navegação de meses
prevMonthBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentMonth, currentYear);
});

// Inicializa o calendário
generateCalendar(currentMonth, currentYear);
