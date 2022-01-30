// eslint-disable-next-line no-undef
module.exports = api => {
    // Cache configuration is a required option
    api.cache(false);

    const presets = [
        '@babel/preset-typescript',
        '@babel/preset-env',
    ];

    const plugins = [
        ['@babel/plugin-transform-runtime', {
            'regenerator': true,
        }]
    ];
    return {presets, plugins};
};