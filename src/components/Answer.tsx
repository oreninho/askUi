import React from 'react';
import { IAnswer } from '../services/session';

interface AnswerProps {
  item: IAnswer;
}

const Answer: React.FC<AnswerProps> = ({ item }) => {
  return (
    <div key={item.confidence} className="answer-box">
      <div className="segment">
        <span>Answer:</span>
        {item.answer.split('\n').map((str, key) => {
            return (                
                <li key={key}>
                <span>{str}</span>               
                </li>
            );
            })
        }
      </div>
      <div className="segment">
        <span>Confidence:</span>
        <span className="segment-confidence">{item.confidence}</span>
      </div>
    </div>
  );
};

export default Answer;
