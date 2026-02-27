import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  categories = [
    {
      id: 'fritos',
      title: 'Fritos',
      description: 'Para ahorrarte la fritada, listos para consumir',
      image: 'assets/products/fritos.jpeg',
    },
    {
      id: 'congelados',
      title: 'Congelados',
      description: 'Si quieres guardar para preparar más tarde',
      image: 'assets/products/congelados.PNG',
    },
    {
      id: 'combos',
      title: 'Combos',
      description: 'Ideales para eventos y reuniones',
      image: 'assets/products/combos.jpeg',
    },
  ];
}
