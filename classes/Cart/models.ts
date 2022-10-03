import { z } from 'zod'
import { StateCartItem, removedItem } from './types'

export const updateCartInput = z.object({
    items: z.array(StateCartItem),
})
export type UpdateCartInput = z.infer<typeof updateCartInput>

export const updateCartOutput = z.object({
    failedItems: z.array(removedItem),
    removedItems: z.array(removedItem),
})
export type UpdateCartOutput = z.infer<typeof updateCartOutput>

export const cartSummaryInput = z.object({
    couponCode: z.string().optional(),
})
export type CartSummaryInput = z.infer<typeof cartSummaryInput>
