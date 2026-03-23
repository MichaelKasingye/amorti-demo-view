
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calculator } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40">
      <div className="container px-4 sm:px-6 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium mb-4">
                For Financial professionals
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Close More Loans, Faster
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Rafiki Fanaka streamlines your entire loan process from lead to closing. Manage clients, track deals, calculate payments, and never miss a follow-up again.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {/* <Link to="/signup" className="inline-flex">
                <Button size="lg" className="px-8">
                  Start Free Trial
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link> */}
              {/* <Link to="/login" className="inline-flex">
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </Link> */}
            </div>
            {/* <p className="text-sm text-muted-foreground">
              No credit card required • 14-day free trial
            </p> */}
          </div>
          <div className="mx-auto aspect-video overflow-hidden rounded-xl border bg-slate-50 object-cover dark:bg-slate-900 lg:order-last">
            <div className="h-full w-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <div className="text-white text-center bg-black/20 backdrop-blur-sm w-full py-12">
                <Calculator className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Loan Management Dashboard</h3>
                <p>Complete visibility into your pipeline</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
