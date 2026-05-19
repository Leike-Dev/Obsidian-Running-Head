import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

// Automatically syncs version across all project files.
// Triggered via: npm version <major|minor|patch>
// ============================================================================

const targetVersion = process.env.npm_package_version;

if (!targetVersion) {
    console.error("❌ No version found. Run this via 'npm version <major|minor|patch>'.");
    process.exit(1);
}

console.log(`\n🔄 Bumping version to ${targetVersion}...\n`);

// --- manifest.json ---
const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const { minAppVersion } = manifest;
manifest.version = targetVersion;
writeFileSync("manifest.json", JSON.stringify(manifest, null, "\t"));
console.log(`  ✅ manifest.json → ${targetVersion}`);

// --- versions.json ---
const versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[targetVersion] = minAppVersion;
writeFileSync("versions.json", JSON.stringify(versions, null, "\t"));
console.log(`  ✅ versions.json → ${targetVersion}: ${minAppVersion}`);

// --- package-lock.json ---
try {
    execSync("npm install --package-lock-only --ignore-scripts", { stdio: "ignore" });
    console.log(`  ✅ package-lock.json → ${targetVersion}`);
} catch {
    console.warn("  ⚠️  Could not update package-lock.json automatically.");
}

// --- README badges ---
const badgePattern = /version-[\d.]+(-\w+)?-lightgreen/g;
const badgeReplacement = `version-${targetVersion}-lightgreen`;

const readmes = ["README.md", "docs/README_pt.md", "docs/README_es.md", "docs/README_fr.md", "docs/README_zh-CN.md"];
for (const file of readmes) {
    try {
        const content = readFileSync(file, "utf8");
        const updated = content.replace(badgePattern, badgeReplacement);
        if (content !== updated) {
            writeFileSync(file, updated);
            console.log(`  ✅ ${file} → badge ${targetVersion}`);
        } else {
            console.log(`  ⏭️  ${file} → badge already up to date`);
        }
    } catch {
        // file doesn't exist or can't be read, ignore
    }
}

console.log(`\n🎉 Version bump complete!`);
