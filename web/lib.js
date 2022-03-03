google.charts.load('current', { 'packages': ['gauge'] });
google.charts.setOnLoadCallback(drawGauge);

var gaugeOptions = {
    min: 0, max: 100, yellowFrom: 70, yellowTo: 85,
    redFrom: 85, redTo: 100, minorTicks: 5
};
var gauge;

function drawGauge() {
    gaugeData = new google.visualization.DataTable();
    gaugeData.addColumn('number', 'Polution');
    gaugeData.addRows(2);
    gaugeData.setCell(0, 0, 50);

    gauge = new google.visualization.Gauge(document.getElementById('gauge_div'));
    gauge.draw(gaugeData, gaugeOptions);
}

function changeTemp(dir) {
    gaugeData.setValue(0, 0, gaugeData.getValue(0, 0) + dir * 25);
    gauge.draw(gaugeData, gaugeOptions);
}

function updateValue() {
    var v = Math.random() * 100;
    gaugeData.setValue(0, 0, v);
    gauge.draw(gaugeData, gaugeOptions);
}

setInterval(updateValue, 2000);