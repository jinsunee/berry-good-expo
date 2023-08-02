module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            components: "./src/components",
            hooks: "./src/hooks",
          },
        },
      ],
      "nativewind/babel",
      "react-native-reanimated/plugin",
    ],
  };
};
