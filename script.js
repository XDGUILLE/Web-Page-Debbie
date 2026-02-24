console.log('script.js cargado');
const langButtons = document.querySelectorAll("[data-language]");
const textsToChange = document.querySelectorAll("[data-section]");
console.log(textsToChange);

langButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const file = `./${button.dataset.language}.json`;
        console.log('Cargando idioma:', file);
        fetch(file)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
                return res.json();
            })
            .then(data => {
                textsToChange.forEach((el) => {
                    const section = el.dataset.section;
                    const value = el.dataset.value;

                    if (data[section] && data[section][value]) {
                        el.innerHTML = data[section][value];
                    }
                })
            })
            .catch(err => console.error('Error cargando idioma:', err));
    })
})