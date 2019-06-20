import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import _ from 'lodash';
import App from './routes';
import {
  Home
} from "./containers";
import {checkValue, denomination} from './helpers/fractions';
import { currency } from "./helpers/intl";

const supportsHistory = 'pushState' in window.history;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter forceRefresh={!supportsHistory}>
      <App />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe(Home, () => {
  it('test case valid input amount. etc: 18.215, Rp17500, Rp17.500,00, Rp 120.325, 005.000, 001000', () => {
    let valid = "18.215|Rp17500|Rp17.500,00|Rp 120.325|005.000|001000".split("|");
    _.map(valid, v => expect(checkValue(v)).toBe(true));
  })

  it('test case invalid input amount. etc: 17,500, 2 500, 3000 Rp, Rp ', () => {
    let invalid = "17,500|2 500|3000 Rp|Rp ".split("|");
    _.map(invalid, v => expect(checkValue(v)).toBe(false));
  })

  it('test case denomination amount. example: input = 18.215, result = ["1 x Rp 10.000,00 (Sepuluh Ribu Rupiah)","1 x Rp 5.000,00 (Lima Ribu Rupiah)","3 x Rp 1.000,00 (Seribu Rupiah)","2 x Rp 100,00 (Seratus Rupiah)"]', () => {
      let value = "18.215".split(/[Rp.]/).join("");
      let d = denomination(value);
      expect(d).toStrictEqual(["1 x Rp 10.000,00 (Sepuluh Ribu Rupiah)","1 x Rp 5.000,00 (Lima Ribu Rupiah)","3 x Rp 1.000,00 (Seribu Rupiah)","2 x Rp 100,00 (Seratus Rupiah)"])
  })
})