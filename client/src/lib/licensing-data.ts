import { FileText, Shield, Zap, Wrench, Car, Factory, Coffee, Tv, Scissors, Wine, Hotel, Anchor, Utensils, ShoppingBag, Store, Users, Truck } from "lucide-react";

export type ChecklistItem = {
  id: string;
  label: string;
  responsible: "Applicant" | "NCDC" | "IPA" | "Landlord" | "Department of Health" | "Labour Department" | "Justice of Peace" | "Traffic Police" | "IRC/Customs" | "Maritime Authority";
  required: boolean;
  note?: string;
};

export type LicenseType = {
  id: string;
  name: string;
  category: "Trading" | "Liquor" | "Industrial" | "Health" | "Transport";
  icon: any;
  formType: "Form 1" | "Form 3" | "Form 4" | "Form 5" | "Form 6" | "Form 7" | "Form 12";
  checklist: ChecklistItem[];
};

const COMMON_REQUIREMENTS: ChecklistItem[] = [
  { id: "physical_planning", label: "Physical Planning Approvals", responsible: "NCDC", required: true, note: "If land use changes" },
  { id: "building_authority", label: "Building Authority Approvals", responsible: "NCDC", required: true, note: "If structural changes occur" },
  { id: "land_title", label: "Land Title / Lease Agreement", responsible: "Landlord", required: true },
  { id: "ipa_cert", label: "Certificate of Incorporation", responsible: "IPA", required: true },
  { id: "ipa_extract", label: "Company Extract", responsible: "IPA", required: true },
  { id: "biz_name", label: "Business Name Registration", responsible: "IPA", required: true },
  { id: "foreign_cert", label: "Foreign Enterprise Certificate", responsible: "IPA", required: false, note: "If foreign owned" },
  { id: "tax_garbage", label: "Land Tax & Garbage Rates Receipt", responsible: "NCDC", required: true },
  { id: "prev_license", label: "Copy of Previous License", responsible: "Applicant", required: false, note: "For renewals/Change of Management" },
];

const LIQUOR_REQUIREMENTS: ChecklistItem[] = [
  ...COMMON_REQUIREMENTS,
  { id: "manager_approval", label: "Name of Approved Manager", responsible: "Applicant", required: true, note: "Identify by letter" },
  { id: "statutory_declaration", label: "Statutory Declaration", responsible: "Justice of Peace", required: true },
  { id: "bar_list", label: "Number/Names of Bars", responsible: "Applicant", required: true, note: "Identify by letter" },
];

export const LICENSE_TYPES: LicenseType[] = [
  // Trading Licenses
  {
    id: "second_hand_clothing",
    name: "Second Hand / Used Clothing",
    category: "Trading",
    icon: ShoppingBag,
    formType: "Form 5",
    checklist: [
      ...COMMON_REQUIREMENTS,
      { id: "fumigation", label: "Certificate of Fumigation", responsible: "Department of Health", required: true },
    ]
  },
  {
    id: "electronics_shop",
    name: "Electronics Shop",
    category: "Trading",
    icon: Tv,
    formType: "Form 1",
    checklist: [
      ...COMMON_REQUIREMENTS,
      { id: "nicta", label: "Radio Communication Apparatus License", responsible: "Applicant", required: true, note: "From NICTA" },
    ]
  },
  {
    id: "barber_shop",
    name: "Barber Shop",
    category: "Trading",
    icon: Scissors,
    formType: "Form 1",
    checklist: COMMON_REQUIREMENTS
  },
  
  // Industrial / Auto
  {
    id: "mechanical_workshop",
    name: "Mechanical Workshop",
    category: "Industrial",
    icon: Wrench,
    formType: "Form 1",
    checklist: [
      ...COMMON_REQUIREMENTS,
      { id: "factory_license", label: "Factory/Manufacturer License", responsible: "Labour Department", required: true },
    ]
  },
  {
    id: "motor_vehicle_dealer",
    name: "Motor Vehicle Dealer",
    category: "Trading",
    icon: Car,
    formType: "Form 1",
    checklist: [
      ...COMMON_REQUIREMENTS,
      { id: "dealer_license", label: "Motor Car Dealers License", responsible: "Applicant", required: true, note: "Land Transport Board" },
    ]
  },
  {
    id: "fuel_station",
    name: "Fuel Station / Distribution",
    category: "Industrial",
    icon: Zap,
    formType: "Form 1",
    checklist: [
      ...COMMON_REQUIREMENTS,
      { id: "dangerous_goods", label: "Inflammable & Dangerous Goods License", responsible: "Labour Department", required: true },
    ]
  },
  {
    id: "manufacturer",
    name: "Manufacturer",
    category: "Industrial",
    icon: Factory,
    formType: "Form 1",
    checklist: [
      ...COMMON_REQUIREMENTS,
      { id: "haccp", label: "Food Safety Management (HACCP)", responsible: "Applicant", required: false, note: "If Food Manufacturer" },
      { id: "factory_license", label: "Factory/Manufacturer License", responsible: "Labour Department", required: true },
    ]
  },

  // Food & Hospitality
  {
    id: "food_establishment",
    name: "Food Establishment",
    category: "Health",
    icon: Utensils,
    formType: "Form 1",
    checklist: [
      ...COMMON_REQUIREMENTS,
      { id: "haccp", label: "Food Safety Management (HACCP)", responsible: "Applicant", required: true },
    ]
  },

  // Liquor Licenses
  {
    id: "tavern",
    name: "Tavern License",
    category: "Liquor",
    icon: Wine,
    formType: "Form 1",
    checklist: LIQUOR_REQUIREMENTS
  },
  {
    id: "limited_hotel",
    name: "Limited Hotel License",
    category: "Liquor",
    icon: Hotel,
    formType: "Form 1",
    checklist: LIQUOR_REQUIREMENTS
  },
  {
    id: "publican",
    name: "Publican License",
    category: "Liquor",
    icon: Users,
    formType: "Form 1",
    checklist: LIQUOR_REQUIREMENTS
  },
  {
    id: "restaurant_liquor",
    name: "Restaurant Liquor License",
    category: "Liquor",
    icon: Utensils,
    formType: "Form 7",
    checklist: [
      ...LIQUOR_REQUIREMENTS,
      { id: "haccp", label: "Food Safety Management (HACCP)", responsible: "Applicant", required: true },
    ]
  },
  {
    id: "club_liquor",
    name: "Club Liquor License",
    category: "Liquor",
    icon: Users,
    formType: "Form 6",
    checklist: [
      ...LIQUOR_REQUIREMENTS,
      { id: "constitution", label: "Club Constitution/Rules", responsible: "Applicant", required: true },
      { id: "members_list", label: "List of Subscribing Members", responsible: "Applicant", required: true, note: "> 50 members" },
      { id: "agm_minutes", label: "AGM Minutes", responsible: "Applicant", required: true },
    ]
  },
  {
    id: "storekeepers",
    name: "Storekeepers License",
    category: "Liquor",
    icon: Store,
    formType: "Form 3",
    checklist: LIQUOR_REQUIREMENTS
  },
  {
    id: "dealer_liquor",
    name: "Dealer Liquor License",
    category: "Liquor",
    icon: Truck,
    formType: "Form 12",
    checklist: [
      ...LIQUOR_REQUIREMENTS,
      { id: "excise", label: "Excise Beer License", responsible: "IRC/Customs", required: false, note: "If Brewer" },
      { id: "distiller", label: "Distillers License", responsible: "IRC/Customs", required: false, note: "If Distiller" },
    ]
  },
  {
    id: "packet_license",
    name: "Packet License (Vessels)",
    category: "Liquor",
    icon: Anchor,
    formType: "Form 5",
    checklist: [
      { id: "app_form", label: "Application Form 5", responsible: "NCDC", required: true },
      { id: "biz_name", label: "Business Name Registration", responsible: "IPA", required: true },
      { id: "vessel_cert", label: "Certified Sea Going Vessel", responsible: "Maritime Authority", required: true },
      { id: "master_name", label: "Name of Master/Captain", responsible: "Applicant", required: true },
      { id: "statutory_declaration", label: "Statutory Declaration", responsible: "Justice of Peace", required: true },
    ]
  },
  {
    id: "booth_license",
    name: "Booth License",
    category: "Liquor",
    icon: Store,
    formType: "Form 4",
    checklist: [
      { id: "app_form", label: "Application Form 4", responsible: "NCDC", required: true },
      { id: "floor_plan", label: "Floor Plan of Arena/Venue", responsible: "Applicant", required: true },
      { id: "publican_nominee", label: "Nominated Publican Name", responsible: "Applicant", required: true },
      { id: "venue_consent", label: "Venue Management Consent", responsible: "Applicant", required: true },
      { id: "statutory_declaration", label: "Statutory Declaration", responsible: "Justice of Peace", required: true },
    ]
  }
];
