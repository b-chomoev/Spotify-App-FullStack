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

    const [future, levanGorozia, raufFaik] = await Artist.create({
        name: 'Future',
        description: 'Future is American Rap Artist.',
        image: 'fixtures/future.png',
        isPublished: true,
    }, {
        name: 'Levan Gorozia',
        description: 'Levan Gorozia is Georgian Rap Artist.',
        image: 'fixtures/levan.png',
        isPublished: true,
    }, {
        name: 'Rauf & Faik',
        description: 'Rauf & Faik is Russian Pop Artist.',
        image: 'fixtures/raufFaik.png',
        isPublished: false,
    });

    const [highOffLife, futureAlbum, rassvet, alpha, youth2] = await Album.create({
        name: 'High Off Life',
        artist: future._id,
        date: 2020,
        image: 'fixtures/highOffLife.png',
        isPublished: true,
    }, {
        name: 'Future',
        artist: future._id,
        date: 2017,
        image: 'fixtures/futureAlbum.png',
        isPublished: true,
    },{
        name: 'Rassvet',
        artist: levanGorozia._id,
        date: 2021,
        image: 'fixtures/rassvet.png',
        isPublished: true,
    }, {
        name: 'Alpha',
        artist: levanGorozia._id,
        date: 2022,
        image: 'fixtures/alpha.png',
        isPublished: true,
    }, {
        name: 'Youth 2',
        artist: raufFaik._id,
        date: 2022,
        image: 'fixtures/youth2.png',
        isPublished: false,
    });

    await Track.create({
        name: 'Too Comfortable',
        album: highOffLife._id,
        duration: '3:15',
        track_number: 1,
        isPublished: true,
    }, {
        name: 'Hard To Choose One',
        album: highOffLife._id,
        duration: '4:05',
        track_number: 2,
        isPublished: true,
    }, {
        name: 'Last Name',
        album: highOffLife._id,
        duration: '3:45',
        track_number: 3,
        isPublished: true,
    }, {
        name: 'Trapped In The Sun',
        album: highOffLife._id,
        duration: '3:15',
        track_number: 4,
        isPublished: true,
    }, {
        name: 'Life Is Good',
        album: highOffLife._id,
        duration: '4:25',
        track_number: 5,
        isPublished: true,
    },{
        name: 'Rent Money',
        album: futureAlbum._id,
        duration: '4:25',
        track_number: 1,
        isPublished: true,
    }, {
        name: 'Mask Off',
        album: futureAlbum._id,
        duration: '4:05',
        track_number: 2,
        isPublished: true,
    }, {
        name: 'Zoom',
        album: futureAlbum._id,
        duration: '3:45',
        track_number: 3,
        isPublished: true,
    }, {
        name: 'Draco',
        album: futureAlbum._id,
        duration: '3:15',
        track_number: 4,
        isPublished: true,
    }, {
        name: 'Life Is Good',
        album: futureAlbum._id,
        duration: '4:25',
        track_number: 5,
        isPublished: true,
    },{
        name: 'V Samamom Nachale',
        album: rassvet._id,
        duration: '4:25',
        track_number: 1,
        isPublished: true,
    }, {
        name: 'Outro',
        album: rassvet._id,
        duration: '4:05',
        track_number: 2,
        isPublished: true,
    }, {
        name: 'Park Gorkogo',
        album: rassvet._id,
        duration: '3:45',
        track_number: 3,
        isPublished: true,
    }, {
        name: 'Ne pokiday menya',
        album: rassvet._id,
        duration: '3:15',
        track_number: 4,
        isPublished: true,
    }, {
        name: 'Korabli',
        album: rassvet._id,
        duration: '4:25',
        track_number: 5,
        isPublished: true,
    },{
        name: 'Alpha',
        album: alpha._id,
        duration: '4:25',
        track_number: 1,
        isPublished: true,
    }, {
        name: 'Plyazh',
        album: alpha._id,
        duration: '4:05',
        track_number: 2,
        isPublished: true,
    }, {
        name: 'Hoodie',
        album: alpha._id,
        duration: '3:45',
        track_number: 3,
        isPublished: true,
    }, {
        name: 'Bandity',
        album: alpha._id,
        duration: '3:15',
        track_number: 4,
        isPublished: true,
    }, {
        name: 'Korabli',
        album: alpha._id,
        duration: '4:25',
        track_number: 5,
        isPublished: true,
    }, {
        name: 'Navsegda',
        album: youth2._id,
        duration: '3:35',
        track_number: 1,
        isPublished: false,
    }, {
        name: 'Vremya Letit',
        album: youth2._id,
        duration: '4:25',
        track_number: 2,
        isPublished: false,
    }, {
        name: 'Oshibka',
        album: youth2._id,
        duration: '4:25',
        track_number: 3,
        isPublished: false,
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