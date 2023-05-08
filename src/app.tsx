import React, { useState, useEffect } from 'react';
import sessionService, { IAnswer } from './services/session';
import SearchForm from './components/form';
import Answer from './components/Answer';
import './App.css';

interface IData {
  id: number;
  title: string;
  // Other fields depending on your data structure
}

const App: React.FC = () => {
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

    const getAnswers = async (question:string) => {
    setIsLoading(true);

    try {
      
      const answers:IAnswer[] = await sessionService.askQuestion(question);        
      setAnswers(answers);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
    
  return (
    <div className="container">
      <h1>Ask UI</h1>
      <SearchForm onSubmit={getAnswers} />
      {isLoading && <div>Loading...</div>}
      {answers.length > 0 && (
        <div className="answer-container">
          {answers.map((item) => (
            <Answer key={item.confidence} item={item} />    
          ))}
        </div>
      )}
    </div>
  );
};

  



export default App;