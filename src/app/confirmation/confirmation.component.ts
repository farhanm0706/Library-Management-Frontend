import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
 @Output() confirmDelete =new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onClickDelete(){
    this.confirmDelete.emit(true);
  }
  onClickCancel(){
    this.confirmDelete.emit(false);
  }

}
