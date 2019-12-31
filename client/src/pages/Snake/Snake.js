import React, { Component, Fragment } from 'react';

import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import Text from '../../components/UI/text';
import Button from '../../components/UI/buttonSolid';
import NotValid from '../../components/Error/notValid/notValid';
import Unauth from '../Error/Unauthorized/Unauthorized';
import './Snake.css';

const InitialState = {
    speed: 100,
    direction: 'right',
    size: 10,
    position: [
        [6, 4], [5, 4], [4, 4]
    ],
    gameOver: false,
    apple: [0, 0]
};

class Snake extends Component {
    constructor(props) {
        super(props);
        this.state = InitialState;
    }

    componentDidMount() {
        if (!localStorage.getItem('isLogedin')) {
            return <Redirect to='/' />
        }
        this._context = this.refs.canvas.getContext('2d');
        this.init();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getContainerSize = () => {
        return {
            width: 700,
            height: 500
        }
    }

    setPosition = (direction, lastPosition) => {
        const size = this.getContainerSize()
        const surfaceWidth = parseInt(size.width / this.state.size, 10);
        const surfaceHeight = parseInt(size.height / this.state.size, 10);

        switch (direction) {
            case 'left':
                if (lastPosition[0] - 1 === -1) {
                    return ([surfaceWidth, lastPosition[1]]);
                }
                return ([lastPosition[0] - 1, lastPosition[1]]);
            case 'up':
                if (lastPosition[1] - 1 === -1) {
                    return ([lastPosition[0], surfaceHeight]);
                }
                return ([lastPosition[0], lastPosition[1] - 1]);
            case 'right':
                if (lastPosition[0] + 1 > surfaceWidth) {
                    return ([0, lastPosition[1]]);
                }
                return ([lastPosition[0] + 1, lastPosition[1]]);
            case 'down':
                if (lastPosition[1] + 1 > surfaceHeight) {
                    return ([lastPosition[0], 0]);
                }
                return ([lastPosition[0], lastPosition[1] + 1]);
            default:
                return (lastPosition);
        }
    };

    init = () => {
        this.focusInput();
        this.setState({
            ...InitialState,
            apple: this.generateApplePosition()
        });

        this.interval = setInterval(this.gameLoop, this.state.speed);
    };

    handleKeyDown = (event) => {
        event.preventDefault();
        const keys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        const direction = keys[event.which];
        if (direction) {
            if (this.state.direction === 'left' & direction === 'right' ||
                this.state.direction === 'up' & direction === 'down' ||
                this.state.direction === 'right' & direction === 'left' ||
                this.state.direction === 'down' & direction === 'up') {
                return;
            }
            this.setState({ ...this.state, direction });
        }
    };

    focusInput = () => {
        this.refs.input.focus();
    };

    drawApple = () => {
        const { size, apple } = this.state;

        this._context.save();
        this._context.fillStyle = '#b3b3b3';
        this._context.beginPath();
        const radius = size / 2;
        const x = apple[0] * size + radius;
        const y = apple[1] * size + radius;
        this._context.arc(x, y, radius, 0, Math.PI * 2, true);
        this._context.fill();
        this._context.restore();
    };

    drawElement = (position) => {
        const { size } = this.state;

        const x = size * position[0];
        const y = size * position[1];
        this._context.fillRect(x, y, size, size);
    };

    drawSnake = () => {
        const { position } = this.state;

        this._context.save();
        this._context.fillStyle = '#b3b3b3';

        position.forEach(this.drawElement);

        this._context.restore();
    };


    generateApplePosition = () => {
        const size = this.getContainerSize();
        const surfaceWidth = parseInt(size.width / this.state.size, 10);
        const surfaceHeight = parseInt(size.height / this.state.size, 10);

        return ([
            Math.floor(Math.random() * surfaceWidth),
            Math.floor(Math.random() * surfaceHeight)
        ]);
    };

    advance = () => {
        const { direction } = this.state;
        const position = this.state.position.slice(0, this.state.position.length - 1);
        const currentPosition = this.state.position[0];
        const newPosition = this.setPosition(direction, currentPosition);

        if (_.isEqual(currentPosition, this.state.apple)) {
            this.setState({
                ...this.state,
                apple: this.generateApplePosition(),
                position: [newPosition, ...this.state.position]
            });
        } else {
            position.forEach((element) => {
                if (_.isEqual(newPosition, element)) {
                    this.setState({ ...this.state, gameOver: true });
                }
            });
            this.setState({ ...this.state, position: [newPosition, ...position] });
        }
    };

    gameLoop = () => {
        const size = this.getContainerSize()
        const surfaceWidth = parseInt(size.width, 10);
        const surfaceHeight = parseInt(size.height, 10);

        this._context.clearRect(0, 0, surfaceWidth, surfaceHeight);
        this.advance();
        this.drawSnake();
        this.drawApple();

        if (this.state.gameOver) {
            clearInterval(this.interval);
        }
    };

    mobileClickHandler = () => {
        this.props.history.goBack();
    }

    render() {
        const Unauthorized = <Unauth />

        const size = this.getContainerSize();

        const style = {
            position: 'absolute',
            width: 0, height: 0,
            outline: '0 !important',
            border: 'none'
        };

        const score = this.state.position.length;

        const GameOver = <main className={'game_over_main'}>
            <div className={'game_over_screen'}>
                <Text>Game Over!</Text><br /><br />
                <Text children={`Score: ${score}`} /><br /><br />
                <Link to={'/profile'}><Button>Profile</Button></Link>
            </div>
        </main>;

        const Page = <Fragment>
            <div className={'snake_mobile'}>
                <NotValid children={'This game is not modiefied for mobile!'}
                    onClick={this.mobileClickHandler}
                />
            </div>
            <div className={'body-main_snake'}>
                <input style={style} ref="input" type="text" onKeyDown={this.handleKeyDown} />
                <canvas
                    className={'snake-canvas'}
                    ref="canvas"
                    onKeyDown={this.handleKeyDown}
                    onClick={this.focusInput}
                    width={size.width}
                    height={size.height}
                />
            </div>
        </Fragment>;

        const Content = !localStorage.getItem('isLogedin') ? Unauthorized :
            this.state.gameOver ? GameOver : Page;

        return Content;
    }
}

export default Snake;