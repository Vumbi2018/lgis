const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * LGIS Documentation Conversion Script
 * Converts markdown documentation to Word format using Pandoc
 */

const docsPath = path.join(__dirname);
const outputPath = path.join(docsPath, 'output');

// Ensure output directory exists
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
    console.log('Created output directory:', outputPath);
}

const conversions = [
    {
        name: 'User Guide',
        input: [
            'USER_GUIDE_COMPLETE.md',
            'USER_GUIDE_PART2.md',
            'USER_GUIDE_PART3.md'
        ].map(f => path.join(docsPath, f)),
        output: path.join(outputPath, 'LGIS_User_Guide_v1.0.docx')
    },
    {
        name: 'Technical Guide',
        input: [
            'TECHNICAL_GUIDE.md',
            'TECHNICAL_GUIDE_PART2.md'
        ].map(f => path.join(docsPath, f)),
        output: path.join(outputPath, 'LGIS_Technical_Guide_v1.0.docx')
    },
    {
        name: 'Deployment Manual',
        input: [path.join(docsPath, 'DEPLOYMENT_MANUAL.md')],
        output: path.join(outputPath, 'LGIS_Deployment_Manual_v1.0.docx')
    }
];

async function convert(doc) {
    return new Promise((resolve, reject) => {
        // Check if input files exist
        for (const inputFile of doc.input) {
            if (!fs.existsSync(inputFile)) {
                return reject(new Error(`Input file not found: ${inputFile}`));
            }
        }

        const cmd = `pandoc ${doc.input.map(f => `"${f}"`).join(' ')} -o "${doc.output}" --toc --toc-depth=3 --number-sections --highlight-style=tango`;

        console.log(`\n📄 Converting ${doc.name}...`);
        console.log(`   Command: ${cmd}`);

        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`   ✗ Error: ${error.message}`);
                if (stderr) console.error(`   stderr: ${stderr}`);
                reject(error);
            } else {
                console.log(`   ✓ ${doc.name} converted successfully`);
                console.log(`   Output: ${doc.output}`);
                resolve();
            }
        });
    });
}

async function convertAll() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('  LGIS Documentation Conversion to Word Format');
    console.log('═══════════════════════════════════════════════════════\n');

    // Check if Pandoc is installed
    exec('pandoc --version', (error) => {
        if (error) {
            console.error('✗ Pandoc is not installed!');
            console.error('\nPlease install Pandoc:');
            console.error('  Windows: choco install pandoc');
            console.error('  macOS:   brew install pandoc');
            console.error('  Linux:   sudo apt install pandoc');
            console.error('\nOr visit: https://pandoc.org/installing.html');
            process.exit(1);
        }
    });

    let successCount = 0;
    let errorCount = 0;

    for (const doc of conversions) {
        try {
            await convert(doc);
            successCount++;
        } catch (error) {
            console.error(`✗ Failed to convert ${doc.name}`);
            errorCount++;
        }
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log(`  Conversion Summary`);
    console.log('═══════════════════════════════════════════════════════');
    console.log(`  ✓ Successful: ${successCount}`);
    console.log(`  ✗ Failed:     ${errorCount}`);
    console.log(`  Output directory: ${outputPath}`);
    console.log('═══════════════════════════════════════════════════════\n');

    if (successCount > 0) {
        console.log('Next steps:');
        console.log('1. Open Word documents in the output folder');
        console.log('2. Add professional cover pages');
        console.log('3. Insert screenshots');
        console.log('4. Apply organization branding');
        console.log('5. Generate PDF versions\n');
    }
}

process.on('unhandledRejection', (error) => {
    console.error('\n✗ Unhandled error:', error.message);
    process.exit(1);
});

convertAll();
