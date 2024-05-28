import React, { Component } from 'react';
import Graph from './Graph';
import DataStreamer, { ServerRespond } from './DataStreamer';
import './App.css';

interface IProps {}

interface IState {
    data: ServerRespond[];
    showGraph: boolean;
}

class App extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            data: [],
            showGraph: false,
        };
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    getDataFromServer() {
        const interval = setInterval(() => {
            DataStreamer.getData((serverResponds: ServerRespond[]) => {
                this.setState({
                    data: serverResponds,
                    showGraph: true,
                });
            });
        }, 100);
    }

    renderGraph() {
        if (this.state.showGraph) {
            return (<Graph data={this.state.data} />);
        }
        return null;
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Stock Trader</h1>
                </header>
                <div className="App-content">
                    <button className="btn-start" onClick={() => this.getDataFromServer()}>Start Streaming Data</button>
                    <div className="Graph">
                        {this.renderGraph()}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
