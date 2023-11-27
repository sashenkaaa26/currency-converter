import { Component } from '@angular/core';
import { IData } from 'src/app/models/data';
import { CurrencyConverterService } from 'src/app/services/currency-converter.service';
import { UAH_CODE, USD_CODE, EUR_CODE } from 'src/constants';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent {
  constructor(public currencyConverterService: CurrencyConverterService) {}
  convertedValue = 0;
  convertedValue2 = 0;
  currencyData!: IData[];
  selectedCurrency1 = 'UAH';
  selectedCurrency2 = 'UAH';

  ngOnInit() {
    this.currencyConverterService
      .getCurrency()
      .subscribe((currencyData: any[]) => {
        this.currencyData = currencyData;
      });
  }

  onInputChange(): any {
    if (this.convertedValue == null || this.convertedValue == 0) {
      this.convertedValue2 = 0;
    } else if (this.convertedValue > 0) {
      if (this.selectedCurrency1 == UAH_CODE) {
        if (this.selectedCurrency2 == UAH_CODE) {
          this.convertedValue2 = this.convertedValue;
        } else if (this.selectedCurrency2 == USD_CODE) {
          let rate = this.getCurrencyRate(USD_CODE);
          this.convertedValue2 = this.convertedValue / rate;
        } else if (this.selectedCurrency2 == EUR_CODE) {
          let rate = this.getCurrencyRate(EUR_CODE);
          this.convertedValue2 = this.convertedValue / rate;
        }
      } else if (this.selectedCurrency1 == USD_CODE) {
        if (this.selectedCurrency2 == UAH_CODE) {
          let rate = this.getCurrencyRate(USD_CODE);
          this.convertedValue2 = this.convertedValue * rate;
        } else if (this.selectedCurrency2 == USD_CODE) {
          this.convertedValue2 = this.convertedValue;
        } else if (this.selectedCurrency2 == EUR_CODE) {
          let rate = this.getCurrencyRate(EUR_CODE);
          let rate2 = this.getCurrencyRate(USD_CODE);
          this.convertedValue2 = (this.convertedValue * rate2) / rate;
        }
      } else if (this.selectedCurrency1 == EUR_CODE) {
        if (this.selectedCurrency2 == UAH_CODE) {
          let rate = this.getCurrencyRate(EUR_CODE);
          this.convertedValue2 = this.convertedValue * rate;
        } else if (this.selectedCurrency2 == EUR_CODE) {
          this.convertedValue2 = this.convertedValue;
        } else if (this.selectedCurrency2 == USD_CODE) {
          let rate = this.getCurrencyRate(USD_CODE);
          let rate2 = this.getCurrencyRate(EUR_CODE);
          this.convertedValue2 = (this.convertedValue * rate2) / rate;
        }
      }

      this.convertedValue2 = Number(this.convertedValue2.toFixed(2));
    }
  }

  onInputChange2(): any {
    if (this.convertedValue2 == null || this.convertedValue2 == 0) {
      this.convertedValue = 0;
    } else if (this.convertedValue2 > 0) {
      if (this.selectedCurrency1 == UAH_CODE) {
        if (this.selectedCurrency2 == UAH_CODE) {
          this.convertedValue = this.convertedValue2;
        } else if (this.selectedCurrency2 == USD_CODE) {
          console.log(this.selectedCurrency2);
          let rate = this.getCurrencyRate(USD_CODE);
          this.convertedValue = this.convertedValue2 * rate;
        } else if (this.selectedCurrency2 == EUR_CODE) {
          let rate = this.getCurrencyRate(EUR_CODE);
          this.convertedValue = this.convertedValue2 * rate;
        }
      } else if (this.selectedCurrency1 == USD_CODE) {
        if (this.selectedCurrency2 == UAH_CODE) {
          let rate = this.getCurrencyRate(USD_CODE);
          this.convertedValue = this.convertedValue2 / rate;
        } else if (this.selectedCurrency2 == EUR_CODE) {
          let rate = this.getCurrencyRate(EUR_CODE);
          let rate2 = this.getCurrencyRate(USD_CODE);
          this.convertedValue = (this.convertedValue2 / rate2) * rate;
        } else if (this.selectedCurrency2 == USD_CODE) {
          this.convertedValue = this.convertedValue2;
        }
      } else if (this.selectedCurrency1 == EUR_CODE) {
        if (this.selectedCurrency2 == UAH_CODE) {
          let rate = this.getCurrencyRate(EUR_CODE);
          this.convertedValue = this.convertedValue2 / rate;
        } else if (this.selectedCurrency2 == USD_CODE) {
          let rate = this.getCurrencyRate(USD_CODE);
          let rate2 = this.getCurrencyRate(EUR_CODE);
          this.convertedValue = (this.convertedValue2 / rate2) * rate;
        } else if (this.selectedCurrency2 == EUR_CODE) {
          this.convertedValue = this.convertedValue2;
        }
      }

      this.convertedValue = Number(this.convertedValue.toFixed(2));
    }
  }

  private getCurrencyRate(currencyCode: string): number {
    return Number(this.currencyData.find((x) => x.cc === currencyCode)?.rate);
  }

  onSelected1(value: string): void {
    this.selectedCurrency1 = value;
    this.onInputChange();
  }
  onSelected2(value: string): void {
    this.selectedCurrency2 = value;
    this.onInputChange2();
  }
}
