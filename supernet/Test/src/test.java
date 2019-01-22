import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class test {

	public static void main(String[] args) throws IOException {
		int time = Math.round(System.currentTimeMillis() / 1000);
		String times = Integer.toString(time);
		System.out.println(times);
	}

}
