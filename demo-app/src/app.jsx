import './css/app.css';
import React from 'react';
import UsaaTemplateTransactional from 'usaa-templates/lib/transactional';
import MyForm from './components/form';


export default class App extends React.Component {
    render() {
        return (
            <UsaaTemplateTransactional title="Quick Edit Demo">
                <MyForm />
            </UsaaTemplateTransactional>
        );
    }
}
