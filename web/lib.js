google.charts.load('current', { 'packages': ['gauge', 'corechart'] });
google.charts.setOnLoadCallback(init);
window.onresize=init;

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

function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Date', 'Expected', 'Current'],
      ['3 Days Ago',  70,      100],
      ['2 Days Ago',  50,      90],
      ['Yesturday',  70,       80],
      ['Today',  20,      50]
    ]);

    var options = {
      title: 'Pollution',
      curveType: 'function',
      legend: { position: 'bottom' },
  
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
  }

function changeTemp(dir) {
    gaugeData.setValue(0, 0, gaugeData.getValue(0, 0) + dir * 25);
    gauge.draw(gaugeData, gaugeOptions);
}

function updateValue() {
    //console.log("updating");
    $.ajax({
        cache: false,
        url: "tds.js",
        dataType: "json",
        success: function(data) {
            //console.log(data);
            gaugeData.setValue(0, 0, data);
            gauge.draw(gaugeData, gaugeOptions);
            setTimeout(updateValue, 2000);    
        }
    });
    
}


function init() {
    drawChart();
    drawGauge();

    updateValue();
}