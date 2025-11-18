// Функция для получения параметра из URL
function getUrlParameter(name) {
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(window.location.search);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Текущий отображаемый архетип
let currentArchetype = "";

// Показываем соответствующий архетип при загрузке
document.addEventListener("DOMContentLoaded", function () {
  const archetype = getUrlParameter("archetype") || "analyst";
  currentArchetype = archetype;

  // Показываем контейнер с нужным архетипом
  const targetArchetypeContainer = document.getElementById(archetype);
  if (targetArchetypeContainer) {
    targetArchetypeContainer.style.display = "block";
  } else {
    // Если архетип не найден, показываем аналиста по умолчанию
    document.getElementById("analyst").style.display = "block";
    currentArchetype = "analyst";
  }

  // Обработчики для кнопки "Next" в каждом контейнере архетипа
  const nextButtons = document.querySelectorAll(".next-to-recommendations");
  nextButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Скрываем все контейнеры с архетипами
      const archetypeContainers = document.querySelectorAll(
        ".archetype-container"
      );
      archetypeContainers.forEach((container) => {
        container.style.display = "none";
      });

      // Показываем контейнер с рекомендациями
      const recommendationsContainer =
        document.getElementById("recommendations");
      if (recommendationsContainer) {
        recommendationsContainer.style.display = "block";
      }
    });
  });

  // Обработчик для кнопки "Back to Archetype"
  const backButton = document.querySelector(".back-to-archetype");
  if (backButton) {
    backButton.addEventListener("click", function () {
      // Скрываем контейнер с рекомендациями
      const recommendationsContainer =
        document.getElementById("recommendations");
      if (recommendationsContainer) {
        recommendationsContainer.style.display = "none";
      }

      // Показываем текущий архетип
      const currentArchetypeContainer =
        document.getElementById(currentArchetype);
      if (currentArchetypeContainer) {
        currentArchetypeContainer.style.display = "block";
      }
    });
  }

  // Обработчики для блоков рекомендаций
  const movieBlock = document.querySelector(".score_movie");
  const routeBlock = document.querySelector(".score_route");
  const playlistBlock = document.querySelector(".score_playlist");

  if (movieBlock) {
    movieBlock.addEventListener("click", function () {
      const link = this.getAttribute("data-link");
      window.open(link, "_blank");
    });
  }

  if (routeBlock) {
    routeBlock.addEventListener("click", function () {
      const link = this.getAttribute("data-link");
      window.open(link, "_blank");
    });
  }

  if (playlistBlock) {
    playlistBlock.addEventListener("click", function () {
      const link = this.getAttribute("data-link");
      window.open(link, "_blank");
    });
  }
});

// Добавь в конец файла обработку тач-событий
document.addEventListener("DOMContentLoaded", function () {
  // ... существующий код ...

  // Оптимизация для мобильных устройств
  if ("ontouchstart" in window) {
    document.body.classList.add("touch-device");
  }

  // Предотвращение масштабирования при двойном тапе
  let lastTouchEnd = 0;
  document.addEventListener(
    "touchend",
    function (event) {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );
});
