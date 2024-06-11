import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  activeLink: string = 'welcome'; // Default active link
  selectedTab: string = 'welcome';
  bookName: string = '';
  noData: boolean = false;
  authorName: string = '';
  userEmail: string = '';
  userRole: string = '';
  imageUrl: string = '';
  books: any[] = [];
  users: any[] = [];
  transactionsList: any[] = [];
  admin: any = {};
  password: string = '';

  bookToDelete = [];
  showDialog: boolean = false;
  message: string = '';
  success: boolean = false;
  showMessageDialog: boolean = false;
  token: any;
  username:string ='';
  userNameValue:string='';
  profileChange: boolean = false;
  displayedText: string = '';
  index: number = 0;


  constructor(private route: Router,
    private authservice: AuthService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.listBook();
    const token1 = localStorage.getItem('token') || '';
    const decodedToken = JSON.parse(atob(token1.split('.')[1]));
    this.userEmail = decodedToken.email;
    this.userRole = decodedToken.role;
    this.userNameValue =decodedToken.username;
    this.printLetterByLetter();


  }
  
  printLetterByLetter() {
    if (this.index < this.userNameValue.length) {
      this.displayedText += this.userNameValue[this.index];
      this.index++;
      setTimeout(() => this.printLetterByLetter(), 100);
    } else {
      setTimeout(() => this.resetAndStartAgain(), 1000); // Delay before starting over
    }
  }
  resetAndStartAgain() {
    this.displayedText = '';
    this.index = 0;
    this.printLetterByLetter();
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.activeLink = tab;
    if (this.selectedTab === 'book-list') {
      this.listBook();
    }
    if (this.selectedTab === 'view-users') {
      this.viewUsers();
    }
    if (this.selectedTab === 'view-transactions') {
      this.viewTransactions();
    }

    if (this.selectedTab === 'logout') {
      this.logout();
    }

  }
  viewTransactions() {
    this.adminService.getTransactions().subscribe((res) => {
      console.log(res);

      this.transactionsList = res;


    }, res => {

    })
  }



  
  addBook(form: NgForm) {
    if (form.invalid) {
      return;
    }
    let newBook = {
      bookname: this.bookName,
      authorname: this.authorName,
      imageUrl: this.imageUrl
    }
    console.log("compo", newBook);

    this.adminService.addBookByAdmin(newBook).subscribe((res) => {
      console.log('Book Added successfully', res);
      this.message = res.message;
      this.success = true;
      this.showMessageDialog = true;
      this.listBook();
    }, error => {
      console.error('Error deleting book', error);
      this.message = 'Try again sometime later';
      this.success = false;
      this.showMessageDialog = true;

    })
    // Implement add book logic here
  }

  listBook() {
    this.adminService.getBooks().subscribe((res: any) => {
      if (res.length > 0) {
        console.log(res);
        this.books = res;
        console.log("Books data", this.books);

      }
    })
  }

  editBook(book: any) {
    const id = book._id;
    this.route.navigate(['/edit-book', id]);

  }

  openDeleteconfirmation(book: any) {
    this.bookToDelete = book;
    this.showDialog = true;
  }

  onDialogClose(confirm: boolean) {
    this.showDialog = false;
    if (confirm) {
      this.deleteBook(this.bookToDelete);
    }
  }


  deleteBook(book: any) {
    this.adminService.deleteBook(book._id).subscribe(res => {
      console.log('Book deleted successfully', res);
      this.message = res.message;
      this.success = true;
      this.showMessageDialog = true;
      this.listBook();
    }, error => {
      console.error('Error deleting book', error);
      this.message = 'Try again sometime later';
      this.success = false;
      this.showMessageDialog = true;

    })

  }

  onCloseMessageDialog(): void {
    this.showMessageDialog = false;
    if (this.profileChange) {
      this.authservice.logout();
    }
  }
  editProfile(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const updatedUser = {
      email: this.userEmail,
      username: this.username,
      password: this.password,
      role: this.userRole

    }
    console.log(updatedUser);
    this.authservice.updateUser(updatedUser).subscribe(res => {
      console.log(res);
      this.message = res.message;
      this.success = true;
      this.showMessageDialog = true;
      this.profileChange = true;
    }, err => {
      this.message = 'Try again sometime later';
      this.success = false;
      this.showMessageDialog = true;
    })
  }


  viewUsers() {
    this.adminService.getUsers().subscribe(res => {
      console.log(res);
      this.users = res.users;
    }, err => {

    })
  }

  logout() {
    this.authservice.logout();

  }




}