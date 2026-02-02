# Changelog

All notable changes to the LGIS (Local Government Information System) will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- iOS mobile application
- Payment gateway integration (BMobile, Digicel)
- Advanced reporting dashboard
- Multi-language support (Tok Pisin)

---

## [1.1.0] - 2026-02-03

### Added
- **Business Details Page**: View comprehensive business information with tabs
- **Edit Business Dialog**: Tabbed interface for editing all business fields
- **View on Map**: Navigate from business details to GIS map location
- **Manual Payment Recording**: Record cash, cheque, bank transfer payments
- **PATCH API Endpoint**: Secure business update endpoint with authorization
- **Comprehensive SOP Document**: Standard Operating Procedures manual

### Changed
- Improved business edit form with organized tabs (Business Info, Contact, Location)
- Enhanced GIS page with reactive URL parameter parsing
- Updated API endpoint consistency (`/api/v1/businesses/:id`)

### Fixed
- GIS URL parameter parsing now uses `useEffect` for proper reactivity
- Missing `useEffect` import in GIS page
- Business edit authorization (owner or admin/staff only)

### Security
- Added authentication to business update endpoint
- Implemented authorization checks for business edits
- Added audit logging for business updates

---

## [1.0.0] - 2026-01-15

### Added
- **Core Platform**
  - Multi-tenant architecture supporting multiple councils
  - Role-Based Access Control (RBAC) with 6 user roles
  - Session-based authentication with Passport.js
  
- **Registry Module**
  - Citizen registration and management
  - Business registration with verification workflow
  - Document upload and management
  
- **Licensing Module**
  - License type configuration
  - License application workflow
  - Document review and approval
  - Digital license certificate with QR code
  - License renewal functionality
  
- **Inspection Module**
  - Inspection scheduling
  - Mobile inspection app
  - GPS location capture
  - Photo evidence capture
  - Digital signature collection
  
- **Revenue Module**
  - Invoice generation
  - Payment tracking
  - Receipt generation
  - Revenue dashboard
  
- **GIS Module**
  - Interactive map visualization
  - Business location markers
  - Layer controls
  - Search and filter
  
- **Administration**
  - User management
  - License type configuration
  - Tenant configuration
  - Theme customization
  
- **Mobile Application**
  - Android app via Capacitor
  - Offline data sync
  - Camera integration
  - GPS integration

### Technical
- React 19 with TypeScript frontend
- Express.js backend with TypeScript
- PostgreSQL database with Drizzle ORM
- Tailwind CSS v4 styling
- Shadcn/UI component library
- Docker containerization

---

## Version Numbering

LGIS uses Semantic Versioning (SemVer):

- **MAJOR** version (X.0.0): Incompatible API changes, major UI overhauls
- **MINOR** version (0.X.0): New features, backward-compatible enhancements
- **PATCH** version (0.0.X): Bug fixes, security patches, minor improvements

### Version Examples
- `1.0.0` → Initial stable release
- `1.1.0` → Added new features (Business Details, Manual Payments)
- `1.1.1` → Bug fixes only
- `2.0.0` → Major platform upgrade

---

## Release Process

1. Update version in `package.json`
2. Update version in `shared/version.ts`
3. Update this CHANGELOG.md
4. Create git tag: `git tag -a v1.1.0 -m "Release v1.1.0"`
5. Push tag: `git push origin v1.1.0`
6. Deploy to production

---

[Unreleased]: https://github.com/Vumbi2018/lgis/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/Vumbi2018/lgis/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/Vumbi2018/lgis/releases/tag/v1.0.0
