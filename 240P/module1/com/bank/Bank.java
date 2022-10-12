package com.bank;

public class Bank {
  ListNode users;

  public Bank() {
    users = new ListNode(0, null, null);
  }

  public boolean addUser(String name, String address, String ssn, int depositAmount) {
    User user = new User(name, address, ssn, depositAmount);
    ListNode prev = this.users;
    ListNode current = this.users.next;
    while (current != null) {
      if (current.id - prev.id > 1) {
        prev.next = new ListNode(prev.id + 1, user, current);
        return true;
      }
      prev = current;
      current = current.next;
    }
    prev.next = new ListNode(prev.id + 1, user, null);
    return true;
  }

  public boolean deleteUser(int id) {
    ListNode prev = this.users;
    ListNode current = this.users.next;
    while (current != null) {
      if (id == current.id) {
        prev.next = current.next;
        return true;
      }
      prev = current;
      current = current.next;
    }
    return false;
  }

  private ListNode findNode(int id) {
    ListNode current = this.users.next;
    while (current != null) {
      if (current.id == id) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  public boolean payUserToUser(int id1, int id2, int amount) {
    ListNode user1 = findNode(id1);
    ListNode user2 = findNode(id2);
    if (user1 == null || user2 == null) {
      return false;
    }
    user1.user.setDepositAmount(user1.user.getDepositAmount() - amount);
    user2.user.setDepositAmount(user2.user.getDepositAmount() + amount);
    return true;
  }

  public Number getMedianId() {
    ListNode prev = null;
    ListNode slow = users.next;
    ListNode fast = users.next;
    while (fast != null && fast.next != null) {
      prev = slow;
      slow = slow.next;
      fast = fast.next.next;
    }
    if (slow != null) {
      if (fast == null && prev != null) {
        return (slow.id + prev.id) / 2.0;
      }
      return slow.id;
    } else {
      return -1;
    }
  }

  public boolean mergeAccounts(int id1, int id2) {
    if (id1 == id2) {
      return false;
    }
    if (id1 > id2) {
      int temp = id1;
      id1 = id2;
      id2 = temp;
    }
    ListNode user1 = findNode(id1);
    ListNode user2 = findNode(id2);
    if (user1 == null || user2 == null) {
      return false;
    }
    if (!user1.user.equals(user2.user)) {
      return false;
    }
    user1.user.setDepositAmount(user1.user.getDepositAmount() + user2.user.getDepositAmount());
    deleteUser(id2);
    return true;
  }

  public void printUsers() {
    ListNode current = users.next;
    while (current != null) {
      System.out.println(current + "->");
      current = current.next;
    }
    System.out.println("null");
  }

  public static void main(String[] args) {
    Bank bank = new Bank();
    bank.addUser("Charles", "23939", "625", 1000);
    bank.addUser("Greg", "23939", "625", 1000);
    bank.addUser("Kate", "23939", "625", 1000);
    bank.addUser("Bob", "23939", "625", 1000);
    bank.printUsers();
    System.out.println("Median id: " + bank.getMedianId());
    bank.deleteUser(3);
    bank.printUsers();
    System.out.println("Median id: " + bank.getMedianId());
    bank.addUser("Joe", "23939", "625", 1000);
    bank.printUsers();
    bank.addUser("Kate", "23939", "625", 1000);
    bank.printUsers();
    bank.addUser("Charles", "23939", "625", 1000);
    bank.mergeAccounts(1, 6);
    bank.printUsers();
  }
}