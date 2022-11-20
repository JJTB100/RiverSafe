/*

google.charts.load('current', { 'packages': ['gauge', 'corechart'] });
google.charts.setOnLoadCallback(init);
window.onresize=init;




var gaugeOptionsTDS = {
    min: 0, max: 600, yellowFrom: 300, yellowTo: 400,
    greenFrom: 0, greenTo:300,
    redFrom: 400, redTo: 600, minorTicks: 5,

};

var gaugeOptionsTmp = {
    min: -10, max: 100,

};
var gaugeTDS;
var gaugeTemp;
var guageDataTDS;
var guageDataTmp;

function drawGauge() {
    gaugeDataTDS = new google.visualization.DataTable();
    gaugeDataTDS.addColumn('number', 'Pollution');
    gaugeDataTDS.addRows(2);
    gaugeDataTDS.setCell(0, 0, 50);

    gaugeTDS = new google.visualization.Gauge(document.getElementById('gauge_tds_div'));
    gaugeTDS.draw(gaugeDataTDS, gaugeOptionsTDS);

    gaugeDataTmp = new google.visualization.DataTable();
    gaugeDataTmp.addColumn('number', 'Temperature');
    gaugeDataTmp.addRows(2);
    gaugeDataTmp.setCell(0, 0, 25);

    gaugeTemp = new google.visualization.Gauge(document.getElementById('gauge_temp_div'));
    gaugeTemp.draw(gaugeDataTmp, gaugeOptionsTmp);
}


function updateValue() {
    //console.log("updating");
    $.ajax({
        cache: false,
        url: "tds.json",
        dataType: "json",
        success: function(data) {
            console.log(data);
            gaugeDataTDS.setValue(0, 0, data.tds);
            gaugeTDS.draw(gaugeDataTDS, gaugeOptionsTDS);
            gaugeDataTmp.setValue(0, 0, data.temp);
            gaugeTemp.draw(gaugeDataTmp, gaugeOptionsTmp);
            setTimeout(updateValue, 2000);    
        }
    });
    
}


function init() {

    drawGauge();
    updateValue();

}
*/
