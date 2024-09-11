<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
  {[...Array(4)].map((_, index) => (
    <div
      key={index}
      className="rounded-lg border bg-background p-4 animate-pulse"
    >
      <div className="mb-4 h-6 w-full rounded-md bg-muted" />
      {[...Array(3)].map((_, index) => (
        <div key={index} className="mb-4 h-12 w-full rounded-md bg-muted" />
      ))}
    </div>
  ))}
</div>;
