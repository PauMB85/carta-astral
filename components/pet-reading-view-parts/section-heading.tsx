export function SectionHeading({ label }: { label: string }) {
  return (
    <h3 className="font-display mt-12 mb-4 pb-2 text-gold text-[10px] tracking-[0.45em] font-medium border-b border-b-gold-faint-15">
      {label}
    </h3>
  );
}
