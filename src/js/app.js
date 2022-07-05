import '../../node_modules/bootstrap/dist/js/bootstrap.js';
//import * as flsFunctions from "./modules/functions.js";
import * as countriesList from "./modules/countries.js";

//flsFunctions.isWebp();

let dropDownCountriesMenu = document.querySelector('#select-countries');

dropDownCountriesMenu.innerHTML = setCountriesForBtn();

function setCountriesForBtn() {
	let htmlDropDownElem = `<button class="select-country dropdown-item" type="button">Random</button>`;
	for (let i = 0; i < countriesList.countries.length; i++) {
		htmlDropDownElem += `<button id="${countriesList.countries[i].countryCode}" class="select-country dropdown-item" type="button">${countriesList.countries[i].country}</button>`;
	}
	return htmlDropDownElem;
}

let chooseCountry = document.querySelectorAll('.select-country');

let buttonSelectCountryName = document.querySelector('.btn-inner-text');

function inputNameValue(data) {
	document.querySelector('#first-name').value = data.data[0].name.firstname.name;
	document.querySelector('#last-name').value = data.data[0].name.lastname.name;
}

function Error(text) {
	if ((window.navigator.onLine && document.querySelector(".internet-contection-error") || document.querySelector(".internet-contection-error"))) {
		document.querySelector(".internet-contection-error").remove();
	}
	let interneOffline = document.createElement("div");
	interneOffline.setAttribute("class", "internet-contection-error");
	interneOffline.innerHTML = `<div class="alert alert-danger" role="alert">${text}</div>`;
	document.querySelector(".container").before(interneOffline);
	return;
}

let random = false;

let deffaultCountry = randomCountry();

//console.log(deffaultCountry);

function randomCountry() {
	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}
	let randomCountryCode = getRandomInt(countriesList.countries.length);
	let randomCountry = countriesList.countries[randomCountryCode].countryCode;
	return randomCountry;
}

chooseCountry.forEach(function (elem) {
	elem.onclick = function (elem) {
		if (elem.srcElement.innerText === "Random") {
			deffaultCountry = randomCountry();
			//console.log(deffaultCountry);
			buttonSelectCountryName.innerText = this.innerText;
			random = true;
			return;
		}
		deffaultCountry = this.getAttribute('id');
		buttonSelectCountryName.innerText = this.innerText;
		console.log(deffaultCountry);
		random = false;
		return;
	}
});

let generateNameButton = document.querySelector('#generate-name');

generateNameButton.onclick = function () {

	if (random) deffaultCountry = randomCountry();

	if (!window.navigator.onLine) {
		Error("Internet Connection Problem!");
		return;
	}

	if (window.navigator.onLine && document.querySelector('.internet-contection-error')) document.querySelector('.internet-contection-error').remove();

	fetch(`https://api.parser.name/?api_key=c3cbb6b73739c61bebeb7cbdba7bffff&endpoint=generate&country_code=${deffaultCountry}`)
		.then(data => {
			return data.json();
		})
		.then(data => {
			if (data.error) Error(data.error);
			else inputNameValue(data);
		});

}

// #validate and parse inputs

let btnSubmitHeader = document.querySelector('#btn-submit-header');

let firstName = document.querySelector("#first-name");

let lastName = document.querySelector("#last-name");

function inputEmptyNameError(attributeName, errorText, insertFor) {
	if (document.getElementById(attributeName)) {
		document.getElementById(attributeName).remove();
	}
	let firstNameError = document.createElement("span");
	firstNameError.setAttribute("id", attributeName);
	firstNameError.style.color = "red";
	firstNameError.innerHTML = `<div class="header-alerts alert alert-danger" role="alert">${errorText}</div>`;
	insertFor.after(firstNameError);
}

btnSubmitHeader.onclick = function () {
	if (firstName.value && document.querySelector("#firstNameEror")) document.querySelector("#firstNameEror").remove();

	if (lastName.value && document.querySelector("#lastNameEror")) document.querySelector("#lastNameEror").remove();

	if (firstName.value === '' || firstName.value === null) inputEmptyNameError("firstNameEror", "Please Enter Your First Name!!!", firstName);

	if (lastName.value === '' || lastName.value === null) inputEmptyNameError("lastNameEror", "Please Enter Your Last Name!!!", lastName);

	if (lastName.value && firstName.value) {
		fetch(`https://api.parser.name/?api_key=c3cbb6b73739c61bebeb7cbdba7bffff&endpoint=parse&name=${firstName.value}%20${lastName.value}&country_code=${deffaultCountry}`)
			.then(data => {
				return data.json();
			})
			.then(data => {
				if (data.error) Error(data.error);
				if (data.results == 0) {
					Error(data.error);
					return;
				}
				if (data.results == 1) cardData(data); console.log(data);
			});
	}
}

function cardData(data) {

	let firstName = data.data[0].name.firstname.name;
	let lastName = data.data[0].name.lastname.name;
	let salutation = data.data[0].salutation.salutation;
	let gender = data.data[0].name.firstname.gender_formatted;
	let countryDemonym = data.data[0].country.demonym;
	let country = data.data[0].country.name;
	let continent = data.data[0].country.continent;
	let language = data.data[0].country.primary_language;

	let fullName = document.querySelector('#person-full-name');
	let demonym = document.querySelector('#demonym');
	let cardCountry = document.querySelector('#card-country');
	let cardLanguage = document.querySelector('#card-language');


	fullName.innerHTML = `<span class="text-color-blue">${salutation} ${firstName} ${lastName}</span>`;
	demonym.innerHTML = `<span class="text-color-orange">${gender} - ${countryDemonym}</span>`;
	cardCountry.innerHTML = `<span class="text-color-blue">Country:</span>  <span class="text-color-orange">${country} - ${continent}</span>`;
	cardLanguage.innerHTML = `<span class="text-color-blue">Primary Language:</span>  <span class="text-color-orange">${language}</span>`;
}

// #validate and parse inputs

// https://api.parser.name/?api_key=c3cbb6b73739c61bebeb7cbdba7bffff&endpoint=parse&name=John%20Bruch&country_code=AU

// https://api.parser.name/?api_key=c3cbb6b73739c61bebeb7cbdba7bffff&endpoint=parse&name=faefwef%20awefawef&country_code=AU



