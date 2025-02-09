const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// create user
app.post('/users', async (req, res) => {
    try {
        const {username, password} = req.body;
        const resault = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id, username',
            [username, password]
        )
        res.json(resault.rows[0]);
    } catch (err) {
        res.json({error: err.message})
    }
})

// see users
app.get('/users', async (req, res) => {
    try {
        const resault = await pool.query('SELECT username FROM users')
        res.json(resault.rows)
    } catch (err) {
        res.json({error: err.message})
    }
})

// see one user
app.get('/users/:id', async (req, res) => {
    try {
        const resault = await pool.query(
            'SELECT user_id, username FROM users WHERE user_id=$1',
            [req.params.id]
        )
        if (resault.rows.length > 0) {
            res.json(resault.rows[0])
        } else {
            res.json({error: 'No data'})
        }
    } catch (err) {
        res.json({error: err.message})
    }
})

// send every post as json
app.get('',async (req, res) => {
    try {
        const resault = await pool.query('SELECT * FROM posts')
        res.json({'posts': resault.rows})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// send the requested post
app.get('/posts/:id', async (req, res) => {
    try {
        const resault = await pool.query(
            "SELECT * FROM posts WHERE post_id = $1",
            [req.params.id]
        );
        // Check if data exists
        if (resault.rows.length > 0) {
            res.json({data: resault.rows})
        } else {
            res.json({error: "No data"})
        }
    } catch (err) {
        res.json({error: err.message})
    }
})

// create new post
app.post('/post', async (req, res) => {
    try {
        const {topic, desc = "No desctiption", author = "No author" } = req.body;
        resault = await pool.query("INSERT INTO posts (topic, description, author) VALUES ($1, $2, $3) RETURNING *",
            [topic, desc, author]
        );
        res.json(resault.rows);
    } catch (err) {
        res.json({error: err.message})
    }
})

// delete post method
app.delete('/post/:id', async (req, res) => {
    try {
        const resault = await pool.query("DELETE FROM posts WHERE post_id = $1 RETURNING *", [req.params.id]);
        if (resault.rows.length > 0) {
            res.json(resault.rows[0]);
        } else {
            res.json({error: "Invalid post ID"})
        }
    } catch (err) {
        res.json({error: err.message});
    }
})

// update post method
app.put('/post/:id', async (req, res) => {
    try {
        const {topic=await pool.query('SELECT topic FROM posts WHERE post_id=$1', [req.params.id]), 
            desc=await pool.query('SELECT description FROM posts WHERE post_id=$1', [req.params.id]), 
            author=await pool.query('SELECT author FROM posts WHERE post_id=$1', [req.params.id])} = req.body
        const resault = await pool.query(
            'UPDATE posts SET topic=$1, description=$2, author=$3 WHERE post_id=$4 RETURNING *',
            [topic, desc, author, req.params.id]
        );
        if (resault.rows.length > 0) {
            res.json(resault.rows[0])
        } else {
            res.json({error: "Invalid post ID"})
        }
    } catch (err) {
        res.json({error: err.message})
    }

})

app.listen(3000, () => console.log("Server running on port 3000"));