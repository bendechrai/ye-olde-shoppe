import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { useAuth0 } from "@auth0/auth0-react"

const Header = ({ siteTitle }) => {
  const { isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0()

  return (
    <header>
      <div>
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="/" activeClassName="active">
                Home
              </Link>
            </li>
            <li hidden={isLoading || !isAuthenticated}>
              <Link to="/admin/" activeClassName="active">
                Admin
              </Link>
            </li>
            <li hidden={isLoading || !isAuthenticated}>
              <button onClick={() => logout()}>Logout</button>
            </li>
            <li hidden={isLoading || isAuthenticated}>
              <button onClick={() => loginWithRedirect()}>Log In</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
