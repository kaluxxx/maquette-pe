"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Package,
  Users,
  FileText,
  MessageSquare,
  Download,
  TrendingUp,
  ShoppingCart,
  UserPlus,
  ChevronRight,
  Euro,
} from "lucide-react";

// Mock KPIs
const kpis = {
  today: {
    revenue: 12499,
    orders: 5,
    newUsers: 3,
    avgCart: 2499,
  },
  week: {
    revenue: 45890,
    orders: 18,
    newUsers: 12,
    avgCart: 2549,
  },
  month: {
    revenue: 189450,
    orders: 75,
    newUsers: 48,
    avgCart: 2526,
  },
};

// Recent orders
const recentOrders = [
  { id: "CYN-2024-001256", customer: "Marie Martin", total: 2499, status: "completed" },
  { id: "CYN-2024-001255", customer: "Pierre Durand", total: 8990, status: "pending" },
  { id: "CYN-2024-001254", customer: "Sophie Bernard", total: 599, status: "completed" },
  { id: "CYN-2024-001253", customer: "Luc Petit", total: 2499, status: "completed" },
];

// Recent users
const recentUsers = [
  { name: "Marie Martin", email: "m.martin@company.fr", date: "Il y a 2h" },
  { name: "Pierre Durand", email: "p.durand@tech.com", date: "Il y a 5h" },
  { name: "Sophie Bernard", email: "s.bernard@corp.fr", date: "Hier" },
];

export default function AdminDashboard() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Vue d'ensemble de votre activité</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exporter CSV
            </Button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Euro className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-xs text-muted-foreground">Aujourd'hui</span>
                </div>
                <p className="text-2xl font-bold">{formatPrice(kpis.today.revenue)}</p>
                <p className="text-sm text-muted-foreground">Chiffre d'affaires</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-xs text-muted-foreground">Aujourd'hui</span>
                </div>
                <p className="text-2xl font-bold">{kpis.today.orders}</p>
                <p className="text-sm text-muted-foreground">Commandes</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <UserPlus className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-xs text-muted-foreground">Aujourd'hui</span>
                </div>
                <p className="text-2xl font-bold">{kpis.today.newUsers}</p>
                <p className="text-sm text-muted-foreground">Nouveaux utilisateurs</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-cyan-600" />
                  </div>
                  <span className="text-xs text-muted-foreground">Aujourd'hui</span>
                </div>
                <p className="text-2xl font-bold">{formatPrice(kpis.today.avgCart)}</p>
                <p className="text-sm text-muted-foreground">Panier moyen</p>
              </CardContent>
            </Card>
          </div>

          {/* Period Stats */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Statistiques par période</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Période</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">CA</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Commandes</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Nouveaux users</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Panier moyen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Aujourd'hui</td>
                      <td className="py-3 px-4 text-right">{formatPrice(kpis.today.revenue)}</td>
                      <td className="py-3 px-4 text-right">{kpis.today.orders}</td>
                      <td className="py-3 px-4 text-right">{kpis.today.newUsers}</td>
                      <td className="py-3 px-4 text-right">{formatPrice(kpis.today.avgCart)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Cette semaine</td>
                      <td className="py-3 px-4 text-right">{formatPrice(kpis.week.revenue)}</td>
                      <td className="py-3 px-4 text-right">{kpis.week.orders}</td>
                      <td className="py-3 px-4 text-right">{kpis.week.newUsers}</td>
                      <td className="py-3 px-4 text-right">{formatPrice(kpis.week.avgCart)}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Ce mois</td>
                      <td className="py-3 px-4 text-right">{formatPrice(kpis.month.revenue)}</td>
                      <td className="py-3 px-4 text-right">{kpis.month.orders}</td>
                      <td className="py-3 px-4 text-right">{kpis.month.newUsers}</td>
                      <td className="py-3 px-4 text-right">{formatPrice(kpis.month.avgCart)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Commandes récentes</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="/admin/orders">
                    Voir tout
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <div>
                        <p className="font-mono text-sm font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(order.total)}</p>
                        <span
                          className={`text-xs ${
                            order.status === "completed"
                              ? "text-green-600"
                              : "text-amber-600"
                          }`}
                        >
                          {order.status === "completed" ? "Terminée" : "En attente"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Users */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Nouveaux utilisateurs</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="/admin/users">
                    Voir tout
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentUsers.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{user.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {user.date}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link href="/admin/products">
                <Package className="h-5 w-5" />
                <span>Gérer les produits</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link href="/admin/orders">
                <FileText className="h-5 w-5" />
                <span>Voir les commandes</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link href="/admin/users">
                <Users className="h-5 w-5" />
                <span>Utilisateurs</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link href="/admin/messages">
                <MessageSquare className="h-5 w-5" />
                <span>Messages</span>
              </Link>
            </Button>
      </div>
    </div>
  );
}
