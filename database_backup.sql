--
-- PostgreSQL database dump
--

\restrict oFIWRcmuhg3Eh8UoXsZL4fc4PRU6FNgv6nJB2MELfxa8qfSWnZnGL4Cl56l3MbC

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.accounts (
    account_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    holder_type text NOT NULL,
    holder_id character varying NOT NULL,
    account_no text NOT NULL,
    status text DEFAULT 'active'::text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: assets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.assets (
    asset_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    asset_no text NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    location text,
    condition text,
    value text,
    status text DEFAULT 'active'::text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.audit_logs (
    audit_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    user_id character varying,
    action text NOT NULL,
    entity_type text NOT NULL,
    entity_id character varying,
    before_state jsonb,
    after_state jsonb,
    ip_address text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: businesses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.businesses (
    business_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    registration_no text,
    tin text,
    legal_name text NOT NULL,
    trading_name text,
    business_type text,
    industry text,
    owner_name text,
    contact_phone text,
    contact_email text,
    physical_address text,
    section text,
    lot text,
    suburb text,
    status text DEFAULT 'active'::text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: citizens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.citizens (
    citizen_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    national_id text,
    local_citizen_no text,
    first_name text NOT NULL,
    last_name text NOT NULL,
    dob date,
    sex text,
    phone text,
    email text,
    address text,
    village text,
    district text,
    province text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: complaint_updates; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.complaint_updates (
    update_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    complaint_id character varying NOT NULL,
    updated_by character varying,
    status text,
    comment text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: complaints; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.complaints (
    complaint_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    complainant_type text,
    complainant_id character varying,
    category text,
    status text DEFAULT 'new'::text NOT NULL,
    description text,
    latitude numeric(10,7),
    longitude numeric(10,7),
    location text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: council_units; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.council_units (
    unit_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    parent_unit_id character varying
);


--
-- Name: councils; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.councils (
    council_id character varying DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    level text NOT NULL,
    country_code character(2) DEFAULT 'PG'::bpchar NOT NULL,
    currency_code character(3) DEFAULT 'PGK'::bpchar NOT NULL,
    timezone text DEFAULT 'Pacific/Port_Moresby'::text NOT NULL,
    status text DEFAULT 'active'::text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: enforcement_cases; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.enforcement_cases (
    case_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    request_id character varying,
    case_no text NOT NULL,
    type text,
    status text DEFAULT 'open'::text,
    offender_type text,
    offender_id character varying,
    description text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: fee_schedules; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fee_schedules (
    fee_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    service_id character varying NOT NULL,
    name text NOT NULL,
    basis text NOT NULL,
    amount numeric(12,2) NOT NULL,
    currency character(3) DEFAULT 'PGK'::bpchar NOT NULL,
    valid_from date NOT NULL,
    valid_to date
);


--
-- Name: inspection_evidence; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inspection_evidence (
    evidence_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    inspection_id character varying NOT NULL,
    media_type text,
    url text,
    hash text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: inspection_findings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inspection_findings (
    finding_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    inspection_id character varying NOT NULL,
    code text,
    severity text,
    description text,
    corrective_action text,
    due_date date
);


--
-- Name: inspections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inspections (
    inspection_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    request_id character varying,
    inspector_user_id character varying,
    scheduled_at timestamp without time zone,
    performed_at timestamp without time zone,
    result text,
    remarks text,
    latitude numeric(10,7),
    longitude numeric(10,7),
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: invoice_lines; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.invoice_lines (
    line_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    invoice_id character varying NOT NULL,
    description text,
    quantity integer DEFAULT 1,
    unit_price numeric(12,2),
    line_total numeric(12,2)
);


--
-- Name: invoices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.invoices (
    invoice_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    account_id character varying NOT NULL,
    invoice_no text NOT NULL,
    total_amount numeric(12,2) NOT NULL,
    currency character(3) DEFAULT 'PGK'::bpchar NOT NULL,
    status text DEFAULT 'draft'::text NOT NULL,
    issued_at timestamp without time zone,
    due_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: licence_renewals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.licence_renewals (
    renewal_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    licence_id character varying NOT NULL,
    request_id character varying,
    previous_expiry_date date,
    new_expiry_date date,
    renewed_at timestamp without time zone DEFAULT now()
);


--
-- Name: licences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.licences (
    licence_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    request_id character varying NOT NULL,
    licence_no text NOT NULL,
    issue_date date,
    expiry_date date,
    status text DEFAULT 'active'::text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: markets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.markets (
    market_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    name text NOT NULL,
    location text,
    capacity integer,
    operating_hours text,
    status text DEFAULT 'active'::text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: notices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notices (
    notice_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    case_id character varying NOT NULL,
    notice_no text NOT NULL,
    notice_type text,
    issued_date date,
    compliance_due date,
    details text,
    status text DEFAULT 'issued'::text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: payment_allocations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payment_allocations (
    allocation_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    payment_id character varying NOT NULL,
    invoice_id character varying NOT NULL,
    allocated_amount numeric(12,2) NOT NULL
);


--
-- Name: payments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payments (
    payment_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    account_id character varying NOT NULL,
    payment_ref text NOT NULL,
    amount numeric(12,2) NOT NULL,
    currency character(3) DEFAULT 'PGK'::bpchar NOT NULL,
    method text NOT NULL,
    provider text,
    status text DEFAULT 'pending'::text NOT NULL,
    paid_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.permissions (
    permission_code text NOT NULL,
    description text NOT NULL
);


--
-- Name: properties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.properties (
    property_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    parcel_id text,
    section text,
    lot text,
    allotment text,
    suburb text,
    district text,
    land_type text,
    title_number text,
    owner_name text,
    owner_type text,
    land_area text,
    zoning text,
    rateable_value numeric(12,2),
    coordinates text,
    status text DEFAULT 'active'::text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: rate_assessments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rate_assessments (
    assessment_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    property_id character varying NOT NULL,
    assessment_year integer NOT NULL,
    rateable_value numeric(12,2),
    rate_amount numeric(12,2),
    status text DEFAULT 'pending'::text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: role_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.role_permissions (
    role_id character varying NOT NULL,
    permission_code text NOT NULL
);


--
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    role_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    name text NOT NULL,
    scope text DEFAULT 'council'::text NOT NULL
);


--
-- Name: service_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.service_requests (
    request_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    service_id character varying NOT NULL,
    requester_type text NOT NULL,
    requester_id character varying NOT NULL,
    status text DEFAULT 'draft'::text NOT NULL,
    channel text DEFAULT 'web'::text NOT NULL,
    form_data jsonb,
    submitted_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.services (
    service_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    category text NOT NULL,
    description text,
    requires_inspection boolean DEFAULT false,
    requires_approval boolean DEFAULT true,
    active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: stalls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stalls (
    stall_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    market_id character varying NOT NULL,
    stall_no text NOT NULL,
    category text,
    size text,
    daily_rate numeric(10,2),
    monthly_rate numeric(10,2),
    status text DEFAULT 'available'::text,
    current_tenant_id character varying,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    user_id character varying NOT NULL,
    role_id character varying NOT NULL,
    assigned_at timestamp without time zone DEFAULT now()
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    unit_id character varying,
    full_name text NOT NULL,
    email text NOT NULL,
    phone text,
    password_hash text NOT NULL,
    status text DEFAULT 'active'::text NOT NULL,
    mfa_enabled boolean DEFAULT false,
    last_login_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: workflow_definitions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workflow_definitions (
    workflow_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    service_id character varying NOT NULL,
    version text DEFAULT '1.0'::text NOT NULL,
    active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: workflow_instances; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workflow_instances (
    instance_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    request_id character varying NOT NULL,
    workflow_id character varying NOT NULL,
    state text DEFAULT 'pending'::text NOT NULL,
    current_step_id character varying,
    started_at timestamp without time zone DEFAULT now(),
    ended_at timestamp without time zone
);


--
-- Name: workflow_steps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workflow_steps (
    step_id character varying DEFAULT gen_random_uuid() NOT NULL,
    council_id character varying NOT NULL,
    workflow_id character varying NOT NULL,
    name text NOT NULL,
    order_no integer NOT NULL,
    assignee_role text,
    sla_rule text
);


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.accounts (account_id, council_id, holder_type, holder_id, account_no, status, created_at) FROM stdin;
6cd30c5c-72dd-40d4-868a-6e263f81b5de	e140f06b-fc54-440e-8c13-b0a222d16c4b	citizen	b3bd164a-960b-4fa2-898b-201b836d50d0	NCDC-ACC-C0001	active	2026-01-13 16:05:21.180343
dd120b95-dcd5-4ab6-93ca-8b334b3d0d3a	e140f06b-fc54-440e-8c13-b0a222d16c4b	citizen	2389db20-0c57-48a6-9c20-c054e84d08d2	NCDC-ACC-C0002	active	2026-01-13 16:05:21.180343
38d3c7c1-086c-4e5c-a7c7-34437abada27	e140f06b-fc54-440e-8c13-b0a222d16c4b	business	840fd1eb-2fb4-4568-94c5-6706113fcfab	NCDC-ACC-B0001	active	2026-01-13 16:05:21.180343
6aa585a2-a0b2-4fd1-b0fe-198e87dc5067	e140f06b-fc54-440e-8c13-b0a222d16c4b	business	5f278c54-3857-434b-a969-eae1384e8561	NCDC-ACC-B0002	active	2026-01-13 16:05:21.180343
7ce93882-7446-441d-a96a-96bc6633f7d7	335f713a-d133-4b9a-8a64-32cc718cd296	citizen	a9a020c9-e354-4197-80ff-7b531aabb1de	NCDC-ACC-C0001	active	2026-01-13 16:24:45.470939
60592277-8e8b-4156-b9a6-7063e2862c2f	335f713a-d133-4b9a-8a64-32cc718cd296	citizen	3a5fe466-7823-47ee-8ade-ae8df587590a	NCDC-ACC-C0002	active	2026-01-13 16:24:45.470939
87629c92-b6ba-4522-8aef-67312bb19e8f	335f713a-d133-4b9a-8a64-32cc718cd296	business	287e4a2b-d9fa-41eb-9219-7c74172a2022	NCDC-ACC-B0001	active	2026-01-13 16:24:45.470939
a444e703-7cc8-4c90-abb8-92357c4984ad	335f713a-d133-4b9a-8a64-32cc718cd296	business	4b4ee114-fd97-4538-abc2-fa24332df5aa	NCDC-ACC-B0002	active	2026-01-13 16:24:45.470939
\.


--
-- Data for Name: assets; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.assets (asset_id, council_id, asset_no, name, type, location, condition, value, status, created_at) FROM stdin;
298e9224-ae3a-49f3-bec8-571a585e12ca	335f713a-d133-4b9a-8a64-32cc718cd296	AST-001	Boroko Market Stall Block A	market_facility	Boroko	good	PGK 15,000	active	2026-01-13 16:24:45.49494
5862bdfc-2f37-439e-85b6-6276fb1f5208	335f713a-d133-4b9a-8a64-32cc718cd296	AST-002	Konedobu Council Depot	building	Konedobu	fair	PGK 2,500,000	active	2026-01-13 16:24:45.49494
76ef94a4-5524-40f7-831d-aaeef3bead34	335f713a-d133-4b9a-8a64-32cc718cd296	AST-003	Toyota Hilux Fleet #4	vehicle	City Hall Garage	excellent	PGK 120,000	active	2026-01-13 16:24:45.49494
20c3325c-d863-4ed3-b74e-20c2ecf56009	335f713a-d133-4b9a-8a64-32cc718cd296	AST-004	Waigani Community Hall	building	Waigani	good	PGK 850,000	active	2026-01-13 16:24:45.49494
\.


--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.audit_logs (audit_id, council_id, user_id, action, entity_type, entity_id, before_state, after_state, ip_address, created_at) FROM stdin;
\.


--
-- Data for Name: businesses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.businesses (business_id, council_id, registration_no, tin, legal_name, trading_name, business_type, industry, owner_name, contact_phone, contact_email, physical_address, section, lot, suburb, status, created_at) FROM stdin;
840fd1eb-2fb4-4568-94c5-6706113fcfab	e140f06b-fc54-440e-8c13-b0a222d16c4b	BIZ-2020-0045	TIN-987654321	Papindo Trading Limited	Papindo Supermarket	Company	Retail	John Kamaso	+675 325 1234	info@papindo.pg	Section 32, Lot 5, Gordons	32	5	Gordons	active	2026-01-13 16:05:21.174138
5f278c54-3857-434b-a969-eae1384e8561	e140f06b-fc54-440e-8c13-b0a222d16c4b	BIZ-2021-0112	TIN-123456789	City Pharmacy PNG	City Pharmacy Waigani	Company	Healthcare	Maria Santos	+675 325 5678	waigani@citypharmacy.pg	Section 14, Lot 22, Waigani	14	22	Waigani	active	2026-01-13 16:05:21.177118
287e4a2b-d9fa-41eb-9219-7c74172a2022	335f713a-d133-4b9a-8a64-32cc718cd296	BIZ-2020-0045	TIN-987654321	Papindo Trading Limited	Papindo Supermarket	Company	Retail	John Kamaso	+675 325 1234	info@papindo.pg	Section 32, Lot 5, Gordons	32	5	Gordons	active	2026-01-13 16:24:45.464377
4b4ee114-fd97-4538-abc2-fa24332df5aa	335f713a-d133-4b9a-8a64-32cc718cd296	BIZ-2021-0112	TIN-123456789	City Pharmacy PNG	City Pharmacy Waigani	Company	Healthcare	Maria Santos	+675 325 5678	waigani@citypharmacy.pg	Section 14, Lot 22, Waigani	14	22	Waigani	active	2026-01-13 16:24:45.467665
\.


--
-- Data for Name: citizens; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.citizens (citizen_id, council_id, national_id, local_citizen_no, first_name, last_name, dob, sex, phone, email, address, village, district, province, created_at) FROM stdin;
b3bd164a-960b-4fa2-898b-201b836d50d0	e140f06b-fc54-440e-8c13-b0a222d16c4b	NID-2024-00123	NCDC-CIT-0001	Michael	Kila	1985-03-15	male	+675 7234 5678	mkila@email.pg	Section 45, Lot 12, Boroko	Hanuabada	Port Moresby	Central Province	2026-01-13 16:05:21.167067
2389db20-0c57-48a6-9c20-c054e84d08d2	e140f06b-fc54-440e-8c13-b0a222d16c4b	NID-2024-00456	NCDC-CIT-0002	Sarah	Toua	1992-07-22	female	+675 7345 6789	stoua@email.pg	Section 12, Lot 8, Gordons	\N	Port Moresby	NCD	2026-01-13 16:05:21.170144
a9a020c9-e354-4197-80ff-7b531aabb1de	335f713a-d133-4b9a-8a64-32cc718cd296	NID-2024-00123	NCDC-CIT-0001	Michael	Kila	1985-03-15	male	+675 7234 5678	mkila@email.pg	Section 45, Lot 12, Boroko	Hanuabada	Port Moresby	Central Province	2026-01-13 16:24:45.457594
3a5fe466-7823-47ee-8ade-ae8df587590a	335f713a-d133-4b9a-8a64-32cc718cd296	NID-2024-00456	NCDC-CIT-0002	Sarah	Toua	1992-07-22	female	+675 7345 6789	stoua@email.pg	Section 12, Lot 8, Gordons	\N	Port Moresby	NCD	2026-01-13 16:24:45.460526
\.


--
-- Data for Name: complaint_updates; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.complaint_updates (update_id, council_id, complaint_id, updated_by, status, comment, created_at) FROM stdin;
\.


--
-- Data for Name: complaints; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.complaints (complaint_id, council_id, complainant_type, complainant_id, category, status, description, latitude, longitude, location, created_at) FROM stdin;
31f1886a-05b5-45e3-b0d3-04c06eadf2b0	e140f06b-fc54-440e-8c13-b0a222d16c4b	citizen	b3bd164a-960b-4fa2-898b-201b836d50d0	noise	new	Loud music from neighbouring business after 10pm	-9.4620000	147.1650000	Section 45, Boroko	2026-01-13 16:05:21.203687
ae7d2810-a55b-48f7-bd1c-c13a8de6888c	e140f06b-fc54-440e-8c13-b0a222d16c4b	anonymous	\N	illegal_business	investigating	Unlicensed street vendor operating without permit	-9.4780000	147.1550000	Near Gordons Market entrance	2026-01-13 16:05:21.203687
3fcbfdac-74fe-4352-a1b2-8a69f6aaed6a	335f713a-d133-4b9a-8a64-32cc718cd296	citizen	a9a020c9-e354-4197-80ff-7b531aabb1de	noise	new	Loud music from neighbouring business after 10pm	-9.4620000	147.1650000	Section 45, Boroko	2026-01-13 16:24:45.491974
f6abe0a1-6535-4d66-b050-c18d08e6cf82	335f713a-d133-4b9a-8a64-32cc718cd296	anonymous	\N	illegal_business	investigating	Unlicensed street vendor operating without permit	-9.4780000	147.1550000	Near Gordons Market entrance	2026-01-13 16:24:45.491974
\.


--
-- Data for Name: council_units; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.council_units (unit_id, council_id, name, type, parent_unit_id) FROM stdin;
3e2340f1-0d09-400b-b96b-93e9b1f1e1b7	e140f06b-fc54-440e-8c13-b0a222d16c4b	Licensing & Permits	department	\N
7c339baf-fd8b-46fb-9197-61852bd33573	e140f06b-fc54-440e-8c13-b0a222d16c4b	Revenue & Finance	department	\N
bb9ede2b-4fa5-4eda-a3e0-f3d822e216dc	e140f06b-fc54-440e-8c13-b0a222d16c4b	Enforcement & Compliance	department	\N
9ddc6eae-ca2f-4627-b24c-98766fb861ac	e140f06b-fc54-440e-8c13-b0a222d16c4b	Property & Rates	department	\N
e8fed24e-ed6e-451c-9fa9-55a985529148	335f713a-d133-4b9a-8a64-32cc718cd296	Licensing & Permits	department	\N
cb8a5cff-e9ed-4742-8a78-239d7f5a60ff	335f713a-d133-4b9a-8a64-32cc718cd296	Revenue & Finance	department	\N
165c0732-a2eb-4f58-b725-c99f6183ce70	335f713a-d133-4b9a-8a64-32cc718cd296	Enforcement & Compliance	department	\N
6ede1ecc-076f-4102-bf85-400d411fad2f	335f713a-d133-4b9a-8a64-32cc718cd296	Property & Rates	department	\N
\.


--
-- Data for Name: councils; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.councils (council_id, name, level, country_code, currency_code, timezone, status, created_at) FROM stdin;
e140f06b-fc54-440e-8c13-b0a222d16c4b	National Capital District Commission	city	PG	PGK	Pacific/Port_Moresby	active	2026-01-13 16:05:20.938013
cfc6c4c4-aaac-4f53-a446-1fac8d7aec73	Lae City Council	city	PG	PGK	Pacific/Port_Moresby	active	2026-01-13 16:05:21.031319
335f713a-d133-4b9a-8a64-32cc718cd296	National Capital District Commission	city	PG	PGK	Pacific/Port_Moresby	active	2026-01-13 16:24:45.341156
6df0d52f-0419-408d-912d-010ed8015347	Lae City Council	city	PG	PGK	Pacific/Port_Moresby	active	2026-01-13 16:24:45.349914
\.


--
-- Data for Name: enforcement_cases; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.enforcement_cases (case_id, council_id, request_id, case_no, type, status, offender_type, offender_id, description, created_at) FROM stdin;
\.


--
-- Data for Name: fee_schedules; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fee_schedules (fee_id, council_id, service_id, name, basis, amount, currency, valid_from, valid_to) FROM stdin;
27fe801c-9788-4d6b-b2fb-c9b87ca20251	e140f06b-fc54-440e-8c13-b0a222d16c4b	2c758cf0-76ef-4171-acad-d43b1031c571	Trading Licence - Standard	flat	500.00	PGK	2024-01-01	\N
e85830a2-db86-452a-bab5-86632bae17fb	e140f06b-fc54-440e-8c13-b0a222d16c4b	2c758cf0-76ef-4171-acad-d43b1031c571	Trading Licence - Premium (Large Business)	flat	1500.00	PGK	2024-01-01	\N
dea0aec7-e568-45c1-966a-960ce0c9e227	335f713a-d133-4b9a-8a64-32cc718cd296	8a44a3a8-51b9-43d0-b277-2115db39fc63	Trading Licence - Standard	flat	500.00	PGK	2024-01-01	\N
502d4f3c-5dec-4942-9249-255de8452998	335f713a-d133-4b9a-8a64-32cc718cd296	8a44a3a8-51b9-43d0-b277-2115db39fc63	Trading Licence - Premium (Large Business)	flat	1500.00	PGK	2024-01-01	\N
\.


--
-- Data for Name: inspection_evidence; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.inspection_evidence (evidence_id, council_id, inspection_id, media_type, url, hash, created_at) FROM stdin;
\.


--
-- Data for Name: inspection_findings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.inspection_findings (finding_id, council_id, inspection_id, code, severity, description, corrective_action, due_date) FROM stdin;
\.


--
-- Data for Name: inspections; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.inspections (inspection_id, council_id, request_id, inspector_user_id, scheduled_at, performed_at, result, remarks, latitude, longitude, created_at) FROM stdin;
\.


--
-- Data for Name: invoice_lines; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.invoice_lines (line_id, council_id, invoice_id, description, quantity, unit_price, line_total) FROM stdin;
\.


--
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.invoices (invoice_id, council_id, account_id, invoice_no, total_amount, currency, status, issued_at, due_at, created_at) FROM stdin;
\.


--
-- Data for Name: licence_renewals; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.licence_renewals (renewal_id, council_id, licence_id, request_id, previous_expiry_date, new_expiry_date, renewed_at) FROM stdin;
\.


--
-- Data for Name: licences; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.licences (licence_id, council_id, request_id, licence_no, issue_date, expiry_date, status, created_at) FROM stdin;
\.


--
-- Data for Name: markets; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.markets (market_id, council_id, name, location, capacity, operating_hours, status, created_at) FROM stdin;
42f32455-40ce-4ff4-8a35-24a17d3ed046	e140f06b-fc54-440e-8c13-b0a222d16c4b	Gordons Market	Gordons, Port Moresby	500	06:00-18:00	active	2026-01-13 16:05:21.197486
2e0b0164-19f0-4f2a-bb4f-e80c557c6b89	335f713a-d133-4b9a-8a64-32cc718cd296	Gordons Market	Gordons, Port Moresby	500	06:00-18:00	active	2026-01-13 16:24:45.48547
\.


--
-- Data for Name: notices; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notices (notice_id, council_id, case_id, notice_no, notice_type, issued_date, compliance_due, details, status, created_at) FROM stdin;
\.


--
-- Data for Name: payment_allocations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payment_allocations (allocation_id, council_id, payment_id, invoice_id, allocated_amount) FROM stdin;
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payments (payment_id, council_id, account_id, payment_ref, amount, currency, method, provider, status, paid_at, created_at) FROM stdin;
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.permissions (permission_code, description) FROM stdin;
citizen:read	View citizen records
citizen:write	Create/update citizen records
business:read	View business records
business:write	Create/update business records
service:read	View service catalogue
service:write	Manage service catalogue
request:read	View service requests
request:write	Process service requests
request:approve	Approve service requests
inspection:read	View inspections
inspection:write	Conduct inspections
invoice:read	View invoices
invoice:write	Create/manage invoices
payment:read	View payments
payment:write	Record payments
licence:read	View licences
licence:write	Issue licences
enforcement:read	View enforcement cases
enforcement:write	Manage enforcement cases
audit:read	View audit logs
user:read	View users
user:write	Manage users
role:read	View roles
role:write	Manage roles
\.


--
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.properties (property_id, council_id, parcel_id, section, lot, allotment, suburb, district, land_type, title_number, owner_name, owner_type, land_area, zoning, rateable_value, coordinates, status, created_at) FROM stdin;
40f03bc6-1fe1-49b6-bb5f-9c56fda79ba3	e140f06b-fc54-440e-8c13-b0a222d16c4b	POM-SEC32-LOT5	32	5	\N	Gordons	Port Moresby	state_lease	VOL-45-FOL-789	Papindo Trading Limited	business	1,200 sqm	Commercial	450000.00	-9.478,147.155	active	2026-01-13 16:05:21.19376
4e1df830-20a9-4675-9b0f-40784d9b794a	e140f06b-fc54-440e-8c13-b0a222d16c4b	POM-SEC14-LOT22	14	22	\N	Waigani	Port Moresby	state_lease	VOL-14-FOL-222	City Pharmacy PNG	business	800 sqm	Commercial	380000.00	-9.445,147.175	active	2026-01-13 16:05:21.19376
b7faec72-74c0-47e7-9f20-0cc4d05ff2a1	e140f06b-fc54-440e-8c13-b0a222d16c4b	POM-SEC45-LOT12	45	12	\N	Boroko	Port Moresby	state_lease	VOL-45-FOL-012	Michael Kila	individual	600 sqm	Residential	250000.00	-9.462,147.165	active	2026-01-13 16:05:21.19376
0fd66f8a-d7e5-4898-a9f3-425c2928ad2e	335f713a-d133-4b9a-8a64-32cc718cd296	POM-SEC32-LOT5	32	5	\N	Gordons	Port Moresby	state_lease	VOL-45-FOL-789	Papindo Trading Limited	business	1,200 sqm	Commercial	450000.00	-9.478,147.155	active	2026-01-13 16:24:45.482458
cc79568c-dfd6-4f8e-890e-66b0c80c1629	335f713a-d133-4b9a-8a64-32cc718cd296	POM-SEC14-LOT22	14	22	\N	Waigani	Port Moresby	state_lease	VOL-14-FOL-222	City Pharmacy PNG	business	800 sqm	Commercial	380000.00	-9.445,147.175	active	2026-01-13 16:24:45.482458
da72fa38-1444-451d-9b45-5adbd13e36a3	335f713a-d133-4b9a-8a64-32cc718cd296	POM-SEC45-LOT12	45	12	\N	Boroko	Port Moresby	state_lease	VOL-45-FOL-012	Michael Kila	individual	600 sqm	Residential	250000.00	-9.462,147.165	active	2026-01-13 16:24:45.482458
\.


--
-- Data for Name: rate_assessments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.rate_assessments (assessment_id, council_id, property_id, assessment_year, rateable_value, rate_amount, status, created_at) FROM stdin;
\.


--
-- Data for Name: role_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.role_permissions (role_id, permission_code) FROM stdin;
a62e17ae-59df-428e-a09a-7bbc938ea98e	citizen:read
a62e17ae-59df-428e-a09a-7bbc938ea98e	citizen:write
a62e17ae-59df-428e-a09a-7bbc938ea98e	business:read
a62e17ae-59df-428e-a09a-7bbc938ea98e	business:write
a62e17ae-59df-428e-a09a-7bbc938ea98e	service:read
a62e17ae-59df-428e-a09a-7bbc938ea98e	service:write
a62e17ae-59df-428e-a09a-7bbc938ea98e	request:read
a62e17ae-59df-428e-a09a-7bbc938ea98e	request:write
a62e17ae-59df-428e-a09a-7bbc938ea98e	request:approve
a62e17ae-59df-428e-a09a-7bbc938ea98e	inspection:read
a62e17ae-59df-428e-a09a-7bbc938ea98e	inspection:write
a62e17ae-59df-428e-a09a-7bbc938ea98e	invoice:read
a62e17ae-59df-428e-a09a-7bbc938ea98e	invoice:write
a62e17ae-59df-428e-a09a-7bbc938ea98e	payment:read
a62e17ae-59df-428e-a09a-7bbc938ea98e	payment:write
a62e17ae-59df-428e-a09a-7bbc938ea98e	licence:read
a62e17ae-59df-428e-a09a-7bbc938ea98e	licence:write
a62e17ae-59df-428e-a09a-7bbc938ea98e	enforcement:read
a62e17ae-59df-428e-a09a-7bbc938ea98e	enforcement:write
a62e17ae-59df-428e-a09a-7bbc938ea98e	audit:read
a62e17ae-59df-428e-a09a-7bbc938ea98e	user:read
a62e17ae-59df-428e-a09a-7bbc938ea98e	user:write
a62e17ae-59df-428e-a09a-7bbc938ea98e	role:read
a62e17ae-59df-428e-a09a-7bbc938ea98e	role:write
485a74be-9c81-4c55-8244-cebdc4e19ce9	citizen:read
485a74be-9c81-4c55-8244-cebdc4e19ce9	citizen:write
485a74be-9c81-4c55-8244-cebdc4e19ce9	business:read
485a74be-9c81-4c55-8244-cebdc4e19ce9	business:write
485a74be-9c81-4c55-8244-cebdc4e19ce9	service:read
485a74be-9c81-4c55-8244-cebdc4e19ce9	service:write
485a74be-9c81-4c55-8244-cebdc4e19ce9	request:read
485a74be-9c81-4c55-8244-cebdc4e19ce9	request:write
485a74be-9c81-4c55-8244-cebdc4e19ce9	request:approve
485a74be-9c81-4c55-8244-cebdc4e19ce9	inspection:read
485a74be-9c81-4c55-8244-cebdc4e19ce9	inspection:write
485a74be-9c81-4c55-8244-cebdc4e19ce9	invoice:read
485a74be-9c81-4c55-8244-cebdc4e19ce9	invoice:write
485a74be-9c81-4c55-8244-cebdc4e19ce9	payment:read
485a74be-9c81-4c55-8244-cebdc4e19ce9	payment:write
485a74be-9c81-4c55-8244-cebdc4e19ce9	licence:read
485a74be-9c81-4c55-8244-cebdc4e19ce9	licence:write
485a74be-9c81-4c55-8244-cebdc4e19ce9	enforcement:read
485a74be-9c81-4c55-8244-cebdc4e19ce9	enforcement:write
485a74be-9c81-4c55-8244-cebdc4e19ce9	audit:read
485a74be-9c81-4c55-8244-cebdc4e19ce9	user:read
485a74be-9c81-4c55-8244-cebdc4e19ce9	user:write
485a74be-9c81-4c55-8244-cebdc4e19ce9	role:read
485a74be-9c81-4c55-8244-cebdc4e19ce9	role:write
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.roles (role_id, council_id, name, scope) FROM stdin;
a62e17ae-59df-428e-a09a-7bbc938ea98e	e140f06b-fc54-440e-8c13-b0a222d16c4b	Administrator	council
a5ae32ea-41db-470f-bacf-41758c53e527	e140f06b-fc54-440e-8c13-b0a222d16c4b	Manager	unit
802a9aa5-849f-44ae-99d5-9a08edd99988	e140f06b-fc54-440e-8c13-b0a222d16c4b	Licensing Officer	unit
1e2114ed-5fad-41dc-b83c-89cf6fa40cd5	e140f06b-fc54-440e-8c13-b0a222d16c4b	Inspector	ward
485a74be-9c81-4c55-8244-cebdc4e19ce9	335f713a-d133-4b9a-8a64-32cc718cd296	Administrator	council
9e5d6748-84e9-4eec-aaca-cd7041bbfff4	335f713a-d133-4b9a-8a64-32cc718cd296	Manager	unit
f3226daf-ad0b-4dd3-917a-752b493ed686	335f713a-d133-4b9a-8a64-32cc718cd296	Licensing Officer	unit
1e7cec02-b75f-474a-a454-e40e6de96672	335f713a-d133-4b9a-8a64-32cc718cd296	Inspector	ward
\.


--
-- Data for Name: service_requests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.service_requests (request_id, council_id, service_id, requester_type, requester_id, status, channel, form_data, submitted_at, created_at) FROM stdin;
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.services (service_id, council_id, code, name, category, description, requires_inspection, requires_approval, active, created_at) FROM stdin;
2c758cf0-76ef-4171-acad-d43b1031c571	e140f06b-fc54-440e-8c13-b0a222d16c4b	LIC-TRADING	Trading Licence	licensing	General trading licence for businesses operating within the city	t	t	t	2026-01-13 16:05:21.183068
aadb9e24-285e-4777-866a-80535754f29b	e140f06b-fc54-440e-8c13-b0a222d16c4b	LIC-LIQUOR	Liquor Licence	licensing	Licence to sell or serve alcohol	t	t	t	2026-01-13 16:05:21.187275
4944b7ee-f570-45e3-bc0a-ac1bbe16e738	e140f06b-fc54-440e-8c13-b0a222d16c4b	LIC-SIGNAGE	Signage Permit	permits	Permit for advertising signage	f	t	t	2026-01-13 16:05:21.187275
2be26d08-6c3c-4908-8861-69ea6b772eed	e140f06b-fc54-440e-8c13-b0a222d16c4b	COMP-GENERAL	General Complaint	complaints	Lodge a general complaint	f	f	t	2026-01-13 16:05:21.187275
8a44a3a8-51b9-43d0-b277-2115db39fc63	335f713a-d133-4b9a-8a64-32cc718cd296	LIC-TRADING	Trading Licence	licensing	General trading licence for businesses operating within the city	t	t	t	2026-01-13 16:24:45.473663
ca02d252-676a-4323-bd23-c9a79c0433f4	335f713a-d133-4b9a-8a64-32cc718cd296	LIC-LIQUOR	Liquor Licence	licensing	Licence to sell or serve alcohol	t	t	t	2026-01-13 16:24:45.476606
1426795b-50c9-4fdb-903a-38f6ffe5d7c5	335f713a-d133-4b9a-8a64-32cc718cd296	LIC-SIGNAGE	Signage Permit	permits	Permit for advertising signage	f	t	t	2026-01-13 16:24:45.476606
6468d08e-027b-46bb-8bb9-643d0c1092f2	335f713a-d133-4b9a-8a64-32cc718cd296	COMP-GENERAL	General Complaint	complaints	Lodge a general complaint	f	f	t	2026-01-13 16:24:45.476606
\.


--
-- Data for Name: stalls; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.stalls (stall_id, council_id, market_id, stall_no, category, size, daily_rate, monthly_rate, status, current_tenant_id, created_at) FROM stdin;
85ce14a4-c74a-43ed-86fb-cd6416a9b5d9	e140f06b-fc54-440e-8c13-b0a222d16c4b	42f32455-40ce-4ff4-8a35-24a17d3ed046	GM-A001	produce	3x3m	20.00	400.00	available	\N	2026-01-13 16:05:21.20098
003fdb31-37fb-4a00-bfab-a9cea1b64dfb	e140f06b-fc54-440e-8c13-b0a222d16c4b	42f32455-40ce-4ff4-8a35-24a17d3ed046	GM-A002	produce	3x3m	20.00	400.00	occupied	\N	2026-01-13 16:05:21.20098
329d4b5e-7edc-4f9b-947a-f60ed3ba04d2	e140f06b-fc54-440e-8c13-b0a222d16c4b	42f32455-40ce-4ff4-8a35-24a17d3ed046	GM-B001	crafts	4x4m	30.00	600.00	available	\N	2026-01-13 16:05:21.20098
d6518eff-bba9-419d-a54b-1a4587aa961d	335f713a-d133-4b9a-8a64-32cc718cd296	2e0b0164-19f0-4f2a-bb4f-e80c557c6b89	GM-A001	produce	3x3m	20.00	400.00	available	\N	2026-01-13 16:24:45.489115
72c07783-848e-4cc6-9ef8-38253eeaa86b	335f713a-d133-4b9a-8a64-32cc718cd296	2e0b0164-19f0-4f2a-bb4f-e80c557c6b89	GM-A002	produce	3x3m	20.00	400.00	occupied	\N	2026-01-13 16:24:45.489115
8ef9b07e-8dc7-41d6-8fbd-c6b46d4c39fe	335f713a-d133-4b9a-8a64-32cc718cd296	2e0b0164-19f0-4f2a-bb4f-e80c557c6b89	GM-B001	crafts	4x4m	30.00	600.00	available	\N	2026-01-13 16:24:45.489115
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_roles (user_id, role_id, assigned_at) FROM stdin;
874a8bf8-f3ce-470c-bcfa-f4512179e43a	a62e17ae-59df-428e-a09a-7bbc938ea98e	2026-01-13 16:05:21.16341
7453cf46-2e65-41ea-940e-21080ebdc735	802a9aa5-849f-44ae-99d5-9a08edd99988	2026-01-13 16:05:21.16341
143770ce-0f0b-4c5c-bed4-5c0cae6d5672	485a74be-9c81-4c55-8244-cebdc4e19ce9	2026-01-13 16:24:45.454898
99a5bc0b-9100-49c5-a9e3-56026216af4f	f3226daf-ad0b-4dd3-917a-752b493ed686	2026-01-13 16:24:45.454898
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (user_id, council_id, unit_id, full_name, email, phone, password_hash, status, mfa_enabled, last_login_at, created_at) FROM stdin;
874a8bf8-f3ce-470c-bcfa-f4512179e43a	e140f06b-fc54-440e-8c13-b0a222d16c4b	3e2340f1-0d09-400b-b96b-93e9b1f1e1b7	System Administrator	admin@ncdc.gov.pg	+675 325 6400	$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.5GGdA	active	f	\N	2026-01-13 16:05:21.1553
7453cf46-2e65-41ea-940e-21080ebdc735	e140f06b-fc54-440e-8c13-b0a222d16c4b	3e2340f1-0d09-400b-b96b-93e9b1f1e1b7	John Kila	jkila@ncdc.gov.pg	+675 7234 5678	$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.5GGdB	active	f	\N	2026-01-13 16:05:21.160329
143770ce-0f0b-4c5c-bed4-5c0cae6d5672	335f713a-d133-4b9a-8a64-32cc718cd296	e8fed24e-ed6e-451c-9fa9-55a985529148	System Administrator	admin@ncdc.gov.pg	+675 325 6400	$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.5GGdA	active	f	\N	2026-01-13 16:24:45.448113
99a5bc0b-9100-49c5-a9e3-56026216af4f	335f713a-d133-4b9a-8a64-32cc718cd296	e8fed24e-ed6e-451c-9fa9-55a985529148	John Kila	jkila@ncdc.gov.pg	+675 7234 5678	$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.5GGdB	active	f	\N	2026-01-13 16:24:45.452347
\.


--
-- Data for Name: workflow_definitions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.workflow_definitions (workflow_id, council_id, service_id, version, active, created_at) FROM stdin;
\.


--
-- Data for Name: workflow_instances; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.workflow_instances (instance_id, council_id, request_id, workflow_id, state, current_step_id, started_at, ended_at) FROM stdin;
\.


--
-- Data for Name: workflow_steps; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.workflow_steps (step_id, council_id, workflow_id, name, order_no, assignee_role, sla_rule) FROM stdin;
\.


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (account_id);


--
-- Name: assets assets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_pkey PRIMARY KEY (asset_id);


--
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (audit_id);


--
-- Name: businesses businesses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.businesses
    ADD CONSTRAINT businesses_pkey PRIMARY KEY (business_id);


--
-- Name: citizens citizens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.citizens
    ADD CONSTRAINT citizens_pkey PRIMARY KEY (citizen_id);


--
-- Name: complaint_updates complaint_updates_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.complaint_updates
    ADD CONSTRAINT complaint_updates_pkey PRIMARY KEY (update_id);


--
-- Name: complaints complaints_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.complaints
    ADD CONSTRAINT complaints_pkey PRIMARY KEY (complaint_id);


--
-- Name: council_units council_units_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.council_units
    ADD CONSTRAINT council_units_pkey PRIMARY KEY (unit_id);


--
-- Name: councils councils_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.councils
    ADD CONSTRAINT councils_pkey PRIMARY KEY (council_id);


--
-- Name: enforcement_cases enforcement_cases_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enforcement_cases
    ADD CONSTRAINT enforcement_cases_pkey PRIMARY KEY (case_id);


--
-- Name: fee_schedules fee_schedules_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fee_schedules
    ADD CONSTRAINT fee_schedules_pkey PRIMARY KEY (fee_id);


--
-- Name: inspection_evidence inspection_evidence_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inspection_evidence
    ADD CONSTRAINT inspection_evidence_pkey PRIMARY KEY (evidence_id);


--
-- Name: inspection_findings inspection_findings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inspection_findings
    ADD CONSTRAINT inspection_findings_pkey PRIMARY KEY (finding_id);


--
-- Name: inspections inspections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_pkey PRIMARY KEY (inspection_id);


--
-- Name: invoice_lines invoice_lines_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invoice_lines
    ADD CONSTRAINT invoice_lines_pkey PRIMARY KEY (line_id);


--
-- Name: invoices invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (invoice_id);


--
-- Name: licence_renewals licence_renewals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.licence_renewals
    ADD CONSTRAINT licence_renewals_pkey PRIMARY KEY (renewal_id);


--
-- Name: licences licences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.licences
    ADD CONSTRAINT licences_pkey PRIMARY KEY (licence_id);


--
-- Name: markets markets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.markets
    ADD CONSTRAINT markets_pkey PRIMARY KEY (market_id);


--
-- Name: notices notices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notices
    ADD CONSTRAINT notices_pkey PRIMARY KEY (notice_id);


--
-- Name: payment_allocations payment_allocations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_allocations
    ADD CONSTRAINT payment_allocations_pkey PRIMARY KEY (allocation_id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (payment_id);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (permission_code);


--
-- Name: properties properties_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (property_id);


--
-- Name: rate_assessments rate_assessments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rate_assessments
    ADD CONSTRAINT rate_assessments_pkey PRIMARY KEY (assessment_id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- Name: service_requests service_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service_requests
    ADD CONSTRAINT service_requests_pkey PRIMARY KEY (request_id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (service_id);


--
-- Name: stalls stalls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stalls
    ADD CONSTRAINT stalls_pkey PRIMARY KEY (stall_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: workflow_definitions workflow_definitions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workflow_definitions
    ADD CONSTRAINT workflow_definitions_pkey PRIMARY KEY (workflow_id);


--
-- Name: workflow_instances workflow_instances_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workflow_instances
    ADD CONSTRAINT workflow_instances_pkey PRIMARY KEY (instance_id);


--
-- Name: workflow_steps workflow_steps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workflow_steps
    ADD CONSTRAINT workflow_steps_pkey PRIMARY KEY (step_id);


--
-- Name: accounts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;

--
-- Name: assets; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

--
-- Name: audit_logs; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

--
-- Name: businesses; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

--
-- Name: citizens; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.citizens ENABLE ROW LEVEL SECURITY;

--
-- Name: complaint_updates; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.complaint_updates ENABLE ROW LEVEL SECURITY;

--
-- Name: complaints; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

--
-- Name: council_units; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.council_units ENABLE ROW LEVEL SECURITY;

--
-- Name: councils; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.councils ENABLE ROW LEVEL SECURITY;

--
-- Name: enforcement_cases; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.enforcement_cases ENABLE ROW LEVEL SECURITY;

--
-- Name: fee_schedules; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.fee_schedules ENABLE ROW LEVEL SECURITY;

--
-- Name: inspection_evidence; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.inspection_evidence ENABLE ROW LEVEL SECURITY;

--
-- Name: inspection_findings; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.inspection_findings ENABLE ROW LEVEL SECURITY;

--
-- Name: inspections; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.inspections ENABLE ROW LEVEL SECURITY;

--
-- Name: invoice_lines; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.invoice_lines ENABLE ROW LEVEL SECURITY;

--
-- Name: invoices; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

--
-- Name: licence_renewals; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.licence_renewals ENABLE ROW LEVEL SECURITY;

--
-- Name: licences; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.licences ENABLE ROW LEVEL SECURITY;

--
-- Name: markets; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.markets ENABLE ROW LEVEL SECURITY;

--
-- Name: notices; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;

--
-- Name: payment_allocations; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.payment_allocations ENABLE ROW LEVEL SECURITY;

--
-- Name: payments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

--
-- Name: permissions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;

--
-- Name: properties; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

--
-- Name: rate_assessments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.rate_assessments ENABLE ROW LEVEL SECURITY;

--
-- Name: role_permissions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

--
-- Name: roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;

--
-- Name: service_requests; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

--
-- Name: services; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

--
-- Name: stalls; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.stalls ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

--
-- Name: workflow_definitions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.workflow_definitions ENABLE ROW LEVEL SECURITY;

--
-- Name: workflow_instances; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.workflow_instances ENABLE ROW LEVEL SECURITY;

--
-- Name: workflow_steps; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.workflow_steps ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--

\unrestrict oFIWRcmuhg3Eh8UoXsZL4fc4PRU6FNgv6nJB2MELfxa8qfSWnZnGL4Cl56l3MbC

