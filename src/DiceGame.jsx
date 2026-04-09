   import "./terning.css";
   import { useState } from 'react';

    export default function DiceGame() {
        const [totals, setTotals] = useState([0, 0]);
        const [currentScore, setCurrentScore] = useState(0);
        const [activePlayer, setActivePlayer] = useState(0);
        const [playing, setPlaying] = useState(true);
        const [dice, setDice] = useState(null);
        const [isRolling, setIsRolling] = useState(false);

        const switchPlayer = () => {
            setCurrentScore(0);
            setActivePlayer((prev) => (prev === 0 ? 1 : 0));
        };

        const newGame = () => {
            setTotals([0, 0]);
            setCurrentScore(0);
            setActivePlayer(0);
            setPlaying(true);
            setDice(null);
            setIsRolling(false);
        }

        const rollDice = () => {
            if (!playing) return;

            const roll = Math.floor(Math.random() * 6) + 1;
            setDice(roll);

            // start animasjon
            setIsRolling(true);
            setTimeout(() => setIsRolling(false), 300); 

            if (roll !== 1) {
                setCurrentScore((prev) => prev + roll);
            } else {
                setDice(null);
                switchPlayer();
            }
        };

        const holdScore = () => {
            if (!playing) return;
            
            const newTotals = [...totals];
            newTotals[activePlayer] += currentScore;
            setTotals(newTotals);

            // Check for winner (first to 100)
            if (newTotals[activePlayer] >= 100) {
                setPlaying(false);
            } else {
                switchPlayer();
            }
        };

        return (
            <div className="wrapper clearfix">
                {/* Spiller 1 */}
                <div
                    className={`spiller-0-panel ${activePlayer === 0 ? "aktiv" : ""} ${!playing && activePlayer === 0 ? "vinner" : ""}`}
                >
                    <div className="spiller-navn">Spiller 1</div>
                    <div className="spiller-poeng">{activePlayer === 0 ? currentScore : totals[0]}</div>
                    <div className="spiller-sum-box">
                        <div className="spiller-sum-label">Poengsum</div>
                        <div className="spiller-sum">{totals[0]}</div>
                    </div>
                </div>

            {/* Spiller 2 */}
            <div
                className={`spiller-1-panel ${activePlayer === 1 ? "aktiv" : ""} ${!playing && activePlayer === 1 ? "vinner" : ""}`}
            >
                    <div className="spiller-navn">Spiller 2</div>
                    <div className="spiller-poeng">{activePlayer === 1 ? currentScore : totals[1]}</div>
                    <div className="spiller-sum-box">
                    <div className="spiller-sum-label">Poengsum</div>
                    <div className="spiller-sum">{totals[1]}</div>
                </div>
            </div>

            {/* Knapper */}
            <button className="btn-ny" onClick={newGame}>Nytt spill</button>
            <button className="btn-kast" onClick={rollDice}>Kast terning</button>
            <button className="btn-hold" onClick={holdScore}>Hold</button>

            {/* Terning */}
            {dice && (
                <img
                 src={`/img/terning-${dice}.png`}
                 alt="Terning"
                 className={`terning ${isRolling ? "rull" : ""}`}
              />    
            )}
         </div>
        );
    }