
import './404.css';
import error404 from '../img/404 error lost in space.gif'


const PageNotFound = () => {

    return (


        <main>
            <div className="Page_404" >
                <div className="svg">
                    <img src={error404} alt="404 page not found" />
                </div>
                <div className="content">
                <h1>404 Page</h1>
                <h2>Oops, Lost in Flavorland!</h2>
                </div>
                
            </div>


        </main>


    )

}

export default PageNotFound