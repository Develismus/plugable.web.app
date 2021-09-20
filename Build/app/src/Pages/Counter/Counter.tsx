
import { connect } from 'react-redux';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as Store from '../../store';
import styles from './*.module.css';
import {CounterStore} from '../../store/stores';


type CounterProps =
  CounterStore.CounterState & 
  typeof CounterStore.actions & 
  RouteComponentProps<{}>;


class Counter extends React.PureComponent<CounterProps> {

    public render(){
      return (
          <div>
              <div className={styles.row}>
                <button
                  className={styles.button}
                  aria-label="Decrement value"
                  onClick={() => this.props.decrement()}
                >-
                </button>
                <span 
                  className={styles.value}
                >{this.props.value}
                </span>
                <button
                  className={styles.button}
                  aria-label="Increment value"
                  onClick={() => this.props.increment()}
                >+
                </button>
              </div>
              <div className={styles.row}>
                <input
                  className={styles.textbox}
                  aria-label="Set increment amount"
                  value={this.props.incrementValue}
                  onChange={(e) => this.props.setIncrementAmmount(Number.parseInt(e.target.value, 10) || 0)}
                />
                <button
                  className={styles.button}
                  onClick={() => this.props.incrementByAmount(this.props.incrementValue)}
                >Add Amount
                </button>
                <button
                  className={styles.asyncButton}
                  onClick={() => this.props.incrementAsync()}
                >Add Async
                </button>
                <button
                  className={styles.button}
                  onClick={() => this.props.incrementIfOdd(this.props.incrementValue)}
                >Add If Odd
                </button>
              </div>
          </div>
      );
    }
}

export default connect(
  (state : Store.AppState) => state.counter,
  CounterStore.actions
)(Counter as any);