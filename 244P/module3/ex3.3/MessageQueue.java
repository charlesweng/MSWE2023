import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.LinkedBlockingQueue;

public class MessageQueue {
	private static int n_ids;
	private static final Map<String, Integer> sentReceived = new ConcurrentHashMap<>();

	public static void main(String[] args) {
		if (args.length != 2) {
			throw new IllegalArgumentException("N and M arguments must be provided.");
		}
		int N, M;
		try {
			M = Integer.parseInt(args[0]);
			N = Integer.parseInt(args[1]);
		} catch (NumberFormatException nfe) {
			System.err.format("Exception: %s%n", nfe);
			throw new NumberFormatException("Please provide valid integers for N and M.");
		}
		BlockingQueue<Message> queue = new LinkedBlockingQueue<>(10);

		Producer[] producers = new Producer[M];
		Consumer[] consumers = new Consumer[N];

		for (int i = 0; i < M; i++) {
			producers[i] = new Producer(queue, n_ids++, sentReceived);
		}
		for (int i = 0; i < N; i++) {
			consumers[i] = new Consumer(queue, n_ids++, sentReceived);
		}

		for (int i = 0; i < M; i++) {
			new Thread(producers[i]).start();
		}
		for (int i = 0; i < N; i++) {
			new Thread(consumers[i]).start();
		}

		try {
			Thread.sleep(10000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		for (int i = 0; i < M; i++) {
			producers[i].stop();
		}

		try {
			Thread.sleep(3000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		int producerCount = 0;
		int consumerCount = 0;
		for (Map.Entry<String, Integer> entry : sentReceived.entrySet()) {
			System.out.println(entry.getKey() + " processed " + entry.getValue());
			if (entry.getKey().contains("producer")) {
				producerCount += entry.getValue();
			}
			if (entry.getKey().contains("consumer")) {
				consumerCount += entry.getValue();
			}
		}
		System.out.println("Total producer count: " + producerCount);
		System.out.println("Total consumer count: " + consumerCount);
		// System.exit(1);
	}
}
