/* eslint-disable unicorn/prevent-abbreviations */
import { z } from 'zod'
import { Data } from '@retter/rdk'

/* Class Methods */

export const methods = z.enum([
  'STATE',
  'LIST',
  'GET',
  'INIT',
])

/* Method Types */

export const StateCartItem = z.object({
  sku: z.string(),
  qty: z.number().int().min(0),
})

export type StateCartItem = z.infer<typeof StateCartItem>

const priceModel = z.object({
  discounted: z.number().min(1),
  normal: z.number().min(1),
  interest: z.number().min(1).optional(),
})
export type PriceModel = z.infer<typeof priceModel>

export const cartProductModel = z.array(z.object({
  prices: priceModel,
  stock: z.number().min(0),
  sku: z.string(),
  metadata: z.any().optional(),
}))
export type CartProductModel = z.infer<typeof cartProductModel>

export const removedItem = z.object({
  sku: z.string(),
  removedQty: z.number().int().min(0),
  reason: z.string(),
  oldQty: z.number().int().min(0),
  metadata: z.any().optional(),
})
export type RemovedItem = z.infer<typeof removedItem>

/* Cart Items */
export const SimplePrice = z.object({
  normal: z.number().int().min(0),
  discounted: z.number().int().min(0),
})
export type SimplePrice = z.infer<typeof SimplePrice>

export const Price = SimplePrice.extend({
  interest: z.number().min(0),
  priceAfterPromotions: z.number().min(0),
})
export type Price = z.infer<typeof Price>

export type SimplePriceStr = z.infer<typeof SimplePriceStr>
export const SimplePriceStr = z.object({
  normal: z.string(),
  discounted: z.string(),
})

export type PriceStr = z.infer<typeof PriceStr>
export const PriceStr = SimplePriceStr.extend({
  interest: z.string(),
  priceAfterPromotions: z.string(),
})

export const itemType = z.enum(['product', 'serviceFee'])
export type ItemType = z.infer<typeof itemType>

export const CartItem = z.object({
  qty: z.number().int(),
  price: Price,
  totalPrice: Price,
  priceStr: PriceStr,
  totalPriceStr: PriceStr,
  appliedPromotions: z.array(z.any()).optional(),
  sku: z.string(),
  metadata: z.any().optional(),
  stock: z.number(),
  itemType,
})
export type CartItem = z.infer<typeof CartItem>

export const checkStockAndPrice = z.object({
  itemsToRemove: z.array(removedItem),
  cartItems: z.record(z.string(), CartItem),
})
export type CheckStockAndPrice = z.infer<typeof checkStockAndPrice>

/* Cart Items */

/* Cart Summary */
export const ItemTypeTotals = z.record(z.object({ totalPrice: Price, totalPriceStr: PriceStr }))
export type ItemTypeTotals = z.infer<typeof ItemTypeTotals>

const cartLimitDef = z.object({
  price: z.number(),
  priceStr: z.string(),
  label: z.string().default('none'),
})

export const cartSummaryOutput = z.object({
  items: z.array(CartItem),
  productCount: z.number(),
  removedItems: z.array(removedItem),
  totalPrice: Price,
  totalPriceStr: PriceStr,
  appliedPromotions: z.array(z.any()).default([]),
  itemTypeTotals: ItemTypeTotals,
  totalDiscount: z.number(),
  totalDiscountStr: z.string(),
  minCart: cartLimitDef,
  timestamp: z.number(),
})
export type CartSummaryOutput = z.infer<typeof cartSummaryOutput>
/* Cart Summary */

/* Class State */

export const publicState = z.object({})
export const privateState = z.object({
  items: z.record(StateCartItem),
})

export const state = z.object({
  public: publicState,
  private: privateState,
})

export type State = z.infer<typeof state>

export type StatelessData<Input extends any = any, Output extends any = any> = Omit<Data<Input, Output>, 'state'>
export interface ClassData<I extends any = any, O extends any = any> extends StatelessData<I, O> {
  state: State
}
