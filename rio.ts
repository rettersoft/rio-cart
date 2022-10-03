
// This is an auto generated file!

import RDK, { KeyValueString, GetInstance, CloudObjectResponse } from '@retter/rdk'

interface RetterRequest<T> extends Omit<GetInstance, 'classId'|'body'> {
    body?: T
}

interface RetterResponse<T> extends CloudObjectResponse {
    body?: T
}

// To parse this data:
//
//   import { Convert, RioModels } from "./file";
//
//   const rioModels = Convert.toRioModels(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface RioModelsObject {
    AboutUsOutput?:       AboutUsOutput;
    CmsContentType?:      CMSContentType;
    GetEmailAuthInput?:   GetEmailAuthInput;
    Image?:               Image;
    LoginInput?:          LoginInput;
    LoginOutput?:         LoginOutput;
    ProductImportOutput?: ProductImportOutput;
    ProductSchema?:       ProductSchema;
    SearchInput?:         SearchInput;
    UpdateCartInput?:     UpdateCartInput;
    UpsertContentOutput?: UpsertContentOutput;
}

export interface AboutUsOutput {
    content:             string;
    imageUrl:            string;
    socialMediaItemList: SocialMediaItemList[];
}

export interface SocialMediaItemList {
    imageUrk: string;
    name:     string;
    url:      string;
}

export interface CMSContentType {
    content: string;
}

export interface GetEmailAuthInput {
    email: string;
}

export interface Image {
    id:         string;
    imageType?: ImageType;
    tags?:      string[];
    url?:       string;
}

export enum ImageType {
    Badge = "badge",
    Category = "category",
    Product = "product",
}

export interface LoginInput {
    password: string;
}

export interface LoginOutput {
    response?: any;
    token:     string;
}

export interface ProductImportOutput {
    id?:      string;
    message?: string;
}

export interface ProductSchema {
    attributes:     Attributes;
    id:             string;
    images?:        string[];
    priceTag:       PriceTag;
    stockStatus:    string;
    variantGroupId: string;
}

export interface Attributes {
    brands:      Brands;
    categories:  Categories;
    description: Description;
    longName:    LongName;
    shortName:   ShortName;
}

export interface Brands {
    label:   string;
    type?:   string;
    values?: string[];
}

export interface Categories {
    label:   string;
    type?:   string;
    values?: string[];
}

export interface Description {
    label:   string;
    type?:   string;
    values?: string[];
}

export interface LongName {
    label:   string;
    type?:   string;
    values?: string[];
}

export interface ShortName {
    label:   string;
    type?:   string;
    values?: string[];
}

export interface PriceTag {
    currency:             string;
    discountedPrice:      number;
    discountedPriceLabel: string;
    discountRate:         number;
    discountRateLabel:    string;
    price:                number;
    priceLabel:           string;
}

export interface SearchInput {
    query: Query;
}

export interface Query {
    aggsFilters?:   AggsFilter[];
    categoryId?:    string;
    extendedAggs?:  boolean;
    filters?:       Filter[];
    from?:          any;
    inStock?:       boolean;
    locale?:        string;
    matchTerms?:    MatchTerm[];
    priceRange?:    PriceRange;
    range?:         Range;
    searchTerm?:    string;
    size?:          any;
    sortAttribute?: string;
    sortBy?:        SortBy[];
    sortOrder?:     Order;
    tags?:          string[];
}

export interface AggsFilter {
    fieldName:   string;
    filterId:    string;
    filterType:  string;
    label?:      string;
    order?:      number;
    postfix?:    string;
    prefix?:     string;
    searchable?: boolean;
    totalCount?: number;
    values?:     Value[];
    visibility?: boolean;
}

export interface Value {
    count?:    number;
    filtered?: boolean;
    label?:    string;
    maxValue?: number;
    minValue?: number;
    value?:    string;
}

export interface Filter {
    excludedValues?: any[];
    filterId?:       string;
    filterValues?:   any[];
    isInternal?:     boolean;
}

export interface MatchTerm {
    key:    string;
    value?: any;
}

export interface PriceRange {
    max: number;
    min: number;
}

export interface Range {
    field: string;
    max?:  number | string;
    min?:  number | string;
}

export interface SortBy {
    attribute: string;
    order:     Order;
}

export enum Order {
    Asc = "asc",
    Desc = "desc",
}

export interface UpdateCartInput {
    items: Item[];
}

export interface Item {
    qty: number;
    sku: string;
}

export interface UpsertContentOutput {
    content: string;
    message: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toRioModels(json: string): any[] | boolean | number | number | null | RioModelsObject | string {
        return cast(JSON.parse(json), u(a("any"), true, 3.14, 0, null, r("RioModelsObject"), ""));
    }

    public static rioModelsToJson(value: any[] | boolean | number | number | null | RioModelsObject | string): string {
        return JSON.stringify(uncast(value, u(a("any"), true, 3.14, 0, null, r("RioModelsObject"), "")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "RioModelsObject": o([
        { json: "AboutUsOutput", js: "AboutUsOutput", typ: u(undefined, r("AboutUsOutput")) },
        { json: "CmsContentType", js: "CmsContentType", typ: u(undefined, r("CMSContentType")) },
        { json: "GetEmailAuthInput", js: "GetEmailAuthInput", typ: u(undefined, r("GetEmailAuthInput")) },
        { json: "Image", js: "Image", typ: u(undefined, r("Image")) },
        { json: "LoginInput", js: "LoginInput", typ: u(undefined, r("LoginInput")) },
        { json: "LoginOutput", js: "LoginOutput", typ: u(undefined, r("LoginOutput")) },
        { json: "ProductImportOutput", js: "ProductImportOutput", typ: u(undefined, r("ProductImportOutput")) },
        { json: "ProductSchema", js: "ProductSchema", typ: u(undefined, r("ProductSchema")) },
        { json: "SearchInput", js: "SearchInput", typ: u(undefined, r("SearchInput")) },
        { json: "UpdateCartInput", js: "UpdateCartInput", typ: u(undefined, r("UpdateCartInput")) },
        { json: "UpsertContentOutput", js: "UpsertContentOutput", typ: u(undefined, r("UpsertContentOutput")) },
    ], "any"),
    "AboutUsOutput": o([
        { json: "content", js: "content", typ: "" },
        { json: "imageUrl", js: "imageUrl", typ: "" },
        { json: "socialMediaItemList", js: "socialMediaItemList", typ: a(r("SocialMediaItemList")) },
    ], false),
    "SocialMediaItemList": o([
        { json: "imageUrk", js: "imageUrk", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "url", js: "url", typ: "" },
    ], false),
    "CMSContentType": o([
        { json: "content", js: "content", typ: "" },
    ], false),
    "GetEmailAuthInput": o([
        { json: "email", js: "email", typ: "" },
    ], false),
    "Image": o([
        { json: "id", js: "id", typ: "" },
        { json: "imageType", js: "imageType", typ: u(undefined, r("ImageType")) },
        { json: "tags", js: "tags", typ: u(undefined, a("")) },
        { json: "url", js: "url", typ: u(undefined, "") },
    ], false),
    "LoginInput": o([
        { json: "password", js: "password", typ: "" },
    ], false),
    "LoginOutput": o([
        { json: "response", js: "response", typ: u(undefined, "any") },
        { json: "token", js: "token", typ: "" },
    ], false),
    "ProductImportOutput": o([
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "message", js: "message", typ: u(undefined, "") },
    ], false),
    "ProductSchema": o([
        { json: "attributes", js: "attributes", typ: r("Attributes") },
        { json: "id", js: "id", typ: "" },
        { json: "images", js: "images", typ: u(undefined, a("")) },
        { json: "priceTag", js: "priceTag", typ: r("PriceTag") },
        { json: "stockStatus", js: "stockStatus", typ: "" },
        { json: "variantGroupId", js: "variantGroupId", typ: "" },
    ], false),
    "Attributes": o([
        { json: "brands", js: "brands", typ: r("Brands") },
        { json: "categories", js: "categories", typ: r("Categories") },
        { json: "description", js: "description", typ: r("Description") },
        { json: "longName", js: "longName", typ: r("LongName") },
        { json: "shortName", js: "shortName", typ: r("ShortName") },
    ], false),
    "Brands": o([
        { json: "label", js: "label", typ: "" },
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "values", js: "values", typ: u(undefined, a("")) },
    ], false),
    "Categories": o([
        { json: "label", js: "label", typ: "" },
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "values", js: "values", typ: u(undefined, a("")) },
    ], false),
    "Description": o([
        { json: "label", js: "label", typ: "" },
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "values", js: "values", typ: u(undefined, a("")) },
    ], false),
    "LongName": o([
        { json: "label", js: "label", typ: "" },
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "values", js: "values", typ: u(undefined, a("")) },
    ], false),
    "ShortName": o([
        { json: "label", js: "label", typ: "" },
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "values", js: "values", typ: u(undefined, a("")) },
    ], false),
    "PriceTag": o([
        { json: "currency", js: "currency", typ: "" },
        { json: "discountedPrice", js: "discountedPrice", typ: 3.14 },
        { json: "discountedPriceLabel", js: "discountedPriceLabel", typ: "" },
        { json: "discountRate", js: "discountRate", typ: 3.14 },
        { json: "discountRateLabel", js: "discountRateLabel", typ: "" },
        { json: "price", js: "price", typ: 3.14 },
        { json: "priceLabel", js: "priceLabel", typ: "" },
    ], false),
    "SearchInput": o([
        { json: "query", js: "query", typ: r("Query") },
    ], false),
    "Query": o([
        { json: "aggsFilters", js: "aggsFilters", typ: u(undefined, a(r("AggsFilter"))) },
        { json: "categoryId", js: "categoryId", typ: u(undefined, "") },
        { json: "extendedAggs", js: "extendedAggs", typ: u(undefined, true) },
        { json: "filters", js: "filters", typ: u(undefined, a(r("Filter"))) },
        { json: "from", js: "from", typ: u(undefined, "any") },
        { json: "inStock", js: "inStock", typ: u(undefined, true) },
        { json: "locale", js: "locale", typ: u(undefined, "") },
        { json: "matchTerms", js: "matchTerms", typ: u(undefined, a(r("MatchTerm"))) },
        { json: "priceRange", js: "priceRange", typ: u(undefined, r("PriceRange")) },
        { json: "range", js: "range", typ: u(undefined, r("Range")) },
        { json: "searchTerm", js: "searchTerm", typ: u(undefined, "") },
        { json: "size", js: "size", typ: u(undefined, "any") },
        { json: "sortAttribute", js: "sortAttribute", typ: u(undefined, "") },
        { json: "sortBy", js: "sortBy", typ: u(undefined, a(r("SortBy"))) },
        { json: "sortOrder", js: "sortOrder", typ: u(undefined, r("Order")) },
        { json: "tags", js: "tags", typ: u(undefined, a("")) },
    ], false),
    "AggsFilter": o([
        { json: "fieldName", js: "fieldName", typ: "" },
        { json: "filterId", js: "filterId", typ: "" },
        { json: "filterType", js: "filterType", typ: "" },
        { json: "label", js: "label", typ: u(undefined, "") },
        { json: "order", js: "order", typ: u(undefined, 3.14) },
        { json: "postfix", js: "postfix", typ: u(undefined, "") },
        { json: "prefix", js: "prefix", typ: u(undefined, "") },
        { json: "searchable", js: "searchable", typ: u(undefined, true) },
        { json: "totalCount", js: "totalCount", typ: u(undefined, 3.14) },
        { json: "values", js: "values", typ: u(undefined, a(r("Value"))) },
        { json: "visibility", js: "visibility", typ: u(undefined, true) },
    ], false),
    "Value": o([
        { json: "count", js: "count", typ: u(undefined, 3.14) },
        { json: "filtered", js: "filtered", typ: u(undefined, true) },
        { json: "label", js: "label", typ: u(undefined, "") },
        { json: "maxValue", js: "maxValue", typ: u(undefined, 3.14) },
        { json: "minValue", js: "minValue", typ: u(undefined, 3.14) },
        { json: "value", js: "value", typ: u(undefined, "") },
    ], false),
    "Filter": o([
        { json: "excludedValues", js: "excludedValues", typ: u(undefined, a("any")) },
        { json: "filterId", js: "filterId", typ: u(undefined, "") },
        { json: "filterValues", js: "filterValues", typ: u(undefined, a("any")) },
        { json: "isInternal", js: "isInternal", typ: u(undefined, true) },
    ], false),
    "MatchTerm": o([
        { json: "key", js: "key", typ: "" },
        { json: "value", js: "value", typ: u(undefined, "any") },
    ], false),
    "PriceRange": o([
        { json: "max", js: "max", typ: 3.14 },
        { json: "min", js: "min", typ: 3.14 },
    ], false),
    "Range": o([
        { json: "field", js: "field", typ: "" },
        { json: "max", js: "max", typ: u(undefined, u(3.14, "")) },
        { json: "min", js: "min", typ: u(undefined, u(3.14, "")) },
    ], false),
    "SortBy": o([
        { json: "attribute", js: "attribute", typ: "" },
        { json: "order", js: "order", typ: r("Order") },
    ], false),
    "UpdateCartInput": o([
        { json: "items", js: "items", typ: a(r("Item")) },
    ], false),
    "Item": o([
        { json: "qty", js: "qty", typ: 0 },
        { json: "sku", js: "sku", typ: "" },
    ], false),
    "UpsertContentOutput": o([
        { json: "content", js: "content", typ: "" },
        { json: "message", js: "message", typ: "" },
    ], false),
    "ImageType": [
        "badge",
        "category",
        "product",
    ],
    "Order": [
        "asc",
        "desc",
    ],
};



export interface RDKOptions<T = KeyValueString> {
    httpMethod?: string
    queryStringParams?: T
    headers?: KeyValueString
}

export namespace Classes {
    /** Cart Class */
export class Cart {
    private readonly _rdk: RDK
    private readonly lookupKey?: { name: string; value: string }
    public readonly instanceId?: string
    public isNewInstance?: boolean
    public _response?: any

    /**
     * use this constructor if you know the instance id.
     * @param {string} instanceId - instance id
     * @returns {Cart}
     */
    public constructor(instanceId: string);
    /**
     * use this constructor if you know only the look up key.
     * @param {string} name - look up key name
     * @param {string} value - look up key value
     * @returns {Cart}
     */
    public constructor(name: string, value: string);
    public constructor(...args: string[]) {
        this.isNewInstance = false
        this._rdk = new RDK()
        if (args.length === 0 || args.length > 2) {
            throw new Error('Invalid number of arguments.');
        }
        if (args.length === 2) this.lookupKey = { name: args[0], value: args[1] }
        else this.instanceId = args[0]
    }

    get rdk() { return this._rdk }

    /**
     * Gets a cloud object instance or creates new one
     * @param {RetterRequest<any>} options - instance options
     * @returns {Promise<Cart>}
     */
    public static async getInstance(options?: RetterRequest<any>): Promise<Cart> {
        const rdk = new RDK()
        const result = await rdk.getInstance({
            ...options,
            classId: 'Cart',
        })
        if (result && 200 <= result.statusCode && result.statusCode < 300) {
            const _instance = new Cart(result.body.instanceId)
            _instance.isNewInstance = !!result.body.newInstance
            _instance._response = result.body.response
            return _instance
        }

        throw new Error(result?.body?.message || (typeof result?.body?.error === 'string' ? result?.body?.error : undefined) ||  'failed')
    }

    /**
 * calls update on Cart
 * @param {UpdateCartInput} body - payload
 * @param {RDKOptions} options - other method call parameters
 * @returns {Promise<RetterResponse<any>>}
 */
public async update(body?: UpdateCartInput, options?: RDKOptions): Promise<RetterResponse<any> | undefined> {
    return await this._rdk.methodCall({
        ...options,
        classId: 'Cart',
        instanceId: this.instanceId,
        lookupKey: this.lookupKey,
        methodName: 'update',
        body,
    })
}

/**
 * calls clear on Cart
 * @param {any} body - payload
 * @param {RDKOptions} options - other method call parameters
 * @returns {Promise<RetterResponse<any>>}
 */
public async clear(body?: any, options?: RDKOptions): Promise<RetterResponse<any> | undefined> {
    return await this._rdk.methodCall({
        ...options,
        classId: 'Cart',
        instanceId: this.instanceId,
        lookupKey: this.lookupKey,
        methodName: 'clear',
        body,
    })
}

/**
 * calls cartSummary on Cart
 * @param {any} body - payload
 * @param {RDKOptions} options - other method call parameters
 * @returns {Promise<RetterResponse<any>>}
 */
public async cartSummary(body?: any, options?: RDKOptions): Promise<RetterResponse<any> | undefined> {
    return await this._rdk.methodCall({
        ...options,
        classId: 'Cart',
        instanceId: this.instanceId,
        lookupKey: this.lookupKey,
        methodName: 'cartSummary',
        body,
    })
}
}

/** Catalog Class */
export class Catalog {
    private readonly _rdk: RDK
    private readonly lookupKey?: { name: string; value: string }
    public readonly instanceId?: string
    public isNewInstance?: boolean
    public _response?: any

    /**
     * use this constructor if you know the instance id.
     * @param {string} instanceId - instance id
     * @returns {Catalog}
     */
    public constructor(instanceId: string);
    /**
     * use this constructor if you know only the look up key.
     * @param {string} name - look up key name
     * @param {string} value - look up key value
     * @returns {Catalog}
     */
    public constructor(name: string, value: string);
    public constructor(...args: string[]) {
        this.isNewInstance = false
        this._rdk = new RDK()
        if (args.length === 0 || args.length > 2) {
            throw new Error('Invalid number of arguments.');
        }
        if (args.length === 2) this.lookupKey = { name: args[0], value: args[1] }
        else this.instanceId = args[0]
    }

    get rdk() { return this._rdk }

    /**
     * Gets a cloud object instance or creates new one
     * @param {RetterRequest<any>} options - instance options
     * @returns {Promise<Catalog>}
     */
    public static async getInstance(options?: RetterRequest<any>): Promise<Catalog> {
        const rdk = new RDK()
        const result = await rdk.getInstance({
            ...options,
            classId: 'Catalog',
        })
        if (result && 200 <= result.statusCode && result.statusCode < 300) {
            const _instance = new Catalog(result.body.instanceId)
            _instance.isNewInstance = !!result.body.newInstance
            _instance._response = result.body.response
            return _instance
        }

        throw new Error(result?.body?.message || (typeof result?.body?.error === 'string' ? result?.body?.error : undefined) ||  'failed')
    }

    /**
 * calls search on Catalog
 * @param {SearchInput} body - payload
 * @param {RDKOptions} options - other method call parameters
 * @returns {Promise<RetterResponse<any>>}
 */
public async search(body?: SearchInput, options?: RDKOptions): Promise<RetterResponse<any> | undefined> {
    return await this._rdk.methodCall({
        ...options,
        classId: 'Catalog',
        instanceId: this.instanceId,
        lookupKey: this.lookupKey,
        methodName: 'search',
        body,
    })
}

/**
 * calls aggregate on Catalog
 * @param {SearchInput} body - payload
 * @param {RDKOptions} options - other method call parameters
 * @returns {Promise<RetterResponse<any>>}
 */
public async aggregate(body?: SearchInput, options?: RDKOptions): Promise<RetterResponse<any> | undefined> {
    return await this._rdk.methodCall({
        ...options,
        classId: 'Catalog',
        instanceId: this.instanceId,
        lookupKey: this.lookupKey,
        methodName: 'aggregate',
        body,
    })
}

/**
 * calls indexCatalogItem on Catalog
 * @param {any} body - payload
 * @param {RDKOptions} options - other method call parameters
 * @returns {Promise<RetterResponse<any>>}
 */
public async indexCatalogItem(body?: any, options?: RDKOptions): Promise<RetterResponse<any> | undefined> {
    return await this._rdk.methodCall({
        ...options,
        classId: 'Catalog',
        instanceId: this.instanceId,
        lookupKey: this.lookupKey,
        methodName: 'indexCatalogItem',
        body,
    })
}
}

/** Product Class */
export class Product {
    private readonly _rdk: RDK
    private readonly lookupKey?: { name: string; value: string }
    public readonly instanceId?: string
    public isNewInstance?: boolean
    public _response?: any

    /**
     * use this constructor if you know the instance id.
     * @param {string} instanceId - instance id
     * @returns {Product}
     */
    public constructor(instanceId: string);
    /**
     * use this constructor if you know only the look up key.
     * @param {string} name - look up key name
     * @param {string} value - look up key value
     * @returns {Product}
     */
    public constructor(name: string, value: string);
    public constructor(...args: string[]) {
        this.isNewInstance = false
        this._rdk = new RDK()
        if (args.length === 0 || args.length > 2) {
            throw new Error('Invalid number of arguments.');
        }
        if (args.length === 2) this.lookupKey = { name: args[0], value: args[1] }
        else this.instanceId = args[0]
    }

    get rdk() { return this._rdk }

    /**
     * Gets a cloud object instance or creates new one
     * @param {RetterRequest<any>} options - instance options
     * @returns {Promise<Product>}
     */
    public static async getInstance(options?: RetterRequest<any>): Promise<Product> {
        const rdk = new RDK()
        const result = await rdk.getInstance({
            ...options,
            classId: 'Product',
        })
        if (result && 200 <= result.statusCode && result.statusCode < 300) {
            const _instance = new Product(result.body.instanceId)
            _instance.isNewInstance = !!result.body.newInstance
            _instance._response = result.body.response
            return _instance
        }

        throw new Error(result?.body?.message || (typeof result?.body?.error === 'string' ? result?.body?.error : undefined) ||  'failed')
    }

    /**
 * calls importProduct on Product
 * @param {ProductSchema} body - payload
 * @param {RDKOptions} options - other method call parameters
 * @returns {Promise<RetterResponse<any>>}
 */
public async importProduct(body?: ProductSchema, options?: RDKOptions): Promise<RetterResponse<any> | undefined> {
    return await this._rdk.methodCall({
        ...options,
        classId: 'Product',
        instanceId: this.instanceId,
        lookupKey: this.lookupKey,
        methodName: 'importProduct',
        body,
    })
}

/**
 * calls getProduct on Product
 * @param {any} body - payload
 * @param {RDKOptions} options - other method call parameters
 * @returns {Promise<RetterResponse<any>>}
 */
public async getProduct(body?: any, options?: RDKOptions): Promise<RetterResponse<any> | undefined> {
    return await this._rdk.methodCall({
        ...options,
        classId: 'Product',
        instanceId: this.instanceId,
        lookupKey: this.lookupKey,
        methodName: 'getProduct',
        body,
    })
}
}

/** User Class */
export class User {
    private readonly _rdk: RDK
    private readonly lookupKey?: { name: string; value: string }
    public readonly instanceId?: string
    public isNewInstance?: boolean
    public _response?: any

    /**
     * use this constructor if you know the instance id.
     * @param {string} instanceId - instance id
     * @returns {User}
     */
    public constructor(instanceId: string);
    /**
     * use this constructor if you know only the look up key.
     * @param {string} name - look up key name
     * @param {string} value - look up key value
     * @returns {User}
     */
    public constructor(name: string, value: string);
    public constructor(...args: string[]) {
        this.isNewInstance = false
        this._rdk = new RDK()
        if (args.length === 0 || args.length > 2) {
            throw new Error('Invalid number of arguments.');
        }
        if (args.length === 2) this.lookupKey = { name: args[0], value: args[1] }
        else this.instanceId = args[0]
    }

    get rdk() { return this._rdk }

    /**
     * Gets a cloud object instance or creates new one
     * @param {RetterRequest<any>} options - instance options
     * @returns {Promise<User>}
     */
    public static async getInstance(options?: RetterRequest<any>): Promise<User> {
        const rdk = new RDK()
        const result = await rdk.getInstance({
            ...options,
            classId: 'User',
        })
        if (result && 200 <= result.statusCode && result.statusCode < 300) {
            const _instance = new User(result.body.instanceId)
            _instance.isNewInstance = !!result.body.newInstance
            _instance._response = result.body.response
            return _instance
        }

        throw new Error(result?.body?.message || (typeof result?.body?.error === 'string' ? result?.body?.error : undefined) ||  'failed')
    }

    /**
 * calls login on User
 * @param {LoginInput} body - payload
 * @param {RDKOptions} options - other method call parameters
 * @returns {Promise<RetterResponse<any>>}
 */
public async login(body?: LoginInput, options?: RDKOptions): Promise<RetterResponse<any> | undefined> {
    return await this._rdk.methodCall({
        ...options,
        classId: 'User',
        instanceId: this.instanceId,
        lookupKey: this.lookupKey,
        methodName: 'login',
        body,
    })
}
}
}
