"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Mail,
  Calendar,
  ShoppingCart,
} from "lucide-react";

// Mock users data
const users = [
  {
    id: "1",
    name: "Marie Martin",
    email: "m.martin@company.fr",
    company: "TechCorp SAS",
    registeredAt: "8 janvier 2024",
    ordersCount: 3,
    totalSpent: 12497,
  },
  {
    id: "2",
    name: "Pierre Durand",
    email: "p.durand@tech.com",
    company: "StartupIO",
    registeredAt: "5 janvier 2024",
    ordersCount: 1,
    totalSpent: 8990,
  },
  {
    id: "3",
    name: "Sophie Bernard",
    email: "s.bernard@corp.fr",
    company: "Corp France",
    registeredAt: "3 janvier 2024",
    ordersCount: 2,
    totalSpent: 5998,
  },
  {
    id: "4",
    name: "Luc Petit",
    email: "l.petit@startup.io",
    company: "Startup.io",
    registeredAt: "1 janvier 2024",
    ordersCount: 1,
    totalSpent: 2499,
  },
  {
    id: "5",
    name: "Emma Leroy",
    email: "e.leroy@enterprise.com",
    company: "Enterprise Solutions",
    registeredAt: "28 decembre 2023",
    ordersCount: 5,
    totalSpent: 45890,
  },
  {
    id: "6",
    name: "Thomas Moreau",
    email: "t.moreau@agency.fr",
    company: "Digital Agency",
    registeredAt: "20 decembre 2023",
    ordersCount: 2,
    totalSpent: 4998,
  },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Utilisateurs</h1>
          <p className="text-muted-foreground">{users.length} utilisateurs inscrits</p>
        </div>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, email ou entreprise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="py-0 overflow-hidden">
        <CardContent className="p-0">
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b text-sm font-medium text-muted-foreground">
            <div className="col-span-4">Utilisateur</div>
            <div className="col-span-2">Entreprise</div>
            <div className="col-span-2">Inscription</div>
            <div className="col-span-1">Commandes</div>
            <div className="col-span-2 text-right">Total depense</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50/50 transition-colors"
              >
                {/* User Info */}
                <div className="md:col-span-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Company */}
                <div className="hidden md:block md:col-span-2">
                  <p className="text-sm">{user.company}</p>
                </div>

                {/* Registration Date */}
                <div className="hidden md:flex md:col-span-2 items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {user.registeredAt}
                </div>

                {/* Orders Count */}
                <div className="md:col-span-1">
                  <Badge variant="secondary" className="gap-1">
                    <ShoppingCart className="h-3 w-3" />
                    {user.ordersCount}
                  </Badge>
                </div>

                {/* Total Spent */}
                <div className="md:col-span-2 md:text-right">
                  <p className="font-semibold">{formatPrice(user.totalSpent)}</p>
                </div>

                {/* Actions */}
                <div className="md:col-span-1 flex justify-end">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/users/${user.id}`}>
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
              Affichage 1-{filteredUsers.length} sur {filteredUsers.length}
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