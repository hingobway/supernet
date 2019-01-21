import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class Main {

	//The String is the id. 
	public static HashMap<String, User> friends = new HashMap<>();
	
	//key is the chat idea (to field from packet). 
	public static HashMap<String, ArrayList> chats = new HashMap<>();
	public static PrintWriter out;
	public static String myUsername;
	
    public static void main(String[] args) {

        Thread DataReceiver = new Thread(new DataReceiver());
        DataReceiver.run();
    }

    public static void getData(String json) {
    		JSONParser parser = new JSONParser();
    		out = DataReceiver.out;
		try {
			JSONObject data = (JSONObject) parser.parse(json);
			String method = (String) data.get("method");
	        switch (method) {
	        case "close":
	            close(data);
	            break;
	        case "connect":
	            connect(data);
	            break;
	        case "get-friends":
	            get_friends(data);
	            break;
	        case "get-history":
	            get_history(data);
	            break;
	        case "net-msg":
	            net_msg(data);
	            break;
	        case "peer-loss":
	            peer_loss(data);
	            break;
	        case "send-msg":
	            send_msg(data);
	            break;
	        case "username":
	        		setUsername(data);
	        		break;
	        case "correct-ip":
	        		DataReceiver.setIP(data);
	        		break;
	        		
	        default:
	            System.out.println("Not a method");
	        }
		} catch (ParseException e) {
			System.out.println(json);
			e.printStackTrace();
		}
    		
    }

    private static void setUsername(JSONObject data) {
		myUsername = (String) data.get("username");
	}

	private static void close(JSONObject data) {
    	
    }

    //java will send an ICC identifier message
    private static void connect(JSONObject data) {
    		String userID = (String) data.get("user");
    		System.out.println("in Connect, got " + userID);

    		friends.put(userID, new User(userID));
    		//Send identify message using net-msg-send
    		JSONObject identify = new JSONObject();
		identify.put("method", "identify");
		identify.put("username", myUsername);
		net_msg_send(identify, userID);
    }

    
    //send the friend's list to electron
    private static void get_friends(JSONObject data) {
    		JSONObject friendsList = new JSONObject();
    		
    }

    private static void get_history(JSONObject data) {
    }

    private static void net_msg(JSONObject data) {
    		String sender = (String) data.get("from");
    		JSONObject packet = (JSONObject) data.get("packet");
    		String method = (String) packet.get("method");
    		//checks to see what type of message it is in order to know what to do
    		if(method.equals("identify")) {
    			String username = (String) packet.get("username");
    			if(friends.containsKey(sender))
    				friends.get(sender).setName(username);
    			
    			//if the friend isn't added
    			else {
    				User newUser = new User(sender);
    				newUser.setName(username);
    				friends.put(sender, newUser);
    				//send identify packet using net-msg-send
    				JSONObject identify = new JSONObject();
    				identify.put("method", "identify");
    				identify.put("username", myUsername);
    				net_msg_send(identify, sender);
    				System.out.println("Sent identify packet: "+identify+" to "+sender);
    			}
    			
    			//send a new peer message to EL
    			JSONObject message = new JSONObject();
    			message.put("method", "new-peer");
    			message.put("username", username);
    			message.put("id", sender);
    			sendToEL(message);
    			
    			
    		} else if(method.equals("user-msg")) {
    			String content = (String) packet.get("content");
    			String to = (String) packet.get("to");
    			//ADD CHAT TO HASHMAP OF CHATS with "to" as key
    			if(chats.containsKey(to)) {
    				chats.get(to).add(content);
    			} else { //if there is no chat with that person
    				ArrayList<String> chat = new ArrayList<>();
    				chat.add(content);
    				chats.put(to,chat);
    			}
    			
    			double timestamp = (double) packet.get("timestamp");
    			JSONObject message = new JSONObject();
    			message.put("method", "new-msg");
    			message.put("to", to);
    			message.put("from", sender);
    			message.put("content", content);
    			message.put("timestamp", timestamp);
    			sendToEL(message);
    		}
    }
    
    private static void peer_loss(JSONObject data) {
    }

    //send out an icc user message
    private static void send_msg(JSONObject data) {
    		String recipient = (String) data.get("to");
    		String content = (String) data.get("content");
    		double time = System.currentTimeMillis()/1000;
    		time = Math.round(time);
    		JSONObject message = new JSONObject();
    		message.put("method", "send-msg");
    		message.put("to", recipient);
    		message.put("content", content);
    		message.put("timestamp", Double.toString(time));
    		net_msg_send(message, recipient);
    }

	private static void net_msg_send(JSONObject data, String to) {
    		JSONObject packet = new JSONObject();
    		JSONObject sender = new JSONObject();
    		sender.put("id", getIDFromIP(DataReceiver.myIP));
    		data.put("sender", sender);
    		packet.put("method", "net-msg-send");
    		
    		packet.put("to", to);
		packet.put("packet", data);

		sendToEL(packet);
    }

    
    public static void sendToEL(JSONObject message) {
		out.println(message);
		out.flush();
		System.out.println("Sent IPC message: "+message);
	}
	
    public static String getIDFromIP(String IP) {
    		String[] IDDict = {"lo", "no", "la", "di", "su", "do", "fu", "ba", "mi","ti"};
    		String[] strippedIP = IP.split("\\.");

    		String[] correctIP = new String[2]; //the IP address without the subnet mask
    		String id = "0.";
    		for(int i = 0; i < strippedIP.length; i++) {
    			if(i > 1)
    				correctIP[i-2] = strippedIP[i];
    		}
    		
    		
    		for(int i = 0; i < correctIP.length; i++) {
    			if(i != 0) {
    				id += " ";
    			}
    			for(char c : correctIP[i].toCharArray()) { //for each letter
    				int num = Character.getNumericValue(c);
    				id += IDDict[num];
    			}
    			
    		}
    		return id;
    		
    }
    

}
