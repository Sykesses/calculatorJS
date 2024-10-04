// Звук клика
const clickSound = new Audio("Button_click_sound.mp3"); // Загрузите звуковой файл 'click.mp3' в проект

// Элементы
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

// Переменные для расчёта
let currentInput = "0";
let firstOperand = null;
let secondOperand = null;
let operator = null;
let shouldResetDisplay = false; // Флаг для сброса дисплея

// Обновление дисплея
function updateDisplay() {
  display.textContent = currentInput;
}

// Функция для расчета
function calculate() {
  if (operator && firstOperand !== null && secondOperand !== null) {
    switch (operator) {
      case "+":
        currentInput = (
          parseFloat(firstOperand) + parseFloat(secondOperand)
        ).toString();
        break;
      case "-":
        currentInput = (
          parseFloat(firstOperand) - parseFloat(secondOperand)
        ).toString();
        break;
      case "*":
        currentInput = (
          parseFloat(firstOperand) * parseFloat(secondOperand)
        ).toString();
        break;
      case "/":
        currentInput = (
          parseFloat(firstOperand) / parseFloat(secondOperand)
        ).toString();
        break;
    }
    updateDisplay();
  }
}

// Обработчик кнопок
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    clickSound.play(); // Проигрываем звук при каждом нажатии

    const value = button.getAttribute("data-value");

    if (value === "clear") {
      currentInput = "0";
      firstOperand = null;
      secondOperand = null;
      operator = null;
      shouldResetDisplay = false;
      updateDisplay();
      return;
    }

    if (["+", "-", "*", "/"].includes(value)) {
      if (operator && firstOperand !== null) {
        secondOperand = currentInput;
        calculate();
        firstOperand = currentInput;
      } else {
        firstOperand = currentInput;
      }
      operator = value;
      shouldResetDisplay = true;
      return;
    }

    if (value === "=") {
      if (operator) {
        secondOperand = currentInput;
        calculate();
        operator = null;
      }
      shouldResetDisplay = true;
      return;
    }

    // Если нужно сбросить дисплей перед началом нового ввода, обнуляем currentInput
    if (shouldResetDisplay) {
      currentInput = "";
      shouldResetDisplay = false;
    }

    if (value === "." && currentInput.includes(".")) return;

    if (currentInput === "0") {
      currentInput = value;
    } else {
      currentInput += value;
    }

    updateDisplay();
  });
});

// Начальное значение дисплея
updateDisplay();
