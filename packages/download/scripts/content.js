// // iframe FIXED
// const node_list = [
//     '#MainLeft > ul > li.level_two > a',

//     '#ProjectGroup_hlGroupName_3',

//     // 项目清单 0 - 55 
//     '#rptProject_lbtnProjectName_',

//     // 查看附件
//     '#form1 > div:nth-child(20) > ul > li:nth-child(3)',


//     // 附件列表 0 - null(max)
//     // 读取onclick的值
//     '#rptAttachment_lbtnDownLoadFile_',
// ];

// const index = Number(localStorage.getItem('index') ?? 0);

// localStorage.setItem('project_name', JSON.stringify([]))

// const project_name = (index, name) => {
//     const projectJson = JSON.parse(localStorage.getItem('project_name'));
//     projectJson[index] = (name);

//     localStorage.setItem('project_name', JSON.stringify(projectJson))
// }

// // 有哪个执行哪个

// const projectListElement = document.querySelector(node_list[0]);
// if (projectListElement) {
//     projectListElement?.click();
// }

// let iframeElement = document.getElementById("MainRight");
// if (iframeElement) {
//     iframeElement.onload = function () {
//         console.log("main right iframe loaded");

//         if (!iframeElement)
//             return


//         let iframeDocument = iframeElement.contentDocument || iframeElement.contentWindow.document;

//         const projectType = iframeDocument.querySelector(node_list[1]);
//         if (projectType) {
//             projectType.click();
//         }


//         const projectNameElement = iframeDocument.querySelector(node_list[2] + index);

//         // 获取项目名称
//         let projectName = '';
//         if (projectNameElement) {
//             projectName = projectNameElement.innerText;
//             project_name(projectName)
//             projectNameElement.click();
//         }


//         const attachmentSelector = '#form1 > div:nth-child(20) > ul > li:nth-child(3)';
//         iframeDocument.querySelector(attachmentSelector).click();

//         let oiframeElement = iframeDocument.getElementById("ProjectDetailMain");
//         console.log(oiframeElement)
//         if (!oiframeElement)
//             return
//         oiframeElement.onload = () => {
//             console.log("detail iframe loaded");

//             let oiframeDocument = oiframeElement.contentDocument || oiframeElement.contentWindow.document;

//             setTimeout(() => {
//                 const attachmentSelector = node_list[4];
//                 const fileList = []
//                 for (let i = 0; i < 100; i++) {
//                     const attachmentElement = oiframeDocument.querySelector(attachmentSelector + i);
//                     if (attachmentElement) {
//                         const onclickValue = attachmentElement.getAttribute('onclick');
//                         console.log(onclickValue);

//                         const hIndex = onclickValue.indexOf('file=') + 5;
//                         const eIndex = onclickValue.indexOf('.pdf') + 4;
//                         const fileUrl = onclickValue.slice(hIndex, eIndex);

//                         fileList.push(fileUrl);
//                     } else {
//                         break;
//                     }
//                 }

//                 localStorage.setItem(index, JSON.stringify(fileList));
//                 localStorage.setItem('index', index + 1)
//             }, 1000)
//         }
//     }
// }

const project_name = JSON.parse(localStorage.getItem('project_name'));
const a = []
for (let i = 0; i < 56; i++) {
    const urls = JSON.parse(localStorage.getItem(i));
    if (urls) {
        a[i] = [];
        for (let j = 0; j < urls.length; j++) {
            const url = unescape(urls[j]);
            a[i].push(url);
        }
    }
}

console.log(JSON.stringify(a, null, 2));