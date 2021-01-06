const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js')


router.get('/', (req, res) => {
    console.log(`In /songs GET`);
    const queryText = `
        SELECT * FROM "songs"
        ORDER BY "title";
    `;
    pool.query(queryText).then((result) => {
        console.log(result);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
    const newSong = req.body;
    const queryText = `
    INSERT INTO "songs" ("title", "length", "released")
    VALUES ($1, $2, $3);
    `;
    pool.query(queryText, [newSong.title, newSong.length, newSong.released])
        .then((result) => {
            console.log(result);
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

module.exports = router;
