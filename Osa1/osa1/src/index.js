import React from 'react';
import ReactDOM from 'react-dom';

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
);


/*
class App extends React.Component {
    constructor() {
        super()
        this.state = {
            vasen: 0,
            oikea: 0,
            kaikki: []
        }
    }

    clickLeft = () => {
        this.setState({
            vasen: this.state.vasen + 1,
            kaikki: this.state.kaikki.concat('v')
        })
    }

    clickRight = () => {
        this.setState({
            oikea: this.state.oikea + 1,            
            kaikki: this.state.kaikki.concat('o')
        })
    }

    render() {
        const historia = () => {
            if (this.state.kaikki.length === 0) {
                return (
                    <div>
                        <em>Sovellusta käytetään nappien avulla</em>
                    </div>
                )
            }            
            return (                
                <div>
                    näppäilyhistoria: {this.state.kaikki.join(' ')}
                </div>
            )            
        }
        return (            
            <div>
                <div>
                    {this.state.vasen}
                    <button onClick={this.clickLeft}>vasen</button>
                    <button onClick={this.clickRight}>oikea></button>                    
                    {this.state.oikea}
                    <div>{historia()}</div>
                </div>
            </div>
        )    
    }
}

ReactDOM.render( <App />, document.getElementById('root') )
*/

/* TAPAHTUMANKÄSITTELY
// nuolifunktio
const Display = ({ counter }) => <div>{counter}</div>

// nuolifunktio, jolla monirivinen return-koodi. eli käytä sulkuja silloin
const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)    

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            counter: 1
        }        
    }

    asetaArvoon = (arvo) => {
        return () => {
            this.setState({ counter: arvo})
        }        
    }    
    
    render() {
        return (
            <div>
                <Display counter={this.state.counter} />
                <div>
                    <Button
                        handleClick={ this.asetaArvoon(this.state.counter + 1) }
                        text="Plus" 
                    />
                    <Button
                        handleClick={ this.asetaArvoon(this.state.counter - 1) }
                        text="Minus" 
                    />
                    <Button
                        handleClick={ this.asetaArvoon( 0 ) }
                        text="Reset" 
                    />
                </div>
            </div>
        )
    }
}

ReactDOM.render( <App />, document.getElementById('root') )
*/


/* TILALLINEN KOMPONENTTI
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 1
        }
    
        setInterval(() => {
            this.setState({ counter: this.state.counter + 1 })
        }, 1000)
    }

    render() {
        console.log('renderöi' , this.state.counter)
        return (
            <div>{this.state.counter}</div>
        )
    }    
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
*/

/*
class Hello extends React.Component {
    render() {
        const {name, age} = this.props        
        const bornYear = () => new Date().getFullYear() - age
        return (
            <div>
                <p>Hello {name}, you are {age} years old</p>
                <p>So you were probably born {bornYear()}</p>
            </div>
        )
    }    
}

const App = () => {
    const nimi = 'Janne'
    const ika = 39
    return (
        <div>
            <h1>Greetings</h1>
            <Hello name={nimi} age={ika}/>
        </div>
    )
}
    
ReactDOM.render(<App />, document.getElementById('root'))
*/