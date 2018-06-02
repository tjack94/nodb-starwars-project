var axios= require("axios")

var visitedPlanets = []

module.exports ={
    read: (req, res) =>{
        res.status(200).send(visitedPlanets)
    },
    post: (req, res) =>{
        const visitedPlanet = req.body;
        visitedPlanets.push(visitedPlanet)
        res.status(200).send(visitedPlanets)
    },
    update: (req, res) =>{
        const index = req.params.index;
        const updatedPlanet = req.body
console.log(req.body)
        visitedPlanets.splice(index,1,updatedPlanet)
        res.status(200).send(updatedPlanet)
    },
    delete: (req, res)=>{
        const index = req.params.id

        visitedPlanets.splice(Number(index),1)
        res.sendStatus(204);
    }
}