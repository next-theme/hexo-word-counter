import os
import sys
import time

def run_command_and_measure_time():
    os.system("npx hexo clean > /dev/null 2>&1")
    start_time = time.time()
    os.system("npx hexo g > /dev/null 2>&1")
    return time.time() - start_time


if __name__ == "__main__":
    name = sys.argv[1]
    with open("../report.csv", "a") as f:
        results = []
        for i in range(10):
            res = run_command_and_measure_time()
            results.append(res)
            f.write(name + "," + str(res) + "\n")
            f.flush()
        f.write(name + "-avg," + str(sum(results) / len(results)) + "\n")
