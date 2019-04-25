const router = require('express').Router();
const context = require('../data');

router.get('/', async (req, res, next) => {
    try {
        req.ability.throwUnlessCan('read', 'Commit');

        const commits = await context.commits.findAll({
            where: {
                repoId: req.repoId
            }
        });

        res.send(commits);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const repo = await context.repos.findById(req.repoId);

        req.ability.throwUnlessCan('update', repo);
        req.ability.throwUnlessCan('create', 'Commit');

        req.body.repoId = req.repoId;

        await context.commits.create(req.body);

        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        req.ability.throwUnlessCan('read', 'Commit');

        const commit = await context.commits.findOne({
            where: {
                id: req.params.id,
                repoId: req.repoId
            }
        });

        if (commit) {
            res.send(commit);
        } else {
            res.status(404).send('Commit doesn\'t exist');
        }
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const commit = await context.commits.findOne({
            where: {
                id: req.params.id,
                repoId: req.repoId
            }
        });

        const repo = await context.repos.findById(req.repoId);

        req.ability.throwUnlessCan('update', repo);
        req.ability.throwUnlessCan('update', commit);

        await context.commits.update(req.body, {
            where: {
                id: req.params.id,
                repoId: req.repoId
            }
        });

        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        req.ability.throwUnlessCan('delete', 'Commit');

        await context.commits.destroy({
            where: {
                id: req.params.id
            }
        });

        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;