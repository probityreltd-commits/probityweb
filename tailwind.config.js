// tailwind.config.js
module.exports = {
  darkMode: ["class"], // Ensure this line exists for dark mode
  content: [
    // ... paths
  ],
  theme: {
    extend: {
      colors: {
        probiti: {
          primary: "#3b1a83", // Your brand color
          // we can add other specific tones if needed
        },
        // We will use semantic colors for text and backgrounds
        // and add the dark mode support using these.
      },
    },
  },
  // ... plugins (including shadcn config)
};
