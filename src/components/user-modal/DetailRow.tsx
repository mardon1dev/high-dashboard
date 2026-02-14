interface DetailRowProps {
  label: string;
  value: string;
  isBadge?: boolean;
  isRiskScore?: boolean;
}

export function DetailRow({ label, value, isBadge, isRiskScore }: DetailRowProps) {
  const score = isRiskScore ? parseInt(value, 10) : 0;
  const riskColor =
    isRiskScore && !isNaN(score)
      ? score >= 70
        ? "text-red-600"
        : score >= 40
          ? "text-dashboard-orange"
          : "text-dashboard-green"
      : "";

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-tighter text-slate-400">
        {label}
      </p>
      {isBadge ? (
        <span className="mt-1 inline-block rounded bg-blue-50 px-2 py-1 text-xs font-bold uppercase text-dashboard-green">
          {value}
        </span>
      ) : isRiskScore ? (
        <p className={`mt-1 font-mono font-semibold ${riskColor}`}>{value}</p>
      ) : (
        <p className="mt-1 font-medium text-slate-700">{value}</p>
      )}
    </div>
  );
}
