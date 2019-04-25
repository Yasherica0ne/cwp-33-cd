module.exports = (Sequelize, sequelize) => {
    return sequelize.define('Repo', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING
        },
        author: {
            type: Sequelize.STRING
        }
    });
};
