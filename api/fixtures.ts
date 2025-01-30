import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import {randomUUID} from "node:crypto";
import User from "./models/User";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('albums');
        await db.dropCollection('artists');
        await db.dropCollection('tracks');
        await db.dropCollection('trackhistories');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not present');
    }

    const [future, levanGorozia] = await Artist.create({
        name: 'Future',
        description: 'Future is American Rap Artist.',
        image: 'fixtures/future.png',
    }, {
        name: 'Levan Gorozia',
        description: 'Levan Gorozia is Georgian Rap Artist.',
        image: 'fixtures/levan.png',
    });

    const [highOffLife, futureAlbum, rassvet, alpha] = await Album.create({
        name: 'High Off Life',
        artist: future._id,
        date: 2020,
        image: 'fixtures/highOffLife.png',
    }, {
        name: 'Future',
        artist: future._id,
        date: 2017,
        image: 'fixtures/futureAlbum.png',
    },{
        name: 'Rassvet',
        artist: levanGorozia._id,
        date: 2021,
        image: 'fixtures/rassvet.png',
    }, {
        name: 'Alpha',
        artist: levanGorozia._id,
        date: 2022,
        image: 'fixtures/alpha.png',
    });

    await Track.create({
        name: 'Too Comfortable',
        album: highOffLife._id,
        duration: '3:15',
        track_number: 1,
    }, {
        name: 'Hard To Choose One',
        album: highOffLife._id,
        duration: '4:05',
        track_number: 2,
    }, {
        name: 'Last Name',
        album: highOffLife._id,
        duration: '3:45',
        track_number: 3,
    }, {
        name: 'Trapped In The Sun',
        album: highOffLife._id,
        duration: '3:15',
        track_number: 4,
    }, {
        name: 'Life Is Good',
        album: highOffLife._id,
        duration: '4:25',
        track_number: 5,
    },{
        name: 'Rent Money',
        album: futureAlbum._id,
        duration: '4:25',
        track_number: 1,
    }, {
        name: 'Mask Off',
        album: futureAlbum._id,
        duration: '4:05',
        track_number: 2,
    }, {
        name: 'Zoom',
        album: futureAlbum._id,
        duration: '3:45',
        track_number: 3,
    }, {
        name: 'Draco',
        album: futureAlbum._id,
        duration: '3:15',
        track_number: 4,
    }, {
        name: 'Life Is Good',
        album: futureAlbum._id,
        duration: '4:25',
        track_number: 5,
    },{
        name: 'V Samamom Nachale',
        album: rassvet._id,
        duration: '4:25',
        track_number: 1,
    }, {
        name: 'Outro',
        album: rassvet._id,
        duration: '4:05',
        track_number: 2,
    }, {
        name: 'Park Gorkogo',
        album: rassvet._id,
        duration: '3:45',
        track_number: 3,
    }, {
        name: 'Ne pokiday menya',
        album: rassvet._id,
        duration: '3:15',
        track_number: 4,
    }, {
        name: 'Korabli',
        album: rassvet._id,
        duration: '4:25',
        track_number: 5,
    },{
        name: 'Alpha',
        album: alpha._id,
        duration: '4:25',
        track_number: 1,
    }, {
        name: 'Plyazh',
        album: alpha._id,
        duration: '4:05',
        track_number: 2,
    }, {
        name: 'Hoodie',
        album: alpha._id,
        duration: '3:45',
        track_number: 3,
    }, {
        name: 'Bandity',
        album: alpha._id,
        duration: '3:15',
        track_number: 4,
    }, {
        name: 'Korabli',
        album: alpha._id,
        duration: '4:25',
        track_number: 5,
    });

    await User.create({
        username: 'John',
        password: '123',
        role: 'admin',
        token: randomUUID(),
    }, {
        username: 'Jane',
        password: '123',
        role: 'user',
        token: randomUUID(),
    });

    await db.close();
};

run().catch(err => console.log(err));