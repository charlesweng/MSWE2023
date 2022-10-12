from math import nan

class Stack:
  def __init__(self):
    self.stack = []
    self.sz = 0
  
  def push(self, x):
    self.stack.append(x)
    self.sz += 1
  
  def pop(self):
    if self.sz == 0:
      raise Exception("Cannot pop from an empy stack.")
    self.sz -= 1
    # costs O(1)
    # https://stackoverflow.com/questions/195625/what-is-the-time-complexity-of-popping-elements-from-list-in-python
    return self.stack.pop()
  
  def peek(self):
    if self.sz == 0:
      raise Exception("Cannot peek from an empty stack.")
    return self.stack[-1]
  
  def size(self):
    return self.sz
  
  def print_stack(self):
    print(self.stack)

# print("=====TESTING STACK====")
# st = Stack()
# try:
#   st.peek()
# except Exception as e:
#   print(e)
# try:
#   st.pop()
# except Exception as e:
#   print(e)
# print("pushing 1-3")
# st.push(1)
# st.push(2)
# st.push(3)
# print("popping 3-1")
# print(st.pop())
# print(st.pop())
# print(st.pop())
# try:
#   print(st.pop())
# except Exception as e:
#   print(e)


def operate(o1, o2, op):
  if op == "*":
    return o1 * o2
  elif op == "/":
    if o2 == 0:
      return None
    return o1 / o2
  elif op == "-":
    return o1 - o2
  elif op == "+":
    return o1 + o2
  return None

def evaluate_expression(s):
  operand = Stack()
  operator = Stack()

  precedence = { '+': 0, '-': 0, '*': 1, '/': 1}

  i = 0
  lastSeen = ""
  while i < len(s):
    if s[i] not in ' 0123456789+-/*^':
      return nan

    if s[i] == ' ':
      i += 1
      continue

    if s[i] in '-0123456789' and lastSeen in '*-+/^':
      neg = 1
      if (i-1 < 0 and s[i] == '-') or (s[i] == '-' and lastSeen in '*-+/^'):
        neg = -1
        i += 1
        if s[i] in '*-+/^':
          return nan
      val = 0
      while i < len(s) and s[i] in '0123456789':
        val = val * 10 + int(s[i])
        i += 1
      lastSeen = s[i-1]
      operand.push(val*neg)
      continue
    
    if s[i] in '-+*/^':
      lastSeen = s[i]
      if operator.size() == 0 or precedence[operator.peek()] < precedence[s[i]]: 
        operator.push(s[i])
      else: # current operator >= previous operator
        while operator.size() > 0:
          val2 = operand.pop()
          val1 = operand.pop()
          result = operate(val1, val2, operator.pop())
          if result == None:
            return nan
          operand.push(result)
          if operator.size() > 0 and precedence[operator.peek()] < precedence[s[i]]:
            break
        operator.push(s[i])
      i += 1
    
  while operator.size() > 0 and operand.size() > 1:
    val2 = operand.pop()
    val1 = operand.pop()
    result = operate(val1, val2, operator.pop())
    if result == None:
      return nan
    operand.push(result)
  
  if operand.size() == 0:
    return nan

  return operand.peek()

print("====TESTING EVALUATE EXPRESSION====")
print("2 * 3 + -5 =")
print(evaluate_expression("2 * 3 + -5 * 1"))
# print("1 + 2 * 3 =")
# print(evaluate_expression("1 + 2 * 3"))
# print("1 - 7 * 2 =")
# print(evaluate_expression("1 - 7 * 2"))
print("10 + 20 * -2 / 2")
print(evaluate_expression("10 + 20 * -2 / 2"))

