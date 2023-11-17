const fetch = require('node-fetch');

module.exports = {
    fetchActors
};

async function fetchActors(req, res) {
    try {
        const response = await fetch(req.params['proxyUrl'] + req.params[0]);
        const actorData = await response.json();
        console.log(actorData)
        res.json(actorData);
    } catch (error) {
        console.error("Error: ", error);
    }
}