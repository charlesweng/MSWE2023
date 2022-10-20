from concurrent.futures import ThreadPoolExecutor
import datetime
import requests
import concurrent.futures

def get_index():
  r = requests.get('http://localhost:8080')
  return r.text[:100]

def main():
  before = datetime.datetime.now()
  with ThreadPoolExecutor(max_workers=1000) as executor:
    future_to_htmltask = { executor.submit(get_index): f'task{i}' for i in range(10000) }
    for future in concurrent.futures.as_completed(future_to_htmltask):
      taskName = future_to_htmltask[future]
      try:
        data = future.result()
      except Exception as exc:
        print(f'{taskName} generated an exception {exc}')
      else:
        print(f'{taskName} generated: \n {data} \n')

    print(future.result())
  elapsed = datetime.datetime.now() - before
  print(f"Time elapsed: {elapsed}")
if __name__ == "__main__":
  main()