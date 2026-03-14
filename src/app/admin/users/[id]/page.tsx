"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Package,
  ArrowLeft,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  ShoppingCart,
  Euro,
  Eye,
  CheckCircle2,
} from "lucide-react";

// Mock user data
const userData = {
  id: "1",
  name: "Marie Martin",
  email: "m.martin@company.fr",
  phone: "+33 6 12 34 56 78",
  company: "TechCorp SAS",
  address: {
    line1: "45 avenue des Champs",
    city: "75008 Paris",
    country: "France",
  },
  registeredAt: "8 janvier 2024",
  lastLogin: "Aujourd'hui a 14:32",
  emailVerified: true,
  stats: {
    ordersCount: 3,
    totalSpent: 12497,
    subscriptionsActive: 2,
  },
  orders: [
    {
      id: "CYN-2024-001256",
      date: "8 janvier 2024",
      total: 2499,
      status: "completed",
    },
    {
      id: "CYN-2024-001189",
      date: "15 decembre 2023",
      total: 8990,
      status: "completed",
    },
    {
      id: "CYN-2023-001045",
      date: "1 aout 2023",
      total: 1008,
      status: "refunded",
    },
  ],
  subscriptions: [
    {
      id: "1",
      name: "SOC Premium 24/7",
      status: "active",
      nextBilling: "8 fevrier 2024",
      price: 2499,
    },
    {
      id: "2",
      name: "EDR Enterprise",
      status: "active",
      nextBilling: "1 mars 2024",
      price: 899,
    },
  ],
};

export default function AdminUserDetailPage() {
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
        <Link href="/admin/users">
          <ArrowLeft className="h-4 w-4" />
          Retour aux utilisateurs
        </Link>
      </Button>

      {/* User Header */}
      <Card className="bg-slate-900 border-0 text-white mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <Avatar className="h-20 w-20 border-4 border-white/20">
              <AvatarFallback className="bg-gradient-to-br from-primary to-cyan-600 text-white text-2xl">
                {userData.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                {userData.emailVerified && (
                  <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verifie
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {userData.email}
                </span>
                <span className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  {userData.company}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2 bg-transparent border-white/20 text-white hover:bg-white/10">
                <Mail className="h-4 w-4" />
                Contacter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userData.stats.ordersCount}</p>
                <p className="text-sm text-muted-foreground">Commandes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Euro className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatPrice(userData.stats.totalSpent)}</p>
                <p className="text-sm text-muted-foreground">Total depense</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userData.stats.subscriptionsActive}</p>
                <p className="text-sm text-muted-foreground">Abonnements actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Commandes recentes</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/orders">Voir tout</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userData.orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div>
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-mono font-medium hover:text-primary transition-colors"
                      >
                        {order.id}
                      </Link>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(order.total)}</p>
                        {order.status === "completed" ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                            Terminee
                          </Badge>
                        ) : (
                          <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 text-xs">
                            Remboursee
                          </Badge>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                        <Link href={`/admin/orders/${order.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subscriptions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Abonnements actifs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userData.subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{sub.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Prochain : {sub.nextBilling}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Actif
                      </Badge>
                      <p className="text-sm font-semibold mt-1">
                        {formatPrice(sub.price)}/mois
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Info */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Telephone</p>
                  <p className="font-medium">{userData.phone}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Entreprise</p>
                  <p className="font-medium">{userData.company}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Adresse</p>
                  <p className="font-medium">{userData.address.line1}</p>
                  <p className="text-sm text-muted-foreground">
                    {userData.address.city}, {userData.address.country}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activite</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Inscrit le</p>
                  <p className="font-medium">{userData.registeredAt}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Derniere connexion</p>
                  <p className="font-medium">{userData.lastLogin}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}