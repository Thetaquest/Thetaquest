import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-questions',
  templateUrl: './sidebar-questions.component.html',
  styleUrls: ['./sidebar-questions.component.scss']
})
export class SidebarQuestionsComponent implements OnInit {

  @Input() questions: [];
  @Output() addQuestion = new EventEmitter<any>();
  @Output() deleteQuestion = new EventEmitter<any>();
  @Output() setActiveQuestion = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    console.log(this.questions);
  }

  onAddQuestion() {
    this.addQuestion.emit();
  }

  onDeleteQuestion(questionTempId: string) {
    console.log("IN side-que");
    console.log(questionTempId)
    this.deleteQuestion.emit(questionTempId);
  }

  onClickQuestionCard(question) {
    this.setActiveQuestion.emit(question);
  }
}
