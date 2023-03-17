google.charts.load('current', {'packages':['bar', 'corechart']});
google.charts.setOnLoadCallback(drawStuff);

async function drawStuff() {
    file_name = './ML_techniques.json'
    data = await fetch(file_name);
    data = await data.json();

    var data = new google.visualization.arrayToDataTable(data);

    data.sort([{column: 0}]);

    var btns = document.getElementById('btn-group');
    btns.onclick = function (e) {
        if (e.target.tagName === 'BUTTON') {
            if (e.target.id === "bar_chart") {
                var options = {
                    title: 'Classical Machine Learning Techniques',
                    width: 900,
                    legend: { position: 'none' },
                    chart: { title: 'Classical Machine Learning Techniques' },
                    bars: 'horizontal', // Required for Material Bar Charts.
                    axes: {
                        x: {
                        0: { side: 'bottom', label: 'Usage'} // Top x-axis.
                        }
                    },
                    bar: { groupWidth: "90%" }
                };

                var chart = new google.charts.Bar(document.getElementById('chart_div'));
                chart.draw(data, options);
            }
            if (e.target.id === "pie_chart") {
                var options = {
                    title: 'Classical Machine Learning Techniques'
                  };

                var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
                chart.draw(data, options);
            }
        }
    }
};