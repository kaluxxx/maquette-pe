"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductCard, type Product } from "@/components/products";
import {
  ShoppingCart,
  Check,
  Shield,
  Clock,
  Headphones,
  Server,
  Award,
  Users,
  TrendingUp,
  AlertTriangle,
  Eye,
  Lock,
  FileCheck,
  Zap,
  Globe,
  BarChart3,
} from "lucide-react";

// Mock data - Solution SOC détaillée
const productData = {
  id: "1",
  name: "SOC Premium 24/7",
  tagline: "Protection maximale pour votre entreprise",
  description: `Notre solution SOC Premium offre une surveillance complète de votre infrastructure 24 heures sur 24, 7 jours sur 7.

Une équipe d'experts en cybersécurité analyse en temps réel tous les événements de sécurité et intervient immédiatement en cas d'incident.

Bénéficiez d'une protection proactive contre les menaces les plus sophistiquées grâce à notre plateforme de détection basée sur l'intelligence artificielle.`,
  price: { monthly: 2499, yearly: 24990 },
  image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&q=80",
  category: "SOC as a Service",
  categorySlug: "soc",
  isAvailable: true,
  isNew: true,

  // Métriques clés
  metrics: [
    { icon: Clock, value: "< 15 min", label: "Temps de réponse" },
    { icon: Eye, value: "24/7/365", label: "Surveillance continue" },
    { icon: Server, value: "Illimité", label: "Assets couverts" },
    { icon: TrendingUp, value: "99.9%", label: "SLA garantie" },
  ],

  // Fonctionnalités détaillées
  features: [
    {
      icon: Eye,
      title: "Surveillance continue",
      description: "Monitoring 24/7/365 de tous vos systèmes et réseaux par nos analystes SOC certifiés.",
    },
    {
      icon: AlertTriangle,
      title: "Détection avancée",
      description: "Détection comportementale et corrélation des événements grâce à notre SIEM nouvelle génération.",
    },
    {
      icon: Zap,
      title: "Réponse rapide",
      description: "Intervention immédiate en cas d'incident avec un temps de réponse garanti < 15 minutes.",
    },
    {
      icon: BarChart3,
      title: "Rapports détaillés",
      description: "Tableaux de bord temps réel et rapports mensuels pour suivre l'état de votre sécurité.",
    },
    {
      icon: Globe,
      title: "Threat Intelligence",
      description: "Flux de renseignements sur les menaces en temps réel pour anticiper les attaques.",
    },
    {
      icon: Lock,
      title: "Conformité",
      description: "Rapports conformes ISO 27001, RGPD, NIS2 et autres réglementations sectorielles.",
    },
  ],

  // Spécifications techniques
  specifications: [
    { label: "Temps de réponse SLA", value: "< 15 minutes (critique) / < 1h (majeur)" },
    { label: "Couverture horaire", value: "24 heures / 7 jours / 365 jours" },
    { label: "Assets surveillés", value: "Illimité (serveurs, endpoints, réseau)" },
    { label: "Rétention des logs", value: "12 mois (extensible à 36 mois)" },
    { label: "Intégrations", value: "SIEM, EDR, Firewall, Cloud (AWS, Azure, GCP)" },
    { label: "Conformité", value: "ISO 27001, SOC 2 Type II, RGPD, NIS2" },
    { label: "Support", value: "Téléphone + Email + Chat (priorité haute)" },
    { label: "Onboarding", value: "2 semaines avec accompagnement dédié" },
  ],

  // Certifications
  certifications: [
    { name: "ISO 27001", icon: Award },
    { name: "SOC 2", icon: FileCheck },
    { name: "RGPD", icon: Shield },
  ],

  // Statistiques de confiance
  trustStats: [
    { value: "500+", label: "Entreprises protégées" },
    { value: "99.9%", label: "Satisfaction client" },
    { value: "0", label: "Incidents majeurs non détectés" },
  ],
};

const similarProducts: Product[] = [
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
    name: "EDR Enterprise",
    description: "Protection endpoint avancée avec IA.",
    price: { monthly: 899, yearly: 8990 },
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    category: "EDR Solutions",
    isAvailable: true,
  },
  {
    id: "4",
    name: "XDR Complete",
    description: "Visibilité unifiée sur toute votre infrastructure.",
    price: { monthly: 3499, yearly: 34990 },
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    category: "XDR Platform",
    isAvailable: true,
    isNew: true,
  },
  {
    id: "5",
    name: "Threat Intel Pro",
    description: "Flux de renseignements sur les menaces.",
    price: { monthly: 599, yearly: 5990 },
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&q=80",
    category: "Threat Intelligence",
    isAvailable: true,
  },
  {
    id: "6",
    name: "SOC Starter",
    description: "Solution d'entrée de gamme.",
    price: { monthly: 499, yearly: 4990 },
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
    category: "SOC as a Service",
    isAvailable: true,
  },
  {
    id: "7",
    name: "EDR Basic",
    description: "Protection endpoint essentielle.",
    price: { monthly: 299, yearly: 2990 },
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    category: "EDR Solutions",
    isAvailable: false,
  },
];

export default function ProductPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const currentPrice = billingPeriod === "monthly"
    ? productData.price.monthly
    : productData.price.yearly;

  const monthlyEquivalent = billingPeriod === "yearly"
    ? Math.round(productData.price.yearly / 12)
    : productData.price.monthly;

  const savings = productData.price.monthly * 12 - productData.price.yearly;
  const savingsPercent = Math.round((savings / (productData.price.monthly * 12)) * 100);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={productData.image}
            alt={productData.name}
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/90 to-slate-900/70" />
        </div>

        {/* Content */}
        <div className="relative">
          {/* Breadcrumb */}
          <div className="border-b border-slate-700/50">
            <div className="container py-3">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="text-slate-400 hover:text-white">
                      Accueil
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-slate-600" />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={`/categories/${productData.categorySlug}`}
                      className="text-slate-400 hover:text-white"
                    >
                      {productData.category}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-slate-600" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-white">{productData.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="container py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left - Product Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  {productData.isNew && (
                    <Badge className="bg-primary text-primary-foreground">Nouveau</Badge>
                  )}
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    Disponible
                  </Badge>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                  {productData.name}
                </h1>

                <p className="text-xl text-primary mb-6">{productData.tagline}</p>

                {/* Métriques clés */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {productData.metrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <metric.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="text-xs text-slate-400">{metric.label}</p>
                    </div>
                  ))}
                </div>

                {/* Certifications */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm text-slate-400">Certifications :</span>
                  <div className="flex gap-2">
                    {productData.certifications.map((cert) => (
                      <Badge
                        key={cert.name}
                        variant="outline"
                        className="text-slate-300 border-slate-600"
                      >
                        <cert.icon className="h-3 w-3 mr-1" />
                        {cert.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right - Pricing Card */}
              <div className="lg:justify-self-end w-full max-w-md">
                <Card className="bg-white text-foreground shadow-2xl">
                  <CardHeader className="pb-4">
                    <div className="flex gap-2 mb-4">
                      <Button
                        variant={billingPeriod === "monthly" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setBillingPeriod("monthly")}
                        className="flex-1"
                      >
                        Mensuel
                      </Button>
                      <Button
                        variant={billingPeriod === "yearly" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setBillingPeriod("yearly")}
                        className="flex-1"
                      >
                        Annuel
                        <Badge className="ml-2 bg-green-100 text-green-700 hover:bg-green-100">
                          -{savingsPercent}%
                        </Badge>
                      </Button>
                    </div>

                    <div className="text-center">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-primary">
                          {formatPrice(monthlyEquivalent)}
                        </span>
                        <span className="text-muted-foreground">/mois</span>
                      </div>
                      {billingPeriod === "yearly" && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Facturé {formatPrice(currentPrice)}/an
                        </p>
                      )}
                      {billingPeriod === "yearly" && (
                        <p className="text-sm text-green-600 font-medium mt-1">
                          Économisez {formatPrice(savings)}/an
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Quick features */}
                    <div className="space-y-2">
                      {[
                        "Surveillance 24/7/365",
                        "Équipe SOC dédiée en France",
                        "Temps de réponse < 15 min",
                        "Assets illimités",
                        "Support prioritaire",
                      ].map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <Button size="lg" className="w-full gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      S&apos;abonner maintenant
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Sans engagement • Annulation à tout moment
                    </p>

                    <div className="flex items-center justify-center gap-4 pt-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Lock className="h-3 w-3" />
                        Paiement sécurisé
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Headphones className="h-3 w-3" />
                        Support inclus
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="border-b bg-muted/30">
        <div className="container py-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            {productData.trustStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
              Fonctionnalités
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tout ce qui est inclus
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Une solution complète pour protéger votre entreprise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productData.features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-[100px]" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-cyan-100 text-cyan-700 hover:bg-cyan-100">
                À propos
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Description détaillée
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                  {productData.description}
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-slate-900 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-semibold mb-6">Points clés</h3>
                <ul className="space-y-4">
                  {[
                    "Équipe SOC basée en France",
                    "Temps de réponse garanti par SLA",
                    "Intégration native avec vos outils",
                    "Rapports conformes aux normes",
                    "Support prioritaire 24/7",
                  ].map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-16 md:py-20 bg-slate-900 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/10">
              Technique
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Spécifications techniques
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Tous les détails techniques de notre solution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productData.specifications.map((spec, index) => (
              <div
                key={spec.label}
                className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <span className="text-slate-300">{spec.label}</span>
                <span className="font-semibold text-primary">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-amber-100 text-amber-700 hover:bg-amber-100">
                FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Questions fréquentes
              </h2>
              <p className="text-muted-foreground text-lg">
                Tout ce que vous devez savoir sur cette solution
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                {
                  q: "Comment se déroule la mise en place ?",
                  a: "L'onboarding dure environ 2 semaines. Un chef de projet dédié vous accompagne pour intégrer vos systèmes à notre plateforme SOC. Nous prenons en charge la configuration initiale et la formation de vos équipes.",
                },
                {
                  q: "Puis-je changer de formule en cours d'abonnement ?",
                  a: "Oui, vous pouvez passer à une formule supérieure à tout moment. Le changement vers une formule inférieure prend effet à la prochaine échéance de facturation.",
                },
                {
                  q: "Quels systèmes sont compatibles ?",
                  a: "Notre solution s'intègre avec tous les principaux SIEM, EDR, firewalls et environnements cloud (AWS, Azure, GCP). Nous supportons également les environnements on-premise et hybrides.",
                },
                {
                  q: "Quel est le délai de mise en service ?",
                  a: "Après signature du contrat, la mise en service complète prend généralement 2 à 3 semaines, incluant l'intégration technique et la phase de tuning des alertes.",
                },
                {
                  q: "Comment fonctionne le support ?",
                  a: "Notre équipe support est disponible 24/7 par téléphone, email et chat. Les incidents critiques sont traités en moins de 15 minutes avec un suivi dédié jusqu'à résolution.",
                },
              ].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white border border-slate-200 rounded-xl px-6 overflow-hidden data-[state=open]:border-primary data-[state=open]:shadow-lg transition-all last:border-b"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 pt-0">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-slate-900 text-white">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Prêt à renforcer votre cybersécurité ?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            Rejoignez les {productData.trustStats[0].value} entreprises qui font confiance à Cyna-IT.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <ShoppingCart className="h-5 w-5" />
              S&apos;abonner à {formatPrice(monthlyEquivalent)}/mois
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white/10 text-white border border-white/30 hover:bg-white/20"
            >
              Demander une démo
            </Button>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Solutions complémentaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {similarProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} variant="compact" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
