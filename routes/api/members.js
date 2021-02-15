const express = require('express'),
    uuid = require('uuid'),
    router = express.Router(),
    members = require('../../Members');


// GETS All Members
router.get('/', (req, res) => res.json(members));

// GET Single Member
router.get('/:id', (req, res) => {
    let found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `NO member with the id of ${ req.params.id }` })
    }
});

// Create Member // Post Request
router.post('/', (req, res) => {
    let newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email' });
    }

    members.push(newMember);
    // res.redirect('/'); // for after "add member" button is used
    res.json(members);
});

// UPDATE Member // PUT request
router.put('/:id', (req, res) => {
    const updMember = req.body;
    members.forEach(member => {
        if (member.id === parseInt(req.params.id)) {
            member.name = updMember.name ? updMember.name : member.name;
            member.email = updMember.email ? updMember.email : member.email;
            res.json({ msg: 'Member Updated', member })
        }
    });
});


// DELETE
router.delete('/:id', (req, res) => {
    let found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json({
            msg: 'Member Deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `No member with id of ${ req.params.id }` });
    }
});






module.exports = router