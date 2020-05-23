import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(
    private auth: AuthService,
    ) {
      this.isLoggedIn = auth.isLoggedIn;
    }

  ngOnInit(): void {
  }

  smallLogoDirectory: string = '../../assets/small_logo.png';
  cartLogoDirectory: string = '../../assets/icons/shopping_cart.svg';
  
  navBarText1: string = 'Books';
  navBarText2: string = 'Bargains';
  navBarText3: string = 'Explore';

  notLoggedInText: string = 'Hi! Sign In';
  loggedInText: string = 'Hi User!';
}
