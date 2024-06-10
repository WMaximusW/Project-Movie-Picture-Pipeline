// jest.config.js or package.json
module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    setupFiles: ['@babel/register', './components/__tests__/setup.js'],
};
