var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var timeZone = require('mongoose-timezone');
var timestamps = require('mongoose-timestamp');

var Schema = mongoose.Schema;

var archiveSchema = new Schema({
    id: Number,
    type: String,
    link: String,
    count: Number,
    title: String,
    read: Boolean,
    date: { type: Date, default: Date.now },
    update: { type: Date  }
}, {collection: 'archive'});

archiveSchema.plugin(mongoosePaginate);
archiveSchema.plugin(timestamps, { date: 'date', update: 'update' });
archiveSchema.plugin(timeZone, { paths: ['date', 'update'] });

module.exports = mongoose.model('archive', archiveSchema);
