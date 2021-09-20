import * as React from 'react';
import { connect } from 'react-redux';
import Hello from 'my-react-lib';

const Home = () => (
  <div>
    <Hello />
    <h1>Hello, world!</h1>
    <p>Welcome to your new single-page application, built with:</p>
    <ul>
        <li><a href='https://facebook.github.io/react/'>React</a>, <a href='https://redux.js.org/'>Redux</a> and <a href="https://reactrouter.com">React-Router</a></li>
      <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
    </ul>
    <p>To help you get started, we have also set up:</p>
    <ul>
        <li><strong>Redux Store Helper</strong> I added helpers to create stores and reducers more easily.<br/> An example can be found in <code>./features/counter/Counter.tsx, ./store/stores/counterStore.tsx</code></li>
      <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
      <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your configuration produces minified, efficiently bundled JavaScript files.</li>
    </ul>
    <p>The <code>App</code> subdirectory is a standard React application based on the <code>create-react-app</code> template <code>--template redux-typescript</code>. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
  </div>
);

export default connect()(Home);
