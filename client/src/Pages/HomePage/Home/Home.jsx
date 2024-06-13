 
import useAuth from "../../../Hooks/useAuth";
import Advertisement from "../Advertisement/Advertisement";
import Banner from "../Banner/Banner";
import Reviews from "../Reviews/Reviews";

const Home = () => {
    const {user}=useAuth();
    console.log(user);
    return (
        <div>
            <Banner></Banner>
            <Advertisement></Advertisement>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;