import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  productCount: number;
}

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:border-primary/50 p-0">
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-slate-300 mt-1 line-clamp-2">
              {category.description}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-slate-400">
                {category.productCount} solution{category.productCount > 1 ? "s" : ""}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
