export class Product {
  id: number=0;
  sku: string = '';
  name: string = '';
  description: string = '';
  unit_price : number = 0;
  image_url: string = '';
  active: boolean = true;
  units_in_stock: number = 0;
  dateCreated: Date = new Date();
  lastUpdated: Date = new Date();

}
