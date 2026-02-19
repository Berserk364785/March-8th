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

  let isFlying = false;        // стала ли кнопка «летающей»
  let clickCount = 0;

  // Функция получения случайных координат в пределах окна
  function getRandomPosition() {
    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;
    const maxLeft = window.innerWidth - btnWidth;
    const maxTop = window.innerHeight - btnHeight;
    const left = Math.max(0, Math.min(maxLeft, Math.random() * maxLeft));
    const top = Math.max(0, Math.min(maxTop, Math.random() * maxTop));
    return { left, top };
  }

  // Превращаем кнопку в «летающую» (fixed) и перемещаем
  function makeFlyAndMove() {
    if (!isFlying) {
      // Запоминаем текущие координаты кнопки относительно окна
      const rect = btn.getBoundingClientRect();
      btn.style.position = 'fixed';
      btn.style.left = rect.left + 'px';
      btn.style.top = rect.top + 'px';
      btn.style.width = btn.offsetWidth + 'px'; // фиксируем ширину
      btn.style.margin = '0'; // убираем возможные внешние отступы
      isFlying = true;
    }
    // Перемещаем в случайное место
    const { left, top } = getRandomPosition();
    btn.style.left = left + 'px';
    btn.style.top = top + 'px';
  }

  // Обработчик клика (и для мыши, и для касания)
  function handleActivation(e) {
    e.preventDefault(); // не переходим сразу

    if (!isFlying) {
      // Первый клик – делаем кнопку летающей и сразу перемещаем
      makeFlyAndMove();
      clickCount = 1; // считаем, что это был первый клик
      alert('Не поймала! Лови ещё!');
      return;
    }

    // Если уже летает
    if (clickCount < 2) {
      clickCount++;
      const { left, top } = getRandomPosition();
      btn.style.left = left + 'px';
      btn.style.top = top + 'px';
      alert('Не поймала! Лови ещё!');
    } else {
      // Третий клик – переход
      window.location.href = 'photos.html';
    }
  }

  // Навешиваем обработчики
  btn.addEventListener('click', handleActivation);
  btn.addEventListener('touchstart', handleActivation, { passive: false });
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
