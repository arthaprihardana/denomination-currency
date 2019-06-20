import _ from "lodash";
import { currency } from "./intl";

const reg = /^\$?((Rp|rp|RP)|(Rp\s|rp\s|RP\s))*([0-9]{1,3}[^\s,]([0-9]{3}[^\s,])*[0-9]{3}|[0-9]+)(,[0-9][0-9])?$/g;
export const fractions = "100000,50000,20000,10000,5000,1000,500,100,50".split(",");

export const checkValue = value => {
    let match = value.match(reg);
    return match !== null;
}

export const denomination = total => {
    let nominal = ["Seratus Ribu Rupiah", "Lima Puluh Ribu Rupiah", "Dua Puluh Ribu Rupiah", "Sepuluh Ribu Rupiah", "Lima Ribu Rupiah", "Seribu Rupiah", "Lima Ratus Rupiah", "Seratus Rupiah", "Lima Puluh Rupiah"]
    let value = [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50];
    let data = [];

    _.map(value, (val, key) => {
        if(parseInt(total / val) > 0) {
            data.push(`${parseInt(total / val)} x ${currency.format(value[key])} (${nominal[key]})`);
        }
        total = total % val;
    });

    return data;
}