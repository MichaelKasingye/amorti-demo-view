
export const SolutionsSection = () => {
  return (
    <section id="solutions" className="w-full py-12 md:py-24 bg-muted/50">
      <div className="container px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Built for Your Industry
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            Whether you're a solo practitioner or part of a large financial institution
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold">Mortgage Brokers</h3>
            <p className="text-muted-foreground">Manage multiple lenders, track applications, and provide clients with real-time updates on their mortgage status.</p>
          </div>
          <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold">Loan Officers</h3>
            <p className="text-muted-foreground">Streamline your pipeline with automated follow-ups, document tracking, and instant amortization calculations.</p>
          </div>
          <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold">Financial Advisors</h3>
            <p className="text-muted-foreground">Enhance client relationships with comprehensive loan analysis and payment scenario modeling.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
