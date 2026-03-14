"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Trash2,
  ShoppingCart,
  ArrowRight,
  AlertCircle,
  Plus,
  Minus,
  Shield,
  Lock,
  CreditCard,
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: { monthly: number; yearly: number };
  billingPeriod: "monthly" | "yearly";
  quantity: number;
  isAvailable: boolean;
}

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "SOC Premium 24/7",
    description: "Surveillance complète avec intervention immédiate",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&q=80",
    price: { monthly: 2499, yearly: 24990 },
    billingPeriod: "monthly",
    quantity: 1,
    isAvailable: true,
  },
  {
    id: "2",
    name: "EDR Enterprise",
    description: "Protection endpoint avancée avec IA",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80",
    price: { monthly: 899, yearly: 8990 },
    billingPeriod: "yearly",
    quantity: 2,
    isAvailable: true,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const getItemPrice = (item: CartItem) => {
    return item.billingPeriod === "monthly" ? item.price.monthly : item.price.yearly;
  };

  const getItemTotal = (item: CartItem) => {
    return getItemPrice(item) * item.quantity;
  };

  const subtotal = cartItems.reduce((acc, item) => acc + getItemTotal(item), 0);
  const hasUnavailable = cartItems.some((item) => !item.isAvailable);

  const updateQuantity = (id: string, change: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const updateBillingPeriod = (id: string, period: "monthly" | "yearly") => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, billingPeriod: period } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-3">Votre panier est vide</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Découvrez nos solutions de cybersécurité et protégez votre entreprise
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link href="/categories">
              Voir nos solutions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-slate-900 text-white py-12">
        <div className="container">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/10">
            <ShoppingCart className="h-3 w-3 mr-1" />
            {cartItems.length} article{cartItems.length > 1 ? "s" : ""}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold">Mon Panier</h1>
          <p className="text-slate-400 mt-2">
            Vérifiez vos articles avant de procéder au paiement
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container">
          {hasUnavailable && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Certains produits de votre panier ne sont plus disponibles.
                Veuillez les retirer pour continuer.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border border-slate-200 p-4 md:p-6 ${
                    !item.isAvailable ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex gap-4 md:gap-6">
                    {/* Image */}
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      {!item.isAvailable && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                          <Badge variant="secondary">Indisponible</Badge>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={`/products/${item.id}`}
                            className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                            {item.description}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Controls */}
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        {/* Billing Period */}
                        <Select
                          value={item.billingPeriod}
                          onValueChange={(v) =>
                            updateBillingPeriod(item.id, v as "monthly" | "yearly")
                          }
                          disabled={!item.isAvailable}
                        >
                          <SelectTrigger className="w-[140px] h-10 rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Mensuel</SelectItem>
                            <SelectItem value="yearly">
                              Annuel
                              <span className="ml-2 text-xs text-green-600">-17%</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        {/* Quantity */}
                        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-md"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={!item.isAvailable || item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-10 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-md"
                            onClick={() => updateQuantity(item.id, 1)}
                            disabled={!item.isAvailable}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="ml-auto text-right">
                          <p className="text-xl font-bold text-primary">
                            {formatPrice(getItemTotal(item))}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatPrice(getItemPrice(item))}/
                            {item.billingPeriod === "monthly" ? "mois" : "an"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <div className="pt-4">
                <Button variant="outline" asChild className="gap-2">
                  <Link href="/categories">
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Continuer mes achats
                  </Link>
                </Button>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="bg-slate-900 text-white p-6">
                    <h2 className="text-xl font-semibold">Récapitulatif</h2>
                    <p className="text-slate-400 text-sm mt-1">
                      {cartItems.length} article{cartItems.length > 1 ? "s" : ""} dans votre panier
                    </p>
                  </div>

                  <div className="p-6 space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-medium">{formatPrice(getItemTotal(item))}</span>
                      </div>
                    ))}

                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">TVA (20%)</span>
                      <span className="font-medium">Incluse</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    <Button
                      asChild
                      className="w-full gap-2 h-12 text-base"
                      size="lg"
                      disabled={hasUnavailable}
                    >
                      <Link href="/checkout">
                        Procéder au paiement
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Les abonnements sont renouvelés automatiquement
                    </p>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center gap-4 justify-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="h-4 w-4 text-primary" />
                      <span>Paiement sécurisé</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>SSL 256-bit</span>
                    </div>
                  </div>
                </div>

                {/* Payment methods */}
                <div className="flex items-center justify-center gap-3 py-2">
                  <CreditCard className="h-8 w-8 text-slate-400" />
                  <span className="text-xs text-muted-foreground">
                    Visa, Mastercard acceptées
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
