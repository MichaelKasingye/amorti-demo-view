
import { features } from "./constants";

export const FeaturesSection = () => {
  return (
    <section id="features" className="w-full py-12 md:py-24">
      <div className="container px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need to Scale Your Business
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Purpose-built for financial professionals who want to close more deals and deliver exceptional client experiences
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, i) => {
            const IconComponent = feature.icon;
            return (
              <div key={i} className="group relative flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
