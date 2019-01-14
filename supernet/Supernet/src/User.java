public class User {
	public static final String ipPrefix = "192.168.";

	String name;
	String id;
	
	public User(String id) {
		this.id = id;
	}
	public User(String name, String id) {
		this.name = name;
		this.id = id;
	}
	
	//takes the id and turns it into an ip address using table from the protocol
	public String getIP() {
		
		return id;
		
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	
}
