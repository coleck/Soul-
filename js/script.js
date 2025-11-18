let currentStage = 0;
const stages = document.querySelectorAll(".main-content-stage");
const sliderDots = document.querySelector(".slaider");

// Баллы для архетипов
let userScores = {
  dreamer: 0,
  aesthetic: 0,
  analyst: 0,
  detective: 0,
  seeker: 0,
  intuitive: 0,
};

// Баллы для каждой картинки
const imageScores = {
  1: { seeker: 2, aesthetic: 1 },
  2: { aesthetic: 3, dreamer: 1 },
  5: { analyst: 2, intuitive: 1, dreamer: 1 },
  7: { seeker: 2, detective: 1, intuitive: 1 },
  8: { dreamer: 3, aesthetic: 1 },
  9: { analyst: 2, seeker: 1 },
  3: { detective: 2, analyst: 2 },
  4: { dreamer: 2, aesthetic: 2 },
  6: { aesthetic: 2, intuitive: 2 },
};

function updateProgress(currentStage) {
  const progressFilled = document.getElementById("progress-filled");
  const progressPercent = (currentStage / 3) * 100;
  progressFilled.style.width = progressPercent + "%";
}

function goToSlide(stageIndex) {
  if (stages[currentStage]) {
    stages[currentStage].classList.remove("active");
    stages[currentStage].classList.add("prev");
  }

  if (stages[stageIndex]) {
    stages[stageIndex].classList.add("active");
    stages[stageIndex].classList.remove("prev");
    currentStage = stageIndex;
  }

  updateSliderDots(stageIndex);
  updateProgress(stageIndex);

  // Если переходим на результат (4й слайд) - показываем результат и перенаправляем
  if (stageIndex === 3) {
    setTimeout(() => {
      showFinalResult();
      // Автоматический переход на total.html через 2 секунды
      setTimeout(() => {
        const archetype = determineArchetype();
        window.location.href = `total.html?archetype=${archetype}`;
      }, 2000);
    }, 500);
  }
}

function selectImage(imageId) {
  // Добавляем баллы за выбранную картинку
  const points = imageScores[imageId];
  for (let archetype in points) {
    userScores[archetype] += points[archetype];
  }

  // Переход к следующему слайду
  const nextSlide = currentStage + 1;
  if (nextSlide < stages.length) {
    setTimeout(() => goToSlide(nextSlide), 300);
  }
}

function determineArchetype() {
  let maxScore = -1;
  let finalArchetype = "analyst";

  for (let archetype in userScores) {
    if (userScores[archetype] > maxScore) {
      maxScore = userScores[archetype];
      finalArchetype = archetype;
    }
  }
  return finalArchetype;
}

function showFinalResult() {
  const archetype = determineArchetype();
  const resultElement = document.getElementById("archetype-result");
  if (resultElement) {
    resultElement.textContent = archetype.charAt(0).toUpperCase() + archetype.slice(1);
    resultElement.style.fontSize = "48px";
    resultElement.style.color = "#4251D2";
    resultElement.style.margin = "30px 0";
  }
}

function updateSliderDots(currentIndex) {
  if (sliderDots) {
    const dots = ["•", "• •", "• • •", "• • • •"];
    sliderDots.textContent = dots[currentIndex] || "•";
  }
}

// Инициализация
document.addEventListener("DOMContentLoaded", function () {
  if (stages[0]) {
    stages[0].classList.add("active");
  }
  updateSliderDots(0);
  updateProgress(0);
});

// В функции selectImage добавь оптимизацию для тач-устройств
function selectImage(imageId) {
    // Добавляем баллы за выбранную картинку
    const points = imageScores[imageId];
    for (let archetype in points) {
        userScores[archetype] += points[archetype];
    }

    // Визуальная обратная связь для мобильных
    event.target.style.transform = 'scale(0.95)';
    setTimeout(() => {
        event.target.style.transform = 'scale(1)';
    }, 150);

    // Переход к следующему слайду
    const nextSlide = currentStage + 1;
    if (nextSlide < stages.length) {
        setTimeout(() => goToSlide(nextSlide), 300);
    }
}