import React from 'react';
import QRCode from "react-qr-code";

export const Watermark = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03]">
        <img
            src="/assets/ncdc_logo.png"
            alt="Watermark"
            className="w-[500px] h-[500px] object-contain grayscale"
        />
    </div>
);

export const MicrotextBorder = () => (
    <div className="absolute inset-2 border-[1px] border-transparent overflow-hidden pointer-events-none z-0">
        <svg width="100%" height="100%">
            <defs>
                <pattern id="microtext" x="0" y="0" width="100%" height="100%" patternUnits="userSpaceOnUse">
                    <text x="0" y="10" fontSize="5" fill="#d4af37" fontFamily="monospace" letterSpacing="1">
                        NATIONAL CAPITAL DISTRICT COMMISSION OFFICIAL DOCUMENT •
                    </text>
                </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#d4af37" strokeWidth="1" strokeDasharray="2,2" />
            {/* Note: True microtext needs complex SVG path text which is heavy. Using a fine dashed border as a lightweight representation for now, or we can try a repeating background text. */}
        </svg>
        <div className="absolute top-0 w-full text-[4px] text-[#d4af37] whitespace-nowrap overflow-hidden text-center opacity-50 select-none">
            {[...Array(50)].map((_, i) => <span key={i}>NATIONAL CAPITAL DISTRICT COMMISSION • </span>)}
        </div>
        <div className="absolute bottom-0 w-full text-[4px] text-[#d4af37] whitespace-nowrap overflow-hidden text-center opacity-50 select-none">
            {[...Array(50)].map((_, i) => <span key={i}>NATIONAL CAPITAL DISTRICT COMMISSION • </span>)}
        </div>
        <div className="absolute left-0 h-full w-[4px] flex flex-col items-center overflow-hidden opacity-50 select-none">
            <div className="rotate-90 origin-left whitespace-nowrap text-[4px] text-[#d4af37]">
                {[...Array(30)].map((_, i) => <span key={i}>NATIONAL CAPITAL DISTRICT COMMISSION • </span>)}
            </div>
        </div>
        <div className="absolute right-0 h-full w-[4px] flex flex-col items-center overflow-hidden opacity-50 select-none">
            <div className="-rotate-90 origin-right whitespace-nowrap text-[4px] text-[#d4af37]">
                {[...Array(30)].map((_, i) => <span key={i}>NATIONAL CAPITAL DISTRICT COMMISSION • </span>)}
            </div>
        </div>
    </div>
);

export const VerificationQR = ({ value }: { value: string }) => (
    <div className="absolute bottom-16 left-12">
        <div className="bg-white p-2 border border-slate-200">
            <QRCode value={value} size={64} viewBox={`0 0 256 256`} />
        </div>
        <p className="text-[8px] text-slate-500 mt-1 font-mono tracking-widest text-center">SCAN TO VERIFY</p>
    </div>
);

export const GuillochePattern = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="guilloche" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M0 50 Q 25 25 50 50 T 100 50" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                    <path d="M0 50 Q 25 75 50 50 T 100 50" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#guilloche)" />
        </svg>
    </div>
);
