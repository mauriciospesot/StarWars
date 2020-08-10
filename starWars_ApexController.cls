public class starWarsCallout {
    
    @AuraEnabled
    public static starWars getCharacter(String searchId) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        String endpoint = 'https://swapi.dev/api/people/' + searchId +'/';
        request.setEndpoint(endpoint);
        request.setMethod('GET');
        request.setHeader('Accept', 'application/json');
        HttpResponse response = http.send(request);
        starWars info = new starWars();
        // If the request is successful, parse the JSON response.
        if (response.getStatusCode() == 200) {
            info = (starWars) System.JSON.deserialize(response.getBody(), starWars.class);
          return info;
        }
        
        return info;
    }
    
    @AuraEnabled
    public static void addContact(Object character) {
        
    }
    
    public class starWars {
         @AuraEnabled
		public String name;
         @AuraEnabled
		public String height;
         @AuraEnabled
		public String mass;
         @AuraEnabled
		public String hair_color;
         @AuraEnabled
		public String skin_color;
         @AuraEnabled
		public String eye_color;
         @AuraEnabled
		public String birth_year;
         @AuraEnabled
		public String gender;
         @AuraEnabled
		public String homeworld;
         @AuraEnabled
		public List<String> films;
         @AuraEnabled
		public List<String> species;
         @AuraEnabled
		public List<String> vehicles;
         @AuraEnabled
		public List<String> starships;
         @AuraEnabled
        public String created;
         @AuraEnabled
        public String edited;
         @AuraEnabled
        public String url;
	}
}