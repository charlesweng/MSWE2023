package com.bank;

public class ListNode {
  public int id;
  public User user;
  public ListNode next;

  public ListNode(int id, User user, ListNode next) {
    this.id = id;
    this.user = user;
    this.next = next;
  }

  @Override
  public String toString() {
    return "ListNode [id=" + id + ", user=" + user + "]";
  }

}
