"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Save,
  Plus,
  Trash2,
  Upload,
  GripVertical,
  Image as ImageIcon,
  Type,
  Grid3X3,
  Star,
} from "lucide-react";

// Mock carousel slides
const carouselSlides = [
  {
    id: "1",
    title: "Protection SOC 24/7",
    subtitle: "Surveillance continue de votre infrastructure",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80",
    link: "/categories/soc",
  },
  {
    id: "2",
    title: "Solutions EDR",
    subtitle: "Protection endpoint nouvelle generation",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    link: "/categories/protection",
  },
  {
    id: "3",
    title: "Audit de Securite",
    subtitle: "Identifiez vos vulnerabilites",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    link: "/categories/audit",
  },
];

// Mock categories
const featuredCategories = [
  { id: "1", name: "SOC", image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&q=80" },
  { id: "2", name: "Protection", image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80" },
  { id: "3", name: "Audit", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80" },
  { id: "4", name: "Intelligence", image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=400&q=80" },
];

// Mock top products
const topProducts = [
  { id: "1", name: "SOC Premium 24/7", price: 2499 },
  { id: "2", name: "EDR Enterprise", price: 899 },
  { id: "3", name: "Threat Intelligence", price: 599 },
  { id: "4", name: "Vulnerability Scanner", price: 799 },
  { id: "5", name: "SIEM Cloud", price: 1499 },
  { id: "6", name: "Pentesting Service", price: 3999 },
];

export default function AdminContentPage() {
  const [heroText, setHeroText] = useState(
    "Protegez votre entreprise avec nos solutions de cybersecurite de pointe. Surveillance 24/7, detection avancee des menaces et reponse immediate aux incidents."
  );

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gestion du contenu</h1>
          <p className="text-muted-foreground">Personnalisez le contenu de la page d'accueil</p>
        </div>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Enregistrer tout
        </Button>
      </div>

      <Tabs defaultValue="carousel" className="space-y-6">
        <TabsList className="w-full h-auto p-1 bg-white border border-slate-200 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-1">
          <TabsTrigger
            value="carousel"
            className="flex flex-col items-center gap-1 py-3 px-4 rounded-lg data-[state=active]:bg-slate-900 data-[state=active]:text-white"
          >
            <ImageIcon className="h-5 w-5" />
            <span className="text-xs font-medium">Carrousel</span>
          </TabsTrigger>
          <TabsTrigger
            value="text"
            className="flex flex-col items-center gap-1 py-3 px-4 rounded-lg data-[state=active]:bg-slate-900 data-[state=active]:text-white"
          >
            <Type className="h-5 w-5" />
            <span className="text-xs font-medium">Texte</span>
          </TabsTrigger>
          <TabsTrigger
            value="categories"
            className="flex flex-col items-center gap-1 py-3 px-4 rounded-lg data-[state=active]:bg-slate-900 data-[state=active]:text-white"
          >
            <Grid3X3 className="h-5 w-5" />
            <span className="text-xs font-medium">Categories</span>
          </TabsTrigger>
          <TabsTrigger
            value="products"
            className="flex flex-col items-center gap-1 py-3 px-4 rounded-lg data-[state=active]:bg-slate-900 data-[state=active]:text-white"
          >
            <Star className="h-5 w-5" />
            <span className="text-xs font-medium">Top Produits</span>
          </TabsTrigger>
        </TabsList>

        {/* Carousel Tab */}
        <TabsContent value="carousel" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Slides du carrousel</CardTitle>
                <CardDescription>
                  Gerez les slides affichees sur la page d'accueil (max 5)
                </CardDescription>
              </div>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {carouselSlides.map((slide) => (
                  <div
                    key={slide.id}
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl"
                  >
                    <Button variant="ghost" size="icon" className="cursor-grab">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Input defaultValue={slide.title} className="mb-2" placeholder="Titre" />
                      <Input defaultValue={slide.subtitle} placeholder="Sous-titre" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Text Tab */}
        <TabsContent value="text" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Texte de presentation</CardTitle>
              <CardDescription>
                Ce texte apparait sous le carrousel principal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Contenu</Label>
                  <Textarea
                    value={heroText}
                    onChange={(e) => setHeroText(e.target.value)}
                    rows={4}
                    placeholder="Texte de presentation..."
                  />
                  <p className="text-xs text-muted-foreground">
                    {heroText.length} caracteres
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Categories mises en avant</CardTitle>
                <CardDescription>
                  Selectionnez les categories a afficher sur la page d'accueil
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {featuredCategories.map((cat) => (
                  <div
                    key={cat.id}
                    className="relative aspect-square rounded-xl overflow-hidden bg-muted group cursor-pointer"
                  >
                    <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <p className="text-white font-semibold">{cat.name}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <button className="aspect-square rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                  <Plus className="h-6 w-6" />
                  <span className="text-sm">Ajouter</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Top produits</CardTitle>
                <CardDescription>
                  Produits mis en avant sur la page d'accueil (max 6)
                </CardDescription>
              </div>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg"
                  >
                    <Button variant="ghost" size="icon" className="cursor-grab">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(product.price)}/mois
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}