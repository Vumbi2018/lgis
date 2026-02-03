/**
 * LGIS Application Version
 * 
 * This file contains the version information for the LGIS application.
 * Update this file when releasing new versions.
 * 
 * Follow Semantic Versioning (SemVer): MAJOR.MINOR.PATCH
 * - MAJOR: Incompatible API changes
 * - MINOR: New features (backward-compatible)
 * - PATCH: Bug fixes
 */

export const APP_VERSION = {
    /** Major version number */
    major: 1,
    /** Minor version number */
    minor: 2,
    /** Patch version number */
    patch: 0,
    /** Pre-release label (e.g., 'alpha', 'beta', 'rc.1') */
    preRelease: '',
    /** Build metadata (e.g., commit hash) */
    buildMeta: '',
    /** Release date */
    releaseDate: '2026-02-03',
    /** Release name/codename */
    releaseName: 'Business Edition',
};

/**
 * Get the full version string
 * @returns Version string like "1.1.0" or "1.1.0-beta.1"
 */
export function getVersionString(): string {
    const { major, minor, patch, preRelease } = APP_VERSION;
    let version = `${major}.${minor}.${patch}`;
    if (preRelease) {
        version += `-${preRelease}`;
    }
    return version;
}

/**
 * Get the display version string with 'v' prefix
 * @returns Display version like "v1.1.0"
 */
export function getDisplayVersion(): string {
    return `v${getVersionString()}`;
}

/**
 * Get full version info for about page/dialogs
 */
export function getVersionInfo() {
    return {
        version: getVersionString(),
        displayVersion: getDisplayVersion(),
        releaseDate: APP_VERSION.releaseDate,
        releaseName: APP_VERSION.releaseName,
        fullVersion: APP_VERSION.buildMeta
            ? `${getVersionString()}+${APP_VERSION.buildMeta}`
            : getVersionString(),
    };
}

/**
 * Check if current version is newer than a given version
 * @param compareVersion Version string to compare (e.g., "1.0.0")
 */
export function isNewerThan(compareVersion: string): boolean {
    const [compMajor, compMinor, compPatch] = compareVersion.split('.').map(Number);
    const { major, minor, patch } = APP_VERSION;

    if (major !== compMajor) return major > compMajor;
    if (minor !== compMinor) return minor > compMinor;
    return patch > compPatch;
}

// Export default version string for convenience
export default getDisplayVersion();
