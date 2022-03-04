var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function liveReportsBtnUi() {
    return __awaiter(this, void 0, void 0, function* () {
        clearDOMContent();
        if (state.toggleListId.length === 5) {
            for (let index = 0; index < state.toggleListId.length; index++) {
                const currentIdId = state.toggleListId[index];
                const currentIndex = getIndexById(currentIdId);
                yield GetCoinInfoServiceLive(state.coinData[currentIndex].symbol.toUpperCase());
                state.graphDataAray.push(DOM.currentGraphData);
            }
            clearDOMContent();
            DOM.liveReportsBtm.className = "button is-primary";
            drawLiveReportsGraph();
        }
        else {
            clearDOMContent();
            drawLiveReportsPageMassage();
            state.graphDataAray = [];
            DOM.liveReportsBtm.className = "button is-primary";
        }
    });
}
function drawLiveReportsGraph() {
    clearDOMContent();
    drawLiveReport();
}
function drawLiveReportsPageMassage() {
    const span = document.createElement("span");
    span.innerText = `Select ${TOTAL_CARDS_LIMIT - 1} cards from home page`;
    DOM.liveReports = span;
}
function drawLiveReport() {
    var options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Crypto live index"
        },
        subtitles: [{
            // text: "Click Legend to Hide or Unhide Data Series"
            }],
        axisX: {
            title: "Time",
            // gridThickness: 2,
            // interval:1, 
            // intervalType: "minutes",        
            // valueFormatString: "hh TT K", 
            // labelAngle: -20
        },
        axisY: {
            title: "Units Sold",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC"
        },
        axisY2: {
            title: "Profit in USD",
            titleFontColor: "#C0504E",
            lineColor: "#C0504E",
            labelFontColor: "#C0504E",
            tickColor: "#C0504E"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: [{
                type: "spline",
                name: state.toggleListId[0],
                showInLegend: true,
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "#,##0 Units",
                dataPoints: []
            },
            {
                type: "spline",
                name: state.toggleListId[0],
                axisYType: "secondary",
                showInLegend: true,
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "$#,##0.#",
                dataPoints: [
                    { x: new Date(state.graphDataAray[0].Data.Data[0].time), y: state.graphDataAray[0].Data.Data[0].high },
                    { x: new Date(state.graphDataAray[0].Data.Data[1].time), y: state.graphDataAray[0].Data.Data[1].high },
                    { x: new Date(state.graphDataAray[0].Data.Data[2].time), y: state.graphDataAray[0].Data.Data[2].high },
                    { x: new Date(state.graphDataAray[0].Data.Data[3].time), y: state.graphDataAray[0].Data.Data[3].high },
                    { x: new Date(state.graphDataAray[0].Data.Data[4].time), y: state.graphDataAray[0].Data.Data[4].high },
                    { x: new Date(state.graphDataAray[0].Data.Data[5].time), y: state.graphDataAray[0].Data.Data[5].high },
                    { x: new Date(state.graphDataAray[0].Data.Data[6].time), y: state.graphDataAray[0].Data.Data[6].high },
                    { x: new Date(state.graphDataAray[0].Data.Data[7].time), y: state.graphDataAray[0].Data.Data[7].high },
                    { x: new Date(state.graphDataAray[0].Data.Data[8].time), y: state.graphDataAray[0].Data.Data[8].high },
                    { x: new Date(state.graphDataAray[0].Data.Data[9].time), y: state.graphDataAray[0].Data.Data[9].high },
                    { x: new Date(state.graphDataAray[0].Data.Data[10].time), y: state.graphDataAray[0].Data.Data[10].high },
                ]
            }, {
                type: "spline",
                name: state.toggleListId[1],
                axisYType: "secondary",
                showInLegend: true,
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "$#,##0.#",
                dataPoints: [
                    { x: new Date(state.graphDataAray[1].Data.Data[0].time), y: state.graphDataAray[1].Data.Data[0].high },
                    { x: new Date(state.graphDataAray[1].Data.Data[1].time), y: state.graphDataAray[1].Data.Data[1].high },
                    { x: new Date(state.graphDataAray[1].Data.Data[2].time), y: state.graphDataAray[1].Data.Data[2].high },
                    { x: new Date(state.graphDataAray[1].Data.Data[3].time), y: state.graphDataAray[1].Data.Data[3].high },
                    { x: new Date(state.graphDataAray[1].Data.Data[4].time), y: state.graphDataAray[1].Data.Data[4].high },
                    { x: new Date(state.graphDataAray[1].Data.Data[5].time), y: state.graphDataAray[1].Data.Data[5].high },
                    { x: new Date(state.graphDataAray[1].Data.Data[6].time), y: state.graphDataAray[1].Data.Data[6].high },
                    { x: new Date(state.graphDataAray[1].Data.Data[7].time), y: state.graphDataAray[1].Data.Data[7].high },
                    { x: new Date(state.graphDataAray[1].Data.Data[8].time), y: state.graphDataAray[1].Data.Data[8].high },
                    { x: new Date(state.graphDataAray[1].Data.Data[9].time), y: state.graphDataAray[1].Data.Data[9].high },
                    { x: new Date(state.graphDataAray[1].Data.Data[10].time), y: state.graphDataAray[1].Data.Data[10].high },
                ]
            },
            {
                type: "spline",
                name: state.toggleListId[2],
                axisYType: "secondary",
                showInLegend: true,
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "$#,##0.#",
                dataPoints: [
                    { x: new Date(state.graphDataAray[2].Data.Data[0].time), y: state.graphDataAray[2].Data.Data[0].high },
                    { x: new Date(state.graphDataAray[2].Data.Data[1].time), y: state.graphDataAray[2].Data.Data[1].high },
                    { x: new Date(state.graphDataAray[2].Data.Data[2].time), y: state.graphDataAray[2].Data.Data[2].high },
                    { x: new Date(state.graphDataAray[2].Data.Data[3].time), y: state.graphDataAray[2].Data.Data[3].high },
                    { x: new Date(state.graphDataAray[2].Data.Data[4].time), y: state.graphDataAray[2].Data.Data[4].high },
                    { x: new Date(state.graphDataAray[2].Data.Data[5].time), y: state.graphDataAray[2].Data.Data[5].high },
                    { x: new Date(state.graphDataAray[2].Data.Data[6].time), y: state.graphDataAray[2].Data.Data[6].high },
                    { x: new Date(state.graphDataAray[2].Data.Data[7].time), y: state.graphDataAray[2].Data.Data[7].high },
                    { x: new Date(state.graphDataAray[2].Data.Data[8].time), y: state.graphDataAray[2].Data.Data[8].high },
                    { x: new Date(state.graphDataAray[2].Data.Data[9].time), y: state.graphDataAray[2].Data.Data[9].high },
                    { x: new Date(state.graphDataAray[2].Data.Data[10].time), y: state.graphDataAray[2].Data.Data[10].high },
                ]
            },
            {
                type: "spline",
                name: state.toggleListId[3],
                axisYType: "secondary",
                showInLegend: true,
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "$#,##0.#",
                dataPoints: [
                    { x: new Date(state.graphDataAray[3].Data.Data[0].time), y: state.graphDataAray[3].Data.Data[0].high },
                    { x: new Date(state.graphDataAray[3].Data.Data[1].time), y: state.graphDataAray[3].Data.Data[1].high },
                    { x: new Date(state.graphDataAray[3].Data.Data[2].time), y: state.graphDataAray[3].Data.Data[2].high },
                    { x: new Date(state.graphDataAray[3].Data.Data[3].time), y: state.graphDataAray[3].Data.Data[3].high },
                    { x: new Date(state.graphDataAray[3].Data.Data[4].time), y: state.graphDataAray[3].Data.Data[4].high },
                    { x: new Date(state.graphDataAray[3].Data.Data[5].time), y: state.graphDataAray[3].Data.Data[5].high },
                    { x: new Date(state.graphDataAray[3].Data.Data[6].time), y: state.graphDataAray[3].Data.Data[6].high },
                    { x: new Date(state.graphDataAray[3].Data.Data[7].time), y: state.graphDataAray[3].Data.Data[7].high },
                    { x: new Date(state.graphDataAray[3].Data.Data[8].time), y: state.graphDataAray[3].Data.Data[8].high },
                    { x: new Date(state.graphDataAray[3].Data.Data[9].time), y: state.graphDataAray[3].Data.Data[9].high },
                    { x: new Date(state.graphDataAray[3].Data.Data[10].time), y: state.graphDataAray[3].Data.Data[10].high },
                ]
            },
            {
                type: "spline",
                name: state.toggleListId[4],
                axisYType: "secondary",
                showInLegend: true,
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "$#,##0.#",
                dataPoints: [
                    { x: new Date(state.graphDataAray[4].Data.Data[0].time), y: state.graphDataAray[4].Data.Data[0].high },
                    { x: new Date(state.graphDataAray[4].Data.Data[1].time), y: state.graphDataAray[4].Data.Data[1].high },
                    { x: new Date(state.graphDataAray[4].Data.Data[2].time), y: state.graphDataAray[4].Data.Data[2].high },
                    { x: new Date(state.graphDataAray[4].Data.Data[3].time), y: state.graphDataAray[4].Data.Data[3].high },
                    { x: new Date(state.graphDataAray[4].Data.Data[4].time), y: state.graphDataAray[4].Data.Data[4].high },
                    { x: new Date(state.graphDataAray[4].Data.Data[5].time), y: state.graphDataAray[4].Data.Data[5].high },
                    { x: new Date(state.graphDataAray[4].Data.Data[6].time), y: state.graphDataAray[4].Data.Data[6].high },
                    { x: new Date(state.graphDataAray[4].Data.Data[7].time), y: state.graphDataAray[4].Data.Data[7].high },
                    { x: new Date(state.graphDataAray[4].Data.Data[8].time), y: state.graphDataAray[4].Data.Data[8].high },
                    { x: new Date(state.graphDataAray[4].Data.Data[9].time), y: state.graphDataAray[4].Data.Data[9].high },
                    { x: new Date(state.graphDataAray[4].Data.Data[10].time), y: state.graphDataAray[4].Data.Data[10].high },
                ]
            }
        ]
    };
    $("#chartContainer").CanvasJSChart(options);
    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }
}
