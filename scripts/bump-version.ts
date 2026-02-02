/**
 * Version Bump Script for LGIS
 * 
 * Usage:
 *   npx tsx scripts/bump-version.ts [major|minor|patch]
 * 
 * Examples:
 *   npx tsx scripts/bump-version.ts patch   # 1.1.0 -> 1.1.1
 *   npx tsx scripts/bump-version.ts minor   # 1.1.0 -> 1.2.0
 *   npx tsx scripts/bump-version.ts major   # 1.1.0 -> 2.0.0
 */

import * as fs from 'fs';
import * as path from 'path';

const PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');
const VERSION_TS_PATH = path.join(__dirname, '..', 'shared', 'version.ts');

type BumpType = 'major' | 'minor' | 'patch';

function getCurrentVersion(): { major: number; minor: number; patch: number } {
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
    const [major, minor, patch] = packageJson.version.split('.').map(Number);
    return { major, minor, patch };
}

function bumpVersion(
    current: { major: number; minor: number; patch: number },
    type: BumpType
): { major: number; minor: number; patch: number } {
    switch (type) {
        case 'major':
            return { major: current.major + 1, minor: 0, patch: 0 };
        case 'minor':
            return { major: current.major, minor: current.minor + 1, patch: 0 };
        case 'patch':
            return { major: current.major, minor: current.minor, patch: current.patch + 1 };
    }
}

function updatePackageJson(newVersion: string): void {
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
    packageJson.version = newVersion;
    fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`✓ Updated package.json to ${newVersion}`);
}

function updateVersionTs(version: { major: number; minor: number; patch: number }): void {
    let content = fs.readFileSync(VERSION_TS_PATH, 'utf-8');

    // Update version numbers
    content = content.replace(/major: \d+/, `major: ${version.major}`);
    content = content.replace(/minor: \d+/, `minor: ${version.minor}`);
    content = content.replace(/patch: \d+/, `patch: ${version.patch}`);

    // Update release date
    const today = new Date().toISOString().split('T')[0];
    content = content.replace(/releaseDate: '[^']+'/, `releaseDate: '${today}'`);

    fs.writeFileSync(VERSION_TS_PATH, content);
    console.log(`✓ Updated shared/version.ts to ${version.major}.${version.minor}.${version.patch}`);
}

function main(): void {
    const args = process.argv.slice(2);
    const bumpType = args[0] as BumpType;

    if (!['major', 'minor', 'patch'].includes(bumpType)) {
        console.error('Usage: npx tsx scripts/bump-version.ts [major|minor|patch]');
        process.exit(1);
    }

    const current = getCurrentVersion();
    const newVersion = bumpVersion(current, bumpType);
    const versionString = `${newVersion.major}.${newVersion.minor}.${newVersion.patch}`;

    console.log(`\nBumping version: ${current.major}.${current.minor}.${current.patch} → ${versionString}\n`);

    updatePackageJson(versionString);
    updateVersionTs(newVersion);

    console.log(`\n✓ Version bumped to ${versionString}`);
    console.log('\nNext steps:');
    console.log('  1. Update CHANGELOG.md with new version details');
    console.log(`  2. git add . && git commit -m "chore: bump version to ${versionString}"`);
    console.log(`  3. git tag -a v${versionString} -m "Release v${versionString}"`);
    console.log('  4. git push && git push --tags');
}

main();
