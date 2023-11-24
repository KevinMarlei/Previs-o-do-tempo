async function obterLocalizacao() {
    if("geolocation" in navigator){
        const position = await new Promise ((resolve, reject)=>{
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        console.log(position.coords);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        await buscarPrevisaoTempoPorCoordenadas(latitude, longitude);
        
    }else{
        alert("A geolocalização que é essêncial para determinar a exata localização do dispositivo, não está disponível neste navegador.");
    }
}

async function buscarPrevisaoTempoPorCoordenadas(latitude, longitude){
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&lang=pt_br&units=metric`)
        .then(resposta => resposta.json());
    console.log(dados);
    colocarDadosNaTela(dados);
}
window.onload = async function (){
   await obterLocalizacao();
};