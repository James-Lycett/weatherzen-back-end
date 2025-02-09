const router = require("express").Router({ mergeParams: true })
const controller = require("./observations.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

// CRUDL request handling for /observations routes

router.route("/")
.post(controller.create)
.get(controller.list)
.all(methodNotAllowed)

router.route("/edit/:observationId")
.get(controller.read)
.put(controller.update)
.all(methodNotAllowed)


module.exports = router