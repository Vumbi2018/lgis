import { forwardRef } from "react";
import { format } from "date-fns";
import { Watermark, MicrotextBorder, VerificationQR, GuillochePattern } from "./SecurityFeatures";

interface LicenseCertificateProps {
  license: any;
  service: any;
  request: any;
  inspectorSignature?: string | null;
  townClerkSignature?: string | null;
}

export const LicenseCertificate = forwardRef<HTMLDivElement, LicenseCertificateProps>(
  ({ license, service, request, inspectorSignature, townClerkSignature }, ref) => {
    if (!license) return null;

    return (
      <div ref={ref} className="w-[210mm] h-[297mm] bg-[#fdfbf7] text-black relative shadow-lg print:shadow-none print:w-full print:h-full overflow-hidden">

        {/* Security Layers */}
        <Watermark />
        <GuillochePattern />
        <MicrotextBorder />

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col p-16">

          {/* Header */}
          <div className="text-center space-y-6 mt-4">
            <div className="flex justify-center mb-6">
              <img src="/assets/ncdc_logo.png" alt="NCDC Logo" className="w-32 h-auto drop-shadow-sm" />
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-serif font-black uppercase tracking-widest text-[#1a237e] text-shadow-sm">
                National Capital District
              </h1>
              <h2 className="text-2xl font-serif font-bold uppercase tracking-[0.3em] text-[#1a237e]">
                Commission
              </h2>
            </div>

            <div className="w-full flex items-center justify-center gap-4 py-8">
              <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
              <div className="px-6 py-2 border-y-2 border-[#d4af37] bg-white/50 backdrop-blur-sm">
                <h3 className="text-4xl font-serif font-bold text-[#d4af37] uppercase tracking-wide">
                  Trading License
                </h3>
              </div>
              <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            </div>
          </div>

          {/* Main Body */}
          <div className="flex-1 space-y-10 px-8 py-8 text-center">
            <div className="space-y-4">
              <p className="text-lg italic font-serif text-slate-600">This is to officially certify that</p>
              <div className="relative inline-block min-w-[400px]">
                <h4 className="text-4xl font-serif font-bold text-[#1a237e] px-8 py-2 border-b-2 border-dotted border-[#1a237e]/30">
                  {request?.formData?.tradingName || request?.formData?.applicantName || "Unknown Applicant"}
                </h4>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-lg italic font-serif text-slate-600">has been granted a license to operate as</p>
              <h5 className="text-2xl font-bold uppercase tracking-wide text-slate-800">
                {service?.name || "General Trading"}
              </h5>
            </div>

            <div className="space-y-4">
              <p className="text-lg italic font-serif text-slate-600">at the premises located at</p>
              <p className="text-xl font-medium text-slate-900 max-w-2xl mx-auto leading-relaxed">
                {request?.formData?.premisesAddress
                  ? (typeof request.formData.premisesAddress === 'object'
                    ? `${request.formData.premisesAddress.section ? 'Sec ' + request.formData.premisesAddress.section : ''} ${request.formData.premisesAddress.lot ? 'Lot ' + request.formData.premisesAddress.lot : ''} ${request.formData.premisesAddress.suburb || ''}`
                    : request.formData.premisesAddress)
                  : "Not Specified"}
              </p>
            </div>
          </div>

          {/* License Details Table */}
          <div className="mx-12 mb-12 border-2 border-[#1a237e]/10 rounded-lg p-6 bg-white/40 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-y-6 gap-x-12">
              <div className="flex flex-col border-r border-[#1a237e]/10 pr-6">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">License Number</span>
                <span className="font-mono text-2xl font-bold text-[#1a237e]">{license.licenceNo}</span>
              </div>
              <div className="flex flex-col pl-6">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Payment Status</span>
                <span className="font-mono text-2xl font-bold text-green-700">PAID & VERIFIED</span>
              </div>
              <div className="flex flex-col border-r border-[#1a237e]/10 pr-6">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Issue Date</span>
                <span className="font-serif text-xl font-bold text-slate-900">{format(new Date(license.issueDate), 'dd MMMM yyyy')}</span>
              </div>
              <div className="flex flex-col pl-6">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Valid Until</span>
                <span className="font-serif text-xl font-bold text-slate-900">{format(new Date(license.expiryDate), 'dd MMMM yyyy')}</span>
              </div>
            </div>
          </div>

          {/* Footer / Signatures */}
          <div className="relative flex justify-between items-end px-4 mt-auto mb-16">
            {/* Inspector */}
            <div className="flex flex-col items-center w-48">
              <div className="h-20 w-full border-b-2 border-slate-900 mb-2 flex items-end justify-center pb-1">
                {inspectorSignature ? (
                  <img src={inspectorSignature} alt="Inspector Sig" className="max-h-16 object-contain" />
                ) : (
                  <span className="font-handwriting text-2xl text-blue-900 italic transform -rotate-2 opacity-50">Signed</span>
                )}
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900">Chief Inspector</p>
              <p className="text-[10px] text-slate-500 uppercase">Regulatory Services</p>
            </div>

            {/* Official Seal */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-12">
              <img src="/assets/official_seal.png" alt="Official Seal" className="w-40 h-40 opacity-90 drop-shadow-md transform rotate-[-5deg]" />
            </div>

            {/* Town Clerk */}
            <div className="flex flex-col items-center w-48">
              <div className="h-20 w-full border-b-2 border-slate-900 mb-2 flex items-end justify-center pb-1">
                {townClerkSignature ? (
                  <img src={townClerkSignature} alt="Town Clerk Sig" className="max-h-16 object-contain" />
                ) : (
                  <span className="font-handwriting text-2xl text-blue-900 italic transform -rotate-2 opacity-50">Signed</span>
                )}
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900">City Manager</p>
              <p className="text-[10px] text-slate-500 uppercase">National Capital District</p>
            </div>
          </div>

          {/* Verification QR */}
          <VerificationQR value={`${typeof window !== 'undefined' ? window.location.origin : 'https://portal.ncdc.gov.pg'}/verify/${license.licenceNo}`} />

          <div className="absolute bottom-4 left-0 w-full text-center">
            <p className="text-[8px] text-slate-400 uppercase tracking-[0.2em]">
              This document is a generated digital record • {license.licenceId}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

LicenseCertificate.displayName = "LicenseCertificate";
