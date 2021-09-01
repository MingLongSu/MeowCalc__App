class localStorageAPI { 
    static setCurrentSessionUser(userId) { 
        localStorage.setItem('Session', JSON.stringify(userId));
    } 

    static getCurrentSessionUser() { 
        return localStorage.getItem(JSON.parse('Session')); 
    }
}

export default localStorageAPI;