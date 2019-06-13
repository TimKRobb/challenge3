// Initialize the city list as an array
var cities = [];

// Open the city list file, parse it, sort it alphabetically and populate cities array

const cityFile = new XMLHttpRequest();
cityFile.onreadystatechange = function(event) {
    // XMLHttpRequest.DONE === 4
    if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
            cities = this.responseText.split("\n").sort();
         } else {
            alert("Fichier texte villes : %d (%s)", this.status, this.statusText);
        }
    }
};

cityFile.open('GET', './liste.txt', true);
cityFile.send(null);

// Define the function to be run every time we type somthing in the input field

var parseInput = function(inputValue) {
	clearResults();
	if (inputValue.length < 3 ) {return;}
	var found = 0;
	for (var i = 0; i < cities.length; i++) {
		searchRE = new RegExp(inputValue,"i");
		if ( cities[i].search(searchRE) != -1 ) {
			createResult(cities[i]);
			found++;
		}
		if (found == 25) {
			break;
		}
	}
}

var inputField = document.querySelector("input");
inputField.addEventListener("keyup",function() {
	parseInput(inputField.value);
});

// Define the functions that manage results

var clearResults = function() {
	var cityList = document.querySelector("#citylist");
	cityList.innerHTML = "";
}

var createResult = function(city) {
	var result = document.createElement("div");
	result.innerText = city;
	result.classList.add("citymatch");
	document.querySelector("#citylist").appendChild(result);
}