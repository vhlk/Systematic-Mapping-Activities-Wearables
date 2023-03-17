google.charts.load('current', {'packages':['bar', 'corechart']});
google.charts.setOnLoadCallback(drawStuff);

function drawStuff() {
    var data = new google.visualization.arrayToDataTable([
    ["Technique", "Usage"],
    ["LDA", 1],
    ["QDA", 1],
    ["KNN", 4],
    ["DT", 3],
    ["RF", 7],
    ["NB", 2],
    ["AdaBoost", 2],
    ["SVM", 6],
    ["LR", 1],
    ["GB", 1],
    ["XgBoost", 1],
    ["Boosted", 1],
    ["HBM", 1],
    ["KD", 1],
    ["DD", 1]
    ]);

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