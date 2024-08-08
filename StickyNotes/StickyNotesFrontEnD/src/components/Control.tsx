import colors from '../assets/colors.json';
import Color from "./Colors";
import AddButton from "./AddButton"
 
const Controls = () => {
    return (
        <div id="controls">
            <AddButton />
            {colors.map((color) => (
                <Color key={color.id} color={color} />
            ))}

        </div>
    );
};
 
export default Controls;