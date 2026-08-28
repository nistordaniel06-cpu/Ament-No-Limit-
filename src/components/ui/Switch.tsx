"use client";

interface Props {
  checked: boolean;
  onChange: (v: boolean) => void;
  id?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

/** Comutator în stil iOS (ca `UISwitch`). */
export default function Switch({
  checked,
  onChange,
  id,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
}: Props) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-[31px] w-[51px] shrink-0 items-center rounded-full transition-colors duration-200 ${
        checked ? "bg-ios-green" : "bg-[#e9e9ea]"
      }`}
    >
      <span
        className={`inline-block h-[27px] w-[27px] rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.25)] transition-transform duration-200 ${
          checked ? "translate-x-[22px]" : "translate-x-[2px]"
        }`}
      />
    </button>
  );
}
