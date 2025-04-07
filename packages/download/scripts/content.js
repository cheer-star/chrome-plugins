/**
 * 1. 打开网页 https://dlxh.ceppea.net/4u/Main.aspx
 * 2. 执行执行一次代码
 * 3. 刷新页面
 * 4. 直到页面中项目结束 == null
 * 5. 无项目后，下载 json 文件
 */

const node_list = {
    "HD": "#ProjectGroup_hlGroupName_7",

    "project_max": 263,

    "FJ": "#form1 > div:nth-child(20) > ul > li:nth-child(2)"
}


/**
 * 点击`项目清单`
 * @returns {boolean}
 */
function clickProjectList() {
    const elementSelector = '#MainLeft > ul > li.level_two > a';
    const projectListElement = document.querySelector(elementSelector);

    if (projectListElement) {
        projectListElement?.click();
        return true;
    }
    return false;
}


/**
 * 点击`项目组 | 变电工程组`， 这个在 `MainRight` iframe里面
 * @param {Document} document
 * @returns {boolean}
 */
function clickProjectGroup(document) {
    const elementSelector = node_list.HD;
    const projectGroupElement = document.querySelector(elementSelector);
    if (projectGroupElement) {
        projectGroupElement?.click();
        return true;
    }
    return false;
}

/**
 * 点击项目 这个在循环里面, 在 `MainRight` iframe里面
 * @param {Document} document
 * @param {number} index
 * @returns {boolean}
 */
function clickProject(document, index) {
    const elementSelector = '#rptProject_lbtnProjectName_' + index;
    const projectElement = document.querySelector(elementSelector);

    if (projectElement) {
        projectElement?.click();
        setParameter('project_name', projectElement.innerText);
        return true;
    } else {
        // 如果没有项目了， 说明已经遍历完所有项目
        if (index > node_list.project_max) {
            setParameter('index', -1);
        }
    }
    return false;
}

/**
 * 点击`查看附件`， 这个在 ` MainRight` iframe里面
 */

function clickAttachment(document) {
    const elementSelector = node_list.FJ;
    const attachmentElement = document.querySelector(elementSelector);

    if (attachmentElement) {
        attachmentElement?.click();
        return true;
    }
    return false;
}

/**
 * 读取附件下载链接, 这个在 `MainRight` -> `ProjectDetailMain` iframe里面
 * @param {Document} document
 * @returns {string[]}
 */
function getAttachmentUrls(document) {
    const elementSelector = '#rptAttachment_lbtnDownLoadFile_';
    const attachmentUrls = [];

    for (let i = 0; i < 100; i++) {
        const attachmentElement = document.querySelector(elementSelector + i);
        if (attachmentElement) {
            const onclickValue = attachmentElement.getAttribute('onclick');

            const hIndex = onclickValue.indexOf('file=') + 5;
            const eIndex = onclickValue.indexOf('.pdf') + 4;
            const fileUrl = unescape(onclickValue.slice(hIndex, eIndex));

            attachmentUrls.push(fileUrl);
        } else {
            break;
        }
    }

    return attachmentUrls;
}

function setParameter(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getParameter(key) {
    const value = localStorage.getItem(key);
    if (value) {
        return JSON.parse(value);
    }
    return null;
}

function removeParameter(key) {
    localStorage.removeItem(key);
}

/**
 * tips: 不断的执行
 */
function run() {
    const index = getParameter('index') ?? 0;
    if (index === -1) {
        console.log("没有项目了");
        return;
    }


    // 点击项目清单
    if (clickProjectList()) {
        console.log("项目清单存在");
    }

    // 获取 MainRight iframe
    const mainRightIframe = document.getElementById("MainRight");
    if (!mainRightIframe) {
        console.log("MainRight iframe不存在");
    }

    // 等待 iframe 加载完成
    mainRightIframe.onload = function () {
        console.log("main right iframe loaded");

        const mainRightDocument = mainRightIframe.contentDocument || mainRightIframe.contentWindow.document;

        // 点击项目组
        if (!clickProjectGroup(mainRightDocument)) {
            console.log("项目组不存在");
        }

        // 循环点击项目
        if (!clickProject(mainRightDocument, index)) {
            console.log("项目不存在");
        }

        // 点击查看附件
        if (!clickAttachment(mainRightDocument)) {
            console.log("查看附件不存在");
        }

        // 获取 ProjectDetailMain iframe
        const projectDetailIframe = mainRightDocument.getElementById("ProjectDetailMain");
        if (!projectDetailIframe) {
            console.log("ProjectDetailMain iframe不存在");
        }

        // 等待 iframe 加载完成
        projectDetailIframe.onload = function () {
            console.log("detail iframe loaded");
            const projectDetailDocument = projectDetailIframe.contentDocument || projectDetailIframe.contentWindow.document;

            // 获取附件下载链接
            const attachmentUrls = getAttachmentUrls(projectDetailDocument);
            console.log(attachmentUrls);

            // 由于脚本执行是重复执行，所以将数据记录在localstorage中
            setParameter('index', index + 1);
            const projectName = getParameter('project_name') ?? index;
            const data = {
                [projectName]: attachmentUrls
            }
            setParameter('project_data', {
                ...getParameter('project_data') ?? {},
                ...data
            });

            location.reload();
        };
    };
}


run();

// 监听前台发来的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("收到消息", request);
    if (request.action === "download") {
        const projectData = getParameter('project_data');

        if (projectData) {
            const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'project_data.json';
            a.click();
            URL.revokeObjectURL(url);
        } else {
            console.log("没有数据");
        }
    }

    if (request.action === "reload") {
        removeParameter('index');
        removeParameter('project_data');
        removeParameter('project_name');
        location.reload();
    }
 
    sendResponse({ status: "success" });
});
