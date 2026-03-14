import Image from "next/image";
import { ProductCard, type Product } from "@/components/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Mock data - à remplacer par de vraies données
const categoriesData: Record<string, { name: string; description: string; image: string }> = {
  soc: {
    name: "SOC as a Service",
    description: "Centre opérationnel de sécurité externalisé avec surveillance 24/7. Nos experts analysent en temps réel les menaces et incidents pour protéger votre infrastructure.",
    image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=1200&q=80",
  },
  edr: {
    name: "EDR Solutions",
    description: "Endpoint Detection and Response - Protection avancée de vos terminaux avec détection comportementale et réponse automatisée aux menaces.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
  },
  xdr: {
    name: "XDR Platform",
    description: "Extended Detection and Response - Visibilité unifiée sur l'ensemble de votre infrastructure avec corrélation intelligente des événements de sécurité.",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=80",
  },
  "threat-intelligence": {
    name: "Threat Intelligence",
    description: "Renseignement sur les menaces en temps réel. Anticipez les attaques grâce à nos flux de données et analyses d'experts.",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=1200&q=80",
  },
};

const mockProducts: Product[] = [
  {
    id: "1",
    name: "SOC Premium 24/7",
    description: "Surveillance complète de votre infrastructure avec intervention immédiate en cas d'incident.",
    price: { monthly: 2499, yearly: 24990 },
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80",
    category: "SOC as a Service",
    isAvailable: true,
    isNew: true,
  },
  {
    id: "2",
    name: "SOC Standard",
    description: "Surveillance de base avec alertes et rapports hebdomadaires.",
    price: { monthly: 999, yearly: 9990 },
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    category: "SOC as a Service",
    isAvailable: true,
  },
  {
    id: "3",
    name: "SOC Starter",
    description: "Solution d'entrée de gamme pour les petites structures.",
    price: { monthly: 499, yearly: 4990 },
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    category: "SOC as a Service",
    isAvailable: true,
  },
  {
    id: "4",
    name: "SOC Enterprise Plus",
    description: "Solution haut de gamme avec équipe dédiée et SLA garanti.",
    price: { monthly: 4999, yearly: 49990 },
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    category: "SOC as a Service",
    isAvailable: false,
  },
];

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoriesData[slug] || {
    name: "Catégorie",
    description: "Description de la catégorie",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
  };

  // Trier les produits : disponibles en premier
  const sortedProducts = [...mockProducts].sort((a, b) => {
    if (a.isAvailable === b.isAvailable) return 0;
    return a.isAvailable ? -1 : 1;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-50 md:h-75 overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-slate-300 hover:text-white">
                    Accueil
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-slate-500" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/categories" className="text-slate-300 hover:text-white">
                    Solutions
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-slate-500" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">{category.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
              {category.name}
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm md:text-base">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Products List */}
      <section className="py-8 md:py-12">
        <div className="container">
          {/* Filters & Sort */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <p className="text-muted-foreground">
              {sortedProducts.length} solution{sortedProducts.length > 1 ? "s" : ""} disponible{sortedProducts.length > 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-4">
              <Select defaultValue="priority">
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="priority">Priorité</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  <SelectItem value="newest">Nouveautés</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid - List on mobile, Grid on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination placeholder */}
          <div className="mt-8 flex justify-center">
            <p className="text-sm text-muted-foreground">
              Page 1 sur 1
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoriesData[slug];

  return {
    title: category?.name || "Catégorie",
    description: category?.description || "Découvrez nos solutions de cybersécurité",
  };
}
