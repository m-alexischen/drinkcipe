import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeList from '../components/list/RecipeList';
import classes from './Recipes.module.css';

const DUMMY_DATA = [
    { id: '1', drinkName: 'GIN FIZZ', bartender: 'AMY', making: [{ingredient: 'GIN', volume: '2 OUNCES'}, {ingredient: 'LEMON JUICE', volume: '1 OUNCE'}] },
    { id: '2', drinkName: 'COSMO', bartender: 'BEA', making: [{ingredient: 'RUM', volume: '50 ML'}, {ingredient: 'ORANGE JUICE', volume: '15 ML'}] },
    { id: '3', drinkName: 'LONG ISLAND', bartender: 'CATHY', making: [{ingredient: 'VODKA', volume: '1 OUNCE'}, {ingredient: 'SYRUP', volume: '1 OUNCE'}, {ingredient: 'GIN', volume: '1 OUNCE'}] },
    { id: '4', drinkName: 'TEQUILA SUNRISE', bartender: 'DEVON', making: [{ingredient: 'BRANDY', volume: '2 OUNCES'}, {ingredient: 'EGG WHITE', volume: '3 OUNCES'}] },
    { id: '5', drinkName: 'HIGHBALL', bartender: 'ELLE', making: [{ingredient: 'WHISKY', volume: '15 ML'}, {ingredient: 'CLUB SODA', volume: '20 ML'}, {ingredient: 'TRIPLE SEC', volume: '10 ML'}, {ingredient: 'CRANBERRY JUICE', volume: '30 ML'}] },
    { id: '6', drinkName: 'MOSCOW MULE', bartender: 'FRANNY', making: [{ingredient: 'VODKA', volume: '2 OUNCES'}, {ingredient: 'GINGER BEER', volume: '3 OUNCES'}] },
    { id: '7', drinkName: 'MOJITO', bartender: 'GIVEON', making: [{ingredient: 'WHITE RUM', volume: '2 OUNCES'}, {ingredient: 'MINT', volume: '10 LEAVES'}, {ingredient: 'SUGAR', volume: '2 TABLESPOONS'}, {ingredient: 'CLUB SODA', volume: '1/2 CUP'}] },
    { id: '8', drinkName: 'BEER MARGARITAS', bartender: 'HARVEY', making: [{ingredient: 'LEMONADE', volume: '12 OUNCES'}, {ingredient: 'TEQUILA', volume: '12 OUNCES'}, {ingredient: 'BEER', volume: '12 OUNCES'}, {ingredient: 'LIME', volume: '1 WEDGE'}] },
    { id: '9', drinkName: 'NEGRONI', bartender: 'IVY', making: [{ingredient: 'GIN', volume: '1 OUNCE'}, {ingredient: 'CAMPARI', volume: '1 OUNCE'}, {ingredient: 'VERMOUTH', volume: '1 OUNCE'}] },
    { id: '10', drinkName: 'OLD FASHIONED', bartender: 'JASON', making: [{ingredient: 'SIMPLE SYRUP', volume: '2 TEASPOONS'}, {ingredient: 'BITTERS', volume: '2 DASHES'}, {ingredient: 'WHISKY', volume: '1.5 OUNCES'}, {ingredient: 'ORANGE', volume: '1 SLICE'}, {ingredient: 'WATER', volume: '1 TEASPOON'}] },
    { id: '11', drinkName: 'GIN TONIC', bartender: 'KEVIN', making: [{ingredient: 'GIN', volume: '2 OUNCES'}, {ingredient: 'TONIC WATER', volume: '4 OUNCES'}, {ingredient: 'LIME JUICE', volume: '1 TABLESPOON'}, {ingredient: 'LIME', volume: '1 WEDGE'}] },
    { id: '12', drinkName: 'SCREWDRIVER', bartender: 'LEO', making: [{ingredient: 'VODKA', volume: '1.5 OUNCES'}, {ingredient: 'ORANGE JUICE', volume: '6 OUNCES'}] },
    { id: '13', drinkName: 'MANHATTAN', bartender: 'MOLLY', making: [{ingredient: 'WHISKY', volume: '2 OUNCES'}, {ingredient: 'VERMOUTH', volume: '1 OUNCE'}, {ingredient: 'BITTERS', volume: '3 DASHES'}] },
    { id: '14', drinkName: 'MARTINI', bartender: 'NANCY', making: [{ingredient: 'GIN', volume: '2.5 OUNCES'}, {ingredient: 'VERMOUTH', volume: '1/2 OUNCE'}, {ingredient: 'ORANGE BITTERS', volume: '1 DASH'}] },
    { id: '15', drinkName: 'DAIQUIRI', bartender: 'OLIVER', making: [{ingredient: 'RUM', volume: '2 OUNCES'}, {ingredient: 'LIME JUICE', volume: '1 OUNCE'}, {ingredient: 'SIMPLE SYRUP', volume: '3/4 OUNCE'}] },
    { id: '16', drinkName: 'TOM COLLINS', bartender: 'PAIGE', making: [{ingredient: 'GIN', volume: '2 OUNCES'}, {ingredient: 'LIME JUICE', volume: '1 OUNCE'}, {ingredient: 'SIMPLE SYRUP', volume: '1/2 OUNCE'}, {ingredient: 'CLUB SODA', volume: '1/2 OUNCE'}] },
    { id: '17', drinkName: 'PALOMA', bartender: 'QUINCY', making: [{ingredient: 'TEQUILA', volume: '2 OUNCES'}, {ingredient: 'LIME JUICE', volume: '1/2 OUNCE'}, {ingredient: 'GRAPEFRUIT SODA', volume: '1 OUNCE'}] },
    { id: '18', drinkName: 'SIDECAR', bartender: 'RUDY', making: [{ingredient: 'COGNAC', volume: '1.5 OUNCES'}, {ingredient: 'COINTREAU', volume: '3/4 OUNCE'}, {ingredient: 'LEMON JUICE', volume: '3/4 OUNCE'}] },
    { id: '19', drinkName: 'IRISH COFFEE', bartender: 'SAM', making: [{ingredient: 'WHISKY', volume: '1.5 OUNCES'}, {ingredient: 'BROWN SUGAR', volume: '2 TEASPOONS'}, {ingredient: 'COFFEE', volume: '2 OUNCE'}] },
    { id: '20', drinkName: 'LEMON DROP', bartender: 'TAN', making: [{ingredient: 'VODKA', volume: '2 OUNCES'}, {ingredient: 'TRIPE SEC', volume: '1/2 OUNCE'}, {ingredient: 'LEMON JUICE', volume: '1 OUNCE'}, {ingredient: 'SIMPLE SYRUP', volume: '1 OUNCE'}, {ingredient: 'SUGAR', volume: 'GARNISH RIM'}] },
];

const Recipes = () => {
    const navigate = useNavigate();
    const [searchInput, setsearchInput] = useState('');

    const buttonHandler = () => {
        navigate('/add-your-twist');
    };

    const changeHandler = (event) => {
        event.preventDefault();
        setsearchInput(event.target.value);
    };

    const filteredSearch = DUMMY_DATA.filter((recipe) => (
        recipe.drinkName.toLowerCase().includes(searchInput.toLowerCase()) ||
        recipe.bartender.toLowerCase().includes(searchInput.toLowerCase())
    ));

    return (
        <div>
            <div className={classes.row}>
                <input
                    type='search'
                    placeholder='Search by Drink Name or Bartender'
                    value={searchInput}
                    onChange={changeHandler}
                />
                <span>Create a DRINK-CIPE!</span>
                <button type='button' onClick={buttonHandler}>+</button>
            </div>
            <RecipeList filtered={filteredSearch} />
        </div>
    )
};

export default Recipes;