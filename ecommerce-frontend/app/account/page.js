import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, User, Sparkles, Heart, Package, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AccountPage() {
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
              <div className="absolute top-0 right-1/4 w-64 h-64 bg-primary-600 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary-400 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full mb-6 shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>

              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Coming Soon</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                My Account
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                We're building a comprehensive account management system for you. 
                Soon you'll be able to manage your profile, orders, and preferences all in one place.
              </p>

              {/* Feature preview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
                <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg">
                  <Package className="w-8 h-8 text-primary-600" />
                  <h3 className="font-semibold text-gray-900">Order History</h3>
                  <p className="text-sm text-gray-600 text-center">Track all your orders</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg">
                  <Heart className="w-8 h-8 text-primary-600" />
                  <h3 className="font-semibold text-gray-900">Wishlist</h3>
                  <p className="text-sm text-gray-600 text-center">Save your favorites</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg">
                  <Settings className="w-8 h-8 text-primary-600" />
                  <h3 className="font-semibold text-gray-900">Preferences</h3>
                  <p className="text-sm text-gray-600 text-center">Customize your experience</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/products">
                    Browse Products
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
                  Want to be notified when this feature launches? Stay tuned for updates!
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

