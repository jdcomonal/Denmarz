
const Contact = () => {

    return(

        <div className="Contact">
            <main>
                <div className="contact">
                    <h2>Contact page</h2>
                    <form action="/action_page.php">
                    <label for="fname">First name:</label><br />
                    <input type="text" id="fname" name="fname" value="John" /><br />
                    <label for="lname">Last name:</label><br />
                    <input type="text" id="lname" name="lname" value="Doe" /><br /><br />
                    <input type="submit" value="Submit" />
                </form> 

                </div>
                

            </main>
            
        </div>

    )

}

export default Contact