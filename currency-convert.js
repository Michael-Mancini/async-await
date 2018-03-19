// Async/Await example

const axios = require('axios');

const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
        const rate = response.data.rates[to];

        if (rate) {
            return rate;
        } else {
            throw new Error(`Unable to get exchange rate for ${from} to ${to}.`);
        }
    } catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} to ${to}.`);
    }
};

const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`http://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    } catch (e) {
        throw new Error(`Unable to get countries that use ${currencyCode}.`);
    }
};

const convertCurrencyPromise = (from, to, amount) => {
    let countries;
    return getCountries(to).then((tempCountries) => {
        countries = tempCountries;
        return getExchangeRate(from, to);
    }).then((rate) => {
        const exchangedAmount = amount * rate;

        return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
    });
};

const convertCurrency = async (from, to, amount) => {
    const countries = await getCountries(to);
    const rate = await getExchangeRate(from, to);

    const exchangedAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
};

convertCurrency('USD', 'EUR', 1000).then((country) => {
    console.log(country);
}).catch(e => console.log(e.message));