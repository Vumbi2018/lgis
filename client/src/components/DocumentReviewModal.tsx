import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Loader2, CheckCircle, XCircle, FileIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DocumentReviewModalProps {
    document: any;
    isOpen: boolean;
    onClose: () => void;
    onReview: (status: 'approved' | 'rejected', reason?: string) => Promise<void>;
}

export function DocumentReviewModal({ document, isOpen, onClose, onReview }: DocumentReviewModalProps) {
    const [rejectionReason, setRejectionReason] = useState("");
    const [isRejecting, setIsRejecting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAction = async (status: 'approved' | 'rejected') => {
        if (status === 'rejected' && !isRejecting) {
            setIsRejecting(true);
            return;
        }

        if (status === 'rejected' && !rejectionReason.trim()) {
            return; // Validate reason
        }

        setIsSubmitting(true);
        try {
            await onReview(status, status === 'rejected' ? rejectionReason : undefined);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
            setIsRejecting(false);
            setRejectionReason("");
        }
    };

    if (!document) return null;

    const fileUrl = document.filePath ? `/${document.filePath}` : '';
    const isImage = document.mimeType?.startsWith('image/');
    const isPdf = document.mimeType === 'application/pdf';

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Review Document: {document.fileName}</DialogTitle>
                    <DialogDescription>
                        Review the document content and approve or reject it.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-auto bg-muted/20 p-4 rounded-md min-h-[400px] flex items-center justify-center">
                    {isImage ? (
                        <img src={fileUrl} alt={document.fileName} className="max-w-full max-h-[60vh] object-contain" />
                    ) : isPdf ? (
                        <iframe src={fileUrl} className="w-full h-[60vh]" title={document.fileName} />
                    ) : (
                        <div className="text-center">
                            <FileIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                            <p>Preview not available for this file type.</p>
                            <Button variant="outline" asChild className="mt-4">
                                <a href={fileUrl} target="_blank" rel="noopener noreferrer">Download / Open Externally</a>
                            </Button>
                        </div>
                    )}
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                    {isRejecting ? (
                        <div className="w-full space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="reason">Rejection Reason</Label>
                                <Textarea
                                    id="reason"
                                    placeholder="Please allow explain why this document is being rejected..."
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 justify-end">
                                <Button variant="ghost" onClick={() => setIsRejecting(false)} disabled={isSubmitting}>Cancel</Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleAction('rejected')}
                                    disabled={isSubmitting || !rejectionReason.trim()}
                                >
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Confirm Rejection
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex w-full justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                                Current Status: <span className="font-semibold capitalize">{document.status || 'Pending'}</span>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Close</Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleAction('rejected')}
                                    disabled={isSubmitting || document.status === 'approved'}
                                >
                                    Reject
                                </Button>
                                <Button
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleAction('approved')}
                                    disabled={isSubmitting || document.status === 'approved'}
                                >
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Approve
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
