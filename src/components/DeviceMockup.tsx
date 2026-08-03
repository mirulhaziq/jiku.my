export function DeviceMockup({
  variant,
  children,
}: {
  variant: 'laptop' | 'phone' | 'both';
  children?: React.ReactNode;
}) {
  const Laptop = (
    <div className="relative w-full aspect-[16/10] rounded-t-xl bg-card border border-border shadow-lg overflow-hidden">
      <div className="absolute inset-0 grid place-items-center text-muted text-sm">
        {children ?? 'Coming soon'}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-border rounded-b-xl" />
    </div>
  );
  const Phone = (
    <div className="relative w-[28%] aspect-[9/19] rounded-2xl bg-card border border-border shadow-xl overflow-hidden">
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-14 h-4 rounded-full bg-black/60" />
      <div className="absolute inset-0 grid place-items-center text-muted text-xs pt-6">
        {children ?? 'Coming soon'}
      </div>
    </div>
  );

  if (variant === 'laptop') return <div className="w-full">{Laptop}</div>;
  if (variant === 'phone') return <div className="flex justify-center">{Phone}</div>;
  return (
    <div className="relative w-full">
      {Laptop}
      <div className="absolute -bottom-6 right-4">{Phone}</div>
    </div>
  );
}
