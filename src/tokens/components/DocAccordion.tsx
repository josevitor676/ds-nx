import { useState } from "react";

interface DocAccordionProps {
  label: string;
  subtitle?: string;
  preview?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const DocAccordion = ({
  label,
  subtitle,
  preview,
  children,
  defaultOpen = false,
}: DocAccordionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        border: "1px solid #DCDDE3",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "14px 16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7C8096"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            flexShrink: 0,
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span style={{ fontSize: "15px", fontWeight: 600, color: "#202125" }}>
          {label}
        </span>
        {subtitle && (
          <span style={{ fontSize: "13px", color: "#7C8096" }}>{subtitle}</span>
        )}
        {preview && <div style={{ marginLeft: "auto" }}>{preview}</div>}
      </button>

      {open && (
        <div style={{ borderTop: "1px solid #DCDDE3", padding: "12px 16px" }}>
          {children}
        </div>
      )}
    </div>
  );
};
