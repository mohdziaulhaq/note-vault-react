import React from 'react';
import { Link , useLocation} from 'react-router-dom';

function Header(props){

    const pathName = useLocation().pathname;
    const logo = (<img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" alt="logo"/>);
    return(
       <div className = "header">
        {logo}
        <h3>Note Vault</h3>
        
        <Link to="/about"
        
    className="text-blue-800 hover:text-blue-800 font-medium"
  >
    About
  </Link>

       </div>
    );
}

export default Header;