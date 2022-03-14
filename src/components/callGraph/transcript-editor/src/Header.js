import React from 'react';
import style from '../index.module.css';

class Header extends React.Component {
  // to avoid unnecessary re-renders
  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  render() {
    const props = this.props;
    return (
        <>
          <nav className={style.nav}>
            {props.mediaUrl === null ? null : props.mediaControls}
          </nav>
        </>);
  };
}

export default Header;
