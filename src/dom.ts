import { Theme } from "./types";

type CreateElementOptions = {
    tag: string;
    attributes?: { [key: string]: any };
    styles?: ((className: string, theme?: Theme) => string)[];
    handlers?: { [key: string]: EventListenerOrEventListenerObject };
    innerHTML?: string;
    theme?: Theme;
};

export const createElement = (options: CreateElementOptions) => {
    const elem = document.createElement(options.tag);
    if (options.attributes) {
        addAttributes(elem, options.attributes);
    }
    if (options.handlers) {
        addEventListeners(elem, options.handlers);
    }
    if (options.styles) {
        addStyles(elem, options.styles, options.theme);
    }
    if (options.innerHTML) {
        elem.innerHTML = options.innerHTML;
    }
    return elem;
};

const addClass = (elem: HTMLElement, className: string) => {
    const names = elem.className.split(" ");
    if (!names.includes(className)) {
        elem.className = elem.className + " " + className;
    }
};

const hash = (input: string) => {
    let hash = 0;
    for (var i = 0; i < input.length; i++) {
        var char = input.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash.toString(36);
};

const addStyles = (
    elem: HTMLElement,
    styles: ((className: string, theme?: Theme) => string)[],
    theme: Theme | undefined,
) => {
    // "styled components" light
    styles.forEach((cssFn) => {
        // get class name from hash
        const className =
            "dintero-deals-" + hash(cssFn("dintero-deals", theme));
        addClass(elem, className);
        // add style tag to DOM if not exists
        const hit = document.querySelector(`[data-css-hash=${className}]`);
        if (!hit) {
            const style = document.createElement("style");
            style.innerHTML = cssFn(className, theme);
            style.setAttribute("data-css-hash", className);
            document.head.appendChild(style);
        }
    });
};

const addAttributes = (
    elem: HTMLElement,
    attributes: { [key: string]: string },
) => {
    Object.keys(attributes).forEach((key) => {
        elem.setAttribute(key, attributes[key]);
    });
};

const addEventListeners = (
    elem: HTMLElement,
    handlers: { [key: string]: EventListenerOrEventListenerObject },
) => {
    Object.keys(handlers).forEach((key) => {
        elem.addEventListener(key, handlers[key]);
    });
};
