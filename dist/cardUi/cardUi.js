var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("iam Working");
function cardUi(coinName, coinSymbol, coinImg, id, toggleStatus) {
    const coinCard = document.createElement("div");
    const column = document.createElement("div");
    column.className = "columnX";
    const card = document.createElement("div");
    card.className = "card";
    card.id = "card";
    const cardContent = document.createElement("div");
    cardContent.className = "card-content";
    const media = document.createElement("div");
    media.className = "media";
    const mediaLeft = document.createElement("div");
    mediaLeft.className = "media-left";
    const image = document.createElement("figure");
    image.className = "image is-6x";
    const imageSrc = document.createElement("img");
    imageSrc.src = coinImg;
    const coinNameSymbol = document.createElement("div");
    coinNameSymbol.className = "coinName";
    const title = document.createElement("p");
    title.className = "title is-4";
    title.innerText = coinSymbol.toUpperCase();
    const subTitle = document.createElement("p");
    subTitle.className = "subtitle";
    subTitle.innerText = coinName;
    const cardTop = document.createElement("div");
    cardTop.className = "cardTop";
    const cardBottom = document.createElement("div");
    const btnColumn = document.createElement("div");
    btnColumn.className = "btnColumnDiv";
    const moreInfo = document.createElement("div");
    moreInfo.className = "collapse";
    moreInfo.id = id;
    const button = document.createElement("button");
    button.className = "button is-primary is-small";
    button.type = "button";
    button.setAttribute("data-toggle", "collapse");
    button.setAttribute(`data-target`, `#${id}`);
    button.innerText = "Show More";
    button.addEventListener("click", addMoreInfo);
    button.onclick = interval;
    function interval() {
        setInterval(caardInfo, 120000);
    }
    let clicked = false;
    function addMoreInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            clicked = (!clicked);
            if (clicked) {
                button.className = "button is-primary is-small is-loading";
                yield caardInfo();
                button.innerText = "Show Less";
            }
            else {
                button.innerText = "Show More";
            }
        });
    }
    function caardInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            yield getCurrentCardInfo(id);
            yield drawMoreInfo(id);
        });
    }
    function drawMoreInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const card = new CardOpened(id);
            console.log(state.currentCard);
            moreInfo.innerHTML = "";
            const priceUsd = document.createElement("div");
            priceUsd.innerText = `USD = ${card.priceUsd} $`;
            priceUsd.className = "priceText";
            const priceEur = document.createElement("div");
            priceEur.innerText = `EUR = ${card.priceEur} €`;
            priceEur.className = "priceText";
            const priceIls = document.createElement("div");
            priceIls.innerText = `EUR = ${card.priceIls} ₪`;
            priceIls.className = "priceText";
            moreInfo.append(priceUsd, priceEur, priceIls);
            button.className = "button is-primary is-small";
        });
    }
    const labelSwitch = document.createElement("label");
    labelSwitch.className = "switch";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "switch";
    const slider = document.createElement("span");
    slider.className = "slider";
    slider.onclick = toggle;
    let toggleClicked = toggleStatus;
    checkbox.checked = toggleStatus;
    function toggle() {
        return __awaiter(this, void 0, void 0, function* () {
            toggleClicked = (!toggleClicked);
            if (toggleClicked === true) {
                state.toggleListId.push(id);
                yield toggleList(toggleClicked);
                toggleListDraw(state.toggleListArray);
            }
            if (toggleClicked === false) {
                checkbox.checked = toggleStatus;
                var index = state.toggleListId.indexOf(id);
                if (index !== -1) {
                    state.toggleListId.splice(index, 1);
                }
                yield toggleList(id);
                toggleListDraw(state.toggleListArray);
            }
        });
    }
    labelSwitch.append(checkbox, slider);
    btnColumn.append(labelSwitch, button);
    coinNameSymbol.append(title, subTitle);
    cardTop.append(coinNameSymbol, labelSwitch);
    image.append(imageSrc);
    mediaLeft.append(image);
    media.append(mediaLeft, btnColumn);
    cardContent.append(cardTop, media, cardBottom);
    card.append(cardContent);
    column.append(card);
    coinCard.append(column);
    cardBottom.append(moreInfo);
    return coinCard;
}
