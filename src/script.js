const gallery = document.getElementById('gallery');
const btnLoad = document.getElementById('btn-load');
const btnClear = document.getElementById('btn-clear');
const btnRemoveLast = document.getElementById('btn-remove-last');
const btnReverse = document.getElementById('btn-reverse');

// Змінна для відстеження сторінки API, щоб щоразу завантажувати НОВІ картинки
let currentPage = 1;

// Функція завантаження 4 картинок
async function loadImages() {
    try {
        // Робимо запит, використовуючи параметри page та limit
        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=4`);
        const data = await response.json();
        
        // Перебираємо отримані дані та створюємо елементи img
        data.forEach(item => {
            const img = document.createElement('img');
            // Використовуємо спеціальний формат URL для отримання картинок розміром 400x400, 
            // щоб сторінка не зависала від оригінальних 4K фото
            img.src = `https://picsum.photos/id/${item.id}/400/400`;
            img.alt = `Фото від ${item.author}`;
            
            gallery.appendChild(img);
        });

        // Збільшуємо номер сторінки для наступного запиту
        currentPage++;
    } catch (error) {
        console.error('Помилка при завантаженні картинок:', error);
    }
}

// 1. При першому завантаженні сторінки викликаємо функцію
loadImages();

// 2. Кнопка: Завантажити ще 4 картинки
btnLoad.addEventListener('click', function() {
    loadImages();
});

// 3. Кнопка: Очистити галерею
btnClear.addEventListener('click', function() {
    gallery.innerHTML = '';
    // За бажанням: скидаємо сторінку до 1, щоб почати з початку
    currentPage = 1; 
});

// 4. Кнопка: Видалити останню картинку
btnRemoveLast.addEventListener('click', function() {
    // Перевіряємо, чи є взагалі картинки в галереї
    if (gallery.lastElementChild) {
        gallery.lastElementChild.remove();
    }
});

// 5. Кнопка: Перевернути галерею
btnReverse.addEventListener('click', function() {
    // Отримуємо всі картинки як масив
    const images = Array.from(gallery.children);
    
    // Перевертаємо масив і додаємо елементи назад у контейнер
    // (Метод appendChild переміщує існуючий елемент на нове місце)
    images.reverse().forEach(img => {
        gallery.appendChild(img);
    });
});
