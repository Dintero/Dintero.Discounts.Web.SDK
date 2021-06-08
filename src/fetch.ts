import { Configuration, Discount, TokenResponse } from "./types";

const createHeaders = (
    keyValues: { [key: string]: string },
    configuration: Configuration
) => {
    const headers: HeadersInit = new Headers();
    Object.entries({
        ...keyValues,
        "Dintero-System-Name": "deals-web-sdk",
        "Dintero-System-Version": configuration.version,
    }).forEach(([key, value]) => {
        headers.append(key, value);
    });
    return headers;
};

const fetchAccessToken = (
    configuration: Configuration
): Promise<TokenResponse> => {
    if (!configuration.api) {
        throw new Error("Authentication configuration missing");
    }
    const basicAuthCredentials = window.btoa(
        `${configuration.api.key}:${configuration.api.secret}`
    );
    const headers = createHeaders(
        {
            Authorization: `Basic ${basicAuthCredentials}`,
            "content-type": "application/json",
        },
        configuration
    );
    const body = JSON.stringify({
        grant_type: "client_credentials",
        audience: `${configuration.api.url}/v1/accounts/${configuration.api.account}`,
    });
    return window
        .fetch(
            `${configuration.api.url}/v1/accounts/${configuration.api.account}/auth/token`,
            {
                method: "POST",
                headers,
                body,
            }
        )
        .then((response) => {
            if (response.status === 200) {
                return response.json() as Promise<TokenResponse>;
            }
            throw new Error("Authentication failed");
        });
};

export const fetchDiscounts = (
    configuration: Configuration
): Promise<Discount[]> => {
    return fetchAccessToken(configuration).then((tokenResponse) => {
        const headers = createHeaders(
            {
                Authorization: `${tokenResponse.token_type} ${tokenResponse.access_token}`,
            },
            configuration
        );
        
        if (configuration.api.discountId) {
            return window
                .fetch(
                    `${configuration.api.url}/v1/accounts/${configuration.api.account}/discounts/public/rules/${configuration.api.discountId}`,
                    {
                        headers,
                    }
                )
                .then((response) => {
                    if (response.status === 200) {
                        return response
                            .json()
                            .then((discount) => [discount]) as Promise<
                            Discount[]
                        >;
                    }
                    throw new Error("Authentication failed");
                });
        }

        return window
            .fetch(
                `${configuration.api.url}/v1/accounts/${configuration.api.account}/discounts/public/rules?limit=${configuration.api.limit}`,
                {
                    headers,
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    return response.json() as Promise<Discount[]>;
                }
                throw new Error("Authentication failed");
            });
    });
};
