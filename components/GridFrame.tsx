function Plus({ className }: { className: string }) {
  return (
    <span aria-hidden className={`absolute h-[11px] w-[11px] ${className}`}>
      <span
        className="absolute left-0 top-1/2 h-px w-full"
        style={{ background: "var(--text-muted)" }}
      />
      <span
        className="absolute left-1/2 top-0 h-full w-px"
        style={{ background: "var(--text-muted)" }}
      />
    </span>
  );
}

export default function GridFrame() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--border)" }}
      />
      <div className="relative mx-auto h-full max-w-6xl">
        <div
          className="absolute inset-y-0 left-0 w-px"
          style={{ background: "var(--border)" }}
        />
        <div
          className="absolute inset-y-0 right-0 w-px"
          style={{ background: "var(--border)" }}
        />
        <Plus className="-left-[5px] -top-[5px]" />
        <Plus className="-right-[5px] -top-[5px]" />
      </div>
    </div>
  );
}
