import { Component } from '@angular/core';
import { DataService } from './data.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export class Product {
  constructor(public name: string, public quantity: number, public cost: number) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

    listOneItems = [];
    listTwoItems = [];
    ItemForm: FormGroup;

    constructor(private ds: DataService,
                private fb: FormBuilder        
    ) { }

    ngOnInit() {
      
      this.ds.refresfNeeded$
      .subscribe(() => {
            this.getListOneItems();
          });
          
      this.getListOneItems();
      this.ItemForm = this.fb.group({
        name: ['', Validators.required],
      });
    }

    getListOneItems()
    {
      this.ds.getItems().subscribe(
        (data) => {
          console.log(data);
          this.listOneItems = data.response;
          console.log(this.listOneItems);
        }
      )
    }

    save() {
      console.log(this.ItemForm);
      console.log('Saved: ' + JSON.stringify(this.ItemForm.value));

      this.ds.saveItem(JSON.stringify(this.ItemForm.value))
        .subscribe(data => {
          this.ItemForm.reset();
        });
    }

    addToBasket($event) {
        // let newProduct: Product = $event.dragData;
        // for (let indx in this.shoppingBasket) {
        //     let product: Product = this.shoppingBasket[indx];
        //     if (product.name === newProduct.name) {
        //         product.quantity++;
        //         return;
        //     }
        // }
        // console.log('adding ' + newProduct);
        // this.shoppingBasket.push(new Product(newProduct.name, 1, newProduct.cost));
    }

    addToListTwo($event) {
      console.log($event.dragData);
      let draggedData = $event.dragData;
      this.ds.addItemToListTwo(draggedData)
      .subscribe( () => {
            this.listTwoItems.push(draggedData);
            console.log(draggedData.ID);
            this.ds.removeItem(draggedData.ID).subscribe();
          })
    }
}
