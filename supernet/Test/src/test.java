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
		ServerSocket sock = new ServerSocket(6475);
		Socket clientSock;
		
		clientSock = sock.accept();
 
		PrintWriter out = new PrintWriter(clientSock.getOutputStream(), true);
        BufferedReader in = new BufferedReader(new InputStreamReader(clientSock.getInputStream()));
         
         out.println("THIS IS A TEST");

	}

}
