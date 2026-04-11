import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  loading = true;

  ngOnInit(): void {
    setTimeout(() => this.loading = false, 2000);
  }

  categories = [
    {
      id: 'deditos',
      title: 'Deditos',
      description: 'Queso, bocadillo, mixtos y combinados',
      image: 'assets/products/dqueso.jpg',
    },
    {
      id: 'empanaditas',
      title: 'Empanaditas',
      description: 'Pollo, hawaianas y rancheras',
      image: 'assets/products/epollo.jpg',
    },
    {
      id: 'combos',
      title: 'Combos',
      description: 'Paquetes ideales para eventos y reuniones',
      image: 'assets/products/combos.jpeg',
    },
  ];
}
