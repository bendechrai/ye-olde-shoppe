import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
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
          <li>
            <Link to="/admin/" activeClassName="active">
              Admin
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
