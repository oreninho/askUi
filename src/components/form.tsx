import React, { useState } from 'react';
import SearchButton from './searchButton';
import './SearchForm.css';

interface Props {
  onSubmit: (question: string) => void;
}

const SearchForm: React.FC<Props> = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(question);
  };

  return (
    <div className="search-form">
      <input
        type="text"
        className="search-question"
        value={question}
        onChange={handleQuestionChange}
        placeholder="Enter your question"
      />
      <SearchButton onClick={handleSubmit} />
    </div>
  );
};

export default SearchForm;
