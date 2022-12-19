const axios = require("axios");

const BASE_URL = `http://localhost:9000/api`

module.exports = {
    httpGetCars: () => axios({
        method:"GET",
        url : BASE_URL + `/cars/`
    })
}