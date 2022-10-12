package com.multithreaded;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

class HelloWorld implements Runnable {
  int id;
  private boolean exit;

  public HelloWorld(int id) {
    this.id = id;
  }

  public void exit() {
    this.exit = true;
  }

  @Override
  public void run() {
    while (!exit) {
      try {
        System.out.println("Thread " + id + " is running.");
        Thread.sleep(2000);
      } catch (InterruptedException ie) {
        System.err.println(ie);
        break;
      }
    }
  }

}

public class MultiHelloWorld {

  public static void main(String[] args) {
    try (
        BufferedReader stdIn = new BufferedReader(new InputStreamReader(System.in));) {
      String fromUser = stdIn.readLine();
      Map<Thread, HelloWorld> threadMap = new LinkedHashMap<Thread, HelloWorld>();
      List<Thread> threadList = new LinkedList<>();
      int idCount = 0;
      while (fromUser != null) {
        if (fromUser.equals("a")) {
          HelloWorld helloWorld = new HelloWorld(idCount++);
          Thread thread = new Thread(helloWorld);
          thread.start();
          threadMap.put(thread, helloWorld);
          threadList.add(thread);
        } else if (fromUser.contains("b")) {
          try {
            String[] command = fromUser.split(" ");
            Thread thread = threadList.get(Integer.parseInt(command[1]));
            // thread.interrupt();
            threadMap.get(thread).exit();
          } catch (Exception ex) {
            System.err.format("Exception: %s%n", ex);
          }
        } else if (fromUser.equals("c")) {
          for (Thread thread : threadList) {
            threadMap.get(thread).exit();
            // thread.interrupt();
          }
          System.exit(1);
        }
        fromUser = stdIn.readLine();
      }
    } catch (Exception ex) {
      System.err.format("Exception: %s%n", ex);
    }
  }
}
