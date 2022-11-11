import java.util.concurrent.atomic.AtomicInteger;

public class TrafficController {

    private int enteredLeft = 0;// new AtomicInteger();
    private int enteredRight = 0;// new AtomicInteger();
    private final Object lockLeft = new Object();
    private final Object lockRight = new Object();

    public void enterLeft() {
        synchronized (lockLeft) {
            if (enteredRight > 0) {
                try {
                    lockLeft.wait();
                } catch (InterruptedException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
            enteredLeft++;
        }
    }

    public void enterRight() {
        synchronized (lockRight) {
            if (enteredLeft > 0) {
                try {
                    lockRight.wait();
                } catch (InterruptedException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
            enteredRight++;
        }
    }

    public void leaveLeft() {
        synchronized (lockRight) {
            enteredRight--;
        }
        synchronized (lockLeft) {

            if (enteredRight == 0) {
                lockLeft.notify();
            }
        }
    }

    public void leaveRight() {
        synchronized (lockLeft) {
            enteredLeft--;
        }
        synchronized (lockRight) {

            if (enteredLeft == 0) {
                lockRight.notify();
            }
        }
    }

}