import java.util.concurrent.BlockingQueue;
import java.util.concurrent.TimeUnit;

public class Consumer implements Runnable {
	private BlockingQueue<Message> queue;
	private int id;

	public Consumer(BlockingQueue<Message> q, int n) {
		queue = q;
		id = n;
	}

	public void run() {
		Message msg = null;
		int count = 0;
		do {
			try {
				msg = queue.poll(1000, TimeUnit.MILLISECONDS); // Get a message from the queue
				if (msg == null) {
					break;
				}
				if (msg.get().equals("stop")) {
					queue.put(msg);
				}
				count++;
				RandomUtils.print("Consumed " + msg.get(), id);
				Thread.sleep(RandomUtils.randomInteger());
			} catch (InterruptedException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
		} while (msg.get() != "stop");
		// Don't count the "stop" message
		count--;
		RandomUtils.print("Messages received: " + count, id);
	}
}
