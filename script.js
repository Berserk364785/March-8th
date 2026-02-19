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

  const container = btn.closest('.button-container');
  if (!container) return;

  // Устанавливаем позиционирование для кнопки
  btn.style.position = 'absolute';
  btn.style.left = '50%';
  btn.style.top = '50%';
  btn.style.transform = 'translate(-50%, -50%)';
  btn.style.transition = 'left 0.2s ease, top 0.2s ease';

  // Функция для случайного перемещения кнопки внутри контейнера
  function moveButtonRandomly() {
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const maxLeft = containerRect.width - btnRect.width;
    const maxTop = containerRect.height - btnRect.height;

    // Генерируем случайные координаты, чтобы кнопка не выходила за границы
    const newLeft = Math.max(0, Math.min(maxLeft, Math.random() * maxLeft));
    const newTop = Math.max(0, Math.min(maxTop, Math.random() * maxTop));

    btn.style.left = newLeft + 'px';
    btn.style.top = newTop + 'px';
    btn.style.transform = 'none';
  }

  // Счётчик кликов
  let clickCount = 0;

  // Обработчик клика
  btn.addEventListener('click', function(e) {
    e.preventDefault(); // не переходим сразу по ссылке

    if (clickCount < 2) {
      // Первые два клика — убегаем и показываем сообщение
      clickCount++;
      moveButtonRandomly();
      alert('Не поймала! Лови ещё!');
    } else {
      // На третий клик — переходим на страницу с фото
      window.location.href = 'photos.html';
    }
  });

  // Для мобильных устройств убираем поведение при наведении, 
  // оставляем только логику кликов
  // Если хочешь оставить прыжки при наведении на ПК — раскомментируй строки ниже
  /*
  btn.addEventListener('mouseenter', function() {
    if (clickCount < 2) {
      moveButtonRandomly();
    }
  });
  */
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
