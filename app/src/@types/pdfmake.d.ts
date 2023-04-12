declare module 'pdfmake/build/vfs_fonts' {
    let pdfMake: {
        vfs: any;
        [name: string]: any;
    };
}

declare module 'pdfmake/build/pdfmake' {
    let vfs: TFontFamily;
    let fonts: { [name: string]: TFontFamilyTypes };
    function createPdf(documentDefinitions: TDocumentDefinitions): TCreatedPdf;
}