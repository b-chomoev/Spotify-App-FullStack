import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: [true, 'Album is required'],
    },
    duration: {
        type: String,
        default: null,
    },
    track_number: {
        type: Number,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    }
});

const Track = mongoose.model('Track', TrackSchema);

export default Track;