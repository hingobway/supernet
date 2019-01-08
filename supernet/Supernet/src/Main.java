import java.util.HashMap;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class Main {

	public static HashMap<String, User> friends = new HashMap<>();
	
    public static void main(String[] args) {

        Thread DataReceiver = new Thread(new DataReceiver());

    }

    public static void getData(String json) {
    		JSONParser parser = new JSONParser();
    		
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
	        case "net-msg-send":
	            net_msg_send(data);
	            break;
	        case "new-msg":
	            new_msg(data);
	            break;
	        default:
	            System.out.println("Not a method");
	        }
		} catch (ParseException e) {
			e.printStackTrace();
		}
    		
    }

    private static void close(JSONObject data) {
    }

    private static void connect(JSONObject data) {
    }

    private static void get_friends(JSONObject data) {
    }

    private static void get_history(JSONObject data) {
    }

    private static void net_msg(JSONObject data) {
    }

    private static void peer_loss(JSONObject data) {
    }

    private static void send_msg(JSONObject data) {
    }

    private static void net_msg_send(JSONObject data) {
    }

    private static void new_msg(JSONObject data) {
    }

}
