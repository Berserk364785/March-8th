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
  if (!btn) {
    console.log('Кнопка не найдена');
    return;
  }
  
  console.log('Кнопка найдена, настраиваем убегание');
  
  // Флаг - летает ли уже кнопка
  let isFlying = false;
  // Счётчик кликов
  let clickCount = 0;
  
  // Функция для получения случайных координат по всему экрану
  function getRandomPosition() {
    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;
    
    // Границы с учётом размера кнопки
    const maxLeft = window.innerWidth - btnWidth;
    const maxTop = window.innerHeight - btnHeight;
    
    // Случайные координаты
    const left = Math.floor(Math.random() * maxLeft);
    const top = Math.floor(Math.random() * maxTop);
    
    return { left, top };
  }
  
  // Функция для перемещения кнопки
  function moveButton() {
    const { left, top } = getRandomPosition();
    console.log('Перемещаем кнопку на:', left, top);
    
    // Применяем новые координаты
    btn.style.left = left + 'px';
    btn.style.top = top + 'px';
  }
  
  // Функция для активации "летающего" режима
  function activateFlyingMode() {
    if (!isFlying) {
      console.log('Активируем летающий режим');
      
      // Получаем текущие координаты кнопки
      const rect = btn.getBoundingClientRect();
      
      // Делаем кнопку фиксированной
      btn.style.position = 'fixed';
      btn.style.left = rect.left + 'px';
      btn.style.top = rect.top + 'px';
      btn.style.width = btn.offsetWidth + 'px';
      btn.style.zIndex = '9999';
      btn.style.margin = '0';
      
      isFlying = true;
      return true;
    }
    return false;
  }
  
  // Основной обработчик клика
  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation(); // Останавливаем всплытие события
    
    console.log('Клик по кнопке, clickCount =', clickCount, 'isFlying =', isFlying);
    
    // Если кнопка ещё не летающая - активируем режим
    if (!isFlying) {
      activateFlyingMode();
      clickCount = 1;
      moveButton();
      alert('Не поймала! Лови ещё!');
      return;
    }
    
    // Если летает, но кликов меньше 2
    if (clickCount < 2) {
      clickCount++;
      moveButton();
      alert('Не поймала! Лови ещё!');
      return;
    }
    
    // Третий клик - переход
    console.log('Третий клик, переходим на photos.html');
    window.location.href = 'photos.html';
  }
  
  // Обработчик касания для мобильных
  function handleTouch(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Касание кнопки');
    
    // Просто вызываем тот же обработчик, что и для клика
    handleClick(e);
  }
  
  // Удаляем старые обработчики (на всякий случай)
  btn.removeEventListener('click', handleClick);
  btn.removeEventListener('touchstart', handleTouch);
  
  // Добавляем новые
  btn.addEventListener('click', handleClick);
  btn.addEventListener('touchstart', handleTouch, { passive: false });
  
  console.log('Обработчики событий установлены');
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
  setupRunawayButton();
});
  // Запускаем функции в зависимости от наличия элементов
  if (document.getElementById('runawayBtn')) {
    setupRunawayButton();
  }

  if (document.getElementById('quizOverlay')) {
    setupPhotoQuiz();
  }
});
