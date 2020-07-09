import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';

function TopBar({ feedsStore }) {
	return (
		<Navbar bg={feedsStore.darkmode != true ? 'primary' : 'secondary'} expand="lg" variant="dark">
			<Navbar.Brand>
				<Link style={{ color: 'white', textDecoration: 'none' }} to="/">
					News
				</Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="https://amit-ghosh.com/" style={{ color: 'white', textDecoration: 'none' }}>
						Portfolio
					</Nav.Link>

					<Link
						style={{ color: 'white', textDecoration: 'none' }}
						className="nav-item nav-link active"
						to="/settings"
					>
						Settings
					</Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default observer(TopBar);
