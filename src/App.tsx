import React, { Component, Fragment } from 'react';
import './themes/index.scss';
// import ComponentLibraries from './modules/ComponentLibraries';
// import DashboardModule from './modules/Dashboard';
// import Modal from './components/Modal';
// import ReaderModule from './components/BookReader';
import { Book } from '../app/classes/Book';
import { SourceManager } from './interfaces/Source';
// import SourceModule from './modules/Source';
import BookCatalog from './components/BookCatalog';
import Logger from './components/Logger';

// jangan ikutin, ini cuma testing aja bro

interface AppState {
  book: null,
  bookList: Partial<Book>[],
  errorlist: string[],
}

class App extends Component<unknown, AppState> {
  constructor(props: unknown){
    super(props);

    this.state = {

      book: null,
      bookList: [],
      errorlist: [...SourceManager.LOG],
    }
  }

  apiTest = async (): Promise<void> => {
    try {
      //var source = SourceManager.get('MangaLife');
      //var book = await source?.getBook('Sousou-no-Frieren');

      // get individual book
      // var book = await SourceManager.getBook('MangaLife', 'Mairimashita-Iruma-kun');
      // this.setState({ book });

      // get list of book
      const bookList = await SourceManager.directory('MangaLife');
      this.setState({ bookList });
    }
    catch(e)  {
      this.setState({ errorlist: [ ...this.state.errorlist, e ] });
    }
  }

  componentDidMount(): void {
    this.apiTest();
  }

  render(): JSX.Element {
    return (
      <div style={{position:'relative'}}>
        <Logger list={this.state.errorlist} key={this.state.errorlist.length.toString()} />
        {/* <ComponentLibraries /> */}
        {/* <SourceModule /> */}
        {/* <ReaderModule sourceIndex="MangaLife" book={this.state.book} className="flex-full" /> */}
        <BookCatalog
          bookList={this.state.bookList as Book[]}
          sourceIndex={'MangaLife'}
        />
      </div>
    )
  }
}
export default App;
