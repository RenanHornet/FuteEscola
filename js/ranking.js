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