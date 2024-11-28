document.addEventListener('DOMContentLoaded', function() {
    const divContents = document.querySelectorAll('.div__content');
    const background = document.querySelector('.background');
    const popups = document.querySelectorAll('.popup');
    let isAnimating = false; // Флаг для предотвращения одновременной анимации

    divContents.forEach(div => {
        div.addEventListener('click', function() {
            // Если текущий элемент уже выбран или анимация в процессе, ничего не делаем
            if (this.classList.contains('active') || isAnimating) {
                return;
            }

            isAnimating = true; // Устанавливаем флаг анимации

            // Удаляем класс active у всех div__content и скрываем все окна
            divContents.forEach(d => d.classList.remove('active'));
            popups.forEach(p => {
                if (p.classList.contains('active')) {
                    p.classList.add('exit');
                    setTimeout(() => {
                        p.classList.remove('active', 'exit');
                        // Скрыть элементы skill-item при закрытии popup
                        const skillItems = p.querySelectorAll('.skill-item');
                        skillItems.forEach(item => item.classList.remove('visible', 'green'));
                        // Скрыть кнопки при закрытии popup
                        const contactButtons = p.querySelectorAll('.contact-button');
                        contactButtons.forEach(button => button.classList.remove('visible'));
                    }, 500);
                }
            });

            // Добавляем класс active к текущему div__content
            this.classList.add('active');

            // Получаем размеры и позицию текущего div__content
            const rect = this.getBoundingClientRect();
            const parentRect = this.parentElement.getBoundingClientRect();

            // Устанавливаем размеры и позицию background
            background.style.width = `${rect.width}px`;
            background.style.height = `${rect.height}px`;
            background.style.transform = `translate(${rect.left - parentRect.left}px, ${rect.top - parentRect.top}px)`;

            // Показать соответствующее окно
            const index = this.getAttribute('data-index');
            const popup = document.querySelector(`.popup[data-index="${index}"]`);
            setTimeout(() => {
                popup.classList.add('active');
                // Показать элементы skill-item после появления popup
                if (index === "0") {
                    const skillItems = popup.querySelectorAll('.skill-item');
                    skillItems.forEach((item, i) => {
                        if (item.textContent === 'JavaScript') {
                            item.classList.add('blue');
                        }
                        if (item.textContent === 'Vite') {
                            item.classList.remove('blue');
                        }
                        setTimeout(() => item.classList.add('visible'), 300 + i * 100); // Уменьшенная пауза
                    });
                }
                // Показать кнопки после появления popup
                if (index === "2") {
                    const contactButtons = popup.querySelectorAll('.contact-button');
                    contactButtons.forEach((button, i) => {
                        setTimeout(() => button.classList.add('visible'), 300 + i * 100);
                    });
                }
                isAnimating = false; // Сбрасываем флаг анимации после завершения
            }, 500);
        });
    });

    // Инициализация background для первого элемента
    const firstDiv = divContents[0];
    const rect = firstDiv.getBoundingClientRect();
    const parentRect = firstDiv.parentElement.getBoundingClientRect();
    background.style.width = `${rect.width}px`;
    background.style.height = `${rect.height}px`;
    background.style.transform = `translate(${rect.left - parentRect.left}px, ${rect.top - parentRect.top}px)`;

    // Добавляем обработчики для элементов skill-item
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(skill => {
        skill.addEventListener('click', function() {
            // Если текущий элемент уже выбран или анимация в процессе, ничего не делаем
            if (this.classList.contains('active') || isAnimating) {
                return;
            }

            isAnimating = true; // Устанавливаем флаг анимации

            // Удаляем класс active у всех skill-item и скрываем все окна
            skillItems.forEach(s => s.classList.remove('active', 'green'));
            const skillPopups = document.querySelectorAll('.skill-popup');
            skillPopups.forEach(p => {
                if (p.classList.contains('active')) {
                    p.classList.add('exit');
                    setTimeout(() => {
                        p.classList.remove('active', 'exit');
                        // Скрыть текст при закрытии popup
                        const skillText = p.querySelector('.skill-text');
                        skillText.classList.remove('visible');
                    }, 500);
                }
            });

            // Добавляем класс active и green к текущему skill-item
            this.classList.add('active', 'green');

            // Показать соответствующее окно
            const skillIndex = this.getAttribute('data-skill-index');
            const skillPopup = document.querySelector(`.skill-popup[data-skill-index="${skillIndex}"]`);
            setTimeout(() => {
                skillPopup.classList.add('active');
                // Показать текст после появления popup
                const skillText = skillPopup.querySelector('.skill-text');
                const textContent = skillText.textContent;
                skillText.innerHTML = '';
                textContent.split('').forEach((char, i) => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.style.setProperty('--char-index', i);
                    skillText.appendChild(span);
                });
                setTimeout(() => skillText.classList.add('visible'), 300);
                isAnimating = false; // Сбрасываем флаг анимации после завершения
            }, 500);
        });
    });

    const projectPopups = document.querySelectorAll('.projects-popup');
    projectPopups.forEach(popup => {
        const iframes = popup.querySelectorAll('iframe');
        const leftArrow = popup.querySelector('.left-arrow');
        const rightArrow = popup.querySelector('.right-arrow');
        let currentIndex = 0;

        function showIframe(index) {
            iframes.forEach((iframe, i) => {
                iframe.style.display = i === index ? 'block' : 'none';
            });
        }

        leftArrow.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + iframes.length) % iframes.length;
            showIframe(currentIndex);
        });

        rightArrow.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % iframes.length;
            showIframe(currentIndex);
        });

        showIframe(currentIndex);
    });
});