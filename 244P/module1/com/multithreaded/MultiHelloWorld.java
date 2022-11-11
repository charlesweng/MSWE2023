package com.multithreaded;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        System.out.println("Hello World! I'm thread " + id + ". The time is " + dtf.format(now));
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
    System.out.println("a - create a new thread");
    System.out.println("b n - stops thread #n");
    System.out.println("c - stop all threads in the program");
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
