"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Shield, Eye, EyeOff, Lock, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AdminLoginPage() {
  const [step, setStep] = useState<"credentials" | "2fa">("credentials");
  const [showPassword, setShowPassword] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("2fa");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDI5M2EiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0tNiA2aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div>
              <span className="font-bold text-2xl text-white">Cyna-IT</span>
              <p className="text-xs text-slate-400">Administration</p>
            </div>
          </Link>
        </div>

        <Card className="border-slate-800 bg-slate-800/50 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-white">
              {step === "credentials" ? "Connexion Admin" : "Vérification 2FA"}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {step === "credentials"
                ? "Accédez au panneau d'administration"
                : "Entrez le code de votre application d'authentification"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "credentials" ? (
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@cyna-it.fr"
                      className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300">
                    Mot de passe
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 text-slate-500 hover:text-white hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full gap-2">
                  Continuer
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                {/* Step indicator */}
                <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Identifiants validés</span>
                </div>

                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otpValue}
                    onChange={(value) => setOtpValue(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="bg-slate-900/50 border-slate-700 text-white" />
                      <InputOTPSlot index={1} className="bg-slate-900/50 border-slate-700 text-white" />
                      <InputOTPSlot index={2} className="bg-slate-900/50 border-slate-700 text-white" />
                      <InputOTPSlot index={3} className="bg-slate-900/50 border-slate-700 text-white" />
                      <InputOTPSlot index={4} className="bg-slate-900/50 border-slate-700 text-white" />
                      <InputOTPSlot index={5} className="bg-slate-900/50 border-slate-700 text-white" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <p className="text-center text-sm text-slate-500">
                  Ouvrez votre application d'authentification (Google Authenticator, Authy, etc.)
                  et entrez le code à 6 chiffres.
                </p>

                <div className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link href="/admin">
                      Vérifier et accéder
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-slate-400 hover:text-white"
                    onClick={() => setStep("credentials")}
                  >
                    Retour
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security notice */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Accès réservé aux administrateurs autorisés.
          <br />
          Toutes les connexions sont enregistrées.
        </p>
      </div>
    </div>
  );
}
