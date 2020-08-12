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
        starWars character = new starWars();
        // If the request is successful, parse the JSON response.
        if (response.getStatusCode() == 200) {
            character = (starWars) System.JSON.deserialize(response.getBody(), starWars.class);
            character.id = Integer.valueOf(searchId);
            character.found = true;
          return character;
        }
        
        return character;
    }
    
    @AuraEnabled
    public static Boolean addContact(Map<String, Object> character) {
        // Se valida si existe o no un registro de este personaje con su Id
        if([SELECT Id FROM Contact WHERE Character_Id__c = :(Decimal)character.get('id')].isEmpty()) {
            // Crear un objeto de tipo Contact 
            Contact newCharacter = new Contact();
        	newCharacter.LastName = (String)character.get('name');
            newCharacter.Character_Id__c = (Decimal)character.get('id');
            // Crear contacto
        	insert newCharacter;
            return true;
        } 
        return false;
    }
    
    public class starWars {
         @AuraEnabled
		public String name;
        @AuraEnabled
		public Integer id;
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
        @AuraEnabled
        public Boolean found = false;
	}
}
