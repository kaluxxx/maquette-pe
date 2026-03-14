"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  CreditCard,
  Package,
  FileText,
  LogOut,
  Shield,
  Bell,
  ArrowLeft,
  Download,
  ExternalLink,
  Activity,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
} from "lucide-react";

// Mock order data
const orderData = {
  id: "CYN-2024-001234",
  date: "8 janvier 2024",
  time: "14:32",
  status: "completed",
  items: [
    {
      id: "1",
      name: "SOC Premium 24/7",
      description: "Surveillance complète avec intervention immédiate",
      price: 2499,
      period: "monthly",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=200&q=80",
    },
    {
      id: "2",
      name: "EDR Enterprise",
      description: "Protection endpoint avancée avec IA",
      price: 8990,
      period: "yearly",
      quantity: 2,
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=200&q=80",
    },
  ],
  billingAddress: {
    name: "Jean Dupont",
    company: "TechCorp SAS",
    address: "123 rue de la Paix",
    city: "75001 Paris",
    country: "France",
  },
  paymentMethod: {
    type: "card",
    last4: "4242",
    brand: "Visa",
  },
  subtotal: 20479,
  tax: 0,
  total: 20479,
  timeline: [
    { date: "8 janvier 2024 - 14:32", status: "Commande passée", completed: true },
    { date: "8 janvier 2024 - 14:32", status: "Paiement confirmé", completed: true },
    { date: "8 janvier 2024 - 14:35", status: "Services activés", completed: true },
    { date: "8 janvier 2024 - 15:00", status: "Email de confirmation envoyé", completed: true },
  ],
};

// Navigation items
const navItems = [
  { href: "/account", label: "Tableau de bord", icon: Activity },
  { href: "/account/profile", label: "Mon profil", icon: User },
  { href: "/account/subscriptions", label: "Mes abonnements", icon: Package, badge: "2" },
  { href: "/account/orders", label: "Mes commandes", icon: FileText, active: true },
];

export default function OrderDetailPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <nav className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1 sticky top-24">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                    item.active ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge className={`ml-2 ${item.active ? "bg-white/20 text-white hover:bg-white/20" : "bg-primary/10 text-primary"}`}>
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-200">
                <Button variant="ghost" className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50">
                  <LogOut className="h-5 w-5" />
                  Déconnexion
                </Button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-6">
            {/* Back Link */}
            <Button variant="ghost" className="gap-2 -ml-4" asChild>
              <Link href="/account/orders">
                <ArrowLeft className="h-4 w-4" />
                Retour aux commandes
              </Link>
            </Button>

            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold font-mono">{orderData.id}</h1>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Terminée
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Reçu Stripe
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Télécharger
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Order Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Articles commandés</CardTitle>
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
                              href={`/products/${item.id}`}
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
                                Qté: {item.quantity}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatPrice(item.price)}/{item.period === "monthly" ? "mois" : "an"}
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

                {/* Billing Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Adresse de facturation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-muted-foreground">
                      <p className="font-medium text-foreground">{orderData.billingAddress.name}</p>
                      {orderData.billingAddress.company && <p>{orderData.billingAddress.company}</p>}
                      <p>{orderData.billingAddress.address}</p>
                      <p>{orderData.billingAddress.city}</p>
                      <p>{orderData.billingAddress.country}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Moyen de paiement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">VISA</span>
                      </div>
                      <div>
                        <p className="font-medium">
                          {orderData.paymentMethod.brand} •••• {orderData.paymentMethod.last4}
                        </p>
                        <p className="text-sm text-muted-foreground">Carte de crédit</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Timeline */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Historique</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-green-200" />

                      <div className="space-y-6">
                        {orderData.timeline.map((event, index) => (
                          <div key={index} className="flex gap-4 relative">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                                event.completed
                                  ? "bg-green-100"
                                  : "bg-slate-100"
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

                {/* Help Card */}
                <Card className="bg-slate-900 border-0 text-white">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Besoin d'aide ?</h3>
                    <p className="text-sm text-slate-400 mb-4">
                      Notre équipe support est disponible pour répondre à vos questions.
                    </p>
                    <Button variant="secondary" className="w-full" asChild>
                      <Link href="/contact">Contacter le support</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
