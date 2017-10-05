import { injectGlobal } from 'styled-components';
import normalize from 'normalize.css';

const Global = injectGlobal`
  html {
    box-sizing: border-box;
  }
`;

export default Global;
