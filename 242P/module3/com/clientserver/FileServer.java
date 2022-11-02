package com.clientserver;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.InvalidPathException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class FileServer extends Thread {

  File[] files;
  List<String> filePaths;

  public FileServer(String name) {
    super(name);
  }

  public void loadFiles(String folderName) throws Exception {
    files = (new File(folderName)).listFiles();
    if (files == null) {
      throw new Exception("Could not load files in the folder.");
    }
    filePaths = new ArrayList<>();
    for (File file : files) {
      String[] filePathArr = file.getPath().split("/");
      filePaths.add(filePathArr[filePathArr.length - 1]);
    }
  }

  public int countLines(Path filePath) {
    int count = 0;
    try (BufferedReader reader = Files.newBufferedReader(filePath, Charset.forName("US-ASCII"))) {
      String ln = reader.readLine();
      while (ln != null) {
        count += 1;
        ln = reader.readLine();
      }
    } catch (InvalidPathException x) {
      System.err.format("InvalidPathException: %s%n", x);
    } catch (IOException x) {
      System.err.format("IOException: %s%n", x);
    } catch (SecurityException x) {
      System.err.format("SecurityException: s%n%", x);
    }
    return count;
  }

  @Override
  public void run() {
    try (
        ServerSocket serverSocket = new ServerSocket(8080);
        Socket clientSocket = serverSocket.accept();
        PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
        BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));) {
      String inputLine;
      while ((inputLine = in.readLine()) != null) {
        String line = inputLine;
        line = line.trim();
        if (line.contains("index")) {
          int length = filePaths.size();
          out.println(length);
          for (String filePath : filePaths) {
            String[] filePathArr = filePath.split("/");
            out.println(filePathArr[filePathArr.length - 1]);
          }
        } else if (line.contains("get")) {
          String[] lineSplit = line.split(" ");
          if (lineSplit.length != 2) {
            out.println(1);
            out.println("error");
          } else if (filePaths.contains(lineSplit[1])) {
            for (File file : files) {
              String[] filePathArr = file.getPath().split("/");
              if (filePathArr[filePathArr.length - 1].equals(lineSplit[1])) {
                int lineCount = countLines(file.toPath()) + 1;
                out.println(lineCount);
                out.println("ok");
                try (BufferedReader reader = Files.newBufferedReader(file.toPath(), Charset.forName("US-ASCII"))) {
                  String ln = reader.readLine();
                  while (ln != null) {
                    out.println(ln);
                    ln = reader.readLine();
                  }
                } catch (InvalidPathException x) {
                  System.err.format("InvalidPathException: %s%n", x);
                } catch (IOException x) {
                  System.err.format("IOException: %s%n", x);
                } catch (SecurityException x) {
                  System.err.format("SecurityException: s%n%", x);
                }
                // break;
              }
            }
          } else {
            out.println(1);
            out.println("error");
          }
        } else if (line.equals("close")) {
          // break;
        } else {
          out.println(1);
          out.println("Command not available.");
        }
      }
    } catch (Exception x) {
      System.err.format("Exception: %s%n", x);
    }
  }

  public static void main(String[] args) {
    if (args.length != 1) {
      System.err.println("You must provide a folder name as a command line argument.");
      System.exit(1);
    }
    String folderName = args[0].trim();
    FileServer server = new FileServer("TCP Server");
    try {
      server.loadFiles(folderName);
    } catch (Exception e) {
      System.err.println(e);
      System.exit(1);
    }
    server.start();
  }
}
