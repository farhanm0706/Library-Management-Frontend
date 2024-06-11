import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {
@Input()  message :string ='';
@Input()  success :boolean =true;
@Output()  closeDialog = new EventEmitter<void>()
  constructor() { }

  ngOnInit(): void {
  }
  onCloseClick(){
    this.closeDialog.emit();
  }


}
