"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Package,
  FileText,
  LogOut,
  Shield,
  Bell,
  Activity,
  Download,
  ExternalLink,
  Calendar,
  Search,
  Eye,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock orders data
const orders = [
  {
    id: "CYN-2024-001234",
    date: "8 janvier 2024",
    year: 2024,
    total: 20479,
    status: "completed",
    itemsCount: 3,
  },
  {
    id: "CYN-2024-001198",
    date: "15 décembre 2023",
    year: 2023,
    total: 2499,
    status: "completed",
    itemsCount: 1,
  },
  {
    id: "CYN-2023-001156",
    date: "1 novembre 2023",
    year: 2023,
    total: 8990,
    status: "completed",
    itemsCount: 1,
  },
  {
    id: "CYN-2023-001089",
    date: "15 septembre 2023",
    year: 2023,
    total: 599,
    status: "refunded",
    itemsCount: 1,
  },
  {
    id: "CYN-2023-001045",
    date: "1 août 2023",
    year: 2023,
    total: 2499,
    status: "completed",
    itemsCount: 1,
  },
];

// Navigation items
const navItems = [
  { href: "/account", label: "Tableau de bord", icon: Activity },
  { href: "/account/profile", label: "Mon profil", icon: User },
  { href: "/account/subscriptions", label: "Mes abonnements", icon: Package, badge: "2" },
  { href: "/account/orders", label: "Mes commandes", icon: FileText, active: true },
];

export default function OrdersPage() {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  // Get unique years
  const years = [...new Set(orders.map((o) => o.year))].sort((a, b) => b - a);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesYear = selectedYear === "all" || order.year === parseInt(selectedYear);
    const matchesSearch = searchQuery === "" || order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesSearch;
  });

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
            {/* Page Header */}
            <div>
              <h1 className="text-2xl font-bold">Mes commandes</h1>
              <p className="text-muted-foreground">Retrouvez l'historique de toutes vos commandes</p>
            </div>

            {/* Filters & Search */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher par numéro de commande..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-full sm:w-[160px]">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="Année" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Orders Table/List */}
            {filteredOrders.length > 0 ? (
              <Card className="py-0 rounded-2xl">
                <CardContent className="p-0">
                  {/* Table Header - Desktop */}
                  <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b text-sm font-medium text-muted-foreground">
                    <div className="col-span-4">Commande</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Statut</div>
                    <div className="col-span-2 text-right">Montant</div>
                    <div className="col-span-2 text-right">Actions</div>
                  </div>

                  {/* Orders */}
                  <div className="divide-y">
                    {filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-slate-50/50 transition-colors"
                      >
                        {/* Order ID */}
                        <div className="md:col-span-4">
                          <Link
                            href={`/account/orders/${order.id}`}
                            className="font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            {order.id}
                          </Link>
                          <p className="text-sm text-muted-foreground md:hidden mt-1">
                            {order.date}
                          </p>
                        </div>

                        {/* Date - Desktop */}
                        <div className="hidden md:block md:col-span-2 text-sm text-muted-foreground">
                          {order.date}
                        </div>

                        {/* Status */}
                        <div className="md:col-span-2">
                          {order.status === "completed" ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                              Terminée
                            </Badge>
                          ) : order.status === "refunded" ? (
                            <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100">
                              Remboursée
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                              En cours
                            </Badge>
                          )}
                        </div>

                        {/* Amount */}
                        <div className="md:col-span-2 md:text-right">
                          <span className="font-semibold text-lg">{formatPrice(order.total)}</span>
                        </div>

                        {/* Actions */}
                        <div className="md:col-span-2 flex items-center gap-2 md:justify-end">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Reçu Stripe">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Télécharger">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/account/orders/${order.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Aucune commande trouvée</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery
                      ? "Modifiez vos critères de recherche"
                      : "Vous n'avez pas encore de commande"}
                  </p>
                  <Button asChild>
                    <Link href="/categories">Découvrir nos solutions</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Results count */}
            {filteredOrders.length > 0 && (
              <p className="text-sm text-muted-foreground text-center">
                {filteredOrders.length} commande{filteredOrders.length > 1 ? "s" : ""}
              </p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
