import fs from 'fs';

//TODO Return filtered list of rooms based on search term sent by client, search in the title, categories, and
// description, in that order. This will require searching through ALL rooms on each request from client. Dont know
// if there is a better way than the standard .includes.
//*NOTE This will need to be case sensitive and should be accomplish with a simple Array.includes and String.includes.

//!Todo show the other users when a new lobby is created without having to refresh.
class Socket {
	setIO (io) {
		this.io = io;
		//Server listeners
		io.on ('connection', socket => {
			this.newConnection (socket);
			socket.on ('createLobby', payload => this.createRoom (socket, payload));
			socket.on ('join', payload => this.joinRoom (socket, payload));
			socket.on ('getLobbies', () => this.getRooms (socket));
			socket.on ('send', (payload) => this.talk (socket, payload));
			socket.on ('exitLobby', payload => this.exitRoom (payload));
		});
		this.Room = (socketId) => {
			return this.io.sockets.adapter.rooms[socketId];
		}
	}
	
	//Sets the id in object for reference down the road. Easiest solution I could find.
	newConnection (socket) {
		// console.log ('New Connection' + socket.id);
		socket.emit ('CONNECTED', {
			socket: socket.id,
			public: !!socket.public,
			message: 'Successfully Connected'
		});
	}
	
	//Todo - search methods that returns all sockets with the search query in their title/description.
	
	talk (socket, data) {
		try {
			this.io.emit ('receive', data);
		} catch (e) {
			console.log ('There has been an error: ' + e.message);
		}
	}
	
	createRoom (socket, data) {
		// checkRooms (socket);
		socket.join ('' + data.uid);
		let room = this.Room (data.uid);
		room.public = true;
		room.title = data.title;
		room.description = data.description;
		room.id = data.uid;
		socket.emit ('createLobby', this.Room (data.uid));
		this.notifyRooms ({room, user: data.user})
	}
	
	joinRoom (socket, payload) {
		try {
			socket.join ('' + payload.lobbyId);
			socket.to ('' + payload.lobbyId).emit ('user join', payload.user);
			socket.emit ('joinLobby', {
				message: 'Successfully Joined',
				lobby: this.Room (payload.lobbyId)
			});
			this.notifyRooms (this.Room (payload.lobbyId));
			if (Object.keys (this.Room (payload.lobbyId).sockets).length === 2) {
				this.Room (payload.lobbyId).public = false;
			}
		} catch (e) {
			socket.emit ('joinRoom', {
				error: e,
				message: e.message
			})
		}
	}
	
	notifyRooms (data, bool = false) {
		if (!bool) {
			this.io.emit ('updateLobbies', {
				lobby: data.room
				, user: data.user
			});
		} else {
			this.io.emit ('removeLobby', {
				lobbyId: data.lobbyId
			})
		}
	}
	
	getRooms (socket) {
		// console.log (this.io.sockets.adapter.rooms);
		let filteredRooms = [];
		let roomsPreFilter = this.io.sockets.adapter.rooms;
		
		roomsPreFilter.forEach (cur => {
			if (cur.public) {
				filteredRooms.push (cur);
			}
		});
		
		socket.emit ('getLobbies', filteredRooms);
	}
	
	exitRoom (socket, payload) {
		if(payload == null){
			return;
		}
		socket.leave (payload.lobbyId);
		this.io.to ('' + payload.lobbyId).emit ('user leave');
		this.notifyRooms (this.Room (payload.lobbyId), true);
	}
}

const socket = new Socket ();
export default socket;

// Object-forEach Polyfill - :)
if (!Object.prototype.forEach) {
	Object.defineProperty (Object.prototype, "forEach", {
		value: function (callback, thisArg) {
			if (this == null) {
				throw new TypeError ("Not an object");
			}
			for (let key in this) {
				if (this.hasOwnProperty (key)) {
					callback.call (thisArg, this[key], key, this);
				}
			}
		}
	});
}