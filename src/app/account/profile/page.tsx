"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
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
  User,
  Package,
  FileText,
  LogOut,
  Shield,
  Bell,
  Mail,
  Phone,
  Building,
  MapPin,
  Lock,
  Pencil,
  Check,
  Eye,
  EyeOff,
  Activity,
  AlertTriangle,
} from "lucide-react";

// Mock user data
const userData = {
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@entreprise.com",
  phone: "+33 6 12 34 56 78",
  company: "TechCorp SAS",
  address: {
    line1: "123 rue de la Paix",
    line2: "Bâtiment A",
    city: "Paris",
    postalCode: "75001",
    country: "France",
  },
  initials: "JD",
  memberSince: "Janvier 2024",
};

// Navigation items
const navItems = [
  { href: "/account", label: "Tableau de bord", icon: Activity },
  { href: "/account/profile", label: "Mon profil", icon: User, active: true },
  { href: "/account/subscriptions", label: "Mes abonnements", icon: Package, badge: "2" },
  { href: "/account/orders", label: "Mes commandes", icon: FileText },
];

export default function ProfilePage() {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

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
                    item.active
                      ? "bg-primary text-white"
                      : "text-slate-600 hover:bg-slate-100"
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
            <div>
              <h1 className="text-2xl font-bold">Mon profil</h1>
              <p className="text-muted-foreground">Gérez vos informations personnelles</p>
            </div>

            {/* Profile Card */}
            <Card className="bg-slate-900 border-0 text-white">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <Avatar className="h-24 w-24 border-4 border-white/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-cyan-600 text-white text-2xl">
                      {userData.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{userData.firstName} {userData.lastName}</h2>
                    <p className="text-slate-400">{userData.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20">
                        <Check className="h-3 w-3 mr-1" />
                        Email vérifié
                      </Badge>
                      <Badge className="bg-white/10 text-slate-300 hover:bg-white/10">
                        Membre depuis {userData.memberSince}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Informations personnelles</CardTitle>
                  <CardDescription>Modifiez vos informations de base</CardDescription>
                </div>
                <Button
                  variant={isEditingPersonal ? "default" : "outline"}
                  size="sm"
                  className="gap-2"
                  onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                >
                  {isEditingPersonal ? (
                    <>
                      <Check className="h-4 w-4" />
                      Enregistrer
                    </>
                  ) : (
                    <>
                      <Pencil className="h-4 w-4" />
                      Modifier
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        defaultValue={userData.firstName}
                        disabled={!isEditingPersonal}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="lastName"
                        defaultValue={userData.lastName}
                        disabled={!isEditingPersonal}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      defaultValue={userData.phone}
                      disabled={!isEditingPersonal}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Entreprise</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company"
                      defaultValue={userData.company}
                      disabled={!isEditingPersonal}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email - Separate Security */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">Adresse email</CardTitle>
                  <Badge variant="outline" className="text-amber-600 border-amber-300">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Nécessite vérification
                  </Badge>
                </div>
                <CardDescription>
                  Un email de confirmation sera envoyé à la nouvelle adresse
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      defaultValue={userData.email}
                      disabled
                      className="pl-10"
                    />
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Pencil className="h-4 w-4" />
                        Modifier
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Modifier l'adresse email</DialogTitle>
                        <DialogDescription>
                          Un email de confirmation sera envoyé à la nouvelle adresse pour valider le changement.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Email actuel</Label>
                          <Input value={userData.email} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Nouvel email</Label>
                          <Input placeholder="nouveau@email.com" />
                        </div>
                        <div className="space-y-2">
                          <Label>Confirmez le nouvel email</Label>
                          <Input placeholder="nouveau@email.com" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Annuler</Button>
                        <Button>Envoyer la confirmation</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Password */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">Mot de passe</CardTitle>
                  <Badge variant="outline" className="text-amber-600 border-amber-300">
                    <Lock className="h-3 w-3 mr-1" />
                    Sécurisé
                  </Badge>
                </div>
                <CardDescription>
                  Pour modifier votre mot de passe, vous devez entrer l'ancien
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Lock className="h-4 w-4" />
                      Changer le mot de passe
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Changer le mot de passe</DialogTitle>
                      <DialogDescription>
                        Entrez votre mot de passe actuel puis choisissez un nouveau mot de passe.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Mot de passe actuel</Label>
                        <div className="relative">
                          <Input
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="••••••••"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Label>Nouveau mot de passe</Label>
                        <div className="relative">
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="••••••••"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          8 caractères minimum, 1 majuscule, 1 chiffre
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Confirmer le nouveau mot de passe</Label>
                        <Input type="password" placeholder="••••••••" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Annuler</Button>
                      <Button>Mettre à jour</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Adresse de facturation</CardTitle>
                  <CardDescription>Adresse utilisée pour vos factures</CardDescription>
                </div>
                <Button
                  variant={isEditingAddress ? "default" : "outline"}
                  size="sm"
                  className="gap-2"
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                >
                  {isEditingAddress ? (
                    <>
                      <Check className="h-4 w-4" />
                      Enregistrer
                    </>
                  ) : (
                    <>
                      <Pencil className="h-4 w-4" />
                      Modifier
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Adresse</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      defaultValue={userData.address.line1}
                      disabled={!isEditingAddress}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Complément</Label>
                  <Input
                    defaultValue={userData.address.line2}
                    disabled={!isEditingAddress}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Code postal</Label>
                    <Input
                      defaultValue={userData.address.postalCode}
                      disabled={!isEditingAddress}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ville</Label>
                    <Input
                      defaultValue={userData.address.city}
                      disabled={!isEditingAddress}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Pays</Label>
                  <Input
                    defaultValue={userData.address.country}
                    disabled={!isEditingAddress}
                  />
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
