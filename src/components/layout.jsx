import React from "react"

import { createGlobalStyle } from "styled-components"
import sal from "sal.js"
import "sal.js/dist/sal.css"

import config from "../config"
import * as fontFiles from "../fonts/fonts"
import Header from "./header"

const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: "Europa";
    font-weight: 300;
    font-style: normal;
    src: url(${fontFiles.EuropaLightWOFF2}) format("woff2"),
      url(${fontFiles.EuropaLightWOFF}) format("woff"),
      url(${fontFiles.EuropaLightTTF}) format("truetype");
  }
  @font-face {
    font-family: "Europa";
    font-weight: 700;
    font-style: normal;
    src: url(${fontFiles.EuropaBoldWOFF2}) format("woff2"),
      url(${fontFiles.EuropaBoldWOFF}) format("woff"),
      url(${fontFiles.EuropaBoldTTF}) format("truetype");
  }

:root{
    --color-primary: ${config.colors.primary};
    --color-secondary: ${config.colors.secondary};
    --color-tertiary: ${config.colors.tertiary};
    --color-text: ${config.colors.text};
    --header: 10rem;

    --font-primary: 'Europa';

    --space-vSmall: 1rem;
}
::selection {
    background-color: var(--color-tertiary);
    color: var(--color-secondary);
}
 

*,*::before, *::after{
    padding: 0;
    margin: 0;
    box-sizing: inherit;
}

html{
    font-size: 62.5%;
    box-sizing: border-box;
}

body{
    font-family: var(--font-primary);
    font-size: 1.6rem;
    font-weight: 300;
    padding: 0 5rem;
    color: var(--color-text);
    background: var(--color-secondary);
    
}

a {
    text-decoration: none;
    color: var(--color-text);
}
select{
   -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
    font-size: 1.6rem;
    color: var(--color-text);
    &:-moz-focusring {
      color: transparent;
      text-shadow: 0 0 0 var(--color-text);
    }
}
`

const Layout = ({ children, location }) => {
  React.useEffect(() => {
    sal({ threshold: 0, rootMargin: "80%" })
  })
  return (
    <>
      <GlobalStyles />
      <Header location={location} />
      <main>{children}</main>
    </>
  )
}

export default Layout
