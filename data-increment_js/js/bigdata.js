var MAX_NUM = 20000;
// Initialize Firebase
var config = {
	apiKey: "<YOUR API KEY>",
	authDomain: "<YOUR DOMAIN>.firebaseapp.com",
	databaseURL: "<YOUR DOMAIN>.firebaseio.com",
	storageBucket: "<YOUR DOMAIN>.appspot.com",
	messagingSenderId: "<YOUR SENDER ID>"
};
firebase.initializeApp(config);


var Firebase = function() {
    this._events = {};
};
Firebase.prototype = {
	addListener: function(eventName, callback) {
		var events = this._events,
		callbacks = events[eventName] = events[eventName] || [];
		callbacks.push(callback);
	},
	raiseEvent: function(eventName, args) {
		var callbacks = this._events[eventName];
		for (var i = 0, l = callbacks.length; i < l; i++) {
			callbacks[i].apply(null, args);
		}
	},
	dataIncrease : function() {
		for(var i=0; i<MAX_NUM; i++){
			//各オブジェクトの名前を適当にランダムで生成
			var _name = Math.random().toString(36).slice(-16);
			//数値をランダムで生成
			var _num = Math.floor(Math.random()*1000000);

			//追加するオブジェクトのデータを用意する
			var postData = {
				name: _name,
				num: _num
			};
			//オブジェクトを追加する
			var newPostKey = firebase.database().ref().child('Objects').push().key;
			var updates = {};
			updates['/Objects/' + newPostKey] = postData;
			firebase.database().ref().update(updates, function(error) {
				if (!error) {
					_firebase.raiseEvent('dataIncreaseComplete',[]);
				}
			});
			
		}
	}
};


var _firebase = new Firebase();

_firebase.addListener("dataIncreaseComplete",dataIncreaseCompleteCallback);

function dataIncrease(){
	_firebase.dataIncrease();
}
function dataIncreaseCompleteCallback(){
	console.log("増えた！");
}