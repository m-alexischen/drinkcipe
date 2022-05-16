import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllRatings } from '../../../lib/api';
import Card from '../../../UI/Card/Card';
import classes from './UserRatings.module.css';

const UserRatings = () => {
    const [oneStar, setOneStar] = useState(0);
    const [twoStar, setTwoStar] = useState(0);
    const [threeStar, setThreeStar] = useState(0);
    const [fourStar, setFourStar] = useState(0);
    const [fiveStar, setFiveStar] = useState(0);

    const params = useParams();

    useEffect(() => {
        getAllRatings(params.recipeId).then(ratings => {
            setOneStar(ratings.oneStar);
            setTwoStar(ratings.twoStar);
            setThreeStar(ratings.threeStar);
            setFourStar(ratings.fourStar);
            setFiveStar(ratings.fiveStar);
        });
    },[params])

    const userAmount = oneStar + twoStar + threeStar + fourStar + fiveStar;

    const averageRating = ((oneStar + (2 * twoStar) + (3 * threeStar) + (4 * fourStar) + (5 * fiveStar)) / userAmount).toFixed(1);

    return (
        <div className={classes.card}>
            <Card>
                <p>&#127775; : {oneStar}       &#127775;&#127775; : {twoStar}       &#127775;&#127775;&#127775; : {threeStar}       &#127775;&#127775;&#127775;&#127775; : {fourStar}       &#127775;&#127775;&#127775;&#127775;&#127775; : {fiveStar}</p>
                <span>Average rating of {userAmount} bartenders: {averageRating}/5.0</span>
            </Card>
        </div>
    )
};

export default UserRatings;