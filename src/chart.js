//https://canvasjs.com/javascript-charts/dynamic-live-multi-series-chart/

function setChart(dataArray) {
    const chart = new CanvasJS.Chart("chartContainer", {
        zoomEnabled: true,
        title: {
            text: "Coin Rates over time"
        },
        axisX: {
            title: "chart updates every minute"
        },
        axisY: {
            prefix: "$"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            fontSize: 22,
            fontColor: "dimGrey",
            itemclick: toggleDataSeries
        },
        data: dataArray
    });

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }
    chart.render();
}
class Point {
    constructor(name, dataPoints = [], type = "line", xValueType = "dateTime", yValueFormatString = "$#######.######", xValueFormatString = "hh:mm:ss TT", showInLegend = true) {
        this.type = type
        this.xValueType = xValueType
        this.yValueFormatString = yValueFormatString
        this.xValueFormatString = xValueFormatString
        this.showInLegend = showInLegend
        this.name = name
        this.dataPoints = dataPoints
    }
}
function updateChartDB(coinRateData) {
    const currentDate = new Date();
    if (state.rateAbleCoins.length === 0) {  // because the result can contain fewer coins if they have no info to usd rate  
        state.selectedCoinId.forEach((coin) => {
            if (coin.symbol.toUpperCase() in coinRateData) {
                const coinSymbol = coin.symbol.toUpperCase()
                const dataPoint = []
                dataPoint.push({ //only one for starters
                    x: currentDate.getTime(),
                    y: coinRateData[coin.symbol.toUpperCase()].USD
                })
                state.rateAbleCoins.push(new Point(coinSymbol, dataPoint))
            }
        })
    }
    else { // update dataPoints
        state.rateAbleCoins.forEach((chartDataObj) => {
            const rate = coinRateData[chartDataObj.name].USD
            chartDataObj.dataPoints.push({
                x: currentDate.getTime(),
                y: rate
            })
        })
    }
}