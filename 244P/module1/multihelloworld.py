import threading
from time import sleep 

class HelloWorldThread(threading.Thread):

  def __init__(self, thread_id, *args, **kwargs):
    super(HelloWorldThread, self).__init__(*args, **kwargs)
    self.thread_id = thread_id
    self._stopper = threading.Event()
  
  def stopit(self):
    self._stopper.set()
  
  def stopped(self):
    return self._stopper.is_set()

  def run(self):
    while True:
      if self.stopped():
        return
      print("Thread {} is running.".format(self.thread_id))
      sleep(2)

def main():
  listOfThreads = [None]
  id_count = 1
  while True:
    userInput = input()
    if userInput == "a":
      thread = HelloWorldThread(id_count)
      id_count += 1
      thread.start()
      listOfThreads.append(thread)
    elif "b" in userInput:
      command = userInput.strip().split(" ")
      print(listOfThreads)
      listOfThreads[int(command[1])].stopit()
      listOfThreads[int(command[1])].join()
    elif userInput == "c":
      for thread in listOfThreads:
        if thread != None:
          thread.stopit()
          thread.join()
      exit(1)

if __name__ == "__main__":
  main()