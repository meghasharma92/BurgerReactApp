import * as actionTypes from '../actions/actionTypes';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';

const initialState = {
    // ingredients: {
    //     salad: 0,
    //     bacon: 0,
    //     meat: 0,
    //     cheese: 0
    // },
    ingredients: null,
    totalPrice: 4
};

const INGREDIENT_PRICES = {'cheese': 2, 'bacon': 2.5, 'meat' : 1.5, 'salad': 5}

const burgerBuilder = (state = initialState, action) => {
            switch(action.type) {
               case  actionTypes.ADD_INGREDIENT: 
                   return {
                        ...state,
                        ingredients: {
                            ...state.ingredients,
                            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                        },
                        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
                   }
               case actionTypes.REMOVE_INGREDIENT:
                    return {
                        ...state,
                        ingredients: {
                            ...state.ingredients,
                            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                        },
                        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
                   }
                case actionTypes.SET_INGREDIENTS:
                    return {
                        ...state,
                        ingredients: action.ingredients,
                        error: false
                        }
                case actionTypes.FETCH_INGREDIENTS_FAILED:
                            return {
                                ...state,
                                error: true
                                }
               default:
                 return state;
            }
};

export default burgerBuilder;
