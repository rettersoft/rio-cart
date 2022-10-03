/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CartProductModel, PriceStr, Price, RemovedItem, CartItem, StateCartItem, itemType, ItemTypeTotals, CartSummaryOutput, CheckStockAndPrice } from './types'

export interface CartDelegateInterface {
    minCartAmount: number
    serviceFee: number
    serviceFeeSku: string
    itemCountLimit(): number
    formatSinglePrice(price: number): string
    getProductDetails(skuList: string[]): CartProductModel
    checkStockAndPrice(stateItems: Record<string, StateCartItem>, products: CartProductModel): CheckStockAndPrice
    formatPrice(price: Price): PriceStr
    addServiceFee(cartItems: { [key: string]: CartItem }): void
    initPrice(n: number): Price
    generateCartSummaryOutput(items: CartItem[], appliedPromotions: [], removedItems: RemovedItem[], totalDiscount: number): CartSummaryOutput
}

const formatter = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' })

export abstract class _CartDelegate implements CartDelegateInterface {
    minCartAmount = 10;

    serviceFee = 10;

    serviceFeeSku = 'serviceFee';

    itemCountLimit(): number {
        return 1000
    }

    formatSinglePrice(price: number): string {
        return formatter.format(price / 100)
    }

    formatPrice(price: Price): PriceStr {
        return {
          normal: this.formatSinglePrice(price.normal),
          discounted: this.formatSinglePrice(price.discounted),
          interest: this.formatSinglePrice(price.interest),
          priceAfterPromotions: this.formatSinglePrice(price.priceAfterPromotions),
        }
    }

    initPrice(n: number): Price {
        return {
            normal: n,
            discounted: n,
            interest: n,
            priceAfterPromotions: n,
        }
    }

    getProductDetails(skuList: string[]): CartProductModel {
        console.log(skuList);
        return [{
            sku: '12345',
            stock: 10,
            prices: {
                discounted: 100,
                normal: 110,
            },
            metadata: {
                shortName: 'örnek ürün ismi',
            },
        }]
    }

    checkStockAndPrice(stateItems: Record<string, StateCartItem>, products: CartProductModel): CheckStockAndPrice {
        const cartItems: { [key: string]: CartItem } = {}
        const itemsToRemove: RemovedItem[] = []

        for (const product of products) {
            const { sku, prices, stock, metadata } = product;
            let { qty } = stateItems[sku]
            if (!stateItems[sku]) {
                itemsToRemove.push({ sku, removedQty: qty, reason: 'Could not find product data', oldQty: qty } as RemovedItem)
                continue
            }

            if (!prices) {
                itemsToRemove.push({ sku, removedQty: qty, reason: 'Could not find product data', oldQty: qty } as RemovedItem)
            }

            if (stock < qty) {
                itemsToRemove.push({ sku, removedQty: qty - stock, reason: 'Stock is less than quantity', oldQty: qty } as RemovedItem)
                qty = stock
                if (qty === 0) {
                continue
                }
            }

            const price: Price = {
                normal: Math.ceil(prices.normal),
                discounted: Math.ceil(prices.discounted),
                interest: Math.ceil(prices.interest || prices.discounted),
                priceAfterPromotions: Math.ceil(prices.discounted),
            }

            const totalPrice: Price = {
                normal: Math.ceil(prices.normal * qty),
                discounted: Math.ceil(prices.discounted * qty),
                interest: Math.ceil((prices.interest || prices.discounted) * qty),
                priceAfterPromotions: Math.ceil(prices.discounted * qty),
            }

            cartItems[sku] = {
                sku,
                qty,
                metadata: metadata || undefined,
                price,
                totalPrice,
                priceStr: this.formatPrice(price),
                totalPriceStr: this.formatPrice(totalPrice),
                stock,
                appliedPromotions: [],
                itemType: itemType.Values.product,
            }
        }

        return {
            itemsToRemove,
            cartItems,
        }
    }

    addServiceFee(cartItems: { [key: string]: CartItem }) {
        if (this.serviceFee >= 0) {
            const price = this.initPrice(this.serviceFee)
            const totalPrice = this.initPrice(this.serviceFee)
            cartItems[this.serviceFeeSku] = {
                sku: this.serviceFeeSku,
                qty: 1,
                metadata: {},
                price,
                totalPrice,
                priceStr: this.formatPrice(price),
                totalPriceStr: this.formatPrice(totalPrice),
                stock: 100,
                itemType: itemType.Values.serviceFee,
                appliedPromotions: [],
            }
        }
    }

    generateCartSummaryOutput(items: CartItem[], appliedPromotions: [], removedItems: RemovedItem[], totalDiscount: number): CartSummaryOutput {
        const totalPrice: Price = items.reduce(
            (sum, index) => ({
              normal: sum.normal + index.totalPrice.normal,
              discounted: sum.discounted + index.totalPrice.discounted,
              interest: sum.interest + index.totalPrice.interest,
              priceAfterPromotions: sum.priceAfterPromotions + index.totalPrice.priceAfterPromotions,
            }),
            this.initPrice(0),
        )

        const productCount = items.filter((s) => s.itemType !== itemType.Values.serviceFee).reduce((sum, index) => sum + (index.qty), 0)

        const itemTypeTotals = items.reduce<ItemTypeTotals>((sum, item) => {
            if (!sum[item.itemType]) {
              const emptyPrice = this.initPrice(0)
              sum[item.itemType] = {
                totalPrice: emptyPrice,
                totalPriceStr: this.formatPrice(emptyPrice),
              }
            }

            sum[item.itemType].totalPrice.normal += item.totalPrice.normal
            sum[item.itemType].totalPrice.discounted += item.totalPrice.discounted
            sum[item.itemType].totalPrice.priceAfterPromotions += item.totalPrice.priceAfterPromotions
            sum[item.itemType].totalPriceStr = this.formatPrice(sum[item.itemType].totalPrice)
            return sum
        }, {})

        return {
            items,
            totalPrice,
            totalPriceStr: this.formatPrice(totalPrice),
            totalDiscount,
            totalDiscountStr: this.formatSinglePrice(totalDiscount),
            productCount,
            removedItems,
            appliedPromotions: [],
            itemTypeTotals,
            minCart: {
                price: this.minCartAmount,
                priceStr: this.formatSinglePrice(this.minCartAmount),
                label: 'Minumum alışveriş tutarı',
            },
            timestamp: Date.now(),
        } as CartSummaryOutput
    }
}
