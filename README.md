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
<script src="https://unpkg.com/@dintero/checkout-web-sdk@0.0.16/dist/dintero-checkout-web-sdk.umd.min.js" integrity="sha384-wSx8c2gSK0ipbhUEBTagUYLolGfrRERsuoyLDq92oWvrhFqnujApIeJ7+z6nvOfl"></script>
```

### Inline HTML JavaScript example

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
            secondary: "seagreen",
            background: "#fff",
        }
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
