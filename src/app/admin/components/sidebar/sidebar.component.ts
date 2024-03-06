import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authenticate/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  role!: string;

  constructor(private authService:AuthService, private router: Router,private modalService: NgbModal) {

  }


  loadScript(url:any) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  ngOnInit(): void {
    this.role = localStorage.getItem('role')!;

    this.loadScript('../../../../assets/js/jquery-3.5.1.min.js');
    this.loadScript('../../../../assets/js/bootstrap.min.js');
    this.loadScript('../../../../assets/js/jquery.waypoints.js');
    this.loadScript('../../../../assets/js/jquery.counterup.min.js');
    this.loadScript('../../../../assets/js/owl.carousel.min.js');
    this.loadScript('../../../../assets/js/parallax.min.js');
    this.loadScript('../../../../assets/js/isotope.pkgd.min.js');
    this.loadScript('../../../../assets/js/jquery.slicknav.min.js');
    this.loadScript('../../../../assets/js/jquery.magnific-popup.min.js');
    this.loadScript('../../../../assets/js/jquery.lineProgressbar.js');

    this.loadScript('../../../../assets/js/jquery.countdown.min.js');
    this.loadScript('../../../../assets/js/custom.js');

    this.loadScript('../../../../assets/css/nice-select2.js');
    this.loadScript('../../../../assets/js/datepicker.min.js');
    this.loadScript('../../../../assets/js/swiper-bundle.min.js');
    this.loadScript('../../../../assets/js/apexcharts.min.js');
    this.loadScript('../../../../assets/js/customizer.js');
    this.loadScript('../../../../assets/js/main.js');
    this.loadScript('../../../../assets/js/charts.js');
  }


  logout(){
    this.authService.logOut();
    this.hide();
    this.router.navigate(['']);

  }
  hide() {
    this.modalService.dismissAll();
    }
    openModal(content:any){
      this.modalService.open(content, { centered: true });
    }

}
