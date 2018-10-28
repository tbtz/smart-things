module.exports = (env) => {
    return {
        target: 'node',
        entry: './src/app.js',
        output: {
            filename: './app.bundle.js'
        },
        node: {
            __dirname: false,
        }
    };
};