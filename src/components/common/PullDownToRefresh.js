var React = require('react');
var { Link } = require('react-router');
var {
  Navbar,
  NavBrand,
  Nav,
  NavItem,
  Image,
  ListGroup
} = require('react-bootstrap');

class PullDownToRefresh extends React.Component {
  render () {
    return (
     <div className="rss-container">
        <div id="ptr">
              <span className="genericon genericon-next"></span>

              <div className="loading">
                  <span id="l1"></span>
                  <span id="l2"></span>
                  <span id="l3"></span>
              </div>
          </div>

         <div id="content">
              Pull down to refresh
            <Link to={this.props.toRoute} className="pull-left">{this.props.message}</Link>
            <div className="elements">
              {this.props.content}
            </div>
          </div>
      </div>
    );
  }
};

module.exports = PullDownToRefresh;