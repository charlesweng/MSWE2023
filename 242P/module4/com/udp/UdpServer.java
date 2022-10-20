package com.udp;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketTimeoutException;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;

import java.util.List;
import java.util.Random;

public class UdpServer extends Thread {

  protected DatagramSocket socket = null;
  protected BufferedReader in = null;
  private File[] files;
  private List<String> filePaths;

  public UdpServer(String name) {
    super(name);
    try {
      socket = new DatagramSocket(4445, InetAddress.getByName("localhost"));
    } catch (Exception ex) {
      System.err.format("Exception: %s%n", ex);
    }
  }

  public void loadFiles(String folderName) {
    files = (new File(folderName)).listFiles();
    if (files == null) {
      throw new IllegalArgumentException("Invalid folder or path to files.");
    }
    filePaths = new ArrayList<>();
    for (File file : files) {
      String[] fileArr = file.getPath().split("/");
      filePaths.add(fileArr[fileArr.length - 1]);
    }
  }

  public void run() {
    while (true) {
      try {
        byte[] buf = new byte[512];

        // receive packet from client (index, get filename)
        DatagramPacket packet = new DatagramPacket(buf, buf.length);
        socket.setSoTimeout(0);
        socket.receive(packet);
        InetAddress inetAddress = packet.getAddress();
        int port = packet.getPort();

        // determine the command
        String s = new String(packet.getData(), 0, packet.getLength(), StandardCharsets.UTF_8);
        System.out.println(s);
        s = s.trim();
        if (s.equals("index")) {
          StringBuilder sb = new StringBuilder();
          for (int i = 0; i < filePaths.size() - 1; i++) {
            sb.append(filePaths.get(i));
            sb.append("\n");
          }
          sb.append(filePaths.get(filePaths.size() - 1));
          buf = sb.toString().getBytes();
          packet = new DatagramPacket(buf, buf.length, inetAddress, port);
          socket.send(packet);
        } else if (s.contains("get")) {
          String[] fileCommand = s.split(" ");
          if (fileCommand.length != 2) {
            System.err.println("Invalid command");
            buf = "error".getBytes();
            packet = new DatagramPacket(buf, buf.length, inetAddress, port);
            socket.send(packet);
          }
          String fileName = fileCommand[1];
          boolean found = false;
          for (File file : files) {
            String[] fileArr = file.getPath().split("/");
            if (fileArr[fileArr.length - 1].equals(fileName)) {
              found = true;
              buf = "ok".getBytes();
              packet = new DatagramPacket(buf, buf.length, inetAddress, port);
              socket.send(packet);

              int sequenceNumber = 0;
              boolean endOfFile = false;
              int ackSequence = 0;
              try (FileInputStream fin = new FileInputStream(file)) {
                int fileLength = (int) file.length();
                System.out.println("Total Bytes of File: " + Files.size(file.toPath()));
                for (int i = 0; i < fileLength; i += 509) {
                  sequenceNumber += 1;
                  byte[] message = new byte[512];
                  message[0] = (byte) (sequenceNumber >> 8);
                  message[1] = (byte) sequenceNumber;
                  if ((i + 509) >= fileLength) {
                    endOfFile = true;
                    message[2] = (byte) 1;
                  } else {
                    endOfFile = false;
                    message[2] = (byte) 0;
                  }

                  if (!endOfFile) {
                    byte[] fileData = new byte[509];
                    fin.read(fileData, 0, 509);
                    System.arraycopy(fileData, 0, message, 3, 509);
                  } else {
                    byte[] fileData = new byte[fileLength - i];
                    fin.read(fileData, 0, fileData.length);
                    System.arraycopy(fileData, 0, message, 3, fileData.length);
                  }

                  DatagramPacket sendPacket = new DatagramPacket(message, message.length, inetAddress, port);
                  int randomPacketLoss = (new Random().nextInt(10) + 1);
                  if (i != 0 && i % randomPacketLoss == 0) {
                    System.out.println("Not sending packet " + sequenceNumber);
                    // sequenceNumber--;
                    // i--;
                    socket.send(new DatagramPacket(new byte[] { 127, 127 }, 2, inetAddress, port));
                  } else {
                    socket.send(sendPacket);
                  }

                  boolean ackReceived;
                  while (true) {
                    byte[] ack = new byte[2];
                    DatagramPacket ackPacket = new DatagramPacket(ack, ack.length);

                    try {
                      socket.setSoTimeout(500);
                      socket.receive(ackPacket);
                      ackSequence = ((ack[0] & 0xff) << 8) + (ack[1] & 0xff);
                      ackReceived = true;
                    } catch (SocketTimeoutException ste) {
                      System.err.println("Socket waiting for the ack timed out");
                      ackReceived = false;
                    }

                    if (ackSequence == sequenceNumber && ackReceived) {
                      break;
                    } else {
                      // System.out.println("Sending: ");
                      // System.out.println(new String(sendPacket.getData(), 0,
                      // sendPacket.getData().length));
                      socket.send(sendPacket);
                    }
                  }
                }
              } catch (SocketTimeoutException ste) {
              } catch (Exception ex) {
                System.err.println(ex);
              }
            }
          }
          if (!found) {
            buf = "error".getBytes();
            packet = new DatagramPacket(buf, buf.length, inetAddress, port);
            socket.send(packet);
          }
        }
      } catch (Exception x) {
        System.err.format("Exception: %s%n", x);
      }
    }
  }

  public static void main(String[] args) {
    if (args.length != 1) {
      System.err.println("You must provide a folder name as a command line argument.");
      return;
    }
    UdpServer udpServer = new UdpServer("UDP File Server");
    String folderName = args[0].trim();
    udpServer.loadFiles(folderName);
    udpServer.start();
  }
}
