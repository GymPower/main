function loadXMLDoc(filename) {
    return fetch(filename)
        .then(response => response.text())
        .then(text => new window.DOMParser().parseFromString(text, "text/xml"));
}

function filtrarEjercicios() {
    const grupoMuscular = document.getElementById("grupoMuscular").value;
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = '';

    loadXMLDoc('ejercicios.xml').then(xmlDoc => {
        if (grupoMuscular) {
            const grupos = xmlDoc.getElementsByTagName("grupo");
            for (let i = 0; i < grupos.length; i++) {
                const nombreGrupo = grupos[i].getElementsByTagName("nombre")[0].textContent;
                if (nombreGrupo === grupoMuscular) {
                    const ejercicios = grupos[i].getElementsByTagName("ejercicio");
                    for (let j = 0; j < ejercicios.length; j++) {
                        const nombreEjercicio = ejercicios[j].getElementsByTagName("nombre")[0].textContent;
                        const pasos = ejercicios[j].getElementsByTagName("paso");
                        const pasosList = Array.from(pasos).map(paso => `<li>${paso.textContent}</li>`).join('');

                        resultadoDiv.innerHTML += `
                            <h2>${nombreEjercicio}</h2>
                            <ol>${pasosList}</ol>
                        `;
                    }
                    break;
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('grupoMuscular').addEventListener('change', filtrarEjercicios);
});