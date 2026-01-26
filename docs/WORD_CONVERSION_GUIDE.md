# Word Conversion Scripts & Guide

**Tools and scripts for converting markdown documentation to Microsoft Word format**

## Quick Conversion Commands

### Using Pandoc (Recommended)

**Install Pandoc:**

Windows (PowerShell as Admin):
```powershell
choco install pandoc
```

macOS:
```bash
brew install pandoc
```

Linux:
```bash
sudo apt install pandoc
```

**Convert Documents:**

```bash
# Navigate to docs folder
cd c:\lgis\docs

# User Guide (combine all parts)
pandoc USER_GUIDE_COMPLETE.md USER_GUIDE_PART2.md USER_GUIDE_PART3.md \
  -o "LGIS User Guide v1.0.docx" \
  --toc \
  --toc-depth=3 \
  --number-sections \
  --highlight-style=tango \
  --reference-doc=word-template.docx

# Technical Guide
pandoc TECHNICAL_GUIDE.md TECHNICAL_GUIDE_PART2.md \
  -o "LGIS Technical Guide v1.0.docx" \
  --toc \
  --toc-depth=3 \
  --number-sections \
  --highlight-style=tango \
  --reference-doc=word-template.docx

# Deployment Manual
pandoc DEPLOYMENT_MANUAL.md \
  -o "LGIS Deployment Manual v1.0.docx" \
  --toc \
  --toc-depth=3 \
  --number-sections \
  --highlight-style=tango \
  --reference-doc=word-template.docx
```

### Pandoc Options Explained

- `--toc`: Generate table of contents
- `--toc-depth=3`: Include headings up to level 3
- `--number-sections`: Number all sections
- `--highlight-style=tango`: Code syntax highlighting style
- `--reference-doc`: Use custom Word template for styling

---

## Creating Word Template

### Step 1: Create Base Template

1. Open Microsoft Word
2. Create new document
3. Save as `word-template.docx` in `c:\lgis\docs\`

### Step 2: Define Styles

**Heading Styles:**
- Heading 1: Arial Bold, 18pt, Blue
- Heading 2: Arial Bold, 14pt, Dark Blue
- Heading 3: Arial Bold, 12pt, Black
- Heading 4: Arial, 11pt, Black

**Body Styles:**
- Normal: Calibri, 11pt, Black, Line spacing 1.15
- Code: Consolas, 10pt, Gray background
- Quote: Arial, 10pt, Italic, Left border

**Table Style:**
- Header: Blue background, white text, bold
- Rows: Alternating gray/white

### Step 3: Page Setup

- Margins: 1" all around
- Header: Document title + logo
- Footer: Page number, date
- Page size: A4 or Letter

---

## PowerShell Conversion Script

Save as `convert-docs.ps1`:

```powershell
# LGIS Documentation Conversion Script
# Converts markdown files to Word documents using Pandoc

$DocsPath = "c:\lgis\docs"
$OutputPath = "c:\lgis\docs\output"

# Create output directory
New-Item -ItemType Directory -Force -Path $OutputPath

Write-Host "Converting LGIS Documentation to Word..." -ForegroundColor Green

# User Guide
Write-Host "`nConverting User Guide..." -ForegroundColor Yellow
pandoc "$DocsPath\USER_GUIDE_COMPLETE.md" `
       "$DocsPath\USER_GUIDE_PART2.md" `
       "$DocsPath\USER_GUIDE_PART3.md" `
       -o "$OutputPath\LGIS_User_Guide_v1.0.docx" `
       --toc `
       --toc-depth=3 `
       --number-sections `
       --highlight-style=tango

# Technical Guide
Write-Host "Converting Technical Guide..." -ForegroundColor Yellow
pandoc "$DocsPath\TECHNICAL_GUIDE.md" `
       "$DocsPath\TECHNICAL_GUIDE_PART2.md" `
       -o "$OutputPath\LGIS_Technical_Guide_v1.0.docx" `
       --toc `
       --toc-depth=3 `
       --number-sections `
       --highlight-style=tango

# Deployment Manual
Write-Host "Converting Deployment Manual..." -ForegroundColor Yellow
pandoc "$DocsPath\DEPLOYMENT_MANUAL.md" `
       -o "$OutputPath\LGIS_Deployment_Manual_v1.0.docx" `
       --toc `
       --toc-depth=3 `
       --number-sections `
       --highlight-style=tango

Write-Host "`nConversion Complete!" -ForegroundColor Green
Write-Host "Output files in: $OutputPath" -ForegroundColor Cyan

# Open output folder
Invoke-Item $OutputPath
```

**Run Script:**
```powershell
.\convert-docs.ps1
```

---

## Node.js Conversion Script

Save as `convert-docs.js`:

```javascript
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const docsPath = path.join(__dirname, 'docs');
const outputPath = path.join(docsPath, 'output');

// Ensure output directory exists
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
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
        const cmd = `pandoc ${doc.input.join(' ')} -o "${doc.output}" --toc --toc-depth=3 --number-sections --highlight-style=tango`;
        
        console.log(`Converting ${doc.name}...`);
        
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                console.log(`✓ ${doc.name} converted`);
                resolve();
            }
        });
    });
}

async function convertAll() {
    console.log('LGIS Documentation Conversion\n');
    
    for (const doc of conversions) {
        try {
            await convert(doc);
        } catch (error) {
            console.error(`✗ Error converting ${doc.name}:`, error.message);
        }
    }
    
    console.log(`\n✓ Conversion complete!\nOutput: ${outputPath}`);
}

convertAll();
```

**Run Script:**
```bash
node convert-docs.js
```

---

## Alternative: Online Conversion

If Pandoc is not available:

### Method 1: Markdown to Word Online

1. Visit https://www.markdowntoword.com/
2. Upload markdown file
3. Download .docx
4. Repeat for each part
5. Manually combine in Word

### Method 2: Copy-Paste Method

1. Open markdown file in VS Code
2. Install "Markdown Preview Enhanced" extension
3. Right-click preview → Export as HTML
4. Open HTML in Word
5. Save as .docx

---

## Post-Conversion Formatting

After conversion to Word, apply these enhancements:

### 1. Cover Page

Create professional cover page with:
- Document title
- Organization logo
- Version number
- Date
- Confidentiality notice

### 2. Table of Contents

- Update TOC: Right-click → Update Field
- Set TOC levels (show 3 levels)
- Format page numbers

### 3. Headers & Footers

- Header: Document name + logo (right-aligned)
- Footer: "Page X of Y" + "Confidential" + Date

### 4. Code Formatting

- Find all code blocks
- Apply Consolas font
- Add light gray background
- Add border

### 5. Tables

- Apply professional table style
- Header row: Bold, colored background
- Alternating row colors
- Auto-fit columns

### 6. Page Breaks

- Add page breaks before major sections
- Ensure headings don't orphan

### 7. Cross-References

- Update all cross-references
- Verify links work (if converting to PDF later)

### 8. Spelling & Grammar

- Run Word spell check
- Fix any false positives
- Adjust technical terms dictionary

---

## PDF Generation

### From Word

```powershell
# PowerShell script to convert Word to PDF
$word = New-Object -ComObject Word.Application
$word.Visible = $false

$docxPath = "C:\lgis\docs\output\LGIS_User_Guide_v1.0.docx"
$pdfPath = "C:\lgis\docs\output\LGIS_User_Guide_v1.0.pdf"

$doc = $word.Documents.Open($docxPath)
$doc.SaveAs([ref]$pdfPath, [ref]17) # 17 = wdFormatPDF
$doc.Close()
$word.Quit()

Write-Host "PDF created: $pdfPath"
```

### Using Pandoc

```bash
# Direct markdown to PDF
pandoc USER_GUIDE_COMPLETE.md USER_GUIDE_PART2.md USER_GUIDE_PART3.md \
  -o "LGIS_User_Guide.pdf" \
  --toc \
  --number-sections \
  --pdf-engine=xelatex
```

---

## Batch Processing

Save as `batch-convert.bat`:

```batch
@echo off
echo LGIS Documentation Batch Conversion
echo.

cd /d "c:\lgis\docs"

echo Converting User Guide...
pandoc USER_GUIDE_COMPLETE.md USER_GUIDE_PART2.md USER_GUIDE_PART3.md ^
  -o "output\LGIS_User_Guide_v1.0.docx" ^
  --toc --number-sections

echo Converting Technical Guide...
pandoc TECHNICAL_GUIDE.md TECHNICAL_GUIDE_PART2.md ^
  -o "output\LGIS_Technical_Guide_v1.0.docx" ^
  --toc --number-sections

echo Converting Deployment Manual...
pandoc DEPLOYMENT_MANUAL.md ^
  -o "output\LGIS_Deployment_Manual_v1.0.docx" ^
  --toc --number-sections

echo.
echo Conversion complete!
explorer output

pause
```

---

## Quality Checklist

After conversion, verify:

- [ ] Table of contents generated correctly
- [ ] All headings numbered properly
- [ ] Code blocks formatted with monospace font
- [ ] Tables display correctly
- [ ] Images/screenshots embedded
- [ ] Page breaks in appropriate places
- [ ] No orphaned headings
- [ ] Cross-references working
- [ ] Spelling checked
- [ ] Headers/footers on all pages
- [ ] Page numbers correct
- [ ] Cover page added
- [ ] Final PDF generated

---

## Distribution

### Package for Distribution

```
LGIS_Documentation_v1.0/
├── LGIS_User_Guide_v1.0.docx
├── LGIS_User_Guide_v1.0.pdf
├── LGIS_Technical_Guide_v1.0.docx
├── LGIS_Technical_Guide_v1.0.pdf
├── LGIS_Deployment_Manual_v1.0.docx
├── LGIS_Deployment_Manual_v1.0.pdf
└── README.txt
```

### Create ZIP Archive

```powershell
Compress-Archive -Path "c:\lgis\docs\output\*" `
                 -DestinationPath "c:\lgis\LGIS_Documentation_v1.0.zip"
```

---

*Use these scripts to efficiently convert all documentation to professional Word and PDF formats.*
