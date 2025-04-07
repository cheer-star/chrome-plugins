import os
import json

from urllib.parse import unquote

"""
此处为了跨平台使用 curl
"""

OUTPUT_DIR = "target"
DATA_JSON_PATH = "../data/project_data (4).json"


def is_target_exist():
    """
    判断 `target` 目录是否存在且是否为空
    """
    if os.path.exists(OUTPUT_DIR):
        if len(os.listdir(OUTPUT_DIR)) == 0:
            return True
        else:
            return False
    else:
        os.makedirs(OUTPUT_DIR)
        return True


def download_file():
    with open(DATA_JSON_PATH, "r", encoding="utf-8") as f:
        url_map = json.load(f)
        for key in url_map:
            # 1. 创建文件夹
            if not os.path.exists(OUTPUT_DIR + "/" + key):
                os.makedirs(OUTPUT_DIR + "/" + key)

            # 2. 下载文件
            urls = url_map[key]
            for index in range(len(urls)):
                url = urls[index]
                if url == "":
                    t = open(
                        os.path.join(OUTPUT_DIR, key, f"第{index}个文件不可被下载.txt"),
                        "w+",
                    )
                    t.close()
                    continue

                # 2.1 获取文件名
                decode_url = unquote(url)
                file_name = decode_url.split("/")[-1]

                # 2.2 拼接文件路径
                file_path = os.path.join(OUTPUT_DIR, key, file_name)

                # 2.3 直接下载
                os.system(f'curl -o "{file_path}" "{url}"')


if __name__ == "__main__":
    # 1. 判断 `target` 目录是否存在且是否为空
    if is_target_exist():
        # 2. 下载文件
        download_file()
    else:
        print("target 目录已存在且不为空，请手动清空或删除该目录")