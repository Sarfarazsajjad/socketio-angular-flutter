import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private socket: Socket) { }

  ngOnInit() {
    console.log("ngOnInit app component");
    this.socket.on('connect', () => {
      console.log('Connected to server');

      // Emit a test event to the server
      this.socket.emit('chat message', 'hello from angular');
    });

    this.socket.on('chat message', (msg: any) => {
      console.log(msg);
    })
    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.socket.on('error', (error: any) => {
      console.error('WebSocket Error:', error);
    });

    // Listen for the test event from the server
    this.socket.on('test-event', (message: string) => {
      console.log('Received message from server:', message);
    });
  }

}
