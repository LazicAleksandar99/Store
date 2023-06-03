import { Component, ElementRef, OnInit } from '@angular/core';
import { TokenAuthorization } from 'src/app/models/token';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-dashboard-template',
  templateUrl: './dashboard-template.component.html',
  styleUrls: ['./dashboard-template.component.css']
})
export class DashboardTemplateComponent implements OnInit {
  userRole!: string;
  
  constructor(private tokenService: TokenService,
              private el: ElementRef) {

    this.userRole = (this.tokenService.getTokenInformation(localStorage.getItem('token') as string) as TokenAuthorization).role;
   }

  ngOnInit() {
  }

  scrollToSection(id: string): void {
    const element = this.el.nativeElement.querySelector(`#${id}`);
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
