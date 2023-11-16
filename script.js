function handleFiles(files) {
    if (files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const arrayBuffer = new Uint8Array(e.target.result);
        const decodedData = Encoding.convert(arrayBuffer, {
            to: 'UNICODE', // UTF-8として解釈
            from: 'SJIS' // Shift-JISとして解釈
        });

        const content = new TextDecoder('utf-8').decode(decodedData);
        const processedContent = processCsv(content);
        createDownloadLink(processedContent);
    };

    reader.readAsArrayBuffer(file);
}

function processCsv(csvContent) {
    // CSVを行に分割
    const rows = csvContent.split('\n');

    // ここでCSVの各行を処理（例: 特定の列の削除）
    const processedRows = rows.map(row => {
        const columns = row.split(',');
        return columns.filter((_, index) => index !== 1).join(','); // 2列目を削除
    });

    return processedRows.join('\n');
}

function createDownloadLink(csvContent) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.style.display = 'block';
    downloadLink.href = url;
    downloadLink.download = 'processed.csv';
}
