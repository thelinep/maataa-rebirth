import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#FFFAF0",
        },
        {
          name: "dark",
          value: "#3D2817",
        },
        {
          name: "paper",
          value: "#FAF6F1",
        },
      ],
    },
  },
};

export default preview;
