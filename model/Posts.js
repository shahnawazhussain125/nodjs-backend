const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user_id : {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    blood_group: {
        type: String,
        required: true
    },
    no_of_blood_required: {
        type: Number,
        required: true
    },
    urgency: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
    relationship_with_patient: {
        type: String,
        required: true
    },
    contact_no: {
        type: String,
        required: true
    },
    additional_instruction: String,
    voluntreers_uptill_now: Number,
    current_requirement: Number,
    voluntreers: Array,
    comments: Array

});

const Posts = mongoose.model("Posts", postSchema);

module.exports = Posts;
