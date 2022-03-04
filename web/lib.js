google.charts.load('current', { 'packages': ['gauge'] });
google.charts.setOnLoadCallback(drawGauge);

var gaugeOptions = {
    min: 0, max: 600, yellowFrom: 300, yellowTo: 400,
    greenFrom: 0, greenTo:300,
    redFrom: 400, redTo: 600, minorTicks: 5
};
var gauge;

function drawGauge() {
    gaugeData = new google.visualization.DataTable();
    gaugeData.addColumn('number', 'Pollution');
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
    $.getJSON('tds.js', function(data) {
        console.log(data);
    });
    var v = Math.random() * 100;
    gaugeData.setValue(0, 0, v);
    gauge.draw(gaugeData, gaugeOptions);
}


$(init);


function init() {
    setTimeout(updateValue, 2000);
}