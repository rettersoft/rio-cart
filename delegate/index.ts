import { _CartDelegate, CartDelegateInterface } from '../cart-class'

export class CartDelegate extends _CartDelegate implements CartDelegateInterface {
    minCartAmount = 1000
}
