import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
});

const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;