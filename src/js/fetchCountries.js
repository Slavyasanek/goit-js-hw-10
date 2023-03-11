export const fetchCountries = countryName => {
    const searchFilter = new URLSearchParams({
        fields: ['name', 'capital', 'population', 'flags', 'languages'],
    });

    return fetch(`https://restcountries.com/v3.1/name/${countryName}?${searchFilter}`)
    .then(r => {
        return r.json();
    })
}