const textsToChange = document.querySelectorAll('[data-section]');
let currentlanguaje = 'espanol';

window.addEventListener('load', () => {
    const contenedorLoader = document.querySelector('.container--loader');
    contenedorLoader.style.opacity = 0;
    contenedorLoader.style.visibility = 'hidden';
});

// Función para cambiar el idioma
const changelanguaje = async (languaje) => {
    try {
        const requestJson = await fetch(`./assets/languajes/${languaje}.json`);
        const texts = await requestJson.json();

        textsToChange.forEach(textToChange => {
            const section = textToChange.dataset.section;
            const value = textToChange.dataset.value;
            textToChange.innerHTML = texts[section][value] || 'no funciono'; // Ajusta según tu JSON
        });

        currentlanguaje = languaje; // Actualiza el idioma actual
    } catch (error) {
        console.error("Error al cargar el archivo JSON:", error);
    }
};

document.querySelectorAll('[data-languaje]').forEach(flag => {
    flag.addEventListener('click', (e) => {
        const currentLang = e.target.dataset.languaje;
        const newLang = currentLang === 'espanol' ? 'english' : 'espanol';
        
        // Cambiar el dataset
        e.target.dataset.languaje = newLang;

        // Cambiar el idioma
        changelanguaje(newLang);
    });
});



