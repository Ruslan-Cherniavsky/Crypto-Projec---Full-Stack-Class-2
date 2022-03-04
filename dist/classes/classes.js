class CardClosed {
    constructor(index) {
        this.name = state.coinData[index].name;
        this.symbol = state.coinData[index].symbol;
        this.image = state.coinData[index].image["large"];
        this.id = state.coinData[index].id;
    }
}
class CardOpened {
    constructor(id) {
        this.last_updated = state.currentCard["last_updated"];
        this.id = id;
        this.priceUsd = state.currentCard.market_data.current_price.usd;
        this.priceEur = state.currentCard.market_data.current_price.eur;
        this.priceIls = state.currentCard.market_data.current_price.ils;
        this.name = state.currentCard.name;
        this.symbol = state.currentCard.symbol;
        this.image = state.currentCard.image.large;
    }
}
