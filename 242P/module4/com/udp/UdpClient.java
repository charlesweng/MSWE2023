package com.udp;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.nio.charset.StandardCharsets;
import java.util.HashSet;
import java.util.Set;

public class UdpClient {

  public static void sendAck(int findLast, DatagramSocket socket, InetAddress inetAddress, int port)
      throws IOException {
    byte[] ackPacket = new byte[2];
    ackPacket[0] = (byte) (findLast >> 8);
    ackPacket[1] = (byte) findLast;

    DatagramPacket ackDatagramPacket = new DatagramPacket(ackPacket, ackPacket.length, inetAddress, port);
    socket.send(ackDatagramPacket);
  }

  public static void main(String[] args) {
    long byteCount = 0;
    Set<Integer> sequenceLost = new HashSet<>();
    try {
      String hostname = "localhost";
      int port = 4445;

      InetAddress address = InetAddress.getByName(hostname);
      DatagramPacket packet = null;

      try (
          DatagramSocket socket = new DatagramSocket();
          BufferedReader stdIn = new BufferedReader(new InputStreamReader(System.in));) {
        String fromUser;
        while ((fromUser = stdIn.readLine()) != null) {
          if (fromUser.equals("")) {
            continue;
          }
          byte[] userBuf = fromUser.getBytes(StandardCharsets.UTF_8);
          DatagramPacket userPacket = new DatagramPacket(userBuf, userBuf.length, address, port);
          socket.send(userPacket);

          if (fromUser.contains("get")) {
            byte[] ok = new byte[512];
            packet = new DatagramPacket(ok, ok.length);
            socket.receive(packet);
            ok = packet.getData();
            String okString = new String(ok, 0, ok.length);
            System.out.println(okString);
            if (okString.contains("error")) {
              System.exit(1);
            }

            boolean endOfFile = false;
            int sequenceNumber = 0;
            int findLast = 0;
            while (true) {
              byte[] message = new byte[512];
              byte[] fileData = new byte[509];

              DatagramPacket receivedPacket = new DatagramPacket(message, message.length);
              socket.setSoTimeout(5000);
              socket.receive(receivedPacket);

              message = receivedPacket.getData();

              sequenceNumber = ((message[0] & 0xff) << 8) + (message[1] & 0xff);
              endOfFile = (message[2] & 0xff) == 1;
              if (sequenceNumber == findLast + 1 && (message[0] != 127 && message[1] != 127)) {
                findLast = sequenceNumber;
                System.arraycopy(message, 3, fileData, 0, 509);
                String fileStringData = new String(fileData, 0, fileData.length);
                byteCount += fileStringData.length();
                System.out.print(new String(fileData, 0, fileData.length));
                sendAck(findLast, socket, address, port);
              } else {
                if (message[0] == 127 && message[1] == 127) {
                  sequenceLost.add(findLast + 1);
                } else {
                  sendAck(findLast, socket, address, port);
                }
              }

              if (endOfFile) {
                System.out.println();
                System.out.println("Total bytecount: " + byteCount);
                System.out.println("Sequences lost include packets: ");
                for (Integer lostPacket : sequenceLost) {
                  System.out.print(lostPacket + " ");
                }
                System.exit(0);
              }
            }
            // byte[] serverResp = new byte[512];
            // packet = new DatagramPacket(serverResp, serverResp.length);
            // socket.receive(packet);
            // String respStr = new String(packet.getData(), 0, packet.getLength());
            // int numberOfReceives = 0;
            // try {
            // numberOfReceives = Integer.parseInt(respStr);
            // } catch (Exception ex) {
            // }
            // for (int i = 0; i < numberOfReceives; i++) {
            // serverResp = new byte[512];
            // packet = new DatagramPacket(serverResp, serverResp.length);
            // socket.receive(packet);
            // respStr = new String(packet.getData(), 0, packet.getLength());
            // System.out.print(respStr);
            // }
            // System.exit(0);
          } else {
            byte[] serverResp = new byte[512];
            packet = new DatagramPacket(serverResp, serverResp.length);
            socket.receive(packet);
            String respStr = new String(packet.getData(), 0, packet.getLength());
            System.out.println(respStr);
          }
        }
      } catch (Exception ex) {
        System.err.println(ex);
      }
    } catch (Exception ex) {
      System.err.format("Exception: %s%n", ex);
    }
    System.out.println();
    System.out.println("Total bytecount: " + byteCount);
    System.out.println("Sequences lost include packets: ");
    for (Integer lostPacket : sequenceLost) {
      System.out.print(lostPacket + " ");
    }
  }
}
