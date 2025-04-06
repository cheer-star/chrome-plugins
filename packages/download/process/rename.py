from env import project_name

import os

import time

for i in range(len(project_name)):
    os.rename(f'./pdfs/{i}', f"./pdfs/{project_name[i]}")
    time.sleep(1)
