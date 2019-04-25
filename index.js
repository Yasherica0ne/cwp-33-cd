const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { Ability, AbilityBuilder, ForbiddenError } = require('casl');

const context = require('./data');
const insertData = require('./data/insert-data');
const apiRouter = require('./routes');
const port = process.env.PORT || 3000;

insertData(context);

const app = express(http);

app.use(bodyParser.json({ type: 'application/json' }));

app.use('/api', (req, res, next) => {
    const { rules, can } = AbilityBuilder.extract();
    const role = req.query.role || 'guest';

    console.log(`Current role = ${role}`);

    if (role === 'guest') {
        can('read', 'all');
    }

    if (role === 'member') {
        can('read', 'all');
        can('create', 'Repo');
        can('update', 'Repo', { author: req.query.author });
        can(['create', 'update'], 'Commit');
    }

    if (role === 'moderator') {
        can('read', 'all');
        can('update', ['Repo', 'Commit']);
        can('delete', ['Repo', 'Commit']);
    }

    req.ability = new Ability(rules);

    next();
});

app.use('/api/', apiRouter);

app.use((error, req, res, next) => {
    if (error instanceof ForbiddenError) {
        res.status(403).send({ message: error.message })
    } else {
        res.send(error);
    }
});

app.listen(port, function () {
    console.log(`Server is running on ${port}...`);
});