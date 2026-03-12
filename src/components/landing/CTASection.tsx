
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
      <div className="container px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Transform Your Loan Business?
            </h2>
            <p className="max-w-[900px] md:text-xl/relaxed opacity-90">
              Join thousands of financial professionals who trust Rafiki Fanaka to manage their loan pipeline and grow their business
            </p>
          </div>
          <div className="flex flex-col gap-4 min-[400px]:flex-row items-center">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="px-8">
                Start Your Free Trial
              </Button>
            </Link>
            <p className="text-sm opacity-80">14 days free • No setup fees • Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
};
