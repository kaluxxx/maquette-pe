"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Mock products data
const products = [
  {
    id: "1",
    name: "SOC Premium 24/7",
    category: "SOC",
    priceMonthly: 2499,
    priceYearly: 24990,
    available: true,
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=100&q=80",
    priority: 1,
  },
  {
    id: "2",
    name: "EDR Enterprise",
    category: "Protection",
    priceMonthly: 899,
    priceYearly: 8990,
    available: true,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=100&q=80",
    priority: 2,
  },
  {
    id: "3",
    name: "Threat Intelligence Basic",
    category: "Intelligence",
    priceMonthly: 599,
    priceYearly: 5990,
    available: true,
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=100&q=80",
    priority: 3,
  },
  {
    id: "4",
    name: "Vulnerability Scanner Pro",
    category: "Audit",
    priceMonthly: 799,
    priceYearly: 7990,
    available: false,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&q=80",
    priority: 4,
  },
  {
    id: "5",
    name: "SIEM Cloud",
    category: "Monitoring",
    priceMonthly: 1499,
    priceYearly: 14990,
    available: true,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&q=80",
    priority: 5,
  },
  {
    id: "6",
    name: "Pentesting as a Service",
    category: "Audit",
    priceMonthly: 3999,
    priceYearly: 39990,
    available: true,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&q=80",
    priority: 6,
  },
];

export default function AdminProductsPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((p) => p.id));
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Produits</h1>
          <p className="text-muted-foreground">{products.length} produits au catalogue</p>
        </div>
        <Button className="gap-2" asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4" />
            Ajouter un produit
          </Link>
        </Button>
      </div>

      {/* Search & Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {selectedProducts.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Supprimer ({selectedProducts.length})
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Supprimer les produits ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action est irréversible. {selectedProducts.length} produit(s)
                      seront définitivement supprimés.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                      Supprimer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="py-0 overflow-hidden">
        <CardContent className="p-0">
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b text-sm font-medium text-muted-foreground">
            <div className="col-span-1 flex items-center">
              <Checkbox
                checked={selectedProducts.length === products.length}
                onCheckedChange={toggleAll}
              />
            </div>
            <div className="col-span-4">Produit</div>
            <div className="col-span-2">Catégorie</div>
            <div className="col-span-2">Prix mensuel</div>
            <div className="col-span-1">Statut</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50/50 transition-colors"
              >
                {/* Checkbox */}
                <div className="hidden md:flex md:col-span-1 items-center">
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => toggleProduct(product.id)}
                  />
                </div>

                {/* Product Info */}
                <div className="md:col-span-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-muted-foreground md:hidden">
                        {product.category}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="hidden md:block md:col-span-2">
                  <Badge variant="secondary">{product.category}</Badge>
                </div>

                {/* Price */}
                <div className="md:col-span-2">
                  <p className="font-semibold">{formatPrice(product.priceMonthly)}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatPrice(product.priceYearly)}/an
                  </p>
                </div>

                {/* Status */}
                <div className="md:col-span-1">
                  {product.available ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Actif
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Inactif</Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="md:col-span-2 flex items-center gap-2 justify-end">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                    <Link href={`/products/${product.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                    <Link href={`/admin/products/${product.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/products/${product.id}`}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Modifier
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/products/${product.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Voir sur le site
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <p className="text-sm text-muted-foreground">
              Affichage 1-{filteredProducts.length} sur {filteredProducts.length}
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