const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UpdatesSchema = new Schema({
    blogNo: {
        type: Number,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    media: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    }
});

const news = mongoose.model('Updates', UpdatesSchema);

module.exports = {
    fetchNews: ()=> {
        return news.find().limit(20);
    },
    fetchOne: (id)=> {
        return news.findById(id);
    }
}
