import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  activeLink: string = 'welcome-page'; // Default active link
  selectedTab: string = 'welcome-page';
  books: any[] = [];
  borrowedBooks: any[] = [];
  favoriteBooks: any[] = [];
  message: string = '';
  messageType: string = '';
  userEmail: any;
  username: any;
  userNameValue:string ='';
  password: any;
  userRole: any;
  displayedText: string = '';
  index: number = 0;

  constructor(private adminService: AdminService,
    private userService: UserService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {

    const token1 = localStorage.getItem('token') || '';
    if (token1) {
      const decodedToken = JSON.parse(atob(token1.split('.')[1]));
      this.userEmail = decodedToken.email;
      this.userRole = decodedToken.role;
      this.userNameValue =decodedToken.username;
    }
    this.printLetterByLetter();
    this.listBook();
    this.borrowBookList();
    this.favoriteBookList();
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

  showMessage(message: string, type: string): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000);
  }

  setActive(link: string) {

    this.activeLink = link;
    this.selectedTab = link;
    if (this.activeLink === 'logout') {
      this.logout();
    }
  }

  listBook() {
    this.adminService.getBooks().subscribe((res: any) => {
      if (res.length > 0) {
        console.log(res);
        this.books = res;
        console.log("Books data", this.books);

      }
    }, err => {
      console.log(err);

    })
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
      this.showMessage('User Data changed successfully', 'success');
      setTimeout(() => {
        this.message = '';
        this.messageType = '';
      }, 3000);

    }, err => {
      console.log(err);

      this.showMessage('Technical issue. Try again Later.', 'error');
      setTimeout(() => {
        this.message = '';
        this.messageType = '';
      }, 3000);

    })
  }



  borrowBookList() {
    console.log("Hello from borro list");
    this.userService.getBorrowBookList().subscribe((res: any) => {
      console.log("inside from borro list", res);
      if (res.length > 0) {
        console.log(res);
        this.borrowedBooks = res;
        console.log("Borrowed Books data", this.borrowedBooks);

      } else {
        this.borrowedBooks = [];
      }
    }, (err: any) => {
      console.log(err);

    })
  }
  favoriteBookList() {
    this.userService.getFavoriteBookList().subscribe((res: any) => {

      if (res.length > 0) {
        console.log(res);
        this.favoriteBooks = res;
        console.log("Favorite Books data", this.favoriteBooks);

      } else {
        this.favoriteBooks = [];
      }
    }, (err: any) => {
      console.log(err);

    })
  }

  borrowBook(book: any) {
    const id = book._id;
    this.userService.borrowBookService(id).subscribe(res => {
      console.log(res);
      this.showMessage('Book borrowed successfully', 'success');
      setTimeout(() => {
        this.message = '';
        this.messageType = '';
      }, 3000);
      this.listBook();
      this.favoriteBookList();
      this.borrowBookList();

    },
      err => {
        if (err.status === 404) {
          this.showMessage('Book not available', 'error');
          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 3000);

        } else if (err.status === 400) {
          this.showMessage('Book already borrowed', 'error');
          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 3000);

        } else if (err.status === 401) {
          this.showMessage('Book limit reached', 'error');
          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 3000);

        }  else {
          this.showMessage("Technical issue", 'error');
          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 3000);
          console.log(err);

        }


      })

  }
  returnBook(book: any) {
    const id = book.bookId;
    console.log(book);
    this.userService.returnBook(id).subscribe(res => {
      console.log(res);
      this.showMessage('Book returned successfully', 'success');
      setTimeout(() => {
        this.message = '';
        this.messageType = '';
      }, 3000);
      this.borrowBookList();

    }, err => {
      this.showMessage('Technical issue. Try again Later.', 'error');
      setTimeout(() => {
        this.message = '';
        this.messageType = '';
      }, 3000);
      console.log(err);
    })
  }

  addToFav(book: any) {
    console.log("fav");

    const favKey = true;
    const id = book._id;
    this.userService.favBookService(id, favKey).subscribe(res => {
      console.log(res);
      this.showMessage('Book added to favoraites', 'success');
      setTimeout(() => {
        this.message = '';
        this.messageType = '';
      }, 3000);
      this.favoriteBookList();

    },
      err => {
        if (err.status === 403) {
          this.showMessage("Book already moved to favorites", 'error');
          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 3000);
          } else if(err.status === 400){
          this.showMessage("Book already borrowed", 'error');
          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 3000);
          }
          console.log(err);

        console.log(err);

      })

  }
  removeFromFav(book: any) {
    const id = book._id;
    this.userService.removefavBookService(id).subscribe(res => {
      console.log(res);
      this.showMessage('Book removed from favorites', 'success');
      setTimeout(() => {
        this.message = '';
        this.messageType = '';
      }, 3000);
      this.favoriteBookList();

    },
      err => {
        this.showMessage(err.message, 'error');
        setTimeout(() => {
          this.message = '';
          this.messageType = '';
        }, 3000);

        console.log(err);

      })
  }

  logout() {
    this.authservice.logout();

  }


}
