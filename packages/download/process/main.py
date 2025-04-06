import wget

import json

from env import urls

import os

# os.system()

for i in range(10, len(urls)):
    for j in range(len(urls[i])):
        os.system(f"wget {urls[i][j]} -P ./{i}")
        if urls[i][j] == "":
            if not os.path.exists(f'./{i}'):
                os.mkdir(f'./{i}')
            file = open(f'./{i}/第{j}个文件未被下载.txt', 'w+')
            file.close()
        print(f"Downloaded: {i}")