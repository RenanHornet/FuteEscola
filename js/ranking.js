document.addEventListener("DOMContentLoaded", () => {
    const resultados = JSON.parse(localStorage.getItem("resultados")) || [];
    const tabelaBody = document.querySelector("#tabelaRanking tbody");

    const pontuacao = {};

    resultados.forEach(jogo => {
        const { timeA, timeB, golsA, golsB } = jogo;

        if (!pontuacao[timeA]) pontuacao[timeA] = 0;
        if (!pontuacao[timeB]) pontuacao[timeB] = 0;

        if (golsA > golsB) {
            pontuacao[timeA] += 3;
        } else if (golsB > golsA) {
            pontuacao[timeB] += 3;
        } else {
            pontuacao[timeA] += 1;
            pontuacao[timeB] += 1;
        }
    });

    const rankingOrdenado = Object.entries(pontuacao)
        .sort((a, b) => b[1] - a[1]);

    tabelaBody.innerHTML = "";

    rankingOrdenado.forEach(([time, pontos], index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${time}</td>
            <td>${pontos}</td>
        `;

        tabelaBody.appendChild(tr);
    });
});