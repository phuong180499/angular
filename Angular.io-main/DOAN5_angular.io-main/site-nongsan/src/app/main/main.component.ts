import { BaseComponent } from './../lib/base-component';
import { Component, OnInit,Injector } from '@angular/core';
import { Observable} from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends BaseComponent implements OnInit {
  list_item:any;
  list_all:any;
  constructor(injector: Injector) { 
    super(injector);
  }

  ngOnInit(): void {
    Observable.combineLatest(
      this._api.get('/api/item/get-all'),
    ).takeUntil(this.unsubscribe).subscribe(res => {
      this.list_all = res[0];
      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { });

//     //sp moi
//     Observable.combineLatest(
//       this._api.get('/api/item/get-moi'),
//     ).takeUntil(this.unsubscribe).subscribe(res => {
//       this.list_moi = res[0];
//       setTimeout(() => {
//         this.loadScripts();
//       });
//     }, err => { });
// // phân trang km
//     this.list = [];
//     this.page = 1;
//     this.pageSize = 5;
//     this._route.params.subscribe(params => {
//       this.item_id = params['id'];
//       this._api.post('/api/item/search', { page: this.page, pageSize: this.pageSize, item_id: this.item_id}).takeUntil(this.unsubscribe).subscribe(res => {
//         this.list = res.data;
//         this.totalItems = res.totalItems;
//         }, err => { });       
//    });   
//   }

    Observable.combineLatest(
      this._api.get('/api/item/get-khuyenmai'),
    ).takeUntil(this.unsubscribe).subscribe(res => {
      this.list_item = res[0];
      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { });
  }
  
  addToCart(it) { 
    this._cart.addToCart(it);
    alert('Thêm thành công!'); 
  }
}
