const no = {
    rewards: {
        discount_item_quantity: {
            three_for_two: "3 for 2",
            generic: "Kjøp {{require}} betal for {{payFor}}",
        },
        discount_amount: "{{monetaryAmount}} rabatt",
    },
    limitations: {
        discount_reward_usage:
            "Antall: <strong>{{discount_reward_usage}}</strong>",
        discount_repeat_usage:
            "Maks kjøp: <strong>{{discount_repeat_usage}}</strong>",
    },
    requirements: {
        purchase_from: "Tilbudet starter <strong>{{purchase_from}}</strong>",
        purchase_to: "Tilbudet utgår <strong>{{purchase_to}}</strong>",
    },
    errors: {
        fetch: "⚠️ <br/>En feil oppstod under lasting av tilbud...",
    },
};

export const translations = {
    no,
};

const findValuesRegex = /(\{\{)[^}]*(\}\})/g;
// i18n light
export const t = (
    translateString: string,
    values?: { [key: string]: any },
): string => {
    const matches: string[] = translateString.match(findValuesRegex) || [];
    const _values = values || {};
    return matches.reduce<string>((interpolated, match) => {
        const key = match.replace("{{", "").replace("}}", "");
        const value = _values[key] || "";
        return interpolated.replace(match, value);
    }, translateString);
};
