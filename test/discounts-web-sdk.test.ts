import { describe, it } from "mocha";
import { expect } from "chai";
import * as discounts from "../src";
import { Discount } from "../src/types";

const discount: Discount = {
    "id": "148cee10-6dd5-42e2-9496-1fb20a44998d",
    "name": "Oppvaskmiddel",
    "description": "ZALO Ultra 750  ml",
    "requirement": {
        "item": { "items": [{ "id": "7046110003374" }] },
        "customer": {},
        "store_ids": ["*"],
        "purchase_to": "2021-06-13T21:59:00Z",
        "purchase_from": "2021-06-06T22:00:00Z"
    },
    "limitation": {},
    "reward": { "type": "discount_item_new_price", "value": 3700 },
    "created_by": "TemalogicStaples",
    "created_at": "2021-06-04T10:21:18.029Z",
    "updated_at": "2021-06-04T10:21:18.029Z",
    "receipt_text": "Ukens tilbud",
    "type": "item",
    "links": [
        {
            "rel": "medium_discount_image",
            "href": "https://d3hhzq8d3avcr4.cloudfront.net/imported/124485_2500.jpg"
        }
    ],
    "metadata": {
        "label": "Før: 47,-",
        "subtitle": "Ukens tilbud",
        "campaign_id": 1813
    },
    "active": true
};

describe("discounts.embed", () => {
    it("creates discount added to container", async () => {    
        const container = document.createElement("div");
        document.body.appendChild(container);
        await discounts.embed({
            discounts:[discount],
            container: container as HTMLElement
        });
        expect(container.childNodes.length).to.equal(1);
        expect(container.innerHTML).to.contain('Oppvaskmiddel');
    });

    it("can be destroyed", async () => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        const discountsInstance = await discounts.embed({
            discounts:[discount],
            container,
        });
        discountsInstance.destroy();
        expect(container.innerHTML).to.equal("");
    });

});
