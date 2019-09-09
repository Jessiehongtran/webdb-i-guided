const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
// get data from database and return it to client
// select * from posts

// all db operations return a promise
db.select('id', 'title')
    .from('posts')
    .then(posts => {
    res.status(200).json(posts)
    })
    .catch(err => res.json(err))
    });

router.get('/:id', (req, res) => {
// select * from posts where id = 2
const {id} = req.params;
db('posts').where({ id}) // always returns an array 
    // .select('*')
    // .from('posts')
    .first() // picks the first element of the resulting array
    .then(posts => {
        res.status(200).json(posts)
        })
        .catch(err => res.json(err))
        });


router.post('/', (req, res) => {
// insert into post () value ()
const postData = req.body
// validate the data before inserting into db
console.log(postData)
db('posts').insert(postData, 'id')
            .then(([id]) => {
                db('posts').where({ id}) 
                .first() 
                .then(posts => {
                    res.status(200).json(posts)
                    })
                    
            })
            .catch(err => res.json(err))
            
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    db('posts')
    .where({id: req.params.id})
    .update(changes)
    .then(count => {
        res.status(200).json({message: `updated ${count} records`})
        })
        .catch(err => res.json(err))
});

router.delete('/:id', (req, res) => {
db('posts').where({id: req.params.id}).del()
    .then(count => {
    res.status(200).json({message: `deleted ${count} records`})
    })
    .catch(err => res.json(err))
});

module.exports = router;