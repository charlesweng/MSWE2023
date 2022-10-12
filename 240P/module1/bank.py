class Bank:
  class User:
    def __init__(self, name, address, ssn, deposit_amount):
      """
      name: name of the user
      address: address of the user
      ssn: social security number of the user
      deposit_amount: amount to deposit for the user
      """
      self.name = name
      self.address = address
      self.ssn = ssn
      self.deposit_amount = deposit_amount
    
    def __eq__(self, other):
      if isinstance(other, Bank.User):
        return self.name == other.name and \
               self.address == other.address and \
               self.ssn == other.ssn
      return False
    
    def __ne__(self, other):
      return not self.__eq__(other)

  class UserNode:
    def __init__(self, idx=0, user=None, nextNode=None):
      """
      idx: id of the current user
      user: user model 
      nextNode: next user in the linkedlist
      """
      self.idx = idx
      self.user = user
      self.next = nextNode

  def __init__(self):
    # UserNode(id=0) is a dummy node we ignore 
    self.users = self.UserNode()
    self.head = self.users.next
    self.sz = 0

  def add_user(self, name, address, ssn, deposit_amount):
    user = self.User(name, address, ssn, deposit_amount)
    self.sz += 1
    if self.users.next == None:
      self.users.next = self.UserNode(1, user)
      self.head = self.users.next
      return True
    else:
      prev = self.users
      current = self.users.next
      while current:
        if current.idx - prev.idx > 1:
          savedNext = prev.next 
          prev.next = self.UserNode(prev.idx + 1, user)
          prev.next.next = savedNext
          self.head = self.users.next
          return True
        prev = current
        current = current.next
      prev.next = self.UserNode(prev.idx + 1, user)
      self.head = self.users.next
      return True
  
  def delete_user(self, idx):
    prev = self.users
    current = self.users.next
    while current:
      if current.idx == idx:
        prev.next = current.next
        if current == self.head:
          self.head = self.head.next
        self.sz -= 1
        return True
      prev = current
      current = current.next
    return False
  
  def find_node(self, idx):
    node = self.users.next
    while node:
      if idx == node.idx:
        return node
      node = node.next
    return None
  
  def pay_user_to_user(self, idx1, idx2, amount):
    node1 = self.find_node(idx1)
    node2 = self.find_node(idx2)
    if node1 == None or node2 == None:
      return False
    node1.user.deposit_amount -= amount
    node2.user.deposit_amount += amount
    return True

  def get_median_id(self):
    counter = self.sz // 2 - 1 if self.sz % 2 == 0 else self.sz // 2
    current = self.users.next
    for i in range(counter):
      current = current.next
    return current.idx
    # current = self.users.next
    # prev = None
    # slow = current
    # fast = current
    # while fast != None and fast.next != None:
    #   prev = slow
    #   slow = slow.next
    #   fast = fast.next.next
    # if slow:
    #   if fast == None and prev != None:
    #     return prev.idx
    #   return slow.idx
    # else:
    #   return -1
    
  def size(self):
    return self.sz

  def merge_accounts(self, idx1, idx2):
    # edge case when you're merging the same id
    if idx1 == idx2:
      return False
    # making sure idx2/node2 is always the greater id
    if idx1 > idx2:
      idx1, idx2 = idx2, idx1
    node1 = self.find_node(idx1)
    node2 = self.find_node(idx2)
    if node1 == None or node2 == None:
      return False
    if node1.user != node2.user:
      return False
    node1.user.deposit_amount += node2.user.deposit_amount
    # TODO:: to optimize this create a delete node function
    self.delete_user(idx2)
    return True

  def print_users(self):
    current = self.users.next
    while current:
      dep_amt = None
      name = None
      if current.user:
        dep_amt = current.user.deposit_amount
        name = current.user.name
      print(f'->{str(current.idx)}:{str(dep_amt)}:{name}')
      current = current.next
    print()

def main():
  bank = Bank()
  bank.add_user("Charles", "23939", "625", 1000) 
  bank.add_user("James", "23939", "625", 1000) 
  bank.add_user("John", "23939", "625", 1000) 
  print("deleting user 2, James")
  bank.delete_user(2)
  bank.print_users()
  print("adding back user 2, AUSER")
  bank.add_user("AUSER", "23939", "625", 1000) 
  bank.print_users()
  print("Charles pays John 500")
  bank.pay_user_to_user(1,3,500)
  bank.print_users()
  # print("John pays Charles 500")
  # bank.pay_user_to_user(3,1,500)
  # bank.print_users()
  print("median id of ^^^ above: ", end="")
  print(bank.get_median_id())
  bank.add_user("Charles", "23939", "625", 1000) 
  # bank.add_user("Kate", "23939", "625", 1000)
  # bank.print_users()
  # print("median id of ^^^ above: ", end="")
  # print(bank.get_median_id())
  # bank.add_user("James", "23939", "625", 1000)
  # bank.print_users() 
  print("merging Charles (1, 4)")
  bank.merge_accounts(1, 4)
  bank.print_users()
  # bank.add_user("Charles", "23939", "625", 1000) 
  # bank.add_user("Bob", "23939", "625", 1000)
  # print("merging Bob(5) and Charles(1):", end="")
  # print(str(bank.merge_accounts(1,5)))
  # print("merging Charles(4) and Charles(1):", end="")
  # print(str(bank.merge_accounts(1,4)))
  # bank.print_users()
  # # more tests on delete + add
  # bank.delete_user(3)
  # bank.add_user("Greg", "23939", "625", 1000) 
  # bank.add_user("Kate", "23939", "625", 1000) 
  # bank.print_users()
  # # test even median
  # bank.add_user("Jake", "23939", "625", 1000) 
  # bank.print_users()
  # print(bank.get_median_id())

if __name__ == "__main__":
  main()

