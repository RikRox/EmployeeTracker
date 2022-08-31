const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


//get all employees
router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employees`;

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
router.get('employee/:id', (req, res) => {
    const sql = `SELECT * FROM employees WHERE id = ?`;
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


//add an employee
router.post('/employees', ({body}, res) => {
    const sql = `INSERT INTO employees(id, firstName, lastName, title_id) VALUES(?,?,?,?)`;
    const params = [
        body.id,
        body.firstName,
        body.lastName,
        body.title_id
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



// update an employee
router.put('/employee/:id', (req, res) => {
    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;

    const params = [req.body.role_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({error: err.message});
        } else if (!result.affectedRows){
            res.json({
                message: 'employee not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});




module.exports = router;