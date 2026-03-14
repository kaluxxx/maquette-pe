"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Clock,
  CheckCircle2,
  Inbox,
  Send,
  MailOpen,
  Archive,
} from "lucide-react";

// Mock messages data
const messages = [
  {
    id: "1",
    sender: "TechCorp",
    email: "contact@techcorp.fr",
    subject: "Question sur SOC Premium",
    message: "Bonjour, je souhaiterais avoir plus d'informations sur votre offre SOC Premium 24/7. Notamment concernant les delais de mise en place et les prerequis techniques. Merci d'avance pour votre reponse.",
    date: "Il y a 2h",
    fullDate: "8 janvier 2024 - 14:32",
    status: "unread",
    category: "commercial",
  },
  {
    id: "2",
    sender: "Startup.io",
    email: "dsi@startup.io",
    subject: "Demande de devis personnalise",
    message: "Nous sommes une startup de 50 personnes et nous cherchons une solution complete de cybersecurite. Pourriez-vous nous proposer un devis incluant EDR et SOC ?",
    date: "Il y a 5h",
    fullDate: "8 janvier 2024 - 11:45",
    status: "unread",
    category: "commercial",
  },
  {
    id: "3",
    sender: "Entreprise SA",
    email: "admin@entreprise.com",
    subject: "Probleme de connexion",
    message: "Je n'arrive pas a me connecter a mon espace client depuis ce matin. Le message d'erreur indique 'identifiants invalides' alors que je suis certain de mon mot de passe.",
    date: "Hier",
    fullDate: "7 janvier 2024 - 16:20",
    status: "read",
    category: "support",
  },
  {
    id: "4",
    sender: "Corp France",
    email: "security@corp.fr",
    subject: "Renouvellement abonnement",
    message: "Notre abonnement arrive a echeance le mois prochain. Nous souhaiterions discuter des conditions de renouvellement et eventuellement upgrader notre offre.",
    date: "Hier",
    fullDate: "7 janvier 2024 - 10:15",
    status: "treated",
    category: "commercial",
  },
  {
    id: "5",
    sender: "PME Solutions",
    email: "it@pme.fr",
    subject: "Documentation technique",
    message: "Pourriez-vous nous fournir la documentation technique de votre solution EDR Enterprise ? Nous avons besoin de ces informations pour notre equipe IT.",
    date: "3 jours",
    fullDate: "5 janvier 2024 - 09:00",
    status: "treated",
    category: "support",
  },
];

export default function AdminMessagesPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<typeof messages[0] | null>(null);

  const filteredMessages = messages.filter((msg) => {
    if (statusFilter === "all") return true;
    return msg.status === statusFilter;
  });

  const unreadCount = messages.filter((m) => m.status === "unread").length;
  const readCount = messages.filter((m) => m.status === "read").length;
  const treatedCount = messages.filter((m) => m.status === "treated").length;

  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  };

  return (
    <div className="p-6">
      {/* Header Card */}
      <Card className="bg-slate-900 border-0 text-white mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">Boite de reception</h1>
              <p className="text-slate-400">
                {unreadCount > 0 ? `${unreadCount} nouveau(x) message(s)` : "Aucun nouveau message"}
              </p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-400">{unreadCount}</p>
                <p className="text-xs text-slate-400">Non lus</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-400">{readCount}</p>
                <p className="text-xs text-slate-400">En attente</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-400">{treatedCount}</p>
                <p className="text-xs text-slate-400">Traites</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2">
          {/* Filters */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
                className="gap-2"
              >
                <Inbox className="h-4 w-4" />
                Tous
              </Button>
              <Button
                variant={statusFilter === "unread" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("unread")}
                className="gap-2"
              >
                <Mail className="h-4 w-4" />
                Non lus
                {unreadCount > 0 && (
                  <Badge className="bg-blue-500 text-white ml-1">{unreadCount}</Badge>
                )}
              </Button>
              <Button
                variant={statusFilter === "read" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("read")}
                className="gap-2"
              >
                <MailOpen className="h-4 w-4" />
                Lus
              </Button>
              <Button
                variant={statusFilter === "treated" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("treated")}
                className="gap-2"
              >
                <Archive className="h-4 w-4" />
                Traites
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-3">
            {filteredMessages.map((msg) => (
              <Card
                key={msg.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  msg.status === "unread" ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""
                } ${selectedMessage?.id === msg.id ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedMessage(msg)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className={`h-12 w-12 ${msg.status === "unread" ? "ring-2 ring-blue-500" : ""}`}>
                      <AvatarFallback className={`${
                        msg.status === "unread"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {getInitials(msg.sender)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <p className={`font-semibold ${msg.status === "unread" ? "text-foreground" : "text-muted-foreground"}`}>
                            {msg.sender}
                          </p>
                          {msg.status === "unread" && (
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                          )}
                          {msg.status === "treated" && (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {msg.date}
                        </span>
                      </div>
                      <p className={`text-sm mb-1 ${msg.status === "unread" ? "font-medium" : ""}`}>
                        {msg.subject}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-1">
          {selectedMessage ? (
            <Card className="sticky top-20">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(selectedMessage.sender)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{selectedMessage.sender}</CardTitle>
                      <p className="text-xs text-muted-foreground">{selectedMessage.email}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold mb-1">{selectedMessage.subject}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {selectedMessage.fullDate}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm leading-relaxed">{selectedMessage.message}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <Select defaultValue={selectedMessage.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unread">Non lu</SelectItem>
                      <SelectItem value="read">Lu</SelectItem>
                      <SelectItem value="treated">Traite</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="w-full gap-2">
                    <Send className="h-4 w-4" />
                    Repondre par email
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-muted-foreground">
                  Selectionnez un message pour le lire
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}