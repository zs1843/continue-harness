import DefaultTheme from 'vitepress/theme';
import './custom.css';
import ZoomableImage from './ZoomableImage.vue';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('ZoomableImage', ZoomableImage);
  }
};
