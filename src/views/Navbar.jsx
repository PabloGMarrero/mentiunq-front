import './Navbar.css'

const TopNavbar = () => {
    return(
        <div className='horizontal'>
            <div>
                <h4>My first presentation</h4>
                <h7>Created by</h7>
            </div>
            <div className='horizontal'>
                <p>Saved</p>
                <p>Help</p>
                <p>Profile</p>
                <p>Share</p>
                <p>Present</p>
            </div>
        </div>
    )
}

const BottomNavbar = () => {
    return(
        <div className='horizontal'>
            <div className='horizontal'>
                <p>+New slide</p>
                <p>Import</p>
            </div>
            <div className='horizontal'>
                <p>Examples</p>
                <p>Themes</p>
                <p>Settings</p>
            </div>
        </div>
    )
}


const Navbar = () => {
    return (    
        <>
            <TopNavbar/>
            <BottomNavbar/>
        </>
    )        
}

export default Navbar;