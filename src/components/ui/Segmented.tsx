"use client";

interface Option<T extends string> {
  value: T;
  label: string;
}

interface Props<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  "aria-label"?: string;
}

/** Control segmentat în stil iOS (ca `UISegmentedControl`). */
export default function Segmented<T extends string>({
  options,
  value,
  onChange,
  "aria-label": ariaLabel,
}: Props<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="flex gap-0.5 rounded-ios-sm bg-ios-fill p-0.5"
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`flex-1 rounded-[8px] px-3 py-1.5 text-[13px] font-medium transition-colors ${
              active
                ? "bg-ios-card text-ios-label shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                : "text-ios-label-2"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
