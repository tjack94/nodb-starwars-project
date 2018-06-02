var axios= require("axios")
var swapiService = require('./swapi-service');

var planets= []


swapiService.getUriRecursively('https://swapi.co/api/planets')
    .then(response => planets = response)
    .catch(err => console.warn(err));

// axios.get('https://swapi.co/api/planets').then(response=> planets = response.data.results)

module.exports= {
    read: (req, res) =>{
        res.status(200).send(planets)
    },

    }


