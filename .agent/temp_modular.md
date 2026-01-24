**Modular Local Government Information System (LGIS)**

**1. Executive Summary**

Local Governments remain the closest tier of governance to citizens, yet
many councils continue to rely on fragmented, paper-based processes for
licensing, revenue collection, service delivery, and citizen engagement.
This results in inefficiencies, revenue leakages, poor transparency, and
limited decision-making capacity.

The **Local Government Information System (LGIS)** is a **modular,
configurable, and scalable digital platform** designed to **modernise
and harmonise local government operations** across **municipal, city,
district, and LLG levels**. The system will provide **end-to-end digital
workflows**, **mobile field operations**, **integrated multi-channel
payments**, and **real-time dashboards**, while remaining adaptable to
**local bylaws, service catalogues, and institutional structures**.

**2. Vision and Strategic Objectives**

**2.1 Vision**

To establish a **digitally enabled, citizen-centric, transparent, and
revenue-efficient local government ecosystem**.

**2.2 Strategic Objectives**

- Digitise core local government services and administrative workflows

- Improve internally generated revenue (IGR) through transparent billing
  and payment systems

- Enable mobile field operations for inspections, enforcement, and
  service delivery

- Provide real-time data for planning, budgeting, and accountability

- Ensure modular deployment tailored to each council's mandate and
  maturity level

**3. Scope and Coverage**

**3.1 Administrative Levels Supported**

- City Councils

- Municipal Councils

- District Councils

- Local Level Governments (LLGs)

- Special Authorities (Markets, City Corporations, Urban Boards)

**3.2 Users**

- Council Administrators

- Finance and Revenue Officers

- Licensing Officers

- Inspectors and Field Officers (Mobile)

- Planning and Works Officers

- IT/System Administrators

- Citizens and Businesses

- Banks and Payment Service Providers

**4. Core Design Principles**

- **Modular-by-Design** -- Councils activate only required modules

- **Configuration over Custom Code** -- Local bylaws, fees, workflows
  configurable

- **Mobile-First for Field Operations**

- **Interoperability-Ready** -- Open APIs for national systems

- **Security-by-Default** -- Role-based access and audit trails

- **Offline-Capable** -- Field data capture without connectivity

**5. Functional Modules**

**5.1 Citizen & Business Registry Module**

- Individual citizen profiles

- Business and enterprise registration

- Property and asset ownership linkage

- National ID or local identifier support

**Key Features**

- Unique Citizen/Business ID

- Address and GIS location tagging

- Document uploads (IDs, certificates)

**5.2 Licensing & Permits Management Module**

Supports all council-issued licences, including but not limited to:

- Business trading licences

- Market stall permits

- Liquor licences

- Building and construction permits

- Signage and advertising permits

- Environmental health permits

**Workflow**\
Application → Review → Inspection → Approval → Payment → Licence
Issuance

**5.3 Revenue, Billing & Payments Module**

- Automated fee assessment

- Invoice generation

- Receipting and reconciliation

**Payment Channels**

- Credit and debit cards (Visa, Mastercard)

- Bank deposits and transfers

- Cheque payments

- Mobile money (where applicable)

- Cash (with strict audit controls)

**5.4 Inspections & Field Operations (Mobile)**

- Health inspections

- Building inspections

- Market compliance checks

- Enforcement and notices

**Mobile Capabilities**

- Offline data capture

- GPS tagging

- Photo and document evidence

- Digital signatures

**5.5 Property & Asset Management Module**

- Property registry

- Valuation and rating

- Council asset inventory (vehicles, buildings, equipment)

**5.6 Works, Services & Complaints Module**

- Road maintenance

- Waste management

- Street lighting

- Water and sanitation services

- Citizen complaints and service requests

**5.7 Finance & Accounting Module**

- Budget preparation

- Expenditure tracking

- Chart of accounts

- Integration with national IFMIS

**5.8 Human Resource & Payroll (Optional)**

- Staff records

- Attendance

- Payroll linkage

**5.9 Planning, M&E & Reporting Module**

- Development plans

- Project tracking

- KPIs and performance scorecards

**5.10 Administration & Configuration Module**

- Module activation/deactivation

- Fee schedules

- Workflow configuration

- User and role management

**6. Mobile Application (LGIS Mobile)**

**6.1 Target Users**

- Inspectors

- Revenue collectors

- Environmental health officers

- Works supervisors

**6.2 Key Mobile Functions**

- Field inspections

- Payment verification

- Complaint handling

- GPS-based reporting

- Offline sync

**7. System Architecture Overview**

![A screenshot of a computer flowchart AI-generated content may be
incorrect.](media/image1.png){width="6.268055555555556in"
height="2.979861111111111in"}

![A diagram of a computer AI-generated content may be
incorrect.](media/image2.jpeg){width="3.509027777777778in"
height="1.5645833333333334in"}

![A diagram of a data processing system AI-generated content may be
incorrect.](media/image3.png){width="2.240972222222222in"
height="2.4493055555555556in"}

4

**7.1 Architecture Style**

- Modular, service-oriented architecture (SOA)

- API-first design

- Web + Mobile clients

**7.2 Components**

- Web Portal (Council & Citizens)

- Mobile Apps (Android/iOS)

- Backend Services

- Payment Gateway Integration

- GIS Services

- Reporting & Analytics

------------------------------------------------------------------------

**8. Data Model Overview (High-Level)**

Core entities include:

- Citizens

- Businesses

- Properties

- Licences

- Invoices

- Payments

- Inspections

- Complaints

- Assets

- Users and Roles

Relational integrity must support **hierarchical councils** and
**location-based access control**.

------------------------------------------------------------------------

**9. Security and Governance**

- Role-Based Access Control (RBAC)

- Location-Based Access Control (LBAC)

- End-to-end encryption

- Full audit trails

- Data protection compliance

- Segregation of duties

**10. Interoperability & Integrations**

- National ID systems

- Banking systems

- IFMIS

- GIS and cadastral systems

- SMS, Email, WhatsApp notifications

**11. Non-Functional Requirements**

  ------------------------------------------------
  **Area**        **Requirement**
  --------------- --------------------------------
  Availability    ≥ 99.5% uptime

  Scalability     Multi-council, multi-tenant

  Performance     \< 3s response for standard
                  transactions

  Localization    Multi-language and currency

  Accessibility   WCAG 2.1 compliance
  ------------------------------------------------

**12. Implementation Roadmap (Phased)**

**Phase 1: Foundation**

- Core registry

- Licensing

- Revenue & payments

**Phase 2: Operations**

- Inspections

- Mobile app

- Complaints

**Phase 3: Optimization**

- Analytics

- Integrations

- Advanced planning modules

**13. Risks and Mitigation**

  ---------------------------------------------
  **Risk**            **Mitigation**
  ------------------- -------------------------
  Resistance to       Training and phased
  change              rollout

  Connectivity        Offline-first mobile
  limitations         design

  Revenue leakage     Digital receipts and
                      audits

  Data quality        Validation and
                      standardisation
  ---------------------------------------------

**14. Success Indicators**

- Increase in local revenue collection

- Reduction in service processing time

- Improved citizen satisfaction

- Increased transparency and audit compliance

**15. Future Enhancements (Forward-Looking)**

- AI-assisted inspections and risk scoring

- Predictive revenue forecasting

- Open data portals

- Integration with national smart city platforms

**References (Harvard Style)**

World Bank (2020) *Digital Government and Local Service Delivery*.
Washington DC: World Bank.

United Nations (2022) *E-Government Survey: The Future of Digital
Government*. New York: United Nations.

OECD (2019) *Enhancing Local Public Financial Management*. Paris: OECD
Publishing.

ITU (2021) *Digital Transformation Framework for Local Governments*.
Geneva: International Telecommunication Union.

Here are the complete INSERT statements for all checklists. I\'ll
provide them in an organized format:

**Step 1: Insert License Types**

sql

*\-- Insert all license types*

INSERT INTO license_types (license_name, license_category,
application_form, description) VALUES

(\'ELECTRONIC SHOP\', \'TRADE\', \'FORM.1\', \'License to trade as an
electronic shop\'),

(\'GENERAL BUSINESS\', \'TRADE\', \'FORM.1\', \'General business trade
license\'),

(\'PLACE OF ENTERTAINMENT\', \'ENTERTAINMENT\', \'FORM.1\', \'License to
keep a place of entertainment\'),

(\'PHARMACY\', \'HEALTH\', \'FORM.1\', \'License to trade as
pharmacy\'),

(\'SECOND HAND USED CLOTHING\', \'TRADE\', \'FORM.5\', \'Second hand
dealers license for used clothing\'),

(\'FUEL DISTRIBUTION/INDUSTRIAL GAS\', \'FUEL\', \'FORM.1\', \'License
to trade as fuel distribution/industrial gas\'),

(\'MECHANICAL WORKSHOP\', \'INDUSTRIAL\', \'FORM.1\', \'License to trade
as mechanical workshop\'),

(\'MANUFACTURER\', \'INDUSTRIAL\', \'FORM.1\', \'License to trade as
manufacturer\'),

(\'FUEL STATION\', \'FUEL\', \'FORM.1\', \'License to trade as fuel
station\'),

(\'TAVERN\', \'LIQUOR\', \'FORM 1\', \'Liquor license - Tavern\'),

(\'LIMITED HOTEL\', \'LIQUOR\', \'FORM 1\', \'Liquor license - Limited
Hotel\'),

(\'PACKET (LIQUOR)\', \'LIQUOR\', \'FORM.5\', \'Renewal of liquor
license - Packet (sea vessels)\'),

(\'PUBLICAN\', \'LIQUOR\', NULL, \'Liquor license - Publican\'),

(\'RESTAURANT\', \'LIQUOR\', \'FORM 7\', \'Liquor license -
Restaurant\'),

(\'STORE KEEPERS\', \'LIQUOR\', NULL, \'Liquor license - Store
Keepers\'),

(\'BOOTH\', \'LIQUOR\', NULL, \'Liquor license - Booth\'),

(\'BOTTLE-SHOP\', \'LIQUOR\', \'FORM 12\', \'Liquor license -
Bottle-Shop\'),

(\'CANTEEN\', \'LIQUOR\', \'FORM 12\', \'Liquor license - Canteen\'),

(\'CLUB\', \'LIQUOR\', \'FORM 6\', \'Liquor license - Club\'),

(\'MOTOR VEHICLE DEALER\', \'TRADE\', \'FORM.1\', \'License to trade as
motor vehicle dealer\'),

(\'BARBER SHOP\', \'SERVICES\', \'FORM.1\', \'Barber shop license\');

**Step 2: Insert Checklist Requirements for Each License Type**

**1. ELECTRONIC SHOP Requirements**

sql

INSERT INTO checklist_requirements (license_type_id, item_number,
document_name, responsible_entity, requirement_note)

SELECT id, 01, \'Application FORM.1\', \'NCDC\', \'Completed form,
signed and dated\' FROM license_types WHERE license_name = \'ELECTRONIC
SHOP\'

UNION ALL SELECT id, 02, \'Physical Planning Approvals\', \'NCDC\',
\'Applicable if land use changes\' FROM license_types WHERE license_name
= \'ELECTRONIC SHOP\'

UNION ALL SELECT id, 03, \'Building Authority Approvals\', \'NCDC\',
\'Applicable if structural changes occur\' FROM license_types WHERE
license_name = \'ELECTRONIC SHOP\'

UNION ALL SELECT id, 04, \'Land Title/Lease Agreement or Consent
letter\', \'Landlord\', \'Applicable if change of ownership or tenancy\'
FROM license_types WHERE license_name = \'ELECTRONIC SHOP\'

UNION ALL SELECT id, 05, \'Radio communication Apparatus License\',
\'National Information and Technology Authority (NICTA)\', \'Valid\'
FROM license_types WHERE license_name = \'ELECTRONIC SHOP\'

UNION ALL SELECT id, 06, \'Certificate of Incorporation\', \'IPA\',
\'Local & Foreign Companies\' FROM license_types WHERE license_name =
\'ELECTRONIC SHOP\'

UNION ALL SELECT id, 07, \'Company Extract\', \'IPA\', \'Local & Foreign
Companies\' FROM license_types WHERE license_name = \'ELECTRONIC SHOP\'

UNION ALL SELECT id, 08, \'Certificate of Registration of Business
Name\', \'IPA\', \'Valid\' FROM license_types WHERE license_name =
\'ELECTRONIC SHOP\'

UNION ALL SELECT id, 09, \'Certificate Permitting Foreigners to Operate
Business in PNG\', \'IPA\', \'Applicable if foreign owned entity\' FROM
license_types WHERE license_name = \'ELECTRONIC SHOP\'

UNION ALL SELECT id, 10, \'Land Tax & Garbage Rate\', \'NCDC\',
\'Evidence of payment\' FROM license_types WHERE license_name =
\'ELECTRONIC SHOP\'

UNION ALL SELECT id, 11, \'Copy of License for previous operator\',
\'Applicant\', \'Application if COM\' FROM license_types WHERE
license_name = \'ELECTRONIC SHOP\';

**2. GENERAL BUSINESS Requirements**

sql

INSERT INTO checklist_requirements (license_type_id, item_number,
document_name, responsible_entity, requirement_note)

SELECT id, 01, \'Application FORM .1\', \'NCDC\', \'Completed, signed
and dated\' FROM license_types WHERE license_name = \'GENERAL BUSINESS\'

UNION ALL SELECT id, 02, \'Physical Planning Approvals\', \'NCDC\',
\'Applicable if land use changes\' FROM license_types WHERE license_name
= \'GENERAL BUSINESS\'

UNION ALL SELECT id, 03, \'Building Authority Approvals\', \'NCDC\',
\'Applicable if structural changes occur\' FROM license_types WHERE
license_name = \'GENERAL BUSINESS\'

UNION ALL SELECT id, 04, \'Land Title/Lease Agreement\', \'Landlord\',
\'Valid\' FROM license_types WHERE license_name = \'GENERAL BUSINESS\'

UNION ALL SELECT id, 05, \'Certificate of Incorporation\', \'IPA\',
\'Local and Foreign Companies\' FROM license_types WHERE license_name =
\'GENERAL BUSINESS\'

UNION ALL SELECT id, 06, \'Company Extract\', \'IPA\', \'Local and
Foreign Companies\' FROM license_types WHERE license_name = \'GENERAL
BUSINESS\'

UNION ALL SELECT id, 07, \'Certificate of Registration of Business
Name\', \'IPA\', \'Valid\' FROM license_types WHERE license_name =
\'GENERAL BUSINESS\'

UNION ALL SELECT id, 08, \'Certificate Permitting Foreigners to Operate
Business in PNG\', \'IPA\', \'Applicable for Foreign Enterprise\' FROM
license_types WHERE license_name = \'GENERAL BUSINESS\'

UNION ALL SELECT id, 09, \'Land Tax & Garbage Rates\', \'NCDC\',
\'Evidence of payment\' FROM license_types WHERE license_name =
\'GENERAL BUSINESS\'

UNION ALL SELECT id, 10, \'Copy of License for previous Operator\',
\'Applicant\', \'Applicable if COM/New Ownership\' FROM license_types
WHERE license_name = \'GENERAL BUSINESS\';

**3. PLACE OF ENTERTAINMENT Requirements**

sql

INSERT INTO checklist_requirements (license_type_id, item_number,
document_name, responsible_entity, requirement_note)

SELECT id, 01, \'Application FORM.1 Reg:Sec.5(1)\', \'NCDC\',
\'Completed, signed and dated\' FROM license_types WHERE license_name =
\'PLACE OF ENTERTAINMENT\'

UNION ALL SELECT id, 02, \'Physical Planning Approvals\', \'NCDC\',
\'Applicable if land use changes\' FROM license_types WHERE license_name
= \'PLACE OF ENTERTAINMENT\'

UNION ALL SELECT id, 03, \'Building Authority Approvals\', \'NCDC\',
\'Applicable if structural changes occur\' FROM license_types WHERE
license_name = \'PLACE OF ENTERTAINMENT\'

UNION ALL SELECT id, 04, \'Land Title/Lease Agreement\', \'Landlord\',
\'Valid\' FROM license_types WHERE license_name = \'PLACE OF
ENTERTAINMENT\'

UNION ALL SELECT id, 05, \'Certificate of Incorporation\', \'IPA\',
\'Local and Foreign Companies\' FROM license_types WHERE license_name =
\'PLACE OF ENTERTAINMENT\'

UNION ALL SELECT id, 06, \'Company Extract\', \'IPA\', \'Local & Foreign
Companies\' FROM license_types WHERE license_name = \'PLACE OF
ENTERTAINMENT\'

UNION ALL SELECT id, 07, \'Certificate of Registration of Business
Name\', \'IPA\', \'Valid\' FROM license_types WHERE license_name =
\'PLACE OF ENTERTAINMENT\'

UNION ALL SELECT id, 08, \'Certificate Permitting Foreigners to Operate
Business in PNG\', \'IPA\', \'Applicable for Foreign Enterprise\' FROM
license_types WHERE license_name = \'PLACE OF ENTERTAINMENT\'

UNION ALL SELECT id, 09, \'Land Tax & Garbage Rate\', \'NCDC-Revenue\',
\'Evidence of payment\' FROM license_types WHERE license_name = \'PLACE
OF ENTERTAINMENT\'

UNION ALL SELECT id, 10, \'Copy of License for previous operator\',
\'Applicant\', \'Applicable if COM/New Ownership\' FROM license_types
WHERE license_name = \'PLACE OF ENTERTAINMENT\';

**4. PHARMACY Requirements**

sql

INSERT INTO checklist_requirements (license_type_id, item_number,
document_name, responsible_entity, requirement_note)

SELECT id, 01, \'Application FORM.1\', \'NCDC\', \'Completed, signed and
dated\' FROM license_types WHERE license_name = \'PHARMACY\'

UNION ALL SELECT id, 02, \'Physical Planning Approvals\', \'NCDC\',
\'Applicable if land use changes\' FROM license_types WHERE license_name
= \'PHARMACY\'

UNION ALL SELECT id, 03, \'Building Authority Approvals\', \'NCDC\',
\'Applicable if structural changes occur\' FROM license_types WHERE
license_name = \'PHARMACY\'

UNION ALL SELECT id, 04, \'Land Title/Lease Agreement\', \'Landlord\',
\'Valid\' FROM license_types WHERE license_name = \'PHARMACY\'

UNION ALL SELECT id, 05, \'Pharmaceutical License\', \'NDoH-Pharmacy
Board\', \'Valid\' FROM license_types WHERE license_name = \'PHARMACY\'

UNION ALL SELECT id, 06, \'Certificate of Incorporation\', \'IPA\',
\'Local and Foreign Companies\' FROM license_types WHERE license_name =
\'PHARMACY\'

UNION ALL SELECT id, 07, \'Company Extract\', \'IPA\', \'Local and
Foreign Companies\' FROM license_types WHERE license_name = \'PHARMACY\'

UNION ALL SELECT id, 08, \'Certificate of Registration of Business
Name\', \'IPA\', \'Valid\' FROM license_types WHERE license_name =
\'PHARMACY\'

UNION ALL SELECT id, 09, \'Certificate Permitting Foreigners to Operate
Business in PNG\', \'IPA\', \'Applicable for Foreign Enterprise\' FROM
license_types WHERE license_name = \'PHARMACY\'

UNION ALL SELECT id, 10, \'Land Tax & Garbage Rate\', \'NCDC\',
\'Evidence of payment\' FROM license_types WHERE license_name =
\'PHARMACY\'

UNION ALL SELECT id, 11, \'Copy of License for previous operator\',
\'Applicant\', \'Application if COM/New Ownership\' FROM license_types
WHERE license_name = \'PHARMACY\';

**5. SECOND HAND USED CLOTHING Requirements**

sql

INSERT INTO checklist_requirements (license_type_id, item_number,
document_name, responsible_entity, requirement_note)

SELECT id, 01, \'Application FORM.5\', \'NCDC\', \'Completed, signed and
dated\' FROM license_types WHERE license_name = \'SECOND HAND USED
CLOTHING\'

UNION ALL SELECT id, 02, \'Certificate of Fumigation\', \'National
Department of Health (NDoH)\', \'Valid\' FROM license_types WHERE
license_name = \'SECOND HAND USED CLOTHING\'

UNION ALL SELECT id, 03, \'Physical Planning Approvals\', \'NCDC\',
\'Applicable if land use changes\' FROM license_types WHERE license_name
= \'SECOND HAND USED CLOTHING\'

UNION ALL SELECT id, 04, \'Building Authority Approvals\', \'NCDC\',
\'Applicable if structural changes occur\' FROM license_types WHERE
license_name = \'SECOND HAND USED CLOTHING\'

UNION ALL SELECT id, 05, \'Land Title/Lease Agreement\', \'Landlord\',
\'Valid\' FROM license_types WHERE license_name = \'SECOND HAND USED
CLOTHING\'

UNION ALL SELECT id, 06, \'Certificate of Incorporation\', \'IPA\',
\'Local and Foreign Companies\' FROM license_types WHERE license_name =
\'SECOND HAND USED CLOTHING\'

UNION ALL SELECT id, 07, \'Company Extract\', \'IPA\', \'Local and
Foreign Companies\' FROM license_types WHERE license_name = \'SECOND
HAND USED CLOTHING\'

UNION ALL SELECT id, 08, \'Certificate of Registration of Business
Name\', \'IPA\', \'Valid\' FROM license_types WHERE license_name =
\'SECOND HAND USED CLOTHING\'

UNION ALL SELECT id, 09, \'Certificate Permitting Foreigners to Operate
Business in PNG\', \'IPA\', \'Applicable for foreign Enterprise\' FROM
license_types WHERE license_name = \'SECOND HAND USED CLOTHING\'

UNION ALL SELECT id, 10, \'Land Tax & Garbage Rate\', \'NCDC\',
\'Evidence of Payment\' FROM license_types WHERE license_name = \'SECOND
HAND USED CLOTHING\'

UNION ALL SELECT id, 11, \'Copy of License for previous Operator\',
\'Applicant\', \'Application if COM/New Ownership\' FROM license_types
WHERE license_name = \'SECOND HAND USED CLOTHING\';

**6. FUEL DISTRIBUTION/INDUSTRIAL GAS Requirements**

sql

INSERT INTO checklist_requirements (license_type_id, item_number,
document_name, responsible_entity, requirement_note)

SELECT id, 01, \'Application FORM.1\', \'NCDC\', \'Completed form
,signed & dated\' FROM license_types WHERE license_name = \'FUEL
DISTRIBUTION/INDUSTRIAL GAS\'

UNION ALL SELECT id, 02, \'Inflammable & Dangerous Goods
License/certificate\', \'Labour Department\', \'Valid\' FROM
license_types WHERE license_name = \'FUEL DISTRIBUTION/INDUSTRIAL GAS\'

UNION ALL SELECT id, 03, \'Physical Planning Approvals\', \'NCDC\',
\'Applicable if land use changes occur\' FROM license_types WHERE
license_name = \'FUEL DISTRIBUTION/INDUSTRIAL GAS\'

UNION ALL SELECT id, 04, \'Building Authority Approvals\', \'NCDC\',
\'Applicable if structural changes occur\' FROM license_types WHERE
license_name = \'FUEL DISTRIBUTION/INDUSTRIAL GAS\'

UNION ALL SELECT id, 05, \'Land Title/Lease Agreement or Consent
letter\', \'Landlord\', \'Valid Lease\' FROM license_types WHERE
license_name = \'FUEL DISTRIBUTION/INDUSTRIAL GAS\'

UNION ALL SELECT id, 06, \'Certificate of Incorporation\', \'IPA\',
\'Local & Foreign Enterprise\' FROM license_types WHERE license_name =
\'FUEL DISTRIBUTION/INDUSTRIAL GAS\'

UNION ALL SELECT id, 07, \'Company Extract\', \'IPA\', \'Local & Foreign
Enterprise\' FROM license_types WHERE license_name = \'FUEL
DISTRIBUTION/INDUSTRIAL GAS\'

UNION ALL SELECT id, 08, \'Certificate of Registration of Business
Name\', \'IPA\', \'Valid\' FROM license_types WHERE license_name =
\'FUEL DISTRIBUTION/INDUSTRIAL GAS\'

UNION ALL SELECT id, 09, \'Certificate Permitting Foreigners to Operate
Business in PNG\', \'IPA\', \'Applicable if foreign owned entity\' FROM
license_types WHERE license_name = \'FUEL DISTRIBUTION/INDUSTRIAL GAS\'

UNION ALL SELECT id, 10, \'Land Tax & Garbage Rate\', \'NCDC\',
\'Evidence of payment\' FROM license_types WHERE license_name = \'FUEL
DISTRIBUTION/INDUSTRIAL GAS\'

UNION ALL SELECT id, 11, \'Copy of License for previous operator\',
\'Applicant\', \'Application if COM\' FROM license_types WHERE
license_name = \'FUEL DISTRIBUTION/INDUSTRIAL GAS\';

**7. MECHANICAL WORKSHOP Requirements**

sql

INSERT INTO checklist_requirements (license_type_id, item_number,
document_name, responsible_entity, requirement_note)

SELECT id, 01, \'Application FORM.1\', \'NCDC\', \'Completed, signed and
dated\' FROM license_types WHERE license_name = \'MECHANICAL WORKSHOP\'

UNION ALL SELECT id, 02, \'Physical Planning Approvals\', \'NCDC\',
\'Applicable if land use changes\' FROM license_types WHERE license_name
= \'MECHANICAL WORKSHOP\'

UNION ALL SELECT id, 03, \'Building Authority Approvals\', \'NCDC\',
\'Applicable if structural changes occur\' FROM license_types WHERE
license_name = \'MECHANICAL WORKSHOP\'

UNION ALL SELECT id, 04, \'Land Title/Lease Agreement\', \'Landlord\',
\'Valid\' FROM license_types WHERE license_name = \'MECHANICAL
WORKSHOP\'

UNION ALL SELECT id, 05, \'Factory/Manufacturer License\', \'Labour
Department\', \'Valid\' FROM license_types WHERE license_name =
\'MECHANICAL WORKSHOP\'

UNION ALL SELECT id, 06, \'Certificate of Incorporation\', \'IPA\',
\'Local and Foreign Companies\' FROM license_types WHERE license_name =
\'MECHANICAL WORKSHOP\'

UNION ALL SELECT id, 07, \'Company Extract\', \'IPA\', \'Local and
Foreign Companies\' FROM license_types WHERE license_name = \'MECHANICAL
WORKSHOP\'

UNION ALL SELECT id, 08, \'Certificate of Registration of Business
Name\', \'IPA\', \'Valid\' FROM license_types WHERE license_name =
\'MECHANICAL WORKSHOP\'

UNION ALL SELECT id, 09, \'Certificate Permitting Foreigners to Operate
Business in PNG\', \'IPA\', \'Applicable for foreign Enterprise\' FROM
license_types WHERE license_name = \'MECHANICAL WORKSHOP\'

UNION ALL SELECT id, 10, \'Land Tax & Garbage Rate\', \'NCDC\',
\'Evidence of payment\' FROM license_types WHERE license_name =
\'MECHANICAL WORKSHOP\'

UNION ALL SELECT id, 11, \'Copy of license for the previous operator\',
\'Applicant\', \'Application if COM/New Ownership\' FROM license_types
WHERE license_name = \'MECHANICAL WORKSHOP\';

**8. MANUFACTURER Requirements**

sql

INSERT INTO checklist_requirements (license_type_id, item_number,
document_name, responsible_entity, requirement_note)

SELECT id, 01, \'Application FORM.1\', \'NCDC\', \'Completed, signed and
dated\' FROM license_types WHERE license_name = \'MANUFACTURER\'

UNION ALL SELECT id, 02, \'Physical Planning Approvals\', \'NCDC\',
\'Applicable if land use changes\' FROM license_types WHERE license_name
= \'MANUFACTURER\'

UNION ALL SELECT id, 03, \'Building Authority Approvals\', \'NCDC\',
\'Applicable if structural changes occur\' FROM license_types WHERE
license_name = \'MANUFACTURER\'

UNION ALL SELECT id, 04, \'Land Title/Lease Agreement\', \'Landlord\',
\'Valid\' FROM license_types WHERE license_name = \'MANUFACTURER\'

UNION ALL SELECT id, 05, \'Food Safety Management System (HACCP)\',
\'Applicant\', \'Applicable for Food Manufacturers\' FROM license_types
WHERE license_name = \'MANUFACTURER\'

UNION ALL SELECT id, 06, \'Factory/Manufacturer License\', \'Labour
Department\', \'Valid\' FROM license_types WHERE license_name =
\'MANUFACTURER\'

UNION ALL SELECT id, 07, \'Certificate of Incorporation\', \'IPA\',
\'Local and Foreign Companies\' FROM license_types WHERE license_name =
\'MANUFACTURER\'

UNION ALL SELECT id, 08, \'Company Extract\', \'IPA\', \'Local and
Foreign Companies\' FROM license_types WHERE license_name =
\'MANUFACTURER\'

UNION ALL SELECT id, 09, \'Certificate of Registration of Business
Name\', \'IPA\', \'Valid\' FROM license_types WHERE license_name =
\'MANUFACTURER\'

UNION ALL SELECT id, 10, \'Certificate Permitting Foreigners to Operate
Business in PNG\', \'IPA\', \'Applicable for foreign Enterprise\' FROM
license_types WHERE license_name = \'MANUFACTURER\'

UNION ALL SELECT id, 11, \'Land Tax & Garbage Rate\', \'NCDC\',
\'Evidence of payment\' FROM license_types WHERE license_name =
\'MANUFACTURER\'

UNION ALL SELECT id, 12, \'Copy of License for previous operator\',
\'Applicant\', \'Applicable if COM/New Ownership\' FROM license_types
WHERE license_name = \'MANUFACTURER\';

**9. FUEL STATION Requirements**

sql

INSERT INTO checklist_requirements (license_type_id, item_number,
document_name, responsible_entity, requirement_note)

SELECT id, 01, \'Application FORM.1\', \'NCDC\', \'Completed, signed and
dated\' FROM license_types WHERE license_name = \'FUEL STATION\'

UNION ALL SELECT id, 02, \'Inflammable & Dangerous Goods
License/certificate\', \'Labour Department\', \'Valid\' FROM
license_types WHERE license_name = \'FUEL STATION\'

UNION ALL SELECT id, 03, \'Physical Planning Approvals\', \'NCDC\',
\'Applicable if land use changes\' FROM license_types WHERE license_name
= \'FUEL STATION\'

UNION ALL SELECT id, 04, \'Building Authority Approvals\', \'NCDC\',
\'Applicable if structural changes occur\' FROM license_types WHERE
license_name = \'FUEL STATION\'

UNION ALL SELECT id, 05, \'Land Title/Lease Agreement\', \'Landlord\',
\'Valid\' FROM license_types WHERE license_name = \'FUEL STATION\'

UNION ALL SELECT id, 06, \'Certificate of Incorporation\', \'IPA\',
\'Local and Foreign Companies\' FROM license_types WHERE license_name =
\'FUEL STATION\'

UNION ALL SELECT id, 07, \'Company Extract\', \'IPA\', \'Local and
Foreign Companies\' FROM license_types WHERE license_name = \'FUEL
STATION\'

UNION ALL SELECT id, 08, \'Certificate of Registration of Business
Name\', \'IPA\', \'Valid\' FROM license_types WHERE license_name =
\'FUEL STATION\'

UNION ALL SELECT id, 09, \'Certificate Permitting Foreigners to Operate
Business in PNG\', \'IPA\', \'Applicable for foreign Enterprise\' FROM
license_types WHERE license_name = \'FUEL STATION\'

UNION ALL SELECT id, 10, \'Land Tax & Garbage Rate\', \'NCDC\',
\'Evidence of payment\' FROM license_types WHERE license_name = \'FUEL
STATION\'

UNION ALL SELECT id, 11, \'Copy of License for previous operator\',
\'Applicant\', \'Applicable if COM/New Ownership\' FROM license_types
WHERE license_name = \'FUEL STATION\';

**10. TAVERN Requirements**

sql

INSERT INTO checklist_requirements (license_type_id, item_number,
document_name, responsible_entity, requirement_note)

SELECT id, 01, \'Application FORM 1\', \'NCDC\', \'Completed, dated and
signed\' FROM license_types WHERE license_name = \'TAVERN\'

UNION ALL SELECT id, 02, \'Physical planning Approvals\', \'NCDC\',
\'Applicable if Land Use Changes\' FROM license_types WHERE license_name
= \'TAVERN\'

UNION ALL SELECT id, 03, \'Building Authority Approvals\', \'NCDC\',
\'Applicable if structural changes occur\' FROM license_types WHERE
license_name = \'TAVERN\'

UNION ALL SELECT id, 04, \'Land title or Lease Agreement\',
\'Landlord\', \'Valid\' FROM license_types WHERE license_name =
\'TAVERN\'

UNION ALL SELECT id, 05, \'Certificate of Incorporation\', \'IPA\',
\'Local and Foreign Enterprises\' FROM license_types WHERE license_name
= \'TAVERN\'

UNION ALL SELECT id, 06, \'Foreign Enterprise Certificate\', \'IPA\',
\'Applicable if Foreign Enterprise\' FROM license_types WHERE
license_name = \'TAVERN\'

UNION ALL SELECT id, 07, \'Company Extract\', \'IPA\', \'Local and
Foreign Enterprise\' FROM license_types WHERE license_name = \'TAVERN\'

UNION ALL SELECT id, 08, \'Business Name Registration Certificate\',
\'IPA\', \'Valid\' FROM license_types WHERE license_name = \'TAVERN\'

UNION ALL SELECT id, 09, \'Food Safety Management System (HACCP)\',
\'Applicant\', \'Applicable if Food is served (Hazard Analysis Critical
Control Point\' FROM license_types WHERE license_name = \'TAVERN\'

UNION ALL SELECT id, 10, \'Copy of License of Previous Operator\',
\'Applicant\', \'Applicable if Change of Management occur\' FROM
license_types WHERE license_name = \'TAVERN\'

UNION ALL SELECT id, 11, \'Number of Bars\', \'Applicant\', \'Name(s) of
Bars to be identified by way of letter\' FROM license_types WHERE
license_name = \'TAVERN\'

UNION ALL SELECT id, 12, \'Name of Approved Manager of the premise\',
\'Applicant\', \'To be identified by way of letter\' FROM license_types
WHERE license_name = \'TAVERN\'

UNION ALL SELECT id, 13, \'Statutory Declaration\', \'Justice of
Peace\', \'Declaring all information, Materials are true and correct in
nature\' FROM license_types WHERE license_name = \'TAVERN\'

UNION ALL SELECT id, 14, \'Land Tax & Garbage Bills\', \'NCDC\',
\'Evidence of Payments\' FROM license_types WHERE license_name =
\'TAVERN\';

**11. LIMITED HOTEL Requirements**

sql

INSERT INTO checklist_requirements (license_type_id, item_number,
document_name, responsible_entity, requirement_note)

SELECT id, 01, \'Application FORM 1\', \'NCDC\', \'Completed, dated and
signed\' FROM license_types WHERE license_name = \'LIMITED HOTEL\'

UNION ALL SELECT id, 02, \'Physical planning Approvals\', \'NCDC\',
\'Applicable if Land Use Changes\' FROM license_types WHERE license_name
= \'LIMITED HOTEL\'

UNION ALL SELECT id, 03, \'Building Authority Approvals\', \'NCDC\',
\'Applicable if structural changes occurs\' FROM license_types WHERE
license_name = \'LIMITED HOTEL\'

UNION ALL SELECT id, 04, \'Land title or Lease Agreement\',
\'Landlord\', \'Valid\' FROM license_types WHERE license_name =
\'LIMITED HOTEL\'

UNION ALL SELECT id, 05, \'Certificate of Incorporation\', \'IPA\',
\'Local and Foreign Enterprises\' FROM license_types WHERE license_name
= \'LIMITED HOTEL\'

UNION ALL SELECT id, 06, \'Foreign Enterprise Certificate\', \'IPA\',
\'Applicable if Foreign Enterprise\' FROM license_types WHERE
license_name = \'LIMITED HOTEL\'

UNION ALL SELECT id, 07, \'Company Extract\', \'IPA\', \'Local and
Foreign Enterprise\' FROM license_types WHERE license_name = \'LIMITED
HOTEL\'

UNION ALL SELECT id, 08, \'Business Name Registration Certificate\',
\'IPA\', \'Valid\' FROM license_types WHERE license_name = \'LIMITED
HOTEL\'

UNION ALL SELECT id, 09, \'Food Safety Management System\',
\'Applicant\', \'Applicable if Food is served. Hazard Analysis Critical
Control Point (HACCP)\' FROM license_types WHERE license_name =
\'LIMITED HOTEL\'

UNION ALL SELECT id, 10, \'Copy of License of Previous Operator\',
\'Applicant\', \'Applicable if Change of Management occurs\' FROM
license_types WHERE license_name = \'LIMITED HOTEL\'

UNION ALL SELECT id, 11, \'Number of Bars\', \'Applicant\', \'Name(s) of
Bars to be identified by way of letter\' FROM license_types WHERE
license_name = \'LIMITED HOTEL\'

UNION ALL SELECT id, 12, \'Name of Approved Manager of the premise\',
\'Applicant\', \'To be identified by way of letter\' FROM license_types
WHERE license_name = \'LIMITED HOTEL\'

UNION ALL SELECT id, 13, \'Statutory Declaration\', \'Justice of
Peace\', \'Declaring all information, Materials are true and correct in
nature\' FROM license_types WHERE license_name = \'LIMITED HOTEL\'

UNION ALL SELECT id, 14, \'Land Tax & Garbage Bills\', \'NCDC\',
\'Evidence\' FROM license_types WHERE license_name = \'LIMITED HOTEL\';

**12. PACKET (LIQUOR) Requirements**

sql

INSERT INTO checklist_requirements (license_type_id, item_number,
document_name, responsible_entity, requirement_note)

SELECT id, 01, \'Application Form No.5\', \'NCDC\', \'Completed, signed
and dated\' FROM license_types WHERE license_name = \'PACKET (LIQUOR)\'

UNION ALL SELECT id, 02, \'Certificate Business Name Registration\',
\'IPA\', \'Valid\' FROM license_types WHERE license_name = \'PACKET
(LIQUOR)\'

UNION ALL SELECT id, 03, \'Certified Sea Going Vessel\', \'National
Maritime Safety Authority\', \'Safety\' FROM license_types WHERE
license_name = \'PACKET (LIQUOR)\'

UNION ALL SELECT id, 04, \'Certified Overseas Ship\', \'National
Maritime Safety Authority\', \'Safety\' FROM license_types WHERE
license_name = \'PACKET (LIQUOR)\'

UNION ALL SELECT id, 05, \'Name of Master /Captain of Vessel/ship\',
\'Applicant\', \'To be confirmed by way of Letter\' FROM license_types
WHERE license_name = \'PACKET (LIQUOR)\'

UNION ALL SELECT id, 06, \'Statutory Declaration Form\', \'Justice of
Peace\', \'All information, material particular are true and correct\'
FROM license_types WHERE license_name = \'PACKET (LIQUOR)\';

**13. RESTAURANT Requirements**

sql

INSERT INTO checklist_requirements (license_type_id, item_number,
document_name, responsible_entity, requirement_note)

SELECT id, 01, \'Application FORM 7\', \'NCDC\', \'Completed, dated and
signed\' FROM license_types WHERE license_name = \'RESTAURANT\'

UNION ALL SELECT id, 02, \'Physical planning Approvals\', \'NCDC\',
\'Applicable if Land Use Changes\' FROM license_types WHERE license_name
= \'RESTAURANT\'

UNION ALL SELECT id, 03, \'Building Authority Approvals\', \'NCDC\',
\'Applicable if structural changes occur\' FROM license_types WHERE
license_name = \'RESTAURANT\'

UNION ALL SELECT id, 04, \'Land title or Lease Agreement\',
\'LandLord\', \'Valid\' FROM license_types WHERE license_name =
\'RESTAURANT\'

UNION ALL SELECT id, 05, \'Certificate of Incorporation\', \'IPA\',
\'Local and Foreign Enterprises\' FROM license_types WHERE license_name
= \'RESTAURANT\'

UNION ALL SELECT id, 06, \'Certificate Permitting Foreigners to Operate
Business in PNG\', \'IPA\', \'Applicable if Foreign Enterprise\' FROM
license_types WHERE license_name = \'RESTAURANT\'

UNION ALL SELECT id, 07, \'Company Extract\', \'IPA\', \'Local and
Foreign Enterprises\' FROM license_types WHERE license_name =
\'RESTAURANT\'

UNION ALL SELECT id, 08, \'Business Name Registration Certificate\',
\'IPA\', \'Valid\' FROM license_types WHERE license_name =
\'RESTAURANT\'

UNION ALL SELECT id, 09, \'Food Safety Management System (HACCP)\',
\'Applicant\', \'Hazard Analysis Critical Control Point (HACCP)\' FROM
license_types WHERE license_name = \'RESTAURANT\'

UNION ALL SELECT id, 10, \'Copy of license for previous operator\',
\'Applicant\', \'Applicable if Change of Management\' FROM license_types
WHERE license_name = \'RESTAURANT\'

UNION ALL SELECT id, 11, \'Number of Bars\', \'Applicant\', \'Name of
bar (s) to be identified by way of letter\' FROM license_types WHERE
license_name = \'RESTAURANT\'

UNION ALL SELECT id, 12, \'Name of Approved Manager of the premise\',
\'Applicant\', \'Name of Manager (s) to be identified by way of letter\'
FROM license_types WHERE license_name = \'RESTAURANT\'

UNION ALL SELECT id, 13, \'Statutory Declaration\', \'Justice of
Peace\', \'Declaring all information, Materials are true and correct in
nature\' FROM license_types WHERE license_name = \'RESTAURANT\'

UNION ALL SELECT id, 14, \'Land Tax & Garbage Bills\', \'NCDC\',
\'Evidence of payment\' FROM license_types WHERE license_name =
\'RESTAURANT\';

**14. BOTTLE-SHOP Requirements**

sql

INSERT INTO checklist_requirements (license_type_id, item_number,
document_name, responsible_entity, requirement_note)

SELECT id, 01, \'Application Form No 12\', \'NCDC\', \'Completed, dated
& signed\' FROM license_types WHERE license_name = \'BOTTLE-SHOP\'

UNION ALL SELECT id, 02, \'Physical planning Approvals\', \'NCDC\',
\'Applicable if Land Use Changes\' FROM license_types WHERE license_name
= \'BOTTLE-SHOP\'

UNION ALL SELECT id, 03, \'Building Authority Approvals\', \'NCDC\',
\'Applicable if structural changes occur\' FROM license_types WHERE
license_name = \'BOTTLE-SHOP\'

UNION ALL SELECT id, 04, \'Land title or Lease Agreement\',
\'LandLord\', \'Valid\' FROM license_types WHERE license_name =
\'BOTTLE-SHOP\'

UNION ALL SELECT id, 05, \'Certificate of Incorporation\', \'IPA\',
\'Local and Foreign\' FROM license_types WHERE license_name =
\'BOTTLE-SHOP\'

UNION ALL SELECT id, 06, \'Certificate Permitting Foreigners to Operate
Business in PNG\', \'IPA\', \'Applicable if Foreign Enterprise\' FROM
license_types WHERE license_name = \'BOTTLE-SHOP\'

UNION ALL SELECT id, 07, \'Company Extract\', \'IPA\', \'Local and
Foreign Enterprises\' FROM license_types WHERE license_name =
\'BOTTLE-SHOP\'

UNION ALL SELECT id, 08, \'Business Name Registration Certificate\',
\'IPA\', \'Valid\' FROM license_types WHERE license_name =
\'BOTTLE-SHOP\'

UNION ALL SELECT id, 09, \'Name of Approved Manager of the Premise\',
\'Applicant\', \'To be identified by way of letter\' FROM license_types
WHERE license_name = \'BOTTLE-SHOP\'

UNION ALL SELECT id, 10, \'Statutory Declaration\', \'Justice of
Peace\', \'All information, Materials are true and correct in nature\'
FROM license_types WHERE license_name = \'BOTTLE-SHOP\'

UNION ALL SELECT id, 11, \'Copy of License of Previous Operator\',
\'Applicant\', \'Applicable if Change of Management\' FROM license_types
WHERE license_name = \'BOTTLE-SHOP\'

UNION ALL SELECT id, 12, \'Land Tax and Garbage Bills\', \'NCDC\',
\'Evidence\' FROM license_types WHERE license_name = \'BOTTLE-SHOP\';

**15. CANTEEN Requirements**

sql

INSERT INTO checklist_requirements (license_type_id, item_number,
document_name, responsible_entity, requirement_note)

SELECT id, 01, \'Application FORM No.12\', \'NCDC\', \'Completed, signed
and dated\' FROM license_types WHERE license_name = \'CANTEEN\'

UNION ALL SELECT id, 02, \'Physical planning Approvals\', \'NCDC\',
\'Applicable if change in Land Use occur\' FROM license_types WHERE
license_name = \'CANTEEN\'

UNION ALL SELECT id, 03, \'Building Authority Approvals\', \'NCDC\',
\'Applicable if structural changes occur\' FROM license_types WHERE
license_name = \'CANTEEN\'

UNION ALL SELECT id, 04, \'Land Title or Lease Agreement\',
\'LandLord\', \'Valid\' FROM license_types WHERE license_name =
\'CANTEEN\'

UNION ALL SELECT id, 05, \'Certificate of Incorporation\', \'IPA\',
\'Valid\' FROM license_types WHERE license_name = \'CANTEEN\'

UNION ALL SELECT id, 06, \'Business Name Registration Certificate\',
\'IPA\', \'Local and Foreign Enterprise\' FROM license_types WHERE
license_name = \'CANTEEN\'

UNION ALL SELECT id, 07, \'Certificate Permitting Foreigners to Operate
Business in PNG\', \'IPA\', \'Applicable if Foreign Enterprises\' FROM
license_types WHERE license_name = \'CANTEEN\'

UNION ALL SELECT id, 08, \'Company Extract\', \'IPA\', \'Local and
Foreign Enterprise\' FROM license_types WHERE license_name = \'CANTEEN\'

UNION ALL SELECT id, 09, \'Copy of License for the Previous Operator\',
\'Applicant\', \'Applicable if change of Management occurs\' FROM
license_types WHERE license_name = \'CANTEEN\'

UNION ALL SELECT id, 10, \'Canteen\'\'s Rules\', \'Applicant\',
\'Updated Operational Orders/Rules\' FROM license_types WHERE
license_name = \'CANTEEN\'

UNION ALL SELECT id, 11, \'List of number of Employees\', \'Applicant\',
\'Updated List with Minimum of 25 heads\' FROM license_types WHERE
license_name = \'CANTEEN\'

UNION ALL SELECT id, 12, \'Food Safety Management System (HACCP)\',
\'Applicant\', \'Applicable If food is involved. Hazard Analysis
Critical Control Point\' FROM license_types WHERE license_name =
\'CANTEEN\'

UNION ALL SELECT id, 13, \'Name of Approved Licensee\', \'Applicant\',
\'To be identified by way of letter\' FROM license_types WHERE
license_name = \'CANTEEN\'

UNION ALL SELECT id, 14, \'Statutory Declaration Form\', \'Justice of
Peace\', \'All information, Materials are true and correct in nature\'
FROM license_types WHERE license_name = \'CANTEEN\'

UNION ALL SELECT id, 15, \'Land Tax & Garbage Bills\', \'NCDC\',
\'Evidence\' FROM license_types WHERE license_name = \'CANTEEN\';

**16. CLUB Requirements**

sql

INSERT INTO checklist_requirements (license_type_id, item_number,
document_name, responsible_entity, requirement_note)

SELECT id, 01, \'Application Form 6\', \'NCDC\', \'Completed, signed and
dated\' FROM license_types WHERE license_name = \'CLUB\'

UNION ALL SELECT id, 02, \'Physical planning Approvals\', \'NCDC\',
\'Applicable if Land Use Changes\' FROM license_types WHERE license_name
= \'CLUB\'

UNION ALL SELECT id, 03, \'Building Authority Approvals\', \'NCDC\',
\'Applicable if structural changes occur\' FROM license_types WHERE
license_name = \'CLUB\'

UNION ALL SELECT id, 04, \'Land title or Lease Agreement\',
\'LandLord\', \'Valid\' FROM license_types WHERE license_name = \'CLUB\'

UNION ALL SELECT id, 05, \'Certificate of Incorporation\', \'IPA\',
\'Local and Foreign Enterprise\' FROM license_types WHERE license_name =
\'CLUB\'

UNION ALL SELECT id, 06, \'Foreign Enterprise Certificate\', \'IPA\',
\'Applicable if Foreign Enterprise\' FROM license_types WHERE
license_name = \'CLUB\'

UNION ALL SELECT id, 07, \'Business Name Registration Certificate\',
\'IPA\', \'Valid\' FROM license_types WHERE license_name = \'CLUB\'

UNION ALL SELECT id, 08, \'Food Safety Management System\',
\'Applicant\', \'Applicable if food is involved\' FROM license_types
WHERE license_name = \'CLUB\'

UNION ALL SELECT id, 09, \'Number of Bars\', \'Applicant\', \'Name(s) of
Bars to be identified by way of letter\' FROM license_types WHERE
license_name = \'CLUB\'

UNION ALL SELECT id, 10, \'Name of Approved Manager of the premise\',
\'Applicant\', \'Valid\' FROM license_types WHERE license_name =
\'CLUB\'

UNION ALL SELECT id, 11, \'Club Constitution/Rules\', \'Applicant\',
\'Valid\' FROM license_types WHERE license_name = \'CLUB\'

UNION ALL SELECT id, 12, \'List of Subscribing Members\', \'Applicant\',
\'In excess of 50 members\' FROM license_types WHERE license_name =
\'CLUB\'

UNION ALL SELECT id, 13, \'Copy of the Annual General Meeting Minutes
(AGM)\', \'Applicant\', \'Valid\' FROM license_types WHERE license_name
= \'CLUB\'

UNION ALL SELECT id, 14, \'Copy of license of Previous Operator\',
\'Applicant\', \'Applicable if Change of Management (COM)\' FROM
license_types WHERE license_name = \'CLUB\'

UNION ALL SELECT id, 15, \'Statutory Declaration\', \'Justice of
Peace\', \'All information, Materials are true and correct in nature\'
FROM license_types WHERE license_name = \'CLUB\'

UNION ALL SELECT id, 16, \'Land Tax & Garbage Bills\', \'NCDC\',
\'Evidence of payment\' FROM license_types WHERE license_name =
\'CLUB\';

**17. MOTOR VEHICLE DEALER Requirements**

sql

INSERT INTO checklist_requirements (license_type_id, item_number,
document_name, responsible_entity, requirement_note)

SELECT id, 01, \'Application FORM.1\', \'NCDC\', \'Completed, signed and
dated\' FROM license_types WHERE license_name = \'MOTOR VEHICLE DEALER\'

UNION ALL SELECT id, 02, \'Physical Planning Approvals\', \'NCDC\',
\'Applicable if land use changes\' FROM license_types WHERE license_name
= \'MOTOR VEHICLE DEALER\'

UNION ALL SELECT id, 03, \'Building Authority Approvals\', \'NCDC\',
\'Applicable if structural changes occur\' FROM license_types WHERE
license_name = \'MOTOR VEHICLE DEALER\'

UNION ALL SELECT id, 04, \'Land Title/Lease Agreement\', \'Landlord\',
\'Valid\' FROM license_types WHERE license_name = \'MOTOR VEHICLE
DEALER\'

UNION ALL SELECT id, 05, \'Motor Car Dealers License\', \'Land Transport
Board\', \'Valid\' FROM license_types WHERE license_name = \'MOTOR
VEHICLE DEALER\'

UNION ALL SELECT id, 06, \'Certificate of Incorporation\', \'IPA\',
\'Local and Foreign Company\' FROM license_types WHERE license_name =
\'MOTOR VEHICLE DEALER\'

UNION ALL SELECT id, 07, \'Company Extract\', \'IPA\', \'Local and
Foreign Company\' FROM license_types WHERE license_name = \'MOTOR
VEHICLE DEALER\'

UNION ALL SELECT id, 08, \'Certificate of Registration of Business
Name\', \'IPA\', \'Valid\' FROM license_types WHERE license_name =
\'MOTOR VEHICLE DEALER\'

UNION ALL SELECT id, 09, \'Certificate Permitting Foreigners to Operate
Business in PNG\', \'IPA\', \'Applicable for foreign Enterprise\' FROM
license_types WHERE license_name = \'MOTOR VEHICLE DEALER\'

UNION ALL SELECT id, 10, \'Land Tax & Garbage Rate\', \'NCDC\',
\'Evidence of payment\' FROM license_types WHERE license_name = \'MOTOR
VEHICLE DEALER\'

UNION ALL SELECT id, 11, \'Copy of License for previous operator\',
\'Applicant\', \'Application if COM/New Ownership\' FROM license_types
WHERE license_name = \'MOTOR VEHICLE DEALER\';

**18. BARBER SHOP Requirements**

sql

INSERT INTO checklist_requirements (license_type_id, item_number,
document_name, responsible_entity, requirement_note)

SELECT id, 01, \'Application FORM.1 Reg:3(2)\', \'NCDC\', \'Completed,
signed and dated\' FROM license_types WHERE license_name = \'BARBER
SHOP\'

UNION ALL SELECT id, 02, \'Physical Planning Approvals\', \'NCDC\',
\'Applicable if land use changes\' FROM license_types WHERE license_name
= \'BARBER SHOP\'

UNION ALL SELECT id, 03, \'Building Authority Approvals\', \'NCDC\',
\'Applicable if structural changes occur\' FROM license_types WHERE
license_name = \'BARBER SHOP\'

UNION ALL SELECT id, 04, \'Land Title/Lease Agreement\', \'Landlord\',
\'Valid\' FROM license_types WHERE license_name = \'BARBER SHOP\'

UNION ALL SELECT id, 05, \'Certificate of Incorporation\', \'IPA\',
\'Local and Foreign Companies\' FROM license_types WHERE license_name =
\'BARBER SHOP\'

UNION ALL SELECT id, 06, \'Company Extract\', \'IPA\', \'Local and
Foreign Companies\' FROM license_types WHERE license_name = \'BARBER
SHOP\'

UNION ALL SELECT id, 07, \'Certificate of Registration of Business
Name\', \'IPA\', \'Valid\' FROM license_types WHERE license_name =
\'BARBER SHOP\'

UNION ALL SELECT id, 08, \'Certificate Permitting Foreigners to Operate
Business in PNG\', \'IPA\', \'Applicable for foreign Enterprise\' FROM
license_types WHERE license_name = \'BARBER SHOP\'

UNION ALL SELECT id, 09, \'Land Tax & Garbage Rate\', \'NCDC\',
\'Evidence of payment\' FROM license_types WHERE license_name = \'BARBER
SHOP\'

UNION ALL SELECT id, 10, \'Copy of license for previous Operator\',
\'Applicant\', \'Application if COM/New Ownership\' FROM license_types
WHERE license_name = \'BARBER SHOP\';

**Step 3: Insert Special Requirements**

sql

*\-- Insert industry-specific special requirements*

INSERT INTO special_requirements (license_type_id, requirement_name,
issuing_authority, description)

SELECT id, \'Radio communication Apparatus License\', \'National
Information and Technology Authority (NICTA)\', \'For businesses using
radio communication equipment\' FROM license_types WHERE license_name =
\'ELECTRONIC SHOP\'

UNION ALL SELECT id, \'Pharmaceutical License\', \'NDoH-Pharmacy
Board\', \'Required for pharmacy operations\' FROM license_types WHERE
license_name = \'PHARMACY\'

UNION ALL SELECT id, \'Certificate of Fumigation\', \'National
Department of Health (NDoH)\', \'Required for second-hand clothing\'
FROM license_types WHERE license_name = \'SECOND HAND USED CLOTHING\'

UNION ALL SELECT id, \'Inflammable & Dangerous Goods
License/certificate\', \'Labour Department\', \'Required for
fuel-related businesses\' FROM license_types WHERE license_name = \'FUEL
DISTRIBUTION/INDUSTRIAL GAS\'

UNION ALL SELECT id, \'Inflammable & Dangerous Goods
License/certificate\', \'Labour Department\', \'Required for fuel
stations\' FROM license_types WHERE license_name = \'FUEL STATION\'

UNION ALL SELECT id, \'Factory/Manufacturer License\', \'Labour
Department\', \'Required for manufacturing operations\' FROM
license_types WHERE license_name IN (\'MECHANICAL WORKSHOP\',
\'MANUFACTURER\')

UNION ALL SELECT id, \'Food Safety Management System (HACCP)\',
\'Applicant\', \'Required for food-related businesses\' FROM
license_types WHERE license_name IN (\'MANUFACTURER\', \'TAVERN\',
\'LIMITED HOTEL\', \'RESTAURANT\', \'CANTEEN\')

UNION ALL SELECT id, \'Motor Car Dealers License\', \'Land Transport
Board\', \'Required for vehicle dealerships\' FROM license_types WHERE
license_name = \'MOTOR VEHICLE DEALER\'

UNION ALL SELECT id, \'Certified Sea Going Vessel\', \'National Maritime
Safety Authority\', \'Required for Packet liquor license\' FROM
license_types WHERE license_name = \'PACKET (LIQUOR)\'

UNION ALL SELECT id, \'Certified Overseas Ship\', \'National Maritime
Safety Authority\', \'Required for Packet liquor license\' FROM
license_types WHERE license_name = \'PACKET (LIQUOR)\';

**Step 4: Verification Script**

sql

*\-- Verification script to check data insertion*

SELECT

lt.license_name,

COUNT(cr.id) as requirement_count,

MIN(cr.item_number) as min_item,

MAX(cr.item_number) as max_item

FROM license_types lt

LEFT JOIN checklist_requirements cr ON lt.id = cr.license_type_id

GROUP BY lt.license_name

ORDER BY lt.license_name;

*\-- View all checklist items*

SELECT

lt.license_name,

cr.item_number,

cr.document_name,

cr.responsible_entity,

cr.requirement_note

FROM checklist_requirements cr

JOIN license_types lt ON cr.license_type_id = lt.id

ORDER BY lt.license_name, cr.item_number;

**Next Logical Steps (Baby Steps for Implementation)**

1.  Confirm **priority modules** for a pilot council

2.  Map **existing manual workflows** against LGIS modules

3.  Define **fee schedules and bylaws** for configuration

4.  Select **payment gateways and banks**

5.  Deploy **pilot (web + mobile)** in one council

6.  Iterate before national or multi-council rollout

------------------------------------------------------------------------

If required, I can **extend this PRD** with:

- Detailed ERD and UML diagrams

- API specifications

- Mobile app wireframes

- Budget and cost models

- AI-ready instructions for automated development platforms

Please indicate how you would like to proceed.

Detailed ERD and UML diagrams API specifications Mobile app wireframes

I will produce (1) a detailed ERD covering core LGIS modules with
multi-tenant council hierarchy and payments, (2) UML diagrams
(use-case + key sequence/class), (3) an API spec (OpenAPI-style) for
major flows, and (4) mobile wireframes for key field workflows
(inspection, enforcement, payment verification, complaints, offline
sync).

Thought for 17s

Below are **(1) a detailed ERD**, **(2) UML diagrams (Use Case, Class,
Sequence)**, **(3) API specifications (OpenAPI 3.1-oriented)**, and
**(4) low-fidelity mobile app wireframes** for the LGIS.

References are aligned to **UML 2.5.1** (OMG, 2017), **OpenAPI 3.1.0**
(OpenAPI Initiative, 2021), and **OWASP API Security Top 10 (2023)**
(OWASP, 2023).

------------------------------------------------------------------------

**1) Detailed ERD (Mermaid ER Diagram)**

**1.1 How to use (baby steps)**

1.  Copy the Mermaid code below.

2.  Paste into any Mermaid renderer (e.g., Mermaid Live Editor).

3.  Export as SVG/PNG for your documentation.\
    (ER notation is conceptual; implement physically in PostgreSQL/MySQL
    with constraints and indexes.)

**1.2 ERD code**

erDiagram

COUNCIL \|\|\--o{ COUNCIL_UNIT : has

COUNCIL \|\|\--o{ USER : employs

COUNCIL \|\|\--o{ SERVICE_CATALOG : defines

COUNCIL \|\|\--o{ FEE_SCHEDULE : configures

COUNCIL \|\|\--o{ PROPERTY : registers

COUNCIL \|\|\--o{ ASSET : owns

COUNCIL \|\|\--o{ PROJECT : delivers

COUNCIL \|\|\--o{ FUND : manages

COUNCIL_UNIT \|\|\--o{ USER : assigns

ROLE \|\|\--o{ USER_ROLE : maps

USER \|\|\--o{ USER_ROLE : has

PERMISSION \|\|\--o{ ROLE_PERMISSION : grants

ROLE \|\|\--o{ ROLE_PERMISSION : has

USER \|\|\--o{ AUDIT_LOG : generates

CITIZEN \|\|\--o{ ADDRESS : has

BUSINESS \|\|\--o{ ADDRESS : has

CITIZEN \|\|\--o{ CONTACT_POINT : uses

BUSINESS \|\|\--o{ CONTACT_POINT : uses

CITIZEN \|\|\--o{ ACCOUNT : holds

BUSINESS \|\|\--o{ ACCOUNT : holds

ACCOUNT \|\|\--o{ INVOICE : billed

INVOICE \|\|\--o{ INVOICE_LINE : contains

INVOICE \|\|\--o{ PAYMENT : settled_by

PAYMENT \|\|\--o{ PAYMENT_ALLOCATION : allocates

PAYMENT_ALLOCATION }o\--\|\| INVOICE : to

SERVICE_CATALOG \|\|\--o{ SERVICE_REQUEST : requested_as

SERVICE_REQUEST \|\|\--o{ WORKFLOW_INSTANCE : follows

WORKFLOW_DEFINITION \|\|\--o{ WORKFLOW_INSTANCE : instantiates

WORKFLOW_DEFINITION \|\|\--o{ WORKFLOW_STEP : includes

WORKFLOW_INSTANCE \|\|\--o{ WORKFLOW_TASK : produces

SERVICE_REQUEST \|\|\--o{ DOCUMENT : attaches

SERVICE_REQUEST \|\|\--o{ NOTE : has

SERVICE_REQUEST \|\|\--o{ INSPECTION : may_require

SERVICE_REQUEST \|\|\--o{ PERMIT : issues

SERVICE_REQUEST \|\|\--o{ LICENSE : issues

SERVICE_REQUEST \|\|\--o{ ENFORCEMENT_CASE : may_trigger

LICENSE \|\|\--o{ LICENSE_RENEWAL : renews

LICENSE \|\|\--o{ LICENSE_CONDITION : constrained_by

PERMIT \|\|\--o{ PERMIT_CONDITION : constrained_by

PROPERTY \|\|\--o{ PROPERTY_VALUATION : valued

PROPERTY \|\|\--o{ RATE_ASSESSMENT : assessed

RATE_ASSESSMENT \|\|\--o{ INVOICE : billed_as

MARKET \|\|\--o{ STALL : contains

STALL \|\|\--o{ STALL_TENANCY : rented

BUSINESS \|\|\--o{ STALL_TENANCY : holds

STALL_TENANCY \|\|\--o{ INVOICE : billed_as

INSPECTION \|\|\--o{ INSPECTION_FINDING : records

INSPECTION \|\|\--o{ INSPECTION_EVIDENCE : collects

USER \|\|\--o{ INSPECTION : performs

ENFORCEMENT_CASE \|\|\--o{ NOTICE : issues

ENFORCEMENT_CASE \|\|\--o{ PENALTY : imposes

PENALTY \|\|\--o{ INVOICE : billed_as

COMPLAINT \|\|\--o{ COMPLAINT_UPDATE : tracks

CITIZEN \|\|\--o{ COMPLAINT : lodges

BUSINESS \|\|\--o{ COMPLAINT : lodges

USER \|\|\--o{ COMPLAINT_UPDATE : updates

FINANCE_TXN \|\|\--o{ GL_ENTRY : posts

FUND \|\|\--o{ GL_ENTRY : funds

VENDOR \|\|\--o{ PROCUREMENT : supplies

PROCUREMENT \|\|\--o{ PROCUREMENT_ITEM : contains

DEVICE \|\|\--o{ MOBILE_SESSION : has

MOBILE_SESSION \|\|\--o{ OFFLINE_QUEUE : stores

OFFLINE_QUEUE \|\|\--o{ SYNC_JOB : syncs

%% ============== ENTITIES ==================

COUNCIL {

uuid council_id PK

string name

string level \"city\|municipal\|district\|llg\"

string country_code

string currency_code

string timezone

string status

datetime created_at

}

COUNCIL_UNIT {

uuid unit_id PK

uuid council_id FK

string name

string type \"finance\|licensing\|works\|health\|admin\"

uuid parent_unit_id FK

}

USER {

uuid user_id PK

uuid council_id FK

uuid unit_id FK

string full_name

string email UNIQUE

string phone

string status

string password_hash

boolean mfa_enabled

datetime last_login_at

}

ROLE {

uuid role_id PK

uuid council_id FK

string name

string scope \"council\|unit\|ward\|location\"

}

PERMISSION {

uuid permission_id PK

string code UNIQUE

string description

}

USER_ROLE {

uuid user_id FK

uuid role_id FK

datetime assigned_at

}

ROLE_PERMISSION {

uuid role_id FK

uuid permission_id FK

}

AUDIT_LOG {

uuid audit_id PK

uuid council_id FK

uuid user_id FK

string action

string entity_type

uuid entity_id

json before_state

json after_state

string ip_address

datetime created_at

}

CITIZEN {

uuid citizen_id PK

uuid council_id FK

string national_id

string local_citizen_no UNIQUE

string first_name

string last_name

date dob

string sex

}

BUSINESS {

uuid business_id PK

uuid council_id FK

string registration_no

string tin

string legal_name

string trading_name

string business_type

}

ADDRESS {

uuid address_id PK

uuid council_id FK

string owner_type \"citizen\|business\|property\"

uuid owner_id

string line1

string ward

string village

string district

float latitude

float longitude

}

CONTACT_POINT {

uuid contact_id PK

uuid council_id FK

string owner_type \"citizen\|business\"

uuid owner_id

string type \"phone\|email\|whatsapp\"

string value

boolean is_primary

}

ACCOUNT {

uuid account_id PK

uuid council_id FK

string holder_type \"citizen\|business\"

uuid holder_id

string account_no UNIQUE

string status

}

SERVICE_CATALOG {

uuid service_id PK

uuid council_id FK

string code UNIQUE

string name

string category \"licence\|permit\|rate\|market\|complaint\|works\"

boolean requires_inspection

boolean requires_approval

boolean active

}

FEE_SCHEDULE {

uuid fee_id PK

uuid council_id FK

uuid service_id FK

string name

string basis \"flat\|per_day\|per_area\|per_unit\|tiered\"

decimal amount

string currency

date valid_from

date valid_to

}

SERVICE_REQUEST {

uuid request_id PK

uuid council_id FK

uuid service_id FK

string requester_type \"citizen\|business\"

uuid requester_id

string status
\"draft\|submitted\|in_review\|inspection\|approved\|rejected\|completed\"

datetime submitted_at

string channel \"web\|mobile\|kiosk\|counter\"

json form_data

}

DOCUMENT {

uuid document_id PK

uuid council_id FK

uuid request_id FK

string doc_type

string file_url

string checksum

datetime uploaded_at

}

NOTE {

uuid note_id PK

uuid council_id FK

uuid request_id FK

uuid created_by FK

string text

datetime created_at

}

WORKFLOW_DEFINITION {

uuid workflow_id PK

uuid council_id FK

uuid service_id FK

string version

boolean active

}

WORKFLOW_STEP {

uuid step_id PK

uuid council_id FK

uuid workflow_id FK

string name

int order_no

string assignee_role

string sla_rule

}

WORKFLOW_INSTANCE {

uuid instance_id PK

uuid council_id FK

uuid request_id FK

uuid workflow_id FK

string state

datetime started_at

datetime ended_at

}

WORKFLOW_TASK {

uuid task_id PK

uuid council_id FK

uuid instance_id FK

uuid step_id FK

uuid assigned_to FK

string status \"open\|done\|rejected\"

datetime due_at

datetime completed_at

}

LICENSE {

uuid license_id PK

uuid council_id FK

uuid request_id FK

string license_no UNIQUE

date issue_date

date expiry_date

string status \"active\|suspended\|expired\|revoked\"

}

LICENSE_RENEWAL {

uuid renewal_id PK

uuid council_id FK

uuid license_id FK

uuid request_id FK

date renewed_to

}

LICENSE_CONDITION {

uuid condition_id PK

uuid council_id FK

uuid license_id FK

string condition_text

}

PERMIT {

uuid permit_id PK

uuid council_id FK

uuid request_id FK

string permit_no UNIQUE

date issue_date

date expiry_date

string status

}

PERMIT_CONDITION {

uuid condition_id PK

uuid council_id FK

uuid permit_id FK

string condition_text

}

INSPECTION {

uuid inspection_id PK

uuid council_id FK

uuid request_id FK

uuid inspector_user_id FK

datetime scheduled_at

datetime performed_at

string result \"pass\|fail\|conditional\"

string remarks

float latitude

float longitude

}

INSPECTION_FINDING {

uuid finding_id PK

uuid council_id FK

uuid inspection_id FK

string code

string severity \"low\|medium\|high\"

string description

string corrective_action

date due_date

}

INSPECTION_EVIDENCE {

uuid evidence_id PK

uuid council_id FK

uuid inspection_id FK

string media_type \"photo\|video\|document\"

string url

string hash

}

PROPERTY {

uuid property_id PK

uuid council_id FK

string property_no UNIQUE

string parcel_no

string usage \"residential\|commercial\|industrial\|mixed\"

float area_sqm

string tenure_type

}

PROPERTY_VALUATION {

uuid valuation_id PK

uuid council_id FK

uuid property_id FK

decimal value_amount

date valuation_date

string method

}

RATE_ASSESSMENT {

uuid assessment_id PK

uuid council_id FK

uuid property_id FK

string period \"YYYY\|YYYY-Qn\"

decimal rate_amount

string status \"assessed\|billed\|paid\|arrears\"

}

MARKET {

uuid market_id PK

uuid council_id FK

string name

string location_desc

}

STALL {

uuid stall_id PK

uuid council_id FK

uuid market_id FK

string stall_code UNIQUE

string type

string status \"available\|occupied\|inactive\"

}

STALL_TENANCY {

uuid tenancy_id PK

uuid council_id FK

uuid stall_id FK

uuid business_id FK

date start_date

date end_date

string status

}

INVOICE {

uuid invoice_id PK

uuid council_id FK

uuid account_id FK

string invoice_no UNIQUE

decimal total_amount

string currency

string status \"issued\|part_paid\|paid\|cancelled\|overdue\"

datetime issued_at

datetime due_at

}

INVOICE_LINE {

uuid line_id PK

uuid council_id FK

uuid invoice_id FK

string item_code

string description

int quantity

decimal unit_price

decimal line_total

uuid service_id FK

}

PAYMENT {

uuid payment_id PK

uuid council_id FK

uuid account_id FK

string payment_ref UNIQUE

decimal amount

string currency

string method \"card\|bank\|cash\|cheque\|mobile_money\"

string provider \"visa\|mastercard\|bankX\|pos\"

string status \"pending\|successful\|failed\|reversed\"

datetime paid_at

json provider_payload

}

PAYMENT_ALLOCATION {

uuid allocation_id PK

uuid council_id FK

uuid payment_id FK

uuid invoice_id FK

decimal allocated_amount

}

ENFORCEMENT_CASE {

uuid case_id PK

uuid council_id FK

uuid request_id FK

string case_no UNIQUE

string type \"non_compliance\|arrears\|illegal_trading\"

string status \"open\|in_progress\|closed\"

}

NOTICE {

uuid notice_id PK

uuid council_id FK

uuid case_id FK

string notice_no UNIQUE

string notice_type \"warning\|closure\|seizure\"

date issued_date

date compliance_due

string details

}

PENALTY {

uuid penalty_id PK

uuid council_id FK

uuid case_id FK

string penalty_type \"fine\|interest\|fee\"

decimal amount

string status

}

COMPLAINT {

uuid complaint_id PK

uuid council_id FK

string complainant_type \"citizen\|business\"

uuid complainant_id

string category \"waste\|roads\|lighting\|noise\|other\"

string status \"new\|assigned\|in_progress\|resolved\|closed\"

string description

float latitude

float longitude

datetime created_at

}

COMPLAINT_UPDATE {

uuid update_id PK

uuid council_id FK

uuid complaint_id FK

uuid updated_by FK

string status

string comment

datetime created_at

}

ASSET {

uuid asset_id PK

uuid council_id FK

string asset_tag UNIQUE

string name

string category

string condition

}

PROJECT {

uuid project_id PK

uuid council_id FK

string name

string sector

decimal budget_amount

string status

}

FUND {

uuid fund_id PK

uuid council_id FK

string name

string type \"revenue\|grant\|donor\|special\"

}

FINANCE_TXN {

uuid txn_id PK

uuid council_id FK

string source \"invoice\|payment\|procurement\"

uuid source_id

datetime txn_date

decimal amount

}

GL_ENTRY {

uuid gl_id PK

uuid council_id FK

uuid txn_id FK

uuid fund_id FK

string account_code

decimal debit

decimal credit

string narration

}

VENDOR {

uuid vendor_id PK

uuid council_id FK

string name

string tin

string status

}

PROCUREMENT {

uuid proc_id PK

uuid council_id FK

uuid vendor_id FK

string proc_no UNIQUE

string status

datetime created_at

}

PROCUREMENT_ITEM {

uuid item_id PK

uuid council_id FK

uuid proc_id FK

string description

int quantity

decimal unit_cost

}

DEVICE {

uuid device_id PK

uuid council_id FK

uuid user_id FK

string platform \"android\|ios\"

string device_fingerprint UNIQUE

boolean trusted

}

MOBILE_SESSION {

uuid session_id PK

uuid council_id FK

uuid device_id FK

string refresh_token_hash

datetime issued_at

datetime expires_at

}

OFFLINE_QUEUE {

uuid queue_id PK

uuid council_id FK

uuid device_id FK

string entity_type

string operation \"create\|update\|delete\"

uuid local_uuid

json payload

string status \"queued\|synced\|failed\"

datetime queued_at

}

SYNC_JOB {

uuid sync_id PK

uuid council_id FK

uuid device_id FK

datetime started_at

datetime ended_at

string outcome \"success\|partial\|failed\"

json summary

}

------------------------------------------------------------------------

**2) UML Diagrams (PlantUML)**

UML artefacts below follow OMG UML 2.5.1 conventions (OMG, 2017).

**2.1 How to render (baby steps)**

1.  Copy any PlantUML code block.

2.  Paste into a PlantUML renderer (desktop, server, or IDE plugin).

3.  Export as PNG/SVG.

------------------------------------------------------------------------

**2.2 Use Case Diagram (Council + Citizen + Field Officer)**

\@startuml

left to right direction

actor Citizen

actor Business

actor \"Revenue Officer\" as Rev

actor \"Licensing Officer\" as Lic

actor \"Inspector (Mobile)\" as Insp

actor \"System Admin\" as Admin

actor \"Bank/PSP\" as PSP

rectangle LGIS {

usecase \"Register / Login\" as UC1

usecase \"Apply for Licence/Permit\" as UC2

usecase \"Submit Documents\" as UC3

usecase \"Track Application Status\" as UC4

usecase \"Receive Invoice\" as UC5

usecase \"Make Payment\" as UC6

usecase \"Issue Licence/Permit\" as UC7

usecase \"Schedule & Perform Inspection\" as UC8

usecase \"Record Findings + Evidence\" as UC9

usecase \"Generate Receipt\" as UC10

usecase \"Reconcile Payments\" as UC11

usecase \"Manage Fees & Workflows\" as UC12

usecase \"Audit & Reports\" as UC13

usecase \"Log Complaint / Service Request\" as UC14

usecase \"Resolve Complaint\" as UC15

}

Citizen \--\> UC1

Business \--\> UC1

Citizen \--\> UC2

Business \--\> UC2

Citizen \--\> UC3

Business \--\> UC3

Citizen \--\> UC4

Business \--\> UC4

Citizen \--\> UC14

Business \--\> UC14

Lic \--\> UC7

Lic \--\> UC12

Rev \--\> UC5

Rev \--\> UC10

Rev \--\> UC11

Insp \--\> UC8

Insp \--\> UC9

Admin \--\> UC12

Admin \--\> UC13

UC6 \--\> PSP

PSP \--\> UC10

\@enduml

------------------------------------------------------------------------

**2.3 Class Diagram (Key domain objects)**

\@startuml

class Council {

+councilId: UUID

+name: String

+level: String

+currency: String

}

class User {

+userId: UUID

+email: String

+status: String

}

class ServiceRequest {

+requestId: UUID

+status: String

+submittedAt: DateTime

}

class ServiceCatalog {

+serviceId: UUID

+code: String

+name: String

}

class WorkflowInstance {

+instanceId: UUID

+state: String

}

class Invoice {

+invoiceId: UUID

+invoiceNo: String

+totalAmount: Money

+status: String

}

class Payment {

+paymentId: UUID

+method: String

+status: String

+amount: Money

}

class Inspection {

+inspectionId: UUID

+result: String

+performedAt: DateTime

+gps: String

}

class License {

+licenseId: UUID

+licenseNo: String

+expiryDate: Date

+status: String

}

Council \"1\" \-- \"many\" User

Council \"1\" \-- \"many\" ServiceCatalog

ServiceCatalog \"1\" \-- \"many\" ServiceRequest

ServiceRequest \"1\" \-- \"0..1\" WorkflowInstance

ServiceRequest \"1\" \-- \"0..many\" Invoice

Invoice \"1\" \-- \"0..many\" Payment

ServiceRequest \"1\" \-- \"0..many\" Inspection

ServiceRequest \"1\" \-- \"0..1\" License

\@enduml

------------------------------------------------------------------------

**2.4 Sequence Diagram: Licence application → inspection → invoice →
payment → issuance**

\@startuml

actor Applicant

participant \"LGIS Web/Mobile\" as App

participant \"Workflow Engine\" as WF

participant \"Inspection Service\" as INS

participant \"Billing Service\" as BILL

participant \"Payment Gateway/Bank\" as PSP

participant \"Licensing Service\" as LIC

participant \"Notification Service\" as NOTIF

Applicant -\> App: Submit application + documents

App -\> WF: Start workflow(request)

WF -\> INS: If required, create inspection task

INS -\> App: Notify inspector assignment

Applicant \<- NOTIF: \"Application received\"

== Inspection ==

INS -\> App: Inspector performs inspection (offline/online)

App -\> INS: Upload findings + evidence + GPS

INS -\> WF: Update task complete (pass/fail)

== Billing ==

WF -\> BILL: Generate invoice (fees)

BILL -\> App: Invoice available

Applicant \<- NOTIF: Invoice issued

== Payment ==

Applicant -\> App: Pay (card/bank/cash/cheque)

App -\> PSP: Initiate/record payment

PSP -\> App: Payment success (or bank reconciliation)

App -\> BILL: Allocate payment to invoice

BILL -\> WF: Mark financial step complete

== Issuance ==

WF -\> LIC: Issue licence

LIC -\> App: Licence PDF/QR available

Applicant \<- NOTIF: Licence issued

\@enduml

------------------------------------------------------------------------

**3) API Specifications (OpenAPI 3.1-oriented)**

OpenAPI 3.1.0 aligns with modern JSON Schema and is suitable for
tool-driven generation and validation (OpenAPI Initiative, 2021).\
Security controls should be designed with OWASP API Security Top 10
(2023) in mind (OWASP, 2023).

**3.1 Conventions (applies to all endpoints)**

- **Base URL**: /api/v1

- **Auth**: OAuth2/OIDC (recommended) or JWT with refresh tokens

- **Multi-tenant**: X-Council-Id header or /{councilId} path segment
  (choose one; do not mix)

- **Idempotency**: Idempotency-Key for payment and invoice creation

- **Pagination**: ?page=&pageSize= with X-Total-Count

- **Errors**: RFC7807-style application/problem+json (recommended)

**3.2 Core resources and endpoints (high coverage)**

**3.2.1 Authentication & users**

- POST /auth/login

- POST /auth/refresh

- POST /auth/logout

- GET /users/me

- POST /users (admin)

- GET /roles / POST /roles

- GET /permissions

**3.2.2 Service catalogue & configuration**

- GET /services

- POST /services (admin/config)

- GET /fees?serviceId=

- POST /fees (admin/config)

- GET /workflows?serviceId=

- POST /workflows (admin/config)

**3.2.3 Citizen & business registry**

- POST /citizens / GET /citizens/{id} / GET /citizens?search=

- POST /businesses / GET /businesses/{id} / GET /businesses?search=

**3.2.4 Service requests (applications, complaints, works)**

- POST /requests

- GET /requests/{id}

- GET /requests?status=&serviceId=&requesterId=

- POST /requests/{id}/submit

- POST /requests/{id}/documents

- GET /requests/{id}/timeline

**3.2.5 Inspections & enforcement (mobile-first)**

- GET /inspections?assignedTo=&status=

- POST /inspections (create/schedule)

- POST /inspections/{id}/start

- POST /inspections/{id}/findings

- POST /inspections/{id}/evidence

- POST /enforcement/cases

- POST /enforcement/cases/{id}/notices

**3.2.6 Billing & payments**

- POST /invoices (from workflow)

- GET /invoices/{id} / GET /invoices?accountId=&status=

- POST /payments/initiate (card)

- POST /payments/webhook (PSP callback)

- POST /payments/record (cash/cheque/bank deposit at counter)

- POST /payments/{id}/reconcile (bank statement reconciliation)

- GET /receipts/{paymentId}

**3.2.7 Licences & permits**

- GET /licences?holderId=&status=

- GET /licences/{id}

- POST /licences/{id}/renew

- GET /permits?holderId=&status=

**3.2.8 Mobile sync**

- POST /mobile/sync/pull

- POST /mobile/sync/push

- GET /mobile/reference-data (fee tables, checklists, service forms)

------------------------------------------------------------------------

**3.3 Minimal OpenAPI skeleton (illustrative)**

openapi: 3.1.0

info:

title: LGIS API

version: 1.0.0

servers:

\- url: /api/v1

security:

\- bearerAuth: \[\]

components:

securitySchemes:

bearerAuth:

type: http

scheme: bearer

bearerFormat: JWT

paths:

/requests:

post:

summary: Create a service request (draft)

parameters:

\- in: header

name: X-Council-Id

required: true

schema: { type: string, format: uuid }

requestBody:

required: true

content:

application/json:

schema:

type: object

required: \[serviceId, requesterType, requesterId, formData\]

properties:

serviceId: { type: string, format: uuid }

requesterType: { type: string, enum: \[citizen, business\] }

requesterId: { type: string, format: uuid }

formData: { type: object }

responses:

\"201\":

description: Created

get:

summary: List requests

parameters:

\- in: query

name: status

schema: { type: string }

responses:

\"200\": { description: OK }

/payments/initiate:

post:

summary: Initiate a card payment (PSP redirect or tokenised)

parameters:

\- in: header

name: Idempotency-Key

required: true

schema: { type: string }

requestBody:

required: true

content:

application/json:

schema:

type: object

required: \[invoiceId, amount, currency, returnUrl\]

properties:

invoiceId: { type: string, format: uuid }

amount: { type: number }

currency: { type: string }

returnUrl: { type: string, format: uri }

responses:

\"200\": { description: PSP session created }

------------------------------------------------------------------------

**4) Mobile App Wireframes (Low-Fidelity)**

**4.1 How to use (baby steps)**

1.  Treat these as **screen "contracts"** with your UI/UX designer or
    developer.

2.  Convert to Figma (or similar) by creating frames with the same
    structure.

3.  Validate with 2--3 field officers before final UI.

------------------------------------------------------------------------

**4.2 Wireframe A --- Login / Council selection**

+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+

\| LGIS Mobile \|

\|\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--\|

\| Email/Username:
\[\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\] \|

\| Password: \[\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\]
\|

\| Council: \[ Select Council v \] \|

\| \|

\| \[ Login \] \|

\|\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--\|

\| Forgot password? \|

\| Offline mode (view only): \[ Enable \] \|

+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+

------------------------------------------------------------------------

**4.3 Wireframe B --- Field Officer Home (Tasks + Offline status)**

+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+

\| Home (Inspector) Sync: ● Pending \|

\|\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--\|

\| Quick Actions \|

\| \[ Start Inspection \] \[ Verify Payment \] \|

\| \[ Log Complaint \] \[ Issue Notice \] \|

\|\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--\|

\| My Tasks (Today) \|

\| 1) INS-00231 Market Hygiene Check \[Open\] \|

\| 2) INS-00245 Building Permit Site \[Open\] \|

\| 3) CMP-00991 Waste Collection Issue \[Open\] \|

\|\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--\|

\| Offline Queue: 7 items \[ Sync Now \] \|

+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+

**4.4 Wireframe C --- Start Inspection (checklist + GPS + evidence)**

+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+

\| Inspection: INS-00245 \|

\|\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--\|

\| Target: ABC Construction Site \|

\| Request: SR-11802 (Building Permit) \|

\| GPS: \[ Capture \] Lat/Long: \[auto\] \|

\|\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--\|

\| Checklist (tap to score) \|

\| \[ \] PPE used \|

\| \[ \] Site fencing compliant \|

\| \[ \] Waste disposal plan \|

\| \[ \] Permit displayed \|

\|\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--\|

\| Findings Notes \|

\|
\[\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\]
\|

\| Evidence \|

\| \[ Take Photo \] \[ Upload \] (3 files) \|

\|\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--\|

\| Result: ( ) Pass ( ) Fail ( ) Conditional \|

\| \[ Save Offline \] \[ Submit \] \|

+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+

------------------------------------------------------------------------

**4.5 Wireframe D --- Verify Payment / Receipt lookup (field
enforcement)**

+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+

\| Verify Payment \|

\|\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--\|

\| Search by: (•) Invoice No ( ) Receipt No ( ) QR\|

\| Input: \[\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\]
\[Search\] \|

\|\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--\|

\| Result \|

\| Payer: John Doe (Citizen) \|

\| Invoice: INV-2026-000198 \|

\| Amount: 250.00 Currency: PGK \|

\| Status: PAID Method: CARD \|

\| Paid At: 2026-01-12 14:22 \|

\|\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--\|

\| \[ View Receipt \] \[ Share \] \[ Mark Compliant \]\|

+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+

------------------------------------------------------------------------

**4.6 Wireframe E --- Issue Notice (enforcement case)**

+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+

\| Enforcement Notice \|

\|\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--\|

\| Case Type: \[ Illegal Trading v \] \|

\| Subject: \[ Search Business/Citizen \] \|

\| Location: \[ Capture GPS \] \|

\|\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--\|

\| Notice Type: \[ Warning v \] \|

\| Compliance Due: \[ 2026-01-20 v \] \|

\| Details: \|

\|
\[\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\]
\|

\| Evidence: \[ Take Photo \] (optional) \|

\|\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--\|

\| Officer Signature: \[ Sign \] \|

\| Subject Signature: \[ Sign \] (if present) \|

\| \[ Save Offline \] \[ Issue Notice \] \|

+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+

------------------------------------------------------------------------

**4.7 Wireframe F --- Offline Sync (conflict handling)**

+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+

\| Sync Center \|

\|\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--\|

\| Pending Uploads: 7 \|

\| - INS-00245 (Inspection) Status: queued \|

\| - CMP-00991 (Complaint) Status: queued \|

\| - Photo evidence (3) Status: queued \|

\|\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--\|

\| Conflicts: 1 \|

\| - Request SR-11802 updated on server \|

\| \[ Keep Mine \] \[ Use Server \] \[ Merge \] \|

\|\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--\|

\| \[ Sync Now \] \|

+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+

**Complete OpenAPI file (OpenAPI 3.1 YAML) --- aligned to the ERD**

This specification is structured for **multi-tenant councils**,
**workflow-driven service delivery**, **billing & multi-channel
payments**, and **mobile offline sync**, following **OpenAPI 3.1**
(OpenAPI Initiative, 2021) and **RFC 7807 Problem Details** (IETF,
2016). It also anticipates common API risks per **OWASP API Security Top
10 (2023)** (OWASP, 2023).

openapi: 3.1.0

info:

title: LGIS API

version: 1.0.0

description: \>

Modular Local Government Information System (LGIS) API (multi-tenant),

aligned to core ERD entities and workflows.

Uses RFC 7807 problem details for error responses.

servers:

\- url: /api/v1

tags:

\- name: Auth

\- name: Councils

\- name: Users

\- name: RBAC

\- name: Registry

\- name: Services

\- name: Workflows

\- name: Requests

\- name: Documents

\- name: Inspections

\- name: Licensing

\- name: Properties

\- name: Markets

\- name: Billing

\- name: Payments

\- name: Complaints

\- name: Enforcement

\- name: MobileSync

\- name: Audit

\- name: Reports

security:

\- bearerAuth: \[\]

x-common-headers:

X-Council-Id:

in: header

name: X-Council-Id

required: true

schema: { \$ref: \"#/components/schemas/UUID\" }

description: Council/tenant context for all requests.

paths:

\# \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- AUTH
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

/auth/login:

post:

tags: \[Auth\]

security: \[\]

summary: Login (JWT access + refresh)

requestBody:

required: true

content:

application/json:

schema:

type: object

required: \[username, password, councilId\]

properties:

username: { type: string }

password: { type: string, format: password }

councilId: { \$ref: \"#/components/schemas/UUID\" }

device:

\$ref: \"#/components/schemas/DeviceRegistration\"

responses:

\"200\":

description: Tokens issued

content:

application/json:

schema: { \$ref: \"#/components/schemas/AuthTokens\" }

\"401\":

\$ref: \"#/components/responses/Problem401\"

/auth/refresh:

post:

tags: \[Auth\]

security: \[\]

summary: Refresh access token

requestBody:

required: true

content:

application/json:

schema:

type: object

required: \[refreshToken\]

properties:

refreshToken: { type: string }

responses:

\"200\":

description: New access token

content:

application/json:

schema: { \$ref: \"#/components/schemas/AuthTokens\" }

\"401\":

\$ref: \"#/components/responses/Problem401\"

/auth/logout:

post:

tags: \[Auth\]

summary: Logout (revoke refresh token)

requestBody:

required: true

content:

application/json:

schema:

type: object

required: \[refreshToken\]

properties:

refreshToken: { type: string }

responses:

\"204\": { description: Logged out }

\"401\": { \$ref: \"#/components/responses/Problem401\" }

\# \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- COUNCILS
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

/councils:

get:

tags: \[Councils\]

summary: List councils (platform admin use)

responses:

\"200\":

description: Councils

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/Council\" }

post:

tags: \[Councils\]

summary: Create council (platform admin)

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/CouncilCreate\" }

responses:

\"201\":

description: Created

content:

application/json:

schema: { \$ref: \"#/components/schemas/Council\" }

/councils/{councilId}:

parameters:

\- \$ref: \"#/components/parameters/CouncilIdPath\"

get:

tags: \[Councils\]

summary: Get council

responses:

\"200\":

description: Council

content:

application/json:

schema: { \$ref: \"#/components/schemas/Council\" }

\"404\": { \$ref: \"#/components/responses/Problem404\" }

\# \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- USERS
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

/users/me:

get:

tags: \[Users\]

summary: Current user profile

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

responses:

\"200\":

description: Me

content:

application/json:

schema: { \$ref: \"#/components/schemas/User\" }

/users:

get:

tags: \[Users\]

summary: List users

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/Page\"

\- \$ref: \"#/components/parameters/PageSize\"

\- in: query

name: status

schema: { type: string }

\- in: query

name: unitId

schema: { \$ref: \"#/components/schemas/UUID\" }

responses:

\"200\":

description: Users

headers:

X-Total-Count:

schema: { type: integer }

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/User\" }

post:

tags: \[Users\]

summary: Create user (council admin)

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/UserCreate\" }

responses:

\"201\":

description: Created

content:

application/json:

schema: { \$ref: \"#/components/schemas/User\" }

\"409\": { \$ref: \"#/components/responses/Problem409\" }

/users/{userId}:

parameters:

\- \$ref: \"#/components/parameters/UserIdPath\"

\- \$ref: \"#/components/parameters/XCouncilId\"

get:

tags: \[Users\]

summary: Get user

responses:

\"200\":

description: User

content:

application/json:

schema: { \$ref: \"#/components/schemas/User\" }

\"404\": { \$ref: \"#/components/responses/Problem404\" }

patch:

tags: \[Users\]

summary: Update user

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/UserPatch\" }

responses:

\"200\":

description: Updated

content:

application/json:

schema: { \$ref: \"#/components/schemas/User\" }

\# \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- RBAC
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

/roles:

get:

tags: \[RBAC\]

summary: List roles

parameters: \[ { \$ref: \"#/components/parameters/XCouncilId\" } \]

responses:

\"200\":

description: Roles

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/Role\" }

post:

tags: \[RBAC\]

summary: Create role

parameters: \[ { \$ref: \"#/components/parameters/XCouncilId\" } \]

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/RoleCreate\" }

responses:

\"201\":

description: Created

content:

application/json:

schema: { \$ref: \"#/components/schemas/Role\" }

/permissions:

get:

tags: \[RBAC\]

summary: List permissions (platform-defined)

responses:

\"200\":

description: Permissions

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/Permission\" }

/users/{userId}/roles:

post:

tags: \[RBAC\]

summary: Assign roles to user

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/UserIdPath\"

requestBody:

required: true

content:

application/json:

schema:

type: object

required: \[roleIds\]

properties:

roleIds:

type: array

items: { \$ref: \"#/components/schemas/UUID\" }

responses:

\"204\": { description: Assigned }

\# \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- REGISTRY
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

/citizens:

get:

tags: \[Registry\]

summary: Search/list citizens

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/Page\"

\- \$ref: \"#/components/parameters/PageSize\"

\- in: query

name: search

schema: { type: string }

responses:

\"200\":

description: Citizens

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/Citizen\" }

post:

tags: \[Registry\]

summary: Create citizen

parameters: \[ { \$ref: \"#/components/parameters/XCouncilId\" } \]

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/CitizenCreate\" }

responses:

\"201\":

description: Created

content:

application/json:

schema: { \$ref: \"#/components/schemas/Citizen\" }

/businesses:

get:

tags: \[Registry\]

summary: Search/list businesses

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/Page\"

\- \$ref: \"#/components/parameters/PageSize\"

\- in: query

name: search

schema: { type: string }

responses:

\"200\":

description: Businesses

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/Business\" }

post:

tags: \[Registry\]

summary: Create business

parameters: \[ { \$ref: \"#/components/parameters/XCouncilId\" } \]

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/BusinessCreate\" }

responses:

\"201\":

description: Created

content:

application/json:

schema: { \$ref: \"#/components/schemas/Business\" }

/accounts:

get:

tags: \[Registry\]

summary: List accounts

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- in: query

name: holderType

schema: { type: string, enum: \[citizen, business\] }

\- in: query

name: holderId

schema: { \$ref: \"#/components/schemas/UUID\" }

responses:

\"200\":

description: Accounts

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/Account\" }

post:

tags: \[Registry\]

summary: Create account

parameters: \[ { \$ref: \"#/components/parameters/XCouncilId\" } \]

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/AccountCreate\" }

responses:

\"201\":

description: Created

content:

application/json:

schema: { \$ref: \"#/components/schemas/Account\" }

\# \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- SERVICES & CONFIG
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

/services:

get:

tags: \[Services\]

summary: List service catalogue

parameters: \[ { \$ref: \"#/components/parameters/XCouncilId\" } \]

responses:

\"200\":

description: Services

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/ServiceCatalog\" }

post:

tags: \[Services\]

summary: Create service catalogue entry

parameters: \[ { \$ref: \"#/components/parameters/XCouncilId\" } \]

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/ServiceCatalogCreate\" }

responses:

\"201\":

description: Created

content:

application/json:

schema: { \$ref: \"#/components/schemas/ServiceCatalog\" }

/fees:

get:

tags: \[Services\]

summary: List fee schedules

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- in: query

name: serviceId

schema: { \$ref: \"#/components/schemas/UUID\" }

responses:

\"200\":

description: Fees

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/FeeSchedule\" }

post:

tags: \[Services\]

summary: Create fee schedule

parameters: \[ { \$ref: \"#/components/parameters/XCouncilId\" } \]

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/FeeScheduleCreate\" }

responses:

\"201\":

description: Created

content:

application/json:

schema: { \$ref: \"#/components/schemas/FeeSchedule\" }

\# \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- WORKFLOWS
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

/workflows:

get:

tags: \[Workflows\]

summary: List workflow definitions

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- in: query

name: serviceId

schema: { \$ref: \"#/components/schemas/UUID\" }

responses:

\"200\":

description: Workflow definitions

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/WorkflowDefinition\" }

post:

tags: \[Workflows\]

summary: Create workflow definition (+ steps)

parameters: \[ { \$ref: \"#/components/parameters/XCouncilId\" } \]

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/WorkflowDefinitionCreate\" }

responses:

\"201\":

description: Created

content:

application/json:

schema: { \$ref: \"#/components/schemas/WorkflowDefinition\" }

\# \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- REQUESTS
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

/requests:

get:

tags: \[Requests\]

summary: List/search service requests

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/Page\"

\- \$ref: \"#/components/parameters/PageSize\"

\- in: query

name: status

schema: { type: string }

\- in: query

name: serviceId

schema: { \$ref: \"#/components/schemas/UUID\" }

\- in: query

name: requesterType

schema: { type: string, enum: \[citizen, business\] }

\- in: query

name: requesterId

schema: { \$ref: \"#/components/schemas/UUID\" }

responses:

\"200\":

description: Requests

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/ServiceRequest\" }

post:

tags: \[Requests\]

summary: Create a service request (draft)

parameters: \[ { \$ref: \"#/components/parameters/XCouncilId\" } \]

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/ServiceRequestCreate\" }

responses:

\"201\":

description: Created

content:

application/json:

schema: { \$ref: \"#/components/schemas/ServiceRequest\" }

/requests/{requestId}:

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/RequestIdPath\"

get:

tags: \[Requests\]

summary: Get a request

responses:

\"200\":

description: Request

content:

application/json:

schema: { \$ref: \"#/components/schemas/ServiceRequestDetail\" }

\"404\": { \$ref: \"#/components/responses/Problem404\" }

patch:

tags: \[Requests\]

summary: Update draft request

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/ServiceRequestPatch\" }

responses:

\"200\":

description: Updated

content:

application/json:

schema: { \$ref: \"#/components/schemas/ServiceRequest\" }

/requests/{requestId}/submit:

post:

tags: \[Requests\]

summary: Submit request (starts workflow instance)

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/RequestIdPath\"

responses:

\"200\":

description: Submitted

content:

application/json:

schema:

type: object

properties:

request: { \$ref: \"#/components/schemas/ServiceRequest\" }

workflowInstance: { \$ref: \"#/components/schemas/WorkflowInstance\" }

/requests/{requestId}/timeline:

get:

tags: \[Requests\]

summary: Request timeline (workflow + key events)

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/RequestIdPath\"

responses:

\"200\":

description: Timeline

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/TimelineEvent\" }

\# \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- DOCUMENTS
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

/requests/{requestId}/documents:

post:

tags: \[Documents\]

summary: Attach document (pre-signed upload metadata or direct)

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/RequestIdPath\"

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/DocumentCreate\" }

responses:

\"201\":

description: Document attached

content:

application/json:

schema: { \$ref: \"#/components/schemas/Document\" }

get:

tags: \[Documents\]

summary: List request documents

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/RequestIdPath\"

responses:

\"200\":

description: Documents

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/Document\" }

\# \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- INSPECTIONS
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

/inspections:

get:

tags: \[Inspections\]

summary: List inspections

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- in: query

name: assignedTo

schema: { \$ref: \"#/components/schemas/UUID\" }

\- in: query

name: status

schema: { type: string }

responses:

\"200\":

description: Inspections

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/Inspection\" }

post:

tags: \[Inspections\]

summary: Schedule/create inspection

parameters: \[ { \$ref: \"#/components/parameters/XCouncilId\" } \]

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/InspectionCreate\" }

responses:

\"201\":

description: Created

content:

application/json:

schema: { \$ref: \"#/components/schemas/Inspection\" }

/inspections/{inspectionId}/findings:

post:

tags: \[Inspections\]

summary: Add findings (supports offline upload)

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/InspectionIdPath\"

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/InspectionFindingsUpsert\" }

responses:

\"200\":

description: Updated

content:

application/json:

schema: { \$ref: \"#/components/schemas/Inspection\" }

/inspections/{inspectionId}/evidence:

post:

tags: \[Inspections\]

summary: Add evidence metadata (file URL/hash)

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/InspectionIdPath\"

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/InspectionEvidenceCreate\" }

responses:

\"201\":

description: Evidence added

content:

application/json:

schema: { \$ref: \"#/components/schemas/InspectionEvidence\" }

\# \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- BILLING
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

/invoices:

get:

tags: \[Billing\]

summary: List invoices

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- in: query

name: accountId

schema: { \$ref: \"#/components/schemas/UUID\" }

\- in: query

name: status

schema: { type: string }

responses:

\"200\":

description: Invoices

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/Invoice\" }

post:

tags: \[Billing\]

summary: Create invoice (workflow/billing)

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/IdempotencyKey\"

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/InvoiceCreate\" }

responses:

\"201\":

description: Created

content:

application/json:

schema: { \$ref: \"#/components/schemas/Invoice\" }

/invoices/{invoiceId}:

get:

tags: \[Billing\]

summary: Get invoice

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/InvoiceIdPath\"

responses:

\"200\":

description: Invoice

content:

application/json:

schema: { \$ref: \"#/components/schemas/InvoiceDetail\" }

\"404\": { \$ref: \"#/components/responses/Problem404\" }

\# \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- PAYMENTS
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

/payments/initiate:

post:

tags: \[Payments\]

summary: Initiate card payment (PSP session)

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/IdempotencyKey\"

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/PaymentInitiate\" }

responses:

\"200\":

description: PSP session created

content:

application/json:

schema: { \$ref: \"#/components/schemas/PaymentInitiateResponse\" }

/payments/record:

post:

tags: \[Payments\]

summary: Record non-card payment (cash/cheque/bank deposit at counter)

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/IdempotencyKey\"

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/PaymentRecord\" }

responses:

\"201\":

description: Payment recorded

content:

application/json:

schema: { \$ref: \"#/components/schemas/Payment\" }

/payments/{paymentId}/allocate:

post:

tags: \[Payments\]

summary: Allocate payment to invoices

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/PaymentIdPath\"

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/PaymentAllocationRequest\" }

responses:

\"200\":

description: Allocated

content:

application/json:

schema: { \$ref: \"#/components/schemas/Payment\" }

/payments/webhook:

post:

tags: \[Payments\]

security: \[\]

summary: PSP webhook callback (signature required)

requestBody:

required: true

content:

application/json:

schema: { type: object }

responses:

\"204\": { description: Accepted }

/receipts/{paymentId}:

get:

tags: \[Payments\]

summary: Get receipt (PDF metadata + view URL)

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/PaymentIdPath\"

responses:

\"200\":

description: Receipt

content:

application/json:

schema: { \$ref: \"#/components/schemas/Receipt\" }

\# \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- LICENSING
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

/licences:

get:

tags: \[Licensing\]

summary: List licences

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- in: query

name: holderType

schema: { type: string, enum: \[citizen, business\] }

\- in: query

name: holderId

schema: { \$ref: \"#/components/schemas/UUID\" }

\- in: query

name: status

schema: { type: string }

responses:

\"200\":

description: Licences

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/License\" }

/licences/{licenseId}/renew:

post:

tags: \[Licensing\]

summary: Renew licence (creates renewal request)

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/LicenseIdPath\"

requestBody:

required: true

content:

application/json:

schema:

type: object

required: \[renewTo\]

properties:

renewTo: { type: string, format: date }

responses:

\"200\":

description: Renewal created

content:

application/json:

schema: { \$ref: \"#/components/schemas/LicenseRenewal\" }

\# \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- PROPERTIES
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

/properties:

get:

tags: \[Properties\]

summary: List properties

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- in: query

name: search

schema: { type: string }

responses:

\"200\":

description: Properties

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/Property\" }

post:

tags: \[Properties\]

summary: Register property

parameters: \[ { \$ref: \"#/components/parameters/XCouncilId\" } \]

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/PropertyCreate\" }

responses:

\"201\":

description: Created

content:

application/json:

schema: { \$ref: \"#/components/schemas/Property\" }

/properties/{propertyId}/assessments:

post:

tags: \[Properties\]

summary: Create rate assessment

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/PropertyIdPath\"

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/RateAssessmentCreate\" }

responses:

\"201\":

description: Created

content:

application/json:

schema: { \$ref: \"#/components/schemas/RateAssessment\" }

\# \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- MARKETS
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

/markets:

get:

tags: \[Markets\]

summary: List markets

parameters: \[ { \$ref: \"#/components/parameters/XCouncilId\" } \]

responses:

\"200\":

description: Markets

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/Market\" }

post:

tags: \[Markets\]

summary: Create market

parameters: \[ { \$ref: \"#/components/parameters/XCouncilId\" } \]

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/MarketCreate\" }

responses:

\"201\":

description: Created

content:

application/json:

schema: { \$ref: \"#/components/schemas/Market\" }

/stalls:

get:

tags: \[Markets\]

summary: List stalls

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- in: query

name: marketId

schema: { \$ref: \"#/components/schemas/UUID\" }

responses:

\"200\":

description: Stalls

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/Stall\" }

\# \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- COMPLAINTS
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

/complaints:

get:

tags: \[Complaints\]

summary: List complaints

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- in: query

name: status

schema: { type: string }

responses:

\"200\":

description: Complaints

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/Complaint\" }

post:

tags: \[Complaints\]

summary: Lodge complaint (citizen/business)

parameters: \[ { \$ref: \"#/components/parameters/XCouncilId\" } \]

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/ComplaintCreate\" }

responses:

\"201\":

description: Created

content:

application/json:

schema: { \$ref: \"#/components/schemas/Complaint\" }

/complaints/{complaintId}/updates:

post:

tags: \[Complaints\]

summary: Add complaint update

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/ComplaintIdPath\"

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/ComplaintUpdateCreate\" }

responses:

\"201\":

description: Added

content:

application/json:

schema: { \$ref: \"#/components/schemas/ComplaintUpdate\" }

\# \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- ENFORCEMENT
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

/enforcement/cases:

post:

tags: \[Enforcement\]

summary: Create enforcement case

parameters: \[ { \$ref: \"#/components/parameters/XCouncilId\" } \]

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/EnforcementCaseCreate\" }

responses:

\"201\":

description: Created

content:

application/json:

schema: { \$ref: \"#/components/schemas/EnforcementCase\" }

/enforcement/cases/{caseId}/notices:

post:

tags: \[Enforcement\]

summary: Issue notice

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/CaseIdPath\"

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/NoticeCreate\" }

responses:

\"201\":

description: Issued

content:

application/json:

schema: { \$ref: \"#/components/schemas/Notice\" }

\# \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- MOBILE SYNC
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

/mobile/reference-data:

get:

tags: \[MobileSync\]

summary: Download reference data for offline use

parameters: \[ { \$ref: \"#/components/parameters/XCouncilId\" } \]

responses:

\"200\":

description: Reference bundles

content:

application/json:

schema: { \$ref: \"#/components/schemas/MobileReferenceBundle\" }

/mobile/sync/push:

post:

tags: \[MobileSync\]

summary: Push offline queue items (create/update)

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/IdempotencyKey\"

requestBody:

required: true

content:

application/json:

schema: { \$ref: \"#/components/schemas/MobileSyncPush\" }

responses:

\"200\":

description: Push result

content:

application/json:

schema: { \$ref: \"#/components/schemas/MobileSyncResult\" }

/mobile/sync/pull:

post:

tags: \[MobileSync\]

summary: Pull server updates since last cursor

parameters: \[ { \$ref: \"#/components/parameters/XCouncilId\" } \]

requestBody:

required: true

content:

application/json:

schema:

type: object

required: \[cursor\]

properties:

cursor: { type: string }

entityTypes:

type: array

items: { type: string }

responses:

\"200\":

description: Pull result

content:

application/json:

schema: { \$ref: \"#/components/schemas/MobileSyncPull\" }

\# \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- AUDIT
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

/audit/logs:

get:

tags: \[Audit\]

summary: Search audit logs

parameters:

\- \$ref: \"#/components/parameters/XCouncilId\"

\- \$ref: \"#/components/parameters/Page\"

\- \$ref: \"#/components/parameters/PageSize\"

\- in: query

name: entityType

schema: { type: string }

\- in: query

name: entityId

schema: { \$ref: \"#/components/schemas/UUID\" }

responses:

\"200\":

description: Logs

content:

application/json:

schema:

type: array

items: { \$ref: \"#/components/schemas/AuditLog\" }

components:

parameters:

XCouncilId:

\$ref: \"#/x-common-headers/X-Council-Id\"

IdempotencyKey:

in: header

name: Idempotency-Key

required: true

schema: { type: string }

CouncilIdPath:

in: path

name: councilId

required: true

schema: { \$ref: \"#/components/schemas/UUID\" }

UserIdPath:

in: path

name: userId

required: true

schema: { \$ref: \"#/components/schemas/UUID\" }

RequestIdPath:

in: path

name: requestId

required: true

schema: { \$ref: \"#/components/schemas/UUID\" }

InspectionIdPath:

in: path

name: inspectionId

required: true

schema: { \$ref: \"#/components/schemas/UUID\" }

InvoiceIdPath:

in: path

name: invoiceId

required: true

schema: { \$ref: \"#/components/schemas/UUID\" }

PaymentIdPath:

in: path

name: paymentId

required: true

schema: { \$ref: \"#/components/schemas/UUID\" }

LicenseIdPath:

in: path

name: licenseId

required: true

schema: { \$ref: \"#/components/schemas/UUID\" }

PropertyIdPath:

in: path

name: propertyId

required: true

schema: { \$ref: \"#/components/schemas/UUID\" }

ComplaintIdPath:

in: path

name: complaintId

required: true

schema: { \$ref: \"#/components/schemas/UUID\" }

CaseIdPath:

in: path

name: caseId

required: true

schema: { \$ref: \"#/components/schemas/UUID\" }

Page:

in: query

name: page

schema: { type: integer, minimum: 1, default: 1 }

PageSize:

in: query

name: pageSize

schema: { type: integer, minimum: 1, maximum: 200, default: 25 }

securitySchemes:

bearerAuth:

type: http

scheme: bearer

bearerFormat: JWT

responses:

Problem400:

description: Bad Request

content:

application/problem+json:

schema: { \$ref: \"#/components/schemas/Problem\" }

Problem401:

description: Unauthorized

content:

application/problem+json:

schema: { \$ref: \"#/components/schemas/Problem\" }

Problem403:

description: Forbidden

content:

application/problem+json:

schema: { \$ref: \"#/components/schemas/Problem\" }

Problem404:

description: Not Found

content:

application/problem+json:

schema: { \$ref: \"#/components/schemas/Problem\" }

Problem409:

description: Conflict

content:

application/problem+json:

schema: { \$ref: \"#/components/schemas/Problem\" }

schemas:

UUID:

type: string

format: uuid

Money:

type: object

required: \[amount, currency\]

properties:

amount: { type: number }

currency: { type: string, minLength: 3, maxLength: 3 }

Problem:

type: object

description: RFC 7807 Problem Details

required: \[type, title, status\]

properties:

type: { type: string, format: uri }

title: { type: string }

status: { type: integer }

detail: { type: string }

instance: { type: string, format: uri }

errors:

type: array

items:

type: object

properties:

field: { type: string }

message: { type: string }

Council:

type: object

required: \[councilId, name, level, currencyCode, timezone, status\]

properties:

councilId: { \$ref: \"#/components/schemas/UUID\" }

name: { type: string }

level: { type: string, enum: \[city, municipal, district, llg\] }

countryCode: { type: string, minLength: 2, maxLength: 2 }

currencyCode: { type: string, minLength: 3, maxLength: 3 }

timezone: { type: string }

status: { type: string, enum: \[active, inactive\] }

createdAt: { type: string, format: date-time }

CouncilCreate:

allOf:

\- \$ref: \"#/components/schemas/Council\"

required: \[name, level, countryCode, currencyCode, timezone\]

properties:

councilId: { readOnly: true }

createdAt: { readOnly: true }

status: { default: active }

User:

type: object

required: \[userId, councilId, fullName, email, status\]

properties:

userId: { \$ref: \"#/components/schemas/UUID\" }

councilId: { \$ref: \"#/components/schemas/UUID\" }

unitId: { \$ref: \"#/components/schemas/UUID\" }

fullName: { type: string }

email: { type: string, format: email }

phone: { type: string }

status: { type: string, enum: \[active, disabled\] }

mfaEnabled: { type: boolean }

lastLoginAt: { type: string, format: date-time }

UserCreate:

type: object

required: \[fullName, email, status\]

properties:

unitId: { \$ref: \"#/components/schemas/UUID\" }

fullName: { type: string }

email: { type: string, format: email }

phone: { type: string }

status: { type: string, enum: \[active, disabled\], default: active }

tempPassword: { type: string, format: password }

UserPatch:

type: object

properties:

unitId: { \$ref: \"#/components/schemas/UUID\" }

fullName: { type: string }

phone: { type: string }

status: { type: string, enum: \[active, disabled\] }

Role:

type: object

required: \[roleId, councilId, name, scope\]

properties:

roleId: { \$ref: \"#/components/schemas/UUID\" }

councilId: { \$ref: \"#/components/schemas/UUID\" }

name: { type: string }

scope: { type: string, enum: \[council, unit, ward, location\] }

RoleCreate:

type: object

required: \[name, scope\]

properties:

name: { type: string }

scope: { type: string, enum: \[council, unit, ward, location\] }

Permission:

type: object

required: \[code, description\]

properties:

code: { type: string }

description: { type: string }

Citizen:

type: object

required: \[citizenId, councilId, firstName, lastName\]

properties:

citizenId: { \$ref: \"#/components/schemas/UUID\" }

councilId: { \$ref: \"#/components/schemas/UUID\" }

nationalId: { type: string }

localCitizenNo: { type: string }

firstName: { type: string }

lastName: { type: string }

dob: { type: string, format: date }

sex: { type: string, enum: \[male, female, other, unknown\] }

CitizenCreate:

allOf:

\- \$ref: \"#/components/schemas/Citizen\"

properties:

citizenId: { readOnly: true }

councilId: { readOnly: true }

Business:

type: object

required: \[businessId, councilId, legalName\]

properties:

businessId: { \$ref: \"#/components/schemas/UUID\" }

councilId: { \$ref: \"#/components/schemas/UUID\" }

registrationNo: { type: string }

tin: { type: string }

legalName: { type: string }

tradingName: { type: string }

businessType: { type: string }

BusinessCreate:

allOf:

\- \$ref: \"#/components/schemas/Business\"

properties:

businessId: { readOnly: true }

councilId: { readOnly: true }

Account:

type: object

required: \[accountId, councilId, holderType, holderId, accountNo,
status\]

properties:

accountId: { \$ref: \"#/components/schemas/UUID\" }

councilId: { \$ref: \"#/components/schemas/UUID\" }

holderType: { type: string, enum: \[citizen, business\] }

holderId: { \$ref: \"#/components/schemas/UUID\" }

accountNo: { type: string }

status: { type: string, enum: \[active, suspended\] }

AccountCreate:

type: object

required: \[holderType, holderId\]

properties:

holderType: { type: string, enum: \[citizen, business\] }

holderId: { \$ref: \"#/components/schemas/UUID\" }

ServiceCatalog:

type: object

required: \[serviceId, councilId, code, name, category, active\]

properties:

serviceId: { \$ref: \"#/components/schemas/UUID\" }

councilId: { \$ref: \"#/components/schemas/UUID\" }

code: { type: string }

name: { type: string }

category: { type: string, enum: \[licence, permit, rate, market,
complaint, works, other\] }

requiresInspection: { type: boolean }

requiresApproval: { type: boolean }

active: { type: boolean }

ServiceCatalogCreate:

type: object

required: \[code, name, category\]

properties:

code: { type: string }

name: { type: string }

category: { type: string, enum: \[licence, permit, rate, market,
complaint, works, other\] }

requiresInspection: { type: boolean, default: false }

requiresApproval: { type: boolean, default: true }

active: { type: boolean, default: true }

FeeSchedule:

type: object

required: \[feeId, councilId, serviceId, name, basis, amount, currency,
validFrom\]

properties:

feeId: { \$ref: \"#/components/schemas/UUID\" }

councilId: { \$ref: \"#/components/schemas/UUID\" }

serviceId: { \$ref: \"#/components/schemas/UUID\" }

name: { type: string }

basis: { type: string, enum: \[flat, per_day, per_area, per_unit,
tiered\] }

amount: { type: number }

currency: { type: string, minLength: 3, maxLength: 3 }

validFrom: { type: string, format: date }

validTo: { type: string, format: date }

FeeScheduleCreate:

type: object

required: \[serviceId, name, basis, amount, currency, validFrom\]

properties:

serviceId: { \$ref: \"#/components/schemas/UUID\" }

name: { type: string }

basis: { type: string, enum: \[flat, per_day, per_area, per_unit,
tiered\] }

amount: { type: number }

currency: { type: string, minLength: 3, maxLength: 3 }

validFrom: { type: string, format: date }

validTo: { type: string, format: date }

WorkflowStep:

type: object

required: \[name, orderNo\]

properties:

stepId: { \$ref: \"#/components/schemas/UUID\" }

name: { type: string }

orderNo: { type: integer }

assigneeRole: { type: string }

slaRule: { type: string }

WorkflowDefinition:

type: object

required: \[workflowId, councilId, serviceId, version, active\]

properties:

workflowId: { \$ref: \"#/components/schemas/UUID\" }

councilId: { \$ref: \"#/components/schemas/UUID\" }

serviceId: { \$ref: \"#/components/schemas/UUID\" }

version: { type: string }

active: { type: boolean }

steps:

type: array

items: { \$ref: \"#/components/schemas/WorkflowStep\" }

WorkflowDefinitionCreate:

type: object

required: \[serviceId, version, steps\]

properties:

serviceId: { \$ref: \"#/components/schemas/UUID\" }

version: { type: string }

active: { type: boolean, default: true }

steps:

type: array

minItems: 1

items: { \$ref: \"#/components/schemas/WorkflowStep\" }

WorkflowInstance:

type: object

required: \[instanceId, requestId, workflowId, state, startedAt\]

properties:

instanceId: { \$ref: \"#/components/schemas/UUID\" }

requestId: { \$ref: \"#/components/schemas/UUID\" }

workflowId: { \$ref: \"#/components/schemas/UUID\" }

state: { type: string }

startedAt: { type: string, format: date-time }

endedAt: { type: string, format: date-time }

ServiceRequest:

type: object

required: \[requestId, councilId, serviceId, requesterType, requesterId,
status\]

properties:

requestId: { \$ref: \"#/components/schemas/UUID\" }

councilId: { \$ref: \"#/components/schemas/UUID\" }

serviceId: { \$ref: \"#/components/schemas/UUID\" }

requesterType: { type: string, enum: \[citizen, business\] }

requesterId: { \$ref: \"#/components/schemas/UUID\" }

status: { type: string, enum: \[draft, submitted, in_review, inspection,
approved, rejected, completed\] }

channel: { type: string, enum: \[web, mobile, kiosk, counter\] }

submittedAt: { type: string, format: date-time }

formData: { type: object }

ServiceRequestCreate:

type: object

required: \[serviceId, requesterType, requesterId, formData\]

properties:

serviceId: { \$ref: \"#/components/schemas/UUID\" }

requesterType: { type: string, enum: \[citizen, business\] }

requesterId: { \$ref: \"#/components/schemas/UUID\" }

channel: { type: string, enum: \[web, mobile, kiosk, counter\], default:
web }

formData: { type: object }

ServiceRequestPatch:

type: object

properties:

formData: { type: object }

ServiceRequestDetail:

allOf:

\- \$ref: \"#/components/schemas/ServiceRequest\"

\- type: object

properties:

documents:

type: array

items: { \$ref: \"#/components/schemas/Document\" }

workflowInstance:

\$ref: \"#/components/schemas/WorkflowInstance\"

invoices:

type: array

items: { \$ref: \"#/components/schemas/Invoice\" }

inspections:

type: array

items: { \$ref: \"#/components/schemas/Inspection\" }

license:

\$ref: \"#/components/schemas/License\"

Document:

type: object

required: \[documentId, requestId, docType, fileUrl, uploadedAt\]

properties:

documentId: { \$ref: \"#/components/schemas/UUID\" }

requestId: { \$ref: \"#/components/schemas/UUID\" }

docType: { type: string }

fileUrl: { type: string }

checksum: { type: string }

uploadedAt: { type: string, format: date-time }

DocumentCreate:

type: object

required: \[docType, fileUrl\]

properties:

docType: { type: string }

fileUrl: { type: string }

checksum: { type: string }

InspectionFinding:

type: object

required: \[code, severity, description\]

properties:

code: { type: string }

severity: { type: string, enum: \[low, medium, high\] }

description: { type: string }

correctiveAction: { type: string }

dueDate: { type: string, format: date }

Inspection:

type: object

required: \[inspectionId, requestId, inspectorUserId, scheduledAt\]

properties:

inspectionId: { \$ref: \"#/components/schemas/UUID\" }

requestId: { \$ref: \"#/components/schemas/UUID\" }

inspectorUserId: { \$ref: \"#/components/schemas/UUID\" }

scheduledAt: { type: string, format: date-time }

performedAt: { type: string, format: date-time }

result: { type: string, enum: \[pass, fail, conditional\] }

remarks: { type: string }

latitude: { type: number }

longitude: { type: number }

findings:

type: array

items: { \$ref: \"#/components/schemas/InspectionFinding\" }

evidence:

type: array

items: { \$ref: \"#/components/schemas/InspectionEvidence\" }

InspectionCreate:

type: object

required: \[requestId, inspectorUserId, scheduledAt\]

properties:

requestId: { \$ref: \"#/components/schemas/UUID\" }

inspectorUserId: { \$ref: \"#/components/schemas/UUID\" }

scheduledAt: { type: string, format: date-time }

InspectionFindingsUpsert:

type: object

required: \[result\]

properties:

result: { type: string, enum: \[pass, fail, conditional\] }

remarks: { type: string }

latitude: { type: number }

longitude: { type: number }

findings:

type: array

items: { \$ref: \"#/components/schemas/InspectionFinding\" }

InspectionEvidence:

type: object

required: \[evidenceId, mediaType, url\]

properties:

evidenceId: { \$ref: \"#/components/schemas/UUID\" }

mediaType: { type: string, enum: \[photo, video, document\] }

url: { type: string }

hash: { type: string }

InspectionEvidenceCreate:

type: object

required: \[mediaType, url\]

properties:

mediaType: { type: string, enum: \[photo, video, document\] }

url: { type: string }

hash: { type: string }

License:

type: object

required: \[licenseId, requestId, licenseNo, issueDate, expiryDate,
status\]

properties:

licenseId: { \$ref: \"#/components/schemas/UUID\" }

requestId: { \$ref: \"#/components/schemas/UUID\" }

licenseNo: { type: string }

issueDate: { type: string, format: date }

expiryDate: { type: string, format: date }

status: { type: string, enum: \[active, suspended, expired, revoked\] }

qrPayload: { type: string }

pdfUrl: { type: string }

LicenseRenewal:

type: object

required: \[renewalId, licenseId, requestId, renewedTo\]

properties:

renewalId: { \$ref: \"#/components/schemas/UUID\" }

licenseId: { \$ref: \"#/components/schemas/UUID\" }

requestId: { \$ref: \"#/components/schemas/UUID\" }

renewedTo: { type: string, format: date }

Property:

type: object

required: \[propertyId, propertyNo, usage\]

properties:

propertyId: { \$ref: \"#/components/schemas/UUID\" }

propertyNo: { type: string }

parcelNo: { type: string }

usage: { type: string, enum: \[residential, commercial, industrial,
mixed\] }

areaSqm: { type: number }

tenureType: { type: string }

PropertyCreate:

type: object

required: \[propertyNo, usage\]

properties:

propertyNo: { type: string }

parcelNo: { type: string }

usage: { type: string, enum: \[residential, commercial, industrial,
mixed\] }

areaSqm: { type: number }

tenureType: { type: string }

RateAssessment:

type: object

required: \[assessmentId, propertyId, period, rateAmount, status\]

properties:

assessmentId: { \$ref: \"#/components/schemas/UUID\" }

propertyId: { \$ref: \"#/components/schemas/UUID\" }

period: { type: string }

rateAmount: { type: number }

status: { type: string, enum: \[assessed, billed, paid, arrears\] }

RateAssessmentCreate:

type: object

required: \[period, rateAmount\]

properties:

period: { type: string }

rateAmount: { type: number }

Market:

type: object

required: \[marketId, name\]

properties:

marketId: { \$ref: \"#/components/schemas/UUID\" }

name: { type: string }

locationDesc: { type: string }

MarketCreate:

type: object

required: \[name\]

properties:

name: { type: string }

locationDesc: { type: string }

Stall:

type: object

required: \[stallId, marketId, stallCode, status\]

properties:

stallId: { \$ref: \"#/components/schemas/UUID\" }

marketId: { \$ref: \"#/components/schemas/UUID\" }

stallCode: { type: string }

type: { type: string }

status: { type: string, enum: \[available, occupied, inactive\] }

InvoiceLine:

type: object

required: \[itemCode, description, quantity, unitPrice, lineTotal\]

properties:

itemCode: { type: string }

description: { type: string }

quantity: { type: integer }

unitPrice: { type: number }

lineTotal: { type: number }

serviceId: { \$ref: \"#/components/schemas/UUID\" }

Invoice:

type: object

required: \[invoiceId, invoiceNo, accountId, totalAmount, currency,
status, issuedAt\]

properties:

invoiceId: { \$ref: \"#/components/schemas/UUID\" }

invoiceNo: { type: string }

accountId: { \$ref: \"#/components/schemas/UUID\" }

totalAmount: { type: number }

currency: { type: string, minLength: 3, maxLength: 3 }

status: { type: string, enum: \[issued, part_paid, paid, cancelled,
overdue\] }

issuedAt: { type: string, format: date-time }

dueAt: { type: string, format: date-time }

InvoiceDetail:

allOf:

\- \$ref: \"#/components/schemas/Invoice\"

\- type: object

properties:

lines:

type: array

items: { \$ref: \"#/components/schemas/InvoiceLine\" }

payments:

type: array

items: { \$ref: \"#/components/schemas/Payment\" }

InvoiceCreate:

type: object

required: \[accountId, lines\]

properties:

accountId: { \$ref: \"#/components/schemas/UUID\" }

dueAt: { type: string, format: date-time }

lines:

type: array

minItems: 1

items: { \$ref: \"#/components/schemas/InvoiceLine\" }

Payment:

type: object

required: \[paymentId, paymentRef, accountId, amount, currency, method,
status\]

properties:

paymentId: { \$ref: \"#/components/schemas/UUID\" }

paymentRef: { type: string }

accountId: { \$ref: \"#/components/schemas/UUID\" }

amount: { type: number }

currency: { type: string, minLength: 3, maxLength: 3 }

method: { type: string, enum: \[card, bank, cash, cheque, mobile_money\]
}

provider: { type: string }

status: { type: string, enum: \[pending, successful, failed, reversed\]
}

paidAt: { type: string, format: date-time }

providerPayload: { type: object }

PaymentInitiate:

type: object

required: \[invoiceId, amount, currency, returnUrl\]

properties:

invoiceId: { \$ref: \"#/components/schemas/UUID\" }

amount: { type: number }

currency: { type: string, minLength: 3, maxLength: 3 }

returnUrl: { type: string, format: uri }

customer:

type: object

properties:

email: { type: string, format: email }

phone: { type: string }

PaymentInitiateResponse:

type: object

required: \[paymentId, pspSessionId, redirectUrl\]

properties:

paymentId: { \$ref: \"#/components/schemas/UUID\" }

pspSessionId: { type: string }

redirectUrl: { type: string, format: uri }

PaymentRecord:

type: object

required: \[accountId, amount, currency, method, paidAt\]

properties:

accountId: { \$ref: \"#/components/schemas/UUID\" }

amount: { type: number }

currency: { type: string, minLength: 3, maxLength: 3 }

method: { type: string, enum: \[bank, cash, cheque, mobile_money\] }

provider: { type: string }

paidAt: { type: string, format: date-time }

externalRef: { type: string }

depositSlipUrl: { type: string }

PaymentAllocationRequest:

type: object

required: \[allocations\]

properties:

allocations:

type: array

minItems: 1

items:

type: object

required: \[invoiceId, allocatedAmount\]

properties:

invoiceId: { \$ref: \"#/components/schemas/UUID\" }

allocatedAmount: { type: number }

Receipt:

type: object

required: \[paymentId, receiptNo, issuedAt\]

properties:

paymentId: { \$ref: \"#/components/schemas/UUID\" }

receiptNo: { type: string }

issuedAt: { type: string, format: date-time }

pdfUrl: { type: string }

Complaint:

type: object

required: \[complaintId, category, status, description, createdAt\]

properties:

complaintId: { \$ref: \"#/components/schemas/UUID\" }

complainantType: { type: string, enum: \[citizen, business\] }

complainantId: { \$ref: \"#/components/schemas/UUID\" }

category: { type: string, enum: \[waste, roads, lighting, noise, other\]
}

status: { type: string, enum: \[new, assigned, in_progress, resolved,
closed\] }

description: { type: string }

latitude: { type: number }

longitude: { type: number }

createdAt: { type: string, format: date-time }

ComplaintCreate:

type: object

required: \[category, description\]

properties:

complainantType: { type: string, enum: \[citizen, business\] }

complainantId: { \$ref: \"#/components/schemas/UUID\" }

category: { type: string, enum: \[waste, roads, lighting, noise, other\]
}

description: { type: string }

latitude: { type: number }

longitude: { type: number }

ComplaintUpdate:

type: object

required: \[updateId, complaintId, status, createdAt\]

properties:

updateId: { \$ref: \"#/components/schemas/UUID\" }

complaintId: { \$ref: \"#/components/schemas/UUID\" }

updatedBy: { \$ref: \"#/components/schemas/UUID\" }

status: { type: string }

comment: { type: string }

createdAt: { type: string, format: date-time }

ComplaintUpdateCreate:

type: object

required: \[status\]

properties:

status: { type: string }

comment: { type: string }

EnforcementCase:

type: object

required: \[caseId, caseNo, type, status\]

properties:

caseId: { \$ref: \"#/components/schemas/UUID\" }

caseNo: { type: string }

requestId: { \$ref: \"#/components/schemas/UUID\" }

type: { type: string, enum: \[non_compliance, arrears, illegal_trading\]
}

status: { type: string, enum: \[open, in_progress, closed\] }

EnforcementCaseCreate:

type: object

required: \[type\]

properties:

requestId: { \$ref: \"#/components/schemas/UUID\" }

type: { type: string, enum: \[non_compliance, arrears, illegal_trading\]
}

notes: { type: string }

Notice:

type: object

required: \[noticeId, noticeNo, noticeType, issuedDate\]

properties:

noticeId: { \$ref: \"#/components/schemas/UUID\" }

caseId: { \$ref: \"#/components/schemas/UUID\" }

noticeNo: { type: string }

noticeType: { type: string, enum: \[warning, closure, seizure\] }

issuedDate: { type: string, format: date }

complianceDue: { type: string, format: date }

details: { type: string }

NoticeCreate:

type: object

required: \[noticeType, issuedDate, details\]

properties:

noticeType: { type: string, enum: \[warning, closure, seizure\] }

issuedDate: { type: string, format: date }

complianceDue: { type: string, format: date }

details: { type: string }

AuditLog:

type: object

required: \[auditId, action, entityType, createdAt\]

properties:

auditId: { \$ref: \"#/components/schemas/UUID\" }

userId: { \$ref: \"#/components/schemas/UUID\" }

action: { type: string }

entityType: { type: string }

entityId: { \$ref: \"#/components/schemas/UUID\" }

createdAt: { type: string, format: date-time }

TimelineEvent:

type: object

required: \[type, timestamp\]

properties:

type: { type: string }

timestamp: { type: string, format: date-time }

actorUserId: { \$ref: \"#/components/schemas/UUID\" }

details: { type: object }

DeviceRegistration:

type: object

properties:

platform: { type: string, enum: \[android, ios\] }

deviceFingerprint: { type: string }

appVersion: { type: string }

AuthTokens:

type: object

required: \[accessToken, refreshToken, expiresIn\]

properties:

accessToken: { type: string }

refreshToken: { type: string }

expiresIn: { type: integer }

tokenType: { type: string, default: Bearer }

MobileReferenceBundle:

type: object

properties:

services:

type: array

items: { \$ref: \"#/components/schemas/ServiceCatalog\" }

fees:

type: array

items: { \$ref: \"#/components/schemas/FeeSchedule\" }

checklists:

type: array

items: { type: object }

cursor: { type: string }

MobileSyncItem:

type: object

required: \[entityType, operation, localUuid, payload\]

properties:

entityType: { type: string }

operation: { type: string, enum: \[create, update, delete\] }

localUuid: { \$ref: \"#/components/schemas/UUID\" }

payload: { type: object }

clientTimestamp: { type: string, format: date-time }

MobileSyncPush:

type: object

required: \[deviceFingerprint, items\]

properties:

deviceFingerprint: { type: string }

items:

type: array

items: { \$ref: \"#/components/schemas/MobileSyncItem\" }

MobileSyncResult:

type: object

required: \[accepted, failed\]

properties:

accepted:

type: array

items:

type: object

properties:

localUuid: { \$ref: \"#/components/schemas/UUID\" }

serverId: { \$ref: \"#/components/schemas/UUID\" }

failed:

type: array

items:

type: object

properties:

localUuid: { \$ref: \"#/components/schemas/UUID\" }

error: { \$ref: \"#/components/schemas/Problem\" }

newCursor: { type: string }

MobileSyncPull:

type: object

properties:

updates:

type: array

items:

type: object

properties:

entityType: { type: string }

entityId: { \$ref: \"#/components/schemas/UUID\" }

operation: { type: string }

payload: { type: object }

serverTimestamp: { type: string, format: date-time }

newCursor: { type: string }

------------------------------------------------------------------------

**(ii) RBAC/LBAC permission matrix per module (aligned to ERD + API)**

This matrix is designed to reduce **Broken Function Level
Authorization** and related access control failures highlighted by OWASP
(OWASP, 2023).

**A. Role set (reference)**

- **Platform Admin** (cross-council)

- **Council Admin**

- **Finance Manager**

- **Revenue Officer / Cashier**

- **Licensing Officer**

- **Inspector (Field)**

- **Works Officer**

- **Complaints Officer**

- **Planner / M&E**

- **Auditor**

- **Citizen (Self-service)**

- **Business (Self-service)**

**B. LBAC scope rules (enforced in queries + policies)**

- **Council scope**: X-Council-Id must match all rows (council_id)

- **Unit scope** (optional): unit_id match (e.g., licensing unit)

- **Ward/Location scope** (optional): permitted wards/areas for user
  (enforcement & inspection)

- **Object ownership scope**: citizen/business can only see records
  where requester_id = self or account.holder_id = self

**Baby steps to implement LBAC:**

1.  Add council_id to all tables (already in ERD)

2.  Put council_id filter in every repository query

3.  Add scope_claims to JWT (e.g., wards, unit)

4.  Enforce "self-only" for citizen/business endpoints

5.  Audit log all privileged actions (IETF, 2016; OWASP, 2023).

**C. Permission codes (suggested)**

Use stable codes such as:

- REGISTRY.CITIZEN.CREATE, REGISTRY.CITIZEN.READ,
  REGISTRY.BUSINESS.CREATE, ...

- REQUEST.CREATE, REQUEST.SUBMIT, REQUEST.APPROVE, REQUEST.REJECT

- INSPECTION.SCHEDULE, INSPECTION.UPDATE, INSPECTION.EVIDENCE.ADD

- BILLING.INVOICE.CREATE, BILLING.INVOICE.READ

- PAYMENT.INITIATE, PAYMENT.RECORD, PAYMENT.ALLOCATE, PAYMENT.RECONCILE

- LICENCE.ISSUE, LICENCE.RENEW

- COMPLAINT.CREATE, COMPLAINT.UPDATE

- ENFORCEMENT.CASE.CREATE, ENFORCEMENT.NOTICE.ISSUE

- CONFIG.SERVICE.MANAGE, CONFIG.FEE.MANAGE, CONFIG.WORKFLOW.MANAGE

- AUDIT.READ, REPORT.READ

**D. Module-by-module RBAC matrix (R=Read, C=Create, U=Update,
A=Approve/Issue, \$=Finance ops)**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Module**          **Key entities**  **Platform   **Council   **Finance    **Revenue/Cashier**   **Licensing**   **Inspector**   **Works**    **Complaints**   **Planner/M&E**   **Auditor**   **Citizen/Business**
                                        Admin**      Admin**     Mgr**                                                                                                                            
  ------------------- ----------------- ------------ ----------- ------------ --------------------- --------------- --------------- ------------ ---------------- ----------------- ------------- ----------------------
  Council setup       Council, Units    C/R/U        R/U         R            \-                    \-              \-              \-           \-               R                 R             \-

  RBAC                Users, Roles,     C/R/U        C/R/U       R            \-                    \-              \-              \-           \-               \-                R             \-
                      Permissions                                                                                                                                                                 

  Registry            Citizen,          R            C/R/U       R            R                     R               R               R            R                R                 R             C/R/U (self)
                      Business,                                                                                                                                                                   
                      Account, Address                                                                                                                                                            

  Service catalogue   ServiceCatalog    C/R/U        C/R/U       R            R                     R               R               R            R                R                 R             R

  Fees                FeeSchedule       C/R/U        C/R/U       A/R/U        R                     R               \-              \-           \-               R                 R             R (view only)

  Requests            ServiceRequest,   R            C/R/U/A     R            R/C (counter)         A/R/U           R/U (assigned)  R/U          R/U (assigned)   R                 R             C/R/U/Submit (self)
                      Workflow                                                                                                      (assigned)                                                    

  Documents           Document          R            R/U         R            R/U                   R/U             R/U             R/U          R/U              R                 R             C/R/U (self)

  Inspections         Inspection,       R            R/U         R            \-                    R               C/R/U           \-           \-               R                 R             R (own request status)
                      Findings,                                                                                                                                                                   
                      Evidence                                                                                                                                                                    

  Licensing/Permits   License, Permit   R            R/U         R            \-                    C/R/U/A (issue) R (view         \-           \-               R                 R             R (own)
                                                                                                                    assigned)                                                                     

  Billing             Invoice,          R            R           A/R/U        R/C/U (\$)            R               \-              \-           \-               R                 R             R (own)
                      InvoiceLine                                                                                                                                                                 

  Payments            Payment,          R            R           A/R/U (\$    C/R/U (\$ record)     R               R (verify)      \-           \-               R                 R             C/R (pay, view own)
                      Allocation,                                reconcile)                                                                                                                       
                      Receipt                                                                                                                                                                     

  Complaints          Complaint,        R            R/U         R            \-                    \-              R (if assigned) R/U (if      C/R/U/A          R                 R             C/R/U (self)
                      Updates                                                                                                       assigned)                                                     

  Enforcement         Case, Notice,     R            R/U         R            \-                    R               C/R/U/A         C/R/U/A      R                R                 R             R (own notices where
                      Penalty                                                                                                                                                                     applicable)

  Audit               AuditLog          R            R           R            R                     R               R               R            R                R                 C/R           \-

  Reporting           aggregated        R            R           R            R                     R               R               R            R                C/R               R             limited (own
                      reports                                                                                                                                                                     receipts/licences)
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**LBAC column rule-of-thumb per module (enforce in DB queries):**

- Registry/Requests: council_id = X-Council-Id AND (internal user scope
  OR self ownership)

- Inspections: assigned_to = user_id OR supervisory role + same
  ward/area scope

- Billing/Payments: finance roles see all within council; cashier
  limited by **counter/branch/unit** if configured

- Audit: auditors read-only; no deletes anywhere (OWASP, 2023).

------------------------------------------------------------------------

**(iii) Figma-ready wireframe list + component inventory (aligned to
ERD + API)**

**A. Screen list (Figma frames), mapped to ERD entities + API
endpoints**

Use IDs like MOB-01, WEB-05 as frame names in Figma.

**Mobile (Field + Citizen lightweight)**

  --------------------------------------------------------------------------------------------------------
  **Frame   **Screen name** **Primary users**       **ERD entities**     **Key API endpoints**
  ID**                                                                   
  --------- --------------- ----------------------- -------------------- ---------------------------------
  MOB-01    Login + Council All mobile users        User, Device,        POST /auth/login, GET /users/me
            select                                  MobileSession        

  MOB-02    Home (Tasks +   Inspector/Field         OfflineQueue,        POST /mobile/sync/pull, POST
            Sync banner)                            SyncJob              /mobile/sync/push

  MOB-03    My Assigned     Inspector               Inspection           GET /inspections?assignedTo=
            Inspections                                                  

  MOB-04    Inspection      Inspector               Inspection, Findings POST /inspections/{id}/findings
            Detail +                                                     
            Checklist                                                    

  MOB-05    Evidence        Inspector               InspectionEvidence   POST /inspections/{id}/evidence
            Capture                                                      
            (Camera)                                                     

  MOB-06    Payment Verify  Inspector/Revenue       Payment, Invoice     GET /receipts/{paymentId}, GET
            (QR/search)                                                  /invoices/{id}

  MOB-07    Issue Notice    Inspector/Enforcement   EnforcementCase,     POST /enforcement/cases, POST
            (Enforcement)                           Notice               /enforcement/cases/{id}/notices

  MOB-08    Lodge Complaint Citizen/Business        Complaint, Document  POST /complaints (+ optional
            (geo + photo)                                                document attach flow)

  MOB-09    Sync Center +   All field users         OfflineQueue,        POST /mobile/sync/push, POST
            Conflict                                SyncJob              /mobile/sync/pull
            resolve                                                      

  MOB-10    Profile +       All                     User, Device         GET /users/me
            Offline                                                      
            settings                                                     
  --------------------------------------------------------------------------------------------------------

**Web (Council back-office + citizen portal)**

  ----------------------------------------------------------------------------------------------------
  **Frame   **Screen      **Primary users**            **ERD entities**      **Key API endpoints**
  ID**      name**                                                           
  --------- ------------- ---------------------------- --------------------- -------------------------
  WEB-01    Admin         Council leadership           Invoice, Payment,     GET /invoices, GET
            dashboard                                  Requests              /requests, reports

  WEB-02    Service       Council Admin                ServiceCatalog        GET/POST /services
            catalogue                                                        
            management                                                       

  WEB-03    Fee schedule  Finance/Admin                FeeSchedule           GET/POST /fees
            management                                                       

  WEB-04    Workflow      Admin                        WorkflowDefinition,   GET/POST /workflows
            designer                                   Steps                 

  WEB-05    Request       Licensing/Works/Complaints   ServiceRequest,       GET /requests, GET
            inbox + SLA                                Workflow              /requests/{id}

  WEB-06    Request       Approvers                    ServiceRequest, Tasks POST
            review +                                                         /requests/{id}/submit
            decision                                                         (and internal approve
                                                                             action if added)

  WEB-07    Billing       Finance                      Invoice, InvoiceLine  POST /invoices, GET
            workspace                                                        /invoices/{id}

  WEB-08    Counter       Cashier                      Payment               POST /payments/record,
            payment entry                                                    POST
                                                                             /payments/{id}/allocate

  WEB-09    Card payments Finance                      Payment               PSP webhook + payment
            monitor                                                          status views

  WEB-10    Licence       Licensing                    License               GET /licences, POST
            issuance +                                                       /licences/{id}/renew
            printing                                                         

  WEB-11    Complaints    Complaints officer           Complaint, Updates    GET/POST /complaints,
            triage                                                           updates

  WEB-12    Enforcement   Enforcement                  Case, Notice, Penalty enforcement endpoints
            case mgmt                                                        

  WEB-13    Registry      Front office                 Citizen, Business,    registry endpoints
            search                                     Account               

  WEB-14    Audit viewer  Auditor                      AuditLog              GET /audit/logs

  WEB-15    User & role   Admin                        User, Role,           /users, /roles,
            management                                 Permission            /permissions
  ----------------------------------------------------------------------------------------------------

**B. Component inventory (reusable Figma components)**

**1) Global components (Mobile + Web)**

- **AppShell** (Top bar, council badge, user menu)

- **OfflineBanner** (states: Online / Offline / Sync pending / Sync
  error)

- **RoleGuard** (UI-level permission gating; backend still enforces)

- **Toast/Alert** (success/error/info)

- **EmptyState** (no data)

- **SkeletonLoader** (list/table loading)

- **PaginationControl** (web)

**2) Forms & inputs**

- TextField, NumberField, DatePicker, TimePicker

- Select (single), MultiSelect (roles, wards)

- FileUploader (with checksum + preview)

- SignaturePad (for notices)

- QRScanner (payment/licence verification)

- GPSCapture (lat/long + accuracy)

- ChecklistControl (inspection scoring)

**3) Lists & data display**

- CardList (mobile)

- DataTable (web): sortable, filterable, export (CSV)

- StatusPill (draft/submitted/approved/paid etc.)

- Timeline (request history)

- MapView (pins for complaints/inspections/properties)

**4) Domain-specific composites (high value)**

- **RequestWizard** (steps: Draft → Docs → Review → Submit)

- **InvoiceComposer** (lines, totals, due date, fee lookup)

- **PaymentPanel** (initiate card / record cash / allocate)

- **InspectionForm** (checklist + findings + evidence)

- **NoticeIssuer** (template + due date + signature + PDF/QR)

**C. Design tokens (practical minimum)**

- **Typography scale**: H1/H2/H3/Body/Caption

- **Spacing**: 4/8/12/16/24 grid

- **States**: default/hover/disabled/error/success

- **Status colours**: define semantic tokens (do not hardcode per
  screen)

- **Accessibility**: minimum touch target 44px mobile; consistent with
  standard accessibility practice (implementation detail).

**MASTER IMPLEMENTATION DOCUMENT**

**Modular Local Government Information System (LGIS)**

**Purpose:**\
This document is the **authoritative single source of truth** for the
design, development, and deployment of a **Modular Local Government
Information System (LGIS)** for **municipal, city, district, and LLG
levels**, including **web and mobile applications**, **offline field
operations**, **multi-channel payments**, **RBAC/LBAC security**, and
**configurable workflows**.

------------------------------------------------------------------------

**1. SYSTEM OVERVIEW**

**1.1 System Name**

**Local Government Information System (LGIS)**

**1.2 Problem Statement**

Local Governments rely heavily on **manual, fragmented, paper-based
processes** for licensing, revenue collection, inspections, enforcement,
and citizen services. This causes:

- Revenue leakages

- Delayed service delivery

- Poor auditability

- Limited transparency

- Weak decision-making

**1.3 Solution Summary**

LGIS is a **multi-tenant, modular, configurable digital platform** that:

- Digitises all major local government services

- Supports **web + mobile (offline-first)** operations

- Integrates **online and offline payments**

- Enforces **role-based and location-based access control**

- Produces **real-time operational and financial intelligence**

------------------------------------------------------------------------

**2. TARGET USERS**

**2.1 Internal Users**

- Council Administrators

- Finance Managers

- Revenue Officers / Cashiers

- Licensing Officers

- Inspectors / Enforcement Officers (Mobile)

- Works & Infrastructure Officers

- Complaints Officers

- Planners / M&E Officers

- Auditors

**2.2 External Users**

- Citizens

- Businesses

- Market Vendors

- Banks / Payment Service Providers

------------------------------------------------------------------------

**3. FUNCTIONAL MODULES (FINAL)**

1.  Council & Organisational Setup

2.  User Management & RBAC/LBAC

3.  Citizen & Business Registry

4.  Service Catalogue & Fee Configuration

5.  Licensing & Permit Management

6.  Property & Rates Management

7.  Market & Stall Management

8.  Revenue, Billing & Invoicing

9.  Multi-Channel Payments & Receipting

10. Inspections & Field Operations (Mobile)

11. Enforcement & Compliance

12. Complaints & Service Requests

13. Workflow Engine

14. Audit Logs & Reporting

15. Mobile Offline Sync Engine

------------------------------------------------------------------------

**4. SYSTEM ARCHITECTURE (IMPLEMENTATION VIEW)**

**4.1 Architecture Style**

- **Modular Monolith (Phase 1)** → **Service-oriented (Phase 2)**

- **API-first**

- **Multi-tenant (Council-scoped)**

- **Offline-first mobile**

**4.2 High-Level Components**

- Web Application (Admin + Citizen Portal)

- Mobile Application (Android / iOS)

- Backend API

- Database

- Payment Gateway Integrations

- Notification Services

- Object Storage (documents, evidence)

------------------------------------------------------------------------

**5. TECHNOLOGY STACK (OPEN SOURCE FIRST)**

**5.1 Frontend -- Web**

  -----------------------------
  **Layer**   **Technology**
  ----------- -----------------
  Framework   **React (Vite)**

  UI          **Tailwind CSS**

  State       TanStack Query

  Forms       React Hook Form

  Tables      TanStack Table

  Charts      Apache ECharts

  Maps        Leaflet /
              OpenLayers

  Auth        JWT (Bearer)
  -----------------------------

**5.2 Frontend -- Mobile**

  --------------------------------
  **Layer**    **Technology**
  ------------ -------------------
  Framework    **React Native
               (Expo)**

  Offline      SQLite / MMKV
  Storage      

  Camera & GPS Expo APIs

  Sync Engine  Custom
               (cursor-based)

  QR Scanning  Expo Barcode
               Scanner
  --------------------------------

**5.3 Backend**

  --------------------------------------------
  **Layer**       **Technology**
  --------------- ----------------------------
  Runtime         **Node.js (LTS)**

  Framework       **NestJS**

  API             REST (OpenAPI 3.1)

  Auth            OAuth2/JWT

  Validation      Zod

  File Uploads    S3-compatible (MinIO)

  Background Jobs BullMQ

  Notifications   Email (SMTP), SMS, WhatsApp
                  API
  --------------------------------------------

**5.4 Database & Storage**

  --------------------------------
  **Purpose**   **Technology**
  ------------- ------------------
  Primary DB    **PostgreSQL**

  GIS           **PostGIS**

  Offline Sync  UUID v7
  IDs           

  Caching       Redis

  Object        MinIO (self-hosted
  Storage       S3)
  --------------------------------

------------------------------------------------------------------------

**6. DATABASE DESIGN (AUTHORITATIVE)**

**6.1 Database Principles**

- Every table has council_id

- UUID primary keys

- Soft deletes where required

- Immutable audit logs

- Strict foreign keys

**6.2 Core Tables (Aligned to ERD)**

- councils

- council_units

- users

- roles

- permissions

- user_roles

- audit_logs

- citizens

- businesses

- accounts

- services

- fee_schedules

- service_requests

- workflow_definitions

- workflow_steps

- workflow_instances

- inspections

- inspection_findings

- inspection_evidence

- invoices

- invoice_lines

- payments

- payment_allocations

- licences

- licence_renewals

- properties

- rate_assessments

- markets

- stalls

- complaints

- complaint_updates

- enforcement_cases

- notices

------------------------------------------------------------------------

**7. SECURITY MODEL (MANDATORY)**

**7.1 RBAC (Role-Based Access Control)**

- Roles are **council-specific**

- Permissions are **platform-defined**

- Users can have multiple roles

**7.2 LBAC (Location-Based Access Control)**

- Council scope (mandatory)

- Unit scope (optional)

- Ward/Area scope (for inspections & enforcement)

- Ownership scope (citizens/businesses)

**7.3 Security Controls**

- JWT with short-lived access tokens

- Refresh token rotation

- Idempotency keys for payments

- Signed PSP webhooks

- Immutable audit logs

- Field-level validation

------------------------------------------------------------------------

**8. API SPECIFICATION**

**8.1 Standard Rules**

- Base URL: /api/v1

- Header: X-Council-Id

- Errors: RFC 7807

- Pagination: page, pageSize

**8.2 Core Endpoint Groups**

- /auth/\*

- /users, /roles, /permissions

- /citizens, /businesses, /accounts

- /services, /fees

- /workflows

- /requests

- /inspections

- /invoices

- /payments

- /licences

- /properties

- /markets, /stalls

- /complaints

- /enforcement/\*

- /mobile/sync/\*

- /audit/logs

➡ **The full OpenAPI 3.1 YAML specification provided earlier in this
conversation is part of this document and must be used without
modification.**

------------------------------------------------------------------------

**9. MOBILE APPLICATION (FIELD-READY)**

**9.1 Core Mobile Capabilities**

- Offline inspections

- Evidence capture (photo/video)

- GPS tagging

- QR verification (licence/payment)

- Enforcement notice issuance

- Complaint capture

- Offline sync with conflict resolution

**9.2 Offline Sync Rules**

- Client generates local UUIDs

- Server maps to canonical IDs

- Cursor-based pull

- Conflict resolution UI

------------------------------------------------------------------------

**10. FIGMA-READY UI INVENTORY**

**10.1 Screen Inventory**

- Login & Council Selection

- Dashboard (role-based)

- Service Catalogue

- Fee Management

- Workflow Designer

- Request Inbox

- Request Review

- Billing Workspace

- Payment Counter

- Licence Issuance

- Inspections (Mobile)

- Enforcement (Mobile)

- Complaints Portal

- Audit Viewer

- User & Role Management

**10.2 Reusable Components**

- AppShell

- Offline Banner

- Status Pills

- Timeline

- Invoice Composer

- Payment Panel

- Inspection Checklist

- Evidence Capture

- Notice Issuer

- Map View

------------------------------------------------------------------------

**11. DEPLOYMENT MODEL**

**11.1 Environments**

- Local Development

- Staging

- Production

**11.2 Hosting (Open Source Friendly)**

- Docker + Docker Compose

- PostgreSQL + PostGIS

- MinIO

- Redis

- Nginx Reverse Proxy

**11.3 CI/CD**

- GitHub Actions

- Database migrations via Prisma / Flyway

------------------------------------------------------------------------

**12. IMPLEMENTATION PHASES**

**Phase 1 -- Core Revenue & Licensing**

- Registry

- Services

- Fees

- Requests

- Invoices

- Payments

**Phase 2 -- Operations**

- Inspections

- Mobile App

- Enforcement

- Complaints

**Phase 3 -- Optimisation**

- Advanced analytics

- GIS dashboards

- External system integrations

------------------------------------------------------------------------

**13. SUCCESS METRICS**

- Increased local revenue

- Reduced service turnaround time

- Improved audit compliance

- Improved citizen satisfaction

- Reduced cash leakage

------------------------------------------------------------------------

**14. INSTRUCTIONS FOR ANTIGRAVITY / REPLIT**

**Prompt to use verbatim:**

"Build a full-stack Local Government Information System exactly as
specified in this document.\
Use the technology stack defined.\
Implement the database schema, OpenAPI 3.1 API, RBAC/LBAC security,
mobile offline sync, and all modules listed.\
Follow the ERD, API specification, and UI inventory strictly.\
Do not invent additional entities or workflows."

**LGIS -- SQL MIGRATION SCRIPTS**

**Database:** PostgreSQL + PostGIS\
**Design principles:**

- UUID primary keys

- council_id enforced everywhere (LBAC)

- Strict foreign keys

- Immutable audit logs

- Payment-safe idempotency

------------------------------------------------------------------------

**MIGRATION 001 -- EXTENSIONS & BASE TYPES**

\-- ================================

\-- MIGRATION 001: EXTENSIONS

\-- ================================

CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";

CREATE EXTENSION IF NOT EXISTS \"pgcrypto\";

CREATE EXTENSION IF NOT EXISTS \"postgis\";

------------------------------------------------------------------------

**MIGRATION 002 -- COUNCILS & ORGANISATION STRUCTURE**

\-- ================================

\-- MIGRATION 002: COUNCILS

\-- ================================

CREATE TABLE councils (

council_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

name TEXT NOT NULL,

level TEXT NOT NULL CHECK (level IN
(\'city\',\'municipal\',\'district\',\'llg\')),

country_code CHAR(2) NOT NULL,

currency_code CHAR(3) NOT NULL,

timezone TEXT NOT NULL,

status TEXT NOT NULL DEFAULT \'active\',

created_at TIMESTAMPTZ NOT NULL DEFAULT now()

);

CREATE TABLE council_units (

unit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

name TEXT NOT NULL,

type TEXT NOT NULL,

parent_unit_id UUID REFERENCES council_units(unit_id)

);

CREATE INDEX idx_units_council ON council_units(council_id);

------------------------------------------------------------------------

**MIGRATION 003 -- USERS, ROLES, PERMISSIONS (RBAC + LBAC)**

\-- ================================

\-- MIGRATION 003: USERS & RBAC

\-- ================================

CREATE TABLE users (

user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

unit_id UUID REFERENCES council_units(unit_id),

full_name TEXT NOT NULL,

email TEXT NOT NULL,

phone TEXT,

password_hash TEXT NOT NULL,

status TEXT NOT NULL DEFAULT \'active\',

mfa_enabled BOOLEAN DEFAULT FALSE,

last_login_at TIMESTAMPTZ,

created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

UNIQUE (council_id, email)

);

CREATE TABLE roles (

role_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

name TEXT NOT NULL,

scope TEXT NOT NULL CHECK (scope IN
(\'council\',\'unit\',\'ward\',\'location\')),

UNIQUE (council_id, name)

);

CREATE TABLE permissions (

permission_code TEXT PRIMARY KEY,

description TEXT NOT NULL

);

CREATE TABLE role_permissions (

role_id UUID REFERENCES roles(role_id) ON DELETE CASCADE,

permission_code TEXT REFERENCES permissions(permission_code),

PRIMARY KEY (role_id, permission_code)

);

CREATE TABLE user_roles (

user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,

role_id UUID REFERENCES roles(role_id) ON DELETE CASCADE,

assigned_at TIMESTAMPTZ DEFAULT now(),

PRIMARY KEY (user_id, role_id)

);

**MIGRATION 004 -- AUDIT LOGS (IMMUTABLE)**

\-- ================================

\-- MIGRATION 004: AUDIT LOGS

\-- ================================

CREATE TABLE audit_logs (

audit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

user_id UUID REFERENCES users(user_id),

action TEXT NOT NULL,

entity_type TEXT NOT NULL,

entity_id UUID,

before_state JSONB,

after_state JSONB,

ip_address TEXT,

created_at TIMESTAMPTZ NOT NULL DEFAULT now()

);

CREATE INDEX idx_audit_council ON audit_logs(council_id);

CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);

------------------------------------------------------------------------

**MIGRATION 005 -- CITIZENS, BUSINESSES & ACCOUNTS**

\-- ================================

\-- MIGRATION 005: REGISTRY

\-- ================================

CREATE TABLE citizens (

citizen_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

national_id TEXT,

local_citizen_no TEXT,

first_name TEXT NOT NULL,

last_name TEXT NOT NULL,

dob DATE,

sex TEXT,

UNIQUE (council_id, local_citizen_no)

);

CREATE TABLE businesses (

business_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

registration_no TEXT,

tin TEXT,

legal_name TEXT NOT NULL,

trading_name TEXT,

business_type TEXT

);

CREATE TABLE accounts (

account_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

holder_type TEXT NOT NULL CHECK (holder_type IN
(\'citizen\',\'business\')),

holder_id UUID NOT NULL,

account_no TEXT NOT NULL,

status TEXT NOT NULL DEFAULT \'active\',

UNIQUE (council_id, account_no)

);

------------------------------------------------------------------------

**MIGRATION 006 -- SERVICE CATALOGUE & FEES**

\-- ================================

\-- MIGRATION 006: SERVICES & FEES

\-- ================================

CREATE TABLE services (

service_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

code TEXT NOT NULL,

name TEXT NOT NULL,

category TEXT NOT NULL,

requires_inspection BOOLEAN DEFAULT FALSE,

requires_approval BOOLEAN DEFAULT TRUE,

active BOOLEAN DEFAULT TRUE,

UNIQUE (council_id, code)

);

CREATE TABLE fee_schedules (

fee_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

service_id UUID NOT NULL REFERENCES services(service_id),

name TEXT NOT NULL,

basis TEXT NOT NULL,

amount NUMERIC(12,2) NOT NULL,

currency CHAR(3) NOT NULL,

valid_from DATE NOT NULL,

valid_to DATE

);

------------------------------------------------------------------------

**MIGRATION 007 -- WORKFLOWS & REQUESTS**

\-- ================================

\-- MIGRATION 007: WORKFLOWS

\-- ================================

CREATE TABLE workflow_definitions (

workflow_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

service_id UUID NOT NULL REFERENCES services(service_id),

version TEXT NOT NULL,

active BOOLEAN DEFAULT TRUE

);

CREATE TABLE workflow_steps (

step_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

workflow_id UUID NOT NULL REFERENCES workflow_definitions(workflow_id),

name TEXT NOT NULL,

order_no INTEGER NOT NULL,

assignee_role TEXT,

sla_rule TEXT

);

CREATE TABLE service_requests (

request_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

service_id UUID NOT NULL REFERENCES services(service_id),

requester_type TEXT NOT NULL,

requester_id UUID NOT NULL,

status TEXT NOT NULL DEFAULT \'draft\',

channel TEXT NOT NULL,

form_data JSONB,

submitted_at TIMESTAMPTZ

);

CREATE TABLE workflow_instances (

instance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

request_id UUID NOT NULL REFERENCES service_requests(request_id),

workflow_id UUID NOT NULL REFERENCES workflow_definitions(workflow_id),

state TEXT NOT NULL,

started_at TIMESTAMPTZ DEFAULT now(),

ended_at TIMESTAMPTZ

);

------------------------------------------------------------------------

**MIGRATION 008 -- INSPECTIONS & FIELD DATA**

\-- ================================

\-- MIGRATION 008: INSPECTIONS

\-- ================================

CREATE TABLE inspections (

inspection_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

request_id UUID NOT NULL REFERENCES service_requests(request_id),

inspector_user_id UUID REFERENCES users(user_id),

scheduled_at TIMESTAMPTZ,

performed_at TIMESTAMPTZ,

result TEXT,

remarks TEXT,

location GEOGRAPHY(POINT, 4326)

);

CREATE TABLE inspection_findings (

finding_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

inspection_id UUID NOT NULL REFERENCES inspections(inspection_id),

code TEXT,

severity TEXT,

description TEXT,

corrective_action TEXT,

due_date DATE

);

CREATE TABLE inspection_evidence (

evidence_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

inspection_id UUID NOT NULL REFERENCES inspections(inspection_id),

media_type TEXT,

url TEXT,

hash TEXT

);

------------------------------------------------------------------------

**MIGRATION 009 -- BILLING, PAYMENTS & LICENSING**

\-- ================================

\-- MIGRATION 009: FINANCE

\-- ================================

CREATE TABLE invoices (

invoice_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

account_id UUID NOT NULL REFERENCES accounts(account_id),

invoice_no TEXT NOT NULL,

total_amount NUMERIC(12,2) NOT NULL,

currency CHAR(3) NOT NULL,

status TEXT NOT NULL,

issued_at TIMESTAMPTZ DEFAULT now(),

due_at TIMESTAMPTZ,

UNIQUE (council_id, invoice_no)

);

CREATE TABLE invoice_lines (

line_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

invoice_id UUID NOT NULL REFERENCES invoices(invoice_id),

description TEXT,

quantity INTEGER,

unit_price NUMERIC(12,2),

line_total NUMERIC(12,2)

);

CREATE TABLE payments (

payment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

account_id UUID NOT NULL REFERENCES accounts(account_id),

payment_ref TEXT NOT NULL,

amount NUMERIC(12,2) NOT NULL,

currency CHAR(3) NOT NULL,

method TEXT NOT NULL,

provider TEXT,

status TEXT NOT NULL,

paid_at TIMESTAMPTZ,

UNIQUE (council_id, payment_ref)

);

CREATE TABLE payment_allocations (

allocation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

payment_id UUID NOT NULL REFERENCES payments(payment_id),

invoice_id UUID NOT NULL REFERENCES invoices(invoice_id),

allocated_amount NUMERIC(12,2) NOT NULL

);

CREATE TABLE licences (

license_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

request_id UUID NOT NULL REFERENCES service_requests(request_id),

license_no TEXT NOT NULL,

issue_date DATE,

expiry_date DATE,

status TEXT NOT NULL,

UNIQUE (council_id, license_no)

);

------------------------------------------------------------------------

**MIGRATION 010 -- COMPLAINTS & ENFORCEMENT**

\-- ================================

\-- MIGRATION 010: COMPLAINTS & ENFORCEMENT

\-- ================================

CREATE TABLE complaints (

complaint_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

complainant_type TEXT,

complainant_id UUID,

category TEXT,

status TEXT NOT NULL,

description TEXT,

location GEOGRAPHY(POINT, 4326),

created_at TIMESTAMPTZ DEFAULT now()

);

CREATE TABLE complaint_updates (

update_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

complaint_id UUID NOT NULL REFERENCES complaints(complaint_id),

updated_by UUID REFERENCES users(user_id),

status TEXT,

comment TEXT,

created_at TIMESTAMPTZ DEFAULT now()

);

CREATE TABLE enforcement_cases (

case_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

request_id UUID REFERENCES service_requests(request_id),

case_no TEXT NOT NULL,

type TEXT,

status TEXT,

UNIQUE (council_id, case_no)

);

CREATE TABLE notices (

notice_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

council_id UUID NOT NULL REFERENCES councils(council_id),

case_id UUID NOT NULL REFERENCES enforcement_cases(case_id),

notice_no TEXT NOT NULL,

notice_type TEXT,

issued_date DATE,

compliance_due DATE,

details TEXT,

UNIQUE (council_id, notice_no)

);

------------------------------------------------------------------------

**FINAL EXECUTION ORDER (SAFE)**

1.  001_extensions.sql

2.  002_councils.sql

3.  003_users_rbac.sql

4.  004_audit_logs.sql

5.  005_registry.sql

6.  006_services_fees.sql

7.  007_workflows_requests.sql

8.  008_inspections.sql

9.  009_finance.sql

10. 010_complaints_enforcement.sql

------------------------------------------------------------------------

**NEXT OPTIONAL STEPS (RECOMMENDED)**

- Add **row-level security (RLS)** policies for LBAC

- Add **database triggers** for audit logging

- Add **materialized views** for dashboards

- Add **seed data** for permissions & roles

Below are **PostgreSQL Row-Level Security (RLS) policies** for LGIS,
designed to enforce **mandatory council scoping (LBAC)** and
**self-service ownership**, with an **optional unit/ward scope**
extension. This aligns to your ERD principle that every record is scoped
by council_id and supports OWASP's guidance on avoiding broken
authorization by enforcing access controls server-side (OWASP, 2023).

**Important prerequisite (baby steps):**

1.  Run this in **staging first**.

2.  Ensure your API sets session variables per request (Step 2 below).

3.  Test with "read-only" policies first, then enable writes.

4.  Use **application roles**, not superuser, for the API connection.

------------------------------------------------------------------------

**MIGRATION 011 -- RLS POLICIES (COUNCIL LBAC + SELF-SERVICE)**

**Step 1 --- Create helper schema and functions**

These functions read request-scoped variables that your API sets at
session level.

\-- ================================

\-- MIGRATION 011-A: RLS HELPERS

\-- ================================

CREATE SCHEMA IF NOT EXISTS app;

\-- Read mandatory council context set by the API (UUID string)

CREATE OR REPLACE FUNCTION app.current_council_id()

RETURNS uuid

LANGUAGE sql

STABLE

AS \$\$

SELECT nullif(current_setting(\'app.council_id\', true), \'\')::uuid;

\$\$;

\-- Read current authenticated user id (UUID string) for staff users

CREATE OR REPLACE FUNCTION app.current_user_id()

RETURNS uuid

LANGUAGE sql

STABLE

AS \$\$

SELECT nullif(current_setting(\'app.user_id\', true), \'\')::uuid;

\$\$;

\-- Read current principal type: \'staff\' \| \'citizen\' \|
\'business\'

CREATE OR REPLACE FUNCTION app.current_principal_type()

RETURNS text

LANGUAGE sql

STABLE

AS \$\$

SELECT nullif(current_setting(\'app.principal_type\', true), \'\');

\$\$;

\-- Read citizen/business principal id for self-service

CREATE OR REPLACE FUNCTION app.current_principal_id()

RETURNS uuid

LANGUAGE sql

STABLE

AS \$\$

SELECT nullif(current_setting(\'app.principal_id\', true), \'\')::uuid;

\$\$;

\-- Optional: unit scope for staff (if you enforce unit-based access)

CREATE OR REPLACE FUNCTION app.current_unit_id()

RETURNS uuid

LANGUAGE sql

STABLE

AS \$\$

SELECT nullif(current_setting(\'app.unit_id\', true), \'\')::uuid;

\$\$;

------------------------------------------------------------------------

**Step 2 --- How the API must set session variables (mandatory)**

Your backend must set these on every DB connection (per request).
Example SQL statements to run at the start of each request/transaction:

\-- Mandatory for all requests

SELECT set_config(\'app.council_id\',
\'00000000-0000-0000-0000-000000000000\', true);

\-- For staff requests (internal)

SELECT set_config(\'app.principal_type\', \'staff\', true);

SELECT set_config(\'app.user_id\',
\'11111111-1111-1111-1111-111111111111\', true);

\-- Optional unit scope:

SELECT set_config(\'app.unit_id\',
\'22222222-2222-2222-2222-222222222222\', true);

\-- For citizen self-service

SELECT set_config(\'app.principal_type\', \'citizen\', true);

SELECT set_config(\'app.principal_id\',
\'33333333-3333-3333-3333-333333333333\', true);

\-- For business self-service

SELECT set_config(\'app.principal_type\', \'business\', true);

SELECT set_config(\'app.principal_id\',
\'44444444-4444-4444-4444-444444444444\', true);

**Rule:** If app.council_id is not set, the RLS policies below will deny
access by default.

------------------------------------------------------------------------

**Step 3 --- Enable RLS on all council-scoped tables**

Run this for each table that has a council_id column.

\-- ================================

\-- MIGRATION 011-B: ENABLE RLS

\-- ================================

ALTER TABLE councils ENABLE ROW LEVEL SECURITY;

ALTER TABLE council_units ENABLE ROW LEVEL SECURITY;

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

ALTER TABLE citizens ENABLE ROW LEVEL SECURITY;

ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

ALTER TABLE fee_schedules ENABLE ROW LEVEL SECURITY;

ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

ALTER TABLE workflow_definitions ENABLE ROW LEVEL SECURITY;

ALTER TABLE workflow_steps ENABLE ROW LEVEL SECURITY;

ALTER TABLE workflow_instances ENABLE ROW LEVEL SECURITY;

ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;

ALTER TABLE inspection_findings ENABLE ROW LEVEL SECURITY;

ALTER TABLE inspection_evidence ENABLE ROW LEVEL SECURITY;

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

ALTER TABLE invoice_lines ENABLE ROW LEVEL SECURITY;

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

ALTER TABLE payment_allocations ENABLE ROW LEVEL SECURITY;

ALTER TABLE licences ENABLE ROW LEVEL SECURITY;

ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

ALTER TABLE complaint_updates ENABLE ROW LEVEL SECURITY;

ALTER TABLE enforcement_cases ENABLE ROW LEVEL SECURITY;

ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

------------------------------------------------------------------------

**Step 4 --- Core Council LBAC policy (applies to most tables)**

This enforces: **a user can only see rows matching their council**.

\-- ================================

\-- MIGRATION 011-C: COUNCIL LBAC POLICIES

\-- ================================

\-- Template policy: council_id must match app.current_council_id()

\-- Apply to each table below.

\-- councils: allow read within council (platform admin handled
separately at app layer)

CREATE POLICY councils_council_isolation

ON councils

USING (council_id = app.current_council_id());

\-- For all other council-scoped tables:

CREATE POLICY council_units_council_isolation

ON council_units

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY users_council_isolation

ON users

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY roles_council_isolation

ON roles

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY audit_logs_council_isolation

ON audit_logs

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY citizens_council_isolation

ON citizens

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY businesses_council_isolation

ON businesses

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY accounts_council_isolation

ON accounts

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY services_council_isolation

ON services

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY fee_schedules_council_isolation

ON fee_schedules

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY service_requests_council_isolation

ON service_requests

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY workflow_definitions_council_isolation

ON workflow_definitions

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY workflow_steps_council_isolation

ON workflow_steps

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY workflow_instances_council_isolation

ON workflow_instances

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY inspections_council_isolation

ON inspections

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY inspection_findings_council_isolation

ON inspection_findings

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY inspection_evidence_council_isolation

ON inspection_evidence

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY invoices_council_isolation

ON invoices

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY invoice_lines_council_isolation

ON invoice_lines

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY payments_council_isolation

ON payments

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY payment_allocations_council_isolation

ON payment_allocations

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY licences_council_isolation

ON licences

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY complaints_council_isolation

ON complaints

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY complaint_updates_council_isolation

ON complaint_updates

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY enforcement_cases_council_isolation

ON enforcement_cases

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

CREATE POLICY notices_council_isolation

ON notices

USING (council_id = app.current_council_id())

WITH CHECK (council_id = app.current_council_id());

------------------------------------------------------------------------

**Step 5 --- Self-service ownership policies (Citizens/Businesses)**

These policies restrict citizen/business portal access to "own records
only", while still allowing staff access. This pattern reduces
overexposure risk (OWASP, 2023).

**5.1 Service Requests: citizens/business can only access their own
requests**

\-- Replace the existing policy with a stricter combined policy.

DROP POLICY IF EXISTS service_requests_council_isolation ON
service_requests;

CREATE POLICY service_requests_access

ON service_requests

USING (

council_id = app.current_council_id()

AND (

app.current_principal_type() = \'staff\'

OR (

app.current_principal_type() IN (\'citizen\',\'business\')

AND requester_type = app.current_principal_type()

AND requester_id = app.current_principal_id()

)

)

)

WITH CHECK (

council_id = app.current_council_id()

AND (

app.current_principal_type() = \'staff\'

OR (

app.current_principal_type() IN (\'citizen\',\'business\')

AND requester_type = app.current_principal_type()

AND requester_id = app.current_principal_id()

)

)

);

**5.2 Accounts/Invoices/Payments: self-service limited to own
account(s)**

Because invoices/payments are linked to account_id, enforce access via
an EXISTS join to accounts.

\-- Accounts: citizen/business only see their own

DROP POLICY IF EXISTS accounts_council_isolation ON accounts;

CREATE POLICY accounts_access

ON accounts

USING (

council_id = app.current_council_id()

AND (

app.current_principal_type() = \'staff\'

OR (

app.current_principal_type() IN (\'citizen\',\'business\')

AND holder_type = app.current_principal_type()

AND holder_id = app.current_principal_id()

)

)

)

WITH CHECK (

council_id = app.current_council_id()

AND (

app.current_principal_type() = \'staff\'

OR (

app.current_principal_type() IN (\'citizen\',\'business\')

AND holder_type = app.current_principal_type()

AND holder_id = app.current_principal_id()

)

)

);

\-- Invoices: citizen/business only see invoices for accounts they own

DROP POLICY IF EXISTS invoices_council_isolation ON invoices;

CREATE POLICY invoices_access

ON invoices

USING (

council_id = app.current_council_id()

AND (

app.current_principal_type() = \'staff\'

OR EXISTS (

SELECT 1

FROM accounts a

WHERE a.account_id = invoices.account_id

AND a.council_id = app.current_council_id()

AND a.holder_type = app.current_principal_type()

AND a.holder_id = app.current_principal_id()

)

)

)

WITH CHECK (council_id = app.current_council_id());

\-- Payments: citizen/business only see payments for accounts they own

DROP POLICY IF EXISTS payments_council_isolation ON payments;

CREATE POLICY payments_access

ON payments

USING (

council_id = app.current_council_id()

AND (

app.current_principal_type() = \'staff\'

OR EXISTS (

SELECT 1

FROM accounts a

WHERE a.account_id = payments.account_id

AND a.council_id = app.current_council_id()

AND a.holder_type = app.current_principal_type()

AND a.holder_id = app.current_principal_id()

)

)

)

WITH CHECK (council_id = app.current_council_id());

**5.3 Complaints: citizen/business limited to their own complaints**

DROP POLICY IF EXISTS complaints_council_isolation ON complaints;

CREATE POLICY complaints_access

ON complaints

USING (

council_id = app.current_council_id()

AND (

app.current_principal_type() = \'staff\'

OR (

app.current_principal_type() IN (\'citizen\',\'business\')

AND complainant_type = app.current_principal_type()

AND complainant_id = app.current_principal_id()

)

)

)

WITH CHECK (council_id = app.current_council_id());

**Step 6 --- Optional: unit scope for certain staff operations (advanced
LBAC)**

If you want certain units (e.g., licensing vs works) to be isolated, you
can apply additional constraints. This is optional and depends on your
governance model.

Example: Only allow staff to see requests in their unit, if you add
handling_unit_id to service_requests. (Your current ERD does not include
it; this is an optional enhancement.)

If you **do not** add handling_unit_id, skip this step.

**Step 7 --- Enforce RLS for table owners (recommended)**

By default, table owners can bypass RLS unless forced. For maximum
safety, enforce it:

ALTER TABLE councils FORCE ROW LEVEL SECURITY;

ALTER TABLE council_units FORCE ROW LEVEL SECURITY;

ALTER TABLE users FORCE ROW LEVEL SECURITY;

ALTER TABLE roles FORCE ROW LEVEL SECURITY;

ALTER TABLE audit_logs FORCE ROW LEVEL SECURITY;

ALTER TABLE citizens FORCE ROW LEVEL SECURITY;

ALTER TABLE businesses FORCE ROW LEVEL SECURITY;

ALTER TABLE accounts FORCE ROW LEVEL SECURITY;

ALTER TABLE services FORCE ROW LEVEL SECURITY;

ALTER TABLE fee_schedules FORCE ROW LEVEL SECURITY;

ALTER TABLE service_requests FORCE ROW LEVEL SECURITY;

ALTER TABLE workflow_definitions FORCE ROW LEVEL SECURITY;

ALTER TABLE workflow_steps FORCE ROW LEVEL SECURITY;

ALTER TABLE workflow_instances FORCE ROW LEVEL SECURITY;

ALTER TABLE inspections FORCE ROW LEVEL SECURITY;

ALTER TABLE inspection_findings FORCE ROW LEVEL SECURITY;

ALTER TABLE inspection_evidence FORCE ROW LEVEL SECURITY;

ALTER TABLE invoices FORCE ROW LEVEL SECURITY;

ALTER TABLE invoice_lines FORCE ROW LEVEL SECURITY;

ALTER TABLE payments FORCE ROW LEVEL SECURITY;

ALTER TABLE payment_allocations FORCE ROW LEVEL SECURITY;

ALTER TABLE licences FORCE ROW LEVEL SECURITY;

ALTER TABLE complaints FORCE ROW LEVEL SECURITY;

ALTER TABLE complaint_updates FORCE ROW LEVEL SECURITY;

ALTER TABLE enforcement_cases FORCE ROW LEVEL SECURITY;

ALTER TABLE notices FORCE ROW LEVEL SECURITY;

**BABY-STEP TEST PLAN (MANDATORY)**

**Test 1 --- Missing council context should return zero rows**

RESET ALL;

SELECT \* FROM service_requests LIMIT 5; \-- should return 0 or error
(depending on app usage)

**Test 2 --- Staff can see council data**

SELECT set_config(\'app.council_id\', \'\<\<council_uuid\>\>\', true);

SELECT set_config(\'app.principal_type\', \'staff\', true);

SELECT set_config(\'app.user_id\', \'\<\<staff_user_uuid\>\>\', true);

SELECT count(\*) FROM service_requests; \-- should show council-only

**Test 3 --- Citizen sees only own requests**

SELECT set_config(\'app.council_id\', \'\<\<council_uuid\>\>\', true);

SELECT set_config(\'app.principal_type\', \'citizen\', true);

SELECT set_config(\'app.principal_id\', \'\<\<citizen_uuid\>\>\', true);

SELECT \* FROM service_requests; \-- only rows where
requester_type=\'citizen\' and requester_id=citizen_uuid

SELECT \* FROM invoices; \-- only invoices for accounts owned by that
citizen

**Test 4 --- Cross-council data isolation**

Set app.council_id to a different council and confirm you cannot see the
first council's rows.

**Notes on "Platform Admin" cross-council access**

RLS here is council-isolating by design. For true platform admin
cross-council access you have two safe patterns:

1.  **Separate DB role** that bypasses RLS only for platform admin
    services (controlled, audited), or

2.  **Use a dedicated admin schema/view** with strict server-side
    approval logic.

If you want, I can add the **cleanest open-source pattern** for platform
admin with audited access.
