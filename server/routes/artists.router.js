const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js')

router.get('/', (req, res) => {
    console.log(`In /artist GET`);
    const queryText = `
        SELECT * FROM "artists"
        ORDER BY "birthdate" DESC;
        `;
    pool.query(queryText).then((result) => {
        console.log(result)
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.send(500);
    })
});

router.post('/', (req, res) => {
    console.log(req.body);
    const newArtist = req.body;
    const queryText = `
        INSERT INTO "artists" ("name", "birthdate")
        VALUES ($1, $2);
    `;
    pool.query(queryText, [newArtist.name, newArtist.birthdate])
        .then((result) => {
            console.log(result);
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
});


module.exports = router;
