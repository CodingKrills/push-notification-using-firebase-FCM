importScripts('https://www.gstatic.com/firebasejs/5.2.0/firebase.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.3/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyBDwv6_YVzCXm-gnf_evC3faopIF2_9lpc",
    authDomain: "ecommerce-8fcf8.firebaseapp.com",
    databaseURL: "https://ecommerce-8fcf8.firebaseio.com",
    projectId: "ecommerce-8fcf8",
    storageBucket: "ecommerce-8fcf8.appspot.com",
    messagingSenderId: "892649305450",
    appId: "1:892649305450:web:691e990dd280adea88e113",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);
    const notification = JSON.parse(payload);
    const notificationOption = {
        body: notification.body,
        icon: notification.icon
    };
    return self.registration.showNotification(payload.notification.title, notificationOption);
});
