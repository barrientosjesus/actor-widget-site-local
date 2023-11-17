const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: String,
    path: String
})

const actorImageSchema = new Schema({
    actorID: {
        type: String,
        required: true,
        unique: true
    },
    img: imageSchema,
    consumable: imageSchema,
    weapon: imageSchema,
    status: imageSchema
});

module.exports = mongoose.model('ActorImages', actorImageSchema);