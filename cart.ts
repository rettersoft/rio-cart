import { StepResponse } from '@retter/rdk'
import { cloneDeep } from 'lodash'
import { UpdateCartInput, UpdateCartOutput, CartSummaryInput } from './models'
import { CartDelegate } from './delegate'
import { ClassData, CartProductModel, RemovedItem } from './types'

export async function update(data: ClassData<UpdateCartInput, UpdateCartOutput>): Promise<StepResponse> {
    const { items } = data.request.body!

    const stateItems = data.state.private.items;

    const newStateItems = cloneDeep(stateItems)
    for (const { sku, qty } of items) {
        if (!qty) delete newStateItems[sku]
        else newStateItems[sku] = { sku, qty }
    }

    const cartDelegate = new CartDelegate()
    const stateItemsValues = Object.values(newStateItems);
    if (stateItemsValues.length > cartDelegate.itemCountLimit()) {
        throw new Error('Too many Products!')
    }

    const products: CartProductModel = cartDelegate.getProductDetails(Object.keys(newStateItems));
    const { itemsToRemove } = cartDelegate.checkStockAndPrice(newStateItems, products)

    const failedItems: RemovedItem[] = []
    const removedItems: RemovedItem[] = []
    for (const removedItem of itemsToRemove) {
      newStateItems[removedItem.sku].qty -= removedItem.removedQty
      const item = items.find((index) => index.sku === removedItem.sku) // TODO: Make it O(n)
      if (item) {
        const removedQty = Math.min(item.qty, removedItem.removedQty)
        failedItems.push({ ...removedItem, oldQty: item.qty, removedQty })
        removedItem.removedQty -= removedQty
      }
      if (removedItem.removedQty > 0) {
        removedItems.push({ ...removedItem, oldQty: stateItems[removedItem.sku].qty })
      }
      if (!newStateItems[removedItem.sku].qty) delete newStateItems[removedItem.sku]
    }

    data.state.private.items = newStateItems

    data.response = {
        statusCode: 200,
        body: {
            failedItems,
            removedItems,
        },
    }
    return data
}

export async function clear(data: ClassData): Promise<StepResponse> {
    data.state.private.items = {};
    data.response = {
        statusCode: 200,
        body: {},
    }
    return data
}

export async function cartSummary(data: ClassData<CartSummaryInput, any>): Promise<StepResponse> {
    const { couponCode } = data.request.body!;
    console.log(couponCode);
    const stateItems = data.state.private.items

    const cartDelegate = new CartDelegate()

    const products: CartProductModel = cartDelegate.getProductDetails(Object.keys(stateItems));
    const { itemsToRemove, cartItems } = cartDelegate.checkStockAndPrice(stateItems, products)

    cartDelegate.addServiceFee(cartItems)

    const totalDiscount = 0;
    const cartSummaryOutput = cartDelegate.generateCartSummaryOutput(Object.values(cartItems), [], itemsToRemove, totalDiscount)

    data.response = {
        statusCode: 200,
        body: {
            itemsToRemove,
            cartSummaryOutput,
        },
    }
    return data;
}
