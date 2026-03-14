import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  image: string;
  category: string;
  isAvailable: boolean;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact";
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  if (variant === "compact") {
    return (
      <Card className="group overflow-hidden transition-all hover:shadow-lg p-0">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            {!product.isAvailable && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <Badge variant="secondary">Indisponible</Badge>
              </div>
            )}
            {product.isNew && product.isAvailable && (
              <Badge className="absolute top-2 left-2">Nouveau</Badge>
            )}
          </div>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
            <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-primary font-medium mt-1">
              {formatPrice(product.price.monthly)}/mois
            </p>
          </CardContent>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg p-0">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {!product.isAvailable && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="secondary">Indisponible</Badge>
            </div>
          )}
          {product.isNew && product.isAvailable && (
            <Badge className="absolute top-2 left-2">Nouveau</Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price.monthly)}
          </span>
          <span className="text-sm text-muted-foreground">/mois</span>
        </div>
        <p className="text-xs text-muted-foreground">
          ou {formatPrice(product.price.yearly)}/an
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full gap-2" disabled={!product.isAvailable}>
          <ShoppingCart className="h-4 w-4" />
          {product.isAvailable ? "Ajouter au panier" : "Indisponible"}
        </Button>
      </CardFooter>
    </Card>
  );
}
