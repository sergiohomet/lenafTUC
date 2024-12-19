export interface menuItem {
    id: number
    name: string
    price: number
    direction: string
}

export interface OrderItem extends menuItem {
    quantity: number,
}

