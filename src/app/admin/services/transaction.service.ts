import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, shareReplay, switchMap, take, tap} from "rxjs";
import {Transaction} from "../models/transaction";
import {of, throwError, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ApiResponsePage} from "../../shared/models/response/api-response-page";
import {BaseService} from "../../shared/services/base.service";
import {AuthService} from "../../authenticate/services/auth/auth.service";



@Injectable({
  providedIn: 'root',
})
export class TransactionService extends BaseService<Transaction> {

  constructor(http: HttpClient, private userService: AuthService) {
    super(http);
  }


  base_url = environment.baseUrl;


  getUri(): string {
    return 'transactions';
  }

  getTransactionsAllPaged(
    page: number,
    size: number
  ): Observable<ApiResponsePage<Transaction>>{
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<ApiResponsePage<Transaction>>(
      this.base_url +
      this.getUri() +
      '?' + params
    ).pipe(
      map(res => res),
      shareReplay()
    );
  }




  getTransactions(
    page: number,
    size: number
  ): Observable<ApiResponsePage<Transaction>>{
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<any>(
      this.base_url +
      this.getUri() +
      '?' + params
    ).pipe(
      map(res => res['data']),

      shareReplay()
    );
  }







  reportTransactionsByUser(
    userId: string,
    start: string,
    end: string,
    page: number,
    size: number
  ): Observable<ApiResponsePage<Transaction>> {
    let params = new HttpParams();
    params = params.set('start', start);
    params = params.set('end', end);

    params = params.set('page', page);
    params = params.set('size', size);

    return this.http.get<any>(
      this.base_url +
      this.getUri() + '/for-user/' + userId + '/on-period/' + '?'+
      params
    ).pipe(
      map(res => res['data']),
      shareReplay()
    );
  }


  getTransactionsByUser(
    userId: string,
    page: number,
    size: number
  ): Observable<ApiResponsePage<Transaction>> {
    let params = new HttpParams();

    params = params.set('page', page);
    params = params.set('size', size);

    return this.http.get<any>(
      this.base_url +
      this.getUri() + '/for-user/' + userId + '?'+
      params
    ).pipe(
      map(res => res['data']),
      switchMap((res) => {
        if (res )
        {
          res.datas.forEach(
            transaction => {
              const user$ = this.userService.getUser(transaction.subscriber);
              user$.subscribe(user => transaction.subscriberr = user);
            }
          )
        }
        return of(res);
      }),
      shareReplay()
    );
  }


  getTransaction(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(
      this.base_url +
      this.getUri() +
      '/' + id
    ).pipe(
      map(res =>  res['data']),
      switchMap((res) => {
        if (res )
        {
          const user$ = this.userService.getUser(res.subscriber);
          user$.subscribe(user => res.subscriberr = user);
        }
        return of(res);
      }),
      shareReplay()
    );

  }







  transactions$ = this.getTransactionsAllPaged(0, 100000000).pipe(
    map(res => res['data']),
    switchMap((res) => {
      if (res )
      {
        res.forEach(
          transaction => {
            const user$ = this.userService.getUser(transaction.subscriber);
            user$.subscribe(user => {
              if(user)
                transaction!.subscriberr = user
            });
          }
        )
      }
      return of(res);
    }),
    shareReplay()
  );












}
