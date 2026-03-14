"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Check,
  CreditCard,
  Lock,
  Shield,
  User,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Mail,
  Eye,
  EyeOff,
  Building,
  Phone,
  Globe,
} from "lucide-react";

// Mock cart data
const cartItems = [
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
];

const steps = [
  { id: 1, name: "Compte", icon: User },
  { id: 2, name: "Facturation", icon: MapPin },
  { id: 3, name: "Paiement", icon: CreditCard },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  // Change this to test both variants: true = logged in, false = not logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    // Account info
    email: "",
    password: "",
    name: "",
    // Logged in user info (mock)
    loggedEmail: "jean.dupont@entreprise.com",
    loggedName: "Jean Dupont",
    // Billing address
    firstName: "",
    lastName: "",
    company: "",
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    region: "",
    country: "FR",
    phone: "",
    // Payment
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
    saveCard: true,
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    window.location.href = "/checkout/confirmation";
  };

  // Simulate login for demo
  const handleDemoLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">Cyna-IT</span>
            </Link>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              Paiement sécurisé
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container py-6">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      currentStep > step.id
                        ? "bg-primary text-white"
                        : currentStep === step.id
                        ? "bg-primary text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`ml-3 font-medium hidden sm:block ${
                      currentStep >= step.id
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-24 h-0.5 mx-4 ${
                      currentStep > step.id ? "bg-primary" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {/* Step 1: Account - NOT LOGGED IN */}
            {currentStep === 1 && !isLoggedIn && (
              <div className="space-y-6">
                {/* Login Option */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Déjà client ?</h2>
                      <p className="text-sm text-muted-foreground">
                        Connectez-vous pour un checkout plus rapide
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="vous@entreprise.com"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button onClick={handleDemoLogin} className="gap-2">
                      Se connecter
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <Separator className="flex-1" />
                  <span className="text-sm text-muted-foreground">ou</span>
                  <Separator className="flex-1" />
                </div>

                {/* Create Account Option */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-cyan-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Nouveau client</h2>
                      <p className="text-sm text-muted-foreground">
                        Créez votre compte pour commander
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-name">Nom complet *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="new-name"
                            placeholder="Jean Dupont"
                            className="pl-10"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-email">Email professionnel *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="new-email"
                            type="email"
                            placeholder="vous@entreprise.com"
                            className="pl-10"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">Mot de passe *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="new-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Minimum 8 caractères"
                          className="pl-10 pr-10"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        8 caractères minimum, 1 majuscule, 1 chiffre
                      </p>
                    </div>

                    <div className="flex items-start space-x-2 pt-2">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm text-muted-foreground cursor-pointer leading-tight"
                      >
                        J'accepte les{" "}
                        <Link href="/legal/cgu" className="text-primary hover:underline">
                          Conditions Générales d'Utilisation
                        </Link>{" "}
                        et la{" "}
                        <Link href="/legal/privacy" className="text-primary hover:underline">
                          Politique de Confidentialité
                        </Link>
                      </label>
                    </div>

                    <Button onClick={handleNextStep} className="w-full gap-2 h-12 mt-4">
                      Créer mon compte et continuer
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Account - LOGGED IN */}
            {currentStep === 1 && isLoggedIn && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Connecté</h2>
                    <p className="text-sm text-muted-foreground">
                      Vous êtes prêt à continuer votre commande
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <User className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-green-900">
                        {formData.loggedName}
                      </p>
                      <p className="text-green-700">{formData.loggedEmail}</p>
                      <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100">
                        Compte vérifié
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">
                  Votre commande sera associée à ce compte. Vous pourrez gérer vos
                  abonnements et factures depuis votre espace client.
                </p>

                <div className="flex gap-4">
                  <Button onClick={handleNextStep} className="gap-2" size="lg">
                    Continuer vers l'adresse
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setIsLoggedIn(false)}
                    className="text-muted-foreground"
                  >
                    Changer de compte
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Billing Address */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Adresse de facturation</h2>
                    <p className="text-sm text-muted-foreground">
                      Ces informations apparaîtront sur vos factures
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        placeholder="Jean"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        placeholder="Dupont"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Entreprise (optionnel)</Label>
                    <Input
                      id="company"
                      placeholder="TechCorp SAS"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address1">Adresse *</Label>
                    <Input
                      id="address1"
                      placeholder="123 rue de la Paix"
                      value={formData.address1}
                      onChange={(e) => handleInputChange("address1", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address2">Complément d'adresse (optionnel)</Label>
                    <Input
                      id="address2"
                      placeholder="Bâtiment A, 3ème étage"
                      value={formData.address2}
                      onChange={(e) => handleInputChange("address2", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Code postal *</Label>
                      <Input
                        id="postalCode"
                        placeholder="75001"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville *</Label>
                      <Input
                        id="city"
                        placeholder="Paris"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="region">Région (optionnel)</Label>
                      <Input
                        id="region"
                        placeholder="Île-de-France"
                        value={formData.region}
                        onChange={(e) => handleInputChange("region", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Pays *</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(v) => handleInputChange("country", v)}
                      >
                        <SelectTrigger>
                          <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FR">France</SelectItem>
                          <SelectItem value="BE">Belgique</SelectItem>
                          <SelectItem value="CH">Suisse</SelectItem>
                          <SelectItem value="LU">Luxembourg</SelectItem>
                          <SelectItem value="MC">Monaco</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+33 6 12 34 56 78"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button
                      variant="outline"
                      onClick={handlePreviousStep}
                      className="gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Retour
                    </Button>
                    <Button onClick={handleNextStep} className="gap-2">
                      Continuer vers le paiement
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Paiement sécurisé</h2>
                    <p className="text-sm text-muted-foreground">
                      Vos données sont protégées par cryptage SSL
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Card Type Selection */}
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <span className="text-sm font-medium">Cartes acceptées :</span>
                    <div className="flex gap-3">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png"
                        alt="Visa"
                        width={50}
                        height={16}
                        className="h-6 w-auto object-contain"
                      />
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png"
                        alt="Mastercard"
                        width={40}
                        height={24}
                        className="h-6 w-auto object-contain"
                      />
                    </div>
                  </div>

                  {/* Card Form */}
                  <div className="border border-slate-200 rounded-xl p-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nom sur la carte *</Label>
                      <Input
                        id="cardName"
                        placeholder="JEAN DUPONT"
                        value={formData.cardName}
                        onChange={(e) =>
                          handleInputChange("cardName", e.target.value.toUpperCase())
                        }
                        className="uppercase"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Numéro de carte *</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="cardNumber"
                          placeholder="4242 4242 4242 4242"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                          className="pl-10 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Date d'expiration *</Label>
                        <Input
                          id="cardExpiry"
                          placeholder="MM / AA"
                          value={formData.cardExpiry}
                          onChange={(e) => handleInputChange("cardExpiry", e.target.value)}
                          className="font-mono"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardCvc">Code CVC *</Label>
                        <div className="relative">
                          <Input
                            id="cardCvc"
                            placeholder="123"
                            value={formData.cardCvc}
                            onChange={(e) => handleInputChange("cardCvc", e.target.value)}
                            className="font-mono"
                            maxLength={4}
                          />
                          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox
                        id="saveCard"
                        checked={formData.saveCard as boolean}
                        onCheckedChange={(checked) =>
                          handleInputChange("saveCard", checked as boolean)
                        }
                      />
                      <label
                        htmlFor="saveCard"
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        Sauvegarder cette carte pour mes prochains achats
                      </label>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-5 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Paiement 100% sécurisé</p>
                      <p className="text-sm text-muted-foreground">
                        Vos données bancaires sont chiffrées et transmises directement
                        à notre partenaire Stripe. Nous ne stockons jamais vos
                        informations de carte.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={handlePreviousStep}
                      className="gap-2"
                      disabled={isProcessing}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Retour
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="gap-2"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Traitement...
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4" />
                          Payer {formatPrice(subtotal)}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-900 text-white p-6">
                  <h2 className="text-xl font-semibold">Votre commande</h2>
                </div>

                <div className="p-6 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Qté: {item.quantity} •{" "}
                          {item.period === "monthly" ? "Mensuel" : "Annuel"}
                        </p>
                        <p className="text-sm font-semibold text-primary mt-1">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">TVA (20%)</span>
                      <span>Incluse</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Garantie satisfait ou remboursé 30 jours</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Lock className="h-5 w-5 text-primary" />
                    <span>Paiement sécurisé SSL 256-bit</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span>Annulation possible à tout moment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
