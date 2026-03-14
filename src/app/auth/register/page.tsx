"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, Eye, EyeOff, Check, X } from "lucide-react";

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const passwordRequirements = useMemo(() => {
    return [
      { label: "Au moins 8 caractères", valid: password.length >= 8 },
      { label: "Une majuscule", valid: /[A-Z]/.test(password) },
      { label: "Une minuscule", valid: /[a-z]/.test(password) },
      { label: "Un chiffre", valid: /[0-9]/.test(password) },
      { label: "Un caractère spécial", valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    ];
  }, [password]);

  const passwordStrength: PasswordStrength = useMemo(() => {
    const validCount = passwordRequirements.filter((r) => r.valid).length;
    if (validCount <= 1) return { score: 20, label: "Très faible", color: "bg-red-500" };
    if (validCount === 2) return { score: 40, label: "Faible", color: "bg-orange-500" };
    if (validCount === 3) return { score: 60, label: "Moyen", color: "bg-yellow-500" };
    if (validCount === 4) return { score: 80, label: "Fort", color: "bg-lime-500" };
    return { score: 100, label: "Très fort", color: "bg-green-500" };
  }, [passwordRequirements]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) return;

    setIsLoading(true);
    // Simuler l'inscription
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    // Redirection simulée
    alert("Un email de confirmation vous a été envoyé !");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Créer un compte</CardTitle>
          <CardDescription>
            Rejoignez Cyna-IT et sécurisez votre entreprise
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                type="text"
                placeholder="Jean Dupont"
                required
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email professionnel</Label>
              <Input
                id="email"
                type="email"
                placeholder="vous@entreprise.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

              {/* Password Strength */}
              {password.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Force du mot de passe</span>
                    <span className={`font-medium ${passwordStrength.color.replace("bg-", "text-")}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <Progress value={passwordStrength.score} className="h-1" />

                  <div className="grid grid-cols-1 gap-1 mt-2">
                    {passwordRequirements.map((req) => (
                      <div
                        key={req.label}
                        className={`flex items-center gap-2 text-xs ${
                          req.valid ? "text-green-600" : "text-muted-foreground"
                        }`}
                      >
                        {req.valid ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <X className="h-3 w-3" />
                        )}
                        {req.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-tight">
                J&apos;accepte les{" "}
                <Link href="/legal/cgu" className="text-primary hover:underline">
                  Conditions Générales d&apos;Utilisation
                </Link>{" "}
                et la{" "}
                <Link href="/legal/privacy" className="text-primary hover:underline">
                  Politique de Confidentialité
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !acceptTerms || passwordStrength.score < 80}
            >
              {isLoading ? "Création du compte..." : "Créer mon compte"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Déjà un compte ? </span>
            <Link href="/auth/login" className="text-primary hover:underline font-medium">
              Se connecter
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
