import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookId!: string | null;
  bookData: any = {
    bookname: '',
    authorname: '',
    imageUrl: '',
    _id:''
  };
  message: string = '';
  messageType: string = '';
  constructor(private route:ActivatedRoute,
    private bookService:AdminService,
    private router:Router ) { }
   
  
  
  ngOnInit() {
    
    this.bookId = this.route.snapshot.paramMap.get('id');
    console.log(this.bookId)
    this.bookService.getBookData(this.bookId).subscribe(
      data => {
        this.bookData = data.book;
        console.log(this.bookData);
      },
      error => {
        console.error('Error fetching book data', error);
      }
    );
  }
  showMessage(message: string, type: string): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000);
  }

  updateBook(form:NgForm) {
    if (form.invalid) {
      return;
    }
    console.log("Update",this.bookId,this.bookData);
    
    this.bookService.updateById(this.bookId, this.bookData).subscribe(
      response => {
        console.log('Book updated successfully', response);
        this.showMessage('Book updated successfully', 'success');
      setTimeout(() => {
        this.message = '';
        this.messageType = '';
        this.router.navigate(['/admin/dashboard']); 
      }, 3000);
        
        
      },
      error => {
        this.showMessage('Technical issue. Try again Later.', 'error');
      setTimeout(() => {
        this.message = '';
        this.messageType = '';
      }, 3000);
        console.error('Error updating book', error);
      }
    );
  }

  goback(){
    this.router.navigate(['/admin/dashboard']);
  }

}
