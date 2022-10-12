from copy import deepcopy
from random import randrange
import argparse
import re

class HashTable:

  # taken from constructor of 10.2 Hash Tables page 423
  def __init__(self, cap=11, p=109345121):
    self._table = [ [] for _ in range(cap) ]
    self._load_factor = 0.75
    self._n = 0
    self._prime = p
    self._scale = 1 + randrange(p - 1)
    self._shift = randrange(p)
  
  # taken from hash function in 10.2 Hash Tables page 423
  def hash(self, k):
    return (hash(k) * self._scale + self._shift) % self._prime % len(self._table)

  def get(self, k):
    hash_k = self.hash(k)
    for item in self._table[hash_k]:
      if item == k:
        return True
    return False

  def _insert(self, k):
    hash_k = self.hash(k)
    self._n += 1
    self._table[hash_k].append(k)

  # used separate chaining for collision resolution
  def insert(self, k):
    if self.get(k):
      return
    self._insert(k)
    if self._n > len(self._table) * self._load_factor:
      self._resize(2 * len(self._table) - 1)
  
  def _resize(self, c):
    old = self._table
    self._table = [[] for _ in range(c)]
    self._n = 0
    for i, li in enumerate(old):
      for j, item in enumerate(li):
        self._insert(item)
  
  def size(self):
    return self._n
  
  def print_hash_list(self):
    print(self._table)

def main():
  parser = argparse.ArgumentParser(description="Process a file of text.")
  parser.add_argument('--filename', dest='filename', type=str, required=True, help="type a filename after the arg")
  args = parser.parse_args()
  # print("Processing file: " + args.filename)
  # print("=================================")
  hash_table = HashTable()
  hash_set = set()
  line_count = 0
  with open(args.filename) as f:
    for line in f:
      line_count += 1
      processed_line = re.sub('[^a-zA-Z0-9]', ' ', line)
      words = processed_line.split(' ')
      for word in words:
        if word != "":
          sortedWord = "".join(sorted(word.lower()))
          # print(str(line_count) + ": " + sortedWord)
          if not hash_table.get(sortedWord):
            hash_table.insert(sortedWord)
          if not sortedWord in hash_set:
            hash_set.add(sortedWord)
  print(f'Custom Built Hash Table Size: {hash_table.size()}')
  print(f'Built in Hash Set Size: {len(hash_set)}')
  
if __name__ == "__main__":
  main()
