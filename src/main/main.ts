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
    chart: null,
    pageHtmlCont: null,
    searchCard: null,
    searchInput: null,
    homeBtn: null,
    liveReportsBtm: null,
    aboutBtm: null,
    currentGraphData: null,
    info: null,
    popup: null,
}

const state = { coinData: [], currentCard: null, toggleListId: [], toggleListArray: [], graphDataAray: [] }

const TOTAL_CARDS = 26

const TOTAL_CARDS_LIMIT = 6

function init() {

    DOM.homePage =  document.createElement("div")
    DOM.homePage.className = "columns is-multiline"  
    DOM.list = document.getElementById("listCont")
    DOM.searchInput = document.getElementById("input")
    DOM.toggleListCont = document.getElementById("toggleListCont")
    DOM.pageHtmlCont = document.getElementById("pageHtmlCont");
    DOM.homeBtn = document.getElementById("homeBtn");
    DOM.liveReportsBtm = document.getElementById("liveReportsBtn");
    DOM.aboutBtm = document.getElementById("aboutBtn");
    DOM.homeBtn.addEventListener("click", homeBtnFn)
    DOM.liveReportsBtm.addEventListener("click", liveReportsBtmFn)
    DOM.aboutBtm.addEventListener("click", aboutBtnfn)
    DOM.info = document.getElementById("info")
    DOM.popup = document.getElementById("myPopup")
    DOM.chart = document.getElementById("chartContainer")

    drawHomePage()
}


async function getCurrentCardInfo(id){
    if(!id) return


    state.currentCard = null;
    const currentCardServer = await GetCoinInfoService(id)
    setSessionStorage(id, currentCardServer)
    state.currentCard =  currentCardServer;

}

function setSessionStorage(id, data){
    const jsonResponce = JSON.stringify(data)
    sessionStorage.setItem(id, jsonResponce);

}

function getSessionStorage(id){
    const jsonResponce = sessionStorage.getItem(id)
    const currentCardStorage = JSON.parse(jsonResponce)
    state.currentCard =  currentCardStorage;
}

 async function searchButtonAction(){
    const value = DOM.searchInput.value.toLowerCase()
    if (!value) return;

    const index = getIndexBySymbol(value)
    console.log(state.coinData[index])
    if (index>=0){
        drawLoaderBig()
        clearDOMContent()
        drawCurrentCard(state.coinData[index].id)
    }
    else{
        drawLoaderBig()
        clearDOMContent()
        drawCurrentCard(value)
    }
}

function getIndexById(id){
    const index = state.coinData.findIndex(function(current){
    return current.id === id
    })
    return index
}

function getIndexBySymbol(symbol){
    const index = state.coinData.findIndex(function(current){
    return current.symbol === symbol
    })
    return index
}

function getCards(){
const cardsArray = []

    for (let index = 0; index < TOTAL_CARDS; index++) {
        const card = new CardClosed(index)
        let toggleStatus = false
        const found = state.toggleListId.find(element => element === card.id);
        if(card.id === found){toggleStatus = true }else {toggleStatus = false }
        const currentCardUi = cardUi(card.name, card.symbol, card.image, card.id, toggleStatus  )

        currentCardUi.className = "column"
        cardsArray.push(currentCardUi)
    }
    return cardsArray
}

function drawLoaderBig() {
    DOM.pageHtmlCont.append(getLoaderBig())
}

function clearDOMContent() {
   
    DOM.chart.innerHTML = ""
    DOM.chart.style = "height: 0px, width: 0%"
    DOM.toggleListCont.innerHTML =""
    DOM.homePage.innerHTML ="";
    DOM.pageHtmlCont.innerHTML = ""
}

function getLoaderBig(){
    const divLoader = document.createElement("div")
    const loader = document.createElement("div")
    divLoader.className = "lds-circle"
    divLoader.style.height = "100px"
    divLoader.style.width = "100px"
    divLoader.append(loader)
    return divLoader
}

async function drawHomePage(){

    clearDOMContent()
    drawLoaderBig()
    await getCryptoService()
    clearDOMContent()
    DOM.homePage.append(...getCards());
    draw(DOM.homePage)
}

async function drawCurrentCard(id){
    clearDOMContent()
    drawLoaderBig()
    await getCurrentCardInfo(id)
    clearDOMContent()

    let toggleStatus = false
    const card = new CardOpened(id)
    const currentSerchedCard = cardUi(card.name, card.symbol, card.image, card.id, toggleStatus )
    currentSerchedCard.className = "column";
    DOM.searchCard = currentSerchedCard

    draw(DOM.searchCard)
}

async function homeBtnFn(){
    DOM.homeBtn.className = "button is-primary is-loading";
    
    await getCryptoService()
    clearDOMContent()
   
    DOM.homePage.append(...getCards());
    draw(DOM.homePage)
    DOM.homeBtn.className = "button is-primary";
}


async function liveReportsBtmFn(){
DOM.liveReportsBtm.className = "button is-primary is-loading"

    clearDOMContent()
    await liveReportsBtnUi()
    draw(DOM.liveReports);
    DOM.liveReportsBtm.className = "button is-primary"
}

function aboutBtnfn(){
DOM.about = aboutBtnfnUi()
draw(DOM.about);
}

function draw(page) {
DOM.pageHtmlCont.innerHTML = "";
DOM.pageHtmlCont.append(page);
}


async function toggleList(toggleStatus){
if(state.toggleListId.length === TOTAL_CARDS_LIMIT && DOM.toggleListStatus === false){
    
    clearDOMContent()
    drawLoaderBig()

    console.log("list")
    infoMessage(TOTAL_CARDS_LIMIT)
    state.toggleListArray =[]

    for (let index = 0; index < state.toggleListId.length; index++) {
        await getCurrentCardInfo(state.toggleListId[index])
    const card = new CardOpened(state.toggleListId[index])
    const currentListCard = cardUi(card.name, card.symbol, card.image, state.toggleListId[index], toggleStatus )
    currentListCard.className = "column";
    state.toggleListArray.push(currentListCard) 
        }
        clearDOMContent()
        myFunction(), DOM.toggleListStatus = true;
    }else if (state.toggleListId.length != TOTAL_CARDS_LIMIT && DOM.toggleListStatus === true) { 
        DOM.toggleListStatus = false, 
        toggleHide(), 
        toggleStatusUpdate(),
        messageButtonDelete() ;
    }else {  DOM.toggleListCont.innerHTML ="",
    toggleHide(), 
    DOM.toggleListStatus = false;
    DOM.chart.innerHTML = ""
    }
 }
 function toggleStatusUpdate()
 {
    drawHomePage()
 }

 function toggleListDraw(page){
    DOM.toggleListCont.innerHTML = "";
    DOM.toggleListCont.append(...page)
}

function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.add("show");
}
  function toggleHide() {
    var popup = document.getElementById("myPopup");
    popup.classList.remove("show");
    DOM.toggleListCont.innerHTML ="";
}
  function infoMessage(toggleCardLimit)
{
    const messageHeader = document.createElement("div")
    messageHeader.className = "message-header";
    const paragraph = document.createElement("p")
    paragraph.innerText = "plese unselect one card!"
    const deleteButton = document.createElement("button")
    deleteButton.onclick = messageButtonDelete;
    deleteButton.className = "delete"
    deleteButton.setAttribute("aria-label", "delete" )
    const messageBody = document.createElement("div")
    messageBody.className = "message-body";
    messageBody.innerText = `Sorry you can choose up to ${toggleCardLimit - 1} crypto cards.plese unselect one card! `

    messageHeader.append(paragraph,deleteButton)
    DOM.info.append(messageHeader, messageBody  )

}

function messageButtonDelete(){
    DOM.info.innerHTML = ""
}

init();