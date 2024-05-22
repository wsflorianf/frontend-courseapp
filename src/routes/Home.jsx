import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Home(){
    return (
        <div id="home" style={{display: "flex", flexDirection: "column", alignItems: "center", gap: '50px'}}>
            <h1>Bienvenido a CourseApp</h1>
            <p>Variedad de cursos en línea en un sólo lugar</p>
            <Link to='login'><Button variant="contained">Comenzar</Button></Link>
        </div>
    )
}