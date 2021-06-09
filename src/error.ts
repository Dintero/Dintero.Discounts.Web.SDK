import { createElement } from "./dom";
import { Configuration, Theme } from "./types";
import { translations } from "./translations";
import { normalize } from "./normalize";

const errorStyle = (className: string, theme: Theme) => `
@keyframes appear {
    from {
      transform: scaleY(0%);
      height: 0;
      opacity: 0;
    }
  
    to {
      transform: scaleY(100%);
      height: auto;
      opacity: 1;
    }
  }
.${className} {
    box-shadow: rgb(212, 212, 213) 0px 1px 3px 0px, rgb(212, 212, 213) 0px 0px 0px 1px;
    border-radius: 3px;
    text-align: center;
    padding-top: 65px;
    padding-bottom: 70px;
    padding-left: 5px;
    padding-right: 5px;
    max-width: 300px;
    width: 250px;
    font-size: 14px;
    margin: 5px auto;
    background: ${theme.background};
    animation-duration: 0.2s;
    animation-name: appear;
    animation-timing-function: ease-in;
    transform-origin: top center;
}
`;


export const createError = (
    configuration: Configuration
): HTMLElement => {
    const tString  = translations[configuration.language];
    const errorElem = createElement({
        tag: "div",
        styles: [normalize, errorStyle],
        theme: configuration.theme,
        innerHTML: tString.errors.fetch
    });
 
    return errorElem;
};
