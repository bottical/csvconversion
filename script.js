function handleFiles(files) {
    if (files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        const processedContent = processCsv(content);
        createDownloadLink(processedContent);
    };

    reader.readAsText(file);
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
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.style.display = 'block';
    downloadButton.href = url;
    downloadButton.download = 'processed.csv';
}

function downloadProcessedFile() {
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.style.display = 'none';
}
