import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Game from './game/game';
import { submitAdd } from '../../../store/actions/library';

const games = props => {
    const userId = localStorage.getItem('userId');
    return props.games.map((game, index) => {
        let addItem = game.added;
        let buttonText = '';
        let disabled = true;
        switch (addItem) {
            case 0:
                buttonText = 'Add to profile';
                disabled = false;
                break;
            case 1:
                buttonText = 'Added';
                disabled = true;
                break;
            case 2:
                buttonText = 'Coming soon';
                disabled = true;
                break;
            default:
                buttonText = '';
                disabled = true;
        }
        return <Game
            onClick={() => {
                return (
                    props.onSubmitGame(game.name, userId)
                );
            }}
            name={game.name}
            children={game.name}
            buttonText={buttonText}
            disabled={disabled}
            key={index}
        />
    });
}

const mapStateToProps = state => {
    return {
        games: state.lib.games,
        changes: state.lib.changes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitGame: (game, userId) => dispatch(submitAdd(game, userId))
    }
}

games.propTypes = {
    games: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(games);