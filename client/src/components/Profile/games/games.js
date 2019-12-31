import React from 'react';

import { connect } from 'react-redux';

import Text from '../../UI/text';
import Game from './game/game';
import { submitDelete } from '../../../store/actions/profile';

const games = props => {
    const games = [...props.games];
    const userId = localStorage.getItem('userId');
    if (games.length > 0) {
        return games.map((game, index) => {
            return <Game name={game} children={game} key={index}
                onClickPlay={() => props.onClickPlay(game)}
                onClickDelete={() => props.onDeleteGame(game, userId)}
            />
        });
    } else {
        return <Text>Please add games to your profile!</Text>
    }
}

const mapStateToProps = state => {
    return {
        games: state.pro.games
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteGame: (game, userId) => dispatch(submitDelete(game, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(games);