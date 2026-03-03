/*Podium*/ 
document.addEventListener("DOMContentLoaded", () => {
    const finalResults = JSON.parse(localStorage.getItem("finalResults")) || {};
    const tabelaBody = document.querySelector("#tabelaRanking tbody");

    tabelaBody.innerHTML = "";

    if (!finalResults.campeao) {
        tabelaBody.innerHTML = `<tr><td colspan="3">Finalize o torneio para ver o ranking</td></tr>`;
        return;
    }

    const ranking = [
        { posicao: 1, time: finalResults.campeao },
        { posicao: 2, time: finalResults.vice },
        { posicao: 3, time: finalResults.terceiro },
        { posicao: 4, time: finalResults.quarto }
    ];

    ranking.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.posicao}</td>
            <td>${item.time}</td>
            <td>-</td>
        `;
        tabelaBody.appendChild(tr);
    });
});

/*Artilharia*/
const artilharia = JSON.parse(localStorage.getItem("artilharia")) || [];
const divArtilheiros = document.getElementById("topArtilheiros");

const rankingArtilheiros = Object.entries(artilharia)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

if (rankingArtilheiros.length === 0) {
    divArtilheiros.innerHTML = "<p>Nenhum gol registrado.</p>";
}

rankingArtilheiros.forEach((item, index) => {
    let medalha = "";
    if (index === 0) medalha = "🥇";
    else if (index === 1) medalha = "🥈";
    else if (index === 2) medalha = "🥉";

    divArtilheiros.innerHTML += `<p>${medalha} ${item[0]} - ${item[1]} gols</p>`;

});