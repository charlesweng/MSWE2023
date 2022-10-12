import argparse
import re

# self derived
def merge_list(l1, l2):
  l3 = []
  
  i, j = 0, 0

  while i < len(l1) and j < len(l2):
    if l1[i] < l2[j]:
      l3.append(l1[i])
      i += 1
    else:
      l3.append(l2[j])
      j += 1
  
  while i < len(l1):
    l3.append(l1[i])
    i += 1
  
  while j < len(l2):
    l3.append(l2[j])
    j += 1

  return l3

# self derived
def merge_sort(li):
  if len(li) <= 1:
    return li
  mid = len(li) // 2
  l = merge_sort(li[:mid])
  r = merge_sort(li[mid:])
  return merge_list(l, r)

def sort_string(s):
  sb = list(s)
  sb = merge_sort(sb)
  return ''.join(sb)

def group_anagram(str_list):
  anagram_map = {}
  for s in str_list:
    # char_list = list(s)
    # sorted_char_list = merge_sort(char_list)
    # sorted_str = ''.join(sorted_char_list)
    sorted_str = sort_string(s)
    if sorted_str not in anagram_map:
      anagram_map[sorted_str] = []
    if s not in anagram_map[sorted_str]:
      anagram_map[sorted_str].append(s)
  return list(anagram_map.values())


def main():
  print(group_anagram(["bucket","rat","mango","tango","ogtan","tar"]))

  parser = argparse.ArgumentParser()
  parser.add_argument('--filename', dest="filename", type=str, required=False, help="file name of file to be parsed")
  args = parser.parse_args()
  if args.filename:
    str_list = []
    with open(args.filename, 'r') as f:
      for line in f:
        line = re.sub('[^a-zA-Z0-9]', ' ', line)
        line = line.lower()
        words = line.split(' ')
        for word in words:
          if word != '':
            str_list.append(word)
    print(group_anagram(str_list))

if __name__ == "__main__":
  main()


# https://www.youtube.com/watch?v=TzeBrDU-JaY - NOT USING THE COMMENTED PART ANYMORE
# def merge(li, left, mid, right): # [1,2,3,4,5]
#   n1 = mid - left + 1 # 2 - 0 + 1 = 3
#   n2 = right - mid # 4 - 2 = 2

#   l = []
#   r = []

#   for i in range(n1):
#     l.append(li[left + i])
#   for j in range(n2):
#     r.append(li[mid + 1 + j])
  
#   i, j = 0, 0
#   k = left

#   while i < n1 and j < n2:
#     if l[i] < r[j]:
#       li[k] = l[i]
#       i += 1
#     else:
#       li[k] = r[j]
#       j += 1
#     k += 1
  
#   while i < n1:
#     li[k] = l[i]
#     k += 1
#     i += 1
  
#   while j < n2:
#     li[k] = r[j]
#     k += 1
#     j += 1

# def sort_halves(li, l, r):
#   if l >= r:
#     return
#   mid = l + (r - l) // 2
#   sort_halves(li, l, mid)
#   sort_halves(li, mid + 1, r)
#   merge(li, l, mid, r)

# def merge_sort(li):
#   sort_halves(li, 0, len(li) - 1)
#   return li

# print(merge_sort(['d', 'a','c','b']))