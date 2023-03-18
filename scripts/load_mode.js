function select_mode(mode) {
    if (mode == "Graphs") {        
        document.getElementById("Graphs_container").style.display = "";
        document.getElementById("Search_container").style.display = "none";
    } else if (mode == "Search") {
        document.getElementById("Graphs_container").style.display = "none";
        document.getElementById("Search_container").style.display = "";
    } else {
        alert("Mode not implemented error!");
    }
}

function select_search_mode(mode) {
    if (mode == "Datasets") {        
        document.getElementById("Datasets_container").style.display = "";
        document.getElementById("Techniques_container").style.display = "none";
    } else if (mode == "Techniques") {
        document.getElementById("Datasets_container").style.display = "none";
        document.getElementById("Techniques_container").style.display = "";
    } else {
        alert("Mode not implemented error!");
    }
}

async function search_articles_by_techniques() {
    let articles_file_name = "./data/" + "articles_tags.json";
    let data = await fetch(articles_file_name);
    data = await data.json();
    
    let selected_checkboxes = Array.from(document.getElementById("Techniques_container").querySelectorAll('input[type=checkbox]:checked'));
    selected_checkboxes = selected_checkboxes.map(elem => elem.id.replace("show_", ""));
    
    let selected_articles = [];

    for (const article of data) {
        const tags = article["TAGS"].split(";");
        if (selected_checkboxes.every(item => tags.includes(item)))
            selected_articles.push(article);
    }

    addTable(selected_articles);
}

function addTable(selected_articles) {
    let table_wrapper = document.getElementById("Search_articles_results_table_wrapper");
    table_wrapper.style.display = "";
    table_wrapper.querySelector("#Search_articles_results tbody").innerHTML = selected_articles.map(article => `<tr><td>${article["Title"]}</td><td><a href="${article["Link"]}">${article["Link"]}</a></td><td>${article["Authors"]}</td><td>${article["openly available code"]}</td><td>${article["lightweight model"]}</td><td>${article["Year"]}</td></tr>`).join('');
  }