document.addEventListener('DOMContentLoaded', () => {
    initializeCards();
    initializeAnimations();
});

function initializeCards() {
    const cards = document.querySelectorAll('.quest-card');

    cards.forEach(card => {
        const btn = card.querySelector('.quest-btn');

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

function initializeAnimations() {
    if (window.QuestHub) {
        window.QuestHub.initScrollAnimations();
    }

    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const target = stat.textContent;
        if (target !== '∞' && target !== '100' && window.QuestHub) {
            window.QuestHub.animateValue(stat, 0, parseInt(target), 2000);
        }
    });
}
