

const key = "e62363af8a7568af5c2440b7c68f9a33";

function colocarDadosNaTela(dados){
    document.querySelector('.cidade').innerHTML ="Tempo em " + dados.name + ' ' + dados.sys.country;
    document.querySelector('.temp').innerHTML = Math.floor(dados.main.temp) + "°C";
    document.querySelector('.temp-max').innerHTML = `Máx: ${Math.floor(dados.main.temp_max)}°C`;
    document.querySelector('.temp-min').innerHTML = `Mín: ${Math.floor(dados.main.temp_min)}°C`;
    document.querySelector('.texto-previsao').innerHTML = dados.weather[0].description;
    document.querySelector('.umidade').innerHTML = `Umidade do ar: ${dados.main.humidity}%`;

    const ventoKmPorHora = (dados.wind.speed * 3.6).toFixed(0);
    document.querySelector('.vento-velocidade-direcao').innerHTML = `Ventos: ${ventoKmPorHora}Km/h`

    document.querySelector('.img-previsao').src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}

async function buscarCidade(cidade) {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json());

    console.log(dados);

    colocarDadosNaTela(dados);
}



function cliqueiNoBotao() {
    const cidade = document.querySelector('.input-cidade').value;
    document.querySelector('.input-cidade').value = '';
    buscarCidade(cidade);
}

document.querySelector('.input-cidade').addEventListener('keyup', function(event){
    if(event.key === 'Enter'){
        cliqueiNoBotao();
        document.querySelector('.input-cidade').value = '';
    }
});