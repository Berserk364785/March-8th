// script.js

// 1. Летающие сердечки
function createFloatingHearts() {
  const container = document.createElement('div');
  container.className = 'hearts-container';
  document.body.appendChild(container);

  const heartCount = 25;
  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `
      position: absolute;
      font-size: ${Math.random() * 30 + 20}px;
      opacity: ${Math.random() * 0.5 + 0.2};
      color: #ff99cc;
      text-shadow: 0 0 15px #ff4da6;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: floatHeart ${Math.random() * 20 + 15}s linear infinite;
      transform: translate(0, 0);
    `;
    container.appendChild(heart);
  }

  // Если анимация ещё не добавлена в CSS, добавим через style
  if (!document.querySelector('#heartKeyframes')) {
    const style = document.createElement('style');
    style.id = 'heartKeyframes';
    style.innerHTML = `
      @keyframes floatHeart {
        0% { transform: translate(0,0) rotate(0deg); }
        25% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) rotate(${Math.random() * 15 - 7}deg); }
        50% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) rotate(${Math.random() * 15 - 7}deg); }
        75% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) rotate(${Math.random() * 15 - 7}deg); }
        100% { transform: translate(0,0) rotate(0deg); }
      }
    `;
    document.head.appendChild(style);
  }
}

// 2. Убегающая кнопка на странице стиха
function setupRunawayButton() {
  const btn = document.getElementById('runawayBtn');
  if (!btn) return;

  // Начальное положение (центр экрана)
  btn.style.left = '50%';
  btn.style.top = '50%';
  btn.style.transform = 'translate(-50%, -50%)';

  // Функция для получения безопасных координат
  function getRandomPosition() {
    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;

    const maxLeft = window.innerWidth - btnWidth;
    const maxTop = window.innerHeight - btnHeight;

    // Генерируем случайные координаты в пределах видимой области
    const left = Math.max(0, Math.min(maxLeft, Math.random() * maxLeft));
    const top = Math.max(0, Math.min(maxTop, Math.random() * maxTop));

    return { left, top };
  }

  // Перемещение кнопки
  function moveButton() {
    const { left, top } = getRandomPosition();
    btn.style.left = left + 'px';
    btn.style.top = top + 'px';
    btn.style.transform = 'none'; // убираем центрирование
  }

  // Счётчик кликов
  let clickCount = 0;

  // Обработчик клика
  btn.addEventListener('click', function(e) {
    e.preventDefault(); // не переходим сразу

    if (clickCount < 2) { // первые два клика – убегает
      clickCount++;
      moveButton();
      alert('Не поймала! Лови ещё!');
    } else { // третий клик – переход
      window.location.href = 'photos.html';
    }
  });

  // Для мобильных – чтобы при касании тоже считалось и убегало
  btn.addEventListener('touchstart', function(e) {
    e.preventDefault(); // предотвращаем всплытие
    // Можно вызывать ту же логику, но осторожно: touchstart может сработать раньше click
    // Поэтому оставим только click, а touchstart просто блокируем стандартное поведение
  }, { passive: false });
}

// 3. Загадка на странице фото
function setupPhotoQuiz() {
  const overlay = document.getElementById('quizOverlay');
  const photoGrid = document.querySelector('.photo-grid');
  const options = document.querySelectorAll('.quiz-option');
  const correct = 'дружба'; // правильный ответ

  if (!overlay) return;

  options.forEach(opt => {
    opt.addEventListener('click', function() {
      if (this.dataset.value === correct) {
        // Правильно: убираем оверлей и показываем галерею
        overlay.style.display = 'none';
        if (photoGrid) photoGrid.style.display = 'grid';
      } else {
        // Неправильно: пробуй снова
        alert('❌ Не угадала! Попробуй ещё раз.');
      }
    });
  });
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  createFloatingHearts();

  // Запускаем функции в зависимости от наличия элементов
  if (document.getElementById('runawayBtn')) {
    setupRunawayButton();
  }

  if (document.getElementById('quizOverlay')) {
    setupPhotoQuiz();
  }
});
