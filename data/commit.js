module.exports = (Sequelize, sequelize) => {
    return sequelize.define('Commit', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        repoId: {
            type: Sequelize.INTEGER
        },
        message: {
            type: Sequelize.STRING
        },
        hash: {
            type: Sequelize.STRING
        }
    });
};
