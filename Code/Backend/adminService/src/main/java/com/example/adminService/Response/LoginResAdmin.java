package com.example.adminService.Response;

public class LoginResAdmin {
	 private String token;
	 private long expiresIn;
	    public String getToken() {
	        return token;
	    }
		public long getExpiresIn() {
			return expiresIn;
		}
		public void setExpiresIn(long expiresIn) {
			this.expiresIn = expiresIn;
		}
		public void setToken(String token) {
			this.token = token;
		}
		public LoginResAdmin(String token, long expiresIn) {
			this.token = token;
			this.expiresIn = expiresIn;
		}
		public LoginResAdmin() {
		}
}

