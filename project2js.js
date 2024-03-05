function apiSearch() {
    $.ajax({
        type: 'GET',
        dataType: "jsonp",
        url: "https://www.googleapis.com/customsearch/v1?key=AIzaSyBCtF3IyWvXcQplMIzkoWC5h_WvuA-8NiI&cx=c3d3cd77eee87448c&q=" + $("#query").val(),
        success: function (result) {
            console.log('data: ', result);
            var searchOutput = '';
            var len = result.items.length;
            for (i = 0; i < len; i++) {
                searchOutput += `<p><a href="${result.items[i].link}">${result.items[i].title}</a>: ${result.items[i].snippet}</p>`;
            }

            $("#searchResults").html(searchOutput);
        },
        error: function (error) {
            console.error('Error fetching search results:', error);
            // Handle the error if necessary...for testing purposes
            $("#searchResults").html("Error fetching search results");
        }
    });
}

function apiSearchLucky(query) {
    $.ajax({
        type: 'GET',
        dataType: "jsonp",
        url: "https://www.googleapis.com/customsearch/v1?key=AIzaSyBCtF3IyWvXcQplMIzkoWC5h_WvuA-8NiI&cx=c3d3cd77eee87448c&q=" + query,
        success: function (result) {
            console.log('data: ', result);

            if (result.items && result.items.length > 0) {
                const luckyResult = result.items[0];

                // Create a new paragraph element for the lucky result
                const luckyParagraph = document.createElement("p");
                luckyParagraph.innerHTML = `<a href="${luckyResult.link}">${luckyResult.title}</a>: ${luckyResult.snippet}`;

                // Append the lucky result to the "searchResults" div
                const searchResultsDiv = document.getElementById("searchResults");
                searchResultsDiv.innerHTML = "";
                searchResultsDiv.appendChild(luckyParagraph);
            } else {
                console.log("No lucky result found");
            }
        },
        error: function (err) {
            console.error('Error fetching data: ', err);
        }
    });
}






function displayResults(results) {
    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = results.map(result => `<p>${result}</p>`).join('');
}

function search() {
    const query = document.getElementById("query").value;
    apiSearch(query);
}

function searchLucky() {
    const query = document.getElementById("query").value;
    apiSearchLucky(query);
}

function changeBackgroundColor() {
    document.body.style.backgroundColor = getRandomColor();
}


function toggleFade() {
    const elementsToFade = ["header", "query", "searchButton"];

    elementsToFade.forEach(id => {
        $("#" + id).toggleClass("fade");
    });
}




function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
