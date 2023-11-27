import { Component, Input } from '@angular/core';
import { IData } from 'src/app/models/data';
import { CurrencyConverterService } from 'src/app/services/currency-converter.service';

@Component({
  selector: 'app-currency-header',
  templateUrl: './currency-header.component.html',
  styleUrls: ['./currency-header.component.scss'],
})
export class CurrencyHeaderComponent {
  constructor(public currencyConverterService: CurrencyConverterService) {}

  currencyUSD: number | undefined;
  currencyEUR: number | undefined;

  ngOnInit() {
    this.currencyConverterService
      .getCurrency()
      .subscribe((currencyData: IData[]) => {
        this.currencyUSD = Number(currencyData.find((x) => x.cc === 'USD')?.rate);
        this.currencyEUR = Number(currencyData.find((x) => x.cc === 'EUR')?.rate);
        // this.currencyEUR = currencyData.find((x) => x.cc === 'EUR')?.rate;
        this.currencyUSD = Number(this.currencyUSD?.toFixed(2))
        this.currencyEUR = Number(this.currencyEUR?.toFixed(2))
      });
  }
}
