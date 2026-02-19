// script.js - РАБОЧАЯ ВЕРСИЯ

// 1. Летающие сердечки
function createFloatingHearts() {
  // Проверяем, есть ли уже контейнер
  if (document.querySelector('.hearts-container')) return;
  
  const container = document.createElement('div');
  container.className = 'hearts-container';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  `;
  document.body.appendChild(container);

  // Добавляем стили анимации, если их нет
  if (!document.querySelector('#heartKeyframes')) {
    const style = document.createElement('style');
    style.id = 'heartKeyframes';
    style.innerHTML = `
      @keyframes floatHeart {
        0% { transform: translate(0,0) rotate(0deg); }
        25% { transform: translate(30px, -30px) rotate(5deg); }
        50% { transform: translate(-20px, 20px) rotate(-5deg); }
        75% { transform: translate(20px, 30px) rotate(3deg); }
        100% { transform: translate(0,0) rotate(0deg); }
      }
    `;
    document.head.appendChild(style);
  }

  // Создаём сердечки
  const heartCount = 20;
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
    `;
    container.appendChild(heart);
  }
}

// 3. Загадка для фото
function setupPhotoQuiz() {
  const overlay = document.getElementById('quizOverlay');
  const photoGrid = document.querySelector('.photo-grid');
  const options = document.querySelectorAll('.quiz-option');
  
  if (!overlay) return;

  // Правильный ответ
  const correctAnswer = 'дружба';

  options.forEach(opt => {
    opt.addEventListener('click', function() {
      if (this.dataset.value === correctAnswer) {
        // Правильно - убираем оверлей и показываем фото
        overlay.style.display = 'none';
        if (photoGrid) photoGrid.style.display = 'grid';
      } else {
        alert('❌ Не угадала! Попробуй ещё раз.');
      }
    });
  });
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', function() {
  createFloatingHearts();
  // setupRunawayButton();  // ← закомментировали или удалили
  setupPhotoQuiz();
  typeWriterEffect();   // если есть
  setupAudio();         // если есть
});
