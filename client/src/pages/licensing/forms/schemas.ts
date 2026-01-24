import { z } from "zod";

// Shared Schemas
const addressSchema = z.object({
    section: z.string().optional(),
    lot: z.string().optional(),
    suburb: z.string().optional(),
    block: z.string().optional(),
    village: z.string().optional(),
    detail: z.string().optional(),
});

// 1. Barber's Shop Licence (Form 1)
export const barberShopSchema = z.object({
    applicantName: z.string().min(1, "Applicant name is required"),
    premisesAddress: addressSchema,
    floorSpace: z.string().min(1, "Floor space is required"),
    numberOfBarbers: z.coerce.number().min(0),
    numberOfChairs: z.coerce.number().min(0),
    numberOfWashBasins: z.coerce.number().min(0),
    hotWaterSupply: z.string().min(1, "Hot water supply details required"),
    customerGender: z.enum(["ladies", "gentlemen", "both"]),
    ladiesHairDryers: z.coerce.number().optional(),
    wavingMachines: z.coerce.number().optional(),
    date: z.string().optional(), // captured automatically
    signature: z.string().optional(), // simulated by submission
});

// 2. Dinner / Special Permit (Liquor)
export const dinnerSpecialPermitSchema = z.object({
    applicantName: z.string().min(1, "Applicant name is required"),
    premisesAddress: addressSchema,
    premisesName: z.string().min(1, "Premises name is required"),
    occasionDate: z.string().min(1, "Date of occasion is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    occasionPurpose: z.string().min(1, "Purpose is required"),
    companyName: z.string().optional(),
    companyNumber: z.string().optional(),
    nationality: z.string().optional(),
});

// 3. Cabaret Permit (Form 10)
export const cabaretPermitSchema = z.object({
    applicantName: z.string().min(1, "Applicant name is required"),
    currentLicenseType: z.enum(["publican", "restaurant", "tavern", "limited_hotel"]),
    premisesAddress: addressSchema,
    premisesName: z.string().min(1, "Premises name is required"),
    areaDescription: z.string().min(1, "Description of cabaret area required"),
});

// 4. Club License (Form 6)
export const clubLicenseSchema = z.object({
    applicantName: z.string().min(1, "Applicant name is required"),
    clubName: z.string().min(1, "Club name is required"),
    premisesAddress: addressSchema,
    knownAs: z.string().min(1, "Known as name required"),
    tradingHours: z.object({
        from: z.string().min(1, "Start time required"),
        to: z.string().min(1, "End time required"),
    }).optional(),
    numberOfMembers: z.coerce.number().min(0, "Number of members required"),
    attachments: z.object({
        namesList: z.any().optional(), // File object or URL
        constitution: z.any().optional(),
        resolution: z.any().optional(),
    }).optional(),
    officeUseOnly: z.object({
        applicationProcessing: z.object({
            dateOfPayment: z.string().optional(),
            officialRecNo: z.string().optional(),
            adminFee: z.string().optional(),
        }).optional(),
        licenseProcessing: z.object({
            dateOfPayment: z.string().optional(),
            licenseFee: z.string().optional(),
            officialRecNo: z.string().optional(),
            approvedRejected: z.enum(["Approved", "Rejected"]).optional(),
            meetingNo: z.string().optional(),
            date: z.string().optional(),
            licenseNo: z.string().optional(),
        }).optional(),
    }).optional(),
});

// Office Use Schema (Shared for reference)
export const officeUseSchema = z.object({
    applicationProcessing: z.object({
        dateOfPayment: z.string().optional(),
        officialRecNo: z.string().optional(),
        adminFee: z.string().optional(),
    }).optional(),
    licenseProcessing: z.object({
        dateOfPayment: z.string().optional(),
        licenseFee: z.string().optional(),
        officialRecNo: z.string().optional(),
        approvedRejected: z.enum(["Approved", "Rejected"]).optional(),
        meetingNo: z.string().optional(),
        date: z.string().optional(),
        licenseNo: z.string().optional(),
    }).optional(),
});

// 5. Publicans / Tavern / Limited Hotel (Combined)
export const publicansLicenseSchema = z.object({
    applicantName: z.string().min(1, "Applicant name is required"),
    licenseType: z.enum(["publicans", "tavern", "limited_hotel"]),
    premisesAddress: addressSchema,
    premisesName: z.string().min(1, "Premises name is required"),
    intentionToApply: z.string().optional(), // "notice that..."
});

// 6. Application to Trade (Form 1)
export const tradeLicenseSchema = z.object({
    applicationType: z.enum(["new", "transfer", "additional_activity"]),
    applicantName: z.string().min(1, "Applicant name is required"),
    tradingName: z.string().min(1, "Trading name is required"),
    premisesAddress: addressSchema,
    businessActivity: z.string().min(1, "Description of activity is required"),
    managerName: z.string().optional(),
    attachments: z.object({
        certificateOfIncorporation: z.any().optional(),
        companyExtract: z.any().optional(),
        businessNameRegistration: z.any().optional(),
        landTitle: z.any().optional(),
        landTaxReceipt: z.any().optional(),
        physicalPlanningApproval: z.any().optional(),
        buildingAuthorityApproval: z.any().optional(),
        foreignEnterpriseCertificate: z.any().optional(),
        previousLicense: z.any().optional(),
    }).optional(),
});

// 7. Storekeeper's License (Form 3)
export const storekeeperSchema = z.object({
    applicantName: z.string().min(1, "Applicant name is required"),
    tradingName: z.string().min(1, "Trading name is required"),
    storageAddress: addressSchema,
    goodsDescription: z.string().min(1, "Description of goods is required"),
    periodAppliedFor: z.enum(["One Year", "Three Years", "Five Years"]),
});

// 8. Second-Hand Dealer / Fumigator (Form 5)
export const secondHandDealerSchema = z.object({
    applicantName: z.string().min(1, "Applicant name is required"),
    tradingName: z.string().min(1, "Trading name is required"),
    premisesAddress: addressSchema,
    goodsClasses: z.string().min(1, "Class of goods required (e.g. scrap metal, furniture)"),
    fumigatorName: z.string().optional(), // If fumigation required
    fumigationMethod: z.string().optional(),
});

// 9. Restaurant License (Form 7)
export const restaurantLicenseSchema = z.object({
    applicantName: z.string().min(1, "Applicant name is required"),
    tradingName: z.string().min(1, "Trading name is required"),
    premisesAddress: addressSchema,
    seatingCapacity: z.coerce.number().min(1, "Seating capacity is required"),
    sanitaryFacilities: z.string().min(1, "Description of sanitary facilities is required"),
    haccpPlanRef: z.string().optional(), // Reference no. or description
    menuDescription: z.string().optional(),
});

// 10. Bottle Shop License (Form 12)
export const bottleShopSchema = z.object({
    applicantName: z.string().min(1, "Applicant name is required"),
    tradingName: z.string().min(1, "Trading name is required"),
    premisesAddress: addressSchema,
    liquorLicenseNo: z.string().optional(),
    liquorTypes: z.string().min(1, "Types of liquor sold required"),
    securityMeasures: z.string().min(1, "Security measures description required"),
    managerName: z.string().optional(),
});

// 11. Electronic Shop License (Form 1)
export const electronicShopSchema = z.object({
    applicantName: z.string().min(1, "Applicant name is required"),
    tradingName: z.string().min(1, "Trading name is required"),
    premisesAddress: addressSchema,
    businessActivity: z.string().min(1, "Description of activity is required"),
    radioLicenseNo: z.string().optional().describe("Radio communication Apparatus License No."),
    managerName: z.string().optional(),
});
