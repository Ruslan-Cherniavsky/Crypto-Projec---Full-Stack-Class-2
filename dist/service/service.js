var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getCryptoService() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${DOM.API_URL}`;
        try {
            const result = yield fetch(url);
            const jsonResult = yield result.json();
            state.coinData = jsonResult;
        }
        catch (error) {
            alert(`get Crypto Service CoinInfo error API - ${error}`);
        }
    });
}
function GetCoinInfoService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${DOM.API_URL}/${id}`;
        try {
            const result = yield fetch(url);
            const jsonResult = yield result.json();
            return jsonResult;
        }
        catch (error) {
            alert(`Get CoinInfo Service error API - ${error}`);
        }
    });
}
function GetCoinInfoServiceLive(isymbol) {
    return __awaiter(this, void 0, void 0, function* () {
        const urlLive = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${isymbol}&tsym=USD&limit=10&api_key=47d2d164c40161bebd0f6e55c26bba67a6fa407f6fe04ae95b8d751c00f0c5ac`;
        try {
            const result = yield fetch(urlLive);
            const jsonResult = yield result.json();
            DOM.currentGraphData = jsonResult;
            return jsonResult;
        }
        catch (error) {
            alert(`GetCoinLive error API - ${error}`);
        }
    });
}
