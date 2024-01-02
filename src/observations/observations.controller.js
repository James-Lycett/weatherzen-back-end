const service = require("./observations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const moment = require("moment")

// Functions to handle CRUDL requests

const validSkyConditions = [100, 101, 102, 103, 104, 106, 108, 109]

// Request body validation
function hasData(req, res, next) {
    if (req.body.data) {
        return next()
    } else {
        next({
            status: 400,
            message:"body must have data property"
        })
    }
}

// latitude request property validation
function hasLatitude(req, res, next) {
    const latitude = Number(req.body.data.latitude)

    if (latitude >= -90 && latitude <= 90) {
        return next()
    } else {
        next({
            status: 400,
            message: "latitude must be between -90 and 90"
        })
    }
}

// longitude request property validation
function hasLongitude(req, res, next) {
    const longitude = Number(req.body.data.longitude)

    if (longitude >= -180 && longitude <= 180) {
        return next()
    } else {
        next({
            status: 400, 
            message: "longitude must be between -180 and 180"
        })
    }
}

// sky_condition request property validation
function hasSkyCondition(req, res, next) {
    const skyCondition = Number(req.body.data.sky_condition)

    if (validSkyConditions.includes(skyCondition)) {
        return next()
    } else {
        next({
            status: 400,
            message: `sky_condition must be one of: ${validSkyConditions}`
        })
    }
}

// air_temperature_unit request property validation, should run BEFORE 'hasAirTemperature' which also references this data
function hasAirTemperatureUnit(req, res, next) {
    const airTemperatureUnit = req.body.data.air_temperature_unit

    if (airTemperatureUnit.toUpperCase() === "C" || airTemperatureUnit.toUpperCase() === "F" ) {
        return next()
    } else {
        return next({
            status: 400,
            message: `air_temperature_unit must be either C or F`
        })
    }
}

// air_temperature request property validation
function hasAirTemperature(req, res, next) {
    const airTemperature = Number(req.body.data.air_temperature)
    const airTemperatureUnit = req.body.data.air_temperature_unit

    if (airTemperatureUnit.toUpperCase() === "C" && airTemperature > -50 && airTemperature < 107) {
        return next()
    } else if (airTemperatureUnit.toUpperCase() === "F" && airTemperature > -60 && airTemperature < 224) {
        return next()
    } else {
        next({
            status: 400,
            message: `air_temperature must be between -50 and 107 degrees C or -60 and 224 degrees F`
        })
    }
}

// POST request handler
async function create(req, res) {
    const newObservation = await service.create(req.body.data)

    res.status(201).json({
        data: newObservation,
    })
}

// GET all request handler
async function list(req, res) {
    const dbData = await service.list()

    // A more human-readable datetime format
    function formatTimestamp(timestamp) {
        return moment(timestamp).format("LLLL");
    }

    // convert sky_condition from numeric code to actual text value
    function decodeSkyCondition(code) {
        switch(code) {
            case 100:
                return "Cloudless"
            case 101:
                return "Some clouds"
            case 102:
                return "Cloud covered"
            case 103:
                return "Foggy"
            case 104:
                return "Raining"
            case 106:
                return "Snowing"
            case 108:
                return "Hailing"
            case 109:
                return "Thunderstorms"
            default:
                return "Unknown"
        }
    }

    function formatData(unformattedData) {
        const formattedData = []
        unformattedData.forEach((observation) => {
            formattedData.push({
                ...observation,
                created_at: formatTimestamp(observation.created_at),
                sky_condition: decodeSkyCondition(observation.sky_condition)
            })
        })

        return formattedData
    }

    const data = formatData(dbData)

    res.json({
        data,
    })
}

// GET by observationId request handler
async function read(req, res) {
    const { observationId } = req.params
    const data = await service.read(observationId)

    res.json({ data })
}

// check database for observation with given id
async function observationExists(req, res, next) {
    const { observationId } = req.params
    const observation = await service.read(observationId)

    if (observation) {
      res.locals.observation = observation
      return next();
    } else {
        return next({ status: 404, message: `Observation cannot be found.` })
    }
}

// PUT request handler
async function update(req, res) {     
    const updatedObservation = {
        ...req.body.data,
        observation_id: res.locals.observation.observation_id
    }
    const data = await service.update(updatedObservation)

    res.json({ data })
}

module.exports = {
    create: [
        hasData,
        hasLatitude,
        hasLongitude,
        hasSkyCondition,
        hasAirTemperature,
        hasAirTemperatureUnit,
        asyncErrorBoundary(create)
    ],
    list: asyncErrorBoundary(list),
    read: asyncErrorBoundary(read),
    update: [
        hasData, 
        hasLatitude, 
        hasLongitude, 
        hasAirTemperatureUnit, 
        hasAirTemperature, 
        observationExists, 
        asyncErrorBoundary(update)
    ]
}