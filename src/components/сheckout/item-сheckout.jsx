// components/item-checkout.jsx
import React from 'react'
import { useCartStore, useFormStore } from '../../store/cartStore'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Label } from '../../components/ui/label'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card'
import { Separator } from "../../components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar'
import { Minus, Plus } from 'lucide-react'

export function CartCheckoutPage() {
  const { items, increaseItemQuantity, decreaseItemQuantity } = useCartStore();

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shipping & Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Your cart is empty. Please add items to proceed.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {items.map((item, index) => (
        <Card key={index} className="flex items-center gap-4 p-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={item.image} alt={item.name} />
            <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-lg font-medium">{item.name}</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Size: {item.size}, Quantity: {item.pieces}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => decreaseItemQuantity(item.id, item.size)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span>{item.pieces}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => increaseItemQuantity(item.id, item.size)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-right font-medium">
            {(item.price * item.pieces).toFixed(2)} ₽
          </div>
        </Card>
      ))}
    </div>
  );
}

export function OrderSummary() {
  const { items, clearCart } = useCartStore();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.pieces,
    0,
  );
  const tax = subtotal * 0.08; // Налог 8%
  const total = subtotal + tax;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>{subtotal.toFixed(2)} ₽</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Taxes</span>
          <span>{tax.toFixed(2)} ₽</span>
        </div>
        <Separator /> {/* Используем Separator вместо div с bg-border */}
        <div className="flex items-center justify-between font-medium">
          <span>Total</span>
          <span>{total.toFixed(2)} ₽</span>
        </div>
      </CardContent>
      {items.length > 0 && (
        <CardFooter>
          <Button className="w-full" onClick={clearCart}>
            Clear Cart
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export function ShippingPayment() {
  const { items } = useCartStore();
  const { name, telephone, address, setFormField } = useFormStore();

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shipping & Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Your cart is empty. Please add items to proceed.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping & Payment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setFormField('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telephone">Telephone</Label>
            <Input
              id="telephone"
              type="tel"
              placeholder="+1 234 567 890"
              value={telephone}
              onChange={(e) => setFormField('telephone', e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            placeholder="123 Main St, Anytown USA"
            value={address}
            onChange={(e) => setFormField('address', e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Place Order</Button>
      </CardFooter>
    </Card>
  );
}
