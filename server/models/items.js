const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    username:String,
    items:{type:Array}
})

const ItemList = new mongoose.model('TodoList',itemSchema) 
module.exports = ItemList;

