document.addEventListener("DOMContentLoaded", () => {
    // --- LÓGICA DO PODIUM ---
    const finalResults = JSON.parse(localStorage.getItem("finalResults")) || {};
    const tabelaBody = document.querySelector("#tabelaRanking tbody");

    if (tabelaBody) {
        tabelaBody.innerHTML = "";

        if (!finalResults.campeao) {
            tabelaBody.innerHTML = `<tr><td colspan="2">Finalize o torneio para ver o ranking</td></tr>`;
        } else {
            const ranking = [
                { posicao: 1, time: finalResults.campeao },
                { posicao: 2, time: finalResults.vice },
                { posicao: 3, time: finalResults.terceiro },
                { posicao: 4, time: finalResults.quarto }
            ];

            ranking.forEach(item => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${item.posicao}º</td>
                    <td>${item.time || "---"}</td>
                `;
                tabelaBody.appendChild(tr);
            });
        }
    }

    // --- LÓGICA DA ARTILHARIA ---
    const artilharia = JSON.parse(localStorage.getItem("artilharia")) || {}; 
    const divArtilheiros = document.getElementById("topArtilheiros");

    if (divArtilheiros) {
        divArtilheiros.innerHTML = ""; 

        const rankingArtilheiros = Object.entries(artilharia)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);

        if (rankingArtilheiros.length === 0) {
            divArtilheiros.innerHTML = "<p>Nenhum gol registrado.</p>";
        } else {
            rankingArtilheiros.forEach((item, index) => {
                let medalha = "";
                if (index === 0) medalha = "🥇";
                else if (index === 1) medalha = "🥈";
                else if (index === 2) medalha = "🥉";

                const p = document.createElement("p");
                p.innerHTML = `${medalha} <strong>${item[0]}</strong> - ${item[1]} gols`;
                divArtilheiros.appendChild(p);
            });
        }
    }
});