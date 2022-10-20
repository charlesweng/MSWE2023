import java.util.Random;
import java.util.concurrent.*;

public class Main3 {

    private final static Random rand = new Random();
    private final static Semaphore sem = new Semaphore(1);

    private static void nap(int millisecs) {
        try {
            Thread.sleep(millisecs);
        } catch (InterruptedException e) {
            System.err.println(e.getMessage());
        }
    }

    private static void addProc(HighLevelDisplay d) {
        // Add a sequence of addRow operations with short random naps.
        for (int i = 0; i < 1000; i++) {
            try {
                sem.acquire();
                d.addRow("AAAAAAAAAAAA  " + i);
                d.addRow("BBBBBBBBBBBB  " + i);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } finally {
                sem.release();
            }
            nap(rand.nextInt(2500));
        }
    }

    private static void deleteProc(HighLevelDisplay d) {
        // Add a sequence of deletions of row 0 with short random naps.
        for (int i = 0; i < 1000; i++) {
            try {
                sem.acquire();
                d.deleteRow(0);
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                sem.release();
            }
            nap(rand.nextInt(2500));

        }
    }

    public static void main(String[] args) {
        final HighLevelDisplay d = new JDisplay2();

        new Thread() {
            public void run() {
                addProc(d);
            }
        }.start();

        new Thread() {
            public void run() {
                deleteProc(d);
            }
        }.start();

    }
}