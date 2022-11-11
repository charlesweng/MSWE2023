from asyncio import as_completed
import re, sys, collections, os, multiprocessing, concurrent.futures

maxworkers = multiprocessing.cpu_count()
stopwords = set(open('stop_words').read().split(','))
# words = re.findall('\w{3,}', open(sys.argv[1]).read().lower())
# counts = collections.Counter(w for w in words if w not in stopwords)

# for (w, c) in counts.most_common(25):
#     print(w, '-', c)

class Counter:
    def __init__(self, taskName):
        self.taskName = taskName
        self.frequencies = collections.Counter()
    
    def countWords(self, filename):
        print(f'start reading {self.taskName}')
        with open(filename, 'r') as f:
            words = re.findall('\w{3,}', f.read().lower())
            self.frequencies += collections.Counter(w for w in words if w not in stopwords)
        print(f'end reading {self.taskName}')
        return self
    
    def merge(self, other):
        for k, v in other.frequencies.items():
            self.frequencies[k] = self.frequencies.get(k, 0) + v

def main():
    mainCounter = Counter("allfiles")
    future_to_counter = {}
    with concurrent.futures.ProcessPoolExecutor(max_workers=maxworkers) as executor:
        for file in os.listdir("."):
            if file.endswith(".txt"):
                c = Counter(file)
                future_to_counter[executor.submit(c.countWords, file)] = c
    for future in concurrent.futures.as_completed(future_to_counter):
        c = future_to_counter[future]
        try:
            data = future.result()
            mainCounter.merge(data)
        except Exception as exc:
            print(f'{c.taskName} generated an exception: {exc}')
    print("=======================Top 40 Most Common Words===========================")
    for (w, c) in collections.Counter(mainCounter.frequencies).most_common(42):
        print(w, '-', c)

if __name__ == "__main__":
    main()