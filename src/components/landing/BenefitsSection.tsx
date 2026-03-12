
import { benefits } from "./constants";

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="w-full py-12 md:py-24 bg-muted/50">
      <div className="container px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Proven Results for Financial Professionals
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            Join thousands of loan officers, mortgage brokers, and financial advisors who've transformed their business
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-2 rounded-lg border bg-card p-8 shadow-sm">
              <div className="text-4xl font-bold text-primary">{benefit.stat}</div>
              <h3 className="text-lg font-bold">{benefit.label}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
