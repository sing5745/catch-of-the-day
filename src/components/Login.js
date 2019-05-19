import React from 'react';

const Login = (props) => (
    <nav className="login">
        <h2>Inventory Login</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => props.authenticate('Github')}>Login In with Github</button>
        <button className="facebook" onClick={() => props.authenticate('Facebook')}>Login In with Facebook</button>
        <button className="twitter" onClick={() => props.authenticate('Twitter')}>Login In with Twitter</button>
    </nav>
);

export default Login;