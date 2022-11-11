import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.TimeUnit;

public class Producer implements Runnable {
	private BlockingQueue<Message> queue;
	private boolean running = true;
	private int id;
	// private static int prodCount = 0;
	private Map<String, Integer> sentReceived;

	public Producer(BlockingQueue<Message> q, int n, Map<String, Integer> sentReceived) {
		queue = q;
		id = n;
		this.sentReceived = sentReceived;
		// synchronized (this) {
		// prodCount++;
		// }
	}

	public void stop() {
		running = false;
		// synchronized (this) {
		// prodCount--;
		// }
	}

	public void run() {
		int count = 0;
		while (running) {
			int n = RandomUtils.randomInteger();
			try {
				Thread.sleep(n);
				Message msg = new Message("message-" + n);
				// Put the message in the queue
				boolean offered = queue.offer(msg, 1000, TimeUnit.MILLISECONDS);
				if (offered) {
					count++;
				}
				RandomUtils.print("Produced " + msg.get(), id);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		// Put the stop message in the queue
		Message msg = new Message("stop");
		try {
			// synchronized (this) {
			// if (prodCount > 0) {
			// wait();
			// }
			// notifyAll();
			// }
			queue.offer(msg, 1000, TimeUnit.MILLISECONDS); // Put this final message in the queue
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		RandomUtils.print("Messages sent: " + count, id);
		sentReceived.put("producer-" + id, count);
	}
}
