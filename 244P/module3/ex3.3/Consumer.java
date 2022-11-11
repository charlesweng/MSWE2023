import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.TimeUnit;

public class Consumer implements Runnable {
	private BlockingQueue<Message> queue;
	private int id;
	private Map<String, Integer> sentReceived;

	public Consumer(BlockingQueue<Message> q, int n, Map<String, Integer> sentReceived) {
		queue = q;
		id = n;
		this.sentReceived = sentReceived;
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
				// if (msg.get().equals("stop")) {
				// queue.offer(msg);
				// }
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
		if (msg == null) {
			count++;
		}
		RandomUtils.print("Messages received: " + count, id);
		sentReceived.put("consumer-" + id, count);
	}
}
