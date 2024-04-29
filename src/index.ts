import { MY_NUM } from "./module.js";

console.warn(MY_NUM)

interface PriceInput {
    price: number;
    discount: number;
    isInstallment: boolean;
    months: number;
}

const totalPrice = ({ price, discount, isInstallment, months }: PriceInput): number => {
    const discountedPrice = price * (1 - discount / 100);

    if (isInstallment && months > 0) {
        return discountedPrice / months;
    } else {
        return discountedPrice;
    }
};

const price = totalPrice({ price: 100000, discount: 25, isInstallment: true, months: 12 });
console.log(price);
//test

// 6250
