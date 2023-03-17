google.charts.load('current', {'packages':['bar', 'corechart']});
google.charts.setOnLoadCallback(drawStuff);

function drawStuff() {
    var btns = document.getElementById('btn-group-chart-type');
    btns.onclick = async function (e) {
        if (e.target.tagName === 'BUTTON') {
            checked_radio = document.querySelector('input[name="data"]:checked');
            file_name = "../data/" + checked_radio.value;
            data = await fetch(file_name);
            data = await data.json();

            var data = new google.visualization.arrayToDataTable(data);

            data.sort([{column: 0}]);

            if (e.target.id === "bar_chart") {
                var options = {
                    title: checked_radio.nextSibling.textContent.trim(),
                    width: 900,
                    legend: { position: 'none' },
                    chart: { title: checked_radio.nextSibling.textContent.trim() },
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
                    title: checked_radio.nextSibling.textContent.trim()
                };

                var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
                chart.draw(data, options);
            }
        }
    }
};