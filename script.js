const cards = document.querySelectorAll('.card');
let isDragging = false;
let startX;
let currentCard;

cards.forEach(card => {
    card.addEventListener('mousedown', handleDragStart);
    card.addEventListener('touchstart', handleDragStart);

    card.addEventListener('mouseup', handleDragEnd);
    card.addEventListener('touchend', handleDragEnd);

    card.addEventListener('mousemove', handleDragging);
    card.addEventListener('touchmove', handleDragging);
});

function handleDragStart(e) {
    isDragging = true;
    currentCard = e.target;
    startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
}

function handleDragEnd() {
    if (!isDragging) return;

    isDragging = false;
    const moveX = parseInt(currentCard.style.transform.replace(/[^-?\d]+/g, '')) || 0;

    if (Math.abs(moveX) > 150) {
        currentCard.style.transition = 'transform 0.5s, opacity 0.5s';
        currentCard.style.transform = `translateX(${moveX > 0 ? '100%' : '-100%'})`;
        currentCard.style.opacity = '0';

        currentCard.addEventListener('transitionend', () => {
            currentCard.remove();
        });
    } else {
        currentCard.style.transform = 'translateX(0px)';
        currentCard.style.transition = 'transform 0.3s ease';
    }
}

function handleDragging(e) {
    if (!isDragging) return;

    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const moveX = clientX - startX;
    
    currentCard.style.transform = `translateX(${moveX}px)`;
    currentCard.style.transition = 'none';
}
