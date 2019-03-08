import React from 'react'
import Card from '../components/Card'
// import PlayButton from '../components/PlayButton'

class HandContainer extends React.Component{
  state={
    selected: []
  }

  nums = ['3','4','5','6','7','8','9','10','JACK','QUEEN','KING','ACE','2']
  suits = ['DIAMONDS', 'CLUBS', 'HEARTS', 'SPADES']

  cardClick = (card) =>{
    console.log(`clicked! ${card.code}`)
    if (this.state.selected.includes(card)){
      this.setState({selected:[...this.state.selected.filter(c => c !== card)]})
    }
    else {
      this.setState({selected:[...this.state.selected, card]})
    }
  }

  checkValidTurn = (sel, last) =>{
    // sel->[{card},...]     last->{play:'' cards:[{card},...]}
    const nums = this.nums
    const suits = this.suits
    let s, l
    // console.log(s.length)
    if (last.cards.length === 0){ return true}

    if (sel.length === 1){
      s = sel[0]
      l = last.cards[0]
      if (nums.indexOf(s.value) > nums.indexOf(l.value)){
        return 'single'
      }
      else if (nums.indexOf(s.value) === nums.indexOf(l.value)){
        if (suits.indexOf(s.suit) > suits.indexOf(l.suit)) {
          return 'single'
        }
      }
    }

    else if (sel.length === 2){
      s = {vals: sel.map(c => c.value ), suits: sel.map(c => c.suit)}
      l = {vals: last.cards.map(c => c.value ),
          suits: last.cards.map(c => c.suit)}

      if (s.vals[0] === s.vals[1]){
        if (nums.indexOf(s.vals[0]) > nums.indexOf(l.vals[0])) {
          return 'pair'
        }
        else if (s.vals[0] === l.vals[0]){
          if ((s.suits.includes('HEARTS') && !l.suits.includes('SPADES')) || s.suits.includes('SPADES')){
            return 'pair'
          }
        }
      }
    }

    else if (sel.length === 3){
      if (sel[0].value === sel[1].value && sel[2].value === sel[1].value){
        if ( nums.indexOf(sel[0].value) > nums.indexOf(last.cards[0].value) ) {
          return '3ofkind'
        }
      }
    }

    else if (sel.length === 4){
      if (sel[0].value === sel[1].value && sel[2].value === sel[1].value && sel[3].value === sel[1].value){
        if ( nums.indexOf(sel[0].value) > nums.indexOf(last.cards[0].value) ) {
          return '4ofkind'
        }
      }
    }

    else if (sel.length === 5){
    }
  }

  playFn = () => {
    //play logic
    const selected = this.state.selected    //[{card}, {card}]
    const last_played = this.props.last_played  //{play:'' cards:[{card},{card}]}
    const play = this.checkValidTurn(selected, last_played)
    if ((selected.length === last_played.cards.length) || last_played.cards.length === 0){
      if (play){
        this.props.playTurn(selected, this.props.hand, play)
      }
      else (console.log('turn error 1'))
    }
    else{
      console.log('turn error')
    }

  }

  renderHand = (hnum) =>{
    return this.props[hnum].map( card => {return <Card card={card} clickFn={this.cardClick}/>})
  }

  render(){
    return(
      <div>
          {this.renderHand(this.props.hand)}
          <p>{this.state.selected.map( c => c.code)}</p>
          <button onClick={this.playFn}>Play Selected Cards</button>
      </div>
    )
  }
}

export default HandContainer
