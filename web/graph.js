      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

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
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }

      function updateValue() {
        var v = Math.random() * 100;
      }

setInterval(updateValue, 2000);




