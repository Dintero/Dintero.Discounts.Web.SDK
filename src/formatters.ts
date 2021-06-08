import { Configuration } from './types';

export const monetaryString = (amount:number, configuration: Configuration, options?: {
    decimal?: boolean,
    currency?: boolean,
    variant?: 'short'
}) =>{
    const opt = options || {};
    const amountString = amount.toString();
    const dotIndex = amountString.length - configuration.currency.exponent;
    const beforeDot = amountString.slice(0, dotIndex) || '0';
    const afterDot = amountString.slice(dotIndex);
    const exponentAmount =  (afterDot == "00" && !opt.decimal) ? beforeDot : beforeDot + '.' + afterDot;
    if(opt.variant === 'short' && afterDot === '00'){
        return beforeDot + ',-';
    }
    if(!opt.currency){
        return exponentAmount;
    }
    if(configuration.currency.position === 'prefix'){
        return configuration.currency.value + ' ' + exponentAmount
    }
    return exponentAmount + ' '  + configuration.currency.value; 
}

const padZero = (value:number) =>{
    if( value< 10){
        return `0${value}`;
    }
    return value.toString();
}

export const dateString = (isoString: string,  configuration: Configuration) => {
    try{
        const date = new Date(isoString);
        if(configuration.language === 'no'){
            const dd = padZero(date.getDate());
            const mm = padZero(date.getMonth() + 1);
            const yyyy = date.getFullYear();
            return [dd,mm,yyyy].join('.');
        }
        return new Intl.DateTimeFormat().format(date)
    } catch(e) {
        return isoString.substr(0, 10);
    }
}
