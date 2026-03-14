import Link from "next/link";
import { Shield, Linkedin, Twitter, Github } from "lucide-react";

const footerLinks = {
  solutions: [
    { name: "SOC as a Service", href: "/categories/soc" },
    { name: "EDR Solutions", href: "/categories/edr" },
    { name: "XDR Platform", href: "/categories/xdr" },
    { name: "Threat Intelligence", href: "/categories/threat-intelligence" },
  ],
  support: [
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Mentions légales", href: "/legal/mentions" },
    { name: "CGU", href: "/legal/cgu" },
    { name: "Politique de confidentialité", href: "/legal/privacy" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "GitHub", href: "https://github.com", icon: Github },
];

export function Footer() {
  return (
    <footer className="border-t bg-slate-900 text-slate-100">
      {/* Desktop Footer - Hidden on mobile */}
      <div className="hidden md:block">
        <div className="container py-12">
          <div className="grid grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">Cyna-IT</span>
              </Link>
              <p className="text-sm text-slate-400 mb-4">
                Solutions de cybersécurité SaaS pour les entreprises.
                Protégez votre infrastructure avec nos outils de pointe.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-primary transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2">
                {footerLinks.solutions.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">Légal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800">
          <div className="container py-4">
            <p className="text-sm text-slate-400 text-center">
              © {new Date().getFullYear()} Cyna-IT. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Footer - Minimal */}
      <div className="md:hidden">
        <div className="container py-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold">Cyna-IT</span>
          </div>
          <p className="text-xs text-slate-400 text-center">
            © {new Date().getFullYear()} Cyna-IT. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
