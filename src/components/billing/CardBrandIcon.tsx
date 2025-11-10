import { CreditCard } from "lucide-react";

interface CardBrandIconProps {
  brand: string;
  className?: string;
}

export function CardBrandIcon({ brand, className = "" }: CardBrandIconProps) {
  const brandLower = brand.toLowerCase();
  
  // SVG brand logos
  const brandIcons: Record<string, JSX.Element> = {
    visa: (
      <svg viewBox="0 0 48 32" className="w-full h-full">
        <rect width="48" height="32" rx="4" fill="white"/>
        <path d="M19.5 10h3.2l-2 12h-3.2l2-12zm11.6 7.7l1.7-4.7.9 4.7h-2.6zm3.6 4.3h2.9l-2.5-12h-2.7c-.6 0-1.1.3-1.3.9l-4.6 11.1h3.4l.7-1.9h4.1v1.9zm-9.7-4c0-3.2-4.4-3.4-4.4-4.8 0-.4.4-.9 1.3-.9.7-.1 1.9.1 2.7.6l.5-2.3c-.7-.3-1.6-.5-2.7-.5-2.9 0-4.9 1.5-4.9 3.7 0 1.6 1.4 2.5 2.5 3 1.1.6 1.5.9 1.5 1.4 0 .7-.9 1.1-1.7 1.1-1.4 0-2.2-.2-3.4-.7l-.6 2.4c.8.3 2.2.6 3.7.6 3.1.1 5.1-1.5 5.1-3.8l.4.2zm-12.1-7.9l-5 12h-3.4L1.7 11.8c-.2-.7-.3-1-1-1.3C.2 10.3-.7 10-.7 10l.1-.4h5.2c.7 0 1.3.4 1.4 1.2l1.3 7 3.2-8.2 3.4.1z" fill="#1434CB"/>
      </svg>
    ),
    mastercard: (
      <svg viewBox="0 0 48 32" className="w-full h-full">
        <rect width="48" height="32" rx="4" fill="white"/>
        <circle cx="18" cy="16" r="9" fill="#EB001B"/>
        <circle cx="30" cy="16" r="9" fill="#F79E1B"/>
        <path d="M24 9.3c-1.7 1.4-2.8 3.6-2.8 6s1.1 4.6 2.8 6c1.7-1.4 2.8-3.6 2.8-6s-1.1-4.6-2.8-6z" fill="#FF5F00"/>
      </svg>
    ),
    amex: (
      <svg viewBox="0 0 48 32" className="w-full h-full">
        <rect width="48" height="32" rx="4" fill="#006FCF"/>
        <path d="M9.5 18.2l-.9-2.2h-2l-.9 2.2H4.5L7.4 11h1.4l2.9 7.2h-2.2zm-.8-3.6l-.6-1.5-.6 1.5h1.2zM16 18.2V11h3.2l1.5 5.3 1.4-5.3H25v7.2h-1.7v-5.6l-1.7 5.6h-1.2l-1.7-5.6v5.6H16zm11.5 0V11h5.8v1.5h-4v1.4h3.9v1.5h-3.9v1.4h4v1.5h-5.8zm9.8 0l-2.2-3.1-1.7 2v1.1h-1.8V11h1.8v3.1l3.7-3.1h2.2l-3.3 3.2 3.5 4h-2.2z" fill="white"/>
      </svg>
    ),
    discover: (
      <svg viewBox="0 0 48 32" className="w-full h-full">
        <rect width="48" height="32" rx="4" fill="white"/>
        <path d="M48 16c0 8.8-7.2 16-16 16H16C7.2 32 0 24.8 0 16S7.2 0 16 0h16c8.8 0 16 7.2 16 16z" fill="#FF6000"/>
        <path d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16" fill="#F47216"/>
        <text x="8" y="20" fill="white" fontSize="8" fontWeight="bold">DISCOVER</text>
      </svg>
    )
  };

  return (
    <div className={`w-10 h-7 border border-border rounded flex items-center justify-center bg-white overflow-hidden ${className}`}>
      {brandIcons[brandLower] || <CreditCard className="h-5 w-5 text-muted-foreground" />}
    </div>
  );
}
