import mongoose from "mongoose";
import config from "./config";
import {randomUUID} from "node:crypto";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('album');
        await db.dropCollection('artists');
        await db.dropCollection('track');
        await db.dropCollection('trackHistories');
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
        date: '2020-01-01',
        image: 'fixtures/highOffLife.png',
    }, {
        name: 'Future',
        artist: future._id,
        date: '2017-01-01',
        image: 'fixtures/futureAlbum.png',
    },{
        name: 'Rassvet',
        artist: levanGorozia._id,
        date: '2021-01-01',
        image: 'fixtures/rassvet.png',
    }, {
        name: 'Alpha',
        artist: levanGorozia._id,
        date: '2022-01-01',
        image: 'fixtures/alpha.png',
    });

    await Track.create({
        name: 'Too Comfortable',
        album: highOffLife._id,
        duration: '3:15',
    }, {
        name: 'Hard To Choose One',
        album: highOffLife._id,
        duration: '4:05',
    }, {
        name: 'Last Name',
        album: highOffLife._id,
        duration: '3:45',
    }, {
        name: 'Trapped In The Sun',
        album: highOffLife._id,
        duration: '3:15',
    },{
        name: 'Rent Money',
        album: futureAlbum._id,
        duration: '4:25',
    }, {
        name: 'Mask Off',
        album: futureAlbum._id,
        duration: '4:05',
    }, {
        name: 'Zoom',
        album: futureAlbum._id,
        duration: '3:45',
    }, {
        name: 'Draco',
        album: futureAlbum._id,
        duration: '3:15',
    },{
        name: 'V Samamom Nachale',
        album: rassvet._id,
        duration: '4:25',
    }, {
        name: 'Outro',
        album: rassvet._id,
        duration: '4:05',
    }, {
        name: 'Park Gorkogo',
        album: rassvet._id,
        duration: '3:45',
    }, {
        name: 'Ne pokiday menya',
        album: rassvet._id,
        duration: '3:15',
    },{
        name: 'Alpha',
        album: alpha._id,
        duration: '4:25',
    }, {
        name: 'Plyazh',
        album: alpha._id,
        duration: '4:05',
    }, {
        name: 'Hoodie',
        album: alpha._id,
        duration: '3:45',
    }, {
        name: 'Bandity',
        album: alpha._id,
        duration: '3:15',
    });

    await db.close();
};

run().catch(err => console.log(err));