/**
 * Global Styles
 *
 * Application-wide CSS reset and base styles using styled-components.
 * Sets up:
 * - Universal box-sizing reset
 * - System font stack for body text
 * - Light grey page background
 * - Base link and button styling
 * - Responsive image defaults
 */

"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Universal reset: remove default margins/padding, use border-box sizing */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Base body styles with system font stack */
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                 'Helvetica Neue', Arial, sans-serif;
    background: #f5f5f5;
    color: #333;
    line-height: 1.6;
  }

  /* Remove default link underline and inherit color */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* Inherit font family for buttons */
  button {
    font-family: inherit;
  }

  /* Responsive images by default */
  img {
    max-width: 100%;
    height: auto;
  }
`;

export default GlobalStyles;
