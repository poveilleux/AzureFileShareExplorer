/**
 * Downloads a file using an anchor element.
 * 
 * @param url The url at which to download the file.
 */
export function downloadFile(url: string, fileName: string): void {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
}
