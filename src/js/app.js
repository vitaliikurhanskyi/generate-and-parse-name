import '../../node_modules/bootstrap/dist/js/bootstrap.js';
//import * as flsFunctions from "./modules/functions.js";
import * as countriesList from "./modules/countries.js";

//flsFunctions.isWebp();

let dropDownCountriesMenu = document.querySelector('#select-countries');

dropDownCountriesMenu.innerHTML = setCountriesForBtn();

function setCountriesForBtn() {
	let htmlDropDownElem = '';
	for (let i = 0; i < countriesList.countries.length; i++) {
		htmlDropDownElem += `<button id="${countriesList.countries[i].countryCode}" class="select-country dropdown-item" type="button">${countriesList.countries[i].country}</button>`;
	}
	return htmlDropDownElem;
}

let chooseCountry = document.querySelectorAll('.select-country');

let deffaultCountry = 'BE';

let buttonSelectCountryName = document.querySelector('.btn-inner-text');

chooseCountry.forEach(function (elem) {
	elem.onclick = function () {
		deffaultCountry = this.getAttribute('id');
		buttonSelectCountryName.innerText = this.innerText;
	}
});

function inputNameValue(data) {
	document.querySelector('#first-name').value = data.data[0].name.firstname.name;
	document.querySelector('#last-name').value = data.data[0].name.lastname.name;
}

let generateNameButton = document.querySelector('#generate-name');

generateNameButton.onclick = function () {
	fetch(`https://api.parser.name/?api_key=c3cbb6b73739c61bebeb7cbdba7bffff&endpoint=generate&country_code=${deffaultCountry}`)
		.then(data => {
			return data.json();
		})
		.then(data => {
			inputNameValue(data);
		})
}

let btnSubmitHeader = document.querySelector('#btn-submit-header');

let firstName = document.querySelector("#first-name");

let lastName = document.querySelector("#last-name");

btnSubmitHeader.onclick = function () {
	if (firstName.value && document.querySelector("#firstNameEror")) {
		document.querySelector("#firstNameEror").remove();
	}

	if (lastName.value && document.querySelector("#lastNameEror")) {
		document.querySelector("#lastNameEror").remove();
	}
	if (firstName.value === '' || firstName.value === null) {
		if (document.querySelector("#firstNameEror")) {
			document.querySelector("#firstNameEror").remove();
		}
		let firstNameError = document.createElement("span");
		firstNameError.setAttribute("id", "firstNameEror");
		firstNameError.style.color = "red";
		firstNameError.innerHTML = `<div class="header-alerts alert alert-danger" role="alert">Please Enter Your First Name!!!</div>`;
		firstName.after(firstNameError);
	}
	if (lastName.value === '' || lastName.value === null) {
		if (document.querySelector("#lastNameEror")) {
			document.querySelector("#lastNameEror").remove();
		}
		let lastNameError = document.createElement("span");
		lastNameError.setAttribute("id", "lastNameEror");
		lastNameError.style.color = "red";
		lastNameError.innerHTML = `<div class="header-alerts alert alert-danger" role="alert">Please Enter Your Last Name!!!</div>`;
		lastName.after(lastNameError);
	}
}

//console.log(countriesList.countries);

//https://api.parser.name/?api_key=c3cbb6b73739c61bebeb7cbdba7bffff&endpoint=parse&name=Sarah%20Jones

//https://api.parser.name/?api_key=c3cbb6b73739c61bebeb7cbdba7bffff&endpoint=parse&name[]=John%20Bruch&name[]=Sarah%20Jones