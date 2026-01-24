import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import { format } from 'date-fns';

export interface PdfData {
    licenceNo: string;
    councilName: string;
    tradingName: string;
    serviceName: string;
    premisesAddress: string;
    issueDate: Date;
    expiryDate: Date;
    licenceId: string;
    verifyUrl: string;
}

export class PdfService {
    static async generateLicencePdf(data: PdfData): Promise<Buffer> {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595.28, 841.89]); // A4
        const { width, height } = page.getSize();

        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Header
        page.drawText(data.councilName, {
            x: 50,
            y: height - 100,
            size: 24,
            font: fontBold,
            color: rgb(0.1, 0.14, 0.49), // NCDC Blueish
        });

        page.drawText('TRADING LICENSE', {
            x: 50,
            y: height - 140,
            size: 32,
            font: fontBold,
            color: rgb(0.83, 0.69, 0.22), // NCDC Gold
        });

        // Body
        const drawLabelValue = (label: string, value: string, y: number) => {
            page.drawText(label, { x: 50, y, size: 10, font: fontRegular, color: rgb(0.5, 0.5, 0.5) });
            page.drawText(value, { x: 50, y: y - 20, size: 16, font: fontBold });
        };

        drawLabelValue('CERTIFIED HOLDER', data.tradingName, height - 250);
        drawLabelValue('LICENSE TYPE', data.serviceName, height - 310);
        drawLabelValue('PREMISES LOCATION', data.premisesAddress, height - 370);

        // Details Grid
        page.drawText('LICENSE NUMBER', { x: 50, y: height - 450, size: 10, font: fontRegular });
        page.drawText(data.licenceNo, { x: 50, y: height - 470, size: 18, font: fontBold });

        page.drawText('ISSUE DATE', { x: 300, y: height - 450, size: 10, font: fontRegular });
        page.drawText(format(data.issueDate, 'dd MMMM yyyy'), { x: 300, y: height - 470, size: 14, font: fontBold });

        page.drawText('VALID UNTIL', { x: 300, y: height - 510, size: 10, font: fontRegular });
        page.drawText(format(data.expiryDate, 'dd MMMM yyyy'), { x: 300, y: height - 530, size: 14, font: fontBold });

        // QR Code
        const qrBuffer = await QRCode.toBuffer(data.verifyUrl, {
            errorCorrectionLevel: 'H',
            margin: 1,
            width: 100,
        });
        const qrImage = await pdfDoc.embedPng(qrBuffer);
        page.drawImage(qrImage, {
            x: width - 150,
            y: 50,
            width: 100,
            height: 100,
        });

        // Footer
        page.drawText(`Digital ID: ${data.licenceId}`, {
            x: 50,
            y: 30,
            size: 8,
            font: fontRegular,
            color: rgb(0.7, 0.7, 0.7),
        });

        const pdfBytes = await pdfDoc.save();
        return Buffer.from(pdfBytes);
    }
}
