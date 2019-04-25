const router = require('express').Router();
const commitRouter = require('./commit');
const context = require('../data');

router.get('/', async (req, res, next) => {
    try {
        req.ability.throwUnlessCan('read', 'Repo');

        const repos = await context.repos.findAll();

        res.send(repos);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        req.ability.throwUnlessCan('create', 'Repo');

        await context.repos.create(req.body);

        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.param('id', async (req, res, next) => {
    const repoId = Number.parseInt(req.params.id);

    if (!isNaN(repoId)) {
        const repo = await context.repos.findById(repoId);

        if (repo) {
            req.repoId = repoId;
            next();
        } else {
            res.status(404).send('Repo doesn\'t exist');
        }

    } else {
        res.status(400).send('Id is invalid');
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        req.ability.throwUnlessCan('read', 'Repo');

        const repo = await context.repos.findById(req.params.id);

        res.send(repo);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const repo = await context.repos.findById(req.params.id);

        req.ability.throwUnlessCan('update', repo);

        await context.repos.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        req.ability.throwUnlessCan('delete', 'Repo');

        await context.repos.destroy({
            where: {
                id: req.params.id
            }
        });

        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.use('/:id/commits', commitRouter);

module.exports = router;