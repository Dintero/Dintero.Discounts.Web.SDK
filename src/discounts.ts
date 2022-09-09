import { createElement } from "./dom";
import { Discount, Configuration, Theme } from "./types";
import { translations, t } from "./translations";
import { monetaryString, dateString } from "./formatters";
import { normalize } from "./normalize";

export const containsWebShopLink = (discount: Discount) => discount.links && discount.links.some(x => x.rel && x.rel === 'webshop');

const discountStyle = (className: string, theme: Theme) => `
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
    border-radius: ${theme.borderRadius};
    text-align: center;
    padding-top: 5px;
    padding-bottom: 105px;
    padding-left: 5px;
    padding-right: 5px;
    max-width: 300px;
    width: 250px;
    font-size: 1em;
    margin: 5px 20px;
    background: ${theme.background};
    animation-duration: 0.2s;
    animation-name: appear;
    animation-timing-function: ease-in;
    transform-origin: top center;
    color: inherit;
    text-decoration: none;
}

@media screen and (max-width: 679px) {
    .${className} {
        width: 100%;
        max-width: 100%;
    } 
  }
`;

const imageWrapperStyles = (className: string) => `
.${className} {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    width: 100%,
}`;

const imageStyle = (className: string) => `
.${className} {
    max-width: 100%;
    max-height: 100%;
    text-align: center;
    display: inline-block;
}`;

const ribbonTopStyle = (className: string, theme?: Theme) => `
.${className} {
    position: absolute;
    bottom: 60px;
    left: -20px;
    color: #fff;
    z-index: 9;
    width: 80%;
    font-size: 1.3em;
    border-radius: 0 ${theme.borderRadius} ${theme.borderRadius} 0;
    padding: 5px 0;
    background: ${theme?.secondary};
}
.${className}:after {
    position: absolute;
    content: "";
    bottom: -10px;
    left: 0;
    border-color: transparent;
    border-style: solid;
    border-width: 0 20px 10px 0;
    border-right-color: ${theme.secondary};
    width: 0;
    height: 0;
    opacity: 0.5;
}
`;

const ribbonBottomStyle = (className: string, theme?: Theme) => `
.${className} {
    position: absolute;
    right: -20px;
    bottom: 15px;
    color: #fff;
    z-index: 9;
    width: 80%;
    font-size: 1.3em;
    border-radius: ${theme.borderRadius} 0 0 ${theme.borderRadius};
    padding: 5px 0;
    background: ${theme?.primary};
}
.${className}:after {
    position: absolute;
    content: "";
    right: 0;
    bottom: -10px;
    border-color: transparent;
    border-style: solid;
    border-width: 10px 20px 0 0;
    border-top-color: ${theme.primary};
    width: 0;
    height: 0;
    opacity: 0.5;
}
`;

const titleStyle = (className: string) => `
.${className} {
    margin-bottom: 0;
    font-size: 1em;
    margin-bottom: 2px;
    font-size: 1.3em;
    font-weight: 700;
}`;

const subtitleStyle = (className: string) => `
.${className} {
    margin-top: 0;
}`;

const limitationsWrapperStyle = (className: string) => `
.${className} {
    font-size: 0.75em;
}
.${className} > span{
    display: block;
}
`;


const getTopRibbonText = (discount: Discount) => {
    return (
        (discount && discount.metadata && discount.metadata.label) || undefined
    );
};

const createTopRibbon = (discount: Discount, configuration: Configuration) => {
    const text = getTopRibbonText(discount);
    return (
        text &&
        createElement({
            tag: "div",
            innerHTML: text,
            theme: configuration.theme,
            styles: [ribbonTopStyle],
        })
    );
};

const getBottomRibbonText = (
    discount: Discount,
    configuration: Configuration
) => {
    const tStrings = translations[configuration.language];
    if (discount.reward.type === "discount_item_new_price") {
        return monetaryString(discount.reward.value, configuration, {
            variant: "short",
        });
    } else if (discount.reward.type === "discount_percent") {
        return discount.reward.value + "%";
    } else if (discount.reward.type === "discount_item_quantity") {
        if (
            discount.requirement.item.quantity === 3 &&
            discount.reward.value === 1
        ) {
            // Show custom 3 for 2 message
            return tStrings.rewards.discount_item_quantity.three_for_two;
        } else {
            const require = discount.requirement.item.quantity;
            const payFor =
                discount.requirement.item.quantity - discount.reward.value;
            return t(tStrings.rewards.discount_item_quantity.generic, {
                require,
                payFor,
            });
        }
    } else if (discount.reward.type === "discount_amount") {
        const monetaryAmount = monetaryString(
            discount.reward.value,
            configuration,
            { decimal: false }
        );
        return t(tStrings.rewards.discount_amount, { monetaryAmount });
    } else if (discount.reward.type === "discount_item_percent") {
        return discount.reward.value + "%";
    }
    return "";
};

const createBottomRibbon = (
    discount: Discount,
    configuration: Configuration
) => {
    const text = getBottomRibbonText(discount, configuration);
    return (
        text &&
        createElement({
            tag: "div",
            innerHTML: text,
            theme: configuration.theme,
            styles: [ribbonBottomStyle],
        })
    );
};

const createImage = (discount: Discount) => {
    const imageWrapper = createElement({
        tag: "div",
        styles: [normalize, imageWrapperStyles],
    });
    const imageSrc = discount.links.find((link) => [
        "medium_discount_image",
        "thumbnail_discount_image".includes(link.rel),
    ]);
    const image =
        imageSrc &&
        createElement({
            tag: "img",
            attributes: { src: imageSrc.href, alt: discount.name, loading: "lazy"},
            styles: [normalize, imageStyle],
        });
    if (image) {
        imageWrapper.appendChild(image);
    }
    return imageWrapper;
};

const createLimitations = (
    discount: Discount,
    configuration: Configuration
) => {
    const tStrings = translations[configuration.language];

    const wrapper = createElement({
        tag: "small",
        styles: [normalize, limitationsWrapperStyle],
    });

    const quantity =
        discount.limitation.discount_reward_usage &&
        discount.limitation.discount_reward_usage !== -1 &&
        createElement({
            tag: "span",
            innerHTML: t(tStrings.limitations.discount_reward_usage, {
                discount_reward_usage: discount.limitation.discount_reward_usage,
            }),
        });
    const repeat =
        discount.limitation.discount_repeat_usage &&
        discount.limitation.discount_repeat_usage !== -1 &&
        createElement({
            tag: "span",
            innerHTML: t(tStrings.limitations.discount_repeat_usage, {
                discount_repeat_usage: discount.limitation.discount_repeat_usage,
            }),
        });

    const startDate = new Date(discount.requirement.purchase_from || 0);
    const start = startDate > new Date() && createElement({
        tag: "span",
        innerHTML: t(tStrings.requirements.purchase_from, {
            purchase_from: dateString(discount.requirement.purchase_from, configuration),
        }),
    });
    const endDate = new Date(discount.requirement.purchase_to || 0);
    const end = endDate > new Date() && createElement({
        tag: "span",
        innerHTML: t(tStrings.requirements.purchase_to, {
            purchase_to: dateString(discount.requirement.purchase_to, configuration),
        }),
    });
    const children = [
        quantity,
        repeat,
        start,
        end
    ].filter((child) => child);
    children.forEach((child) => wrapper.appendChild(child));
    console.log({discount, wrapper});
    return wrapper;
};

export const createDiscount = (
    discount: Discount,
    configuration: Configuration
): HTMLElement => {
    const discountElem = createElement({
        tag: containsWebShopLink(discount) ? "a" : "div",
        styles: [normalize, discountStyle],
        theme: configuration.theme
    });
    const ribbonTop = createTopRibbon(discount, configuration);
    const ribbonBottom = createBottomRibbon(discount, configuration);
    const image = createImage(discount);
    const title =
        discount?.name &&
        createElement({ tag: "h4", innerHTML: discount.name , styles:[titleStyle]});
    const subtitle =
        discount?.metadata?.subtitle &&
        createElement({ tag: "p", innerHTML: discount.metadata.subtitle, styles: [subtitleStyle] });
    const description =
        discount.description &&
        createElement({ tag: "p", innerHTML: discount.description });

    const limitations = createLimitations(discount, configuration);
    // add children to discount wrapper
    const children = [
        ribbonTop,
        ribbonBottom,
        image,
        title,
        subtitle,
        description,
        limitations
    ].filter((child) => child);
    children.forEach((child) => discountElem.appendChild(child));
    return discountElem;
};
