/**
 * Shared interfaces relating to Meals and Foods
*/

export interface IMeal {
    name: string;
    totCarbs: number;
    creator: string
    foodItems: IFoodItem[];
}

export interface IFoodItem {
    foodName: string;
    foodBrand?: string;
    servingCarbs: number;
    totServings: number;
    
}