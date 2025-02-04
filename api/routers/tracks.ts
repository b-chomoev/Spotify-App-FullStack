import express from "express";
import Album from "../models/Album";
import Track from "../models/Track";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const trackRouter = express.Router();

trackRouter.get('/', async (req, res, next) => {
    const albumQuery = req.query.album;

    try {
        if (albumQuery) {
            const tracks = await Track.find({album: albumQuery}).populate('album').sort({track_number: 1});
            res.send(tracks);
            return;
        }

        const tracks = await Track.find().select('-__v');
        res.send(tracks);
    } catch (e) {
        next(e);
    }
});

trackRouter.post('/', auth, async (req, res, next) => {
    if (req.body.album) {
        const album = await Album.findById(req.body.album);

        if (!album) res.status(404).send({error: 'Album not found'});
    }

    const newTrack = {
        name: req.body.name,
        album: req.body.album,
        duration: req.body.duration,
    }

    try {
        const track = new Track(newTrack);
        await track.save();
        res.send(track);
    } catch (e) {
        next(e);
    }
});

trackRouter.delete('/:id', auth, permit('admin'),async (req, res, next) => {
    const {id} = req.params;

    try {
        const deletedTrack = await Track.findByIdAndDelete(id);

        if (!deletedTrack) {
            res.status(404).send({error: 'Track not found'});
            return;
        }

        res.send({message: 'Track deleted!'});
    } catch (e) {
        next(e);
    }
});

trackRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    const {id} = req.params;

    try {
        const track = await Track.findById(id);

        if (!track) {
            res.status(404).send({error: 'Track not found'});
            return;
        }

        track.isPublished = !track.isPublished;
        await track.save();

        res.send(track);
    } catch (e) {
        next(e);
    }
});

export default trackRouter;