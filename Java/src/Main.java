
public class Main {

    public static void main(String[] args) {

        Thread DataReceiver = new Thread(new DataReceiver());

    }

    public static void getData(JSON data) {
        String method = data.getMethod(); // figure out how to get the method from the JSON

        switch (method) {
        case "close":
        case "connect":
        case "get-friends":
        case "get-history":
        case "net-msg":
        case "peer-loss":
        case "send-msg":
        case "net-msg-send":
        case "new-msg":
        }
    }

    private static void close(JSON data) {
    }

    private static void connect(JSON data) {
    }

    private static void get_friends(JSON data) {
    }

    private static void get_history(JSON data) {
    }

    private static void net_msg(JSON data) {
    }

    private static void peer_loss(JSON data) {
    }

    private static void send_msg(JSON data) {
    }

    private static void net_msg_send(JSON data) {
    }

    private static void new_msg(JSON data) {
    }

}
