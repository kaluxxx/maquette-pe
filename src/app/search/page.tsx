"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductCard, type Product } from "@/components/products";
import {
  Search,
  SlidersHorizontal,
  X,
  Grid3X3,
  List,
  SearchX,
} from "lucide-react";

// Mock products data
const allProducts: Product[] = [
  {
    id: "1",
    name: "SOC Premium 24/7",
    description: "Surveillance complète avec intervention immédiate",
    price: { monthly: 2499, yearly: 24990 },
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80",
    category: "SOC as a Service",
    isAvailable: true,
    isNew: true,
  },
  {
    id: "2",
    name: "SOC Standard",
    description: "Surveillance de base avec alertes et rapports hebdomadaires",
    price: { monthly: 999, yearly: 9990 },
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    category: "SOC as a Service",
    isAvailable: true,
  },
  {
    id: "3",
    name: "EDR Enterprise",
    description: "Protection endpoint avancée avec IA et réponse automatisée",
    price: { monthly: 899, yearly: 8990 },
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    category: "EDR Solutions",
    isAvailable: true,
  },
  {
    id: "4",
    name: "EDR Basic",
    description: "Protection endpoint essentielle pour PME",
    price: { monthly: 299, yearly: 2990 },
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    category: "EDR Solutions",
    isAvailable: false,
  },
  {
    id: "5",
    name: "XDR Complete",
    description: "Visibilité unifiée sur toute votre infrastructure",
    price: { monthly: 3499, yearly: 34990 },
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    category: "XDR Platform",
    isAvailable: true,
    isNew: true,
  },
  {
    id: "6",
    name: "Threat Intel Pro",
    description: "Flux de renseignements sur les menaces en temps réel",
    price: { monthly: 599, yearly: 5990 },
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&q=80",
    category: "Threat Intelligence",
    isAvailable: true,
  },
  {
    id: "7",
    name: "Pentest as a Service",
    description: "Tests d'intrusion continus par des experts certifiés",
    price: { monthly: 1999, yearly: 19990 },
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
    category: "Audit & Pentest",
    isAvailable: true,
  },
  {
    id: "8",
    name: "Formation Cybersécurité",
    description: "Sensibilisation et formation de vos équipes",
    price: { monthly: 199, yearly: 1990 },
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    category: "Formation",
    isAvailable: true,
  },
];

const categories = [
  "SOC as a Service",
  "EDR Solutions",
  "XDR Platform",
  "Threat Intelligence",
  "Audit & Pentest",
  "Formation",
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesDescription = product.description.toLowerCase().includes(query);
      const matchesCategory = product.category.toLowerCase().includes(query);
      if (!matchesName && !matchesDescription && !matchesCategory) return false;
    }

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }

    // Price filter
    if (priceRange.min && product.price.monthly < parseInt(priceRange.min)) {
      return false;
    }
    if (priceRange.max && product.price.monthly > parseInt(priceRange.max)) {
      return false;
    }

    // Availability filter
    if (showAvailableOnly && !product.isAvailable) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price.monthly - b.price.monthly;
      case "price-desc":
        return b.price.monthly - a.price.monthly;
      case "name":
        return a.name.localeCompare(b.name);
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return 0;
    }
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: "", max: "" });
    setShowAvailableOnly(false);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    priceRange.min ||
    priceRange.max ||
    showAvailableOnly;

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Catégories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Prix mensuel</h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            className="w-full"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            className="w-full"
          />
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div>
        <h3 className="font-semibold mb-3">Disponibilité</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="available"
            checked={showAvailableOnly}
            onCheckedChange={(checked) => setShowAvailableOnly(checked as boolean)}
          />
          <Label htmlFor="available" className="text-sm cursor-pointer">
            Disponible uniquement
          </Label>
        </div>
      </div>

      {hasActiveFilters && (
        <>
          <Separator />
          <Button variant="outline" className="w-full" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Effacer les filtres
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-slate-900 text-white py-12">
        <div className="container">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/10">
            <Search className="h-3 w-3 mr-1" />
            Recherche
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Trouvez votre solution
          </h1>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Rechercher une solution, catégorie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-white text-slate-900 border-0 rounded-xl"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="font-semibold text-lg mb-4">Filtres</h2>
                <FiltersContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <p className="text-muted-foreground">
                    {sortedProducts.length} résultat{sortedProducts.length > 1 ? "s" : ""}
                    {searchQuery && (
                      <span>
                        {" "}pour "<span className="text-foreground font-medium">{searchQuery}</span>"
                      </span>
                    )}
                  </p>

                  {/* Active filters badges */}
                  {hasActiveFilters && (
                    <div className="hidden sm:flex items-center gap-2">
                      {selectedCategories.map((cat) => (
                        <Badge
                          key={cat}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => toggleCategory(cat)}
                        >
                          {cat}
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Mobile Filters */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden gap-2">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filtres
                        {hasActiveFilters && (
                          <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                            {selectedCategories.length + (showAvailableOnly ? 1 : 0)}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Filtres</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FiltersContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Pertinence</SelectItem>
                      <SelectItem value="price-asc">Prix croissant</SelectItem>
                      <SelectItem value="price-desc">Prix décroissant</SelectItem>
                      <SelectItem value="name">Nom A-Z</SelectItem>
                      <SelectItem value="newest">Nouveautés</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode */}
                  <div className="hidden sm:flex items-center border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="icon"
                      className="rounded-r-none"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "secondary" : "ghost"}
                      size="icon"
                      className="rounded-l-none"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results Grid */}
              {sortedProducts.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                >
                  {sortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      variant={viewMode === "list" ? "default" : "default"}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
                      <SearchX className="h-10 w-10 text-slate-400" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Aucun résultat</h2>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Nous n'avons trouvé aucune solution correspondant à vos critères.
                    Essayez de modifier vos filtres ou votre recherche.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {hasActiveFilters && (
                      <Button variant="outline" onClick={clearFilters}>
                        Effacer les filtres
                      </Button>
                    )}
                    <Button asChild>
                      <Link href="/categories">Voir toutes les solutions</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
