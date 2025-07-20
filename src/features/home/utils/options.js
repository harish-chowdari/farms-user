import { dairyMain, fruitsMain, grainsMain, herbsMain, vegetablesMain } from "../../../assets";

const categories = [
    { name: "Fresh Fruits", img: fruitsMain, count: "50+ Items", color: "bg-red-50 hover:bg-red-100" },
    { name: "Vegetables", img: vegetablesMain, count: "80+ Items", color: "bg-emerald-50 hover:bg-emerald-100" },
    { name: "Dairy Products", img: dairyMain, count: "30+ Items", color: "bg-orange-50 hover:bg-orange-100" },
    // { name: "Organic", img: fruitsMain, count: "40+ Items", color: "bg-green-50 hover:bg-green-100" },
    { name: "Herbs & Spices", img: herbsMain, count: "25+ Items", color: "bg-emerald-50 hover:bg-emerald-100" },
    { name: "Grains & Pulses", img: grainsMain, count: "35+ Items", color: "bg-yellow-50 hover:bg-yellow-100" }
];

export { categories };