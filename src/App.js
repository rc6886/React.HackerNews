import React, { Component } from 'react';
import './App.css';

const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

function isSearched(searchTerm) {
    return function(item) {
        return !searchTerm ||
                item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        list,
        searchTerm: '',
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
      const updatedList = this.state.list.filter(x => x.objectID !== id);
      this.setState({ list: updatedList });
  }

  onSearchChange(event) {
      this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, list } = this.state;

    return (
      <div className="page">
          <div className="interactions">
              <Search
                  value={searchTerm}
                  onChange={this.onSearchChange}
              >
                  Search
              </Search>
          </div>
          <Table
              list={list}
              pattern={searchTerm}
              onDismiss={this.onDismiss}
          />
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) => {
    return (
        <form>
            {children}
            <input
                type="text"
                value={value}
                onChange={onChange}
            />
        </form>
    )
};

const Table = ({ list, pattern, onDismiss }) => {
    return (
        <div className="table">
            {
                list.filter(isSearched(pattern)).map(x =>
                    <div key={x.objectID} className="table-row">
                        <span style={{ width: '40%' }}>
                            <a href={x.url}>{x.title}</a>
                            </span>
                        <span style={{ width: '30%' }}>
                            {x.author}
                            </span>
                        <span style={{ width: '10%' }}>
                            {x.num_comments}
                            </span>
                        <span style={{ width: '10%' }}>
                            {x.points}
                        </span>
                        <span style={{ width: '10%' }}>
                            <Button
                                onClick={() => onDismiss(x.objectID)}
                                className="button-inline"
                            >
                                Dismiss
                            </Button>
                        </span>
                    </div>
                )
            }
        </div>
    );
};

const Button = ({ onClick, className = "", children }) => {
  return (
      <button
          onClick={onClick}
          className={className}
          type="button"
      >
          {children}
      </button>
  );
};

export default App;
