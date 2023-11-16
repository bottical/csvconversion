function handleFiles(files) {
    if (files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        const processedContent = processCsv(content);
        createDownloadLink(processedContent);
    };

    reader.readAsText(file, 'UTF-8');
}

function processCsv(csvContent) {
    const rows = csvContent.split('\n');
    const headers = rows[0].split(',');

    // 日本語のヘッダーを英語のヘッダーに置き換える
    // 例: '名前,年齢,住所' を 'Name,Age,Address' に置き換える
    const newHeaders = ['Name', 'Age', 'Address']; // 新しいヘッダー

    // ヘッダー以外の行はそのまま使用する
    const newData = rows.map((row, index) => {
        return index === 0 ? newHeaders.join(',') : row;
    });

    return newData.join('\n');
}

function createDownloadLink(csvContent) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.style.display = 'block';
    downloadLink.href = url;
    downloadLink.download = 'processed.csv';
}
