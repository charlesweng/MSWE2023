class Queue:
  def __init__(self):
    self.queue = []
    self.sz = 0
  
  def enqueue(self, x):
    self.queue.append(x)
    self.sz += 1
  
  def dequeue(self):
    if self.sz == 0:
      raise Exception("Cannot dequeue from an empty queue.")
    self.sz -= 1
    # costs O(n) because we are shifting everything back
    # https://stackoverflow.com/questions/195625/what-is-the-time-complexity-of-popping-elements-from-list-in-python
    # either use linkedlist or collections.deque()
    return self.queue.pop(0)
  
  def poll(self):
    if self.sz == 0:
      raise Exception("Cannot poll from an empty queue.")
    return self.queue[0]
  
  def size(self):
    return self.sz
  
  def print_queue(self):
    print(self.queue)


class Stack:
  def __init__(self):
    self.q1 = Queue()
    self.q2 = Queue()
    self.sz = 0
  
  def push(self, x):
    """
    q1 = [1,2,3]
    q2 = []
    keep pushing onto the queue with elements in it
    """
    if self.q2.size() > 0:
      self.q2.enqueue(x)
    else:
      self.q1.enqueue(x)
    self.sz += 1
  
  def pop(self):
    """
    enqueue all the way to another queue until the last element
    """
    if self.q1.size() > 0:
      self.sz -= 1
      while self.q1.size() > 1:
        self.q2.enqueue(self.q1.dequeue())
      return self.q1.dequeue()
    elif self.q2.size() > 0:
      self.sz -= 1
      while self.q2.size() > 1:
        self.q1.enqueue(self.q2.dequeue())
      return self.q2.dequeue()
    raise Exception("Cannot pop from an empty stack.")
  
  def peek(self):
    top = float('-inf')
    if self.q1.size() > 0:
      while self.q1.size() > 1:
        self.q2.enqueue(self.q1.dequeue())
      top = self.q1.poll()
      self.q2.enqueue(self.q1.dequeue())
    elif self.q2.size() > 0:
      while self.q2.size() > 1:
        self.q1.enqueue(self.q2.dequeue())
      top = self.q2.poll()
      self.q1.enqueue(self.q2.dequeue())
    if top == float('-inf'):
      raise Exception("Cannot peek on an empty stack.")
    return top

  def size(self):
    return self.sz

def main():
  # print("TESTING QUEUE")
  # q = Queue()
  # print("enqueueing 1-3")
  # q.enqueue(1)
  # q.enqueue(2)
  # q.enqueue(3)
  # print(f"size() -> {q.size()}")
  # print(f"dequeue() -> {q.dequeue()}")
  # print(f'poll() -> {q.poll()}')
  # print(f"dequeue() -> {q.dequeue()}")
  # print(f"dequeue() -> {q.dequeue()}")
  # print(f"size() -> {q.size()}")
  # print("dequeue() -> should be error below")
  # try:
  #   print(f"{q.dequeue()}")
  # except Exception as e:
  #   print(e)
  # print("poll() -> should be error below")
  # try:
  #   print(f"{q.poll()}")
  # except Exception as e:
  #   print(e)

  print("TESTING STACK IMPLEMENTED WITH 2 QUEUES")
  st = Stack()
  print("pushing 1-3")
  st.push(1)
  st.push(2)
  st.push(3)
  print(f"size() -> {st.size()}")
  print(f"peek() -> {st.peek()}")
  print(f"pop() -> {st.pop()}")
  print(f"peek() -> {st.peek()}")
  print("pushing 4-5")
  st.push(4)
  st.push(5)
  print(f"peek() -> {st.peek()}")
  print(f"pop() -> {st.pop()}")
  print(f"pop() -> {st.pop()}")
  print(f"pop() -> {st.pop()}")
  print(f"pop() -> {st.pop()}")
  print(f'size() -> {st.size()}')
  print(f"peek() -> should return error below")
  try:
    print(f'{st.peek()} should raise error')
  except Exception as e:
    print(e)
  print(f"pop() -> should return error below")
  try:
    print(f'{st.pop()} should raise error')
  except Exception as e:
    print(e)


if __name__ == "__main__":
  main()