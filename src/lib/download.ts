export const download = (filename: string, content: any, type: 'text/plain' = 'text/plain') => {
    const a = document.createElement('a');
    const file = new Blob([content], { type: type || 'text/html' });
    a.href = URL.createObjectURL(file);
    a.download = filename;
    document.body.append(a);
    a.click();
    // swal.fire(
    //     'Download success',
    //     'You can use browser default bookmark manager to import this downloaded file',
    //     'success'
    // );
}