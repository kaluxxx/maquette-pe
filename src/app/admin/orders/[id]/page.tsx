"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ExternalLink,
  MapPin,
  CreditCard,
  Calendar,
  Clock,
  User,
  Mail,
  CheckCircle2,
} from "lucide-react";

// Mock order data
const orderData = {
  id: "CYN-2024-001256",
  date: "8 janvier 2024",
  time: "14:32",
  status: "completed",
  customer: {
    name: "Marie Martin",
    email: "m.martin@company.fr",
    phone: "+33 6 12 34 56 78",
  },
  items: [
    {
      id: "1",
      name: "SOC Premium 24/7",
      description: "Surveillance complete avec intervention immediate",
      price: 2499,
      period: "monthly",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=200&q=80",
    },
  ],
  billingAddress: {
    name: "Marie Martin",
    company: "TechCorp SAS",
    address: "45 avenue des Champs",
    city: "75008 Paris",
    country: "France",
  },
  paymentMethod: {
    type: "card",
    last4: "4242",
    brand: "Visa",
  },
  subtotal: 2499,
  tax: 0,
  total: 2499,
  timeline: [
    { date: "8 janvier 2024 - 14:32", status: "Commande passee", completed: true },
    { date: "8 janvier 2024 - 14:32", status: "Paiement confirme", completed: true },
    { date: "8 janvier 2024 - 14:35", status: "Services actives", completed: true },
    { date: "8 janvier 2024 - 15:00", status: "Email envoye", completed: true },
  ],
};

export default function AdminOrderDetailPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  return (
    <div className="p-6">
      {/* Back Link */}
      <Button variant="ghost" className="gap-2 mb-6 -ml-4" asChild>
        <Link href="/admin/orders">
          <ArrowLeft className="h-4 w-4" />
          Retour aux commandes
        </Link>
      </Button>

      {/* Order Header */}
      <Card className="bg-slate-900 border-0 text-white mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold font-mono">{orderData.id}</h1>
                <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Terminee
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {orderData.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {orderData.time}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="completed">
                <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="completed">Terminee</SelectItem>
                  <SelectItem value="refunded">Remboursee</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2 bg-transparent border-white/20 text-white hover:bg-white/10">
                <ExternalLink className="h-4 w-4" />
                Recu Stripe
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Client
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {orderData.customer.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{orderData.customer.name}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {orderData.customer.email}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/users/1">Voir le profil</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Articles commandes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderData.items.map((item, index) => (
                <div key={item.id}>
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/admin/products/${item.id}`}
                        className="font-semibold hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {item.period === "monthly" ? "Mensuel" : "Annuel"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Qte: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                  {index < orderData.items.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span>{formatPrice(orderData.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">TVA (20%)</span>
                  <span>Incluse</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(orderData.total)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing & Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Facturation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground text-sm">
                  <p className="font-medium text-foreground">{orderData.billingAddress.name}</p>
                  {orderData.billingAddress.company && <p>{orderData.billingAddress.company}</p>}
                  <p>{orderData.billingAddress.address}</p>
                  <p>{orderData.billingAddress.city}</p>
                  <p>{orderData.billingAddress.country}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Paiement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">VISA</span>
                  </div>
                  <div>
                    <p className="font-medium">
                      {orderData.paymentMethod.brand} **** {orderData.paymentMethod.last4}
                    </p>
                    <p className="text-sm text-muted-foreground">Carte de credit</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Timeline */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Historique</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-green-200" />
                <div className="space-y-6">
                  {orderData.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4 relative">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                          event.completed ? "bg-green-100" : "bg-slate-100"
                        }`}
                      >
                        <CheckCircle2
                          className={`h-4 w-4 ${
                            event.completed ? "text-green-600" : "text-slate-400"
                          }`}
                        />
                      </div>
                      <div className="pt-1">
                        <p className="font-medium text-sm">{event.status}</p>
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="bg-slate-50">
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Mail className="h-4 w-4" />
                Renvoyer la confirmation
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <ExternalLink className="h-4 w-4" />
                Voir sur Stripe
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}