import {combineLatest, map} from "rxjs";
import {Component, OnInit} from "@angular/core";
import {AbstractComponent} from "../../../shared/components/abstract-component";
import {TransactionStatus} from "../../../shared/models/misc/status";
import {ApiResponsePage} from "../../../shared/models/response/api-response-page";
import {Transaction} from "../../models/transaction";
import {Observable} from "rxjs";
import {AuthService} from "../../../authenticate/services/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {TransactionService} from "../../services/transaction.service";
import {LoaderService} from "../../../shared/services/loader.service";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent extends AbstractComponent
  <any> implements OnInit
{


  conversion: any;

  drop: boolean = false;



  transactions$: Observable<ApiResponsePage<Transaction>>;



  datas$: Observable<any>;




  constructor(private authService:AuthService,
              private toast: ToastrService,
              private router:Router,

              private cookieService: CookieService,

              private transactionService: TransactionService,
              private loaderService: LoaderService) {

    super();



  }


  dropdown(){
    this.drop = !this.drop;
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
    this.user$ = this.authService.getUser(this.cookieService.get('id'));
    this.getData();

    this.loadScript('../../../../assets/js/jquery-3.5.1.min.js');
    this.loadScript('../../../../assets/css/nice-select2.js');
    this.loadScript('../../../../assets/js/datepicker.min.js');
    this.loadScript('../../../../assets/js/swiper-bundle.min.js');
    this.loadScript('../../../../assets/js/apexcharts.min.js');
    this.loadScript('../../../../assets/js/customizer.js');
    this.loadScript('../../../../assets/js/main.js');
    this.loadScript('../../../../assets/js/charts.js');


  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  getData() {
    this.user$.subscribe(res => {
      if(res){
        this.transactions$ = this.transactionService.getTransactionsByUser(String(res.id),0, this.sizeDebt);
      }
      this.datas$ = this.loaderService.showLoaderUntilCompleted<any>(combineLatest([
        this.transactions$
      ]).pipe(
        map(([transactions]) => ({
          transactions}))
      ));
    });

  }





  public onSelect(e: any) {  }
}
