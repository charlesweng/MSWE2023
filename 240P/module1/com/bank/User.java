package com.bank;

public class User {
  String name;
  String address;
  String ssn;
  int depositAmount;

  public User(String name, String address, String ssn, int depositAmount) {
    this.name = name;
    this.address = address;
    this.ssn = ssn;
    this.depositAmount = depositAmount;
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((address == null) ? 0 : address.hashCode());
    result = prime * result + ((name == null) ? 0 : name.hashCode());
    result = prime * result + ((ssn == null) ? 0 : ssn.hashCode());
    return result;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null)
      return false;
    if (getClass() != obj.getClass())
      return false;
    User other = (User) obj;
    if (address == null) {
      if (other.address != null)
        return false;
    } else if (!address.equals(other.address))
      return false;
    if (name == null) {
      if (other.name != null)
        return false;
    } else if (!name.equals(other.name))
      return false;
    if (ssn == null) {
      if (other.ssn != null)
        return false;
    } else if (!ssn.equals(other.ssn))
      return false;
    return true;
  }

  @Override
  public String toString() {
    return "User [address=" + address + ", depositAmount=" + depositAmount + ", name=" + name + ", ssn=" + ssn + "]";
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getSsn() {
    return ssn;
  }

  public void setSsn(String ssn) {
    this.ssn = ssn;
  }

  public int getDepositAmount() {
    return depositAmount;
  }

  public void setDepositAmount(int depositAmount) {
    this.depositAmount = depositAmount;
  }

}
