import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Grid, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Card className="text-center overflow-hidden">
          <CardContent className="pt-16 pb-16">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-600 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary-400 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full mb-6 shadow-lg">
                <Grid className="w-10 h-10 text-white" />
              </div>

              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Coming Soon</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Categories
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                We're working hard to bring you an amazing category browsing experience. 
                Browse products organized by your interests, all in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/products">
                    Browse All Products
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/">
                    Back to Home
                  </Link>
                </Button>
              </div>

              <div className="mt-12 pt-8 border-t">
                <p className="text-sm text-gray-500">
                  Stay tuned for updates! We'll notify you when this feature launches.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

