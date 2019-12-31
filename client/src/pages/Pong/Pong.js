import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';

import Text from '../../components/UI/text';
import Button from '../../components/UI/buttonSolid';
import NotValid from '../../components/Error/notValid/notValid';
import Unauth from '../Error/Unauthorized/Unauthorized';
import './Pong.css';

class Pong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStarted: false,
            score: [0, 0],
            playerY: 50,
            opponentY: 40,
            playerSpeed: 0,
            interval: null,
            gameOver: false,
            ball: {
                ballX: 50,
                ballY: 50,
                ballSpeedX: 0.4,
                ballSpeedY: 0.2,
                radius: 0.8
            }
        };
    }

    handleRoundStart = () => {
        if (this.state.interval) return;
        this.setState({
            interval: setInterval(this.ballMove, 10),
            isStarted: true
        });
    };

    handlePlayerMove = event => {
        let yPercent = (event.clientY * 100) / window.innerHeight - 10;
        const speed = (event.movementY * 100) / window.innerHeight;
        if (yPercent <= 0) {
            yPercent = 0;
        } else if (yPercent > 80) {
            yPercent = 80;
        }
        this.setState({
            playerY: yPercent,
            playerSpeed: speed
        });
    };

    ballMove = () => {
        //opponent movement is also handled here
        let { radius, ballX, ballY, ballSpeedX, ballSpeedY } = this.state.ball;
        const radiusY = (radius * window.innerWidth) / window.innerHeight;
        let { playerY, opponentY } = this.state;
        if (ballX > 98 - radius - ballSpeedX) {
            if (
                ballSpeedX > 0 &&
                ballX > radius &&
                ballY > opponentY - 2 * radius &&
                ballY < opponentY + 20 + 2 * radius
            ) {
                if (ballY < opponentY - radius) {
                    this.cornerBounce();
                } else if (ballY > opponentY + 20 + radius) {
                    this.cornerBounce("top");
                }
                return this.BounceX("right");
            } else if (ballX > 100) {
                return this.scorePoint(true);
            }
        } else if (ballX < 2 + radius - ballSpeedX) {
            if (
                ballSpeedX < 0 &&
                ballY > playerY - 2 * radius &&
                ballY < playerY + 20 + 2 * radius
            ) {
                if (ballY < playerY - radius) {
                    this.cornerBounce("top");
                } else if (ballY > playerY + 20 + radius) {
                    this.cornerBounce();
                }
                return this.BounceX("left");
            } else if (ballX < 0 + ballSpeedX) {
                return this.scorePoint();
            }
        }
        if (
            (ballSpeedY > 0 && ballY > 100 - radiusY - ballSpeedY) ||
            (ballSpeedY < 0 && ballY < radiusY + ballSpeedY)
        ) {
            return this.BounceY();
        }
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        const ball = { ...this.state.ball, ...{ ballX: ballX, ballY: ballY } };
        let opponentSpeed = Math.min(ballSpeedY * 0.8, 1.2);
        opponentY += opponentSpeed;
        if (opponentY < 0) opponentY = 0;
        else if (opponentY > 80) opponentY = 80;
        this.setState({
            ball: ball,
            opponentY: opponentY,
        });
    };

    BounceY = () => {
        this.animateBounce();
        const ball = {
            ...this.state.ball,
            ballSpeedY: -this.state.ball.ballSpeedY
        };
        this.setState({
            ball: ball
        });
    };

    animateBounce = side => {
        const { ballSpeedX, ballSpeedY } = this.state.ball;
        const absSpeedX = Math.abs(ballSpeedX);
        const absSpeedY = Math.abs(ballSpeedY);
        const x = document.head.querySelector("#anim");
        if (x) x.remove(); //delete previous stylesheet with animation
        let angle = (absSpeedY * 3.14 * 57) / absSpeedX / 4; //arctan approximation to get the angle
        angle = Math.min(angle, 60);
        if (ballSpeedY > 0) {
            if (ballSpeedX > 0) angle *= -1;
        } else {
            if (ballSpeedX < 0) angle *= -1;
        }
        let scale = Math.min(1 + absSpeedX / 4, 2); //stretch coefficient
        const color =
            side === "left" ? "purple" : side === "right" ? "#666600" : "#595959";
        const animId = ((ballSpeedX + ballSpeedY) * 100).toFixed(0); //generate unique animation name
        const animSheet = document.createElement("style");
        animSheet.setAttribute("id", "anim");
        document.head.appendChild(animSheet);
        animSheet.innerHTML = `
        @keyframes bounce-animation${animId} {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1, 1);
            background-color: black;
          }
          20% {
            transform: translate(-50%, -50%) rotate(${angle}deg) scale(${scale}, ${1 /
            scale});
            background-color: ${color};
  
          }
          100% {
            transform: translate(-50%, -50%) rotate(${angle}deg) scale(1, 1);
            background-color: black;
          }
        }`;
        this.setState({
            ball: { ...this.state.ball }
        });
    };

    BounceX = side => {
        const { ballSpeedX, ballSpeedY } = this.state.ball;
        const newSpeedX = ballSpeedX * -1.05;
        const newSpeedY =
            ballSpeedY + (side === "left" ? this.state.playerSpeed : ballSpeedY) / 20;
        const ball = {
            ...this.state.ball,
            ...{ ballSpeedX: newSpeedX, ballSpeedY: newSpeedY }
        };
        this.setState({
            ball: ball
        });
        setTimeout(() => {
            this.setState({ animate: [false, false] });
        }, 300);
    };

    cornerBounce = up => {
        const { ballSpeedX, ballSpeedY } = this.state.ball;
        const speedChange = up ? ballSpeedX : -ballSpeedX;
        this.setState({
            ball: {
                ...this.state.ball,
                ...{
                    ballSpeedX: ballSpeedX * 0.9,
                    ballSpeedY: ballSpeedY + speedChange
                }
            }
        });
    };

    scorePoint = player => {
        const score = this.state.score;
        if (player) score[0]++;
        else score[1]++;
        clearInterval(this.state.interval);
        score.forEach((point) => {
            if (point >= 15) {
                this.setState({
                    gameOver: true
                });
            }
            const ball = {
                ...this.state.ball,
                ...{ ballX: 50, ballY: 50, ballSpeedX: 0.4 * Math.sign(Math.random() - 0.5), ballSpeedY: Math.random() - 0.5, animId: 0 }
            };
            this.setState({
                //everything to initial, score updated
                score: score,
                interval: null,
                ball: ball,
                opponentY: 40
            });
        })
    };

    mobileClickHandler = () => {
        this.props.history.goBack();
    }

    render() {
        const Unauthorized = <Unauth />

        const GameOver = <main className={'game_over_main'}>
            <div className={'game_over_screen'}>
                <Text>Game Over!</Text><br /><br />
                <Link to={'/profile'}><Button>Profile</Button></Link>
            </div>
        </main>;

        const Page = <Fragment>
            <div className={'pong_mobile'}>
                <NotValid children={'This game is not modiefied for mobile!'}
                    onClick={this.mobileClickHandler}
                />
            </div>
            <div className={'body-main_background'}>
                <main
                    className="main"
                    onClick={this.handleRoundStart}
                    onMouseMove={this.handlePlayerMove}
                >
                    <Board />
                    <div className="score">
                        <span>{this.state.score[0]}</span>
                        {!this.state.interval && (
                            <span style={{ fontSize: "0.8rem" }}>Left-click to start</span>
                        )}
                        <span>{this.state.score[1]}</span>
                    </div>
                    <Paddle
                        player={true}
                        pos={this.state.playerY}
                    />
                    <Ball ball={this.state.ball} />
                    <Paddle pos={this.state.opponentY} />
                </main>
            </div>
        </Fragment>;

        const Content = !localStorage.getItem('isLogedin') ? Unauthorized :
            this.state.gameOver ? GameOver : Page;

        return Content;
    }
}

const Ball = (props) => {
    const { radius, ballX, ballY } = props.ball;
    const style = {
        top: ballY + "%",
        left: ballX + "%",
        width: 2 * radius + "vw",
        height: 2 * radius + "vw"
    };
    const className = "ball";
    return <div className={className} style={style} />;
};

const Board = props => {
    return (
        <div className="board">
            <div className="midline"></div>
        </div>
    );
};

const Paddle = (props) => {
    const player = props.player ? "player" : "opponent";
    const style = {
        top: props.pos + "%"
    };
    const className = "paddle__inner ";// + (props.animate ? "paddle__animation-" + player : "")
    return (
        <div className={"paddle paddle_type-" + player} style={style}>
            <div
                className={className}
            />
        </div>
    );
}

export default Pong;