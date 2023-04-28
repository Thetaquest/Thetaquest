import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }

  openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
}
