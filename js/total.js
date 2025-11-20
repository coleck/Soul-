// Объект с ссылками для каждого архетипа
const archetypeLinks = {
  analyst: {
    movie: "https://www.kinopoisk.ru/film/397667/",
    route: "https://yandex.ru/maps/-/CLG3RV39",
    playlist:
      "https://music.yandex.ru/playlists/89b3674a-8540-9cf3-25cb-8882a8f84158?utm_source=desktop&utm_medium=copy_link",
  },
  dreamer: {
    movie: "https://www.kinopoisk.ru/film/841081/",
    route: "https://yandex.ru/maps/-/CLG3fVJe",
    playlist:
      "https://music.yandex.ru/playlists/54bfc6de-1963-848d-d2e9-f5f8a847a915?utm_source=desktop&utm_medium=copy_link",
  },
  aesthetic: {
    movie: "https://www.kinopoisk.ru/film/17721/",
    route: "https://yandex.ru/maps/-/CLG36DZz",
    playlist:
      "https://music.yandex.ru/playlists/326e2039-4c6e-b20b-8d61-a3c6ba4609b3?utm_source=desktop&utm_medium=copy_link",
  },
  detective: {
    movie: "https://www.kinopoisk.ru/film/958442/",
    route: "https://yandex.ru/maps/-/CLG3ZW1a",
    playlist:
      "https://music.yandex.ru/playlists/8c73db93-7005-7fb5-787c-f2f393d2f8b3?utm_source=desktop&utm_medium=copy_link",
  },
  intuitive: {
    movie: "https://www.kinopoisk.ru/film/43911/",
    route: "https://yandex.ru/maps/-/CLG3FZMF",
    playlist:
      "https://music.yandex.ru/playlists/c4bd61a3-b753-1cd5-2ba3-2475e70886fe?utm_source=desktop&utm_medium=copy_link",
  },
  seeker: {
    movie: "https://www.kinopoisk.ru/film/454522/",
    route: "https://yandex.ru/maps/-/CLG3J09Q",
    playlist:
      "https://music.yandex.ru/playlists/fa257a8f-78d7-5f54-6fea-935ffc3c5dfa?utm_source=desktop&utm_medium=copy_link",
  },
};

// Функция для получения параметра из URL
function getUrlParameter(name) {
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(window.location.search);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Функция для обновления ссылок в зависимости от архетипа
function updateRecommendationLinks(archetype) {
  const links = archetypeLinks[archetype] || archetypeLinks.analyst;

  const movieBlock = document.querySelector(".score_movie");
  const routeBlock = document.querySelector(".score_route");
  const playlistBlock = document.querySelector(".score_playlist");

  if (movieBlock) movieBlock.setAttribute("data-link", links.movie);
  if (routeBlock) routeBlock.setAttribute("data-link", links.route);
  if (playlistBlock) playlistBlock.setAttribute("data-link", links.playlist);
}

// Обработчики для блоков рекомендаций (универсальные)
function setupRecommendationHandlers() {
  const movieBlock = document.querySelector(".score_movie");
  const routeBlock = document.querySelector(".score_route");
  const playlistBlock = document.querySelector(".score_playlist");

  const handleClick = function () {
    const link = this.getAttribute("data-link");
    if (link) {
      window.open(link, "_blank");
    }
  };

  if (movieBlock) movieBlock.addEventListener("click", handleClick);
  if (routeBlock) routeBlock.addEventListener("click", handleClick);
  if (playlistBlock) playlistBlock.addEventListener("click", handleClick);
}

// Текущий отображаемый архетип
let currentArchetype = "";

// Показываем соответствующий архетип при загрузке
document.addEventListener("DOMContentLoaded", function () {
  const archetype = getUrlParameter("archetype") || "analyst";
  currentArchetype = archetype;

  // Обновляем ссылки для текущего архетипа
  updateRecommendationLinks(archetype);

  // Настраиваем обработчики
  setupRecommendationHandlers();

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
