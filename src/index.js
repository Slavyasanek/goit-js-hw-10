import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    searchBar: document.querySelector('#search-box'),
    outputCountries: document.querySelector('.country-list'),
    outputInfo: document.querySelector('.country-info')
}

const searchCountry = () => {
    if (refs.searchBar.value.trim() === "") {
        return;
    }
    fetchCountries(refs.searchBar.value.trim())
        .then((data) => listOuput(data))
        .catch(() => {
            Notiflix.Notify.failure(
                'Oops, there is no country with that name', {
                timeout: 2000,
                cssAnimationStyle: 'zoom',
            });
        })
}

const renderInfo = (countries) => {
    const descrInsert = countries.map(({ capital, population, languages }) => {
        return `<h4>Capital: ${capital}</h4>
        <h4>Population: ${population}</h4>
        <h4>Languages: ${Object.values(languages).join(', ')}</h4>`
    });
    refs.outputInfo.insertAdjacentHTML("beforeend", descrInsert);
}

const renderCountries = (countries) => {
    if (countries.length === 1) {
        renderInfo(countries)
    }
    const infoInsert = countries.map(({ name, flags }) => {
        return `<li class="country-item">
            <img src="${flags.svg}" width="30">
            <h2 class="country-name">${name.official}</h2></li>
            </ul>`
    }).join("");
    refs.outputCountries.insertAdjacentHTML("beforeend", infoInsert);
}

const listOuput = (data) => {
    refs.outputCountries.innerHTML = "";
    refs.outputInfo.innerHTML = "";
    if (data.length > 10) {
        Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.', {
            timeout: 2000,
            cssAnimationStyle: 'zoom',
        }
        )
    } else {
        renderCountries(data);
    }
}

refs.searchBar.addEventListener("input", debounce(searchCountry, 300));
