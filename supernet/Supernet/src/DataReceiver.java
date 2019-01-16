import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class DataReceiver implements Runnable {
	public static final int PORT = 6474;
    Socket clientSocket;
    public static PrintWriter out; 
    BufferedReader in;
    public static String myIP;

    public void run() {
    	//TODO: Instead of wait for connection, connect to electron
        try {
            // create the initial connection to electron
        		clientSocket = new Socket("127.0.0.1", PORT);
        		myIP = clientSocket.getLocalAddress().getHostAddress();
            out = new PrintWriter(clientSocket.getOutputStream(), true);
            in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
    			String inputJSON = "";

            //listen on the socket for data from electron, and send it to main via getData()
            while(true) {
            		char[] charArray = new char[500];
            		in.read(charArray);
            		for(char c : charArray) {
            			inputJSON += c;
            		}
            		System.out.println(inputJSON);

            		inputJSON = inputJSON.trim();
	            	Main.getData(inputJSON);
	            	inputJSON = "";
            		
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}