let nextId = 1

async function create(req, res) {
    const newObservation = req.body.data

    const now = new Date().toISOString()
    newObservation.observation_id = nextId++
    newObservation.created_at = now
    newObservation.updated_at = now

    res.status(201).json({
        data: newObservation,
    })
}

module.exports = {
    create,
}