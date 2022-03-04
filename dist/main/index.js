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
const DOM = {
    homePage: null,
    liveReports: null,
    about: null,
    API_URL: "https://api.coingecko.com/api/v3/coins/",
    toggleList: null,
    toggleListCont: null,
    toggleClicked: false,
    toggleListStatus: false,
    list: null,
    pageHtmlCont: null,
    searchCard: null,
    searchInput: null,
    homeBtn: null,
    liveReportsBtm: null,
    aboutBtm: null,
    info: null,
};
const state = { coinData: [], currentCard: null, toggleListId: [], toggleListArray: [] };
function init() {
    DOM.homePage = document.createElement("div");
    DOM.homePage.className = "columns is-multiline";
    DOM.list = document.getElementById("listCont");
    DOM.searchInput = document.getElementById("input");
    DOM.toggleListCont = document.getElementById("toggleListCont");
    DOM.pageHtmlCont = document.getElementById("pageHtmlCont");
    DOM.homeBtn = document.getElementById("homeBtn");
    DOM.liveReportsBtm = document.getElementById("liveReportsBtn");
    DOM.aboutBtm = document.getElementById("aboutBtn");
    DOM.homeBtn.addEventListener("click", homeBtnFn);
    DOM.liveReportsBtm.addEventListener("click", liveReportsBtmFn);
    DOM.aboutBtm.addEventListener("click", aboutBtnfn);
    DOM.info = document.getElementById("info");
    drawHomePage();
}
function getCurrentCardInfo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id)
            return;
        state.currentCard = null;
        const currentCardServer = yield GetCoinInfoService(id);
        setSessionStorage(id, currentCardServer);
        state.currentCard = currentCardServer;
    });
}
function setSessionStorage(id, data) {
    const jsonResponce = JSON.stringify(data);
    sessionStorage.setItem(id, jsonResponce);
}
function getSessionStorage(id) {
    const jsonResponce = sessionStorage.getItem(id);
    const currentCardStorage = JSON.parse(jsonResponce);
    state.currentCard = currentCardStorage;
}
function searchButtonAction() {
    return __awaiter(this, void 0, void 0, function* () {
        const value = DOM.searchInput.value;
        if (!value)
            return;
        console.log(value);
        drawLoaderBig();
        clearDOMContent();
        drawCurrentCard(value);
    });
}
function getIndexById(id) {
    const index = state.coinData.findIndex(function (current) {
        return current.id === id;
    });
    return index;
}
function getCards() {
    const cardsArray = [];
    for (let index = 0; index < 10; index++) {
        const card = new CardClosed(index);
        let toggleStatus = false;
        const found = state.toggleListId.find(element => element === card.id);
        if (card.id === found) {
            toggleStatus = true;
        }
        else {
            toggleStatus = false;
        }
        const currentCardUi = cardUi(card.name, card.symbol, card.image, card.id, toggleStatus);
        console.log("get cards");
        currentCardUi.className = "column";
        cardsArray.push(currentCardUi);
    }
    // draw(DOM.homePage);
    console.log(state.coinData);
    return cardsArray;
}
function drawLoaderBig() {
    DOM.pageHtmlCont.append(getLoaderBig());
}
function clearDOMContent() {
    DOM.toggleListCont.innerHTML = "";
    DOM.homePage.innerHTML = "";
    DOM.pageHtmlCont.innerHTML = "";
}
function getLoaderBig() {
    const divLoader = document.createElement("div");
    const loader = document.createElement("div");
    divLoader.className = "lds-circle";
    divLoader.style.height = "100px";
    divLoader.style.width = "100px";
    divLoader.append(loader);
    return divLoader;
}
// <div class="lds-circle"><div></div></div>
function drawHomePage() {
    return __awaiter(this, void 0, void 0, function* () {
        clearDOMContent();
        drawLoaderBig();
        yield getCryptoService();
        clearDOMContent();
        DOM.homePage.append(...getCards());
        draw(DOM.homePage);
    });
}
function drawCurrentCard(id) {
    return __awaiter(this, void 0, void 0, function* () {
        clearDOMContent();
        drawLoaderBig();
        yield getCurrentCardInfo(id);
        clearDOMContent();
        let toggleStatus = false;
        const card = new CardOpened(id);
        const currentSerchedCard = cardUi(card.name, card.symbol, card.image, card.id, toggleStatus);
        currentSerchedCard.className = "column";
        DOM.searchCard = currentSerchedCard;
        draw(DOM.searchCard);
        console.log(state.currentCard);
    });
}
function homeBtnFn() {
    return __awaiter(this, void 0, void 0, function* () {
        DOM.homeBtn.className = "button is-primary is-loading";
        clearDOMContent();
        yield getCryptoService();
        DOM.homeBtn.className = "button is-primary";
        DOM.homePage.append(...getCards());
        draw(DOM.homePage);
    });
}
function liveReportsBtmFn() {
    liveReportsBtnUi();
    draw(DOM.liveReports);
}
function aboutBtnfn() {
    DOM.about = aboutBtnfnUi();
    draw(DOM.about);
}
function draw(page) {
    DOM.pageHtmlCont.innerHTML = "";
    DOM.pageHtmlCont.append(page);
}
function toggleList(toggleStatus) {
    return __awaiter(this, void 0, void 0, function* () {
        const toggleCardLimit = 6;
        // await console.log(state.toggleListId.length)
        // await console.log(toggleStatus)
        if (state.toggleListId.length === toggleCardLimit && DOM.toggleListStatus === false) {
            clearDOMContent();
            drawLoaderBig();
            console.log("list");
            infoMessage(toggleCardLimit);
            state.toggleListArray = [];
            for (let index = 0; index < state.toggleListId.length; index++) {
                yield getCurrentCardInfo(state.toggleListId[index]);
                // await clearDOMContent()
                const card = new CardOpened(state.toggleListId[index]);
                const currentListCard = cardUi(card.name, card.symbol, card.image, state.toggleListId[index], toggleStatus);
                currentListCard.className = "column";
                state.toggleListArray.push(currentListCard);
            }
            clearDOMContent();
            myFunction(), DOM.toggleListStatus = true;
        }
        else if (state.toggleListId.length != toggleCardLimit && DOM.toggleListStatus === true) {
            DOM.toggleListStatus = false,
                toggleHide(),
                toggleStatusUpdate(),
                messageButtonDelete();
        }
        else {
            DOM.toggleListCont.innerHTML = "", console.log("unlist"), toggleHide(), DOM.toggleListStatus = false;
        }
    });
}
function toggleStatusUpdate() {
    TextMetrics;
    console.log("statusUbdate");
    drawHomePage();
}
function toggleListDraw(page) {
    DOM.toggleListCont.innerHTML = "";
    DOM.toggleListCont.append(...page);
}
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.add("show");
}
function toggleHide() {
    var popup = document.getElementById("myPopup");
    popup.classList.remove("show");
    DOM.toggleListCont.innerHTML = "";
}
function infoMessage(toggleCardLimit) {
    const messageHeader = document.createElement("div");
    messageHeader.className = "message-header";
    const paragraph = document.createElement("p");
    paragraph.innerText = "plese unselect one card!";
    const deleteButton = document.createElement("button");
    deleteButton.onclick = messageButtonDelete;
    deleteButton.className = "delete";
    deleteButton.setAttribute("aria-label", "delete");
    const messageBody = document.createElement("div");
    messageBody.className = "message-body";
    messageBody.innerText = `Sorry you can choose up to ${toggleCardLimit - 1} crypto cards. `;
    messageHeader.append(paragraph, deleteButton);
    DOM.info.append(messageHeader, messageBody);
    // DOM.info.innerHTML = `
    // <div class="message-header">
    //   <p>Success</p>
    //   <button class="delete" aria-label="delete"></button>
    // </div>
    // <div class="message-body">
    // Sorry you can choose up to 4 crypto cards. 
    // </div>`
}
function messageButtonDelete() {
    DOM.info.innerHTML = "";
}
init();
