export interface Item {
    /**
     * example:
     * b714118
     */
    id?: string;
    /**
     * example:
     * B1
     */
    group_id?: string;
}
export interface Limitation {
    /**
     * Limit the discount to hours of the day
     * 
     */
    discount_hours?: {
        /**
         * The timezone identifier for the hour start/end, see
         * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
         * for examples. DST is handled when using a Timezone with DST.
         * 
         */
        timezone?: string;
        /**
         * an array of periods, day and time when discount will be
         * available. Multiple periods for one day is accepted.
         * Any hour of purchase is accepted if the array is empty.
         * 
         */
        hours: {
            day: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
            /**
             * example:
             * 10:00
             */
            start: string; // ^([01]?[0-9]|2[0-3]):[0-5][0-9]$
            /**
             * example:
             * 20:00
             */
            end: string; // ^([01]?[0-9]|2[0-3]):[0-5][0-9]$
        }[];
    };
    /**
     * Limit the number of rewards to be given in a purchase
     * where multiple receipt items match the requirement
     * 
     * example:
     * 1
     */
    discount_reward_usage?: number;
    /**
     * Limit how many other discounts can be combined in a purchase
     * where multiple discounts are applicable.
     * 
     */
    discount_combination?: -1 | 0;
    /**
     * Limit what items in the purchase is eligible for this discount
     * 
     */
    discount_eligible?: "item_eligible_for_discount" | "item_eligible_for_discount_no_discount" | "receipt_no_discount";
    /**
     * Limit how many purchases the discount can be used
     * 
     */
    discount_repeat_usage?: number;
    /**
     * Number of days between first and last (exceeding count) stamp
     * where reward will be given
     * 
     * example:
     * 100
     */
    stamp_expire_days?: number;
    /**
     * items not eligible for discount.
     * 
     */
    blacklist?: Item[];
}
/**
 * Links to resources related to the discount
 * example:
 * [object Object],[object Object],[object Object],[object Object]
 */
export type Links = {
    /**
     * The URL of the link.
     */
    href: string; // uri
    /**
     * Specifies the relationship between the discount and the link
     * 
     * Following `rel` values are reserved for specific usage
     * 
     *   - thumbnail_discount_image: link to discount image
     *   - medium_discount_image: link to discount image
     *   - large_discount_image: link to discount image
     *   - webshop: link to site where the discount may be used
     * 
     */
    rel?: string;
    /**
     * Specifies the media type of the link
     */
    type?: string;
}[];
export interface StoreRequirement {
    id?: string[];
    /**
     * name of the store, aka trade name of the store
     * 
     */
    name?: string[];
    /**
     * Official name of the person or entity that owns the store.
     * 
     */
    business_name?: string[];
    /**
     * Require customer to have one or more addresses matching the properties. All properties defined must match a single address.
     */
    address?: {
        /**
         * example:
         * NO
         */
        country?: string[];
        /**
         * example:
         * 4515
         */
        postal_code?: string[];
        /**
         * example:
         * Oslo
         */
        postal_place?: string[];
    };
    chain?: string[];
    email?: string[];
    gln?: string[];
    organization_number?: string[];
    phone_number?: string[];
    /**
     * A four-digit Merchant Category Code (MCC) for the store
     * [ISO 18245:2003](https://www.iso.org/standard/33365.html)
     * 
     */
    mcc?: string /* iso-18245 */ [];
    /**
     * Ranges of MCC codes to accept the discount for.
     * Multiple ranges are possible.
     * Prefer `mcc` if not a range.
     * 
     */
    mcc_ranges?: {
        /**
         * example:
         * 5814
         */
        start: string; // iso-18245 ^\d{4}$
        /**
         * example:
         * 5815
         */
        end: string; // iso-18245 ^\d{4}$
    }[];
    /**
     * Merchant number associated with the stores
     * payment terminal
     * 
     */
    bax?: string[];
    /**
     * Id to a specific point-of-sale (POS) terminal
     * or workstation
     * 
     */
    terminal_id?: string[];
}
export interface ItemMixProperty {
    /**
     * Acceptable items for the mix "item" (`any`). No wildcard `*` is
     * accepted.
     * 
     * example:
     * [object Object],[object Object]
     */
    items?: {
        /**
         * example:
         * b714118
         */
        id?: string; // ^(\*.+|(?!\*).*)$
        /**
         * example:
         * g4
         */
        group_id?: string; // ^(\*.+|(?!\*).*)$
    }[];
    /**
     * minimum quantity of given item (match by id or group) by the mix
     * 
     */
    quantity: number;
    /**
     * The item will be eligible for discount when calculating the reward
     * Example: The value of `discount_item_new_price` reward will be the
     * total price of all items in a mix that has the applicable set to `true`
     * 
     */
    reward_eligible: boolean;
}

export interface CustomerRequirement {
    /**
     * Require customer to have one or more addresses matching the properties. All properties defined must match a single address.
     */
    addresses?: {
        /**
         * example:
         * NO
         */
        country?: string[];
        /**
         * example:
         * 4515
         */
        postal_code?: string[];
        /**
         * example:
         * Oslo
         */
        postal_place?: string[];
        /**
         * example:
         * offsite
         */
        custom_type?: string[];
        /**
         * example:
         * custom
         */
        type?: string[];
    }[];
    /**
     * Require customer to be a company matching all properties defined.
     * 
     */
    company?: {
        /**
         * example:
         * TKP tech AS
         */
        bussiness_name?: string[];
        /**
         * example:
         * production,research
         */
        department?: string[];
        /**
         * example:
         * J62.0.1,J62.0.2
         */
        industry?: string[];
        /**
         * example:
         * 20
         */
        number_of_employees?: string[];
        /**
         * example:
         * 123456789MVA
         */
        organization_number?: string[];
        /**
         * example:
         * https://dintero.com
         */
        website?: string[];
    };
    /**
     * example:
     * 1990-09-20,1990-05-10
     */
    date_of_birth?: string[];
    enrolled_by?: {
        /**
         * example:
         * url
         */
        type?: string[];
        /**
         * example:
         * https://mypage.example.dintero.com
         */
        value?: string[];
    };
    /**
     * example:
     * sc029
     */
    favorite_store?: string[];
    /**
     * example:
     * John
     */
    first_name?: string[];
    /**
     * example:
     * male
     */
    gender?: string[];
    /**
     * example:
     * Doe
     */
    last_name?: string[];
    marketing_consent?: {
        email?: {
            /**
             * example:
             * true
             */
            consent?: string[];
        };
        sms?: {
            /**
             * example:
             * true
             */
            consent?: string[];
        };
    };
    /**
     * limit discount to only receipt where customer status
     * is included in the receipt and match one of the status
     * values required by the discount
     * 
     * example:
     * vip
     */
    status?: string[];
    term?: {
        id?: string[];
    };
    type?: string[];
}
export interface Requirement {
    customer?: CustomerRequirement;
    item?: {
        /**
         * minimum number of items
         * 
         */
        quantity?: number;
        /**
         * Required mix items for the discount.
         * 
         * A purchase must include `all` the items to fulfill the `item.mixes`
         * requirement.
         * 
         */
        mixes?: ItemMixProperty[];
        /**
         * Required items for the discount
         * 
         * A purchase can include `any` of the items to fulfill the `item.items`
         * requirement.
         * 
         */
        items?: Item[];
    };
    store_ids?: string[];
    /**
     * Minimum gross amount on purchase.
     * Monetary amount in smallest unit for the currency
     * 
     */
    gross_amount?: number;
    /**
     * List of valid currencies, or `[{"anything-but": ["NOK"]}]` to exclude currencies.
     * Currency format is the three-character [ISO-4217 currency](https://en.wikipedia.org/wiki/ISO_4217).
     * 
     */
    currencies?: any[];
    /**
     * Stamp count required for the reward
     * 
     * example:
     * 5
     */
    stamp?: number;
    /**
     * A code required for the reward. The purchase must include the
     * promotion code in the `receipt.discount_code` property or as
     * an `receipt.item` where the `item.id` is the promotion code.
     * 
     * example:
     * TACO
     */
    discount_code?: string;
    store?: StoreRequirement;
    purchase_from: string; // date-time
    purchase_to: string; // date-time
}
export interface Reward {
    /**
     * 
     * Reward Type:
     *   * `discount_amount` - value as discount
     *   * `discount_percent` - value percentage of gross amount
     *       as discount
     *   * `discount_item_new_price` - discount as old price subtracted with value
     *   * `discount_item_quantity` - number of items to get as discount (free)
     *   * `discount_item_percent` - percent discount of the cheapest item (stamp)
     *       as discount
     *   * `discount_debit` - value as discount, remaining amount after a
     *     purchase will be available in future purchases (if not limited by usage)
     *   * `discount_mix_new_price` - discount as old mix total value (reward_eligible=true)
     *     subtracted with value
     * 
     */
    type: "discount_amount" | "discount_percent" | "discount_item_new_price" | "discount_item_quantity" | "discount_item_percent" | "discount_mix_new_price" | "discount_debit";
    /**
     * The reward value, unit of the value is resolved
     * from the reward type
     * 
     * Examples:
     *   - Percent: 10.5
     *   - Amount: 10000 (amount in smallest unit for the currency)
     *   - Quantity: 1
     * 
     * example:
     * 10000
     */
    value: number;
    /**
     * Let the discount reward be calculated from net or gross price.
     * Not applicable for `discount_item_new_price`
     * 
     * *Example*:
     *   item A à 100,- NOK with existing rebate of 20,-
     * 
     *   - 10% net reward is 10% of 80,- : 8,-
     *   - 10% gross reward is 10% of 100,- : 10,-
     * 
     *   * *net*: `gross - "any existing discounts"`
     *   * *gross*: `"total expense amount, including taxes"`
     * 
     */
    base?: "net" | "gross";
}
export interface Discount {
    /**
     * An UUID that uniquely identifies the resource
     * 
     */
    readonly id?: string; // uuid
    /**
     * The date-time when the resource was created
     * 
     */
    readonly created_at?: string; // date-time
    /**
     * The ID of the user/client created the resource
     * 
     * example:
     * 1c92f7e1-2897-4d46-bdcc-c127a914fb4e
     */
    readonly created_by?: string;
    /**
     * The date-time when the resource was last updated
     * 
     */
    readonly updated_at?: string; // date-time
    /**
     * The ID of the user/client created the resource
     * 
     * example:
     * 1c92f7e1-2897-4d46-bdcc-c127a914fb4e
     */
    readonly deleted_by?: string;
    readonly deleted_at?: string; // date-time
    /**
     * The campaign the rule belongs to
     * 
     */
    campaign_id?: string;
    /**
     * the discount is active and can be available
     * for purchase (if given to any or all customers)
     * 
     */
    active?: boolean;
    /**
     * the discount will be exluded from  public discount collection
     * (GET /discounts/public/rules).
     * 
     */
    private?: boolean;
    /**
     * The ID of the user/client that last updated the resource
     * 
     * example:
     * 3d1e4824-5474-48e7-a369-4f603fa4c5b8
     */
    readonly updated_by?: string;
    /**
     * The discount base type * `receipt` discount is given on receipt * `item` discount is given to items
     */
    readonly type?: "item" | "receipt";
    /**
     * example:
     * Spar 100,-
     */
    name?: string;
    /**
     * Text that should be used when displaying
     * the discount, e.g. on receipt
     * 
     * example:
     * Mai Salg
     */
    receipt_text?: string;
    /**
     * Make th discount visible to the customer from
     * given date. Default behavior is to only return
     * discount to the customer where the current time
     * is between purchase_from and purchase_to
     * 
     */
    visible_from?: string; // date-time
    /**
     * example:
     * Gjør et Stablestol kupp!
     */
    description?: string;
    limitation?: Limitation;
    requirement: Requirement;
    reward: Reward;
    /**
     * Additional metadata about the discount
     * 
     * example:
     * [object Object]
     */
    metadata?: {
        [key: string]: any
    };
    links?: Links;
}

export type Theme = {
    color?: string,
    background?: string,
    primary?: string,
    secondary?: string,
    borderRadius?: string,
    fontSize?: string,
}

export type Configuration = {
    container: HTMLElement,
    language?: string,
    currency?: {
        value: string
        position: 'prefix' | 'suffix',
        exponent: 2
    },
    theme?: Theme,
    api?: {
        account: string,
        key: string,
        secret: string,
        url: string,
        limit?: number,
        discountId?: string,
    }
    linkBehaviour?: 'new_tab' | 'direct', 
    version?: string,
    discounts?: Discount[] ,

}

type TokenResponse = {
    access_token: string,
    token_type: string
}

export type Embed = {
    destroy: () => void;
}
