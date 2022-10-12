package com.linecount;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.InvalidPathException;

public class LineCounts {
  public static void main(String[] args) {
    if (args.length <= 0) {
      System.err.println("You must type at least one filename in the input.");
      return;
    }
    File[] files = new File[args.length];
    for (int i = 0; i < args.length; i++) {
      files[i] = new File(args[i]);
    }

    int lineCount = 0;
    for (File file : files) {
      Charset charset = Charset.forName("US-ASCII");
      int fileLineCount = 0;
      try (BufferedReader reader = Files.newBufferedReader(file.toPath(), charset)) {
        String line = reader.readLine();
        while (line != null) {
          // System.out.println(line);
          fileLineCount++;
          lineCount++;
          line = reader.readLine();
        }
        System.out.println(file.getName() + ": " + fileLineCount);
      } catch (InvalidPathException x) {
        System.err.format("InvalidPathException: %s%n", x);
      } catch (IOException x) {
        System.err.format("IOException: %s%n", x);
      } catch (SecurityException x) {
        System.err.format("SecurityException: s%n%", x);
      }
    }
    System.out.println("Total Line Count: " + lineCount);
  }
}