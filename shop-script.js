document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.shop-container').forEach(button => {
        button.addEventListener('click', () => {
            const popup = document.getElementById('popup-message');
            if (popup) {
                popup.classList.add('show');
                setTimeout(() => {
                    popup.classList.remove('show');
                }, 1500);
            }
        });
    });
});