document.addEventListener('DOMContentLoaded', (event) => {
    let body = document.querySelector('body');
    let glass = document.getElementById('glass');

    let brainButton = document.getElementById('brain-button');

    brainButton.addEventListener('click', () => {
        // body.classList.remove('body');
        body.classList.add('body_brain');

        // glass.classList.remove('glass');
        glass.classList.add('glass_brain');
    })
});