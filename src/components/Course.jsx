import { useContext } from "react"
import { Context } from "../auth/AuthContext"
import { Rating } from "@mui/material"
import { StarTwoTone } from "@mui/icons-material"

const Course = ({name='Course', description='Course description', image='/src/assets/course-test.png', url='https://www.google.com', page="none", palette, score})=>{

    const { user } = useContext(Context)
    const clicked = ()=>{
        fetch('http://localhost:5000/register_click',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                user_id: user.uid,
                page: url,
                element_id: name,
                extra_info: {}
            })
        })
    }

    return(
        <a onClick={clicked} target="_blank" className="course-ref" href={url}>
        <div style={{backgroundColor: palette.palette.primary.secondColor}} className="course">
            <img loading="lazy" className="course-image" src={image} alt="course-image" />
            <img className="site-icon" src={`/src/assets/${page}-logo.jpg`}></img>
            <Rating sx={{position: 'absolute', top: '150px', right: '10px'}} className="score-course" icon={<StarTwoTone  fontSize="inherit" />} readOnly value={score}></Rating>
            <div style={{color: palette.palette.primary.contrastTextI}} className="course-info">
                <div>
                <h3>{name}</h3>
                </div>
                <hr></hr>
                <p>{description}</p>

            </div>
        </div>
        </a>
    )
}

export default Course;