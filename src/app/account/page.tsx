"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Package,
  FileText,
  LogOut,
  ArrowRight,
  Shield,
  Bell,
  ChevronRight,
  Calendar,
  Activity,
  AlertCircle,
} from "lucide-react";

// Mock user data
const userData = {
  name: "Jean Dupont",
  email: "jean.dupont@entreprise.com",
  company: "TechCorp SAS",
  memberSince: "Janvier 2024",
  initials: "JD",
};

// Mock subscriptions
const activeSubscriptions = [
  {
    id: "1",
    name: "SOC Premium 24/7",
    status: "active",
    nextBilling: "15 février 2024",
    price: 2499,
    period: "monthly",
  },
  {
    id: "2",
    name: "EDR Enterprise",
    status: "active",
    nextBilling: "1 mars 2024",
    price: 8990,
    period: "yearly",
  },
];

// Mock recent orders
const recentOrders = [
  {
    id: "CYN-2024-001234",
    date: "8 janvier 2024",
    total: 20479,
    status: "completed",
  },
  {
    id: "CYN-2024-001198",
    date: "15 décembre 2023",
    total: 2499,
    status: "completed",
  },
];

// Navigation items
const navItems = [
  {
    href: "/account",
    label: "Tableau de bord",
    icon: Activity,
    active: true,
  },
  {
    href: "/account/profile",
    label: "Mon profil",
    icon: User,
  },
  {
    href: "/account/subscriptions",
    label: "Mes abonnements",
    icon: Package,
    badge: "2",
  },
  {
    href: "/account/orders",
    label: "Mes commandes",
    icon: FileText,
  },
];

export default function AccountDashboard() {
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
                    item.active
                      ? "bg-primary text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge
                      className={`ml-2 ${
                        item.active
                          ? "bg-white/20 text-white hover:bg-white/20"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-slate-200">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5" />
                  Déconnexion
                </Button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    Bonjour, {userData.name.split(" ")[0]} !
                  </h1>
                  <p className="text-slate-400">
                    Bienvenue dans votre espace client Cyna-IT
                  </p>
                </div>
                <Button className="gap-2 bg-white text-slate-900 hover:bg-white/90" asChild>
                  <Link href="/categories">
                    Explorer nos solutions
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{activeSubscriptions.length}</p>
                      <p className="text-sm text-muted-foreground">Abonnements actifs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">Protégé</p>
                      <p className="text-sm text-muted-foreground">Statut sécurité</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{userData.memberSince}</p>
                      <p className="text-sm text-muted-foreground">Membre depuis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Subscriptions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Abonnements actifs</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="/account/subscriptions">
                    Voir tout
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeSubscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{sub.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Prochain paiement : {sub.nextBilling}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Actif
                      </Badge>
                      <p className="text-sm font-semibold mt-1">
                        {formatPrice(sub.price)}/{sub.period === "monthly" ? "mois" : "an"}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Commandes récentes</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="/account/orders">
                    Voir tout
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <Link
                      key={order.id}
                      href={`/account/orders/${order.id}`}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                          <p className="font-semibold font-mono">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">{formatPrice(order.total)}</p>
                          <Badge variant="secondary" className="text-xs">
                            Terminée
                          </Badge>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-primary to-cyan-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Besoin d'aide ?</h3>
                      <p className="text-white/80 text-sm mb-4">
                        Notre équipe support est disponible 24/7
                      </p>
                      <Button variant="secondary" size="sm" className="gap-2" asChild>
                        <Link href="/contact">
                          Nous contacter
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <AlertCircle className="h-8 w-8 text-white/20" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Mettre à niveau</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Découvrez nos solutions avancées
                      </p>
                      <Button size="sm" className="gap-2" asChild>
                        <Link href="/categories">
                          Voir les options
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <Package className="h-8 w-8 text-slate-200" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
