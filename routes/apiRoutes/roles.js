const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


//get all employees
router.get('/roles', (req, res) => {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, rows) => {
        if(err){
        res.status(500).json({ error: err.message});
        return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//get single employee
router.get('role/:id', (req, res) => {
    const sql = `SELECT * FROM roles WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});


//add a role
router.post('/roles', ({body}, res) => {
    const sql = `INSERT INTO roles(id, title, dept_id, salary VALUES(?,?,?,?)`;
    const params = [
        body.id,
        body.title,
        body.dept_id,
        salary
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({message: 'success',
        data: body
        });
    });

});


module.exports = router;