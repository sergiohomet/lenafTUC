export interface menuItem {
    id: number
    name: string
    price: number
}

export interface OrderItem extends menuItem {
    quantity: number
}

