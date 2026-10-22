import pkg from "../package.json";
import { createDiscount, findWebshopLink } from "./discounts";
import { createElement } from "./dom";
import { createError } from "./error";
import { fetchDiscounts } from "./fetch";
import { createLoading } from "./loading";
import { normalize } from "./normalize";
import type {
    Configuration,
    Discount,
    Embed,
    ResolvedConfiguration,
    Theme,
} from "./types";

const defaultConfig: Omit<ResolvedConfiguration, "container"> = {
    language: "no",
    version: pkg?.version || "SNAPSHOT",
    linkTarget: "_self",
    currency: {
        value: "Kr",
        position: "suffix",
        exponent: 2,
    },
    theme: {
        background: "#fff",
        primary: "#333",
        secondary: "#333",
        color: "inherit",
        borderRadius: "2px",
        fontSize: "inherit",
    },
    api: {
        account: "",
        key: "",
        secret: "",
        url: "https://api.dintero.com",
        limit: 50,
    },
};

const mergeConfig = (
    a: Omit<ResolvedConfiguration, "container">,
    b: Configuration,
): ResolvedConfiguration => {
    return {
        ...a,
        ...b,
        currency: {
            ...a.currency,
            ...b.currency,
        },
        theme: {
            ...a.theme,
            ...b.theme,
        },
        api: {
            ...a.api,
            ...b.api,
        },
    };
};

const wrapperStyles = (className: string, theme: Theme) => `
.${className} {
    display: flex;
    flex-flow: wrap;
    align-items: stretch;
    justify-content: center;
    position: relative;
    font-weight: normal;
    width: 100%;
    font-size: ${theme.fontSize};
    color: ${theme.color};
}`;

export const embed = async (configuration: Configuration): Promise<Embed> => {
    const _configuration = mergeConfig(defaultConfig, configuration);
    if (!_configuration.container?.appendChild) {
        console.error("Invalid configuration");
        throw new Error("Invalid configuration");
    }
    if (_configuration.discounts) {
        return renderDeals(_configuration, _configuration.discounts);
    } else {
        const loader = createLoading(_configuration);
        try {
            configuration.container.appendChild(loader);
            const discounts = await fetchDiscounts(_configuration);
            _configuration.container.removeChild(loader);
            return renderDeals(_configuration, discounts);
        } catch (_error) {
            configuration.container.removeChild(loader);
            const errorMessage = createError(_configuration);
            _configuration.container.appendChild(errorMessage);
            return {
                destroy: () => {
                    configuration.container.removeChild(errorMessage);
                },
            };
        }
    }
};

const renderDeals = (
    configuration: ResolvedConfiguration,
    discounts: Discount[],
): Embed => {
    const wrapper = createElement({
        tag: "div",
        styles: [normalize, wrapperStyles],
        theme: configuration.theme,
    });
    discounts.forEach((discount) => {
        const elem = createDiscount(discount, configuration);
        const webShopLink = findWebshopLink(discount);
        if (webShopLink) {
            elem.setAttribute("target", configuration?.linkTarget || "_self");
            elem.setAttribute("href", webShopLink.href);
        }
        wrapper.appendChild(elem);
    });
    configuration.container.appendChild(wrapper);
    return {
        destroy: () => {
            configuration.container.removeChild(wrapper);
        },
    };
};
