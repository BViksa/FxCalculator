import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency-service.service';
import { Currency } from '../models/currency.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  baseCurrencyList: Array<Currency>;
  destinationCurrencyList: Array<Currency>;

  baseValue: number;
  destinationValue: number;

  baseCurrency: Currency;
  destinationCurrency: Currency;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.getRatesDefault();
  }

  getRatesDefault() {
    this.currencyService.getRatesDefault().subscribe(data => {
      this.baseCurrencyList = this.filterCurrencies(data);
      this.destinationCurrencyList = this.filterCurrencies(data);
      this.baseCurrencyList.unshift({ name: 'EUR', value: 1 });
      this.baseCurrency = this.baseCurrencyList[0];
      this.destinationCurrency = this.destinationCurrencyList[0];
    },
      error => console.log('An error occurred', error));
  }

  getRates(base: string) {
    this.currencyService.getRates(base).subscribe(data => {
      this.destinationCurrencyList = this.filterCurrencies(data);
      this.destinationCurrency = this.destinationCurrencyList[0];
    },
      error => console.log('An error occurred', error));
  }

  onChangeBaseCurrency(selectedCurrency: Currency) {
    this.baseCurrency = selectedCurrency;
    this.getRates(this.baseCurrency.name);
    this.convertDestination();
  }

  onChangeDestinationCurrency(selectedCurrency: Currency) {
    this.destinationCurrency = selectedCurrency;
    this.convertDestination();
  }

  filterCurrencies(arr: Array<Currency>): Array<Currency> {
    return arr.filter(curr => curr.name == 'EUR'
      || curr.name == 'USD' || curr.name == 'GBP' || curr.name == 'AUD' || curr.name == 'CHF'
      || curr.name == 'CAD' || curr.name == 'JPY' || curr.name == 'NZD');
  }

  convertDestination() {
    this.destinationValue = this.baseValue * this.destinationCurrency.value;
  }

  convertBase() {
    this.baseValue = this.destinationValue / this.destinationCurrency.value;
  }

}
