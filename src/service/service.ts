async function getCryptoService() {
    const url = `${DOM.API_URL}`
    try{
        const result = await fetch(url)
        const jsonResult = await result.json();
        state.coinData = jsonResult

    }catch(error){
        alert(`get Crypto Service CoinInfo error API - ${error}`);
    }
}

async function GetCoinInfoService(id) {
    const url = `${DOM.API_URL}/${id}`
    try{
    const result = await fetch(url)
    const jsonResult = await result.json();
    return jsonResult

}catch(error){
    alert(`Get CoinInfo Service error API - ${error}`);
}
}

async function GetCoinInfoServiceLive(isymbol) {

    const urlLive = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${isymbol}&tsym=USD&limit=10&api_key=47d2d164c40161bebd0f6e55c26bba67a6fa407f6fe04ae95b8d751c00f0c5ac`
    try{
    const result = await fetch(urlLive)
    const jsonResult = await result.json();
    DOM.currentGraphData =  jsonResult
    return jsonResult
}catch(error){

    alert(`GetCoinLive error API - ${error}`);
}
}




