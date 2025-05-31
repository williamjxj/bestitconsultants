import React from 'react';
import Layout from './layout';

const HomePage: React.FC = () => {
    return (
        <Layout>
            <h1 className="text-4xl font-bold text-center mt-10">Welcome to Best IT Consultants</h1>
            <p className="text-lg text-center mt-4">Your one-stop solution for all IT consulting needs.</p>
        </Layout>
    );
};

export default HomePage;