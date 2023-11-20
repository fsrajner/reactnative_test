import LocalizedStrings from 'react-native-localization';

// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');

const strings = new LocalizedStrings({
    "en-US": {
        username: "username",
        password: "password",
        email: "E-Mail",
        login: "Login",
        logout: "Logout",
        register: "Register",
        rooms: "Rooms",
        room: "Room",
        groups: "Groups",
        group: "Group",
        profile: "Profile",
        swiper: "Swiper",
        cancel: "Cancel",
        post: "Post",
        title: "Title",
        text: "Text",
        add_room: "Create Room",
        add_group: "Create Group",
        new_conversation: "Chit-Chat",
        search_profile: "Search Profile"
    },
    "hu-Hu": {
        userName: "felhasználói név",
        password: "jelszó",
        login: "Bejelentkezés",
        register: "Regisztráció",
        new_conversation: "Csevej"
    }
});

export default strings;