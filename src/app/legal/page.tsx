"use client";

import {Card, CardContent} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {FileText, ScrollText} from "lucide-react";

export default function LegalPage() {
    return (
        <div className="min-h-screen bg-slate-50">

            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-12">
                <div className="container">
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            Informations légales
                        </h1>
                        <p className="text-slate-400">
                            Mentions légales et Conditions Générales d'Utilisation
                        </p>
                    </div>
                </div>
            </section>

            <div className="container py-12">
                <Tabs defaultValue="mentions" className="space-y-8">
                    <TabsList
                        className="w-full h-auto p-1 bg-white border border-slate-200 rounded-xl grid grid-cols-2 gap-1">
                        <TabsTrigger
                            value="mentions"
                            className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-slate-900 data-[state=active]:text-white"
                        >
                            <FileText className="h-5 w-5"/>
                            <span className="font-medium">Mentions légales</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="cgu"
                            className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-slate-900 data-[state=active]:text-white"
                        >
                            <ScrollText className="h-5 w-5"/>
                            <span className="font-medium">CGU</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Mentions légales */}
                    <TabsContent value="mentions">
                        <Card>
                            <CardContent className="p-8 prose prose-slate max-w-none">
                                <h2>Mentions légales</h2>
                                <p className="text-muted-foreground">
                                    Dernière mise à jour : 8 janvier 2024
                                </p>

                                <h3>1. Éditeur du site</h3>
                                <p>
                                    Le site cyna-it.fr est édité par la société <strong>Cyna-IT SAS</strong>,
                                    société par actions simplifiée au capital de 100 000 euros,
                                    immatriculée au Registre du Commerce et des Sociétés de Paris
                                    sous le numéro 123 456 789.
                                </p>
                                <ul>
                                    <li><strong>Siège social :</strong> 123 Avenue de la Cybersécurité, 75001 Paris,
                                        France
                                    </li>
                                    <li><strong>Numéro de TVA intracommunautaire :</strong> FR 12 345678901</li>
                                    <li><strong>Email :</strong> contact@cyna-it.fr</li>
                                    <li><strong>Téléphone :</strong> +33 1 23 45 67 89</li>
                                </ul>

                                <h3>2. Directeur de la publication</h3>
                                <p>
                                    Le directeur de la publication est Monsieur Jean MARTIN, en sa qualité
                                    de Président de Cyna-IT SAS.
                                </p>

                                <h3>3. Hébergement</h3>
                                <p>
                                    Le site est hébergé par <strong>Vercel Inc.</strong>
                                </p>
                                <ul>
                                    <li><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
                                    <li><strong>Site web :</strong> vercel.com</li>
                                </ul>

                                <h3>4. Propriété intellectuelle</h3>
                                <p>
                                    L'ensemble du contenu du site (textes, images, logos, icônes, sons,
                                    logiciels, etc.) est la propriété exclusive de Cyna-IT SAS ou de ses
                                    partenaires et est protégé par les lois françaises et internationales
                                    relatives à la propriété intellectuelle.
                                </p>
                                <p>
                                    Toute reproduction, représentation, modification, publication,
                                    transmission, ou plus généralement toute exploitation non autorisée
                                    du site ou de son contenu est strictement interdite et constitue
                                    une contrefaçon sanctionnée par le Code de la propriété intellectuelle.
                                </p>

                                <h3>5. Protection des données personnelles</h3>
                                <p>
                                    Conformément au Règlement Général sur la Protection des Données (RGPD)
                                    et à la loi Informatique et Libertés du 6 janvier 1978 modifiée,
                                    vous disposez d'un droit d'accès, de rectification, de suppression
                                    et d'opposition aux données personnelles vous concernant.
                                </p>
                                <p>
                                    Pour exercer ces droits, vous pouvez nous contacter à l'adresse :
                                    <a href="mailto:dpo@cyna-it.fr"> dpo@cyna-it.fr</a>
                                </p>

                                <h3>6. Cookies</h3>
                                <p>
                                    Le site utilise des cookies pour améliorer l'expérience utilisateur.
                                    En naviguant sur le site, vous acceptez l'utilisation de ces cookies.
                                    Vous pouvez configurer votre navigateur pour refuser les cookies.
                                </p>

                                <h3>7. Limitation de responsabilité</h3>
                                <p>
                                    Cyna-IT SAS s'efforce de fournir des informations aussi précises que
                                    possible. Toutefois, elle ne pourra être tenue responsable des omissions,
                                    des inexactitudes et des carences dans la mise à jour, qu'elles soient
                                    de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* CGU */}
                    <TabsContent value="cgu">
                        <Card>
                            <CardContent className="p-8 prose prose-slate max-w-none">
                                <h2>Conditions Générales d'Utilisation</h2>
                                <p className="text-muted-foreground">
                                    Dernière mise à jour : 8 janvier 2024
                                </p>

                                <h3>Article 1 - Objet</h3>
                                <p>
                                    Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet
                                    de définir les modalités et conditions d'utilisation des services
                                    proposés sur le site cyna-it.fr, ainsi que de définir les droits
                                    et obligations des parties dans ce cadre.
                                </p>

                                <h3>Article 2 - Acceptation des CGU</h3>
                                <p>
                                    L'utilisation du site et des services implique l'acceptation pleine
                                    et entière des présentes CGU. En créant un compte ou en passant
                                    commande, vous reconnaissez avoir pris connaissance des présentes
                                    conditions et les accepter sans réserve.
                                </p>

                                <h3>Article 3 - Description des services</h3>
                                <p>
                                    Cyna-IT propose des solutions de cybersécurité sous forme d'abonnements
                                    SaaS (Software as a Service), incluant notamment :
                                </p>
                                <ul>
                                    <li>Services de Security Operations Center (SOC)</li>
                                    <li>Solutions Endpoint Detection and Response (EDR)</li>
                                    <li>Plateformes SIEM (Security Information and Event Management)</li>
                                    <li>Services d'audit et de pentesting</li>
                                    <li>Threat Intelligence et veille sécurité</li>
                                </ul>

                                <h3>Article 4 - Création de compte</h3>
                                <p>
                                    L'accès à certains services nécessite la création d'un compte utilisateur.
                                    Vous vous engagez à fournir des informations exactes et à jour lors
                                    de votre inscription et à les maintenir actualisées.
                                </p>
                                <p>
                                    Vous êtes responsable de la confidentialité de vos identifiants
                                    de connexion et de toutes les activités effectuées sous votre compte.
                                </p>

                                <h3>Article 5 - Tarifs et paiement</h3>
                                <p>
                                    Les prix des services sont indiqués en euros toutes taxes comprises (TTC).
                                    Cyna-IT se réserve le droit de modifier ses tarifs à tout moment,
                                    les services étant facturés sur la base des tarifs en vigueur au moment
                                    de la commande.
                                </p>
                                <p>
                                    Le paiement s'effectue par carte bancaire (Visa, Mastercard) via
                                    notre prestataire de paiement sécurisé Stripe.
                                </p>

                                <h3>Article 6 - Durée et résiliation</h3>
                                <p>
                                    Les abonnements sont souscrits pour une durée mensuelle ou annuelle
                                    selon l'option choisie. Ils sont renouvelés automatiquement sauf
                                    résiliation de votre part avant la date de renouvellement.
                                </p>
                                <p>
                                    Vous pouvez résilier votre abonnement à tout moment depuis votre
                                    espace client. La résiliation prendra effet à la fin de la période
                                    de facturation en cours.
                                </p>

                                <h3>Article 7 - Droit de rétractation</h3>
                                <p>
                                    Conformément à l'article L.221-28 du Code de la consommation,
                                    le droit de rétractation ne peut être exercé pour les contrats
                                    de fourniture de services pleinement exécutés avant la fin du délai
                                    de rétractation et dont l'exécution a commencé avec l'accord
                                    préalable et exprès du consommateur.
                                </p>
                                <p>
                                    Toutefois, Cyna-IT propose une garantie satisfait ou remboursé
                                    de 14 jours pour tous ses services.
                                </p>

                                <h3>Article 8 - Responsabilité</h3>
                                <p>
                                    Cyna-IT s'engage à mettre en œuvre tous les moyens nécessaires
                                    pour assurer la continuité et la qualité de ses services.
                                    Cependant, sa responsabilité ne saurait être engagée en cas de :
                                </p>
                                <ul>
                                    <li>Défaillance due à un cas de force majeure</li>
                                    <li>Mauvaise utilisation des services par le client</li>
                                    <li>Interruption temporaire pour maintenance</li>
                                    <li>Dommages indirects ou immatériels</li>
                                </ul>

                                <h3>Article 9 - Propriété intellectuelle</h3>
                                <p>
                                    Les services et leur contenu restent la propriété exclusive de Cyna-IT.
                                    L'abonnement confère un droit d'utilisation personnel, non exclusif
                                    et non transférable des services pour la durée de l'abonnement.
                                </p>

                                <h3>Article 10 - Données personnelles</h3>
                                <p>
                                    Le traitement des données personnelles est effectué conformément
                                    à notre Politique de Confidentialité. Les données collectées sont
                                    nécessaires à la fourniture des services et ne sont jamais vendues
                                    à des tiers.
                                </p>

                                <h3>Article 11 - Loi applicable et juridiction</h3>
                                <p>
                                    Les présentes CGU sont soumises au droit français. En cas de litige,
                                    les parties s'efforceront de trouver une solution amiable. À défaut,
                                    les tribunaux de Paris seront seuls compétents.
                                </p>

                                <h3>Article 12 - Contact</h3>
                                <p>
                                    Pour toute question relative aux présentes CGU, vous pouvez nous
                                    contacter à l'adresse <a href="mailto:contact@cyna-it.fr">contact@cyna-it.fr</a>.
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
