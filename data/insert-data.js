module.exports = async function (context) {
    await context.sequelize.sync({force: true});

    await context.repos.bulkCreate([
        { name: 'repo1', author: 'author1' },
        { name: 'repo2', author: 'author1' },
        { name: 'repo3', author: 'author2' },
        { name: 'repo4', author: 'author2' },
        { name: 'repo5', author: 'author3' },
        { name: 'repo6', author: 'author3' },
    ]);

    await context.commits.bulkCreate([
        { repoId: 1, message: 'message1', hash: 'ec0b4f0b5c90ed0fa911a2972ccc452641b31563' },
        { repoId: 1, message: 'message2', hash: '54563f95fefa691baa82a522156322c21f7d6df3' },
        { repoId: 2, message: 'message3', hash: '59395c05c18b9c8904853715d4136921de0b48f1' },
        { repoId: 2, message: 'message4', hash: '6b3c45f2d43d16c028ef18e38cb1e516f653463d' },
        { repoId: 3, message: 'message5', hash: 'cdbed3a915745f1ad336f322948fa30c4ea8d82f' },
        { repoId: 3, message: 'message6', hash: '227b91486218eee1d52de4b7bc8286b5dd18da03' },
        { repoId: 4, message: 'message7', hash: '6bc96f923d399f4ab15280704a1d92e866c57657' },
        { repoId: 4, message: 'message8', hash: '2aa8016a1ae49fe79cde9be51ac51e576115db1f' },
        { repoId: 5, message: 'message9', hash: '1d2a3c891dbcf97eda3ff230e890e339c72d9686' },
        { repoId: 5, message: 'message10', hash: 'c7a5fdecb1f90378a6c78c0804d0c0f9de83d367' },
        { repoId: 6, message: 'message11', hash: 'af2e20143d68eff552c5b24bb01e911f43a8f3f7' },
        { repoId: 6, message: 'message12', hash: 'ebae477fd558d7ca4c7eaca63a9c9a504b121084' },
    ]);
};