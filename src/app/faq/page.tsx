"use client";

import {useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent} from "@/components/ui/card";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion";
import {Footer} from "@/components/layout/footer";
import {CreditCard, HelpCircle, MessageSquare, Search, Settings, Shield,} from "lucide-react";

// FAQ Categories
const faqCategories = [
    {
        id: "general",
        label: "Général",
        icon: HelpCircle,
        questions: [
            {
                question: "Qu'est-ce que Cyna-IT ?",
                answer: "Cyna-IT est une plateforme de solutions de cybersécurité B2B proposant des services SaaS tels que SOC, EDR, SIEM et bien d'autres. Nous aidons les entreprises à protéger leurs infrastructures contre les menaces informatiques.",
            },
            {
                question: "À qui s'adressent vos services ?",
                answer: "Nos services s'adressent aux entreprises de toutes tailles : PME, ETI et grands comptes. Nous proposons des offres adaptées à chaque besoin et budget.",
            },
            {
                question: "Comment puis-je vous contacter ?",
                answer: "Vous pouvez nous contacter via notre formulaire de contact, par email à contact@cyna-it.fr ou par téléphone au +33 1 23 45 67 89. Notre équipe support est disponible du lundi au vendredi de 9h à 18h.",
            },
        ],
    },
    {
        id: "security",
        label: "Sécurité",
        icon: Shield,
        questions: [
            {
                question: "Mes données sont-elles sécurisées ?",
                answer: "Absolument. Nous utilisons un chiffrement de bout en bout pour toutes les données. Nos infrastructures sont hébergées dans des datacenters certifiés ISO 27001 en France, garantissant la conformité RGPD.",
            },
            {
                question: "Qu'est-ce qu'un SOC ?",
                answer: "Un SOC (Security Operations Center) est un centre de surveillance de la sécurité. Il monitore en temps réel votre infrastructure pour détecter et répondre aux menaces. Notre SOC Premium fonctionne 24h/24, 7j/7.",
            },
            {
                question: "Qu'est-ce qu'un EDR ?",
                answer: "EDR (Endpoint Detection and Response) est une solution de sécurité qui surveille et protège les terminaux (ordinateurs, serveurs) contre les menaces avancées. Il permet de détecter, analyser et neutraliser les attaques en temps réel.",
            },
            {
                question: "Proposez-vous des audits de sécurité ?",
                answer: "Oui, nous proposons des services d'audit et de pentesting pour évaluer la sécurité de vos systèmes. Nos experts certifiés identifient les vulnérabilités et vous fournissent un rapport détaillé avec des recommandations.",
            },
        ],
    },
    {
        id: "billing",
        label: "Facturation",
        icon: CreditCard,
        questions: [
            {
                question: "Quels sont les modes de paiement acceptés ?",
                answer: "Nous acceptons les cartes bancaires Visa et Mastercard. Le paiement est sécurisé via Stripe, leader mondial du paiement en ligne.",
            },
            {
                question: "Puis-je payer mensuellement ou annuellement ?",
                answer: "Oui, nous proposons deux options de facturation : mensuelle ou annuelle. L'abonnement annuel vous permet de bénéficier d'une réduction significative (généralement 2 mois offerts).",
            },
            {
                question: "Comment obtenir une facture ?",
                answer: "Toutes vos factures sont disponibles dans votre espace client, section 'Mes commandes'. Vous pouvez également accéder aux reçus Stripe directement depuis cette interface.",
            },
            {
                question: "Quelle est votre politique de remboursement ?",
                answer: "Nous offrons une garantie satisfait ou remboursé de 14 jours pour tous nos services. Si vous n'êtes pas satisfait, contactez notre support pour obtenir un remboursement intégral.",
            },
        ],
    },
    {
        id: "account",
        label: "Mon compte",
        icon: Settings,
        questions: [
            {
                question: "Comment créer un compte ?",
                answer: "Cliquez sur 'S'inscrire' en haut de la page, remplissez le formulaire avec vos informations et validez votre email. Votre compte sera actif immédiatement après la validation.",
            },
            {
                question: "Comment modifier mes informations personnelles ?",
                answer: "Connectez-vous à votre espace client et accédez à la section 'Mon profil'. Vous pourrez y modifier vos informations de contact, votre adresse de facturation et votre mot de passe.",
            },
            {
                question: "Comment résilier un abonnement ?",
                answer: "Vous pouvez résilier votre abonnement depuis votre espace client, section 'Mes abonnements'. La résiliation prendra effet à la fin de la période de facturation en cours.",
            },
            {
                question: "J'ai oublié mon mot de passe, que faire ?",
                answer: "Cliquez sur 'Mot de passe oublié' sur la page de connexion. Entrez votre email et vous recevrez un lien pour réinitialiser votre mot de passe.",
            },
        ],
    },
];

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    // Filter questions based on search and category
    const filteredCategories = faqCategories
        .map((category) => ({
            ...category,
            questions: category.questions.filter(
                (q) =>
                    (activeCategory === "all" || category.id === activeCategory) &&
                    (searchQuery === "" ||
                        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        q.answer.toLowerCase().includes(searchQuery.toLowerCase()))
            ),
        }))
        .filter((category) => category.questions.length > 0);

    const totalQuestions = filteredCategories.reduce(
        (acc, cat) => acc + cat.questions.length,
        0
    );

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-16">
                <div className="container">
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            Comment pouvons-nous vous aider ?
                        </h1>
                        <p className="text-slate-400 mb-8">
                            Trouvez rapidement les réponses à vos questions
                        </p>
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"/>
                            <Input
                                placeholder="Rechercher une question..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="container py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Categories */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <Card className="sticky top-24">
                            <CardContent className="p-4">
                                <h3 className="font-semibold mb-4">Catégories</h3>
                                <div className="space-y-1">
                                    <button
                                        onClick={() => setActiveCategory("all")}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                                            activeCategory === "all"
                                                ? "bg-primary text-white"
                                                : "text-slate-600 hover:bg-slate-100"
                                        }`}
                                    >
                                        <HelpCircle className="h-5 w-5"/>
                                        <span className="font-medium">Toutes</span>
                                    </button>
                                    {faqCategories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => setActiveCategory(category.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                                                activeCategory === category.id
                                                    ? "bg-primary text-white"
                                                    : "text-slate-600 hover:bg-slate-100"
                                            }`}
                                        >
                                            <category.icon className="h-5 w-5"/>
                                            <span className="font-medium">{category.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* FAQ Content */}
                    <main className="flex-1">
                        {searchQuery && (
                            <p className="text-muted-foreground mb-6">
                                {totalQuestions} résultat{totalQuestions > 1 ? "s" : ""} pour "{searchQuery}"
                            </p>
                        )}

                        {filteredCategories.length > 0 ? (
                            <div className="space-y-8">
                                {filteredCategories.map((category) => (
                                    <div key={category.id}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div
                                                className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                <category.icon className="h-5 w-5 text-primary"/>
                                            </div>
                                            <h2 className="text-xl font-bold">{category.label}</h2>
                                        </div>
                                        <Card>
                                            <CardContent className="p-0">
                                                <Accordion type="single" collapsible className="w-full">
                                                    {category.questions.map((item, index) => (
                                                        <AccordionItem
                                                            key={index}
                                                            value={`${category.id}-${index}`}
                                                            className="border-b last:border-0"
                                                        >
                                                            <AccordionTrigger
                                                                className="px-6 py-4 hover:no-underline hover:bg-slate-50">
                                <span className="text-left font-medium">
                                  {item.question}
                                </span>
                                                            </AccordionTrigger>
                                                            <AccordionContent
                                                                className="px-6 pb-4 text-muted-foreground">
                                                                {item.answer}
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    ))}
                                                </Accordion>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="py-16 text-center">
                                    <div
                                        className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                                        <Search className="h-8 w-8 text-slate-400"/>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">Aucun résultat</h3>
                                    <p className="text-muted-foreground mb-6">
                                        Aucune question ne correspond à votre recherche
                                    </p>
                                    <Button variant="outline" onClick={() => setSearchQuery("")}>
                                        Effacer la recherche
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Contact CTA */}
                        <Card className="mt-8 bg-slate-900 border-0 text-white">
                            <CardContent className="p-8 text-center">
                                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-primary"/>
                                <h3 className="text-xl font-bold mb-2">
                                    Vous n'avez pas trouvé votre réponse ?
                                </h3>
                                <p className="text-slate-400 mb-6">
                                    Notre équipe support est disponible pour vous aider
                                </p>
                                <Button asChild className="bg-white text-slate-900 hover:bg-white/90">
                                    <Link href="/contact">Nous contacter</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </div>

            <Footer/>
        </div>
    );
}
