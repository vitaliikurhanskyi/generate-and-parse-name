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

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

let randomCountry = getRandomInt(countriesList.countries.length);

let deffaultCountry = countriesList.countries[randomCountry].countryCode;

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

let generateNameButton = document.querySelector('#generate-name');

generateNameButton.onclick = function () {


	if (!window.navigator.onLine) {
		Error("Internet Connection Problem!");
		return;
	}

	if (window.navigator.onLine && document.querySelector('.internet-contection-error')) {
		document.querySelector('.internet-contection-error').remove();
	}

	fetch(`https://api.parser.name/?api_key=c3cbb6b73739c61bebeb7cbdba7bffff&endpoint=generate&country_code=${deffaultCountry}`)
		.then(data => {
			if (data.ok) {
				return data.json();
			}
			console.log(data.ok);
		})
		.then(data => {
			inputNameValue(data);
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
				if (data.results == 0) {
					Error(data.error);
					return;
				}
				if (data.results == 1) cardData(data);
			}).catch(error => {
				console.log(error);
			});
	}
}


function cardData(data) {
	let fullName = document.querySelector('#person-full-name');
	let demonym = document.querySelector('#demonym');
	let firstName = data.data[0].name.firstname.name;
	let lastName = data.data[0].name.lastname.name;
	let salutation = data.data[0].salutation.salutation;
	fullName.innerText = `${salutation} ${firstName} ${lastName}`;
	demonym.innerText = data.data[0].country.demonym;
}

// #validate and parse inputs

// https://api.parser.name/?api_key=c3cbb6b73739c61bebeb7cbdba7bffff&endpoint=parse&name=John%20Bruch&country_code=AU

// https://api.parser.name/?api_key=c3cbb6b73739c61bebeb7cbdba7bffff&endpoint=parse&name=faefwef%20awefawef&country_code=AU
