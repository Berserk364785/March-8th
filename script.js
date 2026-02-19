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

// 2. Убегающая кнопка - ПРОСТАЯ И РАБОЧАЯ
function setupRunawayButton() {
  const btn = document.getElementById('runawayBtn');
  if (!btn) return;

  // Делаем кнопку абсолютно позиционированной внутри body
  btn.style.position = 'absolute';
  btn.style.zIndex = '9999';
  
  let clickCount = 0;
  
  // Функция для случайного перемещения по всему экрану
  function moveButtonRandomly() {
    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;
    
    // Учитываем прокрутку страницы
    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;
    
    const maxLeft = window.innerWidth - btnWidth + scrollX;
    const maxTop = window.innerHeight - btnHeight + scrollY;
    
    const newLeft = scrollX + Math.random() * (window.innerWidth - btnWidth);
    const newTop = scrollY + Math.random() * (window.innerHeight - btnHeight);
    
    btn.style.left = newLeft + 'px';
    btn.style.top = newTop + 'px';
  }

  // Обработчик клика
  btn.addEventListener('click', function(e) {
    e.preventDefault(); // не переходим сразу
    
    if (clickCount < 2) {
      clickCount++;
      moveButtonRandomly();
      alert('Не поймала! Лови ещё! (осталось ' + (2 - clickCount) + ' попытки)');
    } else {
      // на третий раз переходим
      window.location.href = 'photos.html';
    }
  });

  // Для мобильных - обрабатываем касание
  btn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    // эмулируем клик
    btn.click();
  }, { passive: false });
}

// 3. Загадка для фото
function setupPhotoQuiz() {
  const overlay = document.getElementById('quizOverlay');
  const photoGrid = document.querySelector('.photo-grid');
  const options = document.querySelectorAll('.quiz-option');
  
  if (!overlay) return;

  // Правильный ответ
  const correctAnswer = 'любовь';

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
  setupRunawayButton();
  setupPhotoQuiz();
});
