function download() {
    // 将信息发送到后台脚本
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'download' }, function (response) {
            if (callback) callback(response);
        });
    });

}

function openUrl() {
    // 将信息发送到后台脚本
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "reload" }, function (response) {
            if (callback) callback(response);
        });
    });

}

document.getElementById("download").addEventListener("click", function () {
    download();
});

document.getElementById("reload").addEventListener("click", function () {
    openUrl();
});