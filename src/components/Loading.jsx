
export default function Loading({type='auth'}){
    return(
        <div id="load-screen">
            <span className={`loader-${type}`}></span>
        </div>
    )
}