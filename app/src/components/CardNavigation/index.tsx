import { BsHouseDoorFill } from "react-icons/all"
import { Link } from "react-router-dom"
import {CardNavigationContainer} from './style'
export function CardNavigation ({ path, title, icon, text}: any) {
    return (
     
        <CardNavigationContainer>
             <Link to={path}>


            <div className="navContainer">   

            <h2>{title}</h2>
           
            <div className="navBall">
              {icon}
            </div>

            <p>{text}</p>


            </div>
           
            </Link>
        </CardNavigationContainer>
   
    )
}