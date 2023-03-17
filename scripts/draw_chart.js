google.charts.load('current', {'packages':['bar', 'corechart']});
google.charts.setOnLoadCallback(drawStuff);

MAX_NAME_LENGTH = 25;

function drawStuff() {
    var btns = document.getElementById('btn-group-chart-type');
    btns.onclick = async function (e) {
        if (e.target.tagName === 'BUTTON') {
            let checked_radio = document.querySelector('input[name="data"]:checked');

            let data = await load_data(checked_radio.value);

            data = ellipsis_data(data, MAX_NAME_LENGTH);
            data = new google.visualization.arrayToDataTable(data)

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

function truncate(str, n){
    return (str.length > n) ? str.substring(0, n-1) + '...' : str;
};

function ellipsis_data(data, n) {
    return data.map(elem => [truncate(elem[0], n), elem[1]]);
}

async function load_data(fileName) {    
    let file_name = "./data/" + fileName;
    let data = await fetch(file_name);
    data = await data.json();

    let max_number_items = document.getElementById("max_items_slider").value;

    let header = data[0];
    let data_temp = data.slice(1);

    data_temp.sort((a, b) => a[1] < b[1]);

    let num_others = data_temp.reduce((prev, curr, i) => i >= max_number_items ? prev + curr[1] : prev, 0);

    data_temp.length = Math.min(max_number_items, data_temp.length);

    if (num_others > 0)
        data_temp = [...data_temp, ["Other", num_others]];

    data = [header, ...data_temp];

    return data;
}