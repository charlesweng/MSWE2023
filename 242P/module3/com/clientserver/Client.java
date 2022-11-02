package com.clientserver;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class Client {
  public static void main(String[] args) {
    String hostname = "localhost";
    int portNumber = 8080;

    try (
        Socket fileServerSocket = new Socket(hostname, portNumber);
        PrintWriter out = new PrintWriter(fileServerSocket.getOutputStream(), true);
        BufferedReader in = new BufferedReader(new InputStreamReader(fileServerSocket.getInputStream()));
        BufferedReader stdIn = new BufferedReader(new InputStreamReader(System.in));) {
      String fromServer, fromUser;
      while ((fromUser = stdIn.readLine()) != null) {
        out.println(fromUser);
        if (fromUser.equals("close")) {
          out.println("close");
          System.exit(0);
        }
        fromServer = in.readLine();
        int count = 0;
        try {
          count = Integer.parseInt(fromServer);
        } catch (NumberFormatException nfe) {
          System.err.println(nfe);
        }
        for (int i = 0; i < count; i++) {
          fromServer = in.readLine();
          System.out.println(fromServer);
        }
        if (fromUser.contains("get")) {
          out.println("close");
          System.exit(0);
        }
      }
    } catch (Exception x) {
      System.err.format("Exception: %s%n", x);
    }
  }
}
