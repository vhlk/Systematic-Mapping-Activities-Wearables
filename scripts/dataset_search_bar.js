let DATASETS_ACTIVITIES = []; // to be loaded at load_dataset_activities_data
let ALL_ACTIVITIES = [];

function searchInputChange() {
    const datalist = document.getElementById('suggestions');
    datalist.innerHTML = '';

    ALL_ACTIVITIES.forEach(suggestion => {
        const option = document.createElement('option');
        option.value = suggestion;
        datalist.appendChild(option);
    });
}

// Function to add a selected suggestion to the list
function addSelectedSuggestionToList(selectedSuggestion) {
    if (check_data_already_added(selectedSuggestion))
        return;

    if (!check_if_is_activity(selectedSuggestion)) {
        alert("Activity not found")
        return;
    }

    const list = document.getElementById('selected-suggestions');
    const listItem = document.createElement('li');
    listItem.innerText = selectedSuggestion;
    listItem.style.display = "inline";
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.addEventListener('click', () => list.removeChild(listItem));
    const spacer = document.createElement('span');
    spacer.innerHTML = '&nbsp;&nbsp;&nbsp;';
    const separator = document.createElement('span');
    separator.innerHTML = '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;';
    listItem.appendChild(spacer);
    listItem.appendChild(removeButton);
    listItem.appendChild(separator);
    list.appendChild(listItem);
}

function check_if_is_activity(name) {
    return ALL_ACTIVITIES.includes(name);
}

function check_data_already_added(elem2add) {
    return [...document.getElementById('selected-suggestions').getElementsByTagName("li")].some(v => v.firstChild.data == elem2add);
}

async function load_dataset_activities_data(cleanedLabels) {
    let file_name = "./data/";
    file_name += cleanedLabels ? "Datasets_activities.json" : "Datasets_activities_raw.json"

    let data = await fetch(file_name);
    data = await data.json();

    // remove header
    data = data.slice(1);

    DATASETS_ACTIVITIES = data;
    ALL_ACTIVITIES = [...new Set(data.map(v => v[1].split(",").map(e => e.trim())).flat().sort((a,b) => a.localeCompare(b)))];
}

function search_datasets() {
    let selected_activities = [...document.getElementById('selected-suggestions').getElementsByTagName("li")].map(e => e.firstChild.data);

    let mapped_dataset = DATASETS_ACTIVITIES.filter(v => {
        let curr_activities = v[1].split(',').map(a => a.trim());
        return selected_activities.every(e => curr_activities.includes(e));
    });

    load_table(mapped_dataset);
}

function load_table(mapped_dataset) {
    let table_wrapper = document.getElementById("Search_datasets_results_table_wrapper");
    table_wrapper.style.display = "";
    let table_row = function (data) {
        return `<tr>
            <td>${data[0]}</td>
            <td>${data[1]}</td>
        </tr>`
    };
    table_wrapper.querySelector("#Search_datasets_results tbody").innerHTML = mapped_dataset.map(table_row).join('');
}