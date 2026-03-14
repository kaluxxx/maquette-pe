"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import {
  Save,
  Trash2,
  Plus,
  X,
  Upload,
  GripVertical,
  Package,
  Clock,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Categories initiales
const initialCategories: ComboboxOption[] = [
  { value: "soc", label: "SOC" },
  { value: "protection", label: "Protection" },
  { value: "intelligence", label: "Intelligence" },
  { value: "audit", label: "Audit" },
  { value: "monitoring", label: "Monitoring" },
];

// Caractéristiques disponibles
const initialFeatureTypes: ComboboxOption[] = [
  { value: "surveillance", label: "Surveillance" },
  { value: "temps_reponse", label: "Temps de réponse" },
  { value: "rapports", label: "Rapports" },
  { value: "support", label: "Support" },
  { value: "sla", label: "SLA" },
  { value: "stockage", label: "Stockage" },
  { value: "utilisateurs", label: "Utilisateurs" },
  { value: "integrations", label: "Intégrations" },
];

// Mock product data (for edit mode)
const productData = {
  id: "1",
  name: "SOC Premium 24/7",
  shortDescription: "Surveillance complète avec intervention immédiate",
  longDescription: "Notre service SOC Premium offre une surveillance 24h/24, 7j/7 de votre infrastructure par nos experts en cybersécurité. Bénéficiez d'une détection proactive des menaces, d'une réponse rapide aux incidents et de rapports détaillés sur l'état de votre sécurité.",
  category: "soc",
  priceMonthly: 2499,
  priceYearly: 24990,
  available: true,
  priority: 1,
  images: [
    "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80",
  ],
  features: [
    { key: "Surveillance", value: "24/7" },
    { key: "Temps de réponse", value: "< 15 minutes" },
    { key: "Rapports", value: "Hebdomadaires" },
    { key: "Support", value: "Dédié" },
  ],
};

export default function AdminProductEditPage() {
  const [isAvailable, setIsAvailable] = useState(productData.available);
  const [features, setFeatures] = useState(productData.features);
  const [categories, setCategories] = useState<ComboboxOption[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(productData.category);
  const [featureTypes, setFeatureTypes] = useState<ComboboxOption[]>(initialFeatureTypes);
  const [images, setImages] = useState<string[]>(productData.images);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const addFeature = () => {
    setFeatures([...features, { key: "", value: "" }]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const updateFeatureKey = (index: number, key: string) => {
    const newFeatures = [...features];
    newFeatures[index].key = key;
    setFeatures(newFeatures);
  };

  const updateFeatureValue = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index].value = value;
    setFeatures(newFeatures);
  };

  const handleCreateCategory = (label: string) => {
    const newCategory = { value: label.toLowerCase().replace(/\s+/g, "_"), label };
    setCategories([...categories, newCategory]);
    setSelectedCategory(newCategory.value);
  };

  const handleCreateFeatureType = (label: string, index: number) => {
    const newFeatureType = { value: label.toLowerCase().replace(/\s+/g, "_"), label };
    setFeatureTypes([...featureTypes, newFeatureType]);
    updateFeatureKey(index, label);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addImage = () => {
    // Simulation d'ajout d'image avec une URL placeholder
    const placeholderImages = [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&q=80",
    ];
    const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    setImages([...images, randomImage]);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);
    setImages(newImages);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin/products">Produits</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{productData.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8 pb-6 border-b">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Modifier le produit</h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>Dernière modification : il y a 2 jours</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
            <Trash2 className="h-4 w-4" />
            Supprimer
          </Button>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du produit</Label>
                <Input id="name" defaultValue={productData.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shortDesc">Description courte</Label>
                <Input id="shortDesc" defaultValue={productData.shortDescription} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longDesc">Description complète</Label>
                <Textarea
                  id="longDesc"
                  defaultValue={productData.longDescription}
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Images</CardTitle>
              <CardDescription>
                Glissez pour réorganiser. La première image sera l'image principale.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div
                    key={image}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`relative aspect-square rounded-xl overflow-hidden bg-muted group cursor-grab active:cursor-grabbing ${
                      draggedIndex === index ? "opacity-50 ring-2 ring-primary" : ""
                    }`}
                  >
                    <Image src={image} alt={`Image ${index + 1}`} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="icon" variant="secondary" className="h-8 w-8 cursor-grab">
                        <GripVertical className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8"
                        onClick={() => removeImage(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {index === 0 && (
                      <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                        Principale
                      </span>
                    )}
                  </div>
                ))}
                <button
                  onClick={addImage}
                  className="aspect-square rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <Upload className="h-6 w-6" />
                  <span className="text-sm">Ajouter</span>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Caractéristiques</CardTitle>
                <CardDescription>
                  Sélectionnez une caractéristique et définissez sa valeur
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-2" onClick={addFeature}>
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-1">
                      <Combobox
                        options={featureTypes}
                        value={featureTypes.find(ft => ft.label === feature.key)?.value || ""}
                        onChange={(value) => {
                          const selected = featureTypes.find(ft => ft.value === value);
                          if (selected) updateFeatureKey(index, selected.label);
                        }}
                        onCreateNew={(label) => handleCreateFeatureType(label, index)}
                        placeholder="Caractéristique"
                        searchPlaceholder="Rechercher..."
                        createLabel="Créer"
                        emptyMessage="Aucune caractéristique."
                      />
                    </div>
                    <Input
                      placeholder="Valeur"
                      value={feature.value}
                      onChange={(e) => updateFeatureValue(index, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                      onClick={() => removeFeature(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-6">
          {/* Status */}
          <Card className={isAvailable ? "bg-green-50 border-green-200" : "bg-slate-50 border-slate-200"}>
            <CardHeader>
              <CardTitle className="text-lg">Statut</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Disponible à la vente</p>
                  <p className={`text-sm ${isAvailable ? "text-green-600" : "text-muted-foreground"}`}>
                    {isAvailable ? "Le produit est visible" : "Le produit est masqué"}
                  </p>
                </div>
                <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
              </div>
            </CardContent>
          </Card>

          {/* Category */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <Combobox
                options={categories}
                value={selectedCategory}
                onChange={setSelectedCategory}
                onCreateNew={handleCreateCategory}
                placeholder="Sélectionner une catégorie"
                searchPlaceholder="Rechercher une catégorie..."
                createLabel="Créer"
                emptyMessage="Aucune catégorie trouvée."
              />
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tarification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="priceMonthly">Prix mensuel (EUR)</Label>
                <Input
                  id="priceMonthly"
                  type="number"
                  defaultValue={productData.priceMonthly}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceYearly">Prix annuel (EUR)</Label>
                <Input
                  id="priceYearly"
                  type="number"
                  defaultValue={productData.priceYearly}
                />
              </div>
            </CardContent>
          </Card>

          {/* Priority */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Affichage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="priority">Priorite d'affichage</Label>
                <Input
                  id="priority"
                  type="number"
                  defaultValue={productData.priority}
                  min={1}
                />
                <p className="text-xs text-muted-foreground">
                  Plus le chiffre est bas, plus le produit apparait en premier
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}