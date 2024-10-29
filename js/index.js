let moviesData = [];

let lastResult = [];

fetch('https://japceibal.github.io/japflix_api/movies-data.json')
    .then(res => res.json())
    .then(data => {
        moviesData = data;
    })
;

btnBuscar.onclick = function(e) {
    let query = inputBuscar.value;
    if (query) {
        let result = moviesData.filter(mov => {

            let search = [];
            search.push(mov.title);
            search.push(mov.overview);
            search.push(mov.tagline);
            search.push(...mov.genres.map(g => g.name));

            for (let item of search) {
                if (contains(item, query)) {
                    return true;
                }
            }

            return false;
        });

        lastResult = result;

        let resultHtml = '';
        let idx = 0;
        for (let mov of result) {
            resultHtml += `
            <div class="list-group-item bg-dark text-white" onclick="showMovData(${idx++})">
                <div class="right">
                ${getStars(mov.vote_average, 10)}
                </div>
                <b class="text-white">${mov.title}</b>
                <br/>
                <i class="text-muted">${mov.tagline}</i>
            </div>
            `;
        }
        lista.innerHTML = resultHtml;
    }
}

function getStars(n, max) {
    // Regla de 3 para obtener el resultado entre 0-5 estrellas.
    let stars = Math.round((5 * n) / max);

    let resultHtml = '';
    for (let i = 0; i < 5; i++) {
        if ((i + 1) <= stars) {
            resultHtml += `<span class="fa fa-star checked"></span>`
        } else {
            resultHtml += `<span class="fa fa-star"></span>`
        }
    }
    return resultHtml;
}

function contains(s, q) {
    return s.toLowerCase().indexOf(q.toLowerCase()) != -1;
}

function showMovData(i) {
    let mov = lastResult[i];
    offcanvasLabel.textContent = mov.title;
    offcanvasBody.textContent = mov.overview;
    offcanvasFooter.textContent = mov.genres.map(g => g.name).join(" - ");
    toggleOffcanvasBtn.click();
}