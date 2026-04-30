import { useCallback, useState } from "react";

interface CopyTokenProps {
  text: string;
  children: React.ReactNode;
}

export const CopyToken = ({ text, children }: CopyTokenProps) => {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard not available (insecure context or permission denied)
    }
  }, [text]);

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={copy}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && void copy()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={`Copiar: ${text}`}
      style={{
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "2px 6px",
        borderRadius: "4px",
        backgroundColor: hovered ? "rgba(11,16,159,0.07)" : "transparent",
        transition: "background-color 0.15s",
        userSelect: "none",
      }}
    >
      {children}
      <span
        style={{
          width: "16px",
          height: "16px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {!copied ? (
          <svg
            style={{ visibility: hovered ? "visible" : "hidden" }}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7C8096"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        ) : (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6BB70B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
    </span>
  );
};
