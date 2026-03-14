import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroCarousel, type HeroSlide } from "@/components/home";
import { ProductCard, CategoryCard, type Product, type Category } from "@/components/products";
import { Shield, Lock, Eye, Zap, ArrowRight } from "lucide-react";

// Mock data - à remplacer par de vraies données depuis le back-office
const heroSlides: HeroSlide[] = [
  {
    id: "1",
    title: "Protégez votre entreprise avec nos solutions SOC",
    subtitle: "Nouveau",
    description:
      "Surveillance 24/7 de votre infrastructure avec notre équipe d'experts en cybersécurité. Détection et réponse aux menaces en temps réel.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80",
    ctaText: "Découvrir SOC",
    ctaLink: "/categories/soc",
  },
  {
    id: "2",
    title: "EDR nouvelle génération pour une protection totale",
    subtitle: "Populaire",
    description:
      "Endpoint Detection and Response avancé pour protéger tous vos terminaux contre les menaces les plus sophistiquées.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80",
    ctaText: "Explorer EDR",
    ctaLink: "/categories/edr",
  },
  {
    id: "3",
    title: "XDR : Visibilité unifiée sur toute votre infrastructure",
    subtitle: "Enterprise",
    description:
      "Extended Detection and Response pour une corrélation intelligente des menaces à travers tous vos systèmes.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80",
    ctaText: "Voir XDR",
    ctaLink: "/categories/xdr",
  },
];

const categories: Category[] = [
  {
    id: "1",
    name: "SOC as a Service",
    description: "Centre opérationnel de sécurité externalisé avec surveillance 24/7",
    image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&q=80",
    slug: "soc",
    productCount: 4,
  },
  {
    id: "2",
    name: "EDR Solutions",
    description: "Protection avancée des endpoints avec détection et réponse automatisées",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    slug: "edr",
    productCount: 6,
  },
  {
    id: "3",
    name: "XDR Platform",
    description: "Détection et réponse étendues pour une visibilité complète",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
    slug: "xdr",
    productCount: 3,
  },
  {
    id: "4",
    name: "Threat Intelligence",
    description: "Renseignement sur les menaces pour anticiper les attaques",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&q=80",
    slug: "threat-intelligence",
    productCount: 5,
  },
];

const topProducts: Product[] = [
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
    name: "EDR Enterprise",
    description: "Protection endpoint avancée avec IA pour détecter les menaces zero-day.",
    price: { monthly: 899, yearly: 8990 },
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    category: "EDR Solutions",
    isAvailable: true,
  },
  {
    id: "3",
    name: "XDR Complete",
    description: "Solution XDR complète pour une visibilité unifiée sur toute votre infrastructure.",
    price: { monthly: 3499, yearly: 34990 },
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    category: "XDR Platform",
    isAvailable: true,
    isNew: true,
  },
  {
    id: "4",
    name: "Threat Intel Pro",
    description: "Flux de renseignements sur les menaces en temps réel pour votre SOC.",
    price: { monthly: 599, yearly: 5990 },
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    category: "Threat Intelligence",
    isAvailable: false,
  },
];

const features = [
  {
    icon: Shield,
    title: "Protection 24/7",
    description: "Surveillance continue de votre infrastructure par nos experts",
  },
  {
    icon: Lock,
    title: "Conformité garantie",
    description: "Solutions conformes aux normes ISO 27001 et RGPD",
  },
  {
    icon: Eye,
    title: "Visibilité totale",
    description: "Dashboard temps réel sur l'état de votre sécurité",
  },
  {
    icon: Zap,
    title: "Réponse rapide",
    description: "Temps de réponse moyen inférieur à 15 minutes",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Carousel */}
      <section>
        <HeroCarousel slides={heroSlides} />
      </section>

      {/* Value Proposition */}
      <section className="py-12 md:py-16 bg-slate-900 text-white">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Pourquoi choisir <span className="text-primary">Cyna-IT</span> ?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Leader français des solutions de cybersécurité SaaS, nous protégeons
              plus de 500 entreprises à travers le monde.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 text-center text-slate-900 shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Nos Solutions</h2>
              <p className="text-muted-foreground mt-1">
                Découvrez notre gamme complète de services de cybersécurité
              </p>
            </div>
            <Button variant="outline" asChild className="hidden md:flex gap-2">
              <Link href="/categories">
                Voir tout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Button variant="outline" asChild className="gap-2">
              <Link href="/categories">
                Voir toutes les catégories
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Top Products */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Produits Populaires</h2>
              <p className="text-muted-foreground mt-1">
                Les solutions les plus adoptées par nos clients
              </p>
            </div>
            <Button variant="outline" asChild className="hidden md:flex gap-2">
              <Link href="/search">
                Voir tout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {topProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Button variant="outline" asChild className="gap-2">
              <Link href="/search">
                Voir tous les produits
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Prêt à sécuriser votre entreprise ?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Rejoignez les 500+ entreprises qui font confiance à Cyna-IT pour leur cybersécurité.
            Commencez votre essai gratuit dès aujourd&apos;hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/register">Créer un compte</Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="bg-white/10 text-white border border-white/30 hover:bg-white/20"
            >
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
