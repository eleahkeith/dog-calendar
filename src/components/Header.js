import "../styles/App.css";
import dogWalkPhone from '../images/dog-walk-phone.png';
import dogWalkSit from '../images/dog-walk-sit.png';

function Header() {

    return (
        <header>
            <div className="text-container">
                <h1>Dog Walk Diary</h1>
                <h2>Track your dog's walks and behavior</h2>
            </div>
            <div className="image-container">
                <img 
                    id="phone" 
                    src={dogWalkPhone} 
                    alt="drawing of woman on her phone walking a dog" />
                <img 
                    id="sit"
                    src={dogWalkSit} 
                    alt="drawing of woman asking her dog to sit" />
            </div>
        </header>
    )
}

export default Header