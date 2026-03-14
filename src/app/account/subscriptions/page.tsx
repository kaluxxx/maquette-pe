"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  User,
  Package,
  FileText,
  LogOut,
  Shield,
  Bell,
  Calendar,
  RefreshCw,
  XCircle,
  ChevronRight,
  Activity,
  Clock,
  AlertTriangle,
  CreditCard,
} from "lucide-react";

// Mock subscriptions data
const subscriptions = [
  {
    id: "1",
    name: "SOC Premium 24/7",
    description: "Surveillance complète avec intervention immédiate",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&q=80",
    status: "active",
    startDate: "15 janvier 2024",
    nextBilling: "15 février 2024",
    price: 2499,
    period: "monthly",
    features: ["Surveillance 24/7", "Réponse immédiate", "Rapports hebdomadaires"],
  },
  {
    id: "2",
    name: "EDR Enterprise",
    description: "Protection endpoint avancée avec IA",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80",
    status: "active",
    startDate: "1 mars 2023",
    nextBilling: "1 mars 2024",
    price: 8990,
    period: "yearly",
    features: ["Protection IA", "Analyse comportementale", "Isolation automatique"],
  },
  {
    id: "3",
    name: "Threat Intel Basic",
    description: "Flux de renseignements sur les menaces",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=400&q=80",
    status: "cancelled",
    startDate: "10 juin 2023",
    endDate: "10 décembre 2023",
    price: 599,
    period: "monthly",
    features: ["Alertes menaces", "Rapports quotidiens"],
  },
];

// Navigation items
const navItems = [
  { href: "/account", label: "Tableau de bord", icon: Activity },
  { href: "/account/profile", label: "Mon profil", icon: User },
  { href: "/account/subscriptions", label: "Mes abonnements", icon: Package, active: true, badge: "2" },
  { href: "/account/orders", label: "Mes commandes", icon: FileText },
];

export default function SubscriptionsPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const activeSubscriptions = subscriptions.filter((s) => s.status === "active");
  const cancelledSubscriptions = subscriptions.filter((s) => s.status === "cancelled");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <nav className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1 sticky top-24">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                    item.active ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge className={`ml-2 ${item.active ? "bg-white/20 text-white hover:bg-white/20" : "bg-primary/10 text-primary"}`}>
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-200">
                <Button variant="ghost" className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50">
                  <LogOut className="h-5 w-5" />
                  Déconnexion
                </Button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Mes abonnements</h1>
                <p className="text-muted-foreground">Gérez vos services et abonnements actifs</p>
              </div>
              <Button className="gap-2" asChild>
                <Link href="/categories">
                  <Package className="h-4 w-4" />
                  Découvrir plus de services
                </Link>
              </Button>
            </div>

            {/* Summary Card */}
            <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white border-0">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <Package className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{activeSubscriptions.length}</p>
                      <p className="text-sm text-slate-400">Abonnements actifs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">15 fév</p>
                      <p className="text-sm text-slate-400">Prochaine échéance</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{formatPrice(2499)}</p>
                      <p className="text-sm text-slate-400">Prochain paiement</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Subscriptions */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Abonnements actifs</h2>
              <div className="space-y-4">
                {activeSubscriptions.map((sub) => (
                  <Card key={sub.id} className="overflow-hidden p-0">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0">
                          <Image
                            src={sub.image}
                            alt={sub.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 md:bg-gradient-to-t" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-bold">{sub.name}</h3>
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                  Actif
                                </Badge>
                              </div>
                              <p className="text-muted-foreground mb-4">{sub.description}</p>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {sub.features.map((feature, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  Depuis {sub.startDate}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  Prochain : {sub.nextBilling}
                                </div>
                              </div>
                            </div>

                            <div className="text-left md:text-right">
                              <p className="text-3xl font-bold text-primary">
                                {formatPrice(sub.price)}
                              </p>
                              <p className="text-sm text-muted-foreground mb-4">
                                par {sub.period === "monthly" ? "mois" : "an"}
                              </p>

                              <div className="flex flex-col gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2">
                                      <RefreshCw className="h-4 w-4" />
                                      Renouveler
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Renouveler l'abonnement</DialogTitle>
                                      <DialogDescription>
                                        Votre abonnement sera renouvelé automatiquement à la prochaine échéance.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                      <div className="bg-slate-50 rounded-xl p-4">
                                        <p className="font-semibold">{sub.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                          Prochaine facturation : {sub.nextBilling}
                                        </p>
                                        <p className="text-lg font-bold text-primary mt-2">
                                          {formatPrice(sub.price)}/{sub.period === "monthly" ? "mois" : "an"}
                                        </p>
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button variant="outline">Annuler</Button>
                                      <Button>Confirmer le renouvellement</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>

                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="sm" className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                                      <XCircle className="h-4 w-4" />
                                      Résilier
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle className="flex items-center gap-2">
                                        <AlertTriangle className="h-5 w-5 text-red-500" />
                                        Résilier l'abonnement ?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Êtes-vous sûr de vouloir résilier votre abonnement à <strong>{sub.name}</strong> ?
                                        Vous perdrez l'accès à ce service à la fin de la période de facturation actuelle.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                                      <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                                        Confirmer la résiliation
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Cancelled Subscriptions */}
            {cancelledSubscriptions.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Abonnements résiliés</h2>
                <div className="space-y-4">
                  {cancelledSubscriptions.map((sub) => (
                    <Card key={sub.id} className="opacity-60">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                              <Image
                                src={sub.image}
                                alt={sub.name}
                                fill
                                className="object-cover grayscale"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{sub.name}</h3>
                                <Badge variant="secondary">Résilié</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Terminé le {sub.endDate}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="gap-2" asChild>
                            <Link href={`/products/${sub.id}`}>
                              Réactiver
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
