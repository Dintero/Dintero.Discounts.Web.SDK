# Dintero Discounts JavaScript SDK for frontend applications

Use this SDK in your frontend application to embed one or more discounts from the Dintero Discount Service service in your webpage.

[Learn more about the Dintero Discount Service at docs.dintero.com](https://docs.dintero.com/docs/discount-service/)

## Installation

**NPM package**

```
npm install @dintero/discounts-web-sdk
```

**unpkg**

Load the Dintero Discounts SDK in a script tag on your site.

```html
<script src="https://unpkg.com/@dintero/discounts-web-sdk@0.0.12/dist/dintero-discounts-web-sdk.umd.min.js" integrity="sha384-jjX8hv78QBpDqiTN7rQYF+O7SA8OFB4ay+KdSVyVOT5Z6T5a9U7kPQo8u3bUoyVb"></script>
```

### Inline HTML JavaScript example getting a list of discounts with API access

In this example the SDK will try to fetch data from the discount service.

Make sure to configure the plugin with an API client that only has grants giving access to the `public:discounts`-scope.

```html
<script type="text/javascript">
    const container = document.getElementById("checkout-container");
    discounts.embed({
        container: document.getElementById("deals-container"),
        api:{
            account: 'P00000000',
            key: 'public_api_key',
            secret: 'abcdef01-2345-6789-abcd-ef0123456789',
        },
        theme: {
            fontSize: "14px",
            color: "rgba(0,0,0,1)",
            primary: "hotpink",
            secondary: "aqua",
            background: "#fff",
        }
    });
</script>
```

### Inline HTML JavaScript example getting a single discounts with API access

In this example the SDK will try to fetch data from the discount service for a given `discountId`.

Make sure to configure the plugin with an API client that only has grants giving access to the `public:discounts`-scope.

```html
<script type="text/javascript">
    const container = document.getElementById("checkout-container");
    discounts.embed({
        container: document.getElementById("deals-container"),
        api:{
            account: 'P00000000',
            key: 'public_api_key',
            secret: 'abcdef01-2345-6789-abcd-ef0123456789',
            discountId: '1234'
        },
        theme: {
            fontSize: "14px",
            color: "rgba(0,0,0,1)",
            primary: "hotpink",
            secondary: "aqua",
            background: "#fff",
        }
    });
</script>
```

### Inline HTML JavaScript example with discount objects

In this example the SDK is supplied with a list of discount objects directly.

```html
<script type="text/javascript">
    const container = document.getElementById("checkout-container");
    discounts.embed({
        container: document.getElementById("deals-container"),
        theme: {
            fontSize: "14px",
            color: "rgba(0,0,0,1)",
            primary: "hotpink",
            secondary: "aqua",
            background: "#fff",
        },
        discounts:[{
            "id": "1",
            "name": "Testvare",
            "description": "Beskrivelse av testvare",
            "requirement": {
                "item": { "items": [{ "id": "testvare-1" }] },
                "customer": {},
                "store_ids": ["*"],
                "purchase_to": "2030-06-13T21:59:00Z",
                "purchase_from": "2080-06-06T22:00:00Z"
            },
            "limitation": {},
            "reward": { "type": "discount_item_new_price", "value": 5000 },
            "created_by": "DinteroTest",
            "created_at": "2021-06-04T10:21:18.029Z",
            "updated_at": "2021-06-04T10:21:18.029Z",
            "receipt_text": "Ukens tilbud",
            "type": "item",
            "links": [
                {
                    "rel": "medium_discount_image",
                    "href": "https://uploads-ssl.webflow.com/5f023ba9549ac22870f32943/5f1333ae5a496b0e0476975e_dintero-logo.svg"
                }
            ],
            "metadata": {
                "label": "Før: 100,-",
                "subtitle": "Ukens tilbud",
                "campaign_id": 1
            },
            "active": true
        }]
    });
</script>
```
## Bugs

Bugs can be reported to https://github.com/Dintero/Dintero.Discounts.Web.SDK/issues

## Security

Contact us at [security@dintero.com](mailto:security@dintero.com)

## Browser support

All major modern browsers above version `N - 1`, where `N` is the most recent version.

## Building from source

```bash
npm install
npm run build
```

## Creating a new release checklist

1. Bump the package version in `package.json`.
2. Build `npm run build`
3. Regenerate integrity hash and update the unpgk install instructions in this file `shasum -b -a 384 dist/dintero-checkout-web-sdk.umd.min.js | awk '{ print $1 }' | xxd -r -p | base64 | sed "s/^/sha384-/g"`
4. Update README.md with new version/sha
5. Publish new version to npm with `npm publish --access=public`.
6. Tag and create release in Github
   `git tag "v$(jq .version -r < package.json)"`
