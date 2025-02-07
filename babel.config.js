module.exports = function (api) {
    api.cache(true);
    return {
      presets: ["babel-preset-expo"],
      plugins: [
        // Add other plugins here if needed
        "expo-router/babel", // Ensure this plugin is included
      ],
    };
  };