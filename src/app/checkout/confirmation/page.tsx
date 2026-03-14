"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Mail,
  Download,
  ArrowRight,
  Shield,
  Calendar,
  FileText,
  Copy,
  Sparkles,
  Clock,
  Headphones,
  MapPin,
} from "lucide-react";

// Mock order data
const orderData = {
  orderNumber: "CYN-2024-001234",
  date: new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  time: new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }),
  email: "jean.dupont@entreprise.com",
  items: [
    {
      id: "1",
      name: "SOC Premium 24/7",
      price: 2499,
      period: "monthly",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=200&q=80",
    },
    {
      id: "2",
      name: "EDR Enterprise",
      price: 8990,
      period: "yearly",
      quantity: 2,
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=200&q=80",
    },
  ],
  billingAddress: {
    name: "Jean Dupont",
    company: "TechCorp SAS",
    address: "123 rue de la Paix",
    city: "75001 Paris",
    country: "France",
  },
  subtotal: 20479,
  total: 20479,
};

export default function ConfirmationPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(orderData.orderNumber);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Success Hero */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-500 to-cyan-600" />

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full" />
        </div>

        <div className="relative container py-16 md:py-20 h-screen flex flex-col items-center justify-center text-center text-white">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/20 border-white/30">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Paiement accepté
          </Badge>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Merci pour votre commande !
          </h1>

          <p className="text-white/90 max-w-xl mx-auto text-lg mb-8">
            Votre commande a été confirmée avec succès. Vous allez recevoir un email de confirmation à{" "}
            <span className="font-semibold text-white">{orderData.email}</span>
          </p>

          {/* Order number card */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4">
            <div className="text-left">
              <p className="text-white/70 text-sm">Numéro de commande</p>
              <p className="text-xl font-bold font-mono">{orderData.orderNumber}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={copyOrderNumber}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Left Column - Order Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Order Items Card */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <h2 className="font-semibold text-lg">Détails de la commande</h2>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {orderData.date} à {orderData.time}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {orderData.items.map((item, index) => (
                      <div key={item.id}>
                        <div className="flex gap-4">
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold">{item.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {item.period === "monthly" ? "Mensuel" : "Annuel"}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Qté: {item.quantity}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatPrice(item.price)}/{item.period === "monthly" ? "mois" : "an"}
                            </p>
                          </div>
                        </div>
                        {index < orderData.items.length - 1 && (
                          <Separator className="mt-4" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="bg-slate-50 p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-muted-foreground text-sm">Total TTC</p>
                        <p className="text-xs text-muted-foreground">TVA incluse</p>
                      </div>
                      <p className="text-3xl font-bold text-primary">
                        {formatPrice(orderData.total)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Billing Address Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-slate-600" />
                    </div>
                    <h2 className="font-semibold text-lg">Adresse de facturation</h2>
                  </div>
                  <div className="pl-13 text-muted-foreground">
                    <p className="font-medium text-foreground">{orderData.billingAddress.name}</p>
                    {orderData.billingAddress.company && (
                      <p>{orderData.billingAddress.company}</p>
                    )}
                    <p>{orderData.billingAddress.address}</p>
                    <p>{orderData.billingAddress.city}</p>
                    <p>{orderData.billingAddress.country}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="gap-2 flex-1">
                    <Download className="h-4 w-4" />
                    Télécharger le reçu
                  </Button>
                  <Button variant="outline" className="gap-2 flex-1">
                    <FileText className="h-4 w-4" />
                    Voir la facture
                  </Button>
                </div>
              </div>

              {/* Right Column - Next Steps */}
              <div className="space-y-6">
                {/* Timeline Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h2 className="font-semibold text-lg mb-6">Prochaines étapes</h2>

                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-5 top-10 bottom-10 w-0.5 bg-gradient-to-b from-primary via-cyan-500 to-slate-200" />

                    <div className="space-y-6">
                      {/* Step 1 */}
                      <div className="flex gap-4 relative">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 z-10">
                          <Mail className="h-5 w-5 text-white" />
                        </div>
                        <div className="pt-1">
                          <p className="font-medium">Email de confirmation</p>
                          <p className="text-sm text-muted-foreground">
                            Vérifiez votre boîte mail
                          </p>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="flex gap-4 relative">
                        <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 z-10">
                          <Calendar className="h-5 w-5 text-white" />
                        </div>
                        <div className="pt-1">
                          <p className="font-medium">Onboarding sous 24h</p>
                          <p className="text-sm text-muted-foreground">
                            Notre équipe vous contacte
                          </p>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="flex gap-4 relative">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 z-10">
                          <Shield className="h-5 w-5 text-slate-500" />
                        </div>
                        <div className="pt-1">
                          <p className="font-medium">Activation services</p>
                          <p className="text-sm text-muted-foreground">
                            Configuration personnalisée
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Support Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Headphones className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Besoin d'aide ?</p>
                      <p className="text-sm text-slate-400">Support 24/7</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 mb-4">
                    Notre équipe est disponible pour répondre à vos questions.
                  </p>
                  <Button variant="secondary" className="w-full gap-2" asChild>
                    <Link href="/contact">
                      Nous contacter
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-primary to-cyan-600 rounded-2xl p-6 text-white">
                  <h3 className="font-semibold text-lg mb-2">Espace client</h3>
                  <p className="text-sm text-white/80 mb-4">
                    Gérez vos abonnements, factures et suivez vos services.
                  </p>
                  <Button className="w-full bg-white text-primary hover:bg-white/90 gap-2" asChild>
                    <Link href="/account">
                      Accéder à mon compte
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 text-center">
              <Button variant="ghost" asChild className="text-muted-foreground">
                <Link href="/">
                  Retour à l'accueil
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
