"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";

// Mock orders data
const orders = [
  {
    id: "CYN-2024-001256",
    customer: "Marie Martin",
    email: "m.martin@company.fr",
    date: "8 janvier 2024",
    total: 2499,
    status: "completed",
    items: 1,
  },
  {
    id: "CYN-2024-001255",
    customer: "Pierre Durand",
    email: "p.durand@tech.com",
    date: "8 janvier 2024",
    total: 8990,
    status: "pending",
    items: 2,
  },
  {
    id: "CYN-2024-001254",
    customer: "Sophie Bernard",
    email: "s.bernard@corp.fr",
    date: "7 janvier 2024",
    total: 599,
    status: "completed",
    items: 1,
  },
  {
    id: "CYN-2024-001253",
    customer: "Luc Petit",
    email: "l.petit@startup.io",
    date: "7 janvier 2024",
    total: 2499,
    status: "completed",
    items: 1,
  },
  {
    id: "CYN-2024-001252",
    customer: "Emma Leroy",
    email: "e.leroy@enterprise.com",
    date: "6 janvier 2024",
    total: 24990,
    status: "completed",
    items: 3,
  },
  {
    id: "CYN-2024-001251",
    customer: "Thomas Moreau",
    email: "t.moreau@agency.fr",
    date: "6 janvier 2024",
    total: 1499,
    status: "refunded",
    items: 1,
  },
];

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Terminee</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">En attente</Badge>;
      case "refunded":
        return <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100">Remboursee</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Commandes</h1>
          <p className="text-muted-foreground">{orders.length} commandes au total</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exporter CSV
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par n commande, client ou email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="completed">Terminees</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="refunded">Remboursees</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="py-0 overflow-hidden">
        <CardContent className="p-0">
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b text-sm font-medium text-muted-foreground">
            <div className="col-span-3">Commande</div>
            <div className="col-span-3">Client</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1">Statut</div>
            <div className="col-span-2 text-right">Montant</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50/50 transition-colors"
              >
                {/* Order ID */}
                <div className="md:col-span-3">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-mono font-semibold hover:text-primary transition-colors"
                  >
                    {order.id}
                  </Link>
                  <p className="text-sm text-muted-foreground md:hidden">
                    {order.customer}
                  </p>
                </div>

                {/* Customer */}
                <div className="hidden md:block md:col-span-3">
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-sm text-muted-foreground truncate">{order.email}</p>
                </div>

                {/* Date */}
                <div className="hidden md:flex md:col-span-2 items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {order.date}
                </div>

                {/* Status */}
                <div className="md:col-span-1">
                  {getStatusBadge(order.status)}
                </div>

                {/* Amount */}
                <div className="md:col-span-2 md:text-right">
                  <p className="font-semibold">{formatPrice(order.total)}</p>
                  <p className="text-xs text-muted-foreground">{order.items} article(s)</p>
                </div>

                {/* Actions */}
                <div className="md:col-span-1 flex justify-end">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/orders/${order.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      Voir
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <p className="text-sm text-muted-foreground">
              Affichage 1-{filteredOrders.length} sur {filteredOrders.length}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" disabled>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}