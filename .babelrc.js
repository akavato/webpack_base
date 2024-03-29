module.exports = {
    "sourceMaps": "both",
    "presets": [
        ["@babel/preset-env", {
            "loose": true,
            "exclude": ["transform-async-to-generator", "transform-regenerator"]
        }]
    ],
    "plugins": [
        ["module:fast-async", {
            "spec": true
        }]
    ]
}
