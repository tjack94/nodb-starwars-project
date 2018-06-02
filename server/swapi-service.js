const axios = require('axios').default;

function getUriRecursively(url) {
    return axios.get(url)
        .then(response => {
            if (response.data.next) {
                return getUriRecursively(response.data.next)
                    .then(results => {
                        return [
                            ...response.data.results,
                            ...results,
                        ];
                    });
            }

            return response.data.results;
        })
}

module.exports = {
    getUriRecursively,
};