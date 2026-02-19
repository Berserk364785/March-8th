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

  btn.style.position = 'absolute';
  btn.style.left = '50%';
  btn.style.top = '50%';
  btn.style.transform = 'translate(-50%, -50%)';
  btn.style.transition = 'left 0.2s ease, top 0.2s ease';

  // Функция перемещения
  function moveButtonRandomly() {
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const maxLeft = containerRect.width - btnRect.width;
    const maxTop = containerRect.height - btnRect.height;

    const newLeft = Math.max(0, Math.min(maxLeft, Math.random() * maxLeft));
    const newTop = Math.max(0, Math.min(maxTop, Math.random() * maxTop));

    btn.style.left = newLeft + 'px';
    btn.style.top = newTop + 'px';
    btn.style.transform = 'none';
  }

  // Для ПК – при наведении
  btn.addEventListener('mouseenter', moveButtonRandomly);

  // Для мобильных – при касании
  btn.addEventListener('touchstart', function(e) {
    e.preventDefault(); // предотвращаем всплытие, чтобы сразу не переходило
    moveButtonRandomly();
  });

  // При клике (когда поймали)
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    alert('🎉 Теперь лови! 🎉');
    window.location.href = 'photos.html';
  });

  // Для мобильных – дополнительно обрабатываем touchend, чтобы клик сработал после отпускания
  btn.addEventListener('touchend', function(e) {
    e.preventDefault();
    // Если хотим, чтобы переход происходил после отпускания, но тогда кнопка уже прыгнула
    // можно просто разрешить переход, но с проверкой, что это не просто касание
    // Лучше оставить логику на click, он срабатывает после touchend
  });
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
