import { createElement } from "./dom";
import { normalize } from "./normalize";
import type { ResolvedConfiguration, Theme } from "./types";

const loadingStyle = (className: string, _theme: Theme) => `
.${className} {
  margin: 10px auto;
  display: block;
  width: 80px;
  height: 80px;
}

.${className}:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #000;
  border-color: rgba(0,0,0,0.2) transparent rgba(0,0,0,0.2) transparent;
  animation: loading 0.6s linear infinite;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;

export const createLoading = (
    configuration: ResolvedConfiguration,
): HTMLElement => {
    const errorElem = createElement({
        tag: "div",
        styles: [normalize, loadingStyle],
        theme: configuration.theme,
    });

    return errorElem;
};
